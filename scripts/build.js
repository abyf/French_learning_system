/**
 * build.js — copie tous les fichiers nécessaires au déploiement
 * dans le dossier dist/ (prêt à uploader sur Netlify, Vercel, GitHub Pages, etc.)
 *
 * Usage: node scripts/build.js
 * (pas de dépendances : utilise fs natif uniquement)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// Fichiers à inclure dans le build
const FILES = [
  'index.html',
  'styles.css',
  'content.js',
  'daily-plan.js',
  'i18n.js',
  'auth.js',
  'app.js',
  'sw.js',
  'manifest.json',
  'icons/icon-192.svg',
  'icons/icon-512.svg'
];

// Nettoyer dist/ si existant
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}

// Copier
FILES.forEach(file => {
  const src = path.join(ROOT, file);
  const dest = path.join(DIST, file);
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  ✓ ${file}`);
});

// Ajouter un _redirects pour Netlify (SPA hash-routing = aucune redirection nécessaire,
// mais bon d'avoir un 404 propre)
fs.writeFileSync(path.join(DIST, '_redirects'), '/* /index.html 200\n');

// Ajouter un fichier netlify.toml basique
fs.writeFileSync(path.join(DIST, 'netlify.toml'), `[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "microphone=(), camera=()"
`);

console.log(`\n✅ Build terminé → ${DIST} (${FILES.length} fichiers)`);
console.log('   Déployez ce dossier sur Netlify, Vercel, GitHub Pages, ou tout hébergeur statique.');
