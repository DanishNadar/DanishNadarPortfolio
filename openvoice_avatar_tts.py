#!/usr/bin/env python3
import hashlib
import os
import sys
import shutil
import subprocess
import threading
from pathlib import Path
from typing import Dict, List, Optional, Tuple


class OpenVoiceAvatarTTS:
    def __init__(self, root: Path):
        self.root = Path(root)
        self.voice_dir = Path(os.environ.get('OPENVOICE_VOICE_TRAIN_DIR', self.root / 'assets' / 'VoiceTrain'))
        self.cache_dir = Path(os.environ.get('OPENVOICE_CACHE_DIR', self.root / 'assets' / 'generated_voice'))
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.reference_dir = self.cache_dir / 'reference'
        self.reference_dir.mkdir(parents=True, exist_ok=True)
        self.message_tag = os.environ.get('OPENVOICE_EMBED_MESSAGE', '@MyShell')
        self.speed = float(os.environ.get('OPENVOICE_TTS_SPEED', '1.0'))
        self.preferred_language = os.environ.get('OPENVOICE_TTS_LANGUAGE', 'EN')
        self.preferred_speaker = os.environ.get('OPENVOICE_TTS_SPEAKER', 'EN-US')
        self.allow_whisper_fallback = os.environ.get('OPENVOICE_ALLOW_WHISPER_FALLBACK', '0').strip().lower() in {'1', 'true', 'yes', 'on'}
        self._lock = threading.Lock()
        self._deps = None
        self._tts_model = None
        self._tone_converter = None
        self._target_se = None
        self._source_se = None
        self._speaker_id = None
        self._speaker_key = None
        self._language = None
        self._device = 'cpu'
        self._last_error = ''

    def _repo_root_candidates(self) -> List[Path]:
        candidates = []
        env_repo = os.environ.get('OPENVOICE_REPO_ROOT', '').strip()
        if env_repo:
            candidates.append(Path(env_repo))
        candidates.extend([
            self.root / 'third_party' / 'OpenVoice',
            self.root / 'OpenVoice',
        ])
        unique = []
        seen = set()
        for item in candidates:
            item = item.expanduser().resolve()
            if str(item) not in seen:
                unique.append(item)
                seen.add(str(item))
        return unique

    def _checkpoint_root_candidates(self) -> List[Path]:
        candidates = []
        env_ckpt = os.environ.get('OPENVOICE_CHECKPOINTS_DIR', '').strip()
        if env_ckpt:
            candidates.append(Path(env_ckpt))
        for repo_root in self._repo_root_candidates():
            candidates.append(repo_root / 'checkpoints_v2')
        unique = []
        seen = set()
        for item in candidates:
            item = item.expanduser().resolve()
            if str(item) not in seen:
                unique.append(item)
                seen.add(str(item))
        return unique

    def _detect_checkpoint_root(self) -> Optional[Path]:
        for candidate in self._checkpoint_root_candidates():
            converter = candidate / 'converter'
            if (converter / 'config.json').exists() and (converter / 'checkpoint.pth').exists():
                return candidate
        return None

    def _voice_files(self) -> List[Path]:
        if not self.voice_dir.exists():
            return []
        allowed = {'.wav', '.mp3', '.m4a', '.flac', '.ogg'}
        files = [path for path in self.voice_dir.iterdir() if path.is_file() and path.suffix.lower() in allowed]
        return sorted(files)

    def _import_deps(self):
        if self._deps is not None:
            return self._deps
        import torch  # type: ignore
        from openvoice import se_extractor  # type: ignore
        from openvoice.api import ToneColorConverter  # type: ignore
        from melo.api import TTS  # type: ignore
        self._deps = {
            'torch': torch,
            'se_extractor': se_extractor,
            'ToneColorConverter': ToneColorConverter,
            'TTS': TTS,
        }
        return self._deps

    def _check_ready(self) -> Tuple[bool, str]:
        voice_files = self._voice_files()
        if not voice_files:
            return False, f'No voice samples found in {self.voice_dir}'
        if shutil.which('ffmpeg') is None:
            return False, 'ffmpeg is required for preparing the VoiceTrain clips'
        checkpoint_root = self._detect_checkpoint_root()
        if checkpoint_root is None:
            return False, 'OpenVoice checkpoints_v2 were not found. Run scripts/setup_openvoice.sh first.'
        try:
            self._import_deps()
        except Exception as exc:
            self._last_error = str(exc)
            hint = ''
            if sys.version_info[:2] != (3, 9):
                hint = f' Current Python is {sys.version_info.major}.{sys.version_info.minor}; Python 3.9 is the safest OpenVoice environment.'
            return False, f'OpenVoice dependencies are not installed: {exc}.{hint}'.strip()
        return True, 'ready'

    def status(self) -> Dict[str, object]:
        ready, reason = self._check_ready()
        voice_files = self._voice_files()
        checkpoint_root = self._detect_checkpoint_root()
        return {
            'enabled': ready,
            'reason': '' if ready else reason,
            'last_error': self._last_error,
            'voice_sample_count': len(voice_files),
            'voice_samples': [path.name for path in voice_files],
            'voice_label': f'{len(voice_files)} VoiceTrain sample(s)',
            'voice_dir': str(self.voice_dir),
            'checkpoints_dir': str(checkpoint_root) if checkpoint_root else '',
            'language': self._language or self.preferred_language,
            'speaker': self._speaker_key or self.preferred_speaker,
            'device': self._device,
            'allow_whisper_fallback': self.allow_whisper_fallback,
        }

    def _prepare_reference_audio(self) -> Path:
        voice_files = self._voice_files()
        if not voice_files:
            raise RuntimeError(f'No voice samples found in {self.voice_dir}')

        signature = hashlib.sha1('||'.join(f'{path.name}:{path.stat().st_mtime_ns}:{path.stat().st_size}' for path in voice_files).encode('utf-8')).hexdigest()[:12]
        output_path = self.reference_dir / f'danish_reference_{signature}.wav'
        if output_path.exists():
            return output_path

        if len(voice_files) == 1:
            command = [
                'ffmpeg', '-y', '-i', str(voice_files[0]),
                '-ac', '1', '-ar', '22050', '-vn',
                str(output_path)
            ]
        else:
            command = ['ffmpeg', '-y']
            for path in voice_files:
                command.extend(['-i', str(path)])
            concat_inputs = ''.join(f'[{idx}:a]' for idx in range(len(voice_files)))
            command.extend([
                '-filter_complex', f'{concat_inputs}concat=n={len(voice_files)}:v=0:a=1[aout]',
                '-map', '[aout]',
                '-ac', '1', '-ar', '22050', '-vn',
                str(output_path)
            ])

        proc = subprocess.run(command, capture_output=True, text=True)
        if proc.returncode != 0:
            raise RuntimeError(f'ffmpeg failed while preparing VoiceTrain audio: {proc.stderr.strip() or proc.stdout.strip()}')
        return output_path

    def _resolve_source_embedding(self, ses_dir: Path, speaker_key: str) -> Path:
        normalized = speaker_key.lower().replace('_', '-')
        candidates = [
            normalized,
            normalized.replace('-', '_'),
            normalized.replace('-', ''),
            speaker_key,
            speaker_key.lower(),
        ]
        for candidate in candidates:
            path = ses_dir / f'{candidate}.pth'
            if path.exists():
                return path
        english_fallbacks = ['en-us.pth', 'en-default.pth', 'en-newest.pth']
        for filename in english_fallbacks:
            path = ses_dir / filename
            if path.exists():
                return path
        all_files = sorted(ses_dir.glob('*.pth'))
        if not all_files:
            raise RuntimeError(f'No base speaker embeddings found in {ses_dir}')
        return all_files[0]

    def _load_tts_model(self, TTS):
        errors = []
        for language in [self.preferred_language, 'EN', 'EN_NEWEST']:
            if not language:
                continue
            try:
                model = TTS(language=language, device=self._device)
                self._language = language
                return model
            except Exception as exc:
                errors.append(f'{language}: {exc}')
        raise RuntimeError('Unable to load MeloTTS for English. ' + ' | '.join(errors))

    def _pick_speaker(self, speaker_ids: Dict[str, int]) -> Tuple[str, int]:
        preferred = [
            self.preferred_speaker,
            'EN-US',
            'EN-Default',
            'EN-Newest',
            'EN',
        ]
        for name in preferred:
            if name in speaker_ids:
                return name, speaker_ids[name]
        for key, value in speaker_ids.items():
            if str(key).upper().startswith('EN'):
                return key, value
        key = next(iter(speaker_ids.keys()))
        return key, speaker_ids[key]

    def _ensure_loaded(self):
        with self._lock:
            ready, reason = self._check_ready()
            if not ready:
                raise RuntimeError(reason)
            if self._tts_model is not None and self._tone_converter is not None and self._target_se is not None and self._source_se is not None:
                return

            deps = self._import_deps()
            torch = deps['torch']
            se_extractor = deps['se_extractor']
            ToneColorConverter = deps['ToneColorConverter']
            TTS = deps['TTS']

            checkpoint_root = self._detect_checkpoint_root()
            if checkpoint_root is None:
                raise RuntimeError('OpenVoice checkpoints_v2 were not found.')

            self._device = 'cuda:0' if torch.cuda.is_available() else 'cpu'
            converter_dir = checkpoint_root / 'converter'
            ses_dir = checkpoint_root / 'base_speakers' / 'ses'
            reference_audio = self._prepare_reference_audio()

            tone_converter = ToneColorConverter(str(converter_dir / 'config.json'), device=self._device)
            tone_converter.load_ckpt(str(converter_dir / 'checkpoint.pth'))
            try:
                target_se, _ = se_extractor.get_se(str(reference_audio), tone_converter, vad=True)
            except Exception as exc:
                if self.allow_whisper_fallback:
                    target_se, _ = se_extractor.get_se(str(reference_audio), tone_converter, vad=False)
                else:
                    raise RuntimeError(
                        'OpenVoice could not extract the speaker embedding in VAD mode. '
                        'Install faster-whisper and enable OPENVOICE_ALLOW_WHISPER_FALLBACK=1 only if you need the Whisper fallback. '
                        f'Original error: {exc}'
                    ) from exc

            tts_model = self._load_tts_model(TTS)
            speaker_ids = dict(getattr(tts_model.hps.data, 'spk2id', {}))
            if not speaker_ids:
                raise RuntimeError('MeloTTS did not expose any speaker ids.')
            speaker_key, speaker_id = self._pick_speaker(speaker_ids)
            source_embedding = self._resolve_source_embedding(ses_dir, speaker_key)
            source_se = torch.load(str(source_embedding), map_location=self._device)

            self._tone_converter = tone_converter
            self._target_se = target_se
            self._tts_model = tts_model
            self._source_se = source_se
            self._speaker_id = speaker_id
            self._speaker_key = speaker_key
            self._last_error = ''

    def synthesize(self, text: str) -> Path:
        cleaned = ' '.join((text or '').strip().split())
        if not cleaned:
            raise RuntimeError('No text supplied for avatar speech.')
        cleaned = cleaned[:500]
        self._ensure_loaded()

        reference_audio = self._prepare_reference_audio()
        signature = hashlib.sha1(
            f'{cleaned}|{reference_audio.name}|{self._language}|{self._speaker_key}|{self.speed}'.encode('utf-8')
        ).hexdigest()
        output_path = self.cache_dir / f'{signature}.wav'
        if output_path.exists():
            return output_path

        scratch_path = self.cache_dir / f'{signature}.neutral.wav'
        with self._lock:
            if output_path.exists():
                return output_path
            try:
                self._tts_model.tts_to_file(cleaned, self._speaker_id, str(scratch_path), speed=self.speed)
                self._tone_converter.convert(
                    audio_src_path=str(scratch_path),
                    src_se=self._source_se,
                    tgt_se=self._target_se,
                    output_path=str(output_path),
                    message=self.message_tag,
                )
                self._last_error = ''
            except Exception as exc:
                self._last_error = str(exc)
                raise
            finally:
                if scratch_path.exists():
                    scratch_path.unlink()
        return output_path

    def debug_report(self) -> Dict[str, object]:
        status = self.status()
        return {
            'status': status,
            'repo_candidates': [str(path) for path in self._repo_root_candidates()],
            'checkpoint_candidates': [str(path) for path in self._checkpoint_root_candidates()],
            'python_version': f'{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}',
            'ffmpeg': shutil.which('ffmpeg') or '',
            'allow_whisper_fallback': self.allow_whisper_fallback,
        }
