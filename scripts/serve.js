/**
 * serve.js — minimal zero-dependency static file server for local
 * dev/preview. No npm packages required (uses only Node's built-in
 * http/fs), so it works even without network/npm-registry access.
 *
 * Usage: node scripts/serve.js [rootDir] [port] [--open]
 * Defaults: rootDir = current directory, port = 3000
 * --open : automatically opens the default browser once the server is ready
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const rawArgs = process.argv.slice(2);
const shouldOpen = rawArgs.includes('--open');
const positional = rawArgs.filter(a => a !== '--open');

const rootDir = path.resolve(positional[0] || '.');
const port = Number(positional[1] || 3000);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(rootDir, urlPath);

  // Prevent path traversal outside rootDir
  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 — Fichier introuvable : ' + urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    // Service worker must never be cached by the browser/proxy
    const cacheHeader = urlPath === '/sw.js' ? 'no-cache' : 'public, max-age=0';
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheHeader });
    res.end(data);
  });
});

server.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`\n  Le Français facile — serveur local démarré`);
  console.log(`  ➜  ${url}\n`);
  console.log('  (Ctrl+C pour arrêter)\n');

  if (shouldOpen) {
    const openCommand = process.platform === 'win32' ? `start "" "${url}"`
      : process.platform === 'darwin' ? `open "${url}"`
      : `xdg-open "${url}"`;
    exec(openCommand, (err) => {
      if (err) console.log(`  (Ouvrez manuellement : ${url})`);
    });
  }
});
