/* =========================================================
   Curriculum data — edit this to change titles, add or remove
   lessons. The "file" path is where the PDF lives on disk
   under /pdfs/...
   ========================================================= */

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function buildSections(yearSlug, subjectSlug, courseTitles, exerciseTitles) {
  const normalize = item => typeof item === 'string'
    ? { title: item, slug: slugify(item) }
    : { title: item.title, slug: item.slug || slugify(item.title) };

  const make = (type, titles) => ({
    type,
    trimesters: [1, 2, 3].map(t => ({
      trimester: t,
      items: titles[t].map((item, i) => {
        const normalized = normalize(item);
        return {
          title: normalized.title,
          file: `pdfs/${yearSlug}/${subjectSlug}/${type}/t${t}/${String(i + 1).padStart(2, '0')}-${normalized.slug}.pdf`
        };
      })
    }))
  });
  return [make('courses', courseTitles), make('exercises', exerciseTitles)];
}

function mathFor(yearSlug, lvl) {
  return {
    slug: 'mathematics',
    name: 'Mathématiques',
    blurb: `Algèbre, analyse et géométrie — programme ${lvl}.`,
    sections: buildSections(yearSlug, 'mathematics', {
      1: [
        { title: 'Nombres et calcul', slug: 'numbers-and-calculation' },
        { title: 'Polynômes et factorisation', slug: 'polynomials-and-factoring' },
        { title: 'Équations et inéquations linéaires', slug: 'linear-equations-and-inequalities' }
      ],
      2: [
        { title: 'Fonctions et graphiques', slug: 'functions-and-graphs' },
        { title: 'Fondements de la trigonométrie', slug: 'trigonometry-foundations' },
        { title: 'Vecteurs dans le plan', slug: 'vectors-in-the-plane' }
      ],
      3: [
        { title: 'Suites et séries', slug: 'sequences-and-series' },
        { title: 'Introduction aux dérivées', slug: 'introduction-to-derivatives' },
        { title: 'Probabilités et statistiques', slug: 'probability-and-statistics' }
      ]
    }, {
      1: [
        { title: 'Fiche 1 — Exercices de calcul', slug: 'worksheet-1-calculation-drills' },
        { title: 'Fiche 2 — Pratique des polynômes', slug: 'worksheet-2-polynomial-practice' },
        { title: 'Fiche 3 — Laboratoire d’équations', slug: 'worksheet-3-equations-lab' }
      ],
      2: [
        { title: 'Fiche 4 — Études de fonctions', slug: 'worksheet-4-function-studies' },
        { title: 'Fiche 5 — Identités trigonométriques', slug: 'worksheet-5-trig-identities' },
        { title: 'Fiche 6 — Problèmes de vecteurs', slug: 'worksheet-6-vector-problems' }
      ],
      3: [
        { title: 'Fiche 7 — Suites', slug: 'worksheet-7-sequences-set' },
        { title: 'Fiche 8 — Dérivées', slug: 'worksheet-8-derivatives-set' },
        { title: 'Fiche 9 — Mix probabilités', slug: 'worksheet-9-probability-mix' }
      ]
    })
  };
}

function csFor(yearSlug, lvl) {
  return {
    slug: 'computer-science',
    name: 'Informatique',
    blurb: `Algorithmes, programmation et systèmes informatiques — programme ${lvl}.`,
    sections: buildSections(yearSlug, 'computer-science', {
      1: [
        { title: 'Introduction aux algorithmes', slug: 'introduction-to-algorithms' },
        { title: 'Variables et types de données', slug: 'variables-and-data-types' },
        { title: 'Conditions et boucles', slug: 'conditionals-and-loops' }
      ],
      2: [
        { title: 'Fonctions et modularité', slug: 'functions-and-modularity' },
        { title: 'Tableaux et listes', slug: 'arrays-and-lists' },
        { title: 'Chaînes et traitement de texte', slug: 'strings-and-text-processing' }
      ],
      3: [
        { title: 'Tri et recherche', slug: 'sorting-and-searching' },
        { title: 'Introduction à la POO', slug: 'introduction-to-oop' },
        { title: 'Fichiers et persistance', slug: 'files-and-persistence' }
      ]
    }, {
      1: [
        { title: 'TP 1 — Premiers algorithmes', slug: 'lab-1-first-algorithms' },
        { title: 'TP 2 — Pratique des variables', slug: 'lab-2-variables-practice' },
        { title: 'TP 3 — Exercices de contrôle de flux', slug: 'lab-3-control-flow-drills' }
      ],
      2: [
        { title: 'TP 4 — Atelier fonctions', slug: 'lab-4-function-workshop' },
        { title: 'TP 5 — Défis tableaux', slug: 'lab-5-array-challenges' },
        { title: 'TP 6 — Énigmes sur les chaînes', slug: 'lab-6-string-puzzles' }
      ],
      3: [
        { title: 'TP 7 — Tri & recherche', slug: 'lab-7-sort-search-tasks' },
        { title: 'TP 8 — Modélisation d’objets', slug: 'lab-8-object-modeling' },
        { title: 'TP 9 — Exercices d’E/S de fichiers', slug: 'lab-9-file-io-exercises' }
      ]
    })
  };
}

function physicsFor(yearSlug, lvl) {
  return {
    slug: 'physics',
    name: 'Physique',
    blurb: `Mécanique, électricité et ondes — programme ${lvl}.`,
    sections: buildSections(yearSlug, 'physics', {
      1: [
        { title: 'Unités et mesures', slug: 'units-and-measurement' },
        { title: 'Cinématique en une dimension', slug: 'kinematics-in-one-dimension' },
        { title: 'Lois de Newton', slug: 'newtons-laws-of-motion' }
      ],
      2: [
        { title: 'Énergie et travail', slug: 'energy-and-work' },
        { title: 'Quantité de mouvement et collisions', slug: 'momentum-and-collisions' },
        { title: 'Mouvement circulaire', slug: 'circular-motion' }
      ],
      3: [
        { title: 'Ondes et son', slug: 'waves-and-sound' },
        { title: 'Introduction à l’électricité', slug: 'introduction-to-electricity' },
        { title: 'Optique et lumière', slug: 'optics-and-light' }
      ]
    }, {
      1: [
        { title: 'Série d’exercices 1 — Mesures', slug: 'problem-set-1-measurement' },
        { title: 'Série d’exercices 2 — Graphiques de mouvement', slug: 'problem-set-2-motion-graphs' },
        { title: 'Série d’exercices 3 — Forces', slug: 'problem-set-3-forces' }
      ],
      2: [
        { title: 'Série d’exercices 4 — Énergie', slug: 'problem-set-4-energy' },
        { title: 'Série d’exercices 5 — Quantité de mouvement', slug: 'problem-set-5-momentum' },
        { title: 'Série d’exercices 6 — Mouvement circulaire', slug: 'problem-set-6-circular-motion' }
      ],
      3: [
        { title: 'Série d’exercices 7 — Ondes', slug: 'problem-set-7-waves' },
        { title: 'Série d’exercices 8 — Circuits', slug: 'problem-set-8-circuits' },
        { title: 'Série d’exercices 9 — Optique', slug: 'problem-set-9-optics' }
      ]
    })
  };
}

const CURRICULUM = [
  {
    slug: '2nd-year', name: '2eme année', level: 'Deuxième année',
    subjects: [mathFor('2nd-year', 'Deuxième année'), csFor('2nd-year', 'Deuxième année'), physicsFor('2nd-year', 'Deuxième année')]
  },
  {
    slug: '3rd-year', name: '3eme année', level: 'Troisième année',
    subjects: [mathFor('3rd-year', 'Troisième année'), csFor('3rd-year', 'Troisième année'), physicsFor('3rd-year', 'Troisième année')]
  },
  {
    slug: '4th-year', name: '4eme année', level: 'Quatrième année',
    subjects: [mathFor('4th-year', 'Quatrième année'), csFor('4th-year', 'Quatrième année'), physicsFor('4th-year', 'Quatrième année')]
  }
];

function getYear(slug) {
  return CURRICULUM.find(y => y.slug === slug);
}

function getSubject(yearSlug, subjectSlug) {
  const year = getYear(yearSlug);
  if (!year) return null;
  const subject = year.subjects.find(s => s.slug === subjectSlug);
  if (!subject) return null;
  return { year, subject };
}

function trimesterLabel(n) {
  return ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'][n - 1];
}
