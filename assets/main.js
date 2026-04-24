const DATA = window.PORTFOLIO_DATA;

const icons = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10.5V19h11v-8.5"/><path d="M10 19v-4.5h4V19"/></svg>`,
  projects: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>`,
  stack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 17 8 4 8-4"/></svg>`,
  resume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M15 3v5h5"/><path d="M9 12h6M9 16h6"/></svg>`,
  articles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v16H7.5A2.5 2.5 0 0 0 5 22V6.5Z"/><path d="M5 6.5A2.5 2.5 0 0 1 7.5 9H19"/></svg>`,
  contact: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H9l-4 3v-3.5"/></svg>`,
  avatar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/><path d="M7.5 10.5h1.7M14.8 10.5h1.7"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.02 2.02 0 1 0 5.3 7.03 2.02 2.02 0 0 0 5.25 3Zm6.9 5.5H8.88V20h3.26v-5.7c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.7 1.86 3.06V20h3.27v-6.28c0-3.08-.66-5.45-4.27-5.45-1.73 0-2.88.95-3.35 1.85h-.05V8.5Z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.69-.22.69-.48l-.01-1.71c-2.8.61-3.39-1.34-3.39-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.05 1.53 1.05.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.64-1.33-2.23-.25-4.57-1.1-4.57-4.94 0-1.1.4-2 1.03-2.7-.1-.25-.45-1.28.1-2.66 0 0 .84-.26 2.75 1.03A9.67 9.67 0 0 1 12 6.84a9.7 9.7 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.7 0 3.85-2.34 4.68-4.57 4.93.36.3.68.89.68 1.8l-.01 2.67c0 .26.18.58.7.48A10 10 0 0 0 12 2Z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h5v5"/><path d="M10 14 19 5"/><path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  appliedAI: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="M9 9.5h6v5H9z"/><path d="M12 1.5v3M12 19.5v3M3 12h3M18 12h3"/></svg>`,
  roboticsLane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.7 5.7l2.1 2.1M16.2 16.2l2.1 2.1M18.3 5.7l-2.1 2.1M7.8 16.2l-2.1 2.1"/><circle cx="12" cy="12" r="8" stroke-opacity=".5"/></svg>`,
  securityLane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z"/><path d="M9 12.5 11.2 14.7 15.5 10.4"/><path d="M12 3v17" stroke-opacity=".35"/></svg>`,
  productLane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="M7 9h10M7 13h6"/><path d="M16 16h2.5"/><path d="M7 5V3.5M17 5V3.5"/></svg>`,
  python: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8.2 4.5h4.6A3.2 3.2 0 0 1 16 7.7v2.1H9.1A2.6 2.6 0 0 0 6.5 12.4v2.2A4 4 0 0 0 10.5 18h5.2"/><path d="M15.8 19.5h-4.6A3.2 3.2 0 0 1 8 16.3v-2.1h6.9a2.6 2.6 0 0 0 2.6-2.6V9.4A4 4 0 0 0 13.5 6H8.3"/><circle cx="10.2" cy="7.1" r=".8" fill="currentColor" stroke="none"/><circle cx="13.8" cy="16.9" r=".8" fill="currentColor" stroke="none"/></svg>`,
  cpp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5A7 7 0 1 0 14.5 18.5"/><path d="M17 9v6M20 9v6M15.5 12h6"/></svg>`,
  ml: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7.7 10.9 10.3 7.1M13.7 7.1l2.6 3.8M16.3 13.1l-2.6 3.8M10.3 16.9 7.7 13.1"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 18H6.8a3.8 3.8 0 0 1-.2-7.6 5.6 5.6 0 0 1 10.8 1.5A3.6 3.6 0 1 1 17.8 18H7.5Z"/><path d="M12 9.5v6M9.5 13h5"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
  deploy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h6v4H4zM14 7h6v4h-6zM9 13h6v4H9z"/><path d="M10 9h4M12 11v2"/><path d="M7 11v2h10v-2"/></svg>`,
  sensor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.2"/><path d="M12 12 17.5 8.5"/><path d="M12 4v2M4 12h2M18 12h2M12 18v2"/></svg>`,
  integrations: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="6" height="6" rx="1.5"/><rect x="14" y="12" width="6" height="6" rx="1.5"/><path d="M10 9h4v6M14 15h-1.5"/><path d="M17 12V9h-3"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z"/><path d="M12 7v10M8.5 12H15.5"/></svg>`,
  analytics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-4"/><circle cx="7" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="4" r="1" fill="currentColor" stroke="none"/><circle cx="17" cy="11" r="1" fill="currentColor" stroke="none"/></svg>`
};

function pageName() {
  return location.pathname.split('/').pop() || 'index.html';
}

function isRootPage() {
  return pageName() === 'index.html';
}

function rootPrefix() {
  return isRootPage() ? '' : '../';
}

function pagePrefix() {
  return isRootPage() ? 'pages/' : '';
}

function assetPrefix() {
  return `${rootPrefix()}assets/images`;
}

function projectHref(project) {
  return `${pagePrefix()}${project.page}`;
}

function repoTitleHref(repo) {
  const byRepo = DATA.projects.find(project => project.github && project.github === repo.href);
  return byRepo ? projectHref(byRepo) : repo.href;
}

function injectChrome() {
  const current = pageName();
  const navTarget = document.querySelector('[data-nav]');
  const footerTarget = document.querySelector('[data-footer]');
  const navItems = [
    { file: 'index.html', label: 'Home', icon: 'home', href: `${rootPrefix()}index.html`, active: current === 'index.html' },
    { file: 'projects.html', label: 'Projects', icon: 'projects', href: `${pagePrefix()}projects.html`, active: current === 'projects.html' || current.startsWith('project-'), dropdown: true },
    { file: 'stack.html', label: 'Stack', icon: 'stack', href: `${pagePrefix()}stack.html`, active: current === 'stack.html' },
    { file: 'resume.html', label: 'Resume', icon: 'resume', href: `${pagePrefix()}resume.html`, active: current === 'resume.html' },
    { file: 'articles.html', label: 'Articles', icon: 'articles', href: `${pagePrefix()}articles.html`, active: current === 'articles.html' },
    { file: 'contact.html', label: 'Contact', icon: 'contact', href: `${pagePrefix()}contact.html`, active: current === 'contact.html' },
    { file: 'avatar.html', label: 'Avatar', icon: 'avatar', href: `${pagePrefix()}avatar.html`, active: current === 'avatar.html' }
  ];

  const dropdownMarkup = `
    <div class="nav-dropdown">
      <a class="dropdown-link" href="${pagePrefix()}projects.html"><span>All projects</span><span>${icons.arrow}</span></a>
      ${DATA.projects.map(project => `
        <a class="dropdown-link" href="${projectHref(project)}">
          <div>
            <strong>${project.title}</strong>
            <small>${project.domain}</small>
          </div>
          <span>${icons.arrow}</span>
        </a>`).join('')}
    </div>`;

  if (navTarget) {
    navTarget.innerHTML = `
      <header class="topbar">
        <div class="container topbar-inner">
          <a class="brand" href="${rootPrefix()}index.html">
            <img class="brand-mark" src="${assetPrefix()}/dn-logo.png" alt="DN logo" />
            <div class="brand-copy">
              <span class="brand-kicker">AI Engineer</span>
              <span class="brand-name">Danish Nadar</span>
            </div>
          </a>
          <nav class="nav-links" aria-label="Primary">
            ${navItems.map(item => item.dropdown ? `
              <div class="nav-item has-dropdown ${item.active ? 'active' : ''}">
                <a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">
                  <span class="nav-icon">${icons[item.icon]}</span>
                  <span>${item.label}</span>
                  <span class="nav-caret">${icons.chevron}</span>
                </a>
                ${dropdownMarkup}
              </div>` : `
              <a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">
                <span class="nav-icon">${icons[item.icon]}</span>
                <span>${item.label}</span>
              </a>`).join('')}
          </nav>
          <div class="nav-actions">
            <div class="inline-icons">
              <a class="icon-btn" href="${DATA.identity.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn">${icons.linkedin}</a>
              <a class="icon-btn" href="${DATA.identity.github}" target="_blank" rel="noreferrer" aria-label="GitHub">${icons.github}</a>
              <a class="icon-btn" href="mailto:${DATA.identity.email}" aria-label="Email">${icons.email}</a>
            </div>
            <a class="cta-btn compact" href="${pagePrefix()}contact.html#call">Book a Meeting</a>
          </div>
        </div>
      </header>`;
    
navTarget.querySelectorAll('.has-dropdown').forEach(item => {
  let timer;
  const openMenu = () => {
    clearTimeout(timer);
    item.classList.add('open');
  };
  const closeMenu = () => {
    timer = setTimeout(() => item.classList.remove('open'), 220);
  };
  item.addEventListener('pointerenter', openMenu);
  item.addEventListener('pointerleave', (event) => {
    if (event.relatedTarget && item.contains(event.relatedTarget)) return;
    closeMenu();
  });
  item.addEventListener('focusin', openMenu);
  item.addEventListener('focusout', (event) => {
    if (event.relatedTarget && item.contains(event.relatedTarget)) return;
    item.classList.remove('open');
  });
  const trigger = item.querySelector('.nav-link');
  if (trigger) {
    trigger.addEventListener('click', (event) => {
      if (!item.classList.contains('open')) {
        event.preventDefault();
        openMenu();
      }
    });
  }
});
document.addEventListener('pointerdown', (event) => {
  if (!navTarget.contains(event.target)) {
    navTarget.querySelectorAll('.has-dropdown.open').forEach(item => item.classList.remove('open'));
  }
});
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="footer">
        <div class="container footer-inner">
          <div class="footer-brand">
            <img src="${assetPrefix()}/dn-logo.png" alt="DN logo" />
            <span>Prototype → impact across AI, robotics, automation, and systems.</span>
          </div>
          <div class="inline-icons">
            <a class="icon-btn" href="${DATA.identity.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn">${icons.linkedin}</a>
            <a class="icon-btn" href="${DATA.identity.github}" target="_blank" rel="noreferrer" aria-label="GitHub">${icons.github}</a>
            <a class="icon-btn" href="mailto:${DATA.identity.email}" aria-label="Email">${icons.email}</a>
          </div>
        </div>
      </footer>`;
  }
}

function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const red = document.createElement('div');
  const blue = document.createElement('div');
  const ring = document.createElement('div');
  red.className = 'cursor-glow cursor-red';
  blue.className = 'cursor-glow cursor-blue';
  ring.className = 'cursor-ring';
  document.body.append(red, blue, ring);
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let redX = mouseX;
  let redY = mouseY;
  let blueX = mouseX;
  let blueY = mouseY;
  document.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    ring.style.left = `${mouseX}px`;
    ring.style.top = `${mouseY}px`;
  });
  const tick = () => {
    redX += (mouseX - redX) * 0.18;
    redY += (mouseY - redY) * 0.18;
    blueX += (mouseX - blueX) * 0.1;
    blueY += (mouseY - blueY) * 0.1;
    red.style.left = `${redX}px`;
    red.style.top = `${redY}px`;
    blue.style.left = `${blueX}px`;
    blue.style.top = `${blueY}px`;
    requestAnimationFrame(tick);
  };
  tick();
}

function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}



function avatarFrameSet() {
  const base = assetPrefix();
  return {
    idle: `${base}/avatar30-idle.png`,
    mouth: [
      `${base}/avatar30-speak1.png`,
      `${base}/avatar30-speak2.png`,
      `${base}/avatar30-speak3.png`,
      `${base}/avatar30-speak4.png`,
      `${base}/avatar30-speak5.png`
    ],
    blink: [
      `${base}/avatar30-idle.png`,
      `${base}/avatar30-blink1.png`,
      `${base}/avatar30-blink2.png`,
      `${base}/avatar30-blink3.png`,
      `${base}/avatar30-blink4.png`,
      `${base}/avatar30-blink3.png`,
      `${base}/avatar30-blink2.png`,
      `${base}/avatar30-blink1.png`,
      `${base}/avatar30-idle.png`
    ]
  };
}

function preloadAvatarFrames(frames) {
  const urls = [frames.idle, ...(frames.mouth || []), ...(frames.blink || [])];
  return Promise.all(urls.map((src) => new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'sync';
    img.loading = 'eager';
    img.onload = () => resolve([src, img]);
    img.onerror = () => resolve([src, null]);
    img.src = src;
  }))).then((entries) => {
    return Object.fromEntries(entries.filter(([, img]) => !!img));
  });
}

function avatarModelMarkup(compact = false) {
  return `
    <div class="avatar-holo live2d ${compact ? 'compact' : 'full'}" data-avatar-model>
      <div class="avatar-holo-rings"><span></span><span></span><span></span></div>
      <div class="avatar-aura red"></div>
      <div class="avatar-aura blue"></div>
      <div class="avatar-energy red"></div>
      <div class="avatar-energy blue"></div>
      <div class="avatar-live" data-avatar-panel>
        <div class="avatar-live-stack" data-avatar-stack>
          <canvas class="avatar-live-canvas" data-avatar-canvas width="820" height="980" aria-label="Stylized 2D avatar of Danish Nadar" role="img"></canvas>
          <div class="avatar-shimmer"></div>
        </div>
      </div>
      <div class="avatar-float-orbs"><span></span><span></span><span></span><span></span><span></span></div>
    </div>`;
}
function getAvatarRenderConfig(model) {
  if (!model) return { scale: 0.98, x: 0, y: 0 };
  if (model.classList.contains('compact')) {
    return { scale: 0.88, x: 0, y: 10 };
  }
  return { scale: 0.82, x: 0, y: 8 };
}

function applyAvatarFrame(model, src) {
  if (!model || !src) return;
  const canvas = model.querySelector('[data-avatar-canvas]');
  const ctx = canvas?.getContext('2d');
  const img = model.__avatarImages?.[src];
  if (!canvas || !ctx || !img) return;
  if (model.__currentAvatarFrame === src) return;
  model.__currentAvatarFrame = src;

  const render = getAvatarRenderConfig(model);
  const fit = Math.min(canvas.width / img.width, canvas.height / img.height) * render.scale;
  const dw = img.width * fit;
  const dh = img.height * fit;
  const dx = (canvas.width - dw) / 2 + render.x;
  const dy = (canvas.height - dh) / 2 + render.y;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, dx, dy, dw, dh);
}

function setAvatarSpeaking(active, intensity = 0.6) {
  document.querySelectorAll('[data-avatar-model]').forEach(model => {
    model.classList.toggle('is-speaking', !!active);
    stopAvatarMouthLoop(model, !!active);
    model.__isSpeaking = !!active;
    if (active) pulseAvatarMouth(model, intensity);
  });
}

function pulseAvatarMouth(model, intensity = 0.8) {
  if (!model || model.__isBlinking) return;
  const frames = model.__avatarFrames?.mouth || [];
  if (!frames.length) return;
  const seq = [0, 1, 2, 3, 4, 3, 2, 1];
  model.__mouthPulseIndex = ((model.__mouthPulseIndex || 0) + 1) % seq.length;
  applyAvatarFrame(model, frames[seq[model.__mouthPulseIndex]]);
  clearTimeout(model.__mouthReset);
  model.__mouthReset = setTimeout(() => {
    if (!model.__isBlinking && !model.__mouthLoop) applyAvatarFrame(model, model.__avatarFrames.idle);
  }, Math.max(70, 140 - Math.floor(intensity * 28)));
}

function startAvatarMouthLoop(model, intensity = 0.6) {
  if (!model || model.__isBlinking) return;
  stopAvatarMouthLoop(model, true);
  model.__isSpeaking = true;
  const frames = model.__avatarFrames?.mouth || [];
  if (!frames.length) return;
  const seq = [0, 1, 2, 3, 4, 3, 2, 1];
  let idx = 0;
  const cadence = Math.max(82, 126 - Math.floor(intensity * 22));
  applyAvatarFrame(model, frames[seq[0]]);
  model.__mouthLoop = setInterval(() => {
    if (model.__isBlinking) return;
    idx = (idx + 1) % seq.length;
    applyAvatarFrame(model, frames[seq[idx]]);
  }, cadence);
}

function stopAvatarMouthLoop(model, keepSpeakingClass = false) {
  if (!model) return;
  clearInterval(model.__mouthLoop);
  clearTimeout(model.__mouthReset);
  model.__mouthLoop = null;
  model.__isSpeaking = false;
  if (!keepSpeakingClass) model.classList.remove('is-speaking');
  if (!model.__isBlinking && model.__avatarFrames) applyAvatarFrame(model, model.__avatarFrames.idle);
}

function triggerAvatarBlink(model) {
  if (!model || model.__isBlinking || !model.__avatarFrames) return;
  model.__isBlinking = true;
  model.classList.add('is-blinking');
  const wasSpeaking = !!model.__mouthLoop || !!model.__isSpeaking;
  if (model.__mouthLoop) clearInterval(model.__mouthLoop);
  model.__mouthLoop = null;
  const seq = model.__avatarFrames.blink;
  let i = 0;
  const durations = [42, 54, 62, 72, 82, 72, 62, 54, 42];
  const step = () => {
    applyAvatarFrame(model, seq[i]);
    if (i < seq.length - 1) {
      const wait = durations[i] || 60;
      i += 1;
      model.__blinkOff = setTimeout(step, wait);
    } else {
      model.classList.remove('is-blinking');
      model.__isBlinking = false;
      if (wasSpeaking) startAvatarMouthLoop(model, 0.9);
      else applyAvatarFrame(model, model.__avatarFrames.idle);
    }
  };
  step();
}

function scheduleAvatarBlink(model) {
  const loop = () => {
    const next = 2400 + Math.random() * 3600;
    model.__blinkTimer = setTimeout(() => {
      triggerAvatarBlink(model);
      if (Math.random() < 0.18) {
        setTimeout(() => triggerAvatarBlink(model), 190);
      }
      loop();
    }, next);
  };
  loop();
}

function setAvatarModels() {
  document.querySelectorAll('[data-avatar-slot]').forEach(slot => {
    const compact = slot.dataset.avatarSlot === 'compact';
    slot.innerHTML = avatarModelMarkup(compact);
  });

  document.querySelectorAll('[data-avatar-model]').forEach(model => {
    const isCompact = model.classList.contains('compact');
    model.__avatarFrames = avatarFrameSet();
    preloadAvatarFrames(model.__avatarFrames).then((images) => {
      model.__avatarImages = images;
      applyAvatarFrame(model, model.__avatarFrames.idle);
    });
    const live = model.querySelector('[data-avatar-panel]');
    const stack = model.querySelector('[data-avatar-stack]');
    const liveArt = model.querySelector('.avatar-live-canvas');
    const shimmer = model.querySelector('.avatar-shimmer');
    const rings = model.querySelector('.avatar-holo-rings');
    const redAura = model.querySelector('.avatar-aura.red');
    const blueAura = model.querySelector('.avatar-aura.blue');
    const redEnergy = model.querySelector('.avatar-energy.red');
    const blueEnergy = model.querySelector('.avatar-energy.blue');
    if (!model.__blinkTimer) scheduleAvatarBlink(model);
    model.addEventListener('pointermove', (e) => {
      const rect = model.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      const tx = x * 14;
      const ty = y * 12;
      if (live) live.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateY(${x * 8}deg) rotateX(${y * -6}deg)`;
      if (stack) stack.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0)`;
      if (liveArt) liveArt.style.transform = `translate3d(${x * 6}px, ${y * 3}px, 0) scale(${isCompact ? 1.01 : 1.03})`;
      if (shimmer) shimmer.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0)`;
      if (rings) rings.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
      if (redAura) redAura.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0) scale(1.04)`;
      if (blueAura) blueAura.style.transform = `translate3d(${x * -18}px, ${y * 14}px, 0) scale(1.04)`;
      if (redEnergy) redEnergy.style.transform = `translate3d(${x * -12}px, ${y * 8}px, 0) rotate(${x * 6}deg)`;
      if (blueEnergy) blueEnergy.style.transform = `translate3d(${x * 12}px, ${y * -8}px, 0) rotate(${x * -6}deg)`;
    });
    model.addEventListener('pointerleave', () => {
      if (live) live.style.transform = 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)';
      if (stack) stack.style.transform = 'translate3d(0,0,0)';
      if (liveArt) liveArt.style.transform = 'translate3d(0,0,0) scale(1.02)';
      if (shimmer) shimmer.style.transform = 'translate3d(0,0,0)';
      if (rings) rings.style.transform = 'translate3d(0,0,0)';
      if (redAura) redAura.style.transform = 'translate3d(0,0,0) scale(1)';
      if (blueAura) blueAura.style.transform = 'translate3d(0,0,0) scale(1)';
      if (redEnergy) redEnergy.style.transform = 'translate3d(0,0,0) rotate(0deg)';
      if (blueEnergy) blueEnergy.style.transform = 'translate3d(0,0,0) rotate(0deg)';
    });
  });
}

function visualPlaceholder(project, large = false) {
  if (project.image) {
    return `
      <div class="project-visual visual-${project.visualType} ${large ? 'large' : ''} visual-image-card">
        <span class="visual-badge">${project.visualLabel}</span>
        <img class="project-image" src="${assetPrefix()}/${project.image}" alt="${project.title} visual" />
        <p class="visual-note">${project.visualHint}</p>
      </div>`;
  }
  return `
    <div class="project-visual visual-${project.visualType} ${large ? 'large' : ''}">
      <span class="visual-badge">${project.visualLabel}</span>
      <div class="visual-core">
        ${visualCore(project.visualType)}
      </div>
      <p class="visual-note">${project.visualHint}</p>
    </div>`;
}

function visualCore(type) {
  switch (type) {
    case 'terminal':
      return `<div class="terminal-art"><span></span><span></span><span></span><span class="cursor"></span></div>`;
    case 'voice':
      return `<div class="voice-art"><span></span><span></span><span></span><span></span><span></span></div>`;
    case 'workflow':
      return `<div class="workflow-art"><i></i><i></i><i></i><b></b><b></b></div>`;
    case 'sensor':
      return `<div class="sensor-art"><span class="ring a"></span><span class="ring b"></span><span class="node one"></span><span class="node two"></span><span class="beam"></span></div>`;
    case 'dashboard':
      return `<div class="dashboard-art"><span></span><span></span><span></span><span></span></div>`;
    case 'classifier':
      return `<div class="classifier-art"><span></span><span></span><span></span><span></span><span></span><em></em></div>`;
    case 'ranking':
      return `<div class="ranking-art"><span></span><span></span><span></span><span></span></div>`;
    case 'anomaly':
      return `<div class="anomaly-art">${'<span></span>'.repeat(16)}</div>`;
    case 'assistant':
      return `<div class="assistant-art"><span class="bubble one"></span><span class="bubble two"></span><span class="wave"></span></div>`;
    case 'browser':
      return `<div class="browser-art"><span class="top"></span><span class="panel one"></span><span class="panel two"></span><span class="panel three"></span></div>`;
    default:
      return `<div class="workflow-art"><i></i><i></i><i></i><b></b><b></b></div>`;
  }
}

function renderHome() {
  if (!document.querySelector('[data-home]')) return;
  const metricWrap = document.querySelector('[data-home-metrics]');
  metricWrap.innerHTML = DATA.homeMetrics.map(item => `
    <article class="stat-card fade-up">
      <div class="metric-value">${item.value}</div>
      <div class="metric-label">${item.label}</div>
    </article>`).join('');

  document.querySelector('[data-focus-grid]').innerHTML = DATA.focusLanes.map((lane, index) => `
    <article class="card fade-up" style="transition-delay:${index * 60}ms">
      <div class="icon-shell futuristic">${icons[lane.icon]}</div>
      <h3>${lane.title}</h3>
      <p>${lane.copy}</p>
      <div class="mini-list">
        ${lane.points.map(point => `<div class="mini-list-item">${point}</div>`).join('')}
      </div>
    </article>`).join('');

  document.querySelector('[data-snapshot-grid]').innerHTML = DATA.snapshots.map((item, index) => `
    <article class="stat-card fade-up" style="transition-delay:${index * 60}ms">
      <div class="snapshot-value">${item.value}</div>
      <div class="snapshot-title">${item.label}</div>
    </article>`).join('');

  document.querySelector('[data-featured-projects]').innerHTML = DATA.projects.slice(0, 4).map((project, idx) => projectCard(project, idx)).join('');
  renderTestimonials('[data-testimonials-preview]', 2);
  renderArticles('[data-articles-preview]', 2);
}

function projectCard(project, idx = 0) {
  return `
    <article class="project-card fade-up" data-domain="${project.domainSlug}" id="${project.id}" style="transition-delay:${idx * 45}ms">
      <div class="project-top">
        <div>
          <div class="project-domain">${project.domain}</div>
          <h3><a class="project-title-link" href="${projectHref(project)}">${project.title}</a></h3>
        </div>
        <span class="tag">${project.period}</span>
      </div>
      <a class="project-visual-anchor" href="${projectHref(project)}" aria-label="Open ${project.title} case page">
        ${visualPlaceholder(project)}
      </a>
      <p>${project.summary}</p>
      <div class="project-tech">${project.skills.map(skill => `<span class="chip">${skill}</span>`).join('')}</div>
      <div class="project-meta stacked">
        <span>${project.showcase}</span>
        ${project.githubNote ? `<span class="section-copy" style="font-size:.95rem;">${project.githubNote}</span>` : ''}
        <div class="project-card-actions">
          <a class="secondary-btn slim" href="${projectHref(project)}">Open case page</a>
          ${project.github ? `<a class="ghost-btn slim" href="${project.github}" target="_blank" rel="noreferrer">GitHub repo</a>` : `<a class="ghost-btn slim" href="${pagePrefix()}projects.html#${project.id}">Project archive</a>`}
        </div>
      </div>
    </article>`;
}

function renderProjects() {
  const grid = document.querySelector('[data-project-grid]');
  const githubGrid = document.querySelector('[data-github-grid]');
  if (grid) {
    grid.innerHTML = DATA.projects.map((project, idx) => projectCard(project, idx)).join('');
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.filter;
        grid.querySelectorAll('.project-card').forEach(card => {
          const show = type === 'all' || card.dataset.domain === type;
          card.classList.toggle('hide', !show);
        });
      });
    });
  }
  if (githubGrid) {
    githubGrid.innerHTML = DATA.githubRepos.map((repo, idx) => `
      <article class="repo-card fade-up" style="transition-delay:${idx * 40}ms">
        <div class="repo-head">
          <div>
            <span class="article-kicker">${repo.updated}</span>
            <h3 class="repo-name"><a class="repo-title-link" href="${repoTitleHref(repo)}" ${repoTitleHref(repo).startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${repo.name}</a></h3>
          </div>
          <span class="tag">${repo.language}</span>
        </div>
        <p><strong>${repo.title}</strong> · ${repo.summary}</p>
        <div class="repo-meta">
          <span class="chip">GitHub</span>
          <span class="chip">Public repo</span>
        </div>
        <div class="card-actions">
          <a class="secondary-btn" href="${repo.href}" target="_blank" rel="noreferrer">Open repo ${icons.external}</a>
          <a class="ghost-btn" href="${DATA.identity.github}" target="_blank" rel="noreferrer">Profile</a>
        </div>
      </article>`).join('');
  }
}

function skillCountWidth(skill) {
  const maxCount = Math.max(...DATA.skills.map(item => item.projects.length));
  return Math.max(12, (skill.projects.length / maxCount) * 100);
}

function renderStack() {
  const skillGrid = document.querySelector('[data-skill-grid]');
  const proofWrap = document.querySelector('[data-proof-wrap]');
  if (!skillGrid || !proofWrap) return;

  proofWrap.innerHTML = `
    <div class="skill-bars">
      ${DATA.skills.map(skill => `
        <div class="skill-row">
          <div class="skill-row-head">
            <strong>${skill.name}</strong>
            <span>${skill.projects.length} linked project${skill.projects.length === 1 ? '' : 's'}</span>
          </div>
          <div class="showcase-bar"><span style="width:${skillCountWidth(skill)}%"></span></div>
        </div>`).join('')}
    </div>
    <div class="showcase-note">Counts reflect explicit project links and case pages, not self-scored percentages.</div>`;

  skillGrid.innerHTML = DATA.skills.map((skill, idx) => {
    const projects = DATA.projects.filter(project => skill.projects.includes(project.id));
    const repoProject = projects.find(project => project.github);
    return `
      <article class="skill-card fade-up" style="transition-delay:${idx * 35}ms">
        <div class="card-top">
          <div class="icon-shell futuristic">${icons[skill.icon]}</div>
          <span class="tag">${skill.category}</span>
        </div>
        <div>
          <h3>${skill.name}</h3>
          <p>${skill.short}</p>
        </div>
        <div class="skill-project-links">
          ${projects.map(project => `<a class="project-link-pill" href="${projectHref(project)}">${project.title}</a>`).join('')}
        </div>
        <div class="card-actions">
          <a class="secondary-btn" href="${skill.link.startsWith('http') ? skill.link : pagePrefix() + skill.link}" ${skill.link.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>Visit ${icons.external}</a>
          ${repoProject ? `<a class="ghost-btn" href="${repoProject.github}" target="_blank" rel="noreferrer">GitHub repo</a>` : `<a class="ghost-btn" href="${projects[0] ? projectHref(projects[0]) : pagePrefix() + 'projects.html'}">Case page</a>`}
        </div>
      </article>`;
  }).join('');
}

function renderResume() {
  const wrap = document.querySelector('[data-resume-shell]');
  if (!wrap) return;
  wrap.innerHTML = `
    <section class="stats-strip fade-up">
      ${DATA.resumeStats.map(stat => `<article class="stat-card compact"><div class="big-stat">${stat.value}</div><p>${stat.label}</p></article>`).join('')}
    </section>
    <section class="section fade-up">
      <div class="section-heading single-column">
        <div>
          <h2 class="section-title">Timeline</h2>
          <p class="section-copy">A single-column view of recent roles, responsibility, and shipped work.</p>
        </div>
      </div>
      <div class="timeline-shell">
        <div class="timeline-line"></div>
        ${DATA.experience.map((item, idx) => `
          <article class="timeline-entry fade-up" style="transition-delay:${idx * 55}ms">
            <div class="timeline-dot"></div>
            <div class="timeline-date">${item.period}</div>
            <div class="timeline-card wide">
              <div class="timeline-meta"><span>${item.role}</span><span>${item.company}</span></div>
              <ul class="timeline-list">
                ${item.points.map(point => `<li>${point}</li>`).join('')}
              </ul>
            </div>
          </article>`).join('')}
      </div>
    </section>
    <section class="section resume-bottom-grid">
      <article class="panel fade-up">
        <h2 class="section-title" style="font-size:1.7rem;">Education</h2>
        <div class="education-grid">
          ${DATA.education.map(item => `<article class="detail-card"><span class="article-kicker">${item.period}</span><h3>${item.school}</h3><p>${item.degree}</p></article>`).join('')}
        </div>
      </article>
      <article class="panel fade-up">
        <h2 class="section-title" style="font-size:1.7rem;">Why this profile stands out</h2>
        <div class="wins-grid">
          ${DATA.resumeWins.map(win => `<div class="mini-list-item standout-item">${win}</div>`).join('')}
        </div>
      </article>
    </section>`;
}

function renderArticles(selector = '[data-articles]') {
  const wrap = document.querySelector(selector);
  if (!wrap) return;
  const items = selector === '[data-articles-preview]' ? DATA.articles.slice(0, 2) : DATA.articles;
  wrap.innerHTML = items.map((article, idx) => `
    <article class="article-card fade-up" style="transition-delay:${idx * 45}ms">
      <div class="placeholder-photo alt-${(idx % 3) + 1}">
        <span class="placeholder-label">Future cover / diagram</span>
      </div>
      <span class="article-kicker">${article.kicker}</span>
      <h3>${article.title}</h3>
      <p>${article.summary}</p>
      <div class="project-links" style="margin-top:16px;">
        <a class="inline-link" href="${pagePrefix()}contact.html"><span>${article.cta}</span><span>${icons.arrow}</span></a>
      </div>
    </article>`).join('');
}

function renderTestimonials(selector = '[data-testimonials]', limit = DATA.testimonials.length) {
  const wrap = document.querySelector(selector);
  if (!wrap) return;
  wrap.innerHTML = DATA.testimonials.slice(0, limit).map((item, idx) => `
    <article class="testimonial-card fade-up" style="transition-delay:${idx * 45}ms">
      <span class="article-kicker">${item.type}</span>
      <h3>${item.name}</h3>
      <p>“${item.quote}”</p>
      <small>${item.note}</small>
    </article>`).join('');
}

function renderAPIs() {
  const wrap = document.querySelector('[data-api-grid]');
  if (!wrap) return;
  wrap.innerHTML = DATA.apis.map((api, idx) => `
    <article class="detail-card fade-up" style="transition-delay:${idx * 35}ms">
      <span class="article-kicker">${api.type}</span>
      <h3>${api.name}</h3>
      <p>${api.summary}</p>
      <div class="mini-list">${api.uses.map(use => `<div class="mini-list-item">${use}</div>`).join('')}</div>
      <div class="inline-actions" style="margin-top:16px;">
        <a class="secondary-btn" href="${api.link}" target="_blank" rel="noreferrer">API docs ${icons.external}</a>
      </div>
    </article>`).join('');
}

function renderContactCards() {
  const wrap = document.querySelector('[data-contact-grid]');
  if (!wrap) return;
  wrap.innerHTML = DATA.contactWays.map((item, idx) => `
    <article class="contact-card fade-up" style="transition-delay:${idx * 40}ms">
      <span class="contact-kicker">${item.kicker}</span>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
      <div class="inline-actions" style="margin-top:16px;">
        <a class="secondary-btn" href="${item.href}" ${item.href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>Open ${icons.arrow}</a>
      </div>
    </article>`).join('');
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name=name]').value.trim();
    const email = form.querySelector('[name=email]').value.trim();
    const topic = form.querySelector('[name=topic]').value.trim();
    const message = form.querySelector('[name=message]').value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry: ${topic || 'AI / consulting'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    location.href = `mailto:${DATA.identity.email}?subject=${subject}&body=${body}`;
  });
}

function cleanText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function portfolioPages() {
  return {
    home: { label: 'Home', href: `${rootPrefix()}index.html` },
    projects: { label: 'Projects', href: `${pagePrefix()}projects.html` },
    stack: { label: 'Stack', href: `${pagePrefix()}stack.html` },
    resume: { label: 'Resume', href: `${pagePrefix()}resume.html` },
    contact: { label: 'Contact', href: `${pagePrefix()}contact.html` },
    avatar: { label: 'Avatar', href: `${pagePrefix()}avatar.html` },
    articles: { label: 'Articles', href: `${pagePrefix()}articles.html` }
  };
}

function renderAssistantLinks(links = [], host) {
  if (!host) return;
  host.innerHTML = links.map(link => `<a class="assistant-link-pill" href="${link.href}" ${String(link.href).startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${link.label}</a>`).join('');
}

async function initAvatarRuntime() {
  const nodes = document.querySelectorAll('[data-avatar-runtime]');
  if (!nodes.length) return;
  try {
    const response = await fetch(`${rootPrefix()}api/avatar/status`);
    if (!response.ok) throw new Error('status unavailable');
    const status = await response.json();
    const parts = [];
    if (status.llm_enabled) parts.push(`Live local LLM · ${status.model}`);
    else parts.push('Start Ollama to enable live answers');
    if (status.tts_enabled) parts.push(`OpenVoice TTS · ${status.tts_voice_label || 'Danish voice ready'}`);
    else if (status.tts_reason) parts.push('OpenVoice TTS unavailable');
    nodes.forEach(node => {
      node.textContent = parts.join(' · ');
      if (status.tts_reason) node.title = status.tts_reason;
    });
  } catch (error) {
    nodes.forEach(node => { node.textContent = 'Unable to check avatar runtime'; });
  }
}

function initAvatarConsole() {
  const log = document.querySelector('[data-voice-log]');
  const form = document.querySelector('[data-avatar-form]');
  const input = document.querySelector('[data-avatar-input]');
  const chips = document.querySelector('[data-avatar-links]');
  const micBtn = document.querySelector('[data-avatar-mic]');
  if (!log || !form || !input || !chips) return;

  let currentAudio = null;
  let currentAudioUrl = '';
  let currentUtterance = null;
  let ttsStatus = null;
  let recognition;
  let listening = false;
  const allowBrowserVoiceFallback = false;

  const setStatus = (message) => {
    if (!message) {
      const status = chips.querySelector('.assistant-status');
      if (status) status.remove();
      return;
    }
    chips.innerHTML = `<span class="assistant-status">${message}</span>`;
  };

  const cleanupAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio = null;
    }
    if (currentAudioUrl) {
      URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl = '';
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    currentUtterance = null;
  };

  const stopAvatarAudio = () => {
    cleanupAudio();
    setAvatarSpeaking(false);
  };

  const startSpeakingState = (message = 'Speaking response…') => {
    setStatus(message);
    document.querySelectorAll('[data-avatar-model]').forEach(model => {
      model.classList.add('is-speaking');
      startAvatarMouthLoop(model, 1.0);
    });
  };

  const finishSpeakingState = () => {
    setAvatarSpeaking(false);
    if (chips.querySelector('.assistant-status')) chips.innerHTML = '';
  };

  const speakWithBrowserVoice = (text, message = 'OpenVoice is unavailable, so browser voice is speaking instead.') => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return false;
    const cleaned = cleanText(text);
    if (!cleaned) return false;
    stopAvatarAudio();
    currentUtterance = new SpeechSynthesisUtterance(cleaned);
    currentUtterance.lang = 'en-US';
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;
    currentUtterance.onstart = () => startSpeakingState(message);
    currentUtterance.onend = () => {
      currentUtterance = null;
      finishSpeakingState();
    };
    currentUtterance.onerror = () => {
      currentUtterance = null;
      setAvatarSpeaking(false);
      setStatus('No audio voice is available in this browser right now.');
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(currentUtterance);
    return true;
  };

  const fetchAvatarStatus = async () => {
    try {
      const response = await fetch(`${rootPrefix()}api/avatar/status`);
      if (!response.ok) throw new Error('status unavailable');
      ttsStatus = await response.json();
    } catch (error) {
      ttsStatus = null;
    }
    return ttsStatus;
  };

  const playGeneratedAudio = async (text) => {
    if (!cleanText(text)) return;
    const status = ttsStatus || await fetchAvatarStatus();
    if (!status || !status.tts_enabled) {
      const reason = status?.tts_reason || 'Run the OpenVoice setup first to enable cloned speech.';
      if (allowBrowserVoiceFallback) {
        if (!speakWithBrowserVoice(text)) setStatus(reason);
      } else {
        stopAvatarAudio();
        setStatus(`OpenVoice is not ready: ${reason}`);
      }
      return;
    }

    stopAvatarAudio();
    setStatus('Rendering Danish voice…');

    const response = await fetch(`${rootPrefix()}api/avatar/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const reason = err.error || 'OpenVoice audio generation failed';
      stopAvatarAudio();
      setStatus(`OpenVoice generation failed: ${reason}`);
      throw new Error(reason);
    }

    const blob = await response.blob();
    currentAudioUrl = URL.createObjectURL(blob);
    currentAudio = new Audio(currentAudioUrl);
    currentAudio.preload = 'auto';

    currentAudio.onplaying = () => startSpeakingState('Speaking in Danish’s cloned voice…');
    currentAudio.onpause = () => {
      if (currentAudio && !currentAudio.ended) setAvatarSpeaking(false);
    };
    currentAudio.onended = () => {
      cleanupAudio();
      finishSpeakingState();
    };
    currentAudio.onerror = () => {
      cleanupAudio();
      setAvatarSpeaking(false);
      setStatus('OpenVoice audio playback failed in this browser. The browser voice fallback is disabled.');
    };

    try {
      await currentAudio.play();
    } catch (error) {
      cleanupAudio();
      setAvatarSpeaking(false);
      setStatus('OpenVoice audio was generated, but the browser blocked playback. Click Ask again after interacting with the page.');
      throw error;
    }
  };

  const addBubble = (type, text = '', links = []) => {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${type}`;
    bubble.innerHTML = `<div class="bubble-text">${text}</div><div class="bubble-links"></div>`;
    log.appendChild(bubble);
    if (links.length) renderAssistantLinks(links, bubble.querySelector('.bubble-links'));
    log.scrollTop = log.scrollHeight;
    return bubble;
  };

  const stripRawUrls = (text) => cleanText(text
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/\/pages\/[^\s)]+/gi, '')
    .replace(/\b\d+\.\s+/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,!?])/g, '$1'));

  const finalizeAssistantText = (text) => {
    let cleaned = stripRawUrls(text);
    if (!cleaned) return cleaned;
    const sentences = cleaned.match(/[^.!?]+[.!?]?/g) || [cleaned];
    let short = '';
    for (const sentence of sentences) {
      const candidate = cleanText(`${short} ${sentence}`);
      if (candidate.split(/\s+/).length > 70 && short) break;
      short = candidate;
      if (short.split(/\s+/).length >= 42 && /[.!?]$/.test(short)) break;
    }
    cleaned = short || cleaned;
    if (/[.!?]["')\]]?$/.test(cleaned)) return cleaned;
    const lastSentence = Math.max(cleaned.lastIndexOf('. '), cleaned.lastIndexOf('! '), cleaned.lastIndexOf('? '));
    if (lastSentence > 24) return cleaned.slice(0, lastSentence + 1).trim();
    return `${cleaned}.`;
  };

  const setStreamingText = (bubble, text) => {
    const slot = bubble.querySelector('.bubble-text');
    slot.textContent = stripRawUrls(text);
    log.scrollTop = log.scrollHeight;
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (micBtn) {
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;
      recognition.onstart = () => {
        listening = true;
        micBtn.classList.add('is-listening');
        micBtn.textContent = 'Listening…';
      };
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results).map(result => result[0].transcript).join(' ').trim();
        input.value = transcript;
        const last = event.results[event.results.length - 1];
        if (last && last.isFinal && transcript) ask(transcript);
      };
      recognition.onerror = () => {
        micBtn.classList.remove('is-listening');
        micBtn.textContent = 'Mic';
        listening = false;
      };
      recognition.onend = () => {
        micBtn.classList.remove('is-listening');
        micBtn.textContent = 'Mic';
        listening = false;
      };
      micBtn.addEventListener('click', () => {
        try {
          if (listening) recognition.stop();
          else recognition.start();
        } catch (error) {
          micBtn.classList.remove('is-listening');
          micBtn.textContent = 'Mic';
          listening = false;
        }
      });
    } else {
      micBtn.disabled = true;
      micBtn.textContent = 'Mic unavailable';
    }
  }

  const ask = async (message) => {
    const text = cleanText(message);
    if (!text) return;
    stopAvatarAudio();
    addBubble('user', text);
    input.value = '';
    setStatus('Streaming response…');
    const bubble = addBubble('bot', '');
    bubble.classList.add('streaming');
    const endpoint = `${rootPrefix()}api/avatar/stream`;
    let fullText = '';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (!response.ok || !response.body) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Live model unavailable');
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finalLinks = [];
      let sawDone = false;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let boundary;
        while ((boundary = buffer.indexOf('\n\n')) !== -1) {
          const rawEvent = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          const dataLine = rawEvent.split('\n').find(line => line.startsWith('data: '));
          if (!dataLine) continue;
          const event = JSON.parse(dataLine.slice(6));
          if (event.delta) {
            fullText += event.delta;
            setStreamingText(bubble, fullText);
          }
          if (event.done) {
            sawDone = true;
            finalLinks = event.links || [];
          }
        }
      }
      if (!sawDone) throw new Error('response ended unexpectedly');
      const finalText = finalizeAssistantText(fullText.trim());
      bubble.classList.remove('streaming');
      setStreamingText(bubble, finalText);
      if (finalLinks.length) {
        renderAssistantLinks(finalLinks, bubble.querySelector('.bubble-links'));
        renderAssistantLinks(finalLinks, chips);
      } else {
        chips.innerHTML = '';
      }
      await playGeneratedAudio(finalText);
    } catch (error) {
      bubble.classList.remove('streaming');
      bubble.classList.add('error');
      setAvatarSpeaking(false);
      setStreamingText(bubble, `Live avatar unavailable: ${error.message}.`);
      setStatus('Check Ollama and OpenVoice setup, then try again.');
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ask(input.value);
  });

  document.querySelectorAll('[data-avatar-q]').forEach(btn => btn.addEventListener('click', () => {
    ask(btn.dataset.avatarQ || btn.textContent.trim());
  }));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAvatarAudio();
  });

  setStatus('Ask a question to hear Danish’s cloned OpenVoice reply.');

  renderAssistantLinks([
    { label: 'Open Projects', href: `${pagePrefix()}projects.html` },
    { label: 'Open Resume', href: `${pagePrefix()}resume.html` },
    { label: 'Open Stack', href: `${pagePrefix()}stack.html` }
  ], chips);

  fetchAvatarStatus();
}

function renderProjectDetail() {
  const host = document.querySelector('[data-project-detail]');
  if (!host) return;
  const id = host.dataset.projectDetail;
  const project = DATA.projects.find(item => item.id === id);
  if (!project) return;

  const relatedSkills = DATA.skills.filter(skill => skill.projects.includes(project.id));
  const relatedProjects = DATA.projects.filter(item => item.id !== project.id && item.domainSlug === project.domainSlug).slice(0, 3);

  host.innerHTML = `
    <section class="section-block fade-up">
      <span class="eyebrow">${project.domain} · case page</span>
      <h1 class="page-title">${project.title}</h1>
      <p class="lead short">${project.summary}</p>
      <div class="hero-actions" style="margin-top:18px;">
        <a class="cta-btn" href="${pagePrefix()}contact.html">Ask about this project</a>
        ${project.github ? `<a class="secondary-btn" href="${project.github}" target="_blank" rel="noreferrer">Open GitHub ${icons.external}</a>` : `<a class="secondary-btn" href="${pagePrefix()}projects.html">Back to projects</a>`}
        <a class="ghost-btn" href="${pagePrefix()}projects.html">Back to projects</a>
      </div>
    </section>
    <section class="section detail-layout">
      <div class="detail-main">
        <article class="panel fade-up">
          <div class="project-top detail-head">
            <div>
              <div class="project-domain">${project.role}</div>
              <h2 class="section-title" style="font-size:2rem;">Overview</h2>
            </div>
            <span class="tag">${project.period}</span>
          </div>
          ${visualPlaceholder(project, true)}
          <div class="mini-list">${project.outcomes.map(point => `<div class="mini-list-item">${point}</div>`).join('')}</div>
        </article>
        <article class="panel fade-up">
          <h2 class="section-title" style="font-size:1.75rem;">Suggested visuals</h2>
          <div class="detail-visual-grid">
            ${project.detailCards.map(card => `
              <article class="detail-card placeholder-card">
                <div class="placeholder-frame"><span>${card.title}</span></div>
                <p>${card.note}</p>
              </article>`).join('')}
          </div>
        </article>
        <article class="panel fade-up">
          <h2 class="section-title" style="font-size:1.75rem;">Stack connections</h2>
          <div class="proof-grid">
            ${relatedSkills.map(skill => `
              <article class="showcase-project">
                <strong>${skill.name}</strong>
                <p>${project.proof[skill.slug] || project.summary}</p>
                <div class="project-links" style="margin-top:12px;">
                  <a class="inline-link" href="${pagePrefix()}stack.html"><span>Open stack map</span><span>${icons.arrow}</span></a>
                  ${skill.link.startsWith('http') ? `<a class="inline-link" href="${skill.link}" target="_blank" rel="noreferrer"><span>Official site</span><span>${icons.external}</span></a>` : `<a class="inline-link" href="${pagePrefix()}${skill.link}"><span>Related page</span><span>${icons.arrow}</span></a>`}
                </div>
              </article>`).join('')}
          </div>
        </article>
      </div>
      <aside class="detail-side">
        <article class="panel fade-up">
          <h2 class="section-title" style="font-size:1.55rem;">Stack used here</h2>
          <div class="skill-project-links">
            ${relatedSkills.map(skill => `<a class="project-link-pill" href="${skill.link.startsWith('http') ? skill.link : pagePrefix() + skill.link}" ${skill.link.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>${skill.name}</a>`).join('')}
          </div>
        </article>
        ${project.github ? `<article class="panel fade-up">
          <h2 class="section-title" style="font-size:1.55rem;">GitHub route</h2>
          <p class="section-copy">Open the public repository for code-level detail on this project.</p>
          <a class="cta-btn" href="${project.github}" target="_blank" rel="noreferrer">Open repo ${icons.external}</a>
        </article>` : ''}
        <article class="panel fade-up">
          <h2 class="section-title" style="font-size:1.55rem;">Related projects</h2>
          <div class="related-projects-list">
            ${relatedProjects.map(item => `<a class="related-project-card" href="${projectHref(item)}"><strong>${item.title}</strong><span>${item.domain}</span></a>`).join('') || '<p class="section-copy">This is the main showcased project in this lane right now.</p>'}
          </div>
        </article>
        <article class="panel fade-up">
          <h2 class="section-title" style="font-size:1.55rem;">Want more detail?</h2>
          <p class="section-copy">These pages are ready for screenshots, architecture diagrams, metrics, GitHub links, or demo stills whenever you want to add them.</p>
          <a class="cta-btn" href="${pagePrefix()}contact.html">Start a conversation</a>
        </article>
      </aside>
    </section>`;
}

window.addEventListener('DOMContentLoaded', () => {
  injectChrome();
  initCursorGlow();
  setAvatarModels();
  renderHome();
  renderProjects();
  renderStack();
  renderResume();
  renderAPIs();
  renderArticles();
  renderTestimonials();
  renderContactCards();
  renderProjectDetail();
  initContactForm();
  initAvatarRuntime();
  initAvatarConsole();
  observeReveal();
});
