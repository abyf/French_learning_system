# Le Français facile / やさしいフランス語

A fully offline, local web app for absolute-beginner Japanese speakers learning French. No build step, no server, no install.

## How to launch

Double-click **`Lancer Le Francais facile.vbs`** — it opens the app in your default browser with no console window. If your system blocks `.vbs` scripts, use `lancer.bat` instead (briefly flashes a console window), or just open `index.html` directly.

Note: this isn't a packaged desktop app (no `.exe`/installer) — it's a static site opened in your browser. That keeps things dependency-free, but it's a different kind of "launcher" than a compiled Electron app.

## Accounts

On first launch you'll see a login/register screen (first name, email, alias, password). Accounts are stored **locally in your browser's storage only** — there is no server, and nothing is sent over the network. Passwords are hashed (SHA-256 via the Web Crypto API) before being stored, not kept in plaintext, but this is local access control for a personal offline app, not server-grade authentication — don't reuse these passwords for anything sensitive.

Each account has its own progress (vocabulary known, grammar viewed, reading scores, dictation results, daily plan position), so multiple people can use the same computer with separate accounts. After logging in, the header shows "Bonjour {prénom}" and your `@alias`, with a "Se déconnecter" button.

## How it's organized

- **UI language**: French by default, with a 日本語 toggle in the header. Switching languages only changes the interface chrome (nav, buttons, instructions) — the French being taught never changes.
- **Content language**: Everything you're learning (vocabulary, grammar examples, reading passages, dictation phrases) is always in French, with Japanese glosses/translations alongside it, since the app assumes zero prior French knowledge.
- **Progress**: Saved to `localStorage` in your browser (per-device, no account needed).
- **Audio**: Uses the browser's built-in speech synthesis (`speechSynthesis`, `fr-FR`) to read French words/sentences aloud — no audio files to manage. Works in Chrome/Edge; support varies in other browsers.

## Daily guided plan (Programme)

The dashboard always shows a "today's session" card with that day's 4 tasks (Vocabulaire, Grammaire, Lecture, Dictée), and the "Programme" nav item shows the full Day 0 → end schedule.

- Each stage's vocabulary is split into small daily batches (~5 new words/day) instead of dumping the whole list at once.
- Once a stage's vocabulary is fully learned, a "capstone day" unlocks that stage's grammar point, reading passage, and dictation for the first time (status: **Nouveau**).
- On the vocab-only days before a capstone, grammar/reading/dictation show as **Révision** of the last unlocked stage (or **Verrouillé** during the very first days, since nothing precedes the alphabet).
- There's no manual "mark as done" button — the current day is computed automatically from actual progress (words marked "known", grammar viewed, reading submitted, dictation typed correctly). If you go back and review something, the plan reflects that; if you skip ahead via free navigation, the plan just catches up once the real prerequisites are met.

This logic lives in `daily-plan.js` (`buildDailyPlan()`), which regenerates itself from `CURRICULUM`/`VOCAB_LESSONS` — so adding new stages or words automatically extends the schedule, no manual re-numbering needed.

## Files

- `index.html` — app shell, header with user bar + language switcher
- `styles.css` — all styling
- `content.js` — all learning content (curriculum, vocabulary, grammar, reading, dictation)
- `daily-plan.js` — generates the Day 0 → end guided schedule from the content
- `i18n.js` — UI string translations (fr/ja) + speech synthesis helper
- `auth.js` — local account register/login (localStorage-based, hashed passwords)
- `app.js` — app logic: auth gating, routing, dashboard, daily plan, flashcards, quizzes, reading, dictation, per-user progress tracking
- `Lancer Le Francais facile.vbs` / `lancer.bat` — double-click launchers

## The 10 graduated stages (A0 → early A1)

1. Bonjour ! Se présenter — greetings, `s'appeler`
2. Le verbe être — être, adjectives, nationalities
3. Le verbe avoir et les nombres — avoir, numbers 0-9
4. Les articles et les objets — le/la/les, un/une/des
5. La famille — family vocabulary, possessive adjectives
6. La routine quotidienne — -ER verbs in the present tense
7. La nourriture — food, partitive articles (du/de la/des)
8. L'heure et les jours — telling time, days of the week
9. Les courses et les questions — shopping, question words
10. Le week-end dernier — passé composé with avoir

Each stage has 10 vocabulary words (with pronunciation hints in katakana), one grammar point (with conjugation tables where relevant), one reading passage with comprehension questions, and 2 dictation phrases.

## Extending the content

To add more stages/words/passages, follow the existing object shapes in `content.js` and add a new entry to `CURRICULUM` — the app picks up new stages automatically, no other code changes needed.
