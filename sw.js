// ============================================================
// Service Worker — offline-first : garde une copie de tous les
// assets pour permettre l'usage hors connexion, mais privilégie
// TOUJOURS le réseau quand il est disponible (network-first),
// afin que les mises à jour de l'appli soient visibles immédiatement
// sans devoir vider le cache manuellement. Le cache ne sert que de
// secours quand il n'y a pas de connexion.
//
// IMPORTANT : à chaque déploiement d'une nouvelle version, incrémenter
// CACHE_VERSION ci-dessous force tous les navigateurs à repartir d'un
// cache propre (le navigateur détecte que ce fichier a changé et
// réinstalle le service worker automatiquement).
// ============================================================
const CACHE_VERSION = 'lff-v18';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './content.js',
  './illustrations.js',
  './daily-plan.js',
  './i18n.js',
  './auth.js',
  './app.js',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './icons/nipponmboa-logo.svg',
  './icons/bg-scene.svg'
];

// Install — pre-cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network-first, cache as offline fallback only
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).then(response => {
      // Refresh the cache in the background with the latest version
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
      }
      return response;
    }).catch(() =>
      // No network — serve the last cached version instead
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        if (event.request.destination === 'document') return caches.match('./index.html');
      })
    )
  );
});
