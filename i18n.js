// ============================================================
// i18n — langue de l'INTERFACE uniquement (fr par défaut, ja en option).
// Le contenu appris (mots, phrases, textes français) ne change JAMAIS :
// seuls les libellés, boutons et instructions de l'appli changent de langue.
// ============================================================
const UI_STRINGS = {
  fr: {
    appTitle: "Le Français facile",
    appSubtitle: "Apprendre le français pour les Japonais débutants",
    navDashboard: "Accueil",
    navVocabulary: "Vocabulaire",
    navDictation: "Dictée",
    navReading: "Lecture",
    navGrammar: "Grammaire",
    dashboardWelcome: "Bienvenue !",
    dashboardIntro: "Voici votre espace d'apprentissage. Découvrez comment fonctionne le programme, puis choisissez votre façon d'apprendre.",
    tourCardTitle: "Comment fonctionne « Le Français facile » ?",
    tourCardIntro: "Un programme complet, pensé pour les Japonais débutants, avec de l'audio partout et une traduction japonaise disponible à tout moment.",
    tourItemVocab: "Vocabulaire — mots essentiels avec prononciation (kana) et écoute audio.",
    tourItemGrammar: "Grammaire — règles expliquées simplement, avec exercices (genre, conjugaison, construction de phrases).",
    tourItemReading: "Lecture — petits textes en français, avec mode lecture ou mode écoute seule.",
    tourItemDictation: "Dictée — écrivez ce que vous entendez, ou distinguez des sons proches (Discrimination).",
    tourItemPhrases: "Phrases utiles — des phrases pratiques pour la vie quotidienne, à consulter à tout moment.",
    tourItemSpeaking: "Parler — écoutez, puis enregistrez-vous pour vous entraîner à la prononciation (à partir de la 2e étape du programme, une fois l'alphabet et les salutations acquis).",
    tourItemProgram: "Le programme avance par paires d'étapes : chaque semaine introduit 2 nouvelles étapes (jours 1 et 3), avec leur révision (jours 2 et 4), une révision approfondie (jours 5 et 6) et un bilan (jour 7). La même paire est ensuite entièrement revue la semaine suivante, avant de passer à la suite — un parcours complet d'environ 7 mois.",
    tourItemModes: "Vous choisissez comment avancer : pas à pas avec le programme guidé, ou librement à votre rythme. Vous pouvez changer d'avis à tout moment.",
    modeChoiceTitle: "Comment souhaitez-vous apprendre ?",
    modeChoiceIntro: "Choisissez le programme guidé pour une progression pas à pas, ou explorez librement tout le contenu à votre rythme. Vous pourrez changer de mode à tout moment.",
    modeGuidedTitle: "Programme guidé",
    modeGuidedDesc: "Suivez le parcours jour par jour. Un seul exercice à la fois, dans l'ordre, jusqu'à la fin du programme.",
    modeGuidedButton: "Commencer la séance guidée",
    modeFreeTitle: "Explorer librement",
    modeFreeDesc: "Choisissez vous-même la section et l'étape que vous voulez pratiquer, dans n'importe quel ordre.",
    modeFreeButton: "Explorer le contenu",
    resumeBadge: "Reprendre ici",
    translationBarLabel: "Traduction japonaise :",
    footerCopyright: "© 2026 Nipponmboa Consulting. Tous droits réservés.",
    backToChoice: "← Retour au choix",
    stopForToday: "Arrêter pour aujourd'hui",
    stopForTodayMsg: "À bientôt ! Vous pouvez reprendre le programme guidé quand vous voulez.",
    achievementsLinkLabel: "Mes réussites",
    achievementsPageTitle: "Mes réussites",
    exploreHomeTitle: "Explorer librement",
    overallProgress: "Progression générale",
    stageLabel: "Étape",
    continueButton: "Continuer",
    startButton: "Commencer",
    reviewButton: "Revoir",
    doneLabel: "terminé",
    backToDashboard: "← Retour à l'accueil",
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
    vocabNewStepHint: "Parcourez les mots jusqu'au dernier avec les flèches. Le bouton « Je connais » est facultatif, juste pour vous-même — le quiz de révision viendra plus tard, pas aujourd'hui.",
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
    dicteeModeTab: "Dictée",
    discriminationModeTab: "Discrimination",
    discriminationInstructions: "Écoutez, puis choisissez le mot que vous avez entendu. Ces paires ciblent des sons difficiles à distinguer pour les Japonais.",
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
    programOverviewLink: "Aperçu du programme guidé →",
    backToExplore: "← Retour à l'exploration libre",
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
    weekLabel: "Semaine",
    dayTypeNew: "Nouveau contenu",
    dayTypeReview: "Révision",
    dayTypeExtended: "Révision approfondie",
    dayTypeTest: "Bilan hebdomadaire",
    weekKindConsolidation: "semaine de consolidation",
    weeklyTestIntro: "Reprenez tout ce que vous avez appris cette semaine : vocabulaire, grammaire, lecture, dictée et phrases.",
    dailyPhraseTitle: "Phrase du jour",
    markPhraseLearned: "J'ai appris cette phrase",
    markSpeakingPracticed: "J'ai pratiqué cette phrase",
    planPageTitle: "Aperçu du programme guidé",
    planPageIntro: "Chaque semaine introduit 2 nouvelles étapes avec leur révision, puis 2 jours de révision approfondie et un bilan. La semaine suivante revoit entièrement les mêmes étapes avant de continuer.",
    allCaughtUp: "Bravo, vous avez terminé tout le programme actuel !",
    viewFullPlan: "Voir le programme complet",
    backToToday: "Revenir à aujourd'hui",
    newWordsToday: "nouveaux mots aujourd'hui",
    quizToday: "Quiz de révision du vocabulaire de l'étape",
    exploreTitle: "Explorez par vous-même",
    exploreIntro: "Envie d'avancer à votre rythme ? Choisissez une section pour parcourir librement toutes les leçons.",
    browseIntro: "Choisissez une leçon pour commencer. Une coche verte ✓ signale une leçon déjà terminée.",
    journeyIntro: "Suivez le parcours étape par étape. Chaque cercle est une leçon ; la coche ✓ marque celles déjà terminées.",
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
    finishSession: "Terminer la séance ✓",
    nextArrowLabel: "Suivant →",
    navStepDoneHint: "Terminé — appuyez sur Suivant",
    navHintVocab: "Faites défiler les mots avec les flèches",
    navHintVocabQuiz: "Répondez au petit quiz",
    navHintGrammar: "Lisez la leçon, puis marquez-la comme lue",
    navHintGrammarPractice: "Faites l'exercice",
    navHintReading: "Lisez le texte et répondez aux questions",
    navHintDictation: "Écrivez ce que vous entendez",
    navHintPhrase: "Écoutez la phrase et répétez-la",
    navHintSpeaking: "Écoutez, puis enregistrez-vous",
    vocabReviewTitle: "Révision générale",
    vocabReviewLink: "Réviser tout le vocabulaire appris",
    vocabReviewNotEnough: "Apprenez au moins 4 mots (bouton « Je connais ») avant de pouvoir faire une révision générale.",
    genderGameTitle: "Jeu : le ou la ?",
    genderGameLink: "Jouer : le ou la ?",
    genderGameInstructions: "Ce nom est-il masculin (le) ou féminin (la) ?",
    conjugationDrillTitle: "S'exercer à la conjugaison",
    conjugationDrillLink: "S'exercer à la conjugaison",
    conjugationDrillInstructions: "Choisissez la bonne forme du verbe pour ce sujet.",
    sentenceBuilderTitle: "Reconstituer une phrase",
    sentenceBuilderLink: "Reconstituer une phrase",
    sentenceBuilderInstructions: "Touchez les mots dans le bon ordre pour reconstituer la phrase.",
    sentenceBuilderReset: "Recommencer",
    sentenceBuilderCheck: "Vérifier l'ordre",
    readingModeTab: "Lecture",
    listeningModeTab: "Écoute",
    listeningInstructions: "Écoutez le texte, puis répondez aux questions. Le texte reste caché jusqu'à ce que vous validiez vos réponses.",
    revealTextButton: "Voir le texte",
    phrasesNavLabel: "Phrases utiles",
    phrasesTitle: "Phrases utiles",
    phrasesIntro: "Des phrases pratiques pour la vie quotidienne, classées par thème. Consultez-les à tout moment, sans ordre imposé.",
    speakingNavLabel: "Parler",
    speakingTitle: "Parler",
    speakingIntro: "Écoutez la phrase, puis enregistrez-vous en la répétant. Réécoutez votre enregistrement et comparez-le à la prononciation native.",
    recordButton: "S'enregistrer",
    stopRecordButton: "Arrêter",
    playRecordingButton: "Écouter mon enregistrement",
    micNotSupported: "L'enregistrement audio n'est pas pris en charge par ce navigateur ou l'accès au micro a été refusé.",
    achievementsTitle: "Réussites",
    achievementsUnlocked: "débloquées",
    streakLabel: "jours d'affilée",
    mascotWelcome: "Bonjour ! Prêt à apprendre le français aujourd'hui ? Commençons en douceur.",
    mascotResume: "Content de vous revoir ! On reprend là où vous vous étiez arrêté ?",
    mascotStreak: "Bravo, {n} jours de suite ! Votre régularité paie vraiment.",
    mascotGoalDone: "Objectif du jour atteint, félicitations ! Vous pouvez continuer ou revenir demain.",
    levelLabel: "Niveau",
    dailyGoalLabel: "Objectif du jour :",
    goalDoneLabel: "Objectif du jour atteint !",
    levelUpTitle: "Niveau",
    levelUpSub: "Bravo, vous montez d'un niveau !",
    goalReachedTitle: "Objectif atteint !",
    goalReachedSub: "Vous avez atteint votre objectif du jour. Continuez comme ça !",
    achFirstWord: "Premier pas",
    achTenWords: "10 mots appris",
    achFiftyWords: "50 mots appris",
    achHundredWords: "100 mots appris",
    achTwoHundredWords: "200 mots appris",
    achFirstStage: "Première étape terminée",
    achTenStages: "10 étapes terminées",
    achAllStages: "Parcours terminé !",
    achGrammarian: "Grammairien(ne)",
    achAvidReader: "Lecteur(rice) assidu(e)"
  },
  ja: {
    appTitle: "やさしいフランス語",
    appSubtitle: "日本人の初心者のためのフランス語学習",
    navDashboard: "ホーム",
    navVocabulary: "語彙",
    navDictation: "ディクテ",
    navReading: "読解",
    navGrammar: "文法",
    dashboardWelcome: "ようこそ!",
    dashboardIntro: "ここが学習のホームです。プログラムの仕組みを確認して、学び方を選びましょう。",
    tourCardTitle: "「やさしいフランス語」の使い方",
    tourCardIntro: "日本人初心者のために作られた総合プログラムです。どこでも音声が聞けて、いつでも日本語訳を確認できます。",
    tourItemVocab: "語彙 — カタカナ発音と音声付きの必須単語。",
    tourItemGrammar: "文法 — わかりやすい説明と練習問題(性別、活用、文の組み立て)。",
    tourItemReading: "読解 — フランス語の短い文章。読むモードと聞くだけモードがあります。",
    tourItemDictation: "ディクテ — 聞いた通りに書く練習、または似た音を聞き分ける練習(ディスクリミネーション)。",
    tourItemPhrases: "使えるフレーズ — 日常生活で使える実用フレーズ。いつでも見られます。",
    tourItemSpeaking: "話す — 聞いてから録音して発音を練習します(プログラムの2番目のステージから。アルファベットと挨拶を学んだ後に始まります)。",
    tourItemProgram: "プログラムは2つのステージを1組として進みます。毎週2つの新しいステージを学び(1日目・3日目)、それぞれの復習(2日目・4日目)、発展復習(5日目・6日目)、7日目に総復習テストがあります。同じ2つのステージは翌週にもう一度しっかり復習してから、次に進みます。全体で約7か月のプログラムです。",
    tourItemModes: "進め方は自分で選べます:プログラムに沿って一歩ずつ進む「ガイド付き」か、自分のペースで自由に学ぶ「自由学習」。いつでも変更できます。",
    modeChoiceTitle: "どのように学びますか?",
    modeChoiceIntro: "一歩ずつ進みたい方はガイド付きプログラムを、自分のペースで学びたい方は自由学習を選んでください。モードはいつでも変更できます。",
    modeGuidedTitle: "ガイド付きプログラム",
    modeGuidedDesc: "毎日のプログラムに沿って進みます。一度に1つの練習だけ、順番通りに、プログラムの最後まで。",
    modeGuidedButton: "ガイド付きレッスンを始める",
    modeFreeTitle: "自由に学習する",
    modeFreeDesc: "好きなセクションとステージを自分で選んで、順番を気にせず練習できます。",
    modeFreeButton: "コンテンツを見る",
    resumeBadge: "ここから再開",
    translationBarLabel: "日本語訳:",
    footerCopyright: "© 2026 Nipponmboa Consulting. 無断複写・転載を禁じます。",
    backToChoice: "← 選択画面に戻る",
    stopForToday: "今日はここまで",
    stopForTodayMsg: "また今度!ガイド付きプログラムはいつでも再開できます。",
    achievementsLinkLabel: "実績を見る",
    achievementsPageTitle: "実績",
    exploreHomeTitle: "自由に学習する",
    overallProgress: "全体の進捗",
    stageLabel: "ステージ",
    continueButton: "続ける",
    startButton: "始める",
    reviewButton: "復習する",
    doneLabel: "完了",
    backToDashboard: "← ホームに戻る",
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
    vocabNewStepHint: "矢印を使って最後の単語までカードを見ていきましょう。「わかる」ボタンは自分用の任意の記録です。復習クイズは今日ではなく、後日行います。",
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
    dicteeModeTab: "ディクテ",
    discriminationModeTab: "聞き分け",
    discriminationInstructions: "音声を聞いて、聞こえた単語を選びましょう。これらの単語は、日本語話者が区別しにくい発音のペアです。",
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
    programOverviewLink: "ガイド付きプログラムの概要 →",
    backToExplore: "← 自由学習に戻る",
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
    weekLabel: "Week",
    dayTypeNew: "新しい学習",
    dayTypeReview: "復習",
    dayTypeExtended: "発展復習",
    dayTypeTest: "週末の総復習テスト",
    weekKindConsolidation: "定着週",
    weeklyTestIntro: "この一週間で学んだ語彙・文法・読解・ディクテ・フレーズをすべて復習しましょう。",
    dailyPhraseTitle: "今日のフレーズ",
    markPhraseLearned: "このフレーズを覚えた",
    markSpeakingPracticed: "このフレーズを練習した",
    planPageTitle: "ガイド付きプログラムの概要",
    planPageIntro: "毎週2つの新しいステージとその復習を学び、その後2日間の発展復習と総復習テストがあります。翌週は同じステージをもう一度しっかり復習してから次に進みます。",
    allCaughtUp: "おめでとうございます!現在のプログラムをすべて終えました!",
    viewFullPlan: "プログラム全体を見る",
    backToToday: "今日に戻る",
    newWordsToday: "今日の新しい単語",
    quizToday: "このステージの語彙復習クイズ",
    exploreTitle: "自分で探してみましょう",
    exploreIntro: "自分のペースで進めたいですか?セクションを選んで、すべてのレッスンを自由に見てみましょう。",
    browseIntro: "レッスンを選んで始めましょう。緑のチェック✓は完了したレッスンを示します。",
    journeyIntro: "ステップごとに進みましょう。各円が1つのレッスンで、✓は完了済みを示します。",
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
    finishSession: "レッスンを終了する ✓",
    nextArrowLabel: "次へ →",
    navStepDoneHint: "完了しました —「次へ」を押してください",
    navHintVocab: "矢印で単語を最後まで見ましょう",
    navHintVocabQuiz: "小テストに答えましょう",
    navHintGrammar: "レッスンを読んで「理解した」を押しましょう",
    navHintGrammarPractice: "練習問題をやりましょう",
    navHintReading: "文章を読んで質問に答えましょう",
    navHintDictation: "聞こえた文を書きましょう",
    navHintPhrase: "フレーズを聞いて繰り返しましょう",
    navHintSpeaking: "聞いてから録音しましょう",
    vocabReviewTitle: "総復習",
    vocabReviewLink: "覚えた単語をすべて復習する",
    vocabReviewNotEnough: "総復習をするには、まず4つ以上の単語を「わかる」ボタンで覚えましょう。",
    genderGameTitle: "ゲーム:le か la?",
    genderGameLink: "遊ぶ:le か la?",
    genderGameInstructions: "この名詞は男性(le)ですか、女性(la)ですか?",
    conjugationDrillTitle: "活用練習",
    conjugationDrillLink: "活用練習をする",
    conjugationDrillInstructions: "この主語に合う正しい動詞の形を選んでください。",
    sentenceBuilderTitle: "文を組み立てる",
    sentenceBuilderLink: "文を組み立てる",
    sentenceBuilderInstructions: "正しい順番で単語をタップして、文を組み立てましょう。",
    sentenceBuilderReset: "やり直す",
    sentenceBuilderCheck: "順番を確認する",
    readingModeTab: "読解",
    listeningModeTab: "リスニング",
    listeningInstructions: "文章を聞いて、質問に答えましょう。答えを確認するまで文章は表示されません。",
    revealTextButton: "文章を見る",
    phrasesNavLabel: "使えるフレーズ",
    phrasesTitle: "使えるフレーズ",
    phrasesIntro: "日常生活で使える実用的なフレーズをテーマ別にまとめました。順番は関係なく、いつでも見られます。",
    speakingNavLabel: "話す",
    speakingTitle: "話す",
    speakingIntro: "文章を聞いてから、繰り返して自分の声を録音しましょう。録音を再生して、ネイティブの発音と比べてみましょう。",
    recordButton: "録音する",
    stopRecordButton: "停止する",
    playRecordingButton: "録音を再生する",
    micNotSupported: "このブラウザは音声録音に対応していないか、マイクへのアクセスが拒否されました。",
    achievementsTitle: "実績",
    achievementsUnlocked: "個解除済み",
    streakLabel: "日連続",
    mascotWelcome: "こんにちは!今日もフランス語を始めましょう。ゆっくりいきましょうね。",
    mascotResume: "おかえりなさい!前回の続きから始めましょうか?",
    mascotStreak: "すごい、{n}日連続です!継続は力なりですね。",
    mascotGoalDone: "今日の目標を達成しました、おめでとうございます!続けても、明日また来てもOKです。",
    levelLabel: "レベル",
    dailyGoalLabel: "今日の目標:",
    goalDoneLabel: "今日の目標を達成!",
    levelUpTitle: "レベル",
    levelUpSub: "おめでとうございます、レベルアップしました!",
    goalReachedTitle: "目標達成!",
    goalReachedSub: "今日の目標を達成しました。この調子で続けましょう!",
    achFirstWord: "最初の一歩",
    achTenWords: "単語10個習得",
    achFiftyWords: "単語50個習得",
    achHundredWords: "単語100個習得",
    achTwoHundredWords: "単語200個習得",
    achFirstStage: "最初のステージ完了",
    achTenStages: "ステージ10個完了",
    achAllStages: "全コース完了!",
    achGrammarian: "文法マスター",
    achAvidReader: "読書家"
  }
};

let currentUiLang = 'fr';

function t(key) {
  return (UI_STRINGS[currentUiLang] && UI_STRINGS[currentUiLang][key]) || key;
}

// --------------------------------------------------------
// Traduction japonaise en ligne — un seul interrupteur, valable
// partout dans l'application (mots de vocabulaire, phrases,
// exemples, texte de lecture...). Quand le français est choisi
// comme langue de l'interface, tout s'affiche d'abord en français
// seul ; la traduction japonaise doit être révélée volontairement.
// En japonais, elle reste visible par défaut. Le mot français
// lui-même (et sa prononciation en kana) n'est jamais concerné :
// c'est le contenu à apprendre, il reste toujours affiché.
// --------------------------------------------------------
let translationVisible = true;

function setTranslationVisible(visible) {
  translationVisible = !!visible;
  document.body.classList.toggle('hide-translations', !translationVisible);
  document.querySelectorAll('.translation-toggle-btn').forEach(btn => {
    btn.textContent = translationVisible ? t('hideTranslation') : t('showTranslation');
    btn.setAttribute('aria-pressed', String(translationVisible));
  });
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
  // En français : tout s'affiche en français par défaut, traduction cachée.
  // En japonais : la traduction reste visible par défaut.
  setTranslationVisible(currentUiLang === 'ja');
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
