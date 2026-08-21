-- ============================================================
-- Nipponmboa Learning Platform — Supabase schema (Phase 1)
--
-- Multi-course, subscription-gated learning platform.
--   • auth.users        : managed by Supabase Auth (email/password, etc.)
--   • profiles          : public profile row per user (display name…)
--   • courses           : catalogue (add a row per new course)
--   • course_content    : gated lesson content (Phase 2 migration target)
--   • entitlements      : who can access what (written ONLY by the
--                         Lemon Squeezy webhook via the service role)
--   • progress          : per-user, per-course progress (server-synced)
--   • ls_events         : raw webhook events (idempotency / audit)
--
-- How to run: Supabase Dashboard → SQL Editor → paste this whole file → Run.
-- Safe to re-run (idempotent where possible).
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- courses (catalogue) ----------
create table if not exists public.courses (
  id           text primary key,            -- e.g. 'fr-beginner', 'ja-beginner'
  title        text not null,
  language     text not null,               -- 'fr','ja','en'…
  level        text,                        -- 'beginner','intermediate'…
  description  text,
  sort_order   int  not null default 0,
  is_published boolean not null default false,
  ls_variant_id text,                       -- Lemon Squeezy variant (per-course purchase, optional)
  created_at   timestamptz not null default now()
);

-- ---------- course_content (gated) ----------
-- Phase 2: content.js migrates into rows here. is_preview = free taster.
create table if not exists public.course_content (
  id          bigint generated always as identity primary key,
  course_id   text not null references public.courses(id) on delete cascade,
  kind        text not null,                -- 'vocab','grammar','reading','dictation'…
  ref         text not null,                -- stage/key, e.g. 's00'
  data        jsonb not null,
  is_preview  boolean not null default false,
  sort_order  int not null default 0
);
create index if not exists course_content_course_idx on public.course_content(course_id);

-- ---------- entitlements (access rights) ----------
-- Written ONLY by the Lemon Squeezy webhook (service role, bypasses RLS).
create table if not exists public.entitlements (
  id                 bigint generated always as identity primary key,
  user_id            uuid not null references auth.users(id) on delete cascade,
  course_id          text references public.courses(id) on delete cascade, -- null when all_access
  all_access         boolean not null default false,
  status             text not null default 'active',   -- active | canceled | expired | past_due
  source             text not null default 'lemonsqueezy',
  ls_subscription_id text,
  ls_customer_id     text,
  ls_variant_id      text,
  current_period_end timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index if not exists entitlements_user_idx on public.entitlements(user_id);
create unique index if not exists entitlements_sub_uidx
  on public.entitlements(ls_subscription_id) where ls_subscription_id is not null;

-- ---------- progress (server-synced) ----------
create table if not exists public.progress (
  user_id    uuid not null references auth.users(id) on delete cascade,
  course_id  text not null references public.courses(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

-- ---------- webhook event log (idempotency / audit) ----------
create table if not exists public.ls_events (
  id          text primary key,             -- Lemon Squeezy event/meta id
  event_name  text,
  payload     jsonb,
  received_at timestamptz not null default now()
);

-- ---------- access helper ----------
-- True if the user has an active all-access entitlement, or an active
-- entitlement for this specific course, and it hasn't expired.
create or replace function public.has_course_access(uid uuid, cid text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.entitlements e
    where e.user_id = uid
      and e.status = 'active'
      and (e.all_access = true or e.course_id = cid)
      and (e.current_period_end is null or e.current_period_end > now())
  );
$$;

-- ============================================================
-- Row-Level Security
-- ============================================================
alter table public.profiles       enable row level security;
alter table public.courses        enable row level security;
alter table public.course_content enable row level security;
alter table public.entitlements   enable row level security;
alter table public.progress       enable row level security;
alter table public.ls_events      enable row level security;

-- profiles: a user reads/updates only their own row
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id);

-- courses: anyone (even signed-out) can browse the published catalogue
drop policy if exists courses_read_published on public.courses;
create policy courses_read_published on public.courses
  for select using (is_published = true);

-- course_content: preview lessons are public; full lessons require access
drop policy if exists content_preview_or_entitled on public.course_content;
create policy content_preview_or_entitled on public.course_content
  for select using (
    is_preview = true or public.has_course_access(auth.uid(), course_id)
  );

-- entitlements: a user may READ their own; no client may write
-- (the webhook uses the service-role key, which bypasses RLS).
drop policy if exists entitlements_read_own on public.entitlements;
create policy entitlements_read_own on public.entitlements
  for select using (auth.uid() = user_id);

-- progress: a user has full read/write on their own rows
drop policy if exists progress_rw_own on public.progress;
create policy progress_rw_own on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ls_events: RLS enabled, no policies => only the service role can touch it.

-- ============================================================
-- Seed: first course (mark as published so it shows in the catalogue).
-- Replace ls_variant_id later with your Lemon Squeezy variant id if you
-- sell this course individually (not needed for an all-access subscription).
-- ============================================================
insert into public.courses (id, title, language, level, description, sort_order, is_published)
values ('fr-beginner', 'Le Français facile', 'fr', 'beginner',
        'Apprendre le français pour débutants (locuteurs japonais).', 1, true)
on conflict (id) do nothing;
