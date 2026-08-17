// ============================================================
// Le Français facile — logique de l'application (SPA vanilla JS)
// ============================================================

const app = document.getElementById('app');

// --------------------------------------------------------
// Utilisateur connecté (session locale)
// --------------------------------------------------------
let currentUser = null; // { firstname, email, alias }
let authMode = 'login';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function progressStorageKey() {
  return `lff-progress-${currentUser.alias}`;
}

// --------------------------------------------------------
// Progression (localStorage, isolée par utilisateur)
// --------------------------------------------------------
function loadProgress() {
  const raw = localStorage.getItem(progressStorageKey());
  const data = raw ? JSON.parse(raw) : {};
  CURRICULUM.forEach(stage => {
    if (!data[stage.id]) {
      data[stage.id] = {
        vocabKnown: [],
        vocabQuizDone: false,
        grammarViewed: false,
        readingScore: null, // { correct, total }
        dictation: {} // { [dictationId]: true }
      };
    }
    // Dernière carte affichée dans le défilé de vocabulaire — pour ne pas
    // repartir de la carte 1 chaque fois que la page est rechargée.
    if (data[stage.id].vocabLastIndex === undefined) data[stage.id].vocabLastIndex = 0;
  });
  // Journal de révision globale (SRS léger) : dernière date de révision par mot,
  // indépendant de l'étape. Clé = "stageId:wordIndex".
  if (!data._srs) data._srs = {};
  // Réussites (badges) déjà débloquées
  if (!data._achievements) data._achievements = [];
  // Avancement du programme guidé, au niveau de chaque étape (step) de
  // chaque jour — indépendant des indicateurs par étape ci-dessus, pour
  // que les jours de révision/bilan exigent une vraie action à refaire.
  // Clé = numéro de jour, valeur = { [indexDuStep]: true }.
  if (!data._dayDone) data._dayDone = {};
  // Dernier mode d'apprentissage choisi ('guided' | 'free'), pour proposer
  // de reprendre au même endroit la prochaine fois — l'apprenant peut
  // toujours changer de mode depuis l'accueil.
  if (!data._lastMode) data._lastMode = null;
  return data;
}

// Indique si une action de la séance guidée vient d'être arrêtée
// volontairement ("Arrêter pour aujourd'hui"), pour afficher un message
// amical une seule fois au retour sur l'accueil.
let justStoppedForToday = false;

function saveProgress(progress) {
  localStorage.setItem(progressStorageKey(), JSON.stringify(progress));
}

let progress = null; // chargé après connexion (voir completeLogin)

function stageCompletionRatio(stageId) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const p = progress[stageId];
  const vocabTotal = VOCAB_LESSONS[stage.vocabId].words.length;
  const vocabDone = p.vocabKnown.length >= vocabTotal ? 1 : p.vocabKnown.length / vocabTotal;
  const grammarDone = p.grammarViewed ? 1 : 0;
  const readingDone = p.readingScore && p.readingScore.correct === p.readingScore.total ? 1 : (p.readingScore ? 0.5 : 0);
  const dictDone = stage.dictationIds.every(id => p.dictation[id]) ? 1 : (stage.dictationIds.some(id => p.dictation[id]) ? 0.5 : 0);
  return (vocabDone + grammarDone + readingDone + dictDone) / 4;
}

function overallProgress() {
  const total = CURRICULUM.reduce((sum, s) => sum + stageCompletionRatio(s.id), 0);
  return Math.round((total / CURRICULUM.length) * 100);
}

function firstIncompleteStage() {
  const found = CURRICULUM.find(s => stageCompletionRatio(s.id) < 1);
  return found ? found.id : CURRICULUM[0].id;
}

// --------------------------------------------------------
// Programme quotidien — état d'avancement (calculé, pas manuel)
// Chaque jour du programme est une liste ordonnée de "steps"
// (ex : { kind:'vocab', stageId:'s03', mode:'new' }). L'avancement
// d'un step est stocké indépendamment de l'indicateur de l'étape
// elle-même (progress[stageId].xxx), afin qu'un jour de révision
// ou de bilan exige une vraie action refaite, même si le contenu
// avait déjà été validé lors du jour "nouveau" correspondant.
// --------------------------------------------------------
function isStepDone(day, stepIndex) {
  return !!(progress._dayDone && progress._dayDone[day] && progress._dayDone[day][stepIndex]);
}

function isDayComplete(entry) {
  return entry.steps.every((_, i) => isStepDone(entry.day, i));
}

function getCurrentDayIndex() {
  for (let i = 0; i < DAILY_PLAN.length; i++) {
    if (!isDayComplete(DAILY_PLAN[i])) return i;
  }
  return DAILY_PLAN.length - 1;
}

// --------------------------------------------------------
// Métadonnées d'affichage par type d'activité (jour guidé) —
// inclut phrase/parler en plus des 4 piliers du programme.
// --------------------------------------------------------
const DAY_KIND_META = {
  vocab: { titleKey: 'navVocabulary' },
  grammar: { titleKey: 'navGrammar' },
  reading: { titleKey: 'navReading' },
  dictation: { titleKey: 'navDictation' },
  phrase: { titleKey: 'phrasesNavLabel' },
  speaking: { titleKey: 'speakingNavLabel' }
};
const DAY_KIND_ORDER = ['vocab', 'grammar', 'reading', 'dictation', 'phrase', 'speaking'];
const DAY_TYPE_LABEL_KEY = { new: 'dayTypeNew', review: 'dayTypeReview', extended: 'dayTypeExtended', test: 'dayTypeTest' };

function entryKinds(entry) {
  const present = new Set(entry.steps.map(s => s.kind));
  return DAY_KIND_ORDER.filter(k => present.has(k));
}

function kindStepIndexes(entry, kind) {
  const idxs = [];
  entry.steps.forEach((s, i) => { if (s.kind === kind) idxs.push(i); });
  return idxs;
}

function kindStatus(entry, kind) {
  const idxs = kindStepIndexes(entry, kind);
  const done = idxs.filter(i => isStepDone(entry.day, i)).length;
  return { total: idxs.length, done, complete: idxs.length > 0 && done === idxs.length };
}

function kindStatusLabel(entry, kind) {
  const status = kindStatus(entry, kind);
  if (status.total === 0) return '';
  if (status.complete) return t('statusDone');
  if (status.total > 1) return `${status.done}/${status.total}`;
  if (entry.dayType === 'new') return t('statusNew');
  if (entry.dayType === 'extended') return t('dayTypeExtended');
  return t('statusReview');
}

// Aperçu concret du contenu d'un step, pour que l'apprenant voie sa
// progression (ex : "bonjour, bonsoir, salut..." / "Le verbe être")
// au lieu d'un simple statut abstrait.
function stepContentPreview(step) {
  if (step.kind === 'vocab') {
    const stage = CURRICULUM.find(s => s.id === step.stageId);
    const lesson = VOCAB_LESSONS[stage.vocabId];
    if (step.mode !== 'new') return `${stage.titleFr} — ${t('quizToday')} (${lesson.words.length} ${t('wordsLabel')})`;
    const words = lesson.words.map(w => w.fr);
    const preview = words.length > 6 ? `${words.slice(0, 3).join(', ')}, … , ${words[words.length - 1]}` : words.join(', ');
    return `${stage.titleFr} : ${preview}`;
  }
  if (step.kind === 'grammar') {
    const stage = CURRICULUM.find(s => s.id === step.stageId);
    return `${stage.titleFr} — ${GRAMMAR_POINTS[stage.grammarId].titleFr}`;
  }
  if (step.kind === 'reading') {
    const stage = CURRICULUM.find(s => s.id === step.stageId);
    return `${stage.titleFr} — ${READING_PASSAGES[stage.readingId].titleFr}`;
  }
  if (step.kind === 'dictation') {
    const stage = CURRICULUM.find(s => s.id === step.stageId);
    return `${stage.titleFr} — ` + stage.dictationIds.map(id => loc(DICTATION_ITEMS[id].hintFr, DICTATION_ITEMS[id].hintJa)).join(' / ');
  }
  if (step.kind === 'phrase') {
    const p = PHRASEBOOK_FLAT[step.phraseIndex];
    return p ? p.fr : '';
  }
  if (step.kind === 'speaking') {
    const p = PHRASEBOOK_FLAT[step.phraseIndex];
    return p ? p.fr : '';
  }
  return '';
}

function kindContentPreview(entry, kind) {
  const idxs = kindStepIndexes(entry, kind);
  if (idxs.length === 0) return null;
  const firstNotDone = idxs.find(i => !isStepDone(entry.day, i));
  const idx = firstNotDone !== undefined ? firstNotDone : idxs[idxs.length - 1];
  return stepContentPreview(entry.steps[idx]);
}

// --------------------------------------------------------
// Écran de connexion / inscription
// --------------------------------------------------------
const AUTH_ERROR_KEYS = {
  MISSING_FIRSTNAME: 'errorRequired',
  INVALID_EMAIL: 'errorEmailInvalid',
  ALIAS_TOO_SHORT: 'errorAliasTooShort',
  PASSWORD_TOO_SHORT: 'errorPasswordTooShort',
  ALIAS_TAKEN: 'errorAliasTaken',
  EMAIL_TAKEN: 'errorEmailTaken',
  PASSWORD_MISMATCH: 'errorPasswordMismatch',
  NOT_FOUND: 'errorLoginFailed',
  BAD_PASSWORD: 'errorLoginFailed'
};

function authErrorMessage(code) {
  return t(AUTH_ERROR_KEYS[code] || 'errorGeneric');
}

function renderUserBar() {
  const bar = document.getElementById('user-bar');
  if (!bar) return;
  if (!currentUser) {
    bar.innerHTML = '';
    return;
  }
  bar.innerHTML = `
    <span class="welcome-msg">${t('welcomeMsg')} ${escapeHtml(currentUser.firstname)} !</span>
    <span class="user-alias-badge">@${escapeHtml(currentUser.alias)}</span>
    <button class="logout-btn" id="logout-btn">${t('logoutButton')}</button>`;
  document.getElementById('logout-btn').addEventListener('click', logout);
}

function completeLogin(user) {
  currentUser = { firstname: user.firstname, email: user.email, alias: user.alias };
  saveSession(user.alias);
  progress = loadProgress();
  renderUserBar();
  window.location.hash = '/dashboard';
  render();
}

function logout() {
  clearSession();
  currentUser = null;
  progress = null;
  authMode = 'login';
  window.location.hash = '';
  renderUserBar();
  render();
}

function renderAuthScreen(mode) {
  authMode = mode;
  const isLogin = mode === 'login';

  app.innerHTML = `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="auth-header">
          <h1>${t('appTitle')}</h1>
          <p>${t('appSubtitle')}</p>
        </div>
        <div class="auth-tabs">
          <button class="auth-tab ${isLogin ? 'active' : ''}" data-mode="login">${t('loginTab')}</button>
          <button class="auth-tab ${!isLogin ? 'active' : ''}" data-mode="register">${t('registerTab')}</button>
        </div>
        ${isLogin ? renderLoginFormHtml() : renderRegisterFormHtml()}
      </div>
    </div>`;

  document.querySelectorAll('.auth-tab[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => renderAuthScreen(btn.dataset.mode));
  });

  if (isLogin) bindLoginForm(); else bindRegisterForm();
}

function renderLoginFormHtml() {
  return `
    <form id="login-form" class="auth-form" novalidate>
      <label>${t('aliasLabel')}
        <input type="text" id="login-alias" autocomplete="username" required minlength="3" />
      </label>
      <label>${t('passwordLabel')}
        <input type="password" id="login-password" autocomplete="current-password" required minlength="6" />
      </label>
      <p class="auth-error" id="auth-error" role="alert"></p>
      <button type="submit" class="primary-btn auth-submit">${t('loginButton')}</button>
    </form>`;
}

function renderRegisterFormHtml() {
  return `
    <form id="register-form" class="auth-form" novalidate>
      <label>${t('firstnameLabel')}
        <input type="text" id="reg-firstname" required />
      </label>
      <label>${t('emailLabel')}
        <input type="email" id="reg-email" autocomplete="email" required />
      </label>
      <label>${t('aliasLabel')}
        <input type="text" id="reg-alias" autocomplete="username" required minlength="3" />
      </label>
      <label>${t('passwordLabel')}
        <input type="password" id="reg-password" autocomplete="new-password" required minlength="6" />
      </label>
      <label>${t('confirmPasswordLabel')}
        <input type="password" id="reg-confirm" autocomplete="new-password" required minlength="6" />
      </label>
      <p class="auth-error" id="auth-error" role="alert"></p>
      <button type="submit" class="primary-btn auth-submit">${t('registerButton')}</button>
    </form>`;
}

function bindLoginForm() {
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const alias = document.getElementById('login-alias').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('auth-error');
    errorEl.textContent = '';
    try {
      const user = await loginUser(alias, password);
      completeLogin(user);
    } catch (err) {
      errorEl.textContent = authErrorMessage(err.message);
    }
  });
}

function bindRegisterForm() {
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstname = document.getElementById('reg-firstname').value;
    const email = document.getElementById('reg-email').value;
    const alias = document.getElementById('reg-alias').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const errorEl = document.getElementById('auth-error');
    errorEl.textContent = '';

    if (password !== confirm) {
      errorEl.textContent = authErrorMessage('PASSWORD_MISMATCH');
      return;
    }
    try {
      const user = await registerUser({ firstname, email, alias, password });
      completeLogin(user);
    } catch (err) {
      errorEl.textContent = authErrorMessage(err.message);
    }
  });
}

// --------------------------------------------------------
// Routage (hash-based)
// --------------------------------------------------------
function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);
  if (parts.length === 0) return { view: 'dashboard' };
  return { view: parts[0], stageId: parts[1], extra: parts[2] };
}

function navigate(path) {
  window.location.hash = path;
}

window.addEventListener('hashchange', render);

function render() {
  if (!currentUser) return renderAuthScreen(authMode);
  const route = parseRoute();
  switch (route.view) {
    case 'vocab': return renderVocab(route.stageId);
    case 'vocabquiz': return renderVocabQuiz(route.stageId, 0, 0);
    case 'grammar': return renderGrammar(route.stageId);
    case 'reading': return renderReading(route.stageId);
    case 'dictation': return renderDictation(route.stageId);
    case 'discrimination': return renderDiscrimination();
    case 'vocabreview': return renderVocabReview();
    case 'gendergame': return renderGenderGame();
    case 'conjugation': return renderConjugationDrill(route.stageId);
    case 'sentencebuilder': return renderSentenceBuilder(route.stageId);
    case 'phrases': return renderPhrasebook();
    case 'speaking': return renderSpeaking();
    case 'dailyphrase': return renderDailyPhrase(Number(route.stageId));
    case 'dailyspeaking': return renderDailySpeakingTask(Number(route.stageId));
    case 'plan': return renderDailyPlan();
    case 'explore': return renderExploreHome();
    case 'achievements': return renderAchievementsPage();
    case 'browse': return renderActivityBrowse(route.stageId);
    default: return renderDashboard();
  }
}

// --------------------------------------------------------
// Barre de navigation commune
// --------------------------------------------------------
function topNav(activeStageId, activeView) {
  const cls = (view) => `nav-btn${activeView === view ? ' nav-btn-active' : ''}`;
  return `
    <nav class="top-nav">
      <button class="${cls('dashboard')}" data-nav="dashboard">${t('navDashboard')}</button>
      <button class="${cls('plan')}" data-nav="plan">${t('navPlan')}</button>
      <button class="${cls('phrases')}" data-nav="phrases">${t('phrasesNavLabel')}</button>
      <button class="${cls('speaking')}" data-nav="speaking">${t('speakingNavLabel')}</button>
      ${activeStageId ? `
        <button class="${cls('vocab')}" data-nav="vocab" data-stage="${activeStageId}">${t('navVocabulary')}</button>
        <button class="${cls('grammar')}" data-nav="grammar" data-stage="${activeStageId}">${t('navGrammar')}</button>
        <button class="${cls('reading')}" data-nav="reading" data-stage="${activeStageId}">${t('navReading')}</button>
        <button class="${cls('dictation')}" data-nav="dictation" data-stage="${activeStageId}">${t('navDictation')}</button>
      ` : ''}
    </nav>`;
}

// --------------------------------------------------------
// En-tête d'activité — identifie clairement la SECTION (icône +
// nom en gros) séparément du THÈME de l'étape (qui porte souvent
// un nom grammatical comme « Le verbe être », même en Vocabulaire).
// --------------------------------------------------------
function activityBreadcrumb(kind, stage, done, doneLabel) {
  const meta = ACTIVITY_KINDS.find(a => a.kind === kind);
  return `
    <div class="activity-breadcrumb">
      <div class="breadcrumb-kind-badge">
        <span class="breadcrumb-kind-label">${t(meta.titleKey)}</span>
      </div>
      <div class="breadcrumb-stage-info">
        <p class="breadcrumb-stage-line">${t('stageLabel')} ${stage.order} · ${stage.titleFr}</p>
        <p class="stage-title-ja translatable-ja">${stage.titleJa}</p>
      </div>
      ${done
        ? `<span class="breadcrumb-status status-badge status-done">✓ ${t('statusDone')}${doneLabel ? ' · ' + doneLabel : ''}</span>`
        : (doneLabel ? `<span class="breadcrumb-status status-badge status-review">${doneLabel}</span>` : '')}
    </div>`;
}

function bindTopNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      exitSession(); // navigation via le menu = exploration libre, on quitte la séance guidée
      const view = btn.dataset.nav;
      const stage = btn.dataset.stage;
      if (view === 'dashboard' || view === 'plan' || view === 'phrases' || view === 'speaking') {
        navigate(`/${view}`);
      } else {
        navigate(`/${view}/${stage}`);
      }
    });
  });
}

// --------------------------------------------------------
// Séance guidée du jour — fait avancer l'apprenant Vocabulaire →
// Grammaire → Lecture → Dictée dans l'ordre, avec une étape
// « terminé, continuer » explicite entre chaque activité.
// --------------------------------------------------------
let sessionState = null; // { day, taskIndex, tasks: entry.steps }

function exitSession() {
  sessionState = null;
}

// En séance guidée, on n'affiche QUE l'interface de l'exercice en cours
// (+ la barre de séance) — pas le grand menu de navigation ni le
// pager d'étape, réservés au mode « Explorer librement ».
function sessionActive() {
  return !!sessionState;
}

function stepRoute(step) {
  switch (step.kind) {
    case 'vocab': return step.mode === 'new' ? `/vocab/${step.stageId}` : `/vocabquiz/${step.stageId}`;
    case 'grammar': {
      // Révision approfondie : on pratique la règle sous un angle différent
      // (conjugaison si disponible, sinon construction de phrases) plutôt
      // que de relire la même explication une nouvelle fois.
      if (step.mode === 'extended') {
        const stage = CURRICULUM.find(s => s.id === step.stageId);
        const g = GRAMMAR_POINTS[stage.grammarId];
        return g.conjugation ? `/conjugation/${stage.grammarId}` : `/sentencebuilder/${stage.grammarId}`;
      }
      return `/grammar/${step.stageId}`;
    }
    case 'reading':
      // Révision approfondie : mode écoute (texte caché) plutôt que lecture.
      readingMode = step.mode === 'extended' ? 'listen' : 'read';
      readingTextRevealed = false;
      return `/reading/${step.stageId}`;
    case 'dictation': return `/dictation/${step.stageId}`;
    case 'phrase': return `/dailyphrase/${step.phraseIndex}`;
    case 'speaking': return `/dailyspeaking/${step.phraseIndex}`;
    default: return '/dashboard';
  }
}

function goToSessionTask() {
  const step = sessionState.tasks[sessionState.taskIndex];
  navigate(stepRoute(step));
}

// Lance la séance sur le premier step non terminé du type demandé
// (ou le premier step de ce type si tout est déjà fait).
function startSessionAtKind(entry, kind) {
  const idxs = kindStepIndexes(entry, kind);
  let idx = idxs.find(i => !isStepDone(entry.day, i));
  if (idx === undefined) idx = idxs[0] || 0;
  sessionState = { day: entry.day, taskIndex: idx, tasks: entry.steps };
  goToSessionTask();
}

// Marque le step courant de la séance comme terminé, si la page
// affichée correspond bien au step actif (sécurité anti-incohérence).
function markStepDoneIfActive(kind, matchId) {
  if (!sessionState) return;
  const step = sessionState.tasks[sessionState.taskIndex];
  if (!step || step.kind !== kind) return;
  const stepId = step.stageId !== undefined ? step.stageId : step.phraseIndex;
  if (stepId !== matchId) return;
  if (!progress._dayDone) progress._dayDone = {};
  if (!progress._dayDone[sessionState.day]) progress._dayDone[sessionState.day] = {};
  progress._dayDone[sessionState.day][sessionState.taskIndex] = true;
  saveProgress(progress);
}

function renderSessionBar() {
  if (!sessionState) return '';
  const entry = DAILY_PLAN[sessionState.day];
  const currentDone = isStepDone(entry.day, sessionState.taskIndex);
  const isLast = sessionState.taskIndex === sessionState.tasks.length - 1;

  const steps = sessionState.tasks.map((step, i) => {
    const meta = DAY_KIND_META[step.kind];
    const done = isStepDone(entry.day, i);
    const current = i === sessionState.taskIndex;
    const stateClass = done ? 'session-step-done' : current ? 'session-step-current' : 'session-step-upcoming';
    return `<div class="session-step ${stateClass}">
        ${done ? `<span class="session-step-icon">✓</span>` : ''}
        <span class="session-step-label">${t(meta.titleKey)}</span>
      </div>`;
  }).join('<span class="session-step-arrow">→</span>');

  const dayTypeLabel = t(DAY_TYPE_LABEL_KEY[entry.dayType]);

  return `
    <div class="session-bar">
      <div class="session-bar-top">
        <span class="session-bar-title">${t('sessionTitle')} · ${t('weekLabel')} ${entry.week} · ${t('dayLabel')} ${entry.dayInWeek}/7 · ${dayTypeLabel} · ${sessionState.taskIndex + 1}/${sessionState.tasks.length}</span>
        <div class="session-bar-actions">
          <button class="mini-btn" id="session-stop-today-btn">${t('stopForToday')}</button>
          <button class="session-exit-btn" id="session-exit-btn">${t('backToChoice')}</button>
        </div>
      </div>
      <div class="session-steps">${steps}</div>
      ${currentDone ? `
        <div class="session-complete-banner">
          <span>${t('taskCompleteMsg')}</span>
          <button class="primary-btn" id="session-continue-btn">${isLast ? t('finishSession') : t('continueToNext')}</button>
        </div>` : ''}
    </div>`;
}

function bindSessionBar() {
  if (!sessionState) return;
  const exitBtn = document.getElementById('session-exit-btn');
  if (exitBtn) exitBtn.addEventListener('click', () => { exitSession(); navigate('/dashboard'); });

  const stopTodayBtn = document.getElementById('session-stop-today-btn');
  if (stopTodayBtn) stopTodayBtn.addEventListener('click', () => { exitSession(); justStoppedForToday = true; navigate('/dashboard'); });

  const continueBtn = document.getElementById('session-continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const isLast = sessionState.taskIndex === sessionState.tasks.length - 1;
      if (isLast) {
        exitSession();
        navigate('/dashboard');
      } else {
        sessionState.taskIndex++;
        goToSessionTask();
      }
    });
  }
}

function refreshSessionBar() {
  if (!sessionState) return;
  const container = document.querySelector('.session-bar');
  if (!container) return;
  container.outerHTML = renderSessionBar();
  bindSessionBar();
}

function stagePager(stageId, view) {
  const idx = CURRICULUM.findIndex(s => s.id === stageId);
  const prev = CURRICULUM[idx - 1];
  const next = CURRICULUM[idx + 1];
  return `
    <div class="stage-pager">
      <button class="pager-btn" id="prev-stage" ${prev ? '' : 'disabled'}>&larr; ${t('prevStage')}</button>
      <button class="pager-btn back-btn" id="back-dashboard">${t('backToDashboard')}</button>
      <button class="pager-btn" id="next-stage" ${next ? '' : 'disabled'}>${t('nextStage')} &rarr;</button>
    </div>`;
}

function bindStagePager(stageId, view) {
  const idx = CURRICULUM.findIndex(s => s.id === stageId);
  const prev = CURRICULUM[idx - 1];
  const next = CURRICULUM[idx + 1];
  const prevBtn = document.getElementById('prev-stage');
  const nextBtn = document.getElementById('next-stage');
  const backBtn = document.getElementById('back-dashboard');
  if (prevBtn && prev) prevBtn.addEventListener('click', () => { exitSession(); navigate(`/${view}/${prev.id}`); });
  if (nextBtn && next) nextBtn.addEventListener('click', () => { exitSession(); navigate(`/${view}/${next.id}`); });
  if (backBtn) backBtn.addEventListener('click', () => { exitSession(); navigate('/dashboard'); });
}

// --------------------------------------------------------
// Accueil — carte de découverte du programme (tour guidé)
// --------------------------------------------------------
function renderTourCard() {
  const items = [
    'tourItemVocab', 'tourItemGrammar', 'tourItemReading', 'tourItemDictation',
    'tourItemPhrases', 'tourItemSpeaking', 'tourItemProgram', 'tourItemModes'
  ];
  return `
    <div class="tour-card">
      <h2>${t('tourCardTitle')}</h2>
      <p class="section-subtitle">${t('tourCardIntro')}</p>
      <ul class="tour-list">
        ${items.map(key => `<li>${t(key)}</li>`).join('')}
      </ul>
    </div>`;
}

// --------------------------------------------------------
// Accueil — choix du mode d'apprentissage
// --------------------------------------------------------
function renderModeChoiceCard() {
  const lastMode = progress._lastMode;
  return `
    <div class="mode-choice-card">
      <h2>${t('modeChoiceTitle')}</h2>
      <p class="section-subtitle">${t('modeChoiceIntro')}</p>
      <div class="mode-choice-grid">
        <div class="mode-choice-option">
          ${lastMode === 'guided' ? `<span class="resume-badge">${t('resumeBadge')}</span>` : ''}
          <h3>${t('modeGuidedTitle')}</h3>
          <p>${t('modeGuidedDesc')}</p>
          <button class="primary-btn mode-choice-btn" id="choose-guided-btn">${t('modeGuidedButton')}</button>
        </div>
        <div class="mode-choice-option">
          ${lastMode === 'free' ? `<span class="resume-badge">${t('resumeBadge')}</span>` : ''}
          <h3>${t('modeFreeTitle')}</h3>
          <p>${t('modeFreeDesc')}</p>
          <button class="secondary-btn mode-choice-btn" id="choose-free-btn">${t('modeFreeButton')}</button>
        </div>
      </div>
    </div>`;
}

// Fait avancer l'apprenant directement vers le premier exercice non
// terminé du programme guidé — pas d'écran intermédiaire, juste
// l'interface de l'exercice à faire.
function enterGuidedMode() {
  progress._lastMode = 'guided';
  saveProgress(progress);
  const dayIndex = getCurrentDayIndex();
  const entry = DAILY_PLAN[dayIndex];
  let idx = entry.steps.findIndex((_, i) => !isStepDone(entry.day, i));
  if (idx === -1) idx = 0;
  sessionState = { day: entry.day, taskIndex: idx, tasks: entry.steps };
  goToSessionTask();
}

function bindModeChoiceCard() {
  const guidedBtn = document.getElementById('choose-guided-btn');
  if (guidedBtn) guidedBtn.addEventListener('click', enterGuidedMode);
  const freeBtn = document.getElementById('choose-free-btn');
  if (freeBtn) freeBtn.addEventListener('click', () => {
    progress._lastMode = 'free';
    saveProgress(progress);
    navigate('/explore');
  });
}

function activityStatus(kind, stage) {
  const p = progress[stage.id];
  if (kind === 'vocab') {
    const total = VOCAB_LESSONS[stage.vocabId].words.length;
    const known = Math.min(p.vocabKnown.length, total);
    return { done: known >= total, label: `${known}/${total}` };
  }
  if (kind === 'grammar') {
    return { done: !!p.grammarViewed, label: p.grammarViewed ? '✓' : '—' };
  }
  if (kind === 'reading') {
    const score = p.readingScore;
    return { done: !!score, label: score ? `${score.correct}/${score.total}` : '—' };
  }
  // dictation
  const ids = stage.dictationIds;
  const doneCount = ids.filter(id => p.dictation[id]).length;
  return { done: doneCount === ids.length, label: `${doneCount}/${ids.length}` };
}

const ACTIVITY_KINDS = [
  { kind: 'vocab', titleKey: 'navVocabulary' },
  { kind: 'grammar', titleKey: 'navGrammar' },
  { kind: 'reading', titleKey: 'navReading' },
  { kind: 'dictation', titleKey: 'navDictation' }
];

function activityDoneCount(kind) {
  return CURRICULUM.filter(stage => activityStatus(kind, stage).done).length;
}

// --------------------------------------------------------
// Réussites (badges) — panneau du tableau de bord, calculé
// directement depuis les données de progression existantes
// --------------------------------------------------------
function totalKnownWords() {
  return CURRICULUM.reduce((sum, s) => sum + progress[s.id].vocabKnown.length, 0);
}

const ACHIEVEMENTS = [
  { titleKey: 'achFirstWord', check: () => totalKnownWords() >= 1 },
  { titleKey: 'achTenWords', check: () => totalKnownWords() >= 10 },
  { titleKey: 'achFiftyWords', check: () => totalKnownWords() >= 50 },
  { titleKey: 'achHundredWords', check: () => totalKnownWords() >= 100 },
  { titleKey: 'achTwoHundredWords', check: () => totalKnownWords() >= 200 },
  { titleKey: 'achFirstStage', check: () => CURRICULUM.some(s => stageCompletionRatio(s.id) === 1) },
  { titleKey: 'achTenStages', check: () => CURRICULUM.filter(s => stageCompletionRatio(s.id) === 1).length >= 10 },
  { titleKey: 'achAllStages', check: () => CURRICULUM.every(s => stageCompletionRatio(s.id) === 1) },
  { titleKey: 'achGrammarian', check: () => CURRICULUM.filter(s => progress[s.id].grammarViewed).length >= 15 },
  { titleKey: 'achAvidReader', check: () => CURRICULUM.filter(s => !!progress[s.id].readingScore).length >= 15 }
];

function renderAchievementsPanel() {
  const unlockedCount = ACHIEVEMENTS.filter(a => a.check()).length;
  return `
    <div class="achievements-panel">
      <div class="achievements-header">
        <h3>${t('achievementsTitle')}</h3>
        <span class="achievements-count">${unlockedCount} / ${ACHIEVEMENTS.length} ${t('achievementsUnlocked')}</span>
      </div>
      <div class="achievements-grid">
        ${ACHIEVEMENTS.map(a => {
          const done = a.check();
          return `<div class="achievement-badge ${done ? 'achievement-unlocked' : 'achievement-locked'}" title="${t(a.titleKey)}">
            <span class="achievement-label">${t(a.titleKey)}</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function exploreCardsHtml() {
  const cards = ACTIVITY_KINDS.map(a => {
    const doneCount = activityDoneCount(a.kind);
    return `
      <button class="explore-card" data-explore="${a.kind}">
        <span class="explore-label">${t(a.titleKey)}</span>
        <span class="explore-count">${doneCount} / ${CURRICULUM.length} ${t('doneLabel')}</span>
      </button>`;
  }).join('');

  const extraCards = `
    <button class="explore-card" data-nav-direct="phrases">
      <span class="explore-label">${t('phrasesNavLabel')}</span>
      <span class="explore-count">${PHRASEBOOK.reduce((n, c) => n + c.phrases.length, 0)} phrases</span>
    </button>
    <button class="explore-card" data-nav-direct="speaking">
      <span class="explore-label">${t('speakingNavLabel')}</span>
      <span class="explore-count">${PHRASEBOOK.reduce((n, c) => n + c.phrases.length, 0)} phrases</span>
    </button>`;

  return `<div class="explore-grid">${cards}${extraCards}</div>`;
}

function bindExploreCardsClicks() {
  document.querySelectorAll('.explore-card[data-explore]').forEach(btn => {
    btn.addEventListener('click', () => navigate(`/browse/${btn.dataset.explore}`));
  });
  document.querySelectorAll('.explore-card[data-nav-direct]').forEach(btn => {
    btn.addEventListener('click', () => navigate(`/${btn.dataset.navDirect}`));
  });
}

// Page d'accueil du mode « Explorer librement » — choix de section.
function renderExploreHome() {
  app.innerHTML = `
    ${topNav(null, 'explore')}
    <section class="section-header">
      <h2>${t('exploreHomeTitle')}</h2>
      <p class="section-subtitle">${t('exploreIntro')}</p>
    </section>
    ${exploreCardsHtml()}
    <button class="secondary-btn" id="explore-view-plan">${t('viewFullPlan')}</button>
    <button class="secondary-btn" id="explore-view-achievements">${t('achievementsLinkLabel')}</button>
  `;
  bindTopNav();
  bindExploreCardsClicks();
  document.getElementById('explore-view-plan').addEventListener('click', () => navigate('/plan'));
  document.getElementById('explore-view-achievements').addEventListener('click', () => navigate('/achievements'));
}

// Page dédiée aux réussites (badges), accessible depuis l'accueil et
// depuis le mode « Explorer librement ».
function renderAchievementsPage() {
  app.innerHTML = `
    ${topNav(null)}
    <section class="section-header">
      <h2>${t('achievementsPageTitle')}</h2>
    </section>
    ${renderAchievementsPanel()}
    <button class="secondary-btn" id="back-from-achievements">${t('backToDashboard')}</button>
  `;
  bindTopNav();
  document.getElementById('back-from-achievements').addEventListener('click', () => navigate('/dashboard'));
}

function renderActivityBrowse(kind) {
  const meta = ACTIVITY_KINDS.find(a => a.kind === kind) || ACTIVITY_KINDS[0];
  const rows = CURRICULUM.map(stage => {
    const status = activityStatus(meta.kind, stage);
    return `
      <button class="activity-row ${status.done ? 'activity-row-done' : ''}" data-nav="${meta.kind}" data-stage="${stage.id}">
        <span class="activity-row-icon">${status.done ? '✓' : stage.order}</span>
        <span class="activity-row-text">
          <span class="activity-row-fr">${stage.titleFr}</span>
          <span class="activity-row-ja translatable-ja">${stage.titleJa}</span>
        </span>
        <span class="activity-row-badge ${status.done ? 'badge-done' : ''}">${status.label}</span>
      </button>`;
  }).join('');

  const reviewBannerHtml = kind === 'vocab' ? `
    <button class="primary-btn vocab-review-launch" id="launch-vocab-review">${t('vocabReviewLink')}</button>` : '';

  app.innerHTML = `
    ${topNav(null)}
    <section class="section-header">
      <h2>${t(meta.titleKey)}</h2>
      <p class="section-subtitle">${t('browseIntro')}</p>
    </section>
    ${reviewBannerHtml}
    <button class="secondary-btn plan-back-today" id="back-dashboard-browse">${t('backToDashboard')}</button>
    <div class="activity-row-list activity-row-list-full">${rows}</div>
  `;

  bindTopNav();
  document.getElementById('back-dashboard-browse').addEventListener('click', () => navigate('/explore'));
  document.querySelectorAll('.activity-row[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => { exitSession(); navigate(`/${btn.dataset.nav}/${btn.dataset.stage}`); });
  });
  const reviewBtn = document.getElementById('launch-vocab-review');
  if (reviewBtn) reviewBtn.addEventListener('click', () => navigate('/vocabreview'));
}

// --------------------------------------------------------
// Accueil (Dashboard) — tour du programme + choix du mode
// --------------------------------------------------------
function renderDashboard() {
  const pct = overallProgress();
  const showStopMsg = justStoppedForToday;
  justStoppedForToday = false;

  app.innerHTML = `
    ${topNav(null, 'dashboard')}
    <header class="dashboard-header">
      <h1>${t('dashboardWelcome')}</h1>
      <p>${t('dashboardIntro')}</p>
      <div class="overall-progress">
        <span>${t('overallProgress')}: ${pct}%</span>
        <div class="progress-bar-track large"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      </div>
    </header>
    ${showStopMsg ? `<p class="feedback-correct stop-today-msg">${t('stopForTodayMsg')}</p>` : ''}
    ${renderTourCard()}
    ${renderModeChoiceCard()}
  `;

  bindTopNav();
  bindModeChoiceCard();
}

// --------------------------------------------------------
// Programme complet (Jour 0 → fin)
// --------------------------------------------------------
function renderDailyPlan() {
  const currentDayIndex = getCurrentDayIndex();
  const allDone = currentDayIndex === DAILY_PLAN.length - 1 && isDayComplete(DAILY_PLAN[currentDayIndex]);

  const weekGroups = {};
  DAILY_PLAN.forEach((entry, i) => {
    (weekGroups[entry.week] = weekGroups[entry.week] || []).push({ entry, i });
  });

  const weekBlocks = Object.keys(weekGroups).sort((a, b) => Number(a) - Number(b)).map(weekNum => {
    const meta = WEEK_META[weekNum];
    const dayRows = weekGroups[weekNum].map(({ entry, i }) => {
      const isToday = i === currentDayIndex;
      const isPast = i < currentDayIndex;
      const kinds = entryKinds(entry);
      const dayTypeLabel = t(DAY_TYPE_LABEL_KEY[entry.dayType]);

      const badges = kinds.map(kind => {
        const kindMeta = DAY_KIND_META[kind];
        const status = kindStatus(entry, kind);
        const preview = kindContentPreview(entry, kind);
        const label = kindStatusLabel(entry, kind);
        return `<button class="plan-badge status-${status.complete ? 'done' : (entry.dayType === 'new' ? 'new' : 'review')}"
          data-day="${i}" data-go="${kind}" ${preview ? `title="${escapeHtml(preview)}"` : ''}>
          <span class="plan-badge-label">${t(kindMeta.titleKey)}</span>
          <span class="plan-badge-status">${label}</span>
          ${preview ? `<span class="plan-badge-preview">${escapeHtml(preview)}</span>` : ''}
        </button>`;
      }).join('');

      return `
        <div class="plan-day-row ${isToday ? 'plan-day-today' : ''} ${isPast ? 'plan-day-past' : ''}">
          <div class="plan-day-meta">
            <span class="day-pill">${t('dayLabel')} ${entry.dayInWeek}/7</span>
            <div>
              <p class="plan-day-stage">${dayTypeLabel}${entry.dayType !== 'test' ? ' — ' + entry.objectiveFr : ''}</p>
              <p class="stage-title-ja translatable-ja">${entry.dayType !== 'test' ? entry.objectiveJa : ''}</p>
            </div>
          </div>
          <div class="plan-day-badges">${badges}</div>
        </div>`;
    }).join('');

    return `
      <div class="plan-week-block">
        <div class="plan-week-header">
          <h3>${t('weekLabel')} ${weekNum}${meta.weekKind === 'consolidation' ? ` — ${t('weekKindConsolidation')}` : ''}</h3>
          <p class="plan-week-objective">${meta.objectiveFr} <span class="stage-title-ja translatable-ja">${meta.objectiveJa}</span></p>
        </div>
        <div class="plan-day-list">${dayRows}</div>
      </div>`;
  }).join('');

  app.innerHTML = `
    ${topNav(null, 'plan')}
    <section class="section-header">
      <h2>${t('planPageTitle')}</h2>
      <p class="section-subtitle">${t('planPageIntro')}</p>
      ${allDone ? `<p class="feedback-correct">${t('allCaughtUp')}</p>` : ''}
    </section>
    <button class="secondary-btn plan-back-today" id="back-to-today">${t('backToToday')}</button>
    ${weekBlocks}
  `;

  bindTopNav();
  document.getElementById('back-to-today').addEventListener('click', () => navigate('/dashboard'));
  document.querySelectorAll('.plan-badge[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      const entry = DAILY_PLAN[Number(btn.dataset.day)];
      startSessionAtKind(entry, btn.dataset.go);
    });
  });

  // Centre la vue sur le jour actuel
  const todayRow = document.querySelector('.plan-day-today');
  if (todayRow) todayRow.scrollIntoView({ block: 'center' });
}

// --------------------------------------------------------
// Vocabulaire — cartes retournables + quiz
// --------------------------------------------------------
let flashcardIndex = 0;
let flashcardSessionKey = '';

function renderVocab(stageId) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const lesson = VOCAB_LESSONS[stage.vocabId];
  const indexMap = lesson.words.map((_, i) => i);
  const inSession = sessionActive();

  if (stageId !== flashcardSessionKey) {
    flashcardSessionKey = stageId;
    // Reprend là où l'apprenant s'était arrêté (persisté), plutôt que de
    // toujours redémarrer à la carte 1 après un rechargement de la page.
    flashcardIndex = progress[stageId].vocabLastIndex || 0;
  }
  flashcardIndex = Math.min(flashcardIndex, indexMap.length - 1);
  const realIndex = indexMap[flashcardIndex];
  const word = lesson.words[realIndex];
  const known = progress[stageId].vocabKnown.includes(realIndex);

  const totalKnown = Math.min(progress[stageId].vocabKnown.length, lesson.words.length);
  const allKnown = totalKnown >= lesson.words.length;

  // En séance guidée, l'exercice se termine en parcourant tous les mots
  // jusqu'à la dernière carte — pas en les marquant tous « connus », qui
  // reste un choix personnel de l'apprenant, pas une condition pour avancer.
  if (inSession) {
    if (flashcardIndex === indexMap.length - 1) markStepDoneIfActive('vocab', stageId);
  }
  const breadcrumbDone = inSession ? isStepDone(sessionState.day, sessionState.taskIndex) : allKnown;
  const breadcrumbLabel = inSession ? null : `${totalKnown} / ${lesson.words.length} ${t('wordsLabel')}`;

  app.innerHTML = `
    ${inSession ? '' : topNav(stageId, 'vocab')}
    ${renderSessionBar()}
    ${activityBreadcrumb('vocab', stage, breadcrumbDone, breadcrumbLabel)}
    ${inSession ? `<p class="section-subtitle">${t('vocabNewStepHint')}</p>` : ''}
    <div class="flashcard-wrap">
      <p class="flashcard-counter">${t('cardLabel')} ${flashcardIndex + 1} / ${indexMap.length}</p>
      <div class="flashcard ${known ? 'known' : ''}" id="flashcard">
        <p class="flashcard-fr">${word.fr}</p>
        <p class="flashcard-kana">${word.kana}</p>
        <p class="flashcard-example-fr">${word.exampleFr}</p>
        <hr class="flashcard-divider">
        <div class="flashcard-meaning translatable-ja" id="flashcard-meaning">
          <p class="flashcard-ja">${word.ja}</p>
          <p class="flashcard-example-ja">${word.exampleJa}</p>
        </div>
      </div>
      <div class="flashcard-controls">
        <button class="secondary-btn" id="listen-btn">${t('listenButton')}</button>
        <button class="secondary-btn" id="flip-btn">${translationVisible ? t('hideMeaning') : t('showMeaning')}</button>
      </div>
      <div class="flashcard-nav">
        <button class="mini-btn" id="prev-word" ${flashcardIndex === 0 ? 'disabled' : ''}>&larr;</button>
        <button class="know-btn ${known ? 'active' : ''}" id="know-btn">${t('iKnowIt')}</button>
        <button class="mini-btn" id="next-word" ${flashcardIndex === indexMap.length - 1 ? 'disabled' : ''}>&rarr;</button>
      </div>
      ${inSession ? '' : `<button class="primary-btn quiz-launch" id="quiz-btn">${t('quizButton')}</button>`}
    </div>
    ${inSession ? '' : stagePager(stageId, 'vocab')}
  `;

  bindTopNav();
  bindSessionBar();
  if (!inSession) bindStagePager(stageId, 'vocab');

  const rerender = () => renderVocab(stageId);

  document.getElementById('listen-btn').addEventListener('click', () => speakFrench(word.fr));
  document.getElementById('flip-btn').addEventListener('click', () => { setTranslationVisible(!translationVisible); rerender(); });
  document.getElementById('prev-word').addEventListener('click', () => {
    flashcardIndex = Math.max(0, flashcardIndex - 1);
    progress[stageId].vocabLastIndex = flashcardIndex;
    saveProgress(progress);
    rerender();
  });
  document.getElementById('next-word').addEventListener('click', () => {
    flashcardIndex = Math.min(indexMap.length - 1, flashcardIndex + 1);
    progress[stageId].vocabLastIndex = flashcardIndex;
    saveProgress(progress);
    rerender();
  });
  document.getElementById('know-btn').addEventListener('click', () => {
    const list = progress[stageId].vocabKnown;
    const pos = list.indexOf(realIndex);
    if (pos === -1) list.push(realIndex); else list.splice(pos, 1);
    saveProgress(progress);
    rerender();
  });
  const quizBtn = document.getElementById('quiz-btn');
  if (quizBtn) quizBtn.addEventListener('click', () => renderVocabQuiz(stageId, 0, 0));
}

function renderVocabQuiz(stageId, qIndex, scoreCount) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const lesson = VOCAB_LESSONS[stage.vocabId];
  const words = lesson.words;

  if (qIndex >= words.length) {
    progress[stageId].vocabQuizDone = true;
    saveProgress(progress);
    markStepDoneIfActive('vocab', stageId);
    app.innerHTML = `
      ${sessionActive() ? '' : topNav(stageId, 'vocab')}
      ${renderSessionBar()}
      ${activityBreadcrumb('vocab', stage, true)}
      <div class="quiz-result">
        <h2>${t('score')}: ${scoreCount} / ${words.length}</h2>
        <button class="primary-btn" id="restart-quiz">${t('restartQuiz')}</button>
        <button class="secondary-btn" id="back-to-vocab">${t('navVocabulary')}</button>
      </div>
      ${sessionActive() ? '' : stagePager(stageId, 'vocab')}`;
    bindTopNav();
    bindSessionBar();
    if (!sessionActive()) bindStagePager(stageId, 'vocab');
    document.getElementById('restart-quiz').addEventListener('click', () => renderVocabQuiz(stageId, 0, 0));
    document.getElementById('back-to-vocab').addEventListener('click', () => navigate(`/vocab/${stageId}`));
    return;
  }

  const correctWord = words[qIndex];
  const distractors = words.filter((_, i) => i !== qIndex).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.ja);
  const options = [correctWord.ja, ...distractors].sort(() => Math.random() - 0.5);

  app.innerHTML = `
    ${sessionActive() ? '' : topNav(stageId, 'vocab')}
    ${renderSessionBar()}
    ${activityBreadcrumb('vocab', stage, false, `${t('quizTitle')} · ${qIndex + 1} / ${words.length}`)}
    <div class="quiz-question">
      <p class="quiz-word-fr">${correctWord.fr}</p>
      <button class="secondary-btn" id="quiz-listen">${t('listenButton')}</button>
      <p class="quiz-prompt">${t('quizQuestionFr')}</p>
      <div class="quiz-options">
        ${options.map(opt => `<button class="quiz-option" data-value="${encodeURIComponent(opt)}">${opt}</button>`).join('')}
      </div>
      <p id="quiz-feedback" class="quiz-feedback"></p>
      <button class="primary-btn" id="quiz-next" style="display:none;">${t('nextQuestion')}</button>
    </div>`;

  bindTopNav();
  bindSessionBar();
  document.getElementById('quiz-listen').addEventListener('click', () => speakFrench(correctWord.fr));

  let answered = false;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const chosen = decodeURIComponent(btn.dataset.value);
      const isCorrect = chosen === correctWord.ja;
      document.querySelectorAll('.quiz-option').forEach(b => {
        const val = decodeURIComponent(b.dataset.value);
        if (val === correctWord.ja) b.classList.add('option-correct');
        else if (b === btn) b.classList.add('option-incorrect');
      });
      const feedback = document.getElementById('quiz-feedback');
      feedback.textContent = isCorrect ? t('correct') : `${t('incorrect')} — ${t('correctAnswerWas')} ${correctWord.ja}`;
      feedback.className = 'quiz-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
      document.getElementById('quiz-next').style.display = 'inline-block';
      document.getElementById('quiz-next').addEventListener('click', () => renderVocabQuiz(stageId, qIndex + 1, scoreCount + (isCorrect ? 1 : 0)));
    });
  });
}

// --------------------------------------------------------
// Vocabulaire — révision générale (toutes les étapes, mots déjà
// connus, priorité aux mots non révisés depuis le plus longtemps)
// --------------------------------------------------------
function collectKnownWords() {
  const pool = [];
  CURRICULUM.forEach(stage => {
    const lesson = VOCAB_LESSONS[stage.vocabId];
    const known = progress[stage.id].vocabKnown;
    known.forEach(idx => {
      const word = lesson.words[idx];
      if (word) pool.push({ stageId: stage.id, wordIndex: idx, word });
    });
  });
  return pool;
}

function renderVocabReview(qIndex, scoreCount, order) {
  qIndex = qIndex || 0;
  scoreCount = scoreCount || 0;
  const pool = collectKnownWords();

  if (pool.length < 4) {
    app.innerHTML = `
      ${topNav(null, 'dashboard')}
      <section class="section-header">
        <h2>${t('vocabReviewTitle')}</h2>
        <p class="section-subtitle">${t('vocabReviewNotEnough')}</p>
      </section>
      <button class="secondary-btn" id="back-review">${t('backToDashboard')}</button>`;
    bindTopNav();
    document.getElementById('back-review').addEventListener('click', () => navigate('/dashboard'));
    return;
  }

  if (!order) {
    order = pool
      .map((item, i) => ({ i, last: progress._srs[`${item.stageId}:${item.wordIndex}`] || 0 }))
      .sort((a, b) => a.last - b.last)
      .slice(0, Math.min(15, pool.length))
      .map(x => x.i);
    order = shuffleArray(order);
  }

  if (qIndex >= order.length) {
    app.innerHTML = `
      ${topNav(null, 'dashboard')}
      <div class="quiz-result">
        <h2>${t('score')}: ${scoreCount} / ${order.length}</h2>
        <button class="primary-btn" id="restart-review">${t('restartQuiz')}</button>
        <button class="secondary-btn" id="back-review">${t('backToDashboard')}</button>
      </div>`;
    bindTopNav();
    document.getElementById('restart-review').addEventListener('click', () => renderVocabReview(0, 0, null));
    document.getElementById('back-review').addEventListener('click', () => navigate('/dashboard'));
    return;
  }

  const item = pool[order[qIndex]];
  const correctWord = item.word;
  const distractorPool = pool.filter((_, i) => i !== order[qIndex]).map(p => p.word.ja);
  const distractors = shuffleArray(distractorPool).slice(0, 3);
  const options = shuffleArray([correctWord.ja, ...distractors]);

  app.innerHTML = `
    ${topNav(null, 'dashboard')}
    <section class="section-header">
      <h2>${t('vocabReviewTitle')}</h2>
      <p class="section-subtitle">${qIndex + 1} / ${order.length}</p>
    </section>
    <div class="quiz-question">
      <p class="quiz-word-fr">${correctWord.fr}</p>
      <button class="secondary-btn" id="review-listen">${t('listenButton')}</button>
      <p class="quiz-prompt">${t('quizQuestionFr')}</p>
      <div class="quiz-options">
        ${options.map(opt => `<button class="quiz-option" data-value="${encodeURIComponent(opt)}">${opt}</button>`).join('')}
      </div>
      <p id="review-feedback" class="quiz-feedback"></p>
      <button class="primary-btn" id="review-next" style="display:none;">${t('nextQuestion')}</button>
    </div>`;

  bindTopNav();
  document.getElementById('review-listen').addEventListener('click', () => speakFrench(correctWord.fr));

  let answered = false;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const chosen = decodeURIComponent(btn.dataset.value);
      const isCorrect = chosen === correctWord.ja;
      document.querySelectorAll('.quiz-option').forEach(b => {
        const val = decodeURIComponent(b.dataset.value);
        if (val === correctWord.ja) b.classList.add('option-correct');
        else if (b === btn) b.classList.add('option-incorrect');
      });
      progress._srs[`${item.stageId}:${item.wordIndex}`] = Date.now();
      saveProgress(progress);
      const feedback = document.getElementById('review-feedback');
      feedback.textContent = isCorrect ? t('correct') : `${t('incorrect')} — ${t('correctAnswerWas')} ${correctWord.ja}`;
      feedback.className = 'quiz-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
      document.getElementById('review-next').style.display = 'inline-block';
      document.getElementById('review-next').addEventListener('click', () => renderVocabReview(qIndex + 1, scoreCount + (isCorrect ? 1 : 0), order));
    });
  });
}

// --------------------------------------------------------
// Grammaire
// --------------------------------------------------------
function renderGrammar(stageId) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const g = GRAMMAR_POINTS[stage.grammarId];
  const viewed = progress[stageId].grammarViewed;

  const conjugationHtml = g.conjugation ? `
    <div class="grammar-block">
      <h4>${t('conjugationLabel')}</h4>
      <table class="conjugation-table">
        ${g.conjugation.map(c => `<tr><td>${c.pronoun}</td><td>${c.form}</td></tr>`).join('')}
      </table>
    </div>` : '';

  const itemsHtml = g.items ? `
    <div class="grammar-block">
      <table class="conjugation-table">
        ${g.items.map(i => `<tr><td>${i.label}</td><td>${loc(i.noteFr, i.noteJa)}</td></tr>`).join('')}
      </table>
    </div>` : '';

  app.innerHTML = `
    ${sessionActive() ? '' : topNav(stageId, 'grammar')}
    ${renderSessionBar()}
    ${activityBreadcrumb('grammar', stage, viewed)}
    <div class="grammar-card">
      <h3 class="content-title">${g.titleFr} <span class="content-title-ja translatable-ja">${g.titleJa}</span></h3>
      <p class="grammar-explanation">${loc(g.explanationFr, g.explanationJa)}</p>
      <div class="grammar-block">
        <h4>${t('patternLabel')}</h4>
        <p class="grammar-pattern">${loc(g.patternFr, g.patternJa)}</p>
      </div>
      ${conjugationHtml}
      ${itemsHtml}
      <div class="grammar-block">
        <h4>${t('examplesLabel')}</h4>
        <ul class="example-list">
          ${g.examples.map(ex => `
            <li>
              <div class="example-fr">
                <span>${ex.fr}</span>
                <button class="icon-btn" data-speak="${encodeURIComponent(ex.fr)}">${t('listenButton')}</button>
              </div>
              <div class="example-ja translatable-ja">${ex.ja}</div>
            </li>`).join('')}
        </ul>
      </div>
      <button class="primary-btn ${viewed ? 'active' : ''}" id="mark-viewed-btn">✓ ${t('markAsViewed')}</button>
      <div class="grammar-practice-links">
        ${stage.grammarId === 'g04' ? `<button class="secondary-btn" id="launch-gender-game">${t('genderGameLink')}</button>` : ''}
        ${g.conjugation ? `<button class="secondary-btn" id="launch-conjugation">${t('conjugationDrillLink')}</button>` : ''}
        <button class="secondary-btn" id="launch-sentence-builder">${t('sentenceBuilderLink')}</button>
      </div>
    </div>
    ${sessionActive() ? '' : stagePager(stageId, 'grammar')}
  `;

  bindTopNav();
  bindSessionBar();
  if (!sessionActive()) bindStagePager(stageId, 'grammar');
  document.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', () => speakFrench(decodeURIComponent(btn.dataset.speak)));
  });
  document.getElementById('mark-viewed-btn').addEventListener('click', () => {
    progress[stageId].grammarViewed = true;
    saveProgress(progress);
    markStepDoneIfActive('grammar', stageId);
    renderGrammar(stageId);
  });
  const genderBtn = document.getElementById('launch-gender-game');
  if (genderBtn) genderBtn.addEventListener('click', () => navigate('/gendergame'));
  const conjBtn = document.getElementById('launch-conjugation');
  if (conjBtn) conjBtn.addEventListener('click', () => navigate(`/conjugation/${stage.grammarId}`));
  document.getElementById('launch-sentence-builder').addEventListener('click', () => navigate(`/sentencebuilder/${stage.grammarId}`));
}

// --------------------------------------------------------
// Grammaire — jeu du genre (le ou la ?), rattaché à g04
// --------------------------------------------------------
function renderGenderGame(qIndex, scoreCount, order) {
  qIndex = qIndex || 0;
  scoreCount = scoreCount || 0;
  if (!order) order = shuffleArray(GENDER_ITEMS.map((_, i) => i));

  if (qIndex >= order.length) {
    app.innerHTML = `
      ${topNav('s04', 'grammar')}
      <div class="quiz-result">
        <h2>${t('score')}: ${scoreCount} / ${order.length}</h2>
        <button class="primary-btn" id="restart-gender">${t('restartQuiz')}</button>
        <button class="secondary-btn" id="back-gender">${t('navGrammar')}</button>
      </div>`;
    bindTopNav();
    document.getElementById('restart-gender').addEventListener('click', () => renderGenderGame(0, 0, null));
    document.getElementById('back-gender').addEventListener('click', () => navigate('/grammar/s04'));
    return;
  }

  const item = GENDER_ITEMS[order[qIndex]];

  app.innerHTML = `
    ${topNav('s04', 'grammar')}
    <section class="section-header">
      <h2>${t('genderGameTitle')}</h2>
      <p class="section-subtitle">${qIndex + 1} / ${order.length} — ${t('genderGameInstructions')}</p>
    </section>
    <div class="quiz-question">
      <p class="quiz-word-fr">${item.fr}</p>
      <p class="flashcard-kana">${item.kana}</p>
      <p class="flashcard-example-ja translatable-ja">${item.ja}</p>
      <button class="secondary-btn" id="gender-listen">${t('listenButton')}</button>
      <div class="quiz-options gender-options">
        <button class="quiz-option gender-option" data-choice="le">le</button>
        <button class="quiz-option gender-option" data-choice="la">la</button>
      </div>
      <p id="gender-feedback" class="quiz-feedback"></p>
      <button class="primary-btn" id="gender-next" style="display:none;">${t('nextQuestion')}</button>
    </div>`;

  bindTopNav();
  document.getElementById('gender-listen').addEventListener('click', () => speakFrench(`${item.article} ${item.fr}`));

  let answered = false;
  document.querySelectorAll('.gender-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const isCorrect = btn.dataset.choice === item.article;
      document.querySelectorAll('.gender-option').forEach(b => {
        if (b.dataset.choice === item.article) b.classList.add('option-correct');
        else if (b === btn) b.classList.add('option-incorrect');
      });
      const feedback = document.getElementById('gender-feedback');
      feedback.textContent = isCorrect ? t('correct') : `${t('incorrect')} — ${t('correctAnswerWas')} ${item.article} ${item.fr}`;
      feedback.className = 'quiz-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
      document.getElementById('gender-next').style.display = 'inline-block';
      document.getElementById('gender-next').addEventListener('click', () => renderGenderGame(qIndex + 1, scoreCount + (isCorrect ? 1 : 0), order));
    });
  });
}

// --------------------------------------------------------
// Grammaire — exercice de conjugaison (points avec table de
// conjugaison : être, avoir, s'appeler, -er, futur proche, etc.)
// --------------------------------------------------------
function renderConjugationDrill(grammarId, qIndex, scoreCount, order) {
  const g = GRAMMAR_POINTS[grammarId];
  const stage = CURRICULUM.find(s => s.grammarId === grammarId);
  qIndex = qIndex || 0;
  scoreCount = scoreCount || 0;
  if (!order) order = shuffleArray(g.conjugation.map((_, i) => i));

  if (qIndex >= order.length) {
    markStepDoneIfActive('grammar', stage.id);
    app.innerHTML = `
      ${sessionActive() ? '' : topNav(stage.id, 'grammar')}
      ${renderSessionBar()}
      <div class="quiz-result">
        <h2>${t('score')}: ${scoreCount} / ${order.length}</h2>
        <button class="primary-btn" id="restart-conj">${t('restartQuiz')}</button>
        <button class="secondary-btn" id="back-conj">${t('navGrammar')}</button>
      </div>`;
    bindTopNav();
    bindSessionBar();
    document.getElementById('restart-conj').addEventListener('click', () => renderConjugationDrill(grammarId, 0, 0, null));
    document.getElementById('back-conj').addEventListener('click', () => navigate(`/grammar/${stage.id}`));
    return;
  }

  const correct = g.conjugation[order[qIndex]];
  const distractorPool = [...new Set(g.conjugation.filter((_, i) => i !== order[qIndex]).map(c => c.form))].filter(f => f !== correct.form);
  const distractors = shuffleArray(distractorPool).slice(0, 3);
  const options = shuffleArray([correct.form, ...distractors]);

  app.innerHTML = `
    ${sessionActive() ? '' : topNav(stage.id, 'grammar')}
    ${renderSessionBar()}
    <section class="section-header">
      <h2>${t('conjugationDrillTitle')} — ${g.titleFr}</h2>
      <p class="section-subtitle">${qIndex + 1} / ${order.length} — ${t('conjugationDrillInstructions')}</p>
    </section>
    <div class="quiz-question">
      <p class="quiz-word-fr">${correct.pronoun} ...</p>
      <div class="quiz-options">
        ${options.map(opt => `<button class="quiz-option" data-value="${encodeURIComponent(opt)}">${opt}</button>`).join('')}
      </div>
      <p id="conj-feedback" class="quiz-feedback"></p>
      <button class="primary-btn" id="conj-next" style="display:none;">${t('nextQuestion')}</button>
    </div>`;

  bindTopNav();
  bindSessionBar();

  let answered = false;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const chosen = decodeURIComponent(btn.dataset.value);
      const isCorrect = chosen === correct.form;
      document.querySelectorAll('.quiz-option').forEach(b => {
        const val = decodeURIComponent(b.dataset.value);
        if (val === correct.form) b.classList.add('option-correct');
        else if (b === btn) b.classList.add('option-incorrect');
      });
      const feedback = document.getElementById('conj-feedback');
      feedback.textContent = isCorrect ? t('correct') : `${t('incorrect')} — ${t('correctAnswerWas')} ${correct.pronoun} ${correct.form}`;
      feedback.className = 'quiz-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
      document.getElementById('conj-next').style.display = 'inline-block';
      document.getElementById('conj-next').addEventListener('click', () => renderConjugationDrill(grammarId, qIndex + 1, scoreCount + (isCorrect ? 1 : 0), order));
    });
  });
}

// --------------------------------------------------------
// Grammaire — reconstituer une phrase (mots dans le bon ordre),
// à partir des exemples propres à chaque point de grammaire
// --------------------------------------------------------
let sentenceBuilderPicked = [];

function renderSentenceBuilder(grammarId, exIndex) {
  const g = GRAMMAR_POINTS[grammarId];
  const stage = CURRICULUM.find(s => s.grammarId === grammarId);
  exIndex = exIndex || 0;

  if (exIndex >= g.examples.length) {
    markStepDoneIfActive('grammar', stage.id);
    app.innerHTML = `
      ${sessionActive() ? '' : topNav(stage.id, 'grammar')}
      ${renderSessionBar()}
      <div class="quiz-result">
        <h2>${t('sentenceBuilderTitle')}</h2>
        <p>${t('taskCompleteMsg')}</p>
        <button class="secondary-btn" id="back-sb">${t('navGrammar')}</button>
      </div>`;
    bindTopNav();
    bindSessionBar();
    document.getElementById('back-sb').addEventListener('click', () => navigate(`/grammar/${stage.id}`));
    return;
  }

  const sentence = g.examples[exIndex].fr;
  const cleanSentence = sentence.replace(/[.?!]+$/, '');
  const punctuation = sentence.slice(cleanSentence.length);
  const words = cleanSentence.split(' ');
  sentenceBuilderPicked = [];
  const shuffledWords = shuffleArray(words.map((w, i) => ({ w, i })));

  app.innerHTML = `
    ${sessionActive() ? '' : topNav(stage.id, 'grammar')}
    ${renderSessionBar()}
    <section class="section-header">
      <h2>${t('sentenceBuilderTitle')} — ${g.titleFr}</h2>
      <p class="section-subtitle">${exIndex + 1} / ${g.examples.length} — ${t('sentenceBuilderInstructions')}</p>
    </section>
    <div class="sentence-builder">
      <div class="sentence-slot" id="sentence-slot"></div>
      <div class="sentence-bank" id="sentence-bank">
        ${shuffledWords.map(item => `<button class="word-tile" data-word="${encodeURIComponent(item.w)}" data-origin="${item.i}">${item.w}</button>`).join('')}
      </div>
      <p id="sb-feedback" class="quiz-feedback"></p>
      <div class="sb-controls">
        <button class="secondary-btn" id="sb-reset">${t('sentenceBuilderReset')}</button>
        <button class="primary-btn" id="sb-check">${t('sentenceBuilderCheck')}</button>
        <button class="primary-btn" id="sb-next" style="display:none;">${t('nextQuestion')}</button>
      </div>
    </div>`;

  bindTopNav();
  bindSessionBar();

  function renderSlot() {
    document.getElementById('sentence-slot').innerHTML = sentenceBuilderPicked.map(w => `<span class="sentence-slot-word">${w}</span>`).join(' ');
  }

  document.querySelectorAll('.word-tile').forEach(btn => {
    btn.addEventListener('click', () => {
      sentenceBuilderPicked.push(decodeURIComponent(btn.dataset.word));
      btn.disabled = true;
      btn.classList.add('word-tile-used');
      renderSlot();
    });
  });

  document.getElementById('sb-reset').addEventListener('click', () => renderSentenceBuilder(grammarId, exIndex));

  document.getElementById('sb-check').addEventListener('click', () => {
    const attempt = sentenceBuilderPicked.join(' ') + punctuation;
    const feedback = document.getElementById('sb-feedback');
    const isCorrect = attempt === sentence;
    feedback.textContent = isCorrect ? `${t('perfect')} ${sentence}` : `${t('almostCorrect')} ${sentence}`;
    feedback.className = 'quiz-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
    document.getElementById('sb-next').style.display = 'inline-block';
  });

  document.getElementById('sb-next').addEventListener('click', () => renderSentenceBuilder(grammarId, exIndex + 1));
}

// --------------------------------------------------------
// Lecture
// --------------------------------------------------------

let readingAnswers = {};
let readingMode = 'read'; // 'read' (texte visible) ou 'listen' (écoute d'abord, texte caché)
let readingTextRevealed = false;
let lastReadingStageId = 's00';

function readingModeTabsHtml() {
  return `
    <div class="mode-tabs">
      <button class="mode-tab ${readingMode === 'read' ? 'active' : ''}" data-rmode="read">${t('readingModeTab')}</button>
      <button class="mode-tab ${readingMode === 'listen' ? 'active' : ''}" data-rmode="listen">${t('listeningModeTab')}</button>
    </div>`;
}

function bindReadingModeTabs(stageId) {
  document.querySelectorAll('.mode-tab[data-rmode]').forEach(btn => {
    btn.addEventListener('click', () => {
      readingMode = btn.dataset.rmode;
      readingTextRevealed = false;
      renderReading(stageId);
    });
  });
}

function renderReading(stageId) {
  lastReadingStageId = stageId;
  const stage = CURRICULUM.find(s => s.id === stageId);
  const passage = READING_PASSAGES[stage.readingId];
  readingAnswers = {};
  const priorScore = progress[stageId].readingScore;
  const textHidden = readingMode === 'listen' && !readingTextRevealed;

  app.innerHTML = `
    ${sessionActive() ? '' : topNav(stageId, 'reading')}
    ${renderSessionBar()}
    ${activityBreadcrumb('reading', stage, !!priorScore, priorScore ? `${t('score')}: ${priorScore.correct} / ${priorScore.total}` : null)}
    ${readingModeTabsHtml()}
    <div class="reading-card">
      <h3 class="content-title">${passage.titleFr} <span class="content-title-ja translatable-ja">${passage.titleJa}</span></h3>
      ${readingMode === 'listen' ? `<p class="section-subtitle">${t('listeningInstructions')}</p>` : ''}
      <div class="reading-text-controls">
        <button class="secondary-btn" id="listen-passage">${t('listenButton')}</button>
        ${textHidden ? `<button class="secondary-btn" id="reveal-text">${t('revealTextButton')}</button>` : ''}
      </div>
      ${textHidden ? '' : `<p class="reading-text-fr">${passage.textFr}</p>`}
      ${(readingMode === 'read' && !textHidden) ? `<p class="reading-text-ja translatable-ja">${passage.textJa}</p>` : ''}

      <h3>${t('comprehensionQuestions')}</h3>
      <div id="reading-questions">
        ${passage.questions.map((q, i) => `
          <div class="reading-question">
            <p class="question-text">${i + 1}. ${loc(q.questionFr, q.questionJa)}</p>
            <div class="quiz-options">
              ${q.options.map(opt => `<button class="quiz-option" data-qindex="${i}" data-value="${encodeURIComponent(opt)}">${opt}</button>`).join('')}
            </div>
          </div>`).join('')}
      </div>
      <button class="primary-btn" id="submit-reading">${t('submitAnswers')}</button>
      <p id="reading-result" class="quiz-feedback"></p>
    </div>
    ${sessionActive() ? '' : stagePager(stageId, 'reading')}
  `;

  bindTopNav();
  bindSessionBar();
  bindReadingModeTabs(stageId);
  if (!sessionActive()) bindStagePager(stageId, 'reading');
  document.getElementById('listen-passage').addEventListener('click', () => speakFrench(passage.textFr));
  const revealBtn = document.getElementById('reveal-text');
  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      readingTextRevealed = true;
      renderReading(stageId);
    });
  }

  document.querySelectorAll('.reading-question .quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const qi = btn.dataset.qindex;
      readingAnswers[qi] = decodeURIComponent(btn.dataset.value);
      const group = btn.closest('.reading-question').querySelectorAll('.quiz-option');
      group.forEach(b => b.classList.remove('option-selected'));
      btn.classList.add('option-selected');
    });
  });

  document.getElementById('submit-reading').addEventListener('click', () => {
    let correctCount = 0;
    passage.questions.forEach((q, i) => {
      const group = document.querySelectorAll(`.reading-question:nth-child(${i + 1}) .quiz-option`);
      const isCorrect = readingAnswers[i] === q.correctAnswer;
      if (isCorrect) correctCount++;
      group.forEach(b => {
        const val = decodeURIComponent(b.dataset.value);
        if (val === q.correctAnswer) b.classList.add('option-correct');
        else if (val === readingAnswers[i]) b.classList.add('option-incorrect');
      });
    });
    progress[stageId].readingScore = { correct: correctCount, total: passage.questions.length };
    saveProgress(progress);
    markStepDoneIfActive('reading', stageId);
    const result = document.getElementById('reading-result');
    result.textContent = `${t('score')}: ${correctCount} / ${passage.questions.length}`;
    result.className = 'quiz-feedback ' + (correctCount === passage.questions.length ? 'feedback-correct' : 'feedback-incorrect');

    // En mode Écoute, on révèle le texte après la correction pour permettre la relecture.
    if (readingMode === 'listen' && !readingTextRevealed) {
      readingTextRevealed = true;
      const controls = document.querySelector('.reading-text-controls');
      const revealBtnEl = document.getElementById('reveal-text');
      if (revealBtnEl) revealBtnEl.remove();
      controls.insertAdjacentHTML('afterend', `<p class="reading-text-fr">${passage.textFr}</p>`);
    }
    refreshSessionBar();
  });
}

// --------------------------------------------------------
// Dictée
// --------------------------------------------------------
function normalizeForCompare(str) {
  return str.toLowerCase().replace(/[.,!?;:"']/g, '').replace(/\s+/g, ' ').trim();
}

function wordDiff(expected, typed) {
  const expWords = expected.split(' ');
  const typedWords = normalizeForCompare(typed).split(' ');
  const expNorm = normalizeForCompare(expected).split(' ');
  return expWords.map((word, i) => {
    const ok = typedWords[i] === expNorm[i];
    return `<span class="${ok ? 'diff-correct' : 'diff-incorrect'}">${word}</span>`;
  }).join(' ');
}

let lastDictationStageId = 's00';

function modeTabsHtml(activeMode, stageIdForDicteeTab) {
  return `
    <div class="mode-tabs">
      <button class="mode-tab ${activeMode === 'dictee' ? 'active' : ''}" data-mode="dictee">${t('dicteeModeTab')}</button>
      <button class="mode-tab ${activeMode === 'discrimination' ? 'active' : ''}" data-mode="discrimination">${t('discriminationModeTab')}</button>
    </div>`;
}

function bindModeTabs(stageIdForDicteeTab) {
  document.querySelectorAll('.mode-tab[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.mode === 'dictee') {
        navigate(`/dictation/${stageIdForDicteeTab}`);
      } else {
        navigate('/discrimination');
      }
    });
  });
}

function renderDictation(stageId) {
  lastDictationStageId = stageId;
  const stage = CURRICULUM.find(s => s.id === stageId);
  const items = stage.dictationIds.map(id => ({ id, ...DICTATION_ITEMS[id], done: !!progress[stageId].dictation[id] }));
  const doneCount = items.filter(i => i.done).length;
  const allDone = doneCount === items.length;

  app.innerHTML = `
    ${sessionActive() ? '' : topNav(stageId, 'dictation')}
    ${renderSessionBar()}
    ${activityBreadcrumb('dictation', stage, allDone, allDone ? null : `${doneCount} / ${items.length}`)}
    ${modeTabsHtml('dictee', stageId)}
    <p class="section-subtitle">${t('dictationInstructions')}</p>
    <div class="dictation-list">
      ${items.map(item => `
        <div class="dictation-card ${item.done ? 'dictation-done' : ''}" data-id="${item.id}">
          <p class="hint-label">${item.done ? `<span class="done-check">✓ ${t('statusDone')}</span> — ` : ''}${t('hintLabel')}: ${loc(item.hintFr, item.hintJa)}</p>
          <button class="secondary-btn" data-listen="${item.id}">${t('listenButton')}</button>
          <input type="text" class="dictation-input" data-input="${item.id}" autocomplete="off" spellcheck="false" placeholder="${t('yourAnswer')}" />
          <button class="primary-btn" data-check="${item.id}">${t('checkDictation')}</button>
          <p class="dictation-feedback" id="feedback-${item.id}">${item.done ? `<span class="feedback-correct">${t('perfect')}</span>` : ''}</p>
        </div>`).join('')}
    </div>
    ${sessionActive() ? '' : stagePager(stageId, 'dictation')}
  `;

  bindTopNav();
  bindSessionBar();
  bindModeTabs(stageId);
  if (!sessionActive()) bindStagePager(stageId, 'dictation');

  items.forEach(item => {
    document.querySelector(`[data-listen="${item.id}"]`).addEventListener('click', () => speakFrench(item.textFr));
    document.querySelector(`[data-check="${item.id}"]`).addEventListener('click', () => {
      const input = document.querySelector(`[data-input="${item.id}"]`);
      const typed = input.value;
      const isCorrect = normalizeForCompare(typed) === normalizeForCompare(item.textFr);
      const feedback = document.getElementById(`feedback-${item.id}`);
      const card = document.querySelector(`[data-id="${item.id}"]`);
      if (isCorrect) {
        feedback.innerHTML = `<span class="feedback-correct">${t('perfect')}</span>`;
        progress[stageId].dictation[item.id] = true;
        saveProgress(progress);
        card.classList.add('dictation-done');
        const hint = card.querySelector('.hint-label');
        if (!hint.querySelector('.done-check')) {
          hint.innerHTML = `<span class="done-check">✓ ${t('statusDone')}</span> — ${t('hintLabel')}: ${loc(item.hintFr, item.hintJa)}`;
        }
        if (stage.dictationIds.every(id => progress[stageId].dictation[id])) markStepDoneIfActive('dictation', stageId);
        refreshSessionBar();
      } else {
        feedback.innerHTML = `<span class="feedback-incorrect">${t('almostCorrect')}</span><br>${wordDiff(item.textFr, typed)}`;
      }
    });
  });
}

// --------------------------------------------------------
// Phrases utiles — phrasebook libre, non gradué
// --------------------------------------------------------
function renderPhrasebook() {
  app.innerHTML = `
    ${topNav(null, 'phrases')}
    <section class="section-header">
      <h2>${t('phrasesTitle')}</h2>
      <p class="section-subtitle">${t('phrasesIntro')}</p>
    </section>
    <div class="phrasebook-list">
      ${PHRASEBOOK.map(cat => `
        <div class="phrase-category">
          <h3 class="phrase-category-title">${cat.category} <span class="content-title-ja translatable-ja">${cat.categoryJa}</span></h3>
          <div class="phrase-rows">
            ${cat.phrases.map(p => `
              <div class="phrase-row">
                <button class="secondary-btn phrase-listen" data-speak="${encodeURIComponent(p.fr)}">${t('listenButton')}</button>
                <div class="phrase-text">
                  <p class="phrase-fr">${p.fr}</p>
                  <p class="phrase-kana">${p.kana}</p>
                  <p class="phrase-ja translatable-ja">${p.ja}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;

  bindTopNav();
  document.querySelectorAll('.phrase-listen[data-speak]').forEach(btn => {
    btn.addEventListener('click', () => speakFrench(decodeURIComponent(btn.dataset.speak)));
  });
}

// --------------------------------------------------------
// Phrase du jour — variante à une seule phrase, utilisée dans le
// programme guidé (chaque étape du programme apporte sa propre
// phrase utile, 1 pour 1 sur les 30 étapes).
// --------------------------------------------------------
function renderDailyPhrase(phraseIndex) {
  if (!sessionState) { navigate('/dashboard'); return; }
  const phrase = PHRASEBOOK_FLAT[phraseIndex];
  const day = sessionState.day;
  const done = isStepDone(day, sessionState.taskIndex);

  app.innerHTML = `
    ${renderSessionBar()}
    <section class="section-header">
      <h2>${t('dailyPhraseTitle')}</h2>
      <p class="section-subtitle">${phrase.category} <span class="content-title-ja translatable-ja">${phrase.categoryJa}</span></p>
    </section>
    <div class="flashcard-wrap">
      <div class="flashcard">
        <p class="flashcard-fr">${phrase.fr}</p>
        <p class="flashcard-kana">${phrase.kana}</p>
        <hr class="flashcard-divider">
        <p class="flashcard-ja translatable-ja">${phrase.ja}</p>
      </div>
      <div class="flashcard-controls">
        <button class="secondary-btn" id="daily-phrase-listen">${t('listenButton')}</button>
      </div>
      <button class="know-btn ${done ? 'active' : ''}" id="daily-phrase-done">✓ ${done ? t('statusDone') : t('markPhraseLearned')}</button>
    </div>`;

  bindTopNav();
  bindSessionBar();
  document.getElementById('daily-phrase-listen').addEventListener('click', () => speakFrench(phrase.fr));
  document.getElementById('daily-phrase-done').addEventListener('click', () => {
    markStepDoneIfActive('phrase', phraseIndex);
    renderDailyPhrase(phraseIndex);
  });
}

// --------------------------------------------------------
// Parler — écouter puis s'enregistrer pour comparer (aucune
// notation automatique, simple outil d'auto-évaluation)
// --------------------------------------------------------
let speakingIndex = 0;
let mediaRecorder = null;
let recordedChunks = [];
let recordedAudioUrl = null;

function speakingPromptPool() {
  return PHRASEBOOK_FLAT;
}

// Logique d'enregistrement partagée entre la page Parler libre et la
// tâche Parler du jour dans le programme guidé (mêmes ids de boutons).
function setupRecordingControls() {
  const recordBtn = document.getElementById('speaking-record');
  const stopBtn = document.getElementById('speaking-stop');
  const playBtn = document.getElementById('speaking-play');

  recordBtn.addEventListener('click', async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(t('micNotSupported'));
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) recordedChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'audio/webm' });
        recordedAudioUrl = URL.createObjectURL(blob);
        playBtn.style.display = 'inline-block';
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      recordBtn.style.display = 'none';
      stopBtn.style.display = 'inline-block';
    } catch (err) {
      alert(t('micNotSupported'));
    }
  });

  stopBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    stopBtn.style.display = 'none';
    recordBtn.style.display = 'inline-block';
  });

  playBtn.addEventListener('click', () => {
    if (!recordedAudioUrl) return;
    const audio = new Audio(recordedAudioUrl);
    audio.play();
  });
}

function renderSpeaking() {
  const pool = speakingPromptPool();
  speakingIndex = Math.min(speakingIndex, pool.length - 1);
  const prompt = pool[speakingIndex];
  recordedAudioUrl = null;

  app.innerHTML = `
    ${topNav(null, 'speaking')}
    <section class="section-header">
      <h2>${t('speakingTitle')}</h2>
      <p class="section-subtitle">${t('speakingIntro')}</p>
    </section>
    <div class="flashcard-wrap">
      <p class="flashcard-counter">${speakingIndex + 1} / ${pool.length}</p>
      <div class="flashcard">
        <p class="flashcard-fr">${prompt.fr}</p>
        <p class="flashcard-kana">${prompt.kana}</p>
        <hr class="flashcard-divider">
        <p class="flashcard-ja translatable-ja">${prompt.ja}</p>
      </div>
      <div class="flashcard-controls">
        <button class="secondary-btn" id="speaking-listen">${t('listenButton')}</button>
      </div>
      <div class="speaking-record-controls">
        <button class="primary-btn" id="speaking-record">${t('recordButton')}</button>
        <button class="secondary-btn" id="speaking-stop" style="display:none;">${t('stopRecordButton')}</button>
        <button class="secondary-btn" id="speaking-play" style="display:none;">${t('playRecordingButton')}</button>
      </div>
      <div class="flashcard-nav">
        <button class="mini-btn" id="speaking-prev" ${speakingIndex === 0 ? 'disabled' : ''}>&larr;</button>
        <button class="mini-btn" id="speaking-next" ${speakingIndex === pool.length - 1 ? 'disabled' : ''}>&rarr;</button>
      </div>
    </div>`;

  bindTopNav();
  document.getElementById('speaking-listen').addEventListener('click', () => speakFrench(prompt.fr));
  document.getElementById('speaking-prev').addEventListener('click', () => { speakingIndex = Math.max(0, speakingIndex - 1); renderSpeaking(); });
  document.getElementById('speaking-next').addEventListener('click', () => { speakingIndex = Math.min(pool.length - 1, speakingIndex + 1); renderSpeaking(); });
  setupRecordingControls();
}

// --------------------------------------------------------
// Parler du jour — variante à une seule phrase fixe, utilisée
// dans le programme guidé (à partir de la semaine 2).
// --------------------------------------------------------
function renderDailySpeakingTask(phraseIndex) {
  if (!sessionState) { navigate('/dashboard'); return; }
  const prompt = PHRASEBOOK_FLAT[phraseIndex];
  recordedAudioUrl = null;
  const day = sessionState.day;
  const done = isStepDone(day, sessionState.taskIndex);

  app.innerHTML = `
    ${renderSessionBar()}
    <section class="section-header">
      <h2>${t('speakingTitle')}</h2>
      <p class="section-subtitle">${t('speakingIntro')}</p>
    </section>
    <div class="flashcard-wrap">
      <div class="flashcard">
        <p class="flashcard-fr">${prompt.fr}</p>
        <p class="flashcard-kana">${prompt.kana}</p>
        <hr class="flashcard-divider">
        <p class="flashcard-ja translatable-ja">${prompt.ja}</p>
      </div>
      <div class="flashcard-controls">
        <button class="secondary-btn" id="speaking-listen">${t('listenButton')}</button>
      </div>
      <div class="speaking-record-controls">
        <button class="primary-btn" id="speaking-record">${t('recordButton')}</button>
        <button class="secondary-btn" id="speaking-stop" style="display:none;">${t('stopRecordButton')}</button>
        <button class="secondary-btn" id="speaking-play" style="display:none;">${t('playRecordingButton')}</button>
      </div>
      <button class="know-btn ${done ? 'active' : ''}" id="daily-speaking-done">✓ ${done ? t('statusDone') : t('markSpeakingPracticed')}</button>
    </div>`;

  bindTopNav();
  bindSessionBar();
  document.getElementById('speaking-listen').addEventListener('click', () => speakFrench(prompt.fr));
  setupRecordingControls();
  document.getElementById('daily-speaking-done').addEventListener('click', () => {
    markStepDoneIfActive('speaking', phraseIndex);
    renderDailySpeakingTask(phraseIndex);
  });
}

// --------------------------------------------------------
// Dictée — mode Discrimination (paires minimales)
// --------------------------------------------------------
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderDiscrimination(qIndex, scoreCount, roundOrder) {
  qIndex = qIndex || 0;
  scoreCount = scoreCount || 0;
  if (!roundOrder) roundOrder = shuffleArray(MINIMAL_PAIRS.map((_, i) => i));
  const stageForNav = lastDictationStageId;

  if (qIndex >= roundOrder.length) {
    app.innerHTML = `
      ${topNav(stageForNav, 'dictation')}
      ${modeTabsHtml('discrimination', stageForNav)}
      <div class="quiz-result">
        <h2>${t('score')}: ${scoreCount} / ${roundOrder.length}</h2>
        <button class="primary-btn" id="restart-discrimination">${t('restartQuiz')}</button>
      </div>`;
    bindTopNav();
    bindModeTabs(stageForNav);
    document.getElementById('restart-discrimination').addEventListener('click', () => renderDiscrimination(0, 0, shuffleArray(MINIMAL_PAIRS.map((_, i) => i))));
    return;
  }

  const pair = MINIMAL_PAIRS[roundOrder[qIndex]];
  const playWordIsA = Math.random() < 0.5;
  const spokenWord = playWordIsA ? pair.wordA : pair.wordB;

  app.innerHTML = `
    ${topNav(stageForNav, 'dictation')}
    ${modeTabsHtml('discrimination', stageForNav)}
    <section class="section-header">
      <h2>${t('discriminationModeTab')}</h2>
      <p class="section-subtitle">${t('discriminationInstructions')}</p>
    </section>
    <div class="quiz-question">
      <p class="quiz-prompt">${qIndex + 1} / ${roundOrder.length} — ${loc(pair.contrastFr, pair.contrastJa)}</p>
      <button class="primary-btn" id="play-pair-btn">${t('listenButton')}</button>
      <div class="quiz-options discrimination-options">
        <button class="quiz-option discrimination-option" data-choice="A">
          <span class="discrimination-word">${pair.wordA.fr}</span>
          <span class="discrimination-kana">${pair.wordA.kana}</span>
          <span class="discrimination-meaning translatable-ja">${pair.wordA.ja}</span>
        </button>
        <button class="quiz-option discrimination-option" data-choice="B">
          <span class="discrimination-word">${pair.wordB.fr}</span>
          <span class="discrimination-kana">${pair.wordB.kana}</span>
          <span class="discrimination-meaning translatable-ja">${pair.wordB.ja}</span>
        </button>
      </div>
      <p id="discrimination-feedback" class="quiz-feedback"></p>
      <button class="primary-btn" id="discrimination-next" style="display:none;">${t('nextQuestion')}</button>
    </div>`;

  bindTopNav();
  bindModeTabs(stageForNav);

  document.getElementById('play-pair-btn').addEventListener('click', () => speakFrench(spokenWord.fr));

  let answered = false;
  document.querySelectorAll('.discrimination-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const chosenIsA = btn.dataset.choice === 'A';
      const isCorrect = chosenIsA === playWordIsA;
      document.querySelectorAll('.discrimination-option').forEach(b => {
        const bIsA = b.dataset.choice === 'A';
        if (bIsA === playWordIsA) b.classList.add('option-correct');
        else if (b === btn) b.classList.add('option-incorrect');
      });
      const feedback = document.getElementById('discrimination-feedback');
      feedback.textContent = isCorrect ? t('correct') : `${t('incorrect')} — ${t('correctAnswerWas')} ${spokenWord.fr}`;
      feedback.className = 'quiz-feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
      document.getElementById('discrimination-next').style.display = 'inline-block';
      document.getElementById('discrimination-next').addEventListener('click', () => renderDiscrimination(qIndex + 1, scoreCount + (isCorrect ? 1 : 0), roundOrder));
    });
  });
}

// --------------------------------------------------------
// Démarrage
// --------------------------------------------------------
const FEEDBACK_BANNER_KEY = 'lff-feedback-banner-dismissed';

function initFeedbackBanner() {
  const banner = document.getElementById('feedback-banner');
  if (!banner) return;
  if (localStorage.getItem(FEEDBACK_BANNER_KEY) === 'true') {
    banner.style.display = 'none';
    return;
  }
  const closeBtn = document.getElementById('feedback-banner-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      localStorage.setItem(FEEDBACK_BANNER_KEY, 'true');
    });
  }
}

function init() {
  initUiLanguage();
  initFeedbackBanner();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setUiLanguage(btn.dataset.lang);
      render();
    });
  });
  const translationToggleBtn = document.getElementById('translation-toggle-btn');
  if (translationToggleBtn) {
    translationToggleBtn.addEventListener('click', () => {
      setTranslationVisible(!translationVisible);
      render();
    });
  }

  const sessionAlias = getSessionAlias();
  if (sessionAlias) {
    const user = getUserByAlias(sessionAlias);
    if (user) {
      currentUser = { firstname: user.firstname, email: user.email, alias: user.alias };
      progress = loadProgress();
    } else {
      clearSession(); // session périmée (utilisateur supprimé)
    }
  }

  renderUserBar();
  if (currentUser && !window.location.hash) navigate('/dashboard');
  render();
}

init();
