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
  });
  return data;
}

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
// --------------------------------------------------------
function isSectionSatisfied(status, targetStageId) {
  if (status === 'locked') return true; // rien à faire, ne bloque pas le jour
  const p = progress[targetStageId];
  return p; // présence suffit pour les vérifications spécifiques ci-dessous
}

function isDayComplete(entry) {
  // Vocabulaire
  if (entry.vocab.mode === 'new') {
    const known = progress[entry.stageId].vocabKnown;
    if (!entry.vocab.wordIndexes.every(idx => known.includes(idx))) return false;
  } else if (entry.vocab.mode === 'quiz') {
    if (!progress[entry.stageId].vocabQuizDone) return false;
  }
  // Grammaire
  if (entry.grammar.status !== 'locked' && !progress[entry.grammar.stageId].grammarViewed) return false;
  // Lecture
  if (entry.reading.status !== 'locked' && !progress[entry.reading.stageId].readingScore) return false;
  // Dictée
  if (entry.dictation.status !== 'locked') {
    const targetStage = CURRICULUM.find(s => s.id === entry.dictation.stageId);
    const allDone = targetStage.dictationIds.every(id => progress[entry.dictation.stageId].dictation[id]);
    if (!allDone) return false;
  }
  return true;
}

function getCurrentDayIndex() {
  for (let i = 0; i < DAILY_PLAN.length; i++) {
    if (!isDayComplete(DAILY_PLAN[i])) return i;
  }
  return DAILY_PLAN.length - 1;
}

function sectionStatusLabel(status, done) {
  if (status === 'locked') return t('statusLocked');
  if (done) return t('statusDone');
  return status === 'new' ? t('statusNew') : t('statusReview');
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
          <span class="brand-icon">🇫🇷</span>
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
    case 'vocab': return renderVocab(route.stageId, route.extra !== undefined ? Number(route.extra) : undefined);
    case 'vocabquiz': return renderVocabQuiz(route.stageId, 0, 0);
    case 'grammar': return renderGrammar(route.stageId);
    case 'reading': return renderReading(route.stageId);
    case 'dictation': return renderDictation(route.stageId);
    case 'plan': return renderDailyPlan();
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
      ${activeStageId ? `
        <button class="${cls('vocab')}" data-nav="vocab" data-stage="${activeStageId}">📇 ${t('navVocabulary')}</button>
        <button class="${cls('grammar')}" data-nav="grammar" data-stage="${activeStageId}">📖 ${t('navGrammar')}</button>
        <button class="${cls('reading')}" data-nav="reading" data-stage="${activeStageId}">📰 ${t('navReading')}</button>
        <button class="${cls('dictation')}" data-nav="dictation" data-stage="${activeStageId}">✍️ ${t('navDictation')}</button>
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
        <span class="breadcrumb-icon">${meta.icon}</span>
        <span class="breadcrumb-kind-label">${t(meta.titleKey)}</span>
      </div>
      <div class="breadcrumb-stage-info">
        <p class="breadcrumb-stage-line">${t('stageLabel')} ${stage.order} · ${stage.titleFr}</p>
        <p class="stage-title-ja">${stage.titleJa}</p>
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
      if (view === 'dashboard' || view === 'plan') {
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
let sessionState = null; // { day, taskIndex, tasks: ['vocab', ...] }

function sessionTaskList(entry) {
  return ACTIVITY_KINDS.map(a => a.kind).filter(kind => kind === 'vocab' || entry[kind].status !== 'locked');
}

function exitSession() {
  sessionState = null;
}

function goToSessionTask() {
  const entry = DAILY_PLAN[sessionState.day];
  const kind = sessionState.tasks[sessionState.taskIndex];
  navigate(taskGoRoute(kind, entry));
}

function startSessionAt(entry, kind) {
  const tasks = sessionTaskList(entry);
  const idx = Math.max(0, tasks.indexOf(kind));
  sessionState = { day: entry.day, taskIndex: idx, tasks };
  goToSessionTask();
}

function renderSessionBar() {
  if (!sessionState) return '';
  const entry = DAILY_PLAN[sessionState.day];
  const currentKind = sessionState.tasks[sessionState.taskIndex];
  const currentDone = taskDoneFlag(currentKind, entry);
  const isLast = sessionState.taskIndex === sessionState.tasks.length - 1;

  const steps = sessionState.tasks.map((kind, i) => {
    const meta = ACTIVITY_KINDS.find(a => a.kind === kind);
    const done = taskDoneFlag(kind, entry);
    const current = i === sessionState.taskIndex;
    const stateClass = done ? 'session-step-done' : current ? 'session-step-current' : 'session-step-upcoming';
    return `<div class="session-step ${stateClass}">
        <span class="session-step-icon">${done ? '✓' : meta.icon}</span>
        <span class="session-step-label">${t(meta.titleKey)}</span>
      </div>`;
  }).join('<span class="session-step-arrow">→</span>');

  return `
    <div class="session-bar">
      <div class="session-bar-top">
        <span class="session-bar-title">🧭 ${t('sessionTitle')} · ${t('dayLabel')} ${entry.day} · ${t('taskLabel')} ${sessionState.taskIndex + 1}/${sessionState.tasks.length}</span>
        <button class="session-exit-btn" id="session-exit-btn">✕ ${t('exitSession')}</button>
      </div>
      <div class="session-steps">${steps}</div>
      ${currentDone ? `
        <div class="session-complete-banner">
          <span>🎉 ${t('taskCompleteMsg')}</span>
          <button class="primary-btn" id="session-continue-btn">${isLast ? t('finishSession') : t('continueToNext')}</button>
        </div>` : ''}
    </div>`;
}

function bindSessionBar() {
  if (!sessionState) return;
  const exitBtn = document.getElementById('session-exit-btn');
  if (exitBtn) exitBtn.addEventListener('click', () => { exitSession(); navigate('/dashboard'); });

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
// Tableau de bord
// --------------------------------------------------------
function taskGoRoute(section, entry) {
  if (section === 'vocab') {
    return entry.vocab.mode === 'quiz' ? `/vocabquiz/${entry.stageId}` : `/vocab/${entry.stageId}/${entry.vocab.dayInStage}`;
  }
  const task = entry[section];
  return `/${section}/${task.stageId}`;
}

function taskDoneFlag(section, entry) {
  if (section === 'vocab') {
    if (entry.vocab.mode === 'new') return entry.vocab.wordIndexes.every(idx => progress[entry.stageId].vocabKnown.includes(idx));
    return !!progress[entry.stageId].vocabQuizDone;
  }
  const task = entry[section];
  if (task.status === 'locked') return false;
  if (section === 'grammar') return !!progress[task.stageId].grammarViewed;
  if (section === 'reading') return !!progress[task.stageId].readingScore;
  if (section === 'dictation') {
    const targetStage = CURRICULUM.find(s => s.id === task.stageId);
    return targetStage.dictationIds.every(id => progress[task.stageId].dictation[id]);
  }
  return false;
}

// Aperçu concret du contenu du jour, pour que l'apprenant voie sa
// progression (ex : "bonjour, bonsoir, salut..." / "Le verbe être")
// au lieu d'un simple statut abstrait.
function taskContentPreview(kind, entry) {
  if (kind === 'vocab') {
    const stage = CURRICULUM.find(s => s.id === entry.stageId);
    const lesson = VOCAB_LESSONS[stage.vocabId];
    if (entry.vocab.mode === 'quiz') {
      return `${t('quizToday')} (${lesson.words.length} ${t('wordsLabel')})`;
    }
    const words = entry.vocab.wordIndexes.map(i => lesson.words[i].fr);
    return words.length > 6 ? `${words.slice(0, 3).join(', ')}, … , ${words[words.length - 1]}` : words.join(', ');
  }

  const task = entry[kind];
  if (task.status === 'locked') return null;
  const targetStage = CURRICULUM.find(s => s.id === task.stageId);

  if (kind === 'grammar') return GRAMMAR_POINTS[targetStage.grammarId].titleFr;
  if (kind === 'reading') return READING_PASSAGES[targetStage.readingId].titleFr;
  if (kind === 'dictation') return targetStage.dictationIds.map(id => loc(DICTATION_ITEMS[id].hintFr, DICTATION_ITEMS[id].hintJa)).join(' / ');
  return null;
}

function renderTodayCard(entry) {
  let doneCount = 0;

  const rows = ACTIVITY_KINDS.map(a => {
    const key = a.kind;
    const done = taskDoneFlag(key, entry);
    if (done) doneCount++;

    let status;
    if (key === 'vocab') {
      status = entry.vocab.mode === 'quiz' ? 'review' : 'new';
    } else {
      status = entry[key].status;
    }
    const locked = status === 'locked';
    const preview = locked ? null : taskContentPreview(key, entry);

    return `
      <div class="today-task ${done ? 'task-done' : ''} ${locked ? 'task-locked' : ''}">
        <span class="today-task-icon">${a.icon}</span>
        <div class="today-task-body">
          <div class="today-task-top">
            <span class="today-task-label">${t(a.titleKey)}</span>
            <span class="status-badge status-${done ? 'done' : status}">${sectionStatusLabel(status, done)}</span>
          </div>
          ${locked
            ? `<p class="today-task-hint">🔒 ${t('lockedHint')}</p>`
            : (preview ? `<p class="today-task-extra" title="${escapeHtml(preview)}">${escapeHtml(preview)}</p>` : '')}
        </div>
        <button class="mini-btn today-go-btn" ${locked ? 'disabled' : ''} data-go="${key}">${done ? t('reviewButton') : t('goButton')}</button>
      </div>`;
  }).join('');

  const pct = Math.round((doneCount / ACTIVITY_KINDS.length) * 100);

  return `
    <div class="today-card">
      <div class="today-card-header">
        <h2>☀️ ${t('todaySession')}</h2>
        <span class="day-pill">${t('dayLabel')} ${entry.day} ${t('dayOf')} ${DAILY_PLAN.length - 1}</span>
      </div>
      <p class="today-stage-title">${entry.stageTitleFr} <span class="stage-title-ja">${entry.stageTitleJa}</span></p>
      <div class="today-progress-row">
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <span class="today-progress-count">${doneCount} / ${ACTIVITY_KINDS.length}</span>
      </div>
      <div class="today-tasks">${rows}</div>
      <button class="secondary-btn" id="view-full-plan">${t('viewFullPlan')}</button>
    </div>`;
}

function bindTodayCard(entry) {
  document.querySelectorAll('.today-go-btn[data-go]').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', () => startSessionAt(entry, btn.dataset.go));
  });
  const viewPlanBtn = document.getElementById('view-full-plan');
  if (viewPlanBtn) viewPlanBtn.addEventListener('click', () => navigate('/plan'));
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
  { kind: 'vocab', titleKey: 'navVocabulary', icon: '📇' },
  { kind: 'grammar', titleKey: 'navGrammar', icon: '📖' },
  { kind: 'reading', titleKey: 'navReading', icon: '📰' },
  { kind: 'dictation', titleKey: 'navDictation', icon: '✍️' }
];

function activityDoneCount(kind) {
  return CURRICULUM.filter(stage => activityStatus(kind, stage).done).length;
}

function renderExploreCards() {
  const cards = ACTIVITY_KINDS.map(a => {
    const doneCount = activityDoneCount(a.kind);
    return `
      <button class="explore-card" data-explore="${a.kind}">
        <span class="explore-icon">${a.icon}</span>
        <span class="explore-label">${t(a.titleKey)}</span>
        <span class="explore-count">${doneCount} / ${CURRICULUM.length} ${t('doneLabel')}</span>
      </button>`;
  }).join('');

  return `
    <section class="section-header">
      <h2>${t('exploreTitle')}</h2>
      <p class="section-subtitle">${t('exploreIntro')}</p>
    </section>
    <div class="explore-grid">${cards}</div>`;
}

function bindExploreCards() {
  document.querySelectorAll('.explore-card[data-explore]').forEach(btn => {
    btn.addEventListener('click', () => navigate(`/browse/${btn.dataset.explore}`));
  });
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
          <span class="activity-row-ja">${stage.titleJa}</span>
        </span>
        <span class="activity-row-badge ${status.done ? 'badge-done' : ''}">${status.label}</span>
      </button>`;
  }).join('');

  app.innerHTML = `
    ${topNav(null)}
    <section class="section-header">
      <h2>${meta.icon} ${t(meta.titleKey)}</h2>
      <p class="section-subtitle">${t('browseIntro')}</p>
    </section>
    <button class="secondary-btn plan-back-today" id="back-dashboard-browse">${t('backToDashboard')}</button>
    <div class="activity-row-list activity-row-list-full">${rows}</div>
  `;

  bindTopNav();
  document.getElementById('back-dashboard-browse').addEventListener('click', () => navigate('/dashboard'));
  document.querySelectorAll('.activity-row[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => { exitSession(); navigate(`/${btn.dataset.nav}/${btn.dataset.stage}`); });
  });
}

function renderDashboard() {
  const pct = overallProgress();
  const currentDayIndex = getCurrentDayIndex();
  const todayEntry = DAILY_PLAN[currentDayIndex];

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
    ${renderTodayCard(todayEntry)}
    ${renderExploreCards()}
  `;

  bindTopNav();
  bindTodayCard(todayEntry);
  bindExploreCards();
}

// --------------------------------------------------------
// Programme complet (Jour 0 → fin)
// --------------------------------------------------------
function renderDailyPlan() {
  const currentDayIndex = getCurrentDayIndex();
  const allDone = currentDayIndex === DAILY_PLAN.length - 1 && isDayComplete(DAILY_PLAN[currentDayIndex]);

  const rows = DAILY_PLAN.map((entry, i) => {
    const isToday = i === currentDayIndex;
    const isPast = i < currentDayIndex;
    const badges = ACTIVITY_KINDS.map(a => {
      const sec = a.kind;
      const status = sec === 'vocab' ? (entry.vocab.mode === 'quiz' ? 'review' : 'new') : entry[sec].status;
      const done = taskDoneFlag(sec, entry);
      const locked = status === 'locked';
      const preview = locked ? null : taskContentPreview(sec, entry);
      return `<button class="plan-badge status-${done ? 'done' : status} ${locked ? 'plan-badge-locked' : ''}"
        data-day="${i}" data-go="${sec}" ${locked ? 'disabled' : ''} ${preview ? `title="${escapeHtml(preview)}"` : ''}>
        <span class="plan-badge-icon">${a.icon}</span>
        <span class="plan-badge-label">${t(a.titleKey)}</span>
        <span class="plan-badge-status">${sectionStatusLabel(status, done)}</span>
        ${preview ? `<span class="plan-badge-preview">${escapeHtml(preview)}</span>` : ''}
      </button>`;
    }).join('');

    return `
      <div class="plan-day-row ${isToday ? 'plan-day-today' : ''} ${isPast ? 'plan-day-past' : ''}">
        <div class="plan-day-meta">
          <span class="day-pill">${t('dayLabel')} ${entry.day}</span>
          <div>
            <p class="plan-day-stage">${entry.stageTitleFr}</p>
            <p class="stage-title-ja">${entry.stageTitleJa}</p>
          </div>
        </div>
        <div class="plan-day-badges">${badges}</div>
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
    <div class="plan-day-list">${rows}</div>
  `;

  bindTopNav();
  document.getElementById('back-to-today').addEventListener('click', () => navigate('/dashboard'));
  document.querySelectorAll('.plan-badge[data-go]').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', () => {
      const entry = DAILY_PLAN[Number(btn.dataset.day)];
      startSessionAt(entry, btn.dataset.go);
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
let flashcardFlipped = false;
let flashcardSessionKey = '';

function renderVocab(stageId, dayInStage) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const lesson = VOCAB_LESSONS[stage.vocabId];

  // Si un jour du programme est précisé, on limite la session au lot du jour.
  let dayFilterEntry = null;
  if (dayInStage !== undefined && !Number.isNaN(dayInStage)) {
    dayFilterEntry = DAILY_PLAN.find(d => d.stageId === stageId && d.vocab.mode === 'new' && d.vocab.dayInStage === dayInStage);
  }
  const indexMap = dayFilterEntry ? dayFilterEntry.vocab.wordIndexes : lesson.words.map((_, i) => i);

  const sessionKey = `${stageId}:${dayInStage === undefined ? 'all' : dayInStage}`;
  if (sessionKey !== flashcardSessionKey) {
    flashcardSessionKey = sessionKey;
    flashcardIndex = 0;
    flashcardFlipped = false;
  }
  flashcardIndex = Math.min(flashcardIndex, indexMap.length - 1);
  const realIndex = indexMap[flashcardIndex];
  const word = lesson.words[realIndex];
  const known = progress[stageId].vocabKnown.includes(realIndex);

  const totalKnown = Math.min(progress[stageId].vocabKnown.length, lesson.words.length);
  const allKnown = totalKnown >= lesson.words.length;

  app.innerHTML = `
    ${topNav(stageId, 'vocab')}
    ${renderSessionBar()}
    ${activityBreadcrumb('vocab', stage, allKnown, `${totalKnown} / ${lesson.words.length} ${t('wordsLabel')}`)}
    ${dayFilterEntry ? `<p class="day-context-note">📅 ${t('dayLabel')} ${dayFilterEntry.day}</p>` : ''}
    <div class="flashcard-wrap">
      <p class="flashcard-counter">${t('cardLabel')} ${flashcardIndex + 1} / ${indexMap.length}</p>
      <div class="flashcard ${flashcardFlipped ? 'flipped' : ''} ${known ? 'known' : ''}" id="flashcard">
        <div class="flashcard-face flashcard-front">
          <p class="flashcard-fr">${word.fr}</p>
          <p class="flashcard-kana">${word.kana}</p>
        </div>
        <div class="flashcard-face flashcard-back">
          <p class="flashcard-ja">${word.ja}</p>
          <p class="flashcard-example-fr">${word.exampleFr}</p>
          <p class="flashcard-example-ja">${word.exampleJa}</p>
        </div>
      </div>
      <div class="flashcard-controls">
        <button class="secondary-btn" id="listen-btn">🔊 ${t('listenButton')}</button>
        <button class="secondary-btn" id="flip-btn">${t('flipCard')}</button>
      </div>
      <div class="flashcard-nav">
        <button class="mini-btn" id="prev-word" ${flashcardIndex === 0 ? 'disabled' : ''}>&larr;</button>
        <button class="know-btn ${known ? 'active' : ''}" id="know-btn">✓ ${t('iKnowIt')}</button>
        <button class="mini-btn" id="next-word" ${flashcardIndex === indexMap.length - 1 ? 'disabled' : ''}>&rarr;</button>
      </div>
      <button class="primary-btn quiz-launch" id="quiz-btn">${t('quizButton')}</button>
    </div>
    ${stagePager(stageId, 'vocab')}
  `;

  bindTopNav();
  bindSessionBar();
  bindStagePager(stageId, 'vocab');

  const rerender = () => renderVocab(stageId, dayInStage);

  document.getElementById('listen-btn').addEventListener('click', () => speakFrench(word.fr));
  document.getElementById('flip-btn').addEventListener('click', () => { flashcardFlipped = !flashcardFlipped; rerender(); });
  document.getElementById('flashcard').addEventListener('click', () => { flashcardFlipped = !flashcardFlipped; rerender(); });
  document.getElementById('prev-word').addEventListener('click', () => { flashcardIndex = Math.max(0, flashcardIndex - 1); flashcardFlipped = false; rerender(); });
  document.getElementById('next-word').addEventListener('click', () => { flashcardIndex = Math.min(indexMap.length - 1, flashcardIndex + 1); flashcardFlipped = false; rerender(); });
  document.getElementById('know-btn').addEventListener('click', () => {
    const list = progress[stageId].vocabKnown;
    const pos = list.indexOf(realIndex);
    if (pos === -1) list.push(realIndex); else list.splice(pos, 1);
    saveProgress(progress);
    rerender();
  });
  document.getElementById('quiz-btn').addEventListener('click', () => renderVocabQuiz(stageId, 0, 0));
}

function renderVocabQuiz(stageId, qIndex, scoreCount) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const lesson = VOCAB_LESSONS[stage.vocabId];
  const words = lesson.words;

  if (qIndex >= words.length) {
    progress[stageId].vocabQuizDone = true;
    saveProgress(progress);
    app.innerHTML = `
      ${topNav(stageId, 'vocab')}
      ${renderSessionBar()}
      ${activityBreadcrumb('vocab', stage, true)}
      <div class="quiz-result">
        <h2>${t('score')}: ${scoreCount} / ${words.length}</h2>
        <button class="primary-btn" id="restart-quiz">${t('restartQuiz')}</button>
        <button class="secondary-btn" id="back-to-vocab">${t('navVocabulary')}</button>
      </div>
      ${stagePager(stageId, 'vocab')}`;
    bindTopNav();
    bindSessionBar();
    bindStagePager(stageId, 'vocab');
    document.getElementById('restart-quiz').addEventListener('click', () => renderVocabQuiz(stageId, 0, 0));
    document.getElementById('back-to-vocab').addEventListener('click', () => navigate(`/vocab/${stageId}`));
    return;
  }

  const correctWord = words[qIndex];
  const distractors = words.filter((_, i) => i !== qIndex).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.ja);
  const options = [correctWord.ja, ...distractors].sort(() => Math.random() - 0.5);

  app.innerHTML = `
    ${topNav(stageId, 'vocab')}
    ${renderSessionBar()}
    ${activityBreadcrumb('vocab', stage, false, `${t('quizTitle')} · ${qIndex + 1} / ${words.length}`)}
    <div class="quiz-question">
      <p class="quiz-word-fr">${correctWord.fr}</p>
      <button class="secondary-btn" id="quiz-listen">🔊 ${t('listenButton')}</button>
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
    ${topNav(stageId, 'grammar')}
    ${renderSessionBar()}
    ${activityBreadcrumb('grammar', stage, viewed)}
    <div class="grammar-card">
      <h3 class="content-title">${g.titleFr} <span class="content-title-ja">${g.titleJa}</span></h3>
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
                <button class="icon-btn" data-speak="${encodeURIComponent(ex.fr)}">🔊</button>
              </div>
              <div class="example-ja">${ex.ja}</div>
            </li>`).join('')}
        </ul>
      </div>
      <button class="primary-btn ${viewed ? 'active' : ''}" id="mark-viewed-btn">✓ ${t('markAsViewed')}</button>
    </div>
    ${stagePager(stageId, 'grammar')}
  `;

  bindTopNav();
  bindSessionBar();
  bindStagePager(stageId, 'grammar');
  document.querySelectorAll('[data-speak]').forEach(btn => {
    btn.addEventListener('click', () => speakFrench(decodeURIComponent(btn.dataset.speak)));
  });
  document.getElementById('mark-viewed-btn').addEventListener('click', () => {
    progress[stageId].grammarViewed = true;
    saveProgress(progress);
    renderGrammar(stageId);
  });
}

// --------------------------------------------------------
// Lecture
// --------------------------------------------------------
let readingTranslationVisible = false;
let readingAnswers = {};

function renderReading(stageId) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const passage = READING_PASSAGES[stage.readingId];
  readingAnswers = {};
  const priorScore = progress[stageId].readingScore;

  app.innerHTML = `
    ${topNav(stageId, 'reading')}
    ${renderSessionBar()}
    ${activityBreadcrumb('reading', stage, !!priorScore, priorScore ? `${t('score')}: ${priorScore.correct} / ${priorScore.total}` : null)}
    <div class="reading-card">
      <h3 class="content-title">${passage.titleFr} <span class="content-title-ja">${passage.titleJa}</span></h3>
      <div class="reading-text-controls">
        <button class="secondary-btn" id="listen-passage">🔊 ${t('listenButton')}</button>
        <button class="secondary-btn" id="toggle-translation">${readingTranslationVisible ? t('hideTranslation') : t('showTranslation')}</button>
      </div>
      <p class="reading-text-fr">${passage.textFr}</p>
      <p class="reading-text-ja" id="reading-translation" style="display:${readingTranslationVisible ? 'block' : 'none'}">${passage.textJa}</p>

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
    ${stagePager(stageId, 'reading')}
  `;

  bindTopNav();
  bindSessionBar();
  bindStagePager(stageId, 'reading');
  document.getElementById('listen-passage').addEventListener('click', () => speakFrench(passage.textFr));
  document.getElementById('toggle-translation').addEventListener('click', () => {
    readingTranslationVisible = !readingTranslationVisible;
    renderReading(stageId);
  });

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
    const result = document.getElementById('reading-result');
    result.textContent = `${t('score')}: ${correctCount} / ${passage.questions.length}`;
    result.className = 'quiz-feedback ' + (correctCount === passage.questions.length ? 'feedback-correct' : 'feedback-incorrect');
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

function renderDictation(stageId) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const items = stage.dictationIds.map(id => ({ id, ...DICTATION_ITEMS[id], done: !!progress[stageId].dictation[id] }));
  const doneCount = items.filter(i => i.done).length;
  const allDone = doneCount === items.length;

  app.innerHTML = `
    ${topNav(stageId, 'dictation')}
    ${renderSessionBar()}
    ${activityBreadcrumb('dictation', stage, allDone, allDone ? null : `${doneCount} / ${items.length}`)}
    <p class="section-subtitle">${t('dictationInstructions')}</p>
    <div class="dictation-list">
      ${items.map(item => `
        <div class="dictation-card ${item.done ? 'dictation-done' : ''}" data-id="${item.id}">
          <p class="hint-label">${item.done ? `<span class="done-check">✓ ${t('statusDone')}</span> — ` : ''}${t('hintLabel')}: ${loc(item.hintFr, item.hintJa)}</p>
          <button class="secondary-btn" data-listen="${item.id}">🔊 ${t('listenButton')}</button>
          <input type="text" class="dictation-input" data-input="${item.id}" autocomplete="off" spellcheck="false" placeholder="${t('yourAnswer')}" />
          <button class="primary-btn" data-check="${item.id}">${t('checkDictation')}</button>
          <p class="dictation-feedback" id="feedback-${item.id}">${item.done ? `<span class="feedback-correct">${t('perfect')}</span>` : ''}</p>
        </div>`).join('')}
    </div>
    ${stagePager(stageId, 'dictation')}
  `;

  bindTopNav();
  bindSessionBar();
  bindStagePager(stageId, 'dictation');

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
        refreshSessionBar();
      } else {
        feedback.innerHTML = `<span class="feedback-incorrect">${t('almostCorrect')}</span><br>${wordDiff(item.textFr, typed)}`;
      }
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
