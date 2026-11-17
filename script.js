// ── Theme toggle: Auto → ☀ Claro → ☾ Oscuro → Auto ──
var html = document.documentElement;
var btn  = document.getElementById('themeBtn');
var themes = ['system', 'light', 'dark'];
var labels  = { system: 'Auto', light: '☀ Claro', dark: '☾ Oscuro' };

function applyTheme(theme) {
  var effective = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
  html.setAttribute('data-theme', effective);
  btn.textContent = labels[theme];
  localStorage.setItem('dvp-theme', theme);
}

btn.addEventListener('click', function() {
  var cur = localStorage.getItem('dvp-theme') || 'system';
  applyTheme(themes[(themes.indexOf(cur) + 1) % themes.length]);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
  if ((localStorage.getItem('dvp-theme') || 'system') === 'system') applyTheme('system');
});

applyTheme(localStorage.getItem('dvp-theme') || 'system');

// ── Language toggle ──
var langBtn = document.getElementById('langBtn');

var T = {
  es: {
    'nav-perfil':      'Perfil',
    'nav-formacion':   'Formación',
    'nav-experiencia': 'Experiencia',
    'nav-certificados':'Certificados',
    'nav-contacto':    'Contacto',
    'hero-btn':        'Ver perfil <span>↓</span>',
    'hero-intro':      'Construyo soluciones de datos para Supply Chain y entornos industriales. Pipelines en GCP, mentalidad AI First y mirada puesta en AI Platform Engineering.',
    'hero-note':       'Valladolid, España · Abierto a nuevas oportunidades',
    'hero-stat1':      'años de experiencia',
    'hero-stat2':      'empresas / roles',
    'hero-stat3':      'certificados',
    'sec1-eyebrow':    '01 — Perfil',
    'sec1-copy':       'Ingeniero en Electrónica Industrial y Automática con especialización en datos y cloud. Trabajo en la intersección entre datos, tecnología y operaciones industriales: desde la digitalización de procesos hasta la construcción de pipelines de datos en GCP. Actualmente cursando un Máster en Big Data &amp; Business Intelligence y ampliando formación en Inteligencia Artificial aplicada a plataformas de datos.',
    'sec2-eyebrow':    '02 — Formación',
    'sec2-h2':         'Formación<br>académica.',
    'tl1-h3':          'Grado en Ingeniería en Electrónica Industrial y Automática',
    'tl2-h3':          'Máster en Big Data &amp; Business Intelligence',
    'tl2-p':           'Universidad de Valladolid · En curso',
    'tl2-li1':         'Big Data &amp; datos distribuidos — almacenamiento y procesamiento escalable',
    'tl2-li2':         'Data Science &amp; IA — métodos de análisis, ML e inteligencia artificial aplicada',
    'tl2-li3':         'Business Intelligence — ETL, modelado y visualización para toma de decisiones',
    'tl2-li4':         'Seguridad &amp; privacidad de datos — ciberseguridad y gestión de seguridad en entornos Big Data',
    'lang-tag':        'Español nativo · Inglés C1 · Francés B1',
    'sec3-eyebrow':    '03 — Experiencia',
    'sec3-h2':         'Experiencia<br>profesional.',
    'job1-desc':       'Desarrollo y mantenimiento de pipelines en GCP con BigQuery, Cloud Storage y Dataform. Diseño modelos Bronze/Silver/Gold, transformaciones SQL y controles de calidad. Optimizo consultas mediante particionado y clustering para mejorar rendimiento y eficiencia de costes, integrando datos maestros y soluciones SAP IBP/BTP con equipos funcionales.',
    'job2-desc':       'Análisis de datos con Power BI, Looker Studio y TIBCO Spotfire; mejora de documentación de maquinaria y migración de referencias de almacén en SAP S/4HANA. Colaboré con Google en el desarrollo de un agente de IA para mantenimiento de fábrica.',
    'job3-h3':         'Ingeniería de Procesos · Data &amp; Digital',
    'job3-desc':       'Digitalicé procesos de Supply Chain mediante aplicaciones Power Apps y automatizaciones en Python y PowerShell. Automaticé informes con Spotfire y VBA, ahorrando cinco horas semanales, y gestioné incidencias técnicas con un SLA de resolución del 85 %.',
    'job4-h3':         'Departamento de Calidad · Becario',
    'job4-desc':       'Desarrollé scripts Python para analizar datos de producción y detectar desviaciones de calidad un 30 % más rápido. También trabajé con TIBCO Spotfire y creé herramientas internas con Power Apps y VBA para estandarizar el cumplimiento de normativas.',
    'job5-h3':         'Departamento de Ingeniería · Prácticas universitarias',
    'job5-company':    'Empresa especializada en montaje e ingeniería eléctrica',
    'job5-desc':       'Desarrollo de un proyecto eléctrico real para una comisaría de policía en Valladolid.',
    'sec4-eyebrow':    '04 — Stack técnico',
    'sec4-h2':         'Tecnologías<br>y herramientas.',
    'st1':             'Cloud &amp; Data Platform',
    'st2':             'Lenguajes',
    'st3':             'Visualización',
    'st4':             'ERP &amp; Integración',
    'st5':             'Low-code &amp; Automatización',
    'st6':             'Otros',
    'sec5-eyebrow':    '05 — Certificados',
    'sec5-h2':         'Certificados<br>y formación continua.',
    'sec5-copy':       'Formación en análisis de datos, programación e inteligencia artificial.',
    'cert1-h3':        'Aprende SQL',
    'cert5-h3':        'Iniciación a los flujos de trabajo con IA',
    'cert6-h3':        'Domina la IA con Gemini',
    'cert7-h3':        'Prompting responsable: maximiza la IA en tu negocio',
    'privacy':         'Los documentos originales con datos personales no se publican aquí. Las imágenes de certificados se muestran como referencia.',
    'sec6-eyebrow':    '06 — Contacto',
    'sec6-h2':         'Contacto.',
    'sec6-copy':       'Abierto a nuevas oportunidades en Data Engineering, Analytics e Ingeniería de IA. Puedes escribirme directamente por LinkedIn o por correo electrónico.',
    'footer-role':     'Data Engineer · Valladolid, España',
  },
  en: {
    'nav-perfil':      'Profile',
    'nav-formacion':   'Education',
    'nav-experiencia': 'Experience',
    'nav-certificados':'Certifications',
    'nav-contacto':    'Contact',
    'hero-btn':        'View profile <span>↓</span>',
    'hero-intro':      'I build data solutions for Supply Chain and industrial environments. Pipelines on GCP, AI First mindset, with a focus on AI Platform Engineering.',
    'hero-note':       'Valladolid, Spain · Open to new opportunities',
    'hero-stat1':      'years of experience',
    'hero-stat2':      'companies / roles',
    'hero-stat3':      'certifications',
    'sec1-eyebrow':    '01 — Profile',
    'sec1-copy':       'Industrial Electronics and Automation Engineer specialising in data and cloud. I work at the intersection of data, technology and industrial operations: from process digitalisation to building data pipelines on GCP. Currently pursuing a Master\'s in Big Data &amp; Business Intelligence and expanding my training in AI applied to data platforms.',
    'sec2-eyebrow':    '02 — Education',
    'sec2-h2':         'Academic<br>background.',
    'tl1-h3':          'Bachelor\'s in Industrial Electronics and Automation Engineering',
    'tl2-h3':          'Master\'s in Big Data &amp; Business Intelligence',
    'tl2-p':           'Universidad de Valladolid · In progress',
    'tl2-li1':         'Big Data &amp; Distributed Data — scalable storage and processing',
    'tl2-li2':         'Data Science &amp; AI — analysis methods, ML and applied artificial intelligence',
    'tl2-li3':         'Business Intelligence — ETL, modelling and visualisation for decision-making',
    'tl2-li4':         'Security &amp; Data Privacy — cybersecurity and security management in Big Data environments',
    'lang-tag':        'Native Spanish · C1 English · B1 French',
    'sec3-eyebrow':    '03 — Experience',
    'sec3-h2':         'Professional<br>experience.',
    'job1-desc':       'Development and maintenance of GCP pipelines using BigQuery, Cloud Storage and Dataform. I design Bronze/Silver/Gold models, SQL transformations and quality controls. I optimise queries through partitioning and clustering to improve performance and cost efficiency, integrating master data and SAP IBP/BTP solutions with functional teams.',
    'job2-desc':       'Data analysis with Power BI, Looker Studio and TIBCO Spotfire; improvement of machinery documentation and warehouse reference migration in SAP S/4HANA. Collaborated with Google on the development of an AI agent for factory maintenance.',
    'job3-h3':         'Process Engineering · Data &amp; Digital',
    'job3-desc':       'I digitalised Supply Chain processes through Power Apps and Python and PowerShell automations. I automated reports with Spotfire and VBA, saving five hours per week, and managed technical incidents with an 85 % resolution SLA.',
    'job4-h3':         'Quality Department · Intern',
    'job4-desc':       'I developed Python scripts to analyse production data and detect quality deviations 30 % faster. I also worked with TIBCO Spotfire and created internal tools with Power Apps and VBA to standardise regulatory compliance.',
    'job5-h3':         'Engineering Department · University Internship',
    'job5-company':    'Company specialising in electrical assembly and engineering',
    'job5-desc':       'Development of a real electrical project for a police station in Valladolid.',
    'sec4-eyebrow':    '04 — Tech stack',
    'sec4-h2':         'Technologies<br>and tools.',
    'st1':             'Cloud &amp; Data Platform',
    'st2':             'Languages',
    'st3':             'Visualisation',
    'st4':             'ERP &amp; Integration',
    'st5':             'Low-code &amp; Automation',
    'st6':             'Other',
    'sec5-eyebrow':    '05 — Certifications',
    'sec5-h2':         'Certifications<br>&amp; continuous learning.',
    'sec5-copy':       'Training in data analysis, programming and artificial intelligence.',
    'cert1-h3':        'Learn SQL',
    'cert5-h3':        'Introduction to AI Workflows',
    'cert6-h3':        'Master AI with Gemini',
    'cert7-h3':        'Responsible Prompting: maximise AI in your business',
    'privacy':         'Original documents with personal data are not published here. Certificate images are shown for reference.',
    'sec6-eyebrow':    '06 — Contact',
    'sec6-h2':         'Contact.',
    'sec6-copy':       'Open to new opportunities in Data Engineering, Analytics and AI Engineering. You can reach me directly via LinkedIn or email.',
    'footer-role':     'Data Engineer · Valladolid, Spain',
  }
};

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (T[lang] && T[lang][key] !== undefined) el.innerHTML = T[lang][key];
  });
  html.setAttribute('lang', lang);
  langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  localStorage.setItem('dvp-lang', lang);
}

langBtn.addEventListener('click', function() {
  var cur = localStorage.getItem('dvp-lang') || 'es';
  applyLang(cur === 'es' ? 'en' : 'es');
});

applyLang(localStorage.getItem('dvp-lang') || 'es');

// ── Section navigation ──
var SECTIONS = ['inicio', 'perfil', 'trayectoria', 'experiencia', 'stack', 'certificados', 'contacto'];
var curIdx = 0;
var navUp   = document.getElementById('navUp');
var navDown = document.getElementById('navDown');

function syncNav() {
  navUp.classList.toggle('hidden', curIdx === 0);
  navDown.classList.toggle('hidden', curIdx === SECTIONS.length - 1);
}

function goTo(idx) {
  if (idx < 0 || idx >= SECTIONS.length) return;
  curIdx = idx;
  var target = document.getElementById(SECTIONS[curIdx]);
  if (target) window.scrollTo({ top: target.offsetTop - 52, behavior: 'smooth' });
  syncNav();
}

navDown.addEventListener('click', function() { goTo(curIdx + 1); });
navUp.addEventListener('click',   function() { goTo(curIdx - 1); });

var secEls = SECTIONS.map(function(id) { return document.getElementById(id); }).filter(Boolean);
var secObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      var i = secEls.indexOf(e.target);
      if (i !== -1) { curIdx = i; syncNav(); }
    }
  });
}, { threshold: 0.4 });
secEls.forEach(function(s) { secObs.observe(s); });

syncNav();

// ── Fade-in on scroll ──
var fadeObs = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
    });
  },
  { threshold: 0.07 }
);
document.querySelectorAll('.section-inner, .hero > div, .job, .tl-item, .cards article')
  .forEach(function(el) { el.classList.add('fade-in'); fadeObs.observe(el); });
