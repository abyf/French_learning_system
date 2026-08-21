// ============================================================
// Supabase Edge Function — webhook Lemon Squeezy.
//
// Rôle : à chaque événement d'abonnement / achat, mettre à jour la
// table `entitlements` (qui décide de l'accès aux cours). Utilise la
// clé service_role (contourne la RLS) — c'est le SEUL endroit qui
// écrit dans `entitlements`.
//
// Sécurité : la signature HMAC-SHA256 du corps brut est vérifiée avec
// le secret de webhook Lemon Squeezy avant tout traitement.
//
// Déploiement (voir instructions fournies) :
//   supabase functions deploy lemonsqueezy-webhook --no-verify-jwt
//   supabase secrets set LEMONSQUEEZY_WEBHOOK_SECRET=...
// (SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont injectés automatiquement.)
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ---- Correspondance variante Lemon Squeezy → cours + type ----
// REMPLACER par vos identifiants de variantes (Lemon Squeezy → produit
// → variantes). "lifetime: true" = achat unique, accès permanent.
const VARIANT_MAP: Record<string, { course_id: string; lifetime: boolean }> = {
  '2042210': { course_id: 'fr-beginner', lifetime: false }, // Mensuel (abonnement)
  '2042179': { course_id: 'fr-beginner', lifetime: false }, // Annuel (abonnement)
  '2042204': { course_id: 'fr-beginner', lifetime: true  }  // À vie (paiement unique)
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const WEBHOOK_SECRET = Deno.env.get('LEMONSQUEEZY_WEBHOOK_SECRET')!;

async function verifySignature(secret: string, rawBody: string, signatureHex: string): Promise<boolean> {
  if (!signatureHex) return false;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, '0')).join('');
  if (hex.length !== signatureHex.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ signatureHex.charCodeAt(i);
  return diff === 0;
}

// Statuts d'abonnement Lemon Squeezy considérés comme « accès actif ».
const ACTIVE_SUB_STATUSES = new Set(['active', 'on_trial', 'paused']);
// (paused garde souvent l'accès jusqu'à la fin de période ; ajustez au besoin.)

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const raw = await req.text();
  const signature = req.headers.get('X-Signature') || '';
  const ok = await verifySignature(WEBHOOK_SECRET, raw, signature);
  if (!ok) return new Response('Invalid signature', { status: 401 });

  let body: any;
  try { body = JSON.parse(raw); } catch { return new Response('Bad JSON', { status: 400 }); }

  const eventName: string = body?.meta?.event_name || '';
  const userId: string | undefined = body?.meta?.custom_data?.user_id;
  const data = body?.data || {};
  const attr = data?.attributes || {};

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

  // Journalise l'événement (idempotence / audit).
  const eventKey = `${eventName}:${data?.id ?? ''}:${attr?.updated_at ?? attr?.created_at ?? ''}`;
  await supabase.from('ls_events').upsert(
    { id: eventKey, event_name: eventName, payload: body },
    { onConflict: 'id' }
  );

  if (!userId) {
    // Sans user_id (custom data), on ne peut pas relier au compte.
    return new Response('OK (no user_id)', { status: 200 });
  }

  // Identifie la variante concernée (abonnement ou commande unique).
  const variantId = String(
    attr?.variant_id ??
    data?.attributes?.first_order_item?.variant_id ??
    attr?.first_order_item?.variant_id ?? ''
  );
  const mapping = VARIANT_MAP[variantId];
  if (!mapping) {
    return new Response(`OK (unmapped variant ${variantId})`, { status: 200 });
  }

  const isOrder = eventName.startsWith('order_');
  const isSubscription = eventName.startsWith('subscription_');

  // Détermine l'état d'accès selon l'événement.
  let status = 'active';
  let currentPeriodEnd: string | null = null;
  let lsSubscriptionId: string | null = null;

  if (isSubscription) {
    lsSubscriptionId = String(data?.id ?? '');
    const subStatus = String(attr?.status ?? '');
    // Accès actif tant que le statut est actif OU (annulé mais période encore en cours).
    if (subStatus === 'expired' || eventName === 'subscription_expired') {
      status = 'expired';
    } else if (subStatus === 'cancelled' || eventName === 'subscription_cancelled') {
      // Annulé : accès conservé jusqu'à ends_at.
      status = (attr?.ends_at && new Date(attr.ends_at) > new Date()) ? 'active' : 'expired';
    } else if (ACTIVE_SUB_STATUSES.has(subStatus)) {
      status = 'active';
    } else {
      status = 'past_due';
    }
    currentPeriodEnd = attr?.renews_at || attr?.ends_at || null;
  } else if (isOrder) {
    // Achat unique (ex : "à vie").
    status = 'active';
    currentPeriodEnd = mapping.lifetime ? null : (attr?.renews_at || null);
  }

  const row: Record<string, unknown> = {
    user_id: userId,
    course_id: mapping.course_id,
    all_access: false,
    status,
    source: 'lemonsqueezy',
    ls_customer_id: String(attr?.customer_id ?? ''),
    ls_variant_id: variantId,
    current_period_end: currentPeriodEnd,
    updated_at: new Date().toISOString()
  };
  if (lsSubscriptionId) row.ls_subscription_id = lsSubscriptionId;

  // Upsert : par abonnement si dispo (mise à jour du même abonnement),
  // sinon insertion (commande unique).
  if (lsSubscriptionId) {
    await supabase.from('entitlements').upsert(row, { onConflict: 'ls_subscription_id' });
  } else {
    await supabase.from('entitlements').insert(row);
  }

  return new Response('OK', { status: 200 });
});
