// ============================================================
// Illustrations de scène par étape — dessins SVG simples et
// reconnaissables (style plat, pas d'emoji), affichés en tête des
// pages Vocabulaire et Lecture pour rendre chaque thème plus
// vivant et plus facile à mémoriser.
//
// Chaque scène est dessinée dans un cadre 200x120 avec un fond
// arrondi doux. On garde les formes simples pour un fichier léger.
// ============================================================

// Corps SVG (formes) pour chaque étape, posé sur un « sol » ~ y=100.
const STAGE_SCENES = {
  // s00 — L'alphabet français : lettres ABC
  s00: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <rect x="46" y="58" width="30" height="30" rx="5" fill="#002395"/>
    <rect x="86" y="52" width="30" height="36" rx="5" fill="#ed2939"/>
    <rect x="126" y="58" width="30" height="30" rx="5" fill="#f4b400"/>
    <text x="61" y="80" font-size="20" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">A</text>
    <text x="101" y="80" font-size="22" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">B</text>
    <text x="141" y="80" font-size="20" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">C</text>` },

  // s01 — Bonjour ! Se présenter : deux personnes qui se saluent
  s01: { bg: ['#fff4e6', '#ffe8cc'], body: `
    <circle cx="72" cy="52" r="12" fill="#f4b400"/>
    <path d="M56 96V78a16 16 0 0 1 32 0v18z" fill="#002395"/>
    <circle cx="128" cy="52" r="12" fill="#e8a0a0"/>
    <path d="M112 96V78a16 16 0 0 1 32 0v18z" fill="#ed2939"/>
    <path d="M88 70q12 -10 24 0" stroke="#7a4a00" stroke-width="3" fill="none" stroke-linecap="round"/>` },

  // s02 — Le verbe être : personne avec étiquette « nom »
  s02: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <circle cx="100" cy="46" r="14" fill="#f4b400"/>
    <path d="M78 98V80a22 22 0 0 1 44 0v18z" fill="#002395"/>
    <rect x="84" y="66" width="32" height="16" rx="3" fill="#fff" stroke="#002395" stroke-width="2"/>
    <line x1="90" y1="74" x2="110" y2="74" stroke="#4b5563" stroke-width="2"/>` },

  // s03 — avoir et les nombres : chiffres 1 2 3
  s03: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <text x="60" y="86" font-size="40" font-weight="800" fill="#0f766e" font-family="Arial">1</text>
    <text x="92" y="86" font-size="40" font-weight="800" fill="#1d4ed8" font-family="Arial">2</text>
    <text x="124" y="86" font-size="40" font-weight="800" fill="#ed2939" font-family="Arial">3</text>` },

  // s04 — Les articles et les objets : table avec livre et stylo
  s04: { bg: ['#fdf2f8', '#f9e0ee'], body: `
    <rect x="60" y="86" width="80" height="8" rx="2" fill="#8a5a2b"/>
    <rect x="66" y="90" width="6" height="16" fill="#8a5a2b"/>
    <rect x="128" y="90" width="6" height="16" fill="#8a5a2b"/>
    <rect x="72" y="70" width="26" height="18" rx="2" fill="#1d4ed8"/>
    <rect x="76" y="66" width="26" height="18" rx="2" fill="#3b82f6"/>
    <rect x="112" y="60" width="5" height="26" rx="2" fill="#ed2939" transform="rotate(12 114 73)"/>` },

  // s05 — La famille : quatre silhouettes
  s05: { bg: ['#fff4e6', '#ffe8cc'], body: `
    <circle cx="66" cy="56" r="9" fill="#002395"/><path d="M55 96V80a11 11 0 0 1 22 0v16z" fill="#002395"/>
    <circle cx="90" cy="56" r="9" fill="#ed2939"/><path d="M79 96V80a11 11 0 0 1 22 0v16z" fill="#ed2939"/>
    <circle cx="118" cy="62" r="7" fill="#0f766e"/><path d="M110 96V83a8 8 0 0 1 16 0v13z" fill="#0f766e"/>
    <circle cx="138" cy="64" r="6" fill="#f4b400"/><path d="M131 96V85a7 7 0 0 1 14 0v11z" fill="#f4b400"/>` },

  // s06 — La routine quotidienne : soleil + horloge
  s06: { bg: ['#fff8e1', '#ffecb3'], body: `
    <circle cx="72" cy="60" r="16" fill="#f4b400"/>
    <g stroke="#f4b400" stroke-width="3" stroke-linecap="round">
      <line x1="72" y1="34" x2="72" y2="40"/><line x1="72" y1="80" x2="72" y2="86"/>
      <line x1="46" y1="60" x2="52" y2="60"/><line x1="92" y1="60" x2="98" y2="60"/></g>
    <circle cx="130" cy="62" r="20" fill="#fff" stroke="#002395" stroke-width="3"/>
    <line x1="130" y1="62" x2="130" y2="50" stroke="#002395" stroke-width="3" stroke-linecap="round"/>
    <line x1="130" y1="62" x2="139" y2="66" stroke="#002395" stroke-width="3" stroke-linecap="round"/>` },

  // s07 — La nourriture : pain + pomme
  s07: { bg: ['#fff4e6', '#ffe8cc'], body: `
    <ellipse cx="80" cy="80" rx="26" ry="14" fill="#c98a3a"/>
    <path d="M62 76q18 -10 36 0" stroke="#8a5a2b" stroke-width="2" fill="none"/>
    <circle cx="132" cy="76" r="16" fill="#ed2939"/>
    <path d="M132 60c-1-5 3-8 6-7-1 4-3 6-6 7z" fill="#0f9d58"/>
    <rect x="131" y="56" width="2" height="6" fill="#8a5a2b"/>` },

  // s08 — L'heure et les jours : horloge + calendrier
  s08: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <circle cx="76" cy="64" r="22" fill="#fff" stroke="#002395" stroke-width="3"/>
    <line x1="76" y1="64" x2="76" y2="50" stroke="#002395" stroke-width="3" stroke-linecap="round"/>
    <line x1="76" y1="64" x2="86" y2="70" stroke="#002395" stroke-width="3" stroke-linecap="round"/>
    <rect x="112" y="46" width="40" height="40" rx="4" fill="#fff" stroke="#ed2939" stroke-width="3"/>
    <rect x="112" y="46" width="40" height="12" rx="4" fill="#ed2939"/>
    <line x1="122" y1="68" x2="142" y2="68" stroke="#4b5563" stroke-width="2"/>
    <line x1="122" y1="76" x2="136" y2="76" stroke="#4b5563" stroke-width="2"/>` },

  // s09 — Les courses et les questions : sac de courses
  s09: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <path d="M74 66h52l-6 40H80z" fill="#0f766e"/>
    <path d="M86 66v-6a14 14 0 0 1 28 0v6" stroke="#0a5249" stroke-width="3" fill="none"/>
    <text x="100" y="94" font-size="22" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">?</text>` }
};

// Étiquette accessible générique (le titre réel est fourni ailleurs).
function stageScene(stageId) {
  const s = STAGE_SCENES[stageId];
  if (!s) return '';
  const [c1, c2] = s.bg;
  const gid = `sceneg-${stageId}`;
  return `<svg class="stage-scene" viewBox="0 0 200 120" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect x="0" y="0" width="200" height="120" rx="14" fill="url(#${gid})"/>
    <ellipse cx="100" cy="104" rx="80" ry="10" fill="rgba(0,0,0,0.05)"/>
    ${s.body}
  </svg>`;
}

// --------------------------------------------------------
// Scènes s10 → s19
// --------------------------------------------------------
Object.assign(STAGE_SCENES, {
  // s10 — Le week-end dernier : valise de voyage
  s10: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <rect x="70" y="60" width="60" height="42" rx="6" fill="#0f766e"/>
    <rect x="70" y="74" width="60" height="6" fill="#0a5249"/>
    <path d="M86 60v-8a6 6 0 0 1 12 0v8" stroke="#0a5249" stroke-width="3" fill="none"/>
    <rect x="120" y="70" width="10" height="10" rx="2" fill="#f4b400"/>` },

  // s11 — Les nombres de 10 à 100 : "100"
  s11: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <text x="100" y="86" font-size="42" font-weight="800" fill="#0f766e" text-anchor="middle" font-family="Arial">100</text>
    <path d="M52 92h96" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round"/>` },

  // s12 — Description physique et caractère : portrait
  s12: { bg: ['#fff4e6', '#ffe8cc'], body: `
    <circle cx="100" cy="62" r="24" fill="#f4d0a0"/>
    <path d="M76 58a24 24 0 0 1 48 0c0-14-48-14-48 0z" fill="#7a4a00"/>
    <circle cx="91" cy="62" r="3" fill="#12161d"/><circle cx="109" cy="62" r="3" fill="#12161d"/>
    <path d="M92 74q8 6 16 0" stroke="#7a4a00" stroke-width="2.5" fill="none" stroke-linecap="round"/>` },

  // s13 — Les prépositions de lieu : boîte + balle (sur/dans)
  s13: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <rect x="76" y="74" width="48" height="28" rx="3" fill="#c98a3a"/>
    <path d="M76 74l10-10h48l-10 10z" fill="#dba55a"/>
    <path d="M124 74l10-10v28l-10 10z" fill="#a8722f"/>
    <circle cx="100" cy="56" r="10" fill="#ed2939"/>` },

  // s14 — L'impératif : bulle avec « ! »
  s14: { bg: ['#fdf2f8', '#f9e0ee'], body: `
    <path d="M60 50h80a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8H96l-14 14v-14H60a8 8 0 0 1-8-8V58a8 8 0 0 1 8-8z" fill="#ed2939"/>
    <rect x="96" y="60" width="8" height="18" rx="3" fill="#fff"/>
    <circle cx="100" cy="84" r="4" fill="#fff"/>` },

  // s15 — Le futur proche : flèche vers l'avant
  s15: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <circle cx="100" cy="66" r="30" fill="#fff" stroke="#0f766e" stroke-width="3"/>
    <path d="M86 66h22" stroke="#0f766e" stroke-width="5" stroke-linecap="round"/>
    <path d="M104 54l16 12-16 12z" fill="#0f766e"/>` },

  // s16 — Les vêtements et les couleurs : t-shirt + palette
  s16: { bg: ['#fff4e6', '#ffe8cc'], body: `
    <path d="M74 60l12-8 8 6 8-6 12 8-8 10v26H82V70z" fill="#1d4ed8"/>
    <circle cx="140" cy="74" r="18" fill="#fff" stroke="#7a4a00" stroke-width="2"/>
    <circle cx="134" cy="68" r="3" fill="#ed2939"/><circle cx="146" cy="68" r="3" fill="#f4b400"/>
    <circle cx="134" cy="80" r="3" fill="#0f9d58"/><circle cx="146" cy="80" r="3" fill="#7c3aed"/>` },

  // s17 — Les loisirs et le sport : ballon de foot
  s17: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <circle cx="100" cy="66" r="26" fill="#fff" stroke="#12161d" stroke-width="2"/>
    <path d="M100 52l10 7-4 12h-12l-4-12z" fill="#12161d"/>
    <path d="M100 52v-6M110 59l9-4M106 71l7 9M94 71l-7 9M90 59l-9-4" stroke="#12161d" stroke-width="2"/>` },

  // s18 — Le corps et la santé : cœur + croix médicale
  s18: { bg: ['#fdeef0', '#fcd9de'], body: `
    <path d="M84 60c-8-8-22-2-22 9 0 10 22 22 22 22s22-12 22-22c0-11-14-17-22-9z" fill="#ed2939"/>
    <rect x="120" y="58" width="28" height="28" rx="5" fill="#fff" stroke="#0f9d58" stroke-width="2"/>
    <rect x="131" y="63" width="6" height="18" fill="#0f9d58"/><rect x="125" y="69" width="18" height="6" fill="#0f9d58"/>` },

  // s19 — Itinéraire et directions : carte + épingle
  s19: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <path d="M62 58l24-8 28 8 24-8v44l-24 8-28-8-24 8z" fill="#d3f0e0" stroke="#0f766e" stroke-width="2"/>
    <path d="M86 50v44M114 58v44" stroke="#0f766e" stroke-width="1.5" stroke-dasharray="3 3"/>
    <path d="M126 46c-8 0-14 6-14 14 0 10 14 20 14 20s14-10 14-20c0-8-6-14-14-14z" fill="#ed2939"/>
    <circle cx="126" cy="60" r="5" fill="#fff"/>` }
});

// --------------------------------------------------------
// Scènes s20 → s29
// --------------------------------------------------------
Object.assign(STAGE_SCENES, {
  // s20 — Les saisons et la météo : soleil derrière un nuage
  s20: { bg: ['#e3f2fd', '#bbdefb'], body: `
    <circle cx="84" cy="56" r="16" fill="#f4b400"/>
    <g stroke="#f4b400" stroke-width="3" stroke-linecap="round">
      <line x1="84" y1="32" x2="84" y2="38"/><line x1="62" y1="56" x2="68" y2="56"/><line x1="66" y1="40" x2="70" y2="44"/></g>
    <path d="M96 84a14 14 0 0 1 4-27 16 16 0 0 1 30 4 12 12 0 0 1-2 23z" fill="#fff"/>
    <g stroke="#4a90d9" stroke-width="3" stroke-linecap="round">
      <line x1="104" y1="90" x2="101" y2="98"/><line x1="118" y1="90" x2="115" y2="98"/><line x1="132" y1="90" x2="129" y2="98"/></g>` },

  // s21 — Au téléphone : smartphone
  s21: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <rect x="82" y="42" width="36" height="60" rx="7" fill="#12161d"/>
    <rect x="86" y="50" width="28" height="40" rx="2" fill="#4a90d9"/>
    <circle cx="100" cy="96" r="3" fill="#6b7280"/>
    <path d="M94 62c0 8 6 14 14 14" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>` },

  // s22 — Les adverbes de fréquence : calendrier avec coches répétées
  s22: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <rect x="66" y="48" width="68" height="52" rx="5" fill="#fff" stroke="#0f766e" stroke-width="3"/>
    <rect x="66" y="48" width="68" height="13" rx="5" fill="#0f766e"/>
    <g fill="#0f766e"><circle cx="80" cy="74" r="4"/><circle cx="100" cy="74" r="4"/><circle cx="120" cy="74" r="4"/>
    <circle cx="80" cy="88" r="4"/><circle cx="120" cy="88" r="4"/></g>` },

  // s23 — La négation étendue : symbole d'interdiction
  s23: { bg: ['#fdeef0', '#fcd9de'], body: `
    <circle cx="100" cy="66" r="30" fill="none" stroke="#ed2939" stroke-width="7"/>
    <line x1="79" y1="45" x2="121" y2="87" stroke="#ed2939" stroke-width="7" stroke-linecap="round"/>` },

  // s24 — Comparer : balance
  s24: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <rect x="98" y="46" width="4" height="46" fill="#7a4a00"/>
    <rect x="82" y="92" width="36" height="6" rx="2" fill="#7a4a00"/>
    <line x1="66" y1="52" x2="134" y2="52" stroke="#7a4a00" stroke-width="3"/>
    <path d="M58 52l-8 16h16z" fill="#1d4ed8"/><path d="M142 52l-8 16h16z" fill="#ed2939"/>
    <circle cx="100" cy="50" r="4" fill="#f4b400"/>` },

  // s25 — Les moyens de transport : train
  s25: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <rect x="64" y="54" width="72" height="40" rx="8" fill="#1d4ed8"/>
    <rect x="72" y="62" width="20" height="16" rx="3" fill="#bbdefb"/>
    <rect x="108" y="62" width="20" height="16" rx="3" fill="#bbdefb"/>
    <circle cx="80" cy="98" r="7" fill="#12161d"/><circle cx="120" cy="98" r="7" fill="#12161d"/>
    <rect x="60" y="90" width="80" height="4" fill="#6b7280"/>` },

  // s26 — Achats / à l'hôtel : cloche de réception
  s26: { bg: ['#fff4e6', '#ffe8cc'], body: `
    <rect x="66" y="92" width="68" height="8" rx="3" fill="#c98a3a"/>
    <path d="M74 92a26 26 0 0 1 52 0z" fill="#f4b400"/>
    <rect x="97" y="58" width="6" height="10" rx="3" fill="#c98a3a"/>
    <circle cx="100" cy="56" r="5" fill="#ed2939"/>` },

  // s27 — Les fêtes et invitations : cadeau + ballon
  s27: { bg: ['#fdf2f8', '#f9e0ee'], body: `
    <rect x="70" y="66" width="42" height="36" rx="4" fill="#1d4ed8"/>
    <rect x="70" y="66" width="42" height="12" fill="#3b82f6"/>
    <rect x="87" y="60" width="8" height="42" fill="#f4b400"/>
    <path d="M91 60c-6-8 8-12 0 0zM91 60c6-8-8-12 0 0z" fill="#f4b400"/>
    <circle cx="132" cy="60" r="14" fill="#ed2939"/>
    <path d="M132 74v18" stroke="#7a4a00" stroke-width="2"/>` },

  // s28 — Parler du passé (mouvement) : traces de pas / chemin
  s28: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <path d="M58 96q30 -30 84 -44" stroke="#0f766e" stroke-width="3" fill="none" stroke-dasharray="2 8" stroke-linecap="round"/>
    <ellipse cx="70" cy="90" rx="6" ry="9" fill="#1d4ed8" transform="rotate(-20 70 90)"/>
    <ellipse cx="92" cy="80" rx="6" ry="9" fill="#1d4ed8" transform="rotate(-20 92 80)"/>
    <ellipse cx="114" cy="68" rx="6" ry="9" fill="#1d4ed8" transform="rotate(-20 114 68)"/>
    <ellipse cx="136" cy="56" rx="6" ry="9" fill="#1d4ed8" transform="rotate(-20 136 56)"/>` },

  // s29 — Révision générale : trophée
  s29: { bg: ['#fff8e1', '#ffecb3'], body: `
    <path d="M82 46h36v14a18 18 0 0 1-36 0z" fill="#f4b400"/>
    <path d="M82 50h-10a10 10 0 0 0 10 10zM118 50h10a10 10 0 0 1-10 10z" fill="none" stroke="#f4b400" stroke-width="3"/>
    <rect x="96" y="76" width="8" height="12" fill="#c98a3a"/>
    <rect x="86" y="88" width="28" height="8" rx="2" fill="#c98a3a"/>
    <path d="M100 52l2.4 5 5.6.5-4 3.6 1.2 5.4-5.2-3-5.2 3 1.2-5.4-4-3.6 5.6-.5z" fill="#fff"/>` }
});

// --------------------------------------------------------
// Scènes s30 → s37 (extension A2)
// --------------------------------------------------------
Object.assign(STAGE_SCENES, {
  // s30 — Les verbes pronominaux : miroir + brosse à dents (routine)
  s30: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <rect x="66" y="46" width="34" height="48" rx="16" fill="#bbdefb" stroke="#1d4ed8" stroke-width="3"/>
    <circle cx="83" cy="66" r="9" fill="#f4d0a0"/>
    <path d="M74 90v-6a9 9 0 0 1 18 0v6z" fill="#002395"/>
    <rect x="118" y="52" width="6" height="30" rx="3" fill="#0f766e" transform="rotate(18 121 67)"/>
    <path d="M126 46l8 3-3 8-8-3z" fill="#fff" stroke="#0f766e" stroke-width="2"/>` },

  // s31 — L'imparfait : cadre photo ancien (souvenirs)
  s31: { bg: ['#fbf3e6', '#f2e2c6'], body: `
    <rect x="66" y="46" width="68" height="52" rx="4" fill="#fff" stroke="#8a5a2b" stroke-width="4"/>
    <circle cx="88" cy="66" r="9" fill="#f4b400"/>
    <path d="M74 92l16-16 10 8 12-12 12 12v8z" fill="#a8d5a2"/>
    <path d="M62 42l6 6M138 42l-6 6" stroke="#c98a3a" stroke-width="3" stroke-linecap="round"/>` },

  // s32 — Imparfait vs passé composé : sablier (temps qui passe)
  s32: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <path d="M74 46h52M74 98h52" stroke="#7a4a00" stroke-width="4" stroke-linecap="round"/>
    <path d="M78 48c0 16 22 16 22 26s-22 10-22 26M122 48c0 16-22 16-22 26s22 10 22 26" fill="none" stroke="#1d4ed8" stroke-width="3"/>
    <path d="M84 52h32c0 10-16 12-16 20s16 10 16 22H84c0-12 16-14 16-22s-16-10-16-20z" fill="#f4b400" opacity="0.85"/>` },

  // s33 — Pronoms COD : flèche qui remplace un objet
  s33: { bg: ['#e8f7ef', '#d3f0e0'], body: `
    <rect x="60" y="60" width="26" height="26" rx="4" fill="#1d4ed8"/>
    <text x="73" y="79" font-size="16" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">le</text>
    <path d="M92 73h24" stroke="#0f766e" stroke-width="4" stroke-linecap="round"/>
    <path d="M112 65l14 8-14 8z" fill="#0f766e"/>
    <circle cx="140" cy="73" r="14" fill="#ed2939"/>` },

  // s34 — COI, y, en : trois pastilles étiquetées
  s34: { bg: ['#fdf2f8', '#f9e0ee'], body: `
    <circle cx="70" cy="72" r="16" fill="#1d4ed8"/><text x="70" y="77" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">lui</text>
    <circle cx="100" cy="72" r="16" fill="#0f766e"/><text x="100" y="77" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">y</text>
    <circle cx="130" cy="72" r="16" fill="#be123c"/><text x="130" y="77" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial">en</text>` },

  // s35 — Pronoms relatifs : deux blocs reliés par un maillon
  s35: { bg: ['#eaf1ff', '#dbe6ff'], body: `
    <rect x="52" y="60" width="34" height="26" rx="5" fill="#7c3aed"/>
    <rect x="114" y="60" width="34" height="26" rx="5" fill="#1d4ed8"/>
    <path d="M86 73h12M102 73h12" stroke="#4b5563" stroke-width="3"/>
    <circle cx="100" cy="73" r="9" fill="#fff" stroke="#4b5563" stroke-width="3"/>
    <text x="100" y="77" font-size="10" font-weight="800" fill="#4b5563" text-anchor="middle" font-family="Arial">qui</text>` },

  // s36 — Le futur simple : fusée vers l'avenir
  s36: { bg: ['#e3f2fd', '#bbdefb'], body: `
    <path d="M100 44c10 6 16 18 16 32l-8 8h-16l-8-8c0-14 6-26 16-32z" fill="#eef2ff" stroke="#1d4ed8" stroke-width="2"/>
    <circle cx="100" cy="66" r="6" fill="#4a90d9"/>
    <path d="M84 76l-8 10 12-2zM116 76l8 10-12-2z" fill="#ed2939"/>
    <path d="M94 92h12l-6 12z" fill="#f4b400"/>` },

  // s37 — Le conditionnel de politesse : main tendue / offre polie
  s37: { bg: ['#fff8e1', '#ffecb3'], body: `
    <rect x="70" y="78" width="60" height="8" rx="3" fill="#c98a3a"/>
    <ellipse cx="100" cy="74" rx="22" ry="8" fill="#fff" stroke="#c98a3a" stroke-width="2"/>
    <path d="M92 56c0-6 4-10 8-10s8 4 8 10" fill="none" stroke="#ed2939" stroke-width="3"/>
    <circle cx="100" cy="60" r="6" fill="#f4b400"/>
    <path d="M84 74q16 -8 32 0" stroke="#0f766e" stroke-width="2" fill="none"/>` }
});
