#!/usr/bin/env python3
import json
from pathlib import Path
from openvoice_avatar_tts import OpenVoiceAvatarTTS

ROOT = Path(__file__).resolve().parent


def main():
    tts = OpenVoiceAvatarTTS(ROOT)
    print(json.dumps(tts.debug_report(), indent=2))


if __name__ == '__main__':
    main()
