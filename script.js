// ── Theme toggle: Auto → ☀ Claro → ☾ Oscuro → Auto ──
const html = document.documentElement;
const btn  = document.getElementById('themeBtn');
const themes = ['system', 'light', 'dark'];
const labels  = { system: 'Auto', light: '☀ Claro', dark: '☾ Oscuro' };

function applyTheme(theme) {
  const effective = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  html.setAttribute('data-theme', effective);
  btn.textContent = labels[theme];
  localStorage.setItem('dvp-theme', theme);
}

btn.addEventListener('click', () => {
  const cur = localStorage.getItem('dvp-theme') || 'system';
  applyTheme(themes[(themes.indexOf(cur) + 1) % themes.length]);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ((localStorage.getItem('dvp-theme') || 'system') === 'system') applyTheme('system');
});

applyTheme(localStorage.getItem('dvp-theme') || 'system');

// ── Section navigation arrows ──
const chevronDown = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
const chevronUp   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;

const navSections = Array.from(document.querySelectorAll('#inicio, #perfil, #trayectoria, #experiencia, #stack, #certificados, #contacto'));
navSections.forEach((sec, i) => {
  if (i < navSections.length - 1) {
    const a = document.createElement('a');
    a.className = 'sec-arr sec-arr--down';
    a.href = '#' + navSections[i + 1].id;
    a.setAttribute('aria-label', 'Siguiente sección');
    a.innerHTML = chevronDown;
    sec.appendChild(a);
  }
  if (i > 0) {
    const a = document.createElement('a');
    a.className = 'sec-arr sec-arr--up';
    a.href = '#' + navSections[i - 1].id;
    a.setAttribute('aria-label', 'Sección anterior');
    a.innerHTML = chevronUp;
    sec.appendChild(a);
  }
});

// ── Fade-in on scroll ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.07 }
);
document.querySelectorAll('.section-inner, .hero > div, .job, .tl-item, .cards article')
  .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
