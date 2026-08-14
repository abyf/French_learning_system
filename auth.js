// ============================================================
// Comptes locaux — inscription / connexion.
// Aucun serveur : les comptes sont stockés dans le localStorage
// du navigateur, sur cette machine uniquement. Les mots de passe
// ne sont jamais stockés en clair (hachés avec SHA-256 côté client
// via l'API Web Crypto), mais ceci reste un contrôle d'accès local
// pour une appli d'apprentissage hors ligne, pas une authentification
// de niveau serveur — à ne pas réutiliser pour des données sensibles.
// ============================================================

const USERS_KEY = 'lff-users';
const SESSION_KEY = 'lff-session';

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeAlias(alias) {
  return alias.trim().toLowerCase();
}

async function hashPassword(password) {
  const enc = new TextEncoder().encode('lff-local-salt-v1:' + password);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function registerUser({ firstname, email, alias, password }) {
  const users = loadUsers();
  const normAlias = normalizeAlias(alias);
  const normEmail = email.trim().toLowerCase();

  if (!firstname.trim()) throw new Error('MISSING_FIRSTNAME');
  if (!isValidEmail(normEmail)) throw new Error('INVALID_EMAIL');
  if (normAlias.length < 3) throw new Error('ALIAS_TOO_SHORT');
  if (password.length < 6) throw new Error('PASSWORD_TOO_SHORT');
  if (users.some(u => u.alias === normAlias)) throw new Error('ALIAS_TAKEN');
  if (users.some(u => u.email === normEmail)) throw new Error('EMAIL_TAKEN');

  const passwordHash = await hashPassword(password);
  const user = { firstname: firstname.trim(), email: normEmail, alias: normAlias, passwordHash };
  users.push(user);
  saveUsers(users);
  return user;
}

async function loginUser(alias, password) {
  const users = loadUsers();
  const normAlias = normalizeAlias(alias);
  const user = users.find(u => u.alias === normAlias);
  if (!user) throw new Error('NOT_FOUND');
  const hash = await hashPassword(password);
  if (hash !== user.passwordHash) throw new Error('BAD_PASSWORD');
  return user;
}

function saveSession(alias) {
  localStorage.setItem(SESSION_KEY, alias);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getSessionAlias() {
  return localStorage.getItem(SESSION_KEY);
}

function getUserByAlias(alias) {
  return loadUsers().find(u => u.alias === alias);
}
