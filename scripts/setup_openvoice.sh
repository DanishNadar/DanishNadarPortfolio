#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
THIRD_PARTY_DIR="$ROOT_DIR/third_party"
OPENVOICE_DIR="${OPENVOICE_REPO_ROOT:-$THIRD_PARTY_DIR/OpenVoice}"
MELO_DIR="${MELOTTS_REPO_ROOT:-$THIRD_PARTY_DIR/MeloTTS}"
CHECKPOINT_ZIP_URL="https://myshell-public-repo-host.s3.amazonaws.com/openvoice/checkpoints_v2_0417.zip"
CONSTRAINTS_FILE="$ROOT_DIR/constraints-openvoice.txt"

pick_python() {
  if [ -n "${PYTHON_BIN:-}" ] && command -v "$PYTHON_BIN" >/dev/null 2>&1; then
    printf '%s' "$PYTHON_BIN"
    return
  fi
  for candidate in python3.9 python3 python; do
    if command -v "$candidate" >/dev/null 2>&1; then
      printf '%s' "$candidate"
      return
    fi
  done
  return 1
}

PYTHON_BIN="$(pick_python)"
PY_VERSION="$($PYTHON_BIN -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")')"

mkdir -p "$THIRD_PARTY_DIR"
export PIP_CONSTRAINT="$CONSTRAINTS_FILE"

echo "Using Python: $PYTHON_BIN ($PY_VERSION)"
$PYTHON_BIN - <<'PYOPENVOICE'
import sys
if sys.version_info[:2] != (3, 9):
    raise SystemExit('OpenVoice + MeloTTS should be installed in a clean Python 3.9 environment for this project.')
PYOPENVOICE

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required before the cloned voice can run. Install ffmpeg, then rerun this script." >&2
  exit 1
fi

$PYTHON_BIN -m pip install --upgrade pip wheel "setuptools<81" "Cython<3"
$PYTHON_BIN -m pip uninstall -y av faster-whisper MyShell-OpenVoice myshell-openvoice >/dev/null 2>&1 || true
$PYTHON_BIN -m pip install -r "$ROOT_DIR/requirements-openvoice.txt"
$PYTHON_BIN -m pip install "botocore==1.38.23" "cached_path<1.7"

if [ ! -d "$OPENVOICE_DIR/.git" ]; then
  git clone https://github.com/myshell-ai/OpenVoice "$OPENVOICE_DIR"
fi

if [ ! -d "$MELO_DIR/.git" ]; then
  git clone https://github.com/myshell-ai/MeloTTS "$MELO_DIR"
fi

OPENVOICE_DIR_ENV="$OPENVOICE_DIR" $PYTHON_BIN - <<'PYPATCH'
from pathlib import Path
import os
path = Path(os.environ['OPENVOICE_DIR_ENV']) / 'openvoice' / 'se_extractor.py'
text = path.read_text()
text = text.replace('from faster_whisper import WhisperModel\n', "try:\n    from faster_whisper import WhisperModel\nexcept Exception:\n    WhisperModel = None\n")
text = text.replace('    if model is None:\n        model = WhisperModel(model_size, device="cuda", compute_type="float16")\n', '    if WhisperModel is None:\n        raise ImportError("faster-whisper is not installed. The standard OpenVoice VAD path does not need it. Install faster-whisper only if you want the Whisper-based fallback.")\n    if model is None:\n        device = "cuda" if torch.cuda.is_available() else "cpu"\n        compute_type = "float16" if device == "cuda" else "int8"\n        model = WhisperModel(model_size, device=device, compute_type=compute_type)\n')
path.write_text(text)
print(f'Patched {path}')
PYPATCH

$PYTHON_BIN -m pip install --no-build-isolation --no-deps -e "$OPENVOICE_DIR"
$PYTHON_BIN -m pip install --no-build-isolation -e "$MELO_DIR"
$PYTHON_BIN -m unidic download
$PYTHON_BIN - <<'PYNLTK'
import nltk
for pkg in ['averaged_perceptron_tagger', 'averaged_perceptron_tagger_eng', 'punkt']:
    try:
        nltk.download(pkg)
    except Exception:
        pass
PYNLTK

if [ ! -d "$OPENVOICE_DIR/checkpoints_v2" ]; then
  TMP_ZIP="$OPENVOICE_DIR/checkpoints_v2_0417.zip"
  mkdir -p "$OPENVOICE_DIR"
  curl -L "$CHECKPOINT_ZIP_URL" -o "$TMP_ZIP"
  unzip -q "$TMP_ZIP" -d "$OPENVOICE_DIR"
  rm -f "$TMP_ZIP"
fi

echo "OpenVoice setup complete."
echo "This installer skips the broken faster-whisper/av dependency chain unless you explicitly enable Whisper fallback later."
echo "Voice samples will be read from: $ROOT_DIR/assets/VoiceTrain"
echo "Set OPENVOICE_REPO_ROOT=$OPENVOICE_DIR if you move the repo later."
echo "Then run: cd $ROOT_DIR && $PYTHON_BIN portfolio_server.py"
