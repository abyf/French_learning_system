// ============================================================
// i18n — langue de l'INTERFACE uniquement (fr par défaut, ja en option).
// Le contenu appris (mots, phrases, textes français) ne change JAMAIS :
// seuls les libellés, boutons et instructions de l'appli changent de langue.
// ============================================================
const UI_STRINGS = {
  fr: {
    appTitle: "Le Français facile",
    appSubtitle: "Apprendre le français pour les Japonais débutants",
    navDashboard: "Tableau de bord",
    navVocabulary: "Vocabulaire",
    navDictation: "Dictée",
    navReading: "Lecture",
    navGrammar: "Grammaire",
    dashboardWelcome: "Bienvenue !",
    dashboardIntro: "Choisissez une étape pour commencer. Progressez pas à pas, du niveau zéro aux premières conversations.",
    overallProgress: "Progression générale",
    stageLabel: "Étape",
    continueButton: "Continuer",
    startButton: "Commencer",
    reviewButton: "Revoir",
    doneLabel: "terminé",
    backToDashboard: "Retour au tableau de bord",
    prevStage: "Étape précédente",
    nextStage: "Étape suivante",
    vocabSectionTitle: "Vocabulaire",
    flipCard: "Retourner la carte",
    hideMeaning: "Cacher le sens (s'auto-tester)",
    showMeaning: "Afficher le sens",
    iKnowIt: "Je connais",
    needsReview: "À revoir",
    listenButton: "Écouter",
    quizButton: "Faire le quiz de cette étape",
    quizTitle: "Quiz de vocabulaire",
    quizQuestionFr: "Que veut dire ce mot ?",
    checkAnswer: "Vérifier",
    nextQuestion: "Suivant",
    restartQuiz: "Recommencer",
    score: "Score",
    grammarSectionTitle: "Grammaire",
    patternLabel: "Structure",
    conjugationLabel: "Conjugaison",
    examplesLabel: "Exemples",
    markAsViewed: "J'ai compris cette leçon",
    readingSectionTitle: "Lecture",
    showTranslation: "Voir la traduction",
    hideTranslation: "Cacher la traduction",
    comprehensionQuestions: "Questions de compréhension",
    submitAnswers: "Valider mes réponses",
    correct: "Bonne réponse !",
    incorrect: "Réponse incorrecte",
    correctAnswerWas: "La bonne réponse était :",
    dictationSectionTitle: "Dictée",
    dictationInstructions: "Écoutez la phrase, puis écrivez ce que vous entendez en français.",
    yourAnswer: "Votre réponse",
    checkDictation: "Vérifier ma dictée",
    tryAgain: "Réessayer",
    perfect: "Parfait !",
    almostCorrect: "Presque ! Voici la différence :",
    hintLabel: "Indice",
    stageComplete: "Étape terminée !",
    wordsLabel: "mots",
    speakNotSupported: "La lecture audio n'est pas prise en charge par ce navigateur.",
    noFrenchVoiceWarning: "Aucune voix française n'est installée sur cet appareil, donc le son ne fonctionnera pas. Sur Android : Paramètres → Langues et saisie → Synthèse vocale (Text-to-speech) → paramètres du moteur Google → installez les données vocales du français.",
    speakErrorWarning: "La lecture audio a échoué sur cet appareil. Cela arrive parfois sur Android quand la voix française n'est pas installée (voir Paramètres → Synthèse vocale).",
    langButtonFr: "Français",
    langButtonJa: "日本語",
    navPlan: "Programme",
    dayLabel: "Jour",
    todaySession: "La séance d'aujourd'hui",
    dayOf: "sur",
    statusNew: "Nouveau",
    statusReview: "Révision",
    statusLocked: "Verrouillé",
    statusDone: "Fait",
    lockedHint: "Suggéré après le vocabulaire de l'étape en cours. Vous pouvez aussi l'explorer librement dès maintenant :",
    exploreFreelyLink: "Explorer librement →",
    goButton: "Aller à l'exercice",
    quizReview: "Quiz de révision",
    planPageTitle: "Programme d'étude quotidien",
    planPageIntro: "Suivez ce parcours du Jour 0 jusqu'à la fin. Chaque jour propose du vocabulaire, de la grammaire, de la lecture et de la dictée. Les nouveautés arrivent seulement une fois les prérequis acquis.",
    allCaughtUp: "Bravo, vous avez terminé tout le programme actuel !",
    viewFullPlan: "Voir le programme complet",
    backToToday: "Revenir à aujourd'hui",
    newWordsToday: "nouveaux mots aujourd'hui",
    quizToday: "Quiz de révision du vocabulaire de l'étape",
    exploreTitle: "Explorez par vous-même",
    exploreIntro: "Envie d'avancer à votre rythme ? Choisissez une section pour parcourir librement toutes les leçons.",
    browseIntro: "Choisissez une leçon pour commencer. Une coche verte ✓ signale une leçon déjà terminée.",
    loginTab: "Se connecter",
    registerTab: "Créer un compte",
    firstnameLabel: "Prénom",
    emailLabel: "E-mail",
    aliasLabel: "Identifiant",
    passwordLabel: "Mot de passe",
    confirmPasswordLabel: "Confirmer le mot de passe",
    loginButton: "Se connecter",
    registerButton: "Créer mon compte",
    welcomeMsg: "Bonjour",
    logoutButton: "Se déconnecter",
    errorRequired: "Ce champ est obligatoire.",
    errorEmailInvalid: "Veuillez entrer une adresse e-mail valide.",
    errorAliasTooShort: "L'identifiant doit contenir au moins 3 caractères.",
    errorPasswordTooShort: "Le mot de passe doit contenir au moins 6 caractères.",
    errorAliasTaken: "Cet identifiant est déjà utilisé.",
    errorEmailTaken: "Cette adresse e-mail est déjà utilisée.",
    errorPasswordMismatch: "Les mots de passe ne correspondent pas.",
    errorLoginFailed: "Identifiant ou mot de passe incorrect.",
    errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
    cardLabel: "Carte",
    feedbackBannerText: "Version bêta — merci de donner votre avis :",
    feedbackBannerLink: "Formulaire de feedback →",
    sessionTitle: "Séance guidée",
    taskLabel: "Tâche",
    exitSession: "Quitter la séance",
    taskCompleteMsg: "Bravo, cette activité est terminée !",
    continueToNext: "Continuer →",
    finishSession: "Terminer la séance ✓"
  },
  ja: {
    appTitle: "やさしいフランス語",
    appSubtitle: "日本人の初心者のためのフランス語学習",
    navDashboard: "ダッシュボード",
    navVocabulary: "語彙",
    navDictation: "ディクテ",
    navReading: "読解",
    navGrammar: "文法",
    dashboardWelcome: "ようこそ!",
    dashboardIntro: "ステージを選んで始めましょう。ゼロから最初の会話まで、一歩ずつ進みます。",
    overallProgress: "全体の進捗",
    stageLabel: "ステージ",
    continueButton: "続ける",
    startButton: "始める",
    reviewButton: "復習する",
    doneLabel: "完了",
    backToDashboard: "ダッシュボードに戻る",
    prevStage: "前のステージ",
    nextStage: "次のステージ",
    vocabSectionTitle: "語彙",
    flipCard: "カードを裏返す",
    hideMeaning: "意味を隠す(自己テスト)",
    showMeaning: "意味を表示する",
    iKnowIt: "わかる",
    needsReview: "復習する",
    listenButton: "聞く",
    quizButton: "このステージのクイズをする",
    quizTitle: "語彙クイズ",
    quizQuestionFr: "この単語の意味は?",
    checkAnswer: "確認する",
    nextQuestion: "次へ",
    restartQuiz: "やり直す",
    score: "点数",
    grammarSectionTitle: "文法",
    patternLabel: "文型",
    conjugationLabel: "活用",
    examplesLabel: "例文",
    markAsViewed: "このレッスンを理解した",
    readingSectionTitle: "読解",
    showTranslation: "翻訳を見る",
    hideTranslation: "翻訳を隠す",
    comprehensionQuestions: "内容理解の質問",
    submitAnswers: "答えを確認する",
    correct: "正解!",
    incorrect: "不正解",
    correctAnswerWas: "正解は:",
    dictationSectionTitle: "ディクテ",
    dictationInstructions: "文章を聞いて、聞こえたフランス語をそのまま書きましょう。",
    yourAnswer: "あなたの答え",
    checkDictation: "答えを確認する",
    tryAgain: "もう一度",
    perfect: "完璧です!",
    almostCorrect: "もう少し!違いはこちらです:",
    hintLabel: "ヒント",
    stageComplete: "ステージ完了!",
    wordsLabel: "単語",
    speakNotSupported: "このブラウザは音声読み上げに対応していません。",
    noFrenchVoiceWarning: "この端末にフランス語の音声データがインストールされていないため、音声が再生されません。Android:「設定」→「言語と入力」→「テキスト読み上げの出力」→ Googleの音声合成エンジンの設定 → フランス語の音声データをインストールしてください。",
    speakErrorWarning: "この端末で音声の再生に失敗しました。Androidでフランス語の音声データが未インストールの場合によく起こります(「設定」→「テキスト読み上げ」を確認してください)。",
    langButtonFr: "Français",
    langButtonJa: "日本語",
    navPlan: "プログラム",
    dayLabel: "Day",
    todaySession: "今日のレッスン",
    dayOf: "/",
    statusNew: "新しい",
    statusReview: "復習",
    statusLocked: "ロック中",
    statusDone: "完了",
    lockedHint: "現在のステージの語彙の後に推奨される内容です。今すぐ自由に見ることもできます:",
    exploreFreelyLink: "自由に見る →",
    goButton: "この課題に進む",
    quizReview: "復習クイズ",
    planPageTitle: "毎日の学習プログラム",
    planPageIntro: "Day 0から最後まで、この順番で進みましょう。毎日、語彙・文法・読解・ディクテの4つがあります。新しい内容は、前提条件を満たした後にのみ登場します。",
    allCaughtUp: "おめでとうございます!現在のプログラムをすべて終えました!",
    viewFullPlan: "プログラム全体を見る",
    backToToday: "今日に戻る",
    newWordsToday: "今日の新しい単語",
    quizToday: "このステージの語彙復習クイズ",
    exploreTitle: "自分で探してみましょう",
    exploreIntro: "自分のペースで進めたいですか?セクションを選んで、すべてのレッスンを自由に見てみましょう。",
    browseIntro: "レッスンを選んで始めましょう。緑のチェック✓は完了したレッスンを示します。",
    loginTab: "ログイン",
    registerTab: "新規登録",
    firstnameLabel: "名前",
    emailLabel: "メールアドレス",
    aliasLabel: "ユーザーID",
    passwordLabel: "パスワード",
    confirmPasswordLabel: "パスワード(確認)",
    loginButton: "ログイン",
    registerButton: "登録する",
    welcomeMsg: "こんにちは",
    logoutButton: "ログアウト",
    errorRequired: "この項目は必須です。",
    errorEmailInvalid: "有効なメールアドレスを入力してください。",
    errorAliasTooShort: "ユーザーIDは3文字以上にしてください。",
    errorPasswordTooShort: "パスワードは6文字以上にしてください。",
    errorAliasTaken: "このユーザーIDは既に使われています。",
    errorEmailTaken: "このメールアドレスは既に使われています。",
    errorPasswordMismatch: "パスワードが一致しません。",
    errorLoginFailed: "ユーザーIDまたはパスワードが正しくありません。",
    errorGeneric: "エラーが発生しました。もう一度お試しください。",
    cardLabel: "カード",
    feedbackBannerText: "ベータ版テスト中 — ご意見をお願いします:",
    feedbackBannerLink: "フィードバックフォーム →",
    sessionTitle: "ガイド付きレッスン",
    taskLabel: "タスク",
    exitSession: "レッスンを終了",
    taskCompleteMsg: "よくできました、このアクティビティは完了です!",
    continueToNext: "次へ →",
    finishSession: "レッスンを終了する ✓"
  }
};

let currentUiLang = 'fr';

function t(key) {
  return (UI_STRINGS[currentUiLang] && UI_STRINGS[currentUiLang][key]) || key;
}

// Pour le contenu pédagogique qui a une version FR et une version JA
// (explications de grammaire, questions de lecture, indices de dictée) :
// affiche la version correspondant à la langue d'interface choisie.
// Le vocabulaire franco-japonais lui-même (mots, phrases d'exemple,
// traductions) reste toujours bilingue, quelle que soit la langue de l'UI.
function loc(frText, jaText) {
  return currentUiLang === 'ja' ? jaText : frText;
}

function setUiLanguage(lang) {
  currentUiLang = (lang === 'ja') ? 'ja' : 'fr';
  localStorage.setItem('lff-ui-lang', currentUiLang);
  document.documentElement.lang = currentUiLang === 'ja' ? 'ja' : 'fr';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentUiLang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
}

function initUiLanguage() {
  const saved = localStorage.getItem('lff-ui-lang');
  setUiLanguage(saved || 'fr');
}

// --------------------------------------------------------
// Lecture audio française via la synthèse vocale du navigateur.
// Sur Android/Chrome, les voix se chargent de façon asynchrone et
// l'appareil peut ne pas avoir de voix française installée du tout
// (contrairement à iOS, qui embarque de nombreuses langues) — dans
// ce cas speak() échoue silencieusement, sans son ni erreur visible.
// On détecte ce cas et on affiche une explication actionnable au
// lieu de laisser l'apprenant croire que l'appli est cassée.
// --------------------------------------------------------
let cachedVoices = null;
let voicesLoadingPromise = null;
let noFrenchVoiceWarned = false;

function loadVoices() {
  if (voicesLoadingPromise) return voicesLoadingPromise;
  voicesLoadingPromise = new Promise(resolve => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) {
      resolve(existing);
      return;
    }
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', finish, { once: true });
    setTimeout(finish, 1200); // repli si l'événement ne se déclenche jamais (certains Android)
  });
  return voicesLoadingPromise;
}

async function speakFrench(text) {
  if (!('speechSynthesis' in window)) {
    alert(t('speakNotSupported'));
    return;
  }

  if (!cachedVoices) {
    cachedVoices = await loadVoices();
  }
  const frenchVoice = cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('fr'));

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = 0.9;
  if (frenchVoice) utterance.voice = frenchVoice;

  utterance.onerror = () => {
    if (!noFrenchVoiceWarned) {
      noFrenchVoiceWarned = true;
      alert(t('speakErrorWarning'));
    }
  };

  if (!frenchVoice && !noFrenchVoiceWarned) {
    noFrenchVoiceWarned = true;
    alert(t('noFrenchVoiceWarning'));
  }

  window.speechSynthesis.speak(utterance);
}
