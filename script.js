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

// ── Section navigation (fixed arrows, always visible in viewport) ──
const chevronDown = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
const chevronUp   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;

const navSections = Array.from(document.querySelectorAll(
  '#inicio, #perfil, #trayectoria, #experiencia, #stack, #certificados, #contacto'
));

const btnUp   = document.createElement('button');
const btnDown = document.createElement('button');
btnUp.className   = 'nav-fixed nav-fixed--up';
btnDown.className = 'nav-fixed nav-fixed--down';
btnUp.setAttribute('aria-label', 'Sección anterior');
btnDown.setAttribute('aria-label', 'Siguiente sección');
btnUp.innerHTML   = chevronUp;
btnDown.innerHTML = chevronDown;
document.body.appendChild(btnUp);
document.body.appendChild(btnDown);

let curIdx = 0;

function syncArrows() {
  btnUp.style.opacity       = curIdx > 0 ? '1' : '0';
  btnUp.style.pointerEvents = curIdx > 0 ? 'auto' : 'none';
  btnDown.style.opacity       = curIdx < navSections.length - 1 ? '1' : '0';
  btnDown.style.pointerEvents = curIdx < navSections.length - 1 ? 'auto' : 'none';
}

// Track which section is most visible
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      curIdx = navSections.indexOf(e.target);
      syncArrows();
    }
  });
}, { threshold: 0.4 });

navSections.forEach(s => secObs.observe(s));

btnUp.addEventListener('click', () => {
  if (curIdx > 0) navSections[curIdx - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
});
btnDown.addEventListener('click', () => {
  if (curIdx < navSections.length - 1) navSections[curIdx + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
});

syncArrows();

// ── Fade-in on scroll ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.07 }
);
document.querySelectorAll('.section-inner, .hero > div, .job, .tl-item, .cards article')
  .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
