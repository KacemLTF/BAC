/* =========================================================
   Study Hub — page renderer
   Each page calls renderXxx() at the bottom of the HTML.
   ========================================================= */

/* ---------- Tiny DOM helpers ---------- */
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') node.className = attrs[k];
    else if (k === 'html') node.innerHTML = attrs[k];
    else if (k.startsWith('on') && typeof attrs[k] === 'function') {
      node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
    } else node.setAttribute(k, attrs[k]);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

function svg(name) {
  const i = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
    arrowUR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    sigma: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4H6l6 8-6 8h12"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>',
    atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="11" ry="4.5"/><ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(-60 12 12)"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>',
    bookOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6"/><path d="M2 10 12 5l10 5-10 5z"/><path d="M6 12v5a6 3 0 0 0 12 0v-5"/></svg>'
  };
  const wrap = document.createElement('span');
  wrap.innerHTML = i[name] || '';
  return wrap.firstChild;
}

/* ---------- Shared chrome ---------- */
function renderNavBar(activePath) {
  const links = [
    { href: 'index.html', label: 'Accueil', mobileLabel: 'Accueil', match: ['index.html', ''] },
    { href: 'year.html?year=2nd-year', label: '2eme année', mobileLabel: '2eme', match: ['2nd-year'] },
    { href: 'year.html?year=3rd-year', label: '3eme année', mobileLabel: '3eme', match: ['3rd-year'] },
    { href: 'year.html?year=4th-year', label: '4eme année', mobileLabel: '4eme', match: ['4th-year'] }
  ];
  const isActive = (m) => m.some(t => activePath.includes(t));

  const brand = el('a', { href: 'index.html', class: 'brand' }, [
    el('span', { class: 'brand-mark' }, [svg('cap')]),
    el('span', { class: 'brand-name' }, 'Enfidha Lycée ')
  ]);

  const desktop = el('nav', { class: 'nav-links glass-soft' }, links.map(l =>
    el('a', { href: l.href, class: isActive(l.match) ? 'active' : '' }, l.label)
  ));

  const mobile = el('nav', { class: 'nav-links-mobile glass-soft' }, links.slice(1).map(l =>
    el('a', { href: l.href, class: isActive(l.match) ? 'active' : '' }, l.mobileLabel)
  ));

  return el('header', { class: 'navbar' }, [
    el('div', { class: 'navbar-inner' }, [brand, desktop, mobile])
  ]);
}

function renderBackButton(href, label) {
  return el('a', { href, class: 'back-btn glass-soft' }, [
    svg('arrowLeft'),
    el('span', {}, label || 'Retour')
  ]);
}

function renderSignature(name) {
  return el('div', { class: 'signature' }, name || 'Mohamed Kacem Letaief · Enfidha Lycée ');
}

/* ---------- Home page ---------- */
function renderHome(root) {
  document.body.appendChild(renderNavBar('index.html'));

  const hero = el('div', { class: 'hero' }, [
    el('span', { class: 'eyebrow glass-soft fade-up' }, [
      el('span', { class: 'dot' }), 'Enfidha Lycée'
    ]),
    el('h1', { class: 'fade-up delay-1', html:
      'Un espace clair et concentré pour vos <span class="text-gradient">cours et exercices</span>.' }),
    el('p', { class: 'fade-up delay-2' },
      'Choisissez votre année pour consulter les cours et fiches d’exercices en Mathématiques, Informatique et Physique — tous les fichiers sont à un clic.')
  ]);

  const grid = el('div', { class: 'grid-3' }, CURRICULUM.map((year, i) => {
    const num = year.name.replace(/\D/g, '');
    return el('a', {
      href: `year.html?year=${year.slug}`,
      class: `card glass year-${num} fade-up delay-${i + 3}`
    }, [
      el('div', { class: 'wash' }),
      el('div', { class: 'ghost-num' }, num),
      el('span', { class: 'tag' }, year.level),
      el('h2', { class: 'year-title' }, year.name),
      el('div', { class: 'card-foot' }, [
        el('span', { class: 'meta' }, [svg('book'), '3 matières · 6 trimestres']),
        el('span', { class: 'arrow' }, [svg('arrowUR')])
      ])
    ]);
  }));

  const tip = el('p', { class: 'foot-tip fade-up delay-6' },
    'télécharge des exercices et des cours');

  const page = el('main', { class: 'page' }, [
    el('div', { class: 'container' }, [hero, grid, tip])
  ]);

  document.body.appendChild(page);
  document.body.appendChild(renderSignature());
}

/* ---------- Year page ---------- */
function renderYearPage(root) {
  const params = new URLSearchParams(location.search);
  const year = getYear(params.get('year') || '');
  document.body.appendChild(renderNavBar(`year=${params.get('year') || ''}`));

  if (!year) { renderNotFound(); return; }

  document.body.appendChild(renderBackButton('index.html', 'Accueil'));

  const header = el('div', {}, [
    el('div', { class: 'hero' }, [
      el('span', { class: 'eyebrow glass-soft fade-up' }, `${year.level} · Présentation`),
      el('h1', {
        class: 'fade-up delay-1',
        html: `<span class="text-gradient">${year.name}</span> — choisissez une matière`
      }),
      el('p', { class: 'fade-up delay-2' },
        'Chaque matière est organisée en Cours et Exercices, répartis sur trois trimestres.')
    ])
  ]);

  const subjectIconMap = {
    'mathematics': 'sigma',
    'computer-science': 'code',
    'physics': 'atom'
  };

  const grid = el('div', { class: 'grid-3' }, year.subjects.map((subject, i) =>
    el('a', {
      href: `subject.html?year=${year.slug}&subject=${subject.slug}`,
      class: `card glass subj-${subject.slug} fade-up delay-${i + 3}`
    }, [
      el('div', { class: 'wash' }),
      el('div', { class: 'subj-icon' }, [svg(subjectIconMap[subject.slug] || 'file')]),
      el('h3', { class: 'subject-title' }, subject.name),
      el('p', { class: 'subj-blurb' }, subject.blurb),
      el('div', { class: 'card-foot' }, [
        el('div', { class: 'chip-row' }, [
          el('span', { class: 'chip' }, 'Cours'),
          el('span', { class: 'chip' }, 'Exercices')
        ]),
        el('span', { class: 'arrow' }, [svg('arrowUR')])
      ])
    ])
  ));

  document.body.appendChild(el('main', { class: 'page' }, [
    el('div', { class: 'container' }, [header, grid])
  ]));
  document.body.appendChild(renderSignature());
}

/* ---------- Subject page ---------- */
function renderSubjectPage(root) {
  const params = new URLSearchParams(location.search);
  const yearSlug = params.get('year') || '';
  const subjectSlug = params.get('subject') || '';
  document.body.appendChild(renderNavBar(`year=${yearSlug}`));

  const data = getSubject(yearSlug, subjectSlug);
  if (!data) { renderNotFound(); return; }
  const { year, subject } = data;

  document.body.appendChild(renderBackButton(`year.html?year=${year.slug}`, year.name));

  const subjectIconMap = {
    'mathematics': 'sigma',
    'computer-science': 'code',
    'physics': 'atom'
  };

  const header = el('div', { class: 'subject-header fade-up' }, [
    el('div', { class: 'left' }, [
      el('div', { class: 'subj-icon' }, [svg(subjectIconMap[subject.slug] || 'file')]),
      el('div', {}, [
        el('p', { class: 'eyebrow-sm' }, year.name),
        el('h1', {}, subject.name)
      ])
    ]),
    el('p', { class: 'right' }, subject.blurb)
  ]);

  const courses = subject.sections.find(s => s.type === 'courses');
  const exercises = subject.sections.find(s => s.type === 'exercises');

  function renderSection(section, title, description, icon, accent) {
    const head = el('div', { class: 'section-head' }, [
      el('div', { class: `ico ${accent === 'accent' ? 'accent' : ''}` }, [svg(icon)]),
      el('div', {}, [
        el('h2', {}, title),
        el('p', {}, description)
      ])
    ]);

    const list = el('div', { class: 'trimester-list' },
      section.trimesters.map((tr, i) =>
        el('div', { class: `trimester glass fade-up delay-${i + 2}` }, [
          el('div', { class: 'trimester-head' }, [
            el('h3', {}, trimesterLabel(tr.trimester)),
            el('span', { class: `count ${accent === 'accent' ? 'accent' : ''}` },
              `T${tr.trimester} · ${tr.items.length} fichiers`)
          ]),
          el('ul', { class: 'item-list' },
            tr.items.map(item =>
              el('li', {},
                el('a', { href: item.file, download: '', class: 'item' }, [
                  el('span', { class: 'left' }, [
                    (() => { const f = svg('file'); f.classList = 'file-ico'; return f; })(),
                    el('span', { class: 'title' }, item.title)
                  ]),
                  el('span', { class: 'badge' }, [svg('download'), 'PDF'])
                ])
              )
            )
          )
        ])
      )
    );

    return el('section', { class: 'fade-up delay-1' }, [head, list]);
  }

  const sections = el('div', { class: 'sections' }, [
    courses ? renderSection(courses, 'Cours', 'Notes de leçon et supports de référence.', 'bookOpen', 'primary') : null,
    exercises ? renderSection(exercises, 'Exercices', 'Fiches de pratique et problèmes.', 'wrench', 'accent') : null
  ]);

  document.body.appendChild(el('main', { class: 'page' }, [
    el('div', { class: 'container' }, [header, sections])
  ]));
  document.body.appendChild(renderSignature());
}

/* ---------- Not found fallback ---------- */
function renderNotFound() {
  document.body.appendChild(el('main', { class: 'page' }, [
    el('div', { class: 'container hero' }, [
      el('h1', { class: 'fade-up' }, 'Page introuvable'),
      el('p', { class: 'fade-up delay-1' }, 'La page que vous recherchez n’existe pas.'),
      el('a', { href: 'index.html', class: 'eyebrow glass-soft fade-up delay-2', style: 'margin-top:2rem;' },
        '← Retour à l’accueil')
    ])
  ]));
  document.body.appendChild(renderSignature());
}
