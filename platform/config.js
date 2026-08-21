// ============================================================
// Configuration de la plateforme.
// Ces valeurs "anon"/publiques peuvent vivre dans le navigateur ;
// elles ne donnent AUCUN accès privilégié (la sécurité repose sur
// l'authentification Supabase + les règles RLS côté serveur).
//
// À NE JAMAIS mettre ici : la clé service_role Supabase, la clé API
// Lemon Squeezy, ou le secret de webhook. Ceux-là restent côté
// serveur (variables d'environnement de l'Edge Function).
// ============================================================
const PLATFORM_CONFIG = {
  // Supabase → Project Settings → API (URL de base du projet, sans /rest/v1)
  supabaseUrl: 'https://ylekubmwjilacpcmtjln.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZWt1Ym13amlsYWNwY210amxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMDcyNDcsImV4cCI6MjEwMjc4MzI0N30.LbSQiLOkQRg447yleYKZBZkxX_lBNbjOko0UtjFFTo0',

  // Cours servi par cette application (ligne dans la table `courses`)
  courseId: 'fr-beginner',

  // Boutique Lemon Squeezy + plans d'abonnement (variantes).
  lemonSqueezyStore: 'language-academy',
  plans: [
    { key: 'monthly',  variantId: '2042210' },
    { key: 'annual',   variantId: '2042179' },
    { key: 'lifetime', variantId: '2042204' }
  ],

  // Redirection après clic sur le lien de réinitialisation du mot de passe
  // (vide = origine actuelle).
  passwordResetRedirect: ''
};

// La plateforme est "active" seulement si Supabase est configuré.
// Sinon, l'application retombe sur le mode local (localStorage).
function platformConfigured() {
  return !!(PLATFORM_CONFIG.supabaseUrl && PLATFORM_CONFIG.supabaseAnonKey);
}
