#!/usr/bin/env python3
import json
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import request

ROOT = Path(__file__).resolve().parent
PORTFOLIO = json.loads((ROOT / 'assets' / 'portfolio_data.json').read_text())
PORT = int(os.environ.get('PORT', '8080'))
OLLAMA_HOST = os.environ.get('OLLAMA_HOST', 'http://127.0.0.1:11434').rstrip('/')
PREFERRED_MODELS = ('llama3.1', 'llama3', 'qwen2.5', 'qwen3', 'mistral', 'gemma3', 'gemma2')
ACTIVE_MODEL = None


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
    try:
        with request.urlopen(f"{OLLAMA_HOST}/api/tags", timeout=2.5) as resp:
            payload = json.loads(resp.read().decode('utf-8'))
        models = [item.get('name', '') for item in payload.get('models', []) if item.get('name')]
        if not models:
            return None
        for pref in PREFERRED_MODELS:
            for model in models:
                if model.lower().startswith(pref):
                    return model
        return models[0]
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
    top = [chunk for _, chunk in scored[:7]]
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



