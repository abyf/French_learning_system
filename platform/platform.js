// ============================================================
// Couche plateforme — authentification, progression synchronisée et
// contrôle d'accès (abonnement) via Supabase + Lemon Squeezy.
//
// Ce module est autonome : il n'agit que si la plateforme est
// configurée (voir config.js). L'application appelle ces fonctions ;
// si Supabase n'est pas configuré, elle retombe sur le mode local.
//
// Sécurité : ce code n'utilise que la clé "anon" publique. Toute
// écriture sensible (entitlements) est refusée par les règles RLS ;
// seules les lectures/écritures autorisées (profil, progression de
// l'utilisateur connecté) passent.
// ============================================================

let _sb = null; // client Supabase (initialisé à la demande)

function platformClient() {
  if (!platformConfigured()) return null;
  if (_sb) return _sb;
  if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
    console.warn('[platform] SDK Supabase non chargé.');
    return null;
  }
  _sb = window.supabase.createClient(
    PLATFORM_CONFIG.supabaseUrl,
    PLATFORM_CONFIG.supabaseAnonKey,
    { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
  );
  return _sb;
}

// --------------------------------------------------------
// Authentification
// --------------------------------------------------------
async function platformSignUp({ email, password, displayName }) {
  const sb = platformClient();
  if (!sb) throw new Error('PLATFORM_NOT_CONFIGURED');
  const { data, error } = await sb.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { display_name: (displayName || '').trim() } }
  });
  if (error) throw new Error(mapAuthError(error));
  return data;
}

async function platformSignIn({ email, password }) {
  const sb = platformClient();
  if (!sb) throw new Error('PLATFORM_NOT_CONFIGURED');
  const { data, error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw new Error(mapAuthError(error));
  return data;
}

async function platformSignOut() {
  const sb = platformClient();
  if (!sb) return;
  await sb.auth.signOut();
}

async function platformResetPassword(email) {
  const sb = platformClient();
  if (!sb) throw new Error('PLATFORM_NOT_CONFIGURED');
  const redirectTo = PLATFORM_CONFIG.passwordResetRedirect || window.location.origin;
  const { error } = await sb.auth.resetPasswordForEmail(email.trim(), { redirectTo });
  if (error) throw new Error(mapAuthError(error));
}

// Renvoie { id, email, displayName } ou null si non connecté.
async function platformCurrentUser() {
  const sb = platformClient();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  const u = data && data.user;
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    displayName: (u.user_metadata && u.user_metadata.display_name) || (u.email ? u.email.split('@')[0] : '')
  };
}

// Traduit certains messages d'erreur Supabase vers nos codes i18n.
function mapAuthError(error) {
  const m = (error && error.message ? error.message : '').toLowerCase();
  if (m.includes('already registered') || m.includes('already been registered')) return 'EMAIL_TAKEN';
  if (m.includes('invalid login')) return 'BAD_CREDENTIALS';
  if (m.includes('email not confirmed')) return 'EMAIL_NOT_CONFIRMED';
  if (m.includes('password')) return 'PASSWORD_TOO_SHORT';
  if (m.includes('unable to validate email') || m.includes('invalid email')) return 'INVALID_EMAIL';
  return error && error.message ? error.message : 'AUTH_ERROR';
}

// --------------------------------------------------------
// Contrôle d'accès (abonnement)
// --------------------------------------------------------
// Renvoie true si l'utilisateur a un accès actif au cours donné.
// Calcul côté client à partir de la table entitlements (protégée par
// RLS : l'utilisateur ne voit que ses propres lignes).
async function platformHasAccess(courseId) {
  const sb = platformClient();
  if (!sb) return false;
  const nowIso = new Date().toISOString();
  const { data, error } = await sb
    .from('entitlements')
    .select('id, all_access, course_id, status, current_period_end')
    .eq('status', 'active');
  if (error || !data) return false;
  return data.some(e =>
    (e.all_access === true || e.course_id === courseId) &&
    (!e.current_period_end || e.current_period_end > nowIso)
  );
}

// --------------------------------------------------------
// Progression (synchronisée par cours)
// --------------------------------------------------------
async function platformLoadProgress(courseId) {
  const sb = platformClient();
  if (!sb) return null;
  const user = await platformCurrentUser();
  if (!user) return null;
  const { data, error } = await sb
    .from('progress')
    .select('data')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle();
  if (error) { console.warn('[platform] loadProgress', error.message); return null; }
  return data ? data.data : {};
}

async function platformSaveProgress(courseId, progressData) {
  const sb = platformClient();
  if (!sb) return;
  const user = await platformCurrentUser();
  if (!user) return;
  const { error } = await sb
    .from('progress')
    .upsert({ user_id: user.id, course_id: courseId, data: progressData, updated_at: new Date().toISOString() },
            { onConflict: 'user_id,course_id' });
  if (error) console.warn('[platform] saveProgress', error.message);
}

// --------------------------------------------------------
// Paiement (Lemon Squeezy Checkout)
// --------------------------------------------------------
// Construit l'URL de paiement d'une variante (plan) en pré-remplissant
// l'e-mail et en joignant l'identifiant utilisateur (custom data) pour
// que le webhook puisse relier l'abonnement au bon compte.
function platformCheckoutUrl(user, variantId) {
  const store = PLATFORM_CONFIG.lemonSqueezyStore;
  if (!store || !variantId) return '';
  const url = new URL(`https://${store}.lemonsqueezy.com/checkout/buy/${variantId}`);
  if (user && user.email) url.searchParams.set('checkout[email]', user.email);
  if (user && user.id) url.searchParams.set('checkout[custom][user_id]', user.id);
  return url.toString();
}
