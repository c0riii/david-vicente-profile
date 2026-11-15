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

// ── Fade-in on scroll ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.07 }
);
document.querySelectorAll('.section-inner, .hero > div, .job, .tl-item, .cards article')
  .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
