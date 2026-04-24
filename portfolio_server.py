#!/usr/bin/env python3
import json
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import request

from openvoice_avatar_tts import OpenVoiceAvatarTTS

ROOT = Path(__file__).resolve().parent
PORTFOLIO = json.loads((ROOT / 'assets' / 'portfolio_data.json').read_text())
PORT = int(os.environ.get('PORT', '8080'))
OLLAMA_HOST = os.environ.get('OLLAMA_HOST', 'http://127.0.0.1:11434').rstrip('/')
FAST_MODEL_HINTS = (
    'qwen2.5:0.5b', 'qwen2.5:1.5b', 'llama3.2:1b', 'gemma2:2b', 'phi3:mini', 'smollm2',
    'qwen2.5', 'llama3.2', 'gemma2', 'phi3', 'mistral'
)
ACTIVE_MODEL = None
AVATAR_TTS = OpenVoiceAvatarTTS(ROOT)


def clean(text: str) -> str:
    return re.sub(r'\s+', ' ', text or '').strip()


def tokenize(text: str):
    return re.findall(r"[a-z0-9\+#\.]+", clean(text).lower())


def build_chunks():
    chunks = []
    identity = PORTFOLIO['identity']
    chunks.append({
        'id': 'identity',
        'type': 'identity',
        'title': identity['name'],
        'href': '/pages/resume.html',
        'text': (
            f"{identity['name']} is an {identity['title']} focused on applied AI, robotics, automation, "
            f"and security-minded systems. He is connected to Illinois Institute of Technology in Chicago. "
            f"Email: {identity['email']}. LinkedIn: {identity['linkedin']}. GitHub: {identity['github']}."
        ),
        'keywords': ['who is danish', 'about', 'intro', 'overview', 'contact', 'email', 'linkedin', 'github']
    })

    chunks.append({
        'id': 'work-style',
        'type': 'narrative',
        'title': 'How Danish tends to work',
        'href': '/pages/projects.html',
        'text': 'Based on the portfolio context, Danish tends to start from a concrete problem, turn it into a usable system, validate it against real constraints or benchmarks, and connect the result to operations, users, or measurable impact. That pattern shows up across the DNS scanner, AILA, JTR, and EcoCAR work.',
        'keywords': ['how does danish work', 'work style', 'workflow', 'pipeline', 'approach', 'process']
    })

    for lane in PORTFOLIO.get('focusLanes', []):
        chunks.append({
            'id': f"lane-{lane['title'].lower().replace(' ', '-')}",
            'type': 'lane',
            'title': lane['title'],
            'href': '/index.html',
            'text': f"Field of expertise: {lane['title']}. {lane['copy']} Points: {'; '.join(lane.get('points', []))}.",
            'keywords': [lane['title'].lower(), *[point.lower() for point in lane.get('points', [])]]
        })

    for item in PORTFOLIO.get('experience', []):
        chunks.append({
            'id': f"exp-{item['company'].lower().replace(' ', '-')}",
            'type': 'experience',
            'title': f"{item['role']} at {item['company']}",
            'href': '/pages/resume.html',
            'text': f"Experience: {item['role']} at {item['company']} during {item['period']}. Highlights: {'; '.join(item.get('points', []))}.",
            'keywords': [item['role'].lower(), item['company'].lower(), *[point.lower() for point in item.get('points', [])]]
        })

    for item in PORTFOLIO.get('education', []):
        chunks.append({
            'id': f"edu-{item['school'].lower().replace(' ', '-')}",
            'type': 'education',
            'title': item['school'],
            'href': '/pages/resume.html',
            'text': f"Education: {item['school']}. {item['degree']}. {item['period']}.",
            'keywords': [item['school'].lower(), item['degree'].lower(), item['period'].lower()]
        })

    for project in PORTFOLIO.get('projects', []):
        project_text = ' '.join([
            project['title'],
            project.get('role', ''),
            project.get('summary', ''),
            project.get('showcase', ''),
            ' '.join(project.get('skills', [])),
            ' '.join(project.get('outcomes', [])),
            project.get('githubNote', '')
        ])
        chunks.append({
            'id': f"project-{project['id']}",
            'type': 'project',
            'title': project['title'],
            'href': f"/pages/{project['page']}",
            'repo': project.get('github'),
            'text': project_text,
            'keywords': [
                project['title'].lower(),
                project.get('domain', '').lower(),
                project.get('role', '').lower(),
                project['id'].lower(),
                *[skill.lower() for skill in project.get('skills', [])]
            ]
        })

    for skill in PORTFOLIO.get('skills', []):
        linked = [p['title'] for p in PORTFOLIO['projects'] if p['id'] in skill.get('projects', [])]
        chunks.append({
            'id': f"skill-{skill['slug']}",
            'type': 'skill',
            'title': skill['name'],
            'href': '/pages/stack.html',
            'text': f"Skill: {skill['name']}. Category: {skill['category']}. {skill['short']}. Linked projects: {'; '.join(linked)}.",
            'keywords': [skill['name'].lower(), skill['category'].lower(), *[p.lower() for p in linked]]
        })

    for repo in PORTFOLIO.get('githubRepos', []):
        chunks.append({
            'id': f"repo-{repo['name'].lower()}",
            'type': 'repo',
            'title': repo['name'],
            'href': repo['href'],
            'text': f"GitHub repository: {repo['name']}. {repo['title']}. {repo['summary']}. {repo['language']}. {repo['updated']}.",
            'keywords': [repo['name'].lower(), repo['title'].lower(), repo.get('language', '').lower(), 'github', 'repo', 'repository']
        })
    return chunks


CHUNKS = build_chunks()


def detect_ollama_model():
    explicit = os.environ.get('OLLAMA_MODEL', '').strip()
    if explicit:
        return explicit
    preferred = os.environ.get('OLLAMA_FAST_MODEL', 'qwen2.5:0.5b').strip().lower()
    try:
        with request.urlopen(f"{OLLAMA_HOST}/api/tags", timeout=2.5) as resp:
            payload = json.loads(resp.read().decode('utf-8'))
        models = [item for item in payload.get('models', []) if item.get('name')]
        if not models:
            return None

        def pick_smallest(candidates):
            return min(candidates, key=lambda item: (item.get('size') or 10**18, item.get('name', ''))).get('name')

        lowered = [(item.get('name', '').lower(), item) for item in models]
        if preferred:
            matches = [item for name, item in lowered if name.startswith(preferred)]
            if matches:
                return pick_smallest(matches)
        for hint in FAST_MODEL_HINTS:
            matches = [item for name, item in lowered if name.startswith(hint)]
            if matches:
                return pick_smallest(matches)

        smaller = [item for item in models if (item.get('size') or 10**18) <= 4_500_000_000]
        if smaller:
            return pick_smallest(smaller)
        return pick_smallest(models)
    except Exception:
        return None


def score_chunk(query: str, tokens, chunk):
    text = chunk['text'].lower()
    title = chunk['title'].lower()
    score = 0.0
    for token in tokens:
        if len(token) < 2:
            continue
        if token in title:
            score += 4.5
        if token in text:
            score += 1.25
    for phrase in chunk.get('keywords', []):
        phrase = phrase.lower()
        if phrase and phrase in query:
            score += 5.5 if chunk['type'] in {'project', 'skill'} else 3.5
    if 'how' in tokens and 'work' in tokens and chunk['type'] in {'experience', 'lane', 'project'}:
        score += 1.6
    if any(t in tokens for t in ['contact', 'email', 'meeting', 'hire']) and chunk['type'] == 'identity':
        score += 5
    if any(t in tokens for t in ['github', 'repo', 'repository', 'code']) and chunk['type'] in {'repo', 'project'}:
        score += 4
    return score


def retrieve(message: str):
    query = clean(message).lower()
    tokens = tokenize(query)
    scored = []
    for chunk in CHUNKS:
        score = score_chunk(query, tokens, chunk)
        if score > 0:
            scored.append((score, chunk))
    scored.sort(key=lambda item: item[0], reverse=True)
    top = [chunk for _, chunk in scored[:5]]
    total_score = sum(score for score, _ in scored[:3]) if scored else 0
    return top, total_score


def is_danish_question(message: str, retrieved, total_score: float):
    q = clean(message).lower()
    portfolio_terms = {
        'danish', 'project', 'portfolio', 'resume', 'work', 'skills', 'stack', 'contact', 'hire', 'meeting',
        'email', 'github', 'robotics', 'ai', 'ml', 'automation', 'security', 'experience', 'education'
    }
    if any(term in q for term in portfolio_terms):
        return True
    if total_score >= 4:
        return True
    return any(chunk['type'] in {'project', 'skill', 'experience', 'identity'} for chunk in retrieved[:2])


def collect_links(message: str, retrieved):
    q = clean(message).lower()
    identity = PORTFOLIO['identity']
    links = []
    if any(word in q for word in ['contact', 'hire', 'email', 'meeting', 'linkedin', 'github']):
        links.extend([
            {'label': 'Contact Danish', 'href': '/pages/contact.html'},
            {'label': 'LinkedIn', 'href': identity['linkedin']},
            {'label': 'GitHub', 'href': identity['github']}
        ])
    if any(word in q for word in ['resume', 'experience', 'timeline', 'education', 'background']):
        links.append({'label': 'Resume', 'href': '/pages/resume.html'})
    if any(word in q for word in ['skill', 'stack', 'python', 'c++', 'azure', 'rtmaps', 'supabase', 'ml']):
        links.append({'label': 'Stack', 'href': '/pages/stack.html'})
    links.append({'label': 'Projects', 'href': '/pages/projects.html'})
    for chunk in retrieved:
        if chunk['type'] == 'project':
            links.append({'label': chunk['title'], 'href': chunk['href']})
            if chunk.get('repo'):
                links.append({'label': f"{chunk['title']} repo", 'href': chunk['repo']})
        elif chunk['type'] == 'repo':
            links.append({'label': chunk['title'], 'href': chunk['href']})
        elif chunk['type'] == 'skill':
            links.append({'label': f"{chunk['title']} stack map", 'href': chunk['href']})
        elif chunk['type'] == 'experience':
            links.append({'label': 'Resume timeline', 'href': chunk['href']})
    seen = set()
    unique = []
    for link in links:
        key = (link['label'], link['href'])
        if key not in seen:
            unique.append(link)
            seen.add(key)
    return unique[:6]


def context_from_chunks(chunks):
    lines = []
    for chunk in chunks:
        lines.append(f"[{chunk['type'].upper()}] {chunk['title']}: {chunk['text']}")
    return '\n'.join(lines)




def build_system_prompt(retrieved, links):
    link_lines = "\n".join(f"- {item['label']}: {item['href']}" for item in links[:4])
    return (
        "You are Danish Nadar's portfolio avatar. "
        "Answer only from the supplied portfolio context. "
        "Be direct, short, natural, and conversational. "
        "Most answers must be 2-3 concise sentences, under 70 words total. Do not use markdown, numbered lists, or raw URLs. "
        "Answer the user's actual question first. "
        "Only mention a relevant page or repo if it truly helps. "
        "Never ramble, never repeat yourself, and always end with a complete final sentence.\n\n"
        f"Useful links if relevant:\n{link_lines}\n\n"
        f"Portfolio context:\n{context_from_chunks(retrieved[:3])}"
    )

def collect_links(message: str, retrieved):
    q = clean(message).lower()
    identity = PORTFOLIO['identity']
    links = []
    if any(word in q for word in ['contact', 'hire', 'email', 'meeting', 'linkedin', 'github']):
        links.extend([
            {'label': 'Contact Danish', 'href': '/pages/contact.html'},
            {'label': 'LinkedIn', 'href': identity['linkedin']},
            {'label': 'GitHub', 'href': identity['github']}
        ])
    if any(word in q for word in ['resume', 'experience', 'timeline', 'education', 'background']):
        links.append({'label': 'Resume', 'href': '/pages/resume.html'})
    if any(word in q for word in ['skill', 'stack', 'python', 'c++', 'azure', 'rtmaps', 'supabase', 'ml']):
        links.append({'label': 'Stack', 'href': '/pages/stack.html'})
    for chunk in retrieved:
        if chunk['type'] == 'project':
            links.append({'label': chunk['title'], 'href': chunk['href']})
            if chunk.get('repo'):
                links.append({'label': f"{chunk['title']} repo", 'href': chunk['repo']})
        elif chunk['type'] == 'repo':
            links.append({'label': chunk['title'], 'href': chunk['href']})
        elif chunk['type'] == 'experience':
            links.append({'label': 'Resume timeline', 'href': chunk['href']})
        elif chunk['type'] == 'skill':
            links.append({'label': f"{chunk['title']} stack map", 'href': chunk['href']})
        elif chunk['type'] == 'identity':
            links.append({'label': 'Contact Danish', 'href': '/pages/contact.html'})
    links.append({'label': 'Projects', 'href': '/pages/projects.html'})
    seen = set()
    unique = []
    for link in links:
        key = (link['label'], link['href'])
        if key not in seen:
            unique.append(link)
            seen.add(key)
    return unique[:6]


def stream_ollama_answer(message: str, retrieved, total_score: float):
    global ACTIVE_MODEL
    if ACTIVE_MODEL is None:
        ACTIVE_MODEL = detect_ollama_model()
    if not ACTIVE_MODEL:
        raise RuntimeError('No local Ollama model detected')
    links = collect_links(message, retrieved)
    prompt = build_system_prompt(retrieved, links) + "\n\nUser question: " + clean(message) + "\nAssistant:"
    payload = json.dumps({
        'model': ACTIVE_MODEL,
        'stream': True,
        'prompt': prompt,
        'keep_alive': '24h',
        'options': {
            'temperature': 0.08,
            'top_p': 0.82,
            'top_k': 24,
            'repeat_penalty': 1.05,
            'num_ctx': 2048,
            'num_predict': 160
        }
    }).encode('utf-8')
    req = request.Request(f"{OLLAMA_HOST}/api/generate", data=payload, headers={'Content-Type': 'application/json'})
    return req, links


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/avatar/status':
            global ACTIVE_MODEL
            if ACTIVE_MODEL is None:
                ACTIVE_MODEL = detect_ollama_model()
            tts_status = AVATAR_TTS.status()
            body = json.dumps({
                'llm_enabled': bool(ACTIVE_MODEL),
                'model': ACTIVE_MODEL or '',
                'host': OLLAMA_HOST,
                'tts_enabled': bool(tts_status.get('enabled')),
                'tts_reason': tts_status.get('reason', ''),
                'tts_voice_label': tts_status.get('voice_label', ''),
                'tts_voice_sample_count': tts_status.get('voice_sample_count', 0),
                'tts_voice_samples': tts_status.get('voice_samples', []),
                'tts_language': tts_status.get('language', ''),
                'tts_speaker': tts_status.get('speaker', ''),
                'tts_device': tts_status.get('device', ''),
                'tts_last_error': tts_status.get('last_error', ''),
            }).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()

    def do_POST(self):
        length = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(length).decode('utf-8') if length else '{}'
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = {}

        if self.path == '/api/avatar/tts':
            text = clean(payload.get('text', ''))
            try:
                audio_path = AVATAR_TTS.synthesize(text)
                data = audio_path.read_bytes()
                self.send_response(200)
                self.send_header('Content-Type', 'audio/wav')
                self.send_header('Content-Length', str(len(data)))
                self.send_header('X-TTS-Engine', 'OpenVoice')
                self.end_headers()
                self.wfile.write(data)
            except Exception as exc:
                body = json.dumps({'error': str(exc)}).encode('utf-8')
                self.send_response(503)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)
            return

        if self.path != '/api/avatar/stream':
            self.send_error(404, 'Not found')
            return

        message = clean(payload.get('message', ''))
        retrieved, total_score = retrieve(message)
        try:
            req, links = stream_ollama_answer(message, retrieved, total_score)
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'close')
            self.end_headers()
            with request.urlopen(req, timeout=180) as resp:
                for raw_line in resp:
                    line = raw_line.decode('utf-8').strip()
                    if not line:
                        continue
                    try:
                        event = json.loads(line)
                    except json.JSONDecodeError:
                        continue
                    delta = event.get('response', '')
                    if delta:
                        chunk = json.dumps({'delta': delta})
                        self.wfile.write(f'data: {chunk}\n\n'.encode('utf-8'))
                        self.wfile.flush()
                    if event.get('done'):
                        final = json.dumps({'done': True, 'links': links, 'model': ACTIVE_MODEL})
                        self.wfile.write(f'data: {final}\n\n'.encode('utf-8'))
                        self.wfile.flush()
                        self.close_connection = True
                        return
        except Exception as exc:
            body = json.dumps({'error': str(exc)}).encode('utf-8')
            self.send_response(503)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)



if __name__ == '__main__':
    ACTIVE_MODEL = detect_ollama_model()
    print(f'Serving portfolio at http://127.0.0.1:{PORT}')
    if ACTIVE_MODEL:
        print(f'Live local LLM enabled with model: {ACTIVE_MODEL}')
    else:
        print('No local Ollama model detected. Run `ollama pull qwen2.5:0.5b` for the fastest recommended avatar model, then start Ollama.')
    server = ThreadingHTTPServer(('0.0.0.0', PORT), PortfolioHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
