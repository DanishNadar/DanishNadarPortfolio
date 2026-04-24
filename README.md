# DanishNadarPortfolio with OpenVoice cloning

This version routes the avatar speech through OpenVoice instead of browser speech synthesis.

## What changed
- Added `openvoice_avatar_tts.py` to generate cloned WAV audio from `assets/VoiceTrain`
- Added `POST /api/avatar/tts` for cloned audio output
- Disabled automatic browser voice fallback so the avatar will not silently switch to a generic female voice
- Added `scripts/setup_openvoice.sh` for OpenVoice + MeloTTS setup
- Added `openvoice_doctor.py` so you can inspect why cloned TTS is unavailable

## Required runtime
Use a clean Python 3.9 environment.

## Setup
```bash
conda create -n danish-openvoice python=3.9 -y
conda activate danish-openvoice
cd DanishNadarPortfolio
bash scripts/setup_openvoice.sh
python openvoice_doctor.py
python portfolio_server.py
```

## Open the avatar
```bash
http://127.0.0.1:8080/pages/avatar.html
```

## Important behavior
The avatar no longer falls back to browser speech automatically. If OpenVoice is not ready, the page will show an OpenVoice error instead of speaking in a generic browser voice.

## Voice samples
Place your training clips in:
```bash
assets/VoiceTrain
```
Supported input formats include wav, mp3, m4a, flac, and ogg.


## OpenVoice install note

This project now installs OpenVoice without the repo's pinned `faster-whisper==0.9.0` dependency, because that pin pulls `av==10.*`, which commonly fails to build on newer systems. The avatar's cloned-voice path uses OpenVoice VAD mode first and does **not** need `faster-whisper` for normal use. If you ever want the Whisper-based fallback path, install `faster-whisper` separately and set `OPENVOICE_ALLOW_WHISPER_FALLBACK=1`.
