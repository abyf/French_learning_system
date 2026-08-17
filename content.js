// ============================================================
// Contenu pédagogique — Le Français facile (フランス語入門)
// Public cible : locuteurs japonais, niveau grand débutant.
// Toutes les explications/traductions sont en japonais (ja),
// le contenu appris (mots, phrases, textes) est toujours en français (fr).
// ============================================================

// --------------------------------------------------------
// Programme progressif (10 étapes)
// --------------------------------------------------------
const CURRICULUM = [
  { id: 's00', order: 1, titleFr: "L'alphabet français", titleJa: "フランス語のアルファベット", vocabId: 's00', grammarId: 'g00', readingId: 'r00', dictationIds: ['d00a', 'd00b'] },
  { id: 's01', order: 2, titleFr: "Bonjour ! Se présenter", titleJa: "こんにちは!自己紹介", vocabId: 's01', grammarId: 'g01', readingId: 'r01', dictationIds: ['d01a', 'd01b'] },
  { id: 's02', order: 3, titleFr: "Le verbe être", titleJa: "動詞 être(〜である)", vocabId: 's02', grammarId: 'g02', readingId: 'r02', dictationIds: ['d02a', 'd02b'] },
  { id: 's03', order: 4, titleFr: "Le verbe avoir et les nombres", titleJa: "動詞 avoir(持つ)と数字", vocabId: 's03', grammarId: 'g03', readingId: 'r03', dictationIds: ['d03a', 'd03b'] },
  { id: 's04', order: 5, titleFr: "Les articles et les objets", titleJa: "冠詞と身の回りの物", vocabId: 's04', grammarId: 'g04', readingId: 'r04', dictationIds: ['d04a', 'd04b'] },
  { id: 's05', order: 6, titleFr: "La famille", titleJa: "家族", vocabId: 's05', grammarId: 'g05', readingId: 'r05', dictationIds: ['d05a', 'd05b'] },
  { id: 's06', order: 7, titleFr: "La routine quotidienne", titleJa: "日常のルーティン", vocabId: 's06', grammarId: 'g06', readingId: 'r06', dictationIds: ['d06a', 'd06b'] },
  { id: 's07', order: 8, titleFr: "La nourriture", titleJa: "食べ物", vocabId: 's07', grammarId: 'g07', readingId: 'r07', dictationIds: ['d07a', 'd07b'] },
  { id: 's08', order: 9, titleFr: "L'heure et les jours", titleJa: "時間と曜日", vocabId: 's08', grammarId: 'g08', readingId: 'r08', dictationIds: ['d08a', 'd08b'] },
  { id: 's09', order: 10, titleFr: "Les courses et les questions", titleJa: "買い物と疑問詞", vocabId: 's09', grammarId: 'g09', readingId: 'r09', dictationIds: ['d09a', 'd09b'] },
  { id: 's10', order: 11, titleFr: "Le week-end dernier (passé composé)", titleJa: "先週末(複合過去)", vocabId: 's10', grammarId: 'g10', readingId: 'r10', dictationIds: ['d10a', 'd10b'] },
  { id: 's11', order: 12, titleFr: "Les nombres de 10 à 100", titleJa: "10から100までの数字", vocabId: 's11', grammarId: 'g11', readingId: 'r11', dictationIds: ['d11a', 'd11b'] },
  { id: 's12', order: 13, titleFr: "Description physique et caractère", titleJa: "外見と性格の描写", vocabId: 's12', grammarId: 'g12', readingId: 'r12', dictationIds: ['d12a', 'd12b'] },
  { id: 's13', order: 14, titleFr: "Les prépositions de lieu", titleJa: "場所の前置詞", vocabId: 's13', grammarId: 'g13', readingId: 'r13', dictationIds: ['d13a', 'd13b'] },
  { id: 's14', order: 15, titleFr: "L'impératif", titleJa: "命令形", vocabId: 's14', grammarId: 'g14', readingId: 'r14', dictationIds: ['d14a', 'd14b'] },
  { id: 's15', order: 16, titleFr: "Le futur proche", titleJa: "近接未来", vocabId: 's15', grammarId: 'g15', readingId: 'r15', dictationIds: ['d15a', 'd15b'] },
  { id: 's16', order: 17, titleFr: "Les vêtements et les couleurs", titleJa: "服と色", vocabId: 's16', grammarId: 'g16', readingId: 'r16', dictationIds: ['d16a', 'd16b'] },
  { id: 's17', order: 18, titleFr: "Les loisirs et le sport", titleJa: "趣味とスポーツ", vocabId: 's17', grammarId: 'g17', readingId: 'r17', dictationIds: ['d17a', 'd17b'] },
  { id: 's18', order: 19, titleFr: "Le corps et la santé", titleJa: "体と健康", vocabId: 's18', grammarId: 'g18', readingId: 'r18', dictationIds: ['d18a', 'd18b'] },
  { id: 's19', order: 20, titleFr: "Itinéraire et directions", titleJa: "道案内", vocabId: 's19', grammarId: 'g19', readingId: 'r19', dictationIds: ['d19a', 'd19b'] },
  { id: 's20', order: 21, titleFr: "Les saisons et la météo", titleJa: "季節と天気", vocabId: 's20', grammarId: 'g20', readingId: 'r20', dictationIds: ['d20a', 'd20b'] },
  { id: 's21', order: 22, titleFr: "Au téléphone", titleJa: "電話で", vocabId: 's21', grammarId: 'g21', readingId: 'r21', dictationIds: ['d21a', 'd21b'] },
  { id: 's22', order: 23, titleFr: "Les adverbes de fréquence", titleJa: "頻度の副詞", vocabId: 's22', grammarId: 'g22', readingId: 'r22', dictationIds: ['d22a', 'd22b'] },
  { id: 's23', order: 24, titleFr: "La négation étendue", titleJa: "拡張された否定形", vocabId: 's23', grammarId: 'g23', readingId: 'r23', dictationIds: ['d23a', 'd23b'] },
  { id: 's24', order: 25, titleFr: "Comparer", titleJa: "比較する", vocabId: 's24', grammarId: 'g24', readingId: 'r24', dictationIds: ['d24a', 'd24b'] },
  { id: 's25', order: 26, titleFr: "Les moyens de transport", titleJa: "交通手段", vocabId: 's25', grammarId: 'g25', readingId: 'r25', dictationIds: ['d25a', 'd25b'] },
  { id: 's26', order: 27, titleFr: "Faire des achats / à l'hôtel", titleJa: "買い物・ホテルで", vocabId: 's26', grammarId: 'g26', readingId: 'r26', dictationIds: ['d26a', 'd26b'] },
  { id: 's27', order: 28, titleFr: "Les fêtes et invitations", titleJa: "パーティーと招待", vocabId: 's27', grammarId: 'g27', readingId: 'r27', dictationIds: ['d27a', 'd27b'] },
  { id: 's28', order: 29, titleFr: "Parler du passé (mouvement)", titleJa: "過去を語る(移動動詞)", vocabId: 's28', grammarId: 'g28', readingId: 'r28', dictationIds: ['d28a', 'd28b'] },
  { id: 's29', order: 30, titleFr: "Révision générale", titleJa: "総復習", vocabId: 's29', grammarId: 'g29', readingId: 'r29', dictationIds: ['d29a', 'd29b'] }
];

// --------------------------------------------------------
// Vocabulaire (10 mots x 10 étapes)
// --------------------------------------------------------
const VOCAB_LESSONS = {
  s00: {
    titleFr: "L'alphabet français", titleJa: "フランス語のアルファベット",
    words: [
      { fr: "A", kana: "ア", ja: "文字 A", exampleFr: "A comme avion.", exampleJa: "A は avion(飛行機)の A。" },
      { fr: "B", kana: "ベ", ja: "文字 B", exampleFr: "B comme bonjour.", exampleJa: "B は bonjour(こんにちは)の B。" },
      { fr: "C", kana: "セ", ja: "文字 C", exampleFr: "C comme café.", exampleJa: "C は café(コーヒー)の C。" },
      { fr: "D", kana: "デ", ja: "文字 D", exampleFr: "D comme dimanche.", exampleJa: "D は dimanche(日曜日)の D。" },
      { fr: "E", kana: "ウ", ja: "文字 E", exampleFr: "E comme école.", exampleJa: "E は école(学校)の E。" },
      { fr: "F", kana: "エフ", ja: "文字 F", exampleFr: "F comme femme.", exampleJa: "F は femme(女性)の F。" },
      { fr: "G", kana: "ジェ", ja: "文字 G", exampleFr: "G comme gâteau.", exampleJa: "G は gâteau(ケーキ)の G。" },
      { fr: "H", kana: "アッシュ", ja: "文字 H(発音しない)", exampleFr: "H comme hôtel.", exampleJa: "H は hôtel(ホテル)の H(Hは発音しません)。" },
      { fr: "I", kana: "イ", ja: "文字 I", exampleFr: "I comme île.", exampleJa: "I は île(島)の I。" },
      { fr: "J", kana: "ジ", ja: "文字 J", exampleFr: "J comme jour.", exampleJa: "J は jour(日)の J。" },
      { fr: "K", kana: "カ", ja: "文字 K", exampleFr: "K comme kilo.", exampleJa: "K は kilo(キロ)の K。" },
      { fr: "L", kana: "エル", ja: "文字 L", exampleFr: "L comme lundi.", exampleJa: "L は lundi(月曜日)の L。" },
      { fr: "M", kana: "エム", ja: "文字 M", exampleFr: "M comme maison.", exampleJa: "M は maison(家)の M。" },
      { fr: "N", kana: "エヌ", ja: "文字 N", exampleFr: "N comme noir.", exampleJa: "N は noir(黒)の N。" },
      { fr: "O", kana: "オ", ja: "文字 O", exampleFr: "O comme orange.", exampleJa: "O は orange(オレンジ)の O。" },
      { fr: "P", kana: "ペ", ja: "文字 P", exampleFr: "P comme pain.", exampleJa: "P は pain(パン)の P。" },
      { fr: "Q", kana: "キュ", ja: "文字 Q", exampleFr: "Q comme quatre.", exampleJa: "Q は quatre(4)の Q。" },
      { fr: "R", kana: "エール", ja: "文字 R", exampleFr: "R comme rouge.", exampleJa: "R は rouge(赤)の R。" },
      { fr: "S", kana: "エス", ja: "文字 S", exampleFr: "S comme soleil.", exampleJa: "S は soleil(太陽)の S。" },
      { fr: "T", kana: "テ", ja: "文字 T", exampleFr: "T comme table.", exampleJa: "T は table(テーブル)の T。" },
      { fr: "U", kana: "ユ", ja: "文字 U", exampleFr: "U comme université.", exampleJa: "U は université(大学)の U。" },
      { fr: "V", kana: "ヴェ", ja: "文字 V", exampleFr: "V comme voiture.", exampleJa: "V は voiture(車)の V。" },
      { fr: "W", kana: "ドゥブルヴェ", ja: "文字 W", exampleFr: "W comme wagon.", exampleJa: "W は wagon(車両)の W。" },
      { fr: "X", kana: "イクス", ja: "文字 X", exampleFr: "X comme xylophone.", exampleJa: "X は xylophone(木琴)の X。" },
      { fr: "Y", kana: "イグレック", ja: "文字 Y", exampleFr: "Y comme yaourt.", exampleJa: "Y は yaourt(ヨーグルト)の Y。" },
      { fr: "Z", kana: "ゼッド", ja: "文字 Z", exampleFr: "Z comme zéro.", exampleJa: "Z は zéro(0)の Z。" }
    ]
  },
  s01: {
    titleFr: "Bonjour ! Se présenter", titleJa: "こんにちは!自己紹介",
    words: [
      { fr: "bonjour", kana: "ボンジュール", ja: "こんにちは、おはよう", exampleFr: "Bonjour, madame !", exampleJa: "こんにちは、マダム!" },
      { fr: "bonsoir", kana: "ボンソワール", ja: "こんばんは", exampleFr: "Bonsoir, tout le monde !", exampleJa: "みなさん、こんばんは!" },
      { fr: "salut", kana: "サリュ", ja: "やあ/バイバイ(親しい間で)", exampleFr: "Salut ! Comment ça va ?", exampleJa: "やあ!元気?" },
      { fr: "au revoir", kana: "オ・ルヴォワール", ja: "さようなら", exampleFr: "Au revoir, à bientôt !", exampleJa: "さようなら、また近いうちに!" },
      { fr: "merci", kana: "メルシー", ja: "ありがとう", exampleFr: "Merci beaucoup !", exampleJa: "どうもありがとう!" },
      { fr: "s'il vous plaît", kana: "シル・ヴ・プレ", ja: "お願いします(丁寧)", exampleFr: "Un café, s'il vous plaît.", exampleJa: "コーヒーを一つお願いします。" },
      { fr: "oui", kana: "ウィ", ja: "はい", exampleFr: "Oui, merci.", exampleJa: "はい、ありがとう。" },
      { fr: "non", kana: "ノン", ja: "いいえ", exampleFr: "Non, merci.", exampleJa: "いいえ、結構です。" },
      { fr: "pardon", kana: "パルドン", ja: "すみません", exampleFr: "Pardon, monsieur.", exampleJa: "すみません、ムッシュー。" },
      { fr: "comment ça va ?", kana: "コモン・サ・ヴァ", ja: "お元気ですか?", exampleFr: "Comment ça va ? — Ça va bien, merci.", exampleJa: "元気?— 元気だよ、ありがとう。" }
    ]
  },
  s02: {
    titleFr: "Le verbe être", titleJa: "動詞 être(〜である)",
    words: [
      { fr: "content(e)", kana: "コンタン(ト)", ja: "嬉しい、満足している", exampleFr: "Je suis content.", exampleJa: "私は嬉しいです。" },
      { fr: "fatigué(e)", kana: "ファティゲ", ja: "疲れた", exampleFr: "Il est fatigué ce soir.", exampleJa: "彼は今夜疲れています。" },
      { fr: "grand(e)", kana: "グラン(ド)", ja: "大きい、背が高い", exampleFr: "Tu es grand.", exampleJa: "あなたは背が高いです。" },
      { fr: "petit(e)", kana: "プティ(ト)", ja: "小さい", exampleFr: "La maison est petite.", exampleJa: "その家は小さいです。" },
      { fr: "étudiant(e)", kana: "エチュディアン(ト)", ja: "学生", exampleFr: "Je suis étudiant.", exampleJa: "私は学生です。" },
      { fr: "professeur", kana: "プロフェソール", ja: "先生", exampleFr: "Elle est professeur.", exampleJa: "彼女は先生です。" },
      { fr: "français(e)", kana: "フランセ(ーズ)", ja: "フランス人、フランス語の", exampleFr: "Il est français.", exampleJa: "彼はフランス人です。" },
      { fr: "japonais(e)", kana: "ジャポネ(ーズ)", ja: "日本人、日本語の", exampleFr: "Nous sommes japonais.", exampleJa: "私たちは日本人です。" },
      { fr: "ami(e)", kana: "アミ", ja: "友達", exampleFr: "C'est mon ami.", exampleJa: "これは私の友達です。" },
      { fr: "sympa", kana: "サンパ", ja: "親切な、いい人(くだけた言い方)", exampleFr: "Vous êtes très sympa.", exampleJa: "あなたたちはとても親切です。" }
    ]
  },
  s03: {
    titleFr: "Le verbe avoir et les nombres", titleJa: "動詞 avoir(持つ)と数字",
    words: [
      { fr: "zéro", kana: "ゼロ", ja: "0", exampleFr: "Il fait zéro degré.", exampleJa: "気温は0度です。" },
      { fr: "un / une", kana: "アン/ユヌ", ja: "1", exampleFr: "J'ai un frère.", exampleJa: "私には兄(弟)が一人います。" },
      { fr: "deux", kana: "ドゥ", ja: "2", exampleFr: "J'ai deux sœurs.", exampleJa: "私には姉(妹)が二人います。" },
      { fr: "trois", kana: "トロワ", ja: "3", exampleFr: "Il y a trois livres.", exampleJa: "本が3冊あります。" },
      { fr: "quatre", kana: "キャトル", ja: "4", exampleFr: "Nous avons quatre chats.", exampleJa: "私たちは猫を4匹飼っています。" },
      { fr: "cinq", kana: "サンク", ja: "5", exampleFr: "Il y a cinq chaises.", exampleJa: "椅子が5つあります。" },
      { fr: "six", kana: "シス", ja: "6", exampleFr: "Elle a six euros.", exampleJa: "彼女は6ユーロ持っています。" },
      { fr: "sept", kana: "セット", ja: "7", exampleFr: "Il y a sept jours dans une semaine.", exampleJa: "1週間には7日あります。" },
      { fr: "huit", kana: "ユイット", ja: "8", exampleFr: "J'ai huit livres.", exampleJa: "私は本を8冊持っています。" },
      { fr: "neuf", kana: "ヌフ", ja: "9", exampleFr: "Il est neuf heures.", exampleJa: "9時です。" }
    ]
  },
  s04: {
    titleFr: "Les articles et les objets", titleJa: "冠詞と身の回りの物",
    words: [
      { fr: "la table", kana: "ラ・ターブル", ja: "テーブル", exampleFr: "La table est grande.", exampleJa: "テーブルは大きいです。" },
      { fr: "la chaise", kana: "ラ・シェーズ", ja: "椅子", exampleFr: "La chaise est petite.", exampleJa: "椅子は小さいです。" },
      { fr: "le livre", kana: "ル・リーヴル", ja: "本", exampleFr: "Le livre est intéressant.", exampleJa: "この本は面白いです。" },
      { fr: "le stylo", kana: "ル・スティロ", ja: "ペン", exampleFr: "J'ai un stylo bleu.", exampleJa: "私は青いペンを持っています。" },
      { fr: "le sac", kana: "ル・サック", ja: "バッグ", exampleFr: "Le sac est sur la table.", exampleJa: "バッグはテーブルの上にあります。" },
      { fr: "l'ordinateur", kana: "ロルディナトゥール", ja: "パソコン", exampleFr: "L'ordinateur est nouveau.", exampleJa: "パソコンは新しいです。" },
      { fr: "le téléphone", kana: "ル・テレフォン", ja: "電話", exampleFr: "Mon téléphone est dans le sac.", exampleJa: "私の電話はバッグの中にあります。" },
      { fr: "la porte", kana: "ラ・ポルト", ja: "ドア", exampleFr: "La porte est fermée.", exampleJa: "ドアは閉まっています。" },
      { fr: "la fenêtre", kana: "ラ・フネートル", ja: "窓", exampleFr: "La fenêtre est ouverte.", exampleJa: "窓は開いています。" },
      { fr: "la maison", kana: "ラ・メゾン", ja: "家", exampleFr: "La maison est belle.", exampleJa: "家は綺麗です。" }
    ]
  },
  s05: {
    titleFr: "La famille", titleJa: "家族",
    words: [
      { fr: "le père", kana: "ル・ペール", ja: "父", exampleFr: "Mon père travaille beaucoup.", exampleJa: "私の父はよく働きます。" },
      { fr: "la mère", kana: "ラ・メール", ja: "母", exampleFr: "Ma mère est professeure.", exampleJa: "私の母は先生です。" },
      { fr: "le frère", kana: "ル・フレール", ja: "兄・弟", exampleFr: "J'ai un frère.", exampleJa: "私には兄(弟)がいます。" },
      { fr: "la sœur", kana: "ラ・スール", ja: "姉・妹", exampleFr: "Ma sœur est étudiante.", exampleJa: "私の姉(妹)は学生です。" },
      { fr: "le grand-père", kana: "ル・グランペール", ja: "祖父", exampleFr: "Mon grand-père a soixante ans.", exampleJa: "私の祖父は60歳です。" },
      { fr: "la grand-mère", kana: "ラ・グランメール", ja: "祖母", exampleFr: "Ma grand-mère habite à Lyon.", exampleJa: "私の祖母はリヨンに住んでいます。" },
      { fr: "le fils", kana: "ル・フィス", ja: "息子", exampleFr: "Leur fils s'appelle Tom.", exampleJa: "彼らの息子はトムという名前です。" },
      { fr: "la fille", kana: "ラ・フィーユ", ja: "娘、女の子", exampleFr: "Leur fille est petite.", exampleJa: "彼らの娘は小さいです。" },
      { fr: "le mari", kana: "ル・マリ", ja: "夫", exampleFr: "Son mari est gentil.", exampleJa: "彼女の夫は優しいです。" },
      { fr: "la femme", kana: "ラ・ファム", ja: "妻、女性", exampleFr: "Sa femme est médecin.", exampleJa: "彼の妻は医者です。" }
    ]
  },
  s06: {
    titleFr: "La routine quotidienne", titleJa: "日常のルーティン",
    words: [
      { fr: "parler", kana: "パルレ", ja: "話す", exampleFr: "Je parle français.", exampleJa: "私はフランス語を話します。" },
      { fr: "manger", kana: "マンジェ", ja: "食べる", exampleFr: "Nous mangeons à midi.", exampleJa: "私たちは正午に食べます。" },
      { fr: "habiter", kana: "アビテ", ja: "住む", exampleFr: "J'habite à Paris.", exampleJa: "私はパリに住んでいます。" },
      { fr: "travailler", kana: "トラヴァイエ", ja: "働く", exampleFr: "Il travaille le matin.", exampleJa: "彼は朝働きます。" },
      { fr: "aimer", kana: "エメ", ja: "好む、愛する", exampleFr: "J'aime le café.", exampleJa: "私はコーヒーが好きです。" },
      { fr: "écouter", kana: "エクテ", ja: "聞く", exampleFr: "Elle écoute de la musique.", exampleJa: "彼女は音楽を聞きます。" },
      { fr: "regarder", kana: "ルガルデ", ja: "見る", exampleFr: "Nous regardons la télévision.", exampleJa: "私たちはテレビを見ます。" },
      { fr: "étudier", kana: "エチュディエ", ja: "勉強する", exampleFr: "Tu étudies le français.", exampleJa: "あなたはフランス語を勉強します。" },
      { fr: "chanter", kana: "シャンテ", ja: "歌う", exampleFr: "Ils chantent bien.", exampleJa: "彼らは上手に歌います。" },
      { fr: "arriver", kana: "アリヴェ", ja: "到着する", exampleFr: "Le train arrive à huit heures.", exampleJa: "電車は8時に到着します。" }
    ]
  },
  s07: {
    titleFr: "La nourriture", titleJa: "食べ物",
    words: [
      { fr: "le pain", kana: "ル・パン", ja: "パン", exampleFr: "J'achète du pain.", exampleJa: "私はパンを買います。" },
      { fr: "l'eau", kana: "ロー", ja: "水", exampleFr: "Je voudrais de l'eau.", exampleJa: "水をお願いします。" },
      { fr: "le café", kana: "ル・カフェ", ja: "コーヒー", exampleFr: "Un café, s'il vous plaît.", exampleJa: "コーヒーを一つお願いします。" },
      { fr: "le lait", kana: "ル・レ", ja: "牛乳", exampleFr: "Je bois du lait.", exampleJa: "私は牛乳を飲みます。" },
      { fr: "le fromage", kana: "ル・フロマージュ", ja: "チーズ", exampleFr: "J'aime le fromage français.", exampleJa: "私はフランスのチーズが好きです。" },
      { fr: "la pomme", kana: "ラ・ポム", ja: "りんご", exampleFr: "Elle mange une pomme.", exampleJa: "彼女はりんごを食べます。" },
      { fr: "la viande", kana: "ラ・ヴィアンド", ja: "肉", exampleFr: "Nous mangeons de la viande.", exampleJa: "私たちは肉を食べます。" },
      { fr: "les légumes", kana: "レ・レギューム", ja: "野菜", exampleFr: "Il aime les légumes.", exampleJa: "彼は野菜が好きです。" },
      { fr: "le riz", kana: "ル・リ", ja: "米", exampleFr: "Au Japon, on mange du riz.", exampleJa: "日本では米を食べます。" },
      { fr: "le poisson", kana: "ル・ポワソン", ja: "魚", exampleFr: "Je voudrais du poisson.", exampleJa: "魚をお願いします。" }
    ]
  },
  s08: {
    titleFr: "L'heure et les jours", titleJa: "時間と曜日",
    words: [
      { fr: "lundi", kana: "ランディ", ja: "月曜日", exampleFr: "Aujourd'hui, c'est lundi.", exampleJa: "今日は月曜日です。" },
      { fr: "mardi", kana: "マルディ", ja: "火曜日", exampleFr: "Le cours est mardi.", exampleJa: "授業は火曜日です。" },
      { fr: "mercredi", kana: "メルクルディ", ja: "水曜日", exampleFr: "Je travaille mercredi.", exampleJa: "私は水曜日に働きます。" },
      { fr: "jeudi", kana: "ジュディ", ja: "木曜日", exampleFr: "Jeudi, j'ai un cours de musique.", exampleJa: "木曜日は音楽の授業があります。" },
      { fr: "vendredi", kana: "ヴァンドルディ", ja: "金曜日", exampleFr: "Vendredi soir, je sors avec des amis.", exampleJa: "金曜日の夜は友達と出かけます。" },
      { fr: "samedi", kana: "サムディ", ja: "土曜日", exampleFr: "Le samedi, je fais du sport.", exampleJa: "土曜日はスポーツをします。" },
      { fr: "dimanche", kana: "ディマンシュ", ja: "日曜日", exampleFr: "Le dimanche, je reste à la maison.", exampleJa: "日曜日は家にいます。" },
      { fr: "aujourd'hui", kana: "オジュルデュイ", ja: "今日", exampleFr: "Aujourd'hui, il fait beau.", exampleJa: "今日は天気が良いです。" },
      { fr: "demain", kana: "ドゥマン", ja: "明日", exampleFr: "Demain, c'est dimanche.", exampleJa: "明日は日曜日です。" },
      { fr: "hier", kana: "イエール", ja: "昨日", exampleFr: "Hier, j'ai étudié le français.", exampleJa: "昨日、私はフランス語を勉強しました。" }
    ]
  },
  s09: {
    titleFr: "Les courses et les questions", titleJa: "買い物と疑問詞",
    words: [
      { fr: "le magasin", kana: "ル・マガザン", ja: "お店", exampleFr: "Le magasin est fermé.", exampleJa: "店は閉まっています。" },
      { fr: "le prix", kana: "ル・プリ", ja: "価格", exampleFr: "Quel est le prix ?", exampleJa: "価格はいくらですか?" },
      { fr: "l'argent", kana: "ラルジャン", ja: "お金", exampleFr: "Je n'ai pas d'argent.", exampleJa: "私はお金がありません。" },
      { fr: "cher / chère", kana: "シェール", ja: "高い(値段)", exampleFr: "C'est trop cher.", exampleJa: "それは高すぎます。" },
      { fr: "bon marché", kana: "ボン・マルシェ", ja: "安い", exampleFr: "Ce sac est bon marché.", exampleJa: "このバッグは安いです。" },
      { fr: "acheter", kana: "アシュテ", ja: "買う", exampleFr: "J'achète une nouvelle robe.", exampleJa: "私は新しいドレスを買います。" },
      { fr: "le marché", kana: "ル・マルシェ", ja: "市場", exampleFr: "Nous allons au marché.", exampleJa: "私たちは市場に行きます。" },
      { fr: "les vêtements", kana: "レ・ヴェットモン", ja: "服", exampleFr: "J'aime ces vêtements.", exampleJa: "私はこの服が好きです。" },
      { fr: "les chaussures", kana: "レ・ショスュール", ja: "靴", exampleFr: "Mes chaussures sont neuves.", exampleJa: "私の靴は新しいです。" },
      { fr: "combien", kana: "コンビヤン", ja: "いくら、いくつ", exampleFr: "Combien ça coûte ?", exampleJa: "それはいくらですか?" }
    ]
  },
  s10: {
    titleFr: "Le week-end dernier", titleJa: "先週末",
    words: [
      { fr: "il fait beau", kana: "イル・フェ・ボー", ja: "天気が良い", exampleFr: "Aujourd'hui, il fait beau.", exampleJa: "今日は天気が良いです。" },
      { fr: "il pleut", kana: "イル・プルー", ja: "雨が降る", exampleFr: "Il pleut depuis ce matin.", exampleJa: "今朝から雨が降っています。" },
      { fr: "il fait froid", kana: "イル・フェ・フロワ", ja: "寒い", exampleFr: "En hiver, il fait froid.", exampleJa: "冬は寒いです。" },
      { fr: "il fait chaud", kana: "イル・フェ・ショー", ja: "暑い", exampleFr: "En été, il fait chaud.", exampleJa: "夏は暑いです。" },
      { fr: "la semaine dernière", kana: "ラ・スメーヌ・デルニエール", ja: "先週", exampleFr: "La semaine dernière, j'ai voyagé.", exampleJa: "先週、私は旅行しました。" },
      { fr: "le week-end dernier", kana: "ル・ウィークエンド・デルニエ", ja: "先週末", exampleFr: "Le week-end dernier, nous avons visité Paris.", exampleJa: "先週末、私たちはパリを訪れました。" },
      { fr: "un voyage", kana: "アン・ヴォワヤージュ", ja: "旅行", exampleFr: "J'aime les voyages.", exampleJa: "私は旅行が好きです。" },
      { fr: "les vacances", kana: "レ・ヴァカンス", ja: "休暇", exampleFr: "Les vacances sont finies.", exampleJa: "休暇は終わりました。" },
      { fr: "hier soir", kana: "イエール・ソワール", ja: "昨晩", exampleFr: "Hier soir, j'ai regardé un film.", exampleJa: "昨晩、私は映画を見ました。" },
      { fr: "beaucoup", kana: "ボクー", ja: "たくさん、とても", exampleFr: "J'ai beaucoup aimé ce voyage.", exampleJa: "私はこの旅行がとても気に入りました。" }
    ]
  },
  s11: {
    titleFr: "Les nombres de 10 à 100", titleJa: "10から100までの数字",
    words: [
      { fr: "dix", kana: "ディス", ja: "10", exampleFr: "J'ai dix ans.", exampleJa: "私は10歳です。" },
      { fr: "vingt", kana: "ヴァン", ja: "20", exampleFr: "Il y a vingt élèves.", exampleJa: "生徒が20人います。" },
      { fr: "trente", kana: "トラント", ja: "30", exampleFr: "Ça coûte trente euros.", exampleJa: "それは30ユーロです。" },
      { fr: "quarante", kana: "キャラント", ja: "40", exampleFr: "Il a quarante ans.", exampleJa: "彼は40歳です。" },
      { fr: "cinquante", kana: "サンカント", ja: "50", exampleFr: "Le livre coûte cinquante euros.", exampleJa: "その本は50ユーロです。" },
      { fr: "soixante", kana: "ソワサント", ja: "60", exampleFr: "Il y a soixante minutes dans une heure.", exampleJa: "1時間は60分です。" },
      { fr: "soixante-dix", kana: "ソワサント・ディス", ja: "70", exampleFr: "Ma grand-mère a soixante-dix ans.", exampleJa: "私の祖母は70歳です。" },
      { fr: "quatre-vingts", kana: "キャトル・ヴァン", ja: "80", exampleFr: "Il y a quatre-vingts pages.", exampleJa: "80ページあります。" },
      { fr: "quatre-vingt-dix", kana: "キャトル・ヴァン・ディス", ja: "90", exampleFr: "Mon grand-père a quatre-vingt-dix ans.", exampleJa: "私の祖父は90歳です。" },
      { fr: "cent", kana: "サン", ja: "100", exampleFr: "Ça coûte cent euros.", exampleJa: "それは100ユーロです。" }
    ]
  },
  s12: {
    titleFr: "Description physique et caractère", titleJa: "外見と性格の描写",
    words: [
      { fr: "les cheveux", kana: "レ・シュヴー", ja: "髪", exampleFr: "Elle a les cheveux longs.", exampleJa: "彼女は髪が長いです。" },
      { fr: "les yeux", kana: "レズュー", ja: "目", exampleFr: "Il a les yeux bleus.", exampleJa: "彼は青い目をしています。" },
      { fr: "mince", kana: "マンス", ja: "痩せている", exampleFr: "Mon frère est mince.", exampleJa: "私の兄(弟)は痩せています。" },
      { fr: "fort(e)", kana: "フォール(ト)", ja: "強い、たくましい", exampleFr: "Cet homme est fort.", exampleJa: "この男性は力強いです。" },
      { fr: "beau / belle", kana: "ボー/ベル", ja: "美しい、ハンサム", exampleFr: "Elle est très belle.", exampleJa: "彼女はとても美しいです。" },
      { fr: "drôle", kana: "ドロール", ja: "面白い、おかしい", exampleFr: "Mon ami est drôle.", exampleJa: "私の友達は面白いです。" },
      { fr: "timide", kana: "ティミッド", ja: "内気な", exampleFr: "Ma sœur est timide.", exampleJa: "私の姉(妹)は内気です。" },
      { fr: "intelligent(e)", kana: "アンテリジャン(ト)", ja: "賢い", exampleFr: "Il est très intelligent.", exampleJa: "彼はとても賢いです。" },
      { fr: "gentil / gentille", kana: "ジャンティ/ジャンティーユ", ja: "優しい", exampleFr: "Elle est gentille avec tout le monde.", exampleJa: "彼女はみんなに優しいです。" },
      { fr: "jeune", kana: "ジューヌ", ja: "若い", exampleFr: "Mon professeur est jeune.", exampleJa: "私の先生は若いです。" }
    ]
  },
  s13: {
    titleFr: "Les prépositions de lieu", titleJa: "場所の前置詞",
    words: [
      { fr: "à côté de", kana: "ア・コテ・ド", ja: "〜の隣に", exampleFr: "La boulangerie est à côté de la banque.", exampleJa: "パン屋は銀行の隣にあります。" },
      { fr: "entre", kana: "アントル", ja: "〜の間に", exampleFr: "Le chat est entre les deux chaises.", exampleJa: "猫は2つの椅子の間にいます。" },
      { fr: "sous", kana: "ス", ja: "〜の下に", exampleFr: "Le chat dort sous la table.", exampleJa: "猫はテーブルの下で寝ています。" },
      { fr: "sur", kana: "スュル", ja: "〜の上に", exampleFr: "Le livre est sur la table.", exampleJa: "本はテーブルの上にあります。" },
      { fr: "devant", kana: "ドゥヴァン", ja: "〜の前に", exampleFr: "La voiture est devant la maison.", exampleJa: "車は家の前にあります。" },
      { fr: "derrière", kana: "デリエール", ja: "〜の後ろに", exampleFr: "Le jardin est derrière la maison.", exampleJa: "庭は家の後ろにあります。" },
      { fr: "dans", kana: "ダン", ja: "〜の中に", exampleFr: "Les clés sont dans le sac.", exampleJa: "鍵はバッグの中にあります。" },
      { fr: "chez", kana: "シェ", ja: "〜の家で・に", exampleFr: "Je vais chez mon ami.", exampleJa: "私は友達の家に行きます。" },
      { fr: "loin de", kana: "ロワン・ド", ja: "〜から遠い", exampleFr: "L'école est loin de chez moi.", exampleJa: "学校は私の家から遠いです。" },
      { fr: "près de", kana: "プレ・ド", ja: "〜の近くに", exampleFr: "La gare est près de l'hôtel.", exampleJa: "駅はホテルの近くにあります。" }
    ]
  },
  s14: {
    titleFr: "L'impératif", titleJa: "命令形",
    words: [
      { fr: "viens", kana: "ヴィヤン", ja: "来て(命令形)", exampleFr: "Viens ici !", exampleJa: "ここに来て!" },
      { fr: "va", kana: "ヴァ", ja: "行って(命令形)", exampleFr: "Va à l'école !", exampleJa: "学校に行きなさい!" },
      { fr: "fais", kana: "フェ", ja: "して(命令形)", exampleFr: "Fais tes devoirs !", exampleJa: "宿題をしなさい!" },
      { fr: "prends", kana: "プラン", ja: "取って(命令形)", exampleFr: "Prends ton parapluie !", exampleJa: "傘を持って行きなさい!" },
      { fr: "regarde", kana: "ルガルド", ja: "見て(命令形)", exampleFr: "Regarde ça !", exampleJa: "これを見て!" },
      { fr: "écoute", kana: "エクート", ja: "聞いて(命令形)", exampleFr: "Écoute bien !", exampleJa: "よく聞いて!" },
      { fr: "attends", kana: "アタン", ja: "待って(命令形)", exampleFr: "Attends une minute !", exampleJa: "ちょっと待って!" },
      { fr: "ouvre", kana: "ウーヴル", ja: "開けて(命令形)", exampleFr: "Ouvre la porte !", exampleJa: "ドアを開けて!" },
      { fr: "ferme", kana: "フェルム", ja: "閉めて(命令形)", exampleFr: "Ferme la fenêtre !", exampleJa: "窓を閉めて!" },
      { fr: "arrête", kana: "アレット", ja: "止めて(命令形)", exampleFr: "Arrête, s'il te plaît !", exampleJa: "お願い、やめて!" }
    ]
  },
  s15: {
    titleFr: "Le futur proche", titleJa: "近接未来",
    words: [
      { fr: "demain", kana: "ドゥマン", ja: "明日", exampleFr: "Je vais partir demain.", exampleJa: "私は明日出発します。" },
      { fr: "la semaine prochaine", kana: "ラ・スメーヌ・プロシェーヌ", ja: "来週", exampleFr: "Nous allons voyager la semaine prochaine.", exampleJa: "私たちは来週旅行します。" },
      { fr: "bientôt", kana: "ビヤント", ja: "すぐに、間もなく", exampleFr: "Il va arriver bientôt.", exampleJa: "彼はすぐに到着します。" },
      { fr: "ce soir", kana: "ス・ソワール", ja: "今晩", exampleFr: "Je vais cuisiner ce soir.", exampleJa: "私は今晩料理をします。" },
      { fr: "l'année prochaine", kana: "ラネ・プロシェーヌ", ja: "来年", exampleFr: "Elle va étudier en France l'année prochaine.", exampleJa: "彼女は来年フランスで勉強します。" },
      { fr: "plus tard", kana: "プリュ・タール", ja: "後で", exampleFr: "On va se voir plus tard.", exampleJa: "後で会いましょう。" },
      { fr: "tout de suite", kana: "トゥ・ドゥ・スュイット", ja: "すぐに", exampleFr: "Je vais le faire tout de suite.", exampleJa: "私はすぐにそれをします。" },
      { fr: "dans deux jours", kana: "ダン・ドゥ・ジュール", ja: "2日後に", exampleFr: "Ils vont revenir dans deux jours.", exampleJa: "彼らは2日後に戻ります。" },
      { fr: "après", kana: "アプレ", ja: "その後", exampleFr: "Nous allons manger, après nous allons sortir.", exampleJa: "私たちは食べて、その後出かけます。" },
      { fr: "ensuite", kana: "アンスュイット", ja: "それから", exampleFr: "Je vais me laver, ensuite je vais dormir.", exampleJa: "私は体を洗って、それから寝ます。" }
    ]
  },
  s16: {
    titleFr: "Les vêtements et les couleurs", titleJa: "服と色",
    words: [
      { fr: "une chemise", kana: "ユヌ・シュミーズ", ja: "シャツ", exampleFr: "Il porte une chemise blanche.", exampleJa: "彼は白いシャツを着ています。" },
      { fr: "un pantalon", kana: "アン・パンタロン", ja: "ズボン", exampleFr: "Mon pantalon est noir.", exampleJa: "私のズボンは黒いです。" },
      { fr: "une robe", kana: "ユヌ・ロブ", ja: "ドレス", exampleFr: "Elle porte une belle robe rouge.", exampleJa: "彼女は美しい赤いドレスを着ています。" },
      { fr: "des chaussettes", kana: "デ・ショセット", ja: "靴下", exampleFr: "Mes chaussettes sont bleues.", exampleJa: "私の靴下は青いです。" },
      { fr: "un manteau", kana: "アン・マント", ja: "コート", exampleFr: "Il fait froid, prends ton manteau.", exampleJa: "寒いから、コートを持って行って。" },
      { fr: "rouge", kana: "ルージュ", ja: "赤い", exampleFr: "J'aime la couleur rouge.", exampleJa: "私は赤色が好きです。" },
      { fr: "bleu(e)", kana: "ブルー", ja: "青い", exampleFr: "Le ciel est bleu.", exampleJa: "空は青いです。" },
      { fr: "vert(e)", kana: "ヴェール(ト)", ja: "緑の", exampleFr: "L'herbe est verte.", exampleJa: "草は緑です。" },
      { fr: "noir(e)", kana: "ノワール", ja: "黒い", exampleFr: "Son sac est noir.", exampleJa: "彼女のバッグは黒いです。" },
      { fr: "blanc / blanche", kana: "ブラン/ブランシュ", ja: "白い", exampleFr: "La neige est blanche.", exampleJa: "雪は白いです。" }
    ]
  },
  s17: {
    titleFr: "Les loisirs et le sport", titleJa: "趣味とスポーツ",
    words: [
      { fr: "faire du sport", kana: "フェール・デュ・スポール", ja: "スポーツをする", exampleFr: "Je fais du sport le week-end.", exampleJa: "私は週末にスポーツをします。" },
      { fr: "jouer au foot", kana: "ジュエ・オ・フット", ja: "サッカーをする", exampleFr: "Il joue au foot avec ses amis.", exampleJa: "彼は友達とサッカーをします。" },
      { fr: "jouer au tennis", kana: "ジュエ・オ・テニス", ja: "テニスをする", exampleFr: "Elle joue au tennis tous les samedis.", exampleJa: "彼女は毎週土曜日にテニスをします。" },
      { fr: "la natation", kana: "ラ・ナタシオン", ja: "水泳", exampleFr: "J'aime la natation.", exampleJa: "私は水泳が好きです。" },
      { fr: "le vélo", kana: "ル・ヴェロ", ja: "自転車", exampleFr: "Je fais du vélo chaque matin.", exampleJa: "私は毎朝サイクリングをします。" },
      { fr: "lire", kana: "リール", ja: "読む", exampleFr: "J'aime lire des romans.", exampleJa: "私は小説を読むのが好きです。" },
      { fr: "dessiner", kana: "デシネ", ja: "描く", exampleFr: "Ma sœur aime dessiner.", exampleJa: "私の姉(妹)は絵を描くのが好きです。" },
      { fr: "les jeux vidéo", kana: "レ・ジュー・ヴィデオ", ja: "テレビゲーム", exampleFr: "Mon frère joue aux jeux vidéo.", exampleJa: "私の兄(弟)はテレビゲームをします。" },
      { fr: "voyager", kana: "ヴォワヤジェ", ja: "旅行する", exampleFr: "Nous aimons voyager ensemble.", exampleJa: "私たちは一緒に旅行するのが好きです。" },
      { fr: "la photographie", kana: "ラ・フォトグラフィ", ja: "写真", exampleFr: "La photographie est ma passion.", exampleJa: "写真は私の情熱です。" }
    ]
  },
  s18: {
    titleFr: "Le corps et la santé", titleJa: "体と健康",
    words: [
      { fr: "la tête", kana: "ラ・テット", ja: "頭", exampleFr: "J'ai mal à la tête.", exampleJa: "私は頭が痛いです。" },
      { fr: "le ventre", kana: "ル・ヴァントル", ja: "お腹", exampleFr: "Mon ventre me fait mal.", exampleJa: "お腹が痛いです。" },
      { fr: "la gorge", kana: "ラ・ゴルジュ", ja: "喉", exampleFr: "J'ai mal à la gorge.", exampleJa: "喉が痛いです。" },
      { fr: "le dos", kana: "ル・ド", ja: "背中", exampleFr: "Il a mal au dos.", exampleJa: "彼は背中が痛いです。" },
      { fr: "la main", kana: "ラ・マン", ja: "手", exampleFr: "Elle s'est blessée à la main.", exampleJa: "彼女は手を怪我しました。" },
      { fr: "avoir mal à", kana: "アヴォワール・マル・ア", ja: "〜が痛い", exampleFr: "J'ai mal aux pieds.", exampleJa: "足が痛いです。" },
      { fr: "être malade", kana: "エートル・マラード", ja: "病気である", exampleFr: "Mon fils est malade aujourd'hui.", exampleJa: "私の息子は今日病気です。" },
      { fr: "un médecin", kana: "アン・メドサン", ja: "医者", exampleFr: "Je vais chez le médecin.", exampleJa: "私は医者に行きます。" },
      { fr: "une pharmacie", kana: "ユヌ・ファルマシー", ja: "薬局", exampleFr: "La pharmacie est fermée le dimanche.", exampleJa: "薬局は日曜日は閉まっています。" },
      { fr: "un médicament", kana: "アン・メディカマン", ja: "薬", exampleFr: "Prends ce médicament après le repas.", exampleJa: "食後にこの薬を飲んで。" }
    ]
  },
  s19: {
    titleFr: "Itinéraire et directions", titleJa: "道案内",
    words: [
      { fr: "tournez à droite", kana: "トゥルネ・ア・ドロワット", ja: "右に曲がってください", exampleFr: "Tournez à droite au carrefour.", exampleJa: "交差点で右に曲がってください。" },
      { fr: "tournez à gauche", kana: "トゥルネ・ア・ゴーシュ", ja: "左に曲がってください", exampleFr: "Tournez à gauche après le pont.", exampleJa: "橋の後、左に曲がってください。" },
      { fr: "continuez tout droit", kana: "コンティニュエ・トゥ・ドロワ", ja: "直進してください", exampleFr: "Continuez tout droit jusqu'au feu.", exampleJa: "信号まで直進してください。" },
      { fr: "traversez", kana: "トラヴェルセ", ja: "渡ってください", exampleFr: "Traversez la rue ici.", exampleJa: "ここで道を渡ってください。" },
      { fr: "le feu rouge", kana: "ル・フー・ルージュ", ja: "赤信号", exampleFr: "Arrêtez-vous au feu rouge.", exampleJa: "赤信号で止まってください。" },
      { fr: "le carrefour", kana: "ル・キャルフール", ja: "交差点", exampleFr: "L'école est près du carrefour.", exampleJa: "学校は交差点の近くです。" },
      { fr: "au bout de la rue", kana: "オ・ブ・ド・ラ・リュ", ja: "道の終わりに", exampleFr: "La banque est au bout de la rue.", exampleJa: "銀行は道の終わりにあります。" },
      { fr: "en face de", kana: "アン・ファス・ド", ja: "〜の向かいに", exampleFr: "Le café est en face de la gare.", exampleJa: "カフェは駅の向かいにあります。" },
      { fr: "la station de métro", kana: "ラ・スタシオン・ド・メトロ", ja: "地下鉄の駅", exampleFr: "La station de métro est fermée.", exampleJa: "地下鉄の駅は閉まっています。" },
      { fr: "l'arrêt de bus", kana: "ラレ・ド・ビュス", ja: "バス停", exampleFr: "L'arrêt de bus est là-bas.", exampleJa: "バス停はあそこです。" }
    ]
  },
  s20: {
    titleFr: "Les saisons et la météo", titleJa: "季節と天気",
    words: [
      { fr: "le printemps", kana: "ル・プランタン", ja: "春", exampleFr: "Au printemps, les fleurs poussent.", exampleJa: "春には花が咲きます。" },
      { fr: "l'été", kana: "レテ", ja: "夏", exampleFr: "En été, il fait très chaud.", exampleJa: "夏はとても暑いです。" },
      { fr: "l'automne", kana: "ロトンヌ", ja: "秋", exampleFr: "En automne, les feuilles tombent.", exampleJa: "秋には葉が落ちます。" },
      { fr: "l'hiver", kana: "リヴェール", ja: "冬", exampleFr: "En hiver, il fait froid.", exampleJa: "冬は寒いです。" },
      { fr: "il neige", kana: "イル・ネージュ", ja: "雪が降る", exampleFr: "Il neige beaucoup en hiver.", exampleJa: "冬にはたくさん雪が降ります。" },
      { fr: "il y a du soleil", kana: "イリヤ・デュ・ソレイユ", ja: "晴れている", exampleFr: "Aujourd'hui, il y a du soleil.", exampleJa: "今日は晴れています。" },
      { fr: "il y a du vent", kana: "イリヤ・デュ・ヴァン", ja: "風がある", exampleFr: "Il y a du vent aujourd'hui.", exampleJa: "今日は風があります。" },
      { fr: "nuageux", kana: "ニュアジュー", ja: "曇りの", exampleFr: "Le ciel est nuageux ce matin.", exampleJa: "今朝は曇っています。" },
      { fr: "la température", kana: "ラ・タンペラチュール", ja: "気温", exampleFr: "La température monte en été.", exampleJa: "夏は気温が上がります。" },
      { fr: "un parapluie", kana: "アン・パラプリュイ", ja: "傘", exampleFr: "Prends un parapluie, il va pleuvoir.", exampleJa: "傘を持って、雨が降りそうだから。" }
    ]
  },
  s21: {
    titleFr: "Au téléphone", titleJa: "電話で",
    words: [
      { fr: "allô", kana: "アロ", ja: "もしもし", exampleFr: "Allô, qui est à l'appareil ?", exampleJa: "もしもし、どちら様ですか?" },
      { fr: "un numéro de téléphone", kana: "アン・ニュメロ・ド・テレフォン", ja: "電話番号", exampleFr: "Quel est votre numéro de téléphone ?", exampleJa: "あなたの電話番号は何ですか?" },
      { fr: "rappeler", kana: "ラプレ", ja: "電話をかけ直す", exampleFr: "Je vais te rappeler plus tard.", exampleJa: "後でまた電話するね。" },
      { fr: "laisser un message", kana: "レセ・アン・メサージュ", ja: "メッセージを残す", exampleFr: "Vous pouvez laisser un message.", exampleJa: "メッセージを残せます。" },
      { fr: "occupé(e)", kana: "オキュペ", ja: "話し中、忙しい", exampleFr: "La ligne est occupée.", exampleJa: "電話中です。" },
      { fr: "raccrocher", kana: "ラクロシェ", ja: "電話を切る", exampleFr: "Elle a raccroché rapidement.", exampleJa: "彼女はすぐに電話を切りました。" },
      { fr: "décrocher", kana: "デクロシェ", ja: "電話に出る", exampleFr: "Il n'a pas décroché.", exampleJa: "彼は電話に出ませんでした。" },
      { fr: "patienter", kana: "パシヤンテ", ja: "少し待つ", exampleFr: "Patientez un instant, s'il vous plaît.", exampleJa: "少しお待ちください。" },
      { fr: "un portable", kana: "アン・ポルタブル", ja: "携帯電話", exampleFr: "J'ai oublié mon portable.", exampleJa: "携帯電話を忘れました。" },
      { fr: "sonner", kana: "ソネ", ja: "(電話が)鳴る", exampleFr: "Le téléphone sonne.", exampleJa: "電話が鳴っています。" }
    ]
  },
  s22: {
    titleFr: "Les adverbes de fréquence", titleJa: "頻度の副詞",
    words: [
      { fr: "toujours", kana: "トゥジュール", ja: "いつも", exampleFr: "Je me lève toujours à sept heures.", exampleJa: "私はいつも7時に起きます。" },
      { fr: "souvent", kana: "ソヴァン", ja: "よく", exampleFr: "Il pleut souvent en avril.", exampleJa: "4月はよく雨が降ります。" },
      { fr: "parfois", kana: "パルフォワ", ja: "時々", exampleFr: "Parfois, je mange au restaurant.", exampleJa: "時々レストランで食事をします。" },
      { fr: "rarement", kana: "ラールマン", ja: "まれに", exampleFr: "Je vais rarement au cinéma.", exampleJa: "私はまれに映画館に行きます。" },
      { fr: "jamais", kana: "ジャメ", ja: "一度も(ne...jamais)", exampleFr: "Je ne fume jamais.", exampleJa: "私は絶対にタバコを吸いません。" },
      { fr: "tous les jours", kana: "トゥ・レ・ジュール", ja: "毎日", exampleFr: "Il étudie tous les jours.", exampleJa: "彼は毎日勉強します。" },
      { fr: "une fois par semaine", kana: "ユヌ・フォワ・パール・スメーヌ", ja: "週に1回", exampleFr: "Je fais du sport une fois par semaine.", exampleJa: "私は週に1回スポーツをします。" },
      { fr: "de temps en temps", kana: "ドゥ・タン・アン・タン", ja: "時々", exampleFr: "De temps en temps, on va à la plage.", exampleJa: "時々、私たちは海に行きます。" },
      { fr: "chaque matin", kana: "シャック・マタン", ja: "毎朝", exampleFr: "Chaque matin, je bois du café.", exampleJa: "毎朝コーヒーを飲みます。" },
      { fr: "d'habitude", kana: "ダビチュード", ja: "普段は", exampleFr: "D'habitude, je dîne à vingt heures.", exampleJa: "普段は20時に夕食をとります。" }
    ]
  },
  s23: {
    titleFr: "La négation étendue", titleJa: "拡張された否定形",
    words: [
      { fr: "rien", kana: "リヤン", ja: "何も(ne...rien)", exampleFr: "Je ne vois rien.", exampleJa: "私は何も見えません。" },
      { fr: "personne", kana: "ペルソンヌ", ja: "誰も(ne...personne)", exampleFr: "Il n'y a personne ici.", exampleJa: "ここには誰もいません。" },
      { fr: "plus", kana: "プリュ", ja: "もう〜ない(ne...plus)", exampleFr: "Je n'ai plus faim.", exampleJa: "もうお腹が空いていません。" },
      { fr: "que", kana: "ク", ja: "〜しか(ne...que)", exampleFr: "Je n'ai que dix euros.", exampleJa: "私は10ユーロしかありません。" },
      { fr: "quelqu'un", kana: "ケルカン", ja: "誰か", exampleFr: "Quelqu'un a téléphoné.", exampleJa: "誰かが電話しました。" },
      { fr: "quelque chose", kana: "ケルク・ショーズ", ja: "何か", exampleFr: "Je veux manger quelque chose.", exampleJa: "何か食べたいです。" },
      { fr: "encore", kana: "アンコール", ja: "まだ、再び", exampleFr: "Il pleut encore.", exampleJa: "まだ雨が降っています。" },
      { fr: "déjà", kana: "デジャ", ja: "すでに", exampleFr: "J'ai déjà fini.", exampleJa: "もう終わりました。" },
      { fr: "nulle part", kana: "ニュル・パール", ja: "どこにも(ne...nulle part)", exampleFr: "Je ne vais nulle part ce week-end.", exampleJa: "今週末はどこにも行きません。" },
      { fr: "aucun(e)", kana: "オキュン", ja: "どの〜も(ne...aucun)", exampleFr: "Je n'ai aucune idée.", exampleJa: "全く分かりません。" }
    ]
  },
  s24: {
    titleFr: "Comparer", titleJa: "比較する",
    words: [
      { fr: "plus...que", kana: "プリュ・ク", ja: "〜より多く", exampleFr: "Elle est plus grande que moi.", exampleJa: "彼女は私より背が高いです。" },
      { fr: "moins...que", kana: "モワン・ク", ja: "〜より少なく", exampleFr: "Ce livre est moins cher que l'autre.", exampleJa: "この本はもう一方より安いです。" },
      { fr: "aussi...que", kana: "オシ・ク", ja: "〜と同じくらい", exampleFr: "Il est aussi intelligent que son frère.", exampleJa: "彼は兄(弟)と同じくらい賢いです。" },
      { fr: "meilleur(e)", kana: "メイユール", ja: "より良い", exampleFr: "Ce restaurant est meilleur que l'autre.", exampleJa: "このレストランはもう一方より良いです。" },
      { fr: "pire", kana: "ピール", ja: "より悪い", exampleFr: "La situation est pire qu'avant.", exampleJa: "状況は以前より悪いです。" },
      { fr: "le / la plus", kana: "ル/ラ・プリュ", ja: "最も(最上級)", exampleFr: "C'est le plus grand bâtiment de la ville.", exampleJa: "それは市で最も大きい建物です。" },
      { fr: "le / la moins", kana: "ル/ラ・モワン", ja: "最も少ない", exampleFr: "C'est la moins chère des trois.", exampleJa: "それは3つの中で最も安いです。" },
      { fr: "autant que", kana: "オタン・ク", ja: "〜と同じ量", exampleFr: "Il travaille autant que moi.", exampleJa: "彼は私と同じくらい働きます。" },
      { fr: "différent(e)", kana: "ディフェラン(ト)", ja: "異なる", exampleFr: "Nos opinions sont différentes.", exampleJa: "私たちの意見は異なります。" },
      { fr: "pareil / pareille", kana: "パレイユ", ja: "同じような", exampleFr: "Les deux robes sont pareilles.", exampleJa: "その2つのドレスは同じようなものです。" }
    ]
  },
  s25: {
    titleFr: "Les moyens de transport", titleJa: "交通手段",
    words: [
      { fr: "le train", kana: "ル・トラン", ja: "電車", exampleFr: "Je prends le train pour aller au travail.", exampleJa: "私は仕事に行くために電車に乗ります。" },
      { fr: "l'avion", kana: "ラヴィオン", ja: "飛行機", exampleFr: "Nous voyageons en avion.", exampleJa: "私たちは飛行機で旅行します。" },
      { fr: "le bus", kana: "ル・ビュス", ja: "バス", exampleFr: "Le bus arrive à huit heures.", exampleJa: "バスは8時に到着します。" },
      { fr: "le métro", kana: "ル・メトロ", ja: "地下鉄", exampleFr: "Je vais au centre-ville en métro.", exampleJa: "私は地下鉄で中心街に行きます。" },
      { fr: "la voiture", kana: "ラ・ヴォワチュール", ja: "車", exampleFr: "Il conduit sa voiture tous les jours.", exampleJa: "彼は毎日車を運転します。" },
      { fr: "à pied", kana: "ア・ピエ", ja: "歩いて", exampleFr: "J'aime aller au travail à pied.", exampleJa: "私は歩いて仕事に行くのが好きです。" },
      { fr: "le taxi", kana: "ル・タクシー", ja: "タクシー", exampleFr: "Prenons un taxi, il pleut.", exampleJa: "タクシーに乗りましょう、雨が降っているから。" },
      { fr: "le bateau", kana: "ル・バトー", ja: "船", exampleFr: "Ils traversent la mer en bateau.", exampleJa: "彼らは船で海を渡ります。" },
      { fr: "un billet", kana: "アン・ビエ", ja: "切符", exampleFr: "J'ai acheté un billet de train.", exampleJa: "私は電車の切符を買いました。" },
      { fr: "une gare", kana: "ユヌ・ガール", ja: "駅(電車)", exampleFr: "La gare est très grande.", exampleJa: "その駅はとても大きいです。" }
    ]
  },
  s26: {
    titleFr: "Faire des achats / à l'hôtel", titleJa: "買い物・ホテルで",
    words: [
      { fr: "réserver", kana: "レゼルヴェ", ja: "予約する", exampleFr: "Je voudrais réserver une chambre.", exampleJa: "部屋を予約したいです。" },
      { fr: "une chambre", kana: "ユヌ・シャンブル", ja: "部屋", exampleFr: "La chambre est très propre.", exampleJa: "その部屋はとても清潔です。" },
      { fr: "la réception", kana: "ラ・レセプシオン", ja: "フロント", exampleFr: "La réception est ouverte vingt-quatre heures.", exampleJa: "フロントは24時間開いています。" },
      { fr: "complet / complète", kana: "コンプレ/コンプレット", ja: "満室、満員", exampleFr: "L'hôtel est complet ce soir.", exampleJa: "そのホテルは今夜満室です。" },
      { fr: "la clé", kana: "ラ・クレ", ja: "鍵", exampleFr: "Voici la clé de votre chambre.", exampleJa: "これがあなたの部屋の鍵です。" },
      { fr: "le petit-déjeuner inclus", kana: "ル・プティ・デジュネ・アンクリュ", ja: "朝食付き", exampleFr: "Le petit-déjeuner est inclus dans le prix.", exampleJa: "朝食は料金に含まれています。" },
      { fr: "payer", kana: "ペイエ", ja: "払う", exampleFr: "Comment voulez-vous payer ?", exampleJa: "どのようにお支払いになりますか?" },
      { fr: "la carte de crédit", kana: "ラ・キャルト・ド・クレディ", ja: "クレジットカード", exampleFr: "Je paie par carte de crédit.", exampleJa: "クレジットカードで支払います。" },
      { fr: "l'addition", kana: "ラディシオン", ja: "お会計(レストラン)", exampleFr: "L'addition, s'il vous plaît.", exampleJa: "お会計をお願いします。" },
      { fr: "un reçu", kana: "アン・ルスュ", ja: "レシート", exampleFr: "Pouvez-vous me donner un reçu ?", exampleJa: "レシートをいただけますか?" }
    ]
  },
  s27: {
    titleFr: "Les fêtes et invitations", titleJa: "パーティーと招待",
    words: [
      { fr: "un anniversaire", kana: "アン・アニヴェルセール", ja: "誕生日", exampleFr: "C'est mon anniversaire aujourd'hui.", exampleJa: "今日は私の誕生日です。" },
      { fr: "inviter", kana: "アンヴィテ", ja: "招待する", exampleFr: "Je t'invite à ma fête.", exampleJa: "パーティーに招待するね。" },
      { fr: "la fête", kana: "ラ・フェット", ja: "パーティー、祝日", exampleFr: "La fête commence à dix-neuf heures.", exampleJa: "パーティーは19時に始まります。" },
      { fr: "un cadeau", kana: "アン・キャドー", ja: "プレゼント", exampleFr: "J'ai un cadeau pour toi.", exampleJa: "あなたへのプレゼントがあります。" },
      { fr: "féliciter", kana: "フェリシテ", ja: "祝う、祝福する", exampleFr: "Je te félicite pour ton succès.", exampleJa: "あなたの成功をお祝いします。" },
      { fr: "accepter", kana: "アクセプテ", ja: "受け入れる", exampleFr: "J'accepte ton invitation avec plaisir.", exampleJa: "喜んで招待を受けます。" },
      { fr: "refuser", kana: "ルフュゼ", ja: "断る", exampleFr: "Je dois refuser, je suis occupé.", exampleJa: "忙しいので、お断りしなければなりません。" },
      { fr: "célébrer", kana: "セレブレ", ja: "祝う", exampleFr: "Nous allons célébrer son anniversaire.", exampleJa: "彼(彼女)の誕生日をお祝いします。" },
      { fr: "joyeux anniversaire", kana: "ジョワユー・アニヴェルセール", ja: "誕生日おめでとう", exampleFr: "Joyeux anniversaire, Marie !", exampleJa: "誕生日おめでとう、マリー!" },
      { fr: "se retrouver", kana: "ス・ルトルヴェ", ja: "再会する、集まる", exampleFr: "On se retrouve chez moi à huit heures.", exampleJa: "8時に私の家で集まりましょう。" }
    ]
  },
  s28: {
    titleFr: "Parler du passé (mouvement)", titleJa: "過去を語る(移動動詞)",
    words: [
      { fr: "aller", kana: "アレ", ja: "行く", exampleFr: "Elle est allée à Paris.", exampleJa: "彼女はパリに行きました。" },
      { fr: "venir", kana: "ヴニール", ja: "来る", exampleFr: "Il est venu chez moi hier.", exampleJa: "彼は昨日私の家に来ました。" },
      { fr: "partir", kana: "パルティール", ja: "出発する", exampleFr: "Nous sommes partis tôt.", exampleJa: "私たちは早く出発しました。" },
      { fr: "revenir", kana: "ルヴニール", ja: "戻ってくる", exampleFr: "Elle est revenue à minuit.", exampleJa: "彼女は深夜に戻ってきました。" },
      { fr: "entrer", kana: "アントレ", ja: "入る", exampleFr: "Il est entré dans la salle.", exampleJa: "彼は部屋に入りました。" },
      { fr: "sortir", kana: "ソルティール", ja: "出る", exampleFr: "Elles sont sorties ensemble.", exampleJa: "彼女たちは一緒に出かけました。" },
      { fr: "monter", kana: "モンテ", ja: "上る、乗る", exampleFr: "Nous sommes montés au sommet.", exampleJa: "私たちは頂上まで登りました。" },
      { fr: "descendre", kana: "デサンドル", ja: "下る、降りる", exampleFr: "Il est descendu du train.", exampleJa: "彼は電車から降りました。" },
      { fr: "rester", kana: "レステ", ja: "留まる", exampleFr: "Je suis resté à la maison.", exampleJa: "私は家に留まりました。" },
      { fr: "tomber", kana: "トンベ", ja: "落ちる、倒れる", exampleFr: "Elle est tombée dans la rue.", exampleJa: "彼女は道で倒れました。" }
    ]
  },
  s29: {
    titleFr: "Révision générale", titleJa: "総復習",
    words: [
      { fr: "à bientôt", kana: "ア・ビヤント", ja: "またすぐに", exampleFr: "À bientôt, prends soin de toi !", exampleJa: "またすぐに、元気でね!" },
      { fr: "bonne chance", kana: "ボンヌ・シャンス", ja: "頑張って、幸運を", exampleFr: "Bonne chance pour ton examen !", exampleJa: "試験頑張って!" },
      { fr: "félicitations", kana: "フェリシタシオン", ja: "おめでとう", exampleFr: "Félicitations pour ton nouveau travail !", exampleJa: "新しい仕事おめでとう!" },
      { fr: "bravo", kana: "ブラヴォ", ja: "よくやった", exampleFr: "Bravo, tu as réussi !", exampleJa: "よくやった、成功したね!" },
      { fr: "c'est génial", kana: "セ・ジェニアル", ja: "すごい、最高", exampleFr: "C'est génial, j'adore !", exampleJa: "すごい、大好き!" },
      { fr: "quel dommage", kana: "ケル・ドマージュ", ja: "残念だ", exampleFr: "Quel dommage, il pleut !", exampleJa: "残念、雨だ!" },
      { fr: "tant pis", kana: "タン・ピ", ja: "しょうがない", exampleFr: "Tant pis, on essaiera demain.", exampleJa: "しょうがない、明日また試そう。" },
      { fr: "ça dépend", kana: "サ・デパン", ja: "場合による", exampleFr: "Ça dépend du temps.", exampleJa: "天気によるね。" },
      { fr: "bien sûr", kana: "ビヤン・スュール", ja: "もちろん", exampleFr: "Bien sûr, je peux t'aider !", exampleJa: "もちろん、手伝えるよ!" },
      { fr: "exactement", kana: "エグザクトマン", ja: "まさに、その通り", exampleFr: "Exactement, tu as raison !", exampleJa: "その通り、あなたが正しい!" }
    ]
  }
};

// --------------------------------------------------------
// Grammaire (1 point par étape)
// --------------------------------------------------------
const GRAMMAR_POINTS = {
  g00: {
    titleFr: "L'alphabet et les accents", titleJa: "アルファベットとアクサン(発音記号)",
    explanationFr: "L'alphabet français compte les 26 mêmes lettres que l'alphabet anglais, mais leur prononciation (leur nom) est différente. De plus, les accents (´ ` ^), la cédille (ç) et le tréma (¨) changent la prononciation. Quand on vous demande l'orthographe de votre nom, on épelle lettre par lettre.",
    explanationJa: "フランス語のアルファベットは英語と同じ26文字ですが、文字の読み方(名前)が違います。また、アクサン記号(´ ` ^)やセディーユ(ç)、トレマ(¨)が付くと発音が変わります。名前の綴りを聞かれたときは一文字ずつ言います(épeler)。",
    patternFr: "Comment ça s'écrit ? — Ça s'écrit ...",
    patternJa: "Comment ça s'écrit ?(綴りは?) — Ça s'écrit ...(それは…と書きます)",
    items: [
      { label: "é", noteFr: "Accent aigu. Son « é » fermé (ex. : café)", noteJa: "アクサン・テギュ。エの音(例: café)" },
      { label: "è / ê", noteFr: "Accent grave / accent circonflexe. Son « è » ouvert (ex. : mère, fête)", noteJa: "アクサン・グラーヴ/シルコンフレックス。開いたエの音(例: mère, fête)" },
      { label: "ç", noteFr: "Cédille. Devant a/o/u, le « c » se prononce « s » (ex. : français)", noteJa: "セディーユ。cの後にa/o/uが来るときサ行の音になる(例: français)" },
      { label: "ë / ï / ü", noteFr: "Tréma. Indique que la voyelle se prononce séparément de la précédente (ex. : Noël)", noteJa: "トレマ。前の文字と分けて発音する(例: Noël)" }
    ],
    examples: [
      { fr: "Comment ça s'écrit ?", ja: "それはどう書きますか?(綴りは?)" },
      { fr: "Pouvez-vous épeler votre nom ?", ja: "お名前を一文字ずつ言っていただけますか?" },
      { fr: "Ça s'écrit M-A-R-I-E.", ja: "それは M-A-R-I-E と書きます。" }
    ]
  },
  g01: {
    titleFr: "Se présenter : s'appeler", titleJa: "自己紹介する:s'appeler(〜という名前です)",
    explanationFr: "Pour dire son nom, on utilise le verbe « s'appeler ». Apprenez-le avec les pronoms sujets (je, tu, il/elle, nous, vous, ils/elles).",
    explanationJa: "名前を言うときは動詞 « s'appeler »(〜という名前です)を使います。主語代名詞(je, tu, il/elle, nous, vous, ils/elles)と一緒に覚えましょう。",
    patternFr: "[Sujet] + m'/t'/s'/nous/vous/s' + appelle(s/ons/ez/ent)",
    patternJa: "[主語] + m'/t'/s'/nous/vous/s' + appelle(s/ons/ez/ent)",
    conjugation: [
      { pronoun: "je", form: "m'appelle" },
      { pronoun: "tu", form: "t'appelles" },
      { pronoun: "il / elle", form: "s'appelle" },
      { pronoun: "nous", form: "nous appelons" },
      { pronoun: "vous", form: "vous appelez" },
      { pronoun: "ils / elles", form: "s'appellent" }
    ],
    examples: [
      { fr: "Je m'appelle Yuki.", ja: "私はユキという名前です。" },
      { fr: "Comment tu t'appelles ?", ja: "あなたの名前は何ですか?" },
      { fr: "Elle s'appelle Marie.", ja: "彼女はマリーという名前です。" },
      { fr: "Nous nous appelons Léo et Sara.", ja: "私たちはレオとサラという名前です。" }
    ]
  },
  g02: {
    titleFr: "Le verbe être", titleJa: "動詞 être(〜である)",
    explanationFr: "« être » est le verbe le plus important du français, équivalent de « to be » en anglais. On l'utilise pour dire sa nationalité, sa profession, son caractère, etc.",
    explanationJa: "« être » は英語の「to be」に相当する、フランス語で最も重要な動詞です。国籍・職業・性格などを言うときに使います。",
    patternFr: "[Sujet] + suis/es/est/sommes/êtes/sont + [adjectif/nom]",
    patternJa: "[主語] + suis/es/est/sommes/êtes/sont + [形容詞・名詞]",
    conjugation: [
      { pronoun: "je", form: "suis" },
      { pronoun: "tu", form: "es" },
      { pronoun: "il / elle", form: "est" },
      { pronoun: "nous", form: "sommes" },
      { pronoun: "vous", form: "êtes" },
      { pronoun: "ils / elles", form: "sont" }
    ],
    examples: [
      { fr: "Je suis étudiant.", ja: "私は学生です。" },
      { fr: "Tu es français ?", ja: "あなたはフランス人ですか?" },
      { fr: "Nous sommes fatigués.", ja: "私たちは疲れています。" },
      { fr: "Elles sont sympas.", ja: "彼女たちは親切です。" }
    ]
  },
  g03: {
    titleFr: "Le verbe avoir", titleJa: "動詞 avoir(持つ)",
    explanationFr: "« avoir » signifie « posséder », mais il sert aussi à dire son âge (J'ai vingt ans.) et dans l'expression « il y a... » (il existe...).",
    explanationJa: "« avoir » は「持つ」という意味ですが、年齢を言うとき(J'ai vingt ans. = 私は20歳です)や、「〜がある」(il y a...)という表現でもよく使われます。",
    patternFr: "[Sujet] + ai/as/a/avons/avez/ont + [nom]  ·  il y a + [nom] = il existe...",
    patternJa: "[主語] + ai/as/a/avons/avez/ont + [名詞]  ・  il y a + [名詞] = 〜がある",
    conjugation: [
      { pronoun: "je", form: "ai" },
      { pronoun: "tu", form: "as" },
      { pronoun: "il / elle", form: "a" },
      { pronoun: "nous", form: "avons" },
      { pronoun: "vous", form: "avez" },
      { pronoun: "ils / elles", form: "ont" }
    ],
    examples: [
      { fr: "J'ai vingt ans.", ja: "私は20歳です。" },
      { fr: "Tu as un stylo ?", ja: "あなたはペンを持っていますか?" },
      { fr: "Il y a trois chats dans la maison.", ja: "家には猫が3匹います。" },
      { fr: "Nous avons deux enfants.", ja: "私たちには子供が2人います。" }
    ]
  },
  g04: {
    titleFr: "Les articles (le, la, les, un, une, des)", titleJa: "冠詞(le, la, les, un, une, des)",
    explanationFr: "Les noms français ont un genre : masculin ou féminin. On utilise l'article défini « le » (masculin) / « la » (féminin) / « les » (pluriel), et l'article indéfini « un » (masculin) / « une » (féminin) / « des » (pluriel).",
    explanationJa: "フランス語の名詞には男性(masculin)と女性(féminin)があります。定冠詞は le(男性)/ la(女性)/ les(複数)、不定冠詞は un(男性)/ une(女性)/ des(複数)を使います。",
    patternFr: "Article défini : le / la / les (chose précise) — Article indéfini : un / une / des (chose non précisée)",
    patternJa: "定冠詞: le / la / les(特定のもの)　不定冠詞: un / une / des(不特定のもの)",
    items: [
      { label: "le / un", noteFr: "Nom masculin singulier (le livre, un stylo)", noteJa: "男性名詞単数 (le livre, un stylo)" },
      { label: "la / une", noteFr: "Nom féminin singulier (la table, une maison)", noteJa: "女性名詞単数 (la table, une maison)" },
      { label: "les / des", noteFr: "Pluriel, masculin ou féminin (les livres, des maisons)", noteJa: "複数、男女共通 (les livres, des maisons)" }
    ],
    examples: [
      { fr: "C'est un livre.", ja: "これは(一冊の)本です。" },
      { fr: "La maison est grande.", ja: "その家は大きいです。" },
      { fr: "J'ai des amis français.", ja: "私にはフランス人の友達がいます。" }
    ]
  },
  g05: {
    titleFr: "Les adjectifs possessifs", titleJa: "所有形容詞",
    explanationFr: "Les adjectifs possessifs (« mon », « ton »...) s'accordent avec le genre et le nombre du nom qui suit, et non avec la personne qui possède.",
    explanationJa: "「私の」「あなたの」などを表す所有形容詞は、所有者ではなく後に続く名詞の性・数に合わせて形が変わります。",
    patternFr: "mon/ma/mes (mon, ma, mes) — ton/ta/tes (ton, ta, tes) — son/sa/ses (son, sa, ses)",
    patternJa: "mon/ma/mes(私の)　ton/ta/tes(君の)　son/sa/ses(彼・彼女の)",
    items: [
      { label: "mon / ma / mes", noteFr: "« mon » (masculin singulier), « ma » (féminin singulier), « mes » (pluriel)", noteJa: "私の(男性単数/女性単数/複数)" },
      { label: "ton / ta / tes", noteFr: "« ton » (masculin singulier), « ta » (féminin singulier), « tes » (pluriel)", noteJa: "君の(男性単数/女性単数/複数)" },
      { label: "son / sa / ses", noteFr: "« son » (masculin singulier), « sa » (féminin singulier), « ses » (pluriel)", noteJa: "彼・彼女の(男性単数/女性単数/複数)" }
    ],
    examples: [
      { fr: "Voici mon père et ma mère.", ja: "これが私の父と母です。" },
      { fr: "Ton frère est grand.", ja: "あなたの兄(弟)は背が高いです。" },
      { fr: "Ses enfants sont sympas.", ja: "彼(彼女)の子供たちは親切です。" }
    ]
  },
  g06: {
    titleFr: "Les verbes en -ER au présent", titleJa: "-erで終わる動詞の現在形",
    explanationFr: "La plupart des verbes français se terminent en -er (parler, manger, habiter...). Il suffit de changer la terminaison en -e, -es, -e, -ons, -ez, -ent pour conjuguer presque tous les verbes en -er.",
    explanationJa: "フランス語の動詞の多くは -er で終わります(parler, manger, habiter など)。語尾を -e, -es, -e, -ons, -ez, -ent に変えるだけで、ほとんどの-er動詞に使えます。",
    patternFr: "Radical + e / es / e / ons / ez / ent",
    patternJa: "語幹 + e / es / e / ons / ez / ent",
    conjugation: [
      { pronoun: "je", form: "parle" },
      { pronoun: "tu", form: "parles" },
      { pronoun: "il / elle", form: "parle" },
      { pronoun: "nous", form: "parlons" },
      { pronoun: "vous", form: "parlez" },
      { pronoun: "ils / elles", form: "parlent" }
    ],
    examples: [
      { fr: "Je travaille à Tokyo.", ja: "私は東京で働いています。" },
      { fr: "Tu aimes le chocolat ?", ja: "あなたはチョコレートが好きですか?" },
      { fr: "Nous habitons en France.", ja: "私たちはフランスに住んでいます。" },
      { fr: "Elles étudient le français ensemble.", ja: "彼女たちは一緒にフランス語を勉強します。" }
    ]
  },
  g07: {
    titleFr: "Les articles partitifs", titleJa: "部分冠詞(du, de la, de l', des)",
    explanationFr: "Pour exprimer une quantité non comptable (nourriture, boisson...), on utilise l'article partitif « du » (masculin) / « de la » (féminin) / « de l' » (devant une voyelle) / « des » (pluriel).",
    explanationJa: "数えられない量(食べ物・飲み物など)を表すときは部分冠詞 du(男性)/ de la(女性)/ de l'(母音の前)/ des(複数)を使います。",
    patternFr: "du + nom masculin — de la + nom féminin — de l' + nom commençant par une voyelle — des + nom pluriel",
    patternJa: "du + 男性名詞　de la + 女性名詞　de l' + 母音で始まる名詞　des + 複数名詞",
    items: [
      { label: "du", noteFr: "Nom masculin (du pain, du riz)", noteJa: "男性名詞 (du pain, du riz)" },
      { label: "de la", noteFr: "Nom féminin (de la viande)", noteJa: "女性名詞 (de la viande)" },
      { label: "de l'", noteFr: "Devant une voyelle (de l'eau)", noteJa: "母音の前 (de l'eau)" },
      { label: "des", noteFr: "Pluriel (des légumes)", noteJa: "複数 (des légumes)" }
    ],
    examples: [
      { fr: "Je voudrais du pain, s'il vous plaît.", ja: "パンをお願いします。" },
      { fr: "Il mange de la viande.", ja: "彼は肉を食べます。" },
      { fr: "Nous buvons de l'eau.", ja: "私たちは水を飲みます。" },
      { fr: "Elle achète des pommes.", ja: "彼女はりんごを買います。" }
    ]
  },
  g08: {
    titleFr: "L'heure et les jours", titleJa: "時間と曜日の言い方",
    explanationFr: "Pour demander l'heure, on dit « Quelle heure est-il ? » et on répond « Il est ... heure(s). ». Les jours de la semaine s'emploient directement, sans préposition.",
    explanationJa: "時間を尋ねるときは « Quelle heure est-il ? »(今何時ですか?)と言い、« Il est ... heure(s). »(〜時です)と答えます。曜日は前置詞なしでそのまま使います。",
    patternFr: "Quelle heure est-il ? — Il est [nombre] heure(s). — Aujourd'hui, c'est [jour].",
    patternJa: "Quelle heure est-il ? — Il est [数字] heure(s).　　Aujourd'hui, c'est [曜日].",
    examples: [
      { fr: "Il est huit heures du matin.", ja: "朝8時です。" },
      { fr: "Quel jour sommes-nous ? — Nous sommes mercredi.", ja: "今日は何曜日ですか?— 水曜日です。" },
      { fr: "Le samedi, je ne travaille pas.", ja: "土曜日はいつも仕事をしません。" },
      { fr: "Demain, c'est dimanche.", ja: "明日は日曜日です。" }
    ]
  },
  g09: {
    titleFr: "Les mots interrogatifs", titleJa: "疑問詞",
    explanationFr: "Apprenons les mots interrogatifs utiles pour poser des questions. Une simple intonation montante suffit pour poser une question, mais les mots interrogatifs permettent d'être plus précis.",
    explanationJa: "質問をするときに使う便利な疑問詞をまとめて覚えましょう。文末に上げ調子で言うだけでも質問になりますが、疑問詞を使うとより具体的に聞けます。",
    patternFr: "qui / que · quoi / où / quand / comment / combien / pourquoi",
    patternJa: "qui(誰) / que・quoi(何) / où(どこ) / quand(いつ) / comment(どう) / combien(いくつ・いくら) / pourquoi(なぜ)",
    items: [
      { label: "qui", noteFr: "qui (personne)", noteJa: "誰" },
      { label: "que / quoi", noteFr: "que / quoi (chose)", noteJa: "何" },
      { label: "où", noteFr: "où (lieu)", noteJa: "どこ" },
      { label: "quand", noteFr: "quand (temps)", noteJa: "いつ" },
      { label: "comment", noteFr: "comment (manière)", noteJa: "どのように" },
      { label: "combien", noteFr: "combien (quantité, prix)", noteJa: "いくつ、いくら" },
      { label: "pourquoi", noteFr: "pourquoi (raison)", noteJa: "なぜ" }
    ],
    examples: [
      { fr: "Combien ça coûte ?", ja: "それはいくらですか?" },
      { fr: "Où est le marché ?", ja: "市場はどこですか?" },
      { fr: "Quand est-ce que tu arrives ?", ja: "いつ到着しますか?" },
      { fr: "Pourquoi tu aimes ce magasin ?", ja: "なぜあなたはこの店が好きですか?" }
    ]
  },
  g10: {
    titleFr: "Le passé composé avec avoir", titleJa: "複合過去(avoirを使う過去形)",
    explanationFr: "Pour parler d'un événement passé, on utilise le présent de « avoir » + le participe passé. Pour les verbes en -er, il suffit de changer la terminaison en -é (parler → parlé).",
    explanationJa: "過去に起きたことを話すときは « avoir »の現在形 + 過去分詞 を使います。-er動詞の過去分詞は語尾を -é に変えるだけです(parler → parlé)。",
    patternFr: "[Sujet] + ai/as/a/avons/avez/ont + participe passé (-é pour les verbes en -er)",
    patternJa: "[主語] + ai/as/a/avons/avez/ont + 過去分詞(-er動詞は -é)",
    conjugation: [
      { pronoun: "je", form: "ai parlé" },
      { pronoun: "tu", form: "as parlé" },
      { pronoun: "il / elle", form: "a parlé" },
      { pronoun: "nous", form: "avons parlé" },
      { pronoun: "vous", form: "avez parlé" },
      { pronoun: "ils / elles", form: "ont parlé" }
    ],
    examples: [
      { fr: "J'ai parlé avec mon ami hier.", ja: "私は昨日友達と話しました。" },
      { fr: "Tu as mangé du pain ce matin ?", ja: "あなたは今朝パンを食べましたか?" },
      { fr: "Nous avons visité Paris le week-end dernier.", ja: "私たちは先週末パリを訪れました。" },
      { fr: "Il a beaucoup aimé ce voyage.", ja: "彼はこの旅行をとても気に入りました。" }
    ]
  },
  g11: {
    titleFr: "Les nombres de 70 à 100", titleJa: "70から100までの数字",
    explanationFr: "Les nombres français de 70 à 99 sont irréguliers : ils se construisent à partir de 60 et 80. soixante-dix (60+10) = 70, quatre-vingts (4×20) = 80, quatre-vingt-dix (80+10) = 90.",
    explanationJa: "70から99までのフランス語の数字は不規則です。60と80を基準に作られます。soixante-dix(60+10)=70、quatre-vingts(4×20)=80、quatre-vingt-dix(80+10)=90。",
    patternFr: "60=soixante · 70=soixante-dix · 80=quatre-vingts · 90=quatre-vingt-dix · 100=cent",
    patternJa: "60=soixante・70=soixante-dix・80=quatre-vingts・90=quatre-vingt-dix・100=cent",
    items: [
      { label: "soixante-dix (70)", noteFr: "Littéralement « soixante + dix »", noteJa: "直訳すると「60+10」" },
      { label: "quatre-vingts (80)", noteFr: "Littéralement « quatre fois vingt »", noteJa: "直訳すると「4×20」" },
      { label: "quatre-vingt-dix (90)", noteFr: "Littéralement « quatre-vingts + dix »", noteJa: "直訳すると「80+10」" }
    ],
    examples: [
      { fr: "J'ai soixante-quinze ans.", ja: "私は75歳です。" },
      { fr: "Il y a quatre-vingt-deux personnes.", ja: "82人います。" },
      { fr: "Ça coûte quatre-vingt-dix-neuf euros.", ja: "それは99ユーロです。" },
      { fr: "Cent personnes sont venues.", ja: "100人が来ました。" }
    ]
  },
  g12: {
    titleFr: "L'accord des adjectifs", titleJa: "形容詞の一致(男性・女性・複数)",
    explanationFr: "Les adjectifs s'accordent en genre et en nombre avec le nom qu'ils décrivent. En général, on ajoute -e au féminin et -s au pluriel, mais certains adjectifs sont irréguliers (beau → belle, gentil → gentille).",
    explanationJa: "形容詞は、説明する名詞の性・数に合わせて形を変えます。基本的に女性形は語尾に-eを、複数形は-sを加えますが、beau→belle、gentil→gentilleのように不規則なものもあります。",
    patternFr: "[nom masculin] + adjectif · [nom féminin] + adjectif+e · [pluriel] + adjectif+s",
    patternJa: "男性名詞+形容詞・女性名詞+形容詞+e・複数+形容詞+s",
    items: [
      { label: "grand → grande", noteFr: "Règle générale : + e au féminin", noteJa: "基本ルール:女性形は語尾に+e" },
      { label: "beau → belle", noteFr: "Irrégulier", noteJa: "不規則変化" },
      { label: "gentil → gentille", noteFr: "Irrégulier (+ille)", noteJa: "不規則変化(+ille)" }
    ],
    examples: [
      { fr: "Il est grand et elle est grande.", ja: "彼は背が高くて、彼女も背が高いです。" },
      { fr: "Mon père est beau, ma mère est belle.", ja: "私の父はハンサムで、母は美しいです。" },
      { fr: "Ils sont gentils.", ja: "彼らは優しいです。" },
      { fr: "Mes amies sont intelligentes.", ja: "私の(女性の)友達は賢いです。" }
    ]
  },
  g13: {
    titleFr: "Les prépositions de lieu", titleJa: "場所の前置詞",
    explanationFr: "Les prépositions de lieu indiquent où se trouve quelque chose ou quelqu'un. « chez » s'utilise uniquement avec une personne (chez moi, chez le médecin), contrairement à « dans » ou « à » qui s'utilisent avec des lieux.",
    explanationJa: "場所の前置詞は、物や人がどこにあるかを示します。「chez」は人と一緒にのみ使います(chez moi=私の家で、chez le médecin=医者のところで)。「dans」や「à」は場所と一緒に使います。",
    patternFr: "[objet/personne] + est + [préposition] + [lieu]",
    patternJa: "[物・人] + est + [前置詞] + [場所]",
    items: [
      { label: "chez", noteFr: "Toujours suivi d'une personne (chez moi, chez le dentiste)", noteJa: "必ず人が続く(chez moi=私の家、chez le dentiste=歯医者のところ)" },
      { label: "dans / à", noteFr: "Suivis d'un lieu (dans la maison, à Paris)", noteJa: "場所が続く(dans la maison=家の中、à Paris=パリに)" }
    ],
    examples: [
      { fr: "Le chien est sous la table.", ja: "犬はテーブルの下にいます。" },
      { fr: "Je suis chez moi.", ja: "私は自分の家にいます。" },
      { fr: "L'école est près de la gare.", ja: "学校は駅の近くにあります。" },
      { fr: "Mon sac est entre la chaise et la table.", ja: "私のバッグは椅子とテーブルの間にあります。" }
    ]
  },
  g14: {
    titleFr: "L'impératif", titleJa: "命令形",
    explanationFr: "L'impératif sert à donner un ordre, un conseil ou une instruction. Pour les verbes en -er, on utilise la forme « tu » sans le « s » final. Pour être et avoir, les formes sont irrégulières.",
    explanationJa: "命令形は、命令・アドバイス・指示をするときに使います。-er動詞は「tu」の活用形から最後のsを取った形を使います。êtreとavoirは不規則な活用になります。",
    patternFr: "(tu) + verbe sans -s · (nous) + verbe+ons · (vous) + verbe+ez",
    patternJa: "(tu)+語尾の-sを取った動詞・(nous)+動詞+ons・(vous)+動詞+ez",
    items: [
      { label: "regarder → Regarde !", noteFr: "On enlève le -s de la 2e personne", noteJa: "2人称の-sを取る" },
      { label: "être → Sois sage !", noteFr: "Irrégulier", noteJa: "不規則" },
      { label: "avoir → Aie confiance !", noteFr: "Irrégulier", noteJa: "不規則" }
    ],
    examples: [
      { fr: "Viens avec moi !", ja: "私と一緒に来て!" },
      { fr: "Regardez le tableau !", ja: "(あなたたちは)黒板を見て!" },
      { fr: "Ne fais pas ça !", ja: "それをしないで!" },
      { fr: "Écoutons la musique ensemble.", ja: "一緒に音楽を聞きましょう。" }
    ]
  },
  g15: {
    titleFr: "Le futur proche", titleJa: "近接未来",
    explanationFr: "Le futur proche s'utilise pour parler d'une action qui va bientôt se passer. On conjugue « aller » au présent, suivi du verbe à l'infinitif.",
    explanationJa: "近接未来は、近い将来に起こる行動について話すときに使います。「aller」を現在形で活用し、その後に動詞の原形(不定詞)を続けます。",
    patternFr: "[sujet] + aller (présent) + infinitif",
    patternJa: "[主語] + aller(現在形) + 動詞の原形",
    conjugation: [
      { pronoun: "je", form: "vais + infinitif" },
      { pronoun: "tu", form: "vas + infinitif" },
      { pronoun: "il / elle", form: "va + infinitif" },
      { pronoun: "nous", form: "allons + infinitif" },
      { pronoun: "vous", form: "allez + infinitif" },
      { pronoun: "ils / elles", form: "vont + infinitif" }
    ],
    examples: [
      { fr: "Je vais partir demain.", ja: "私は明日出発します。" },
      { fr: "Tu vas voir, c'est facile.", ja: "見てみて、簡単だよ。" },
      { fr: "Nous allons manger ce soir.", ja: "私たちは今晩食べます。" },
      { fr: "Ils vont arriver bientôt.", ja: "彼らはすぐに到着します。" }
    ]
  },
  g16: {
    titleFr: "L'accord des adjectifs de couleur", titleJa: "色を表す形容詞の一致",
    explanationFr: "Les adjectifs de couleur s'accordent aussi en genre et en nombre : bleu → bleue → bleus → bleues. Attention, blanc devient blanche au féminin (changement de son).",
    explanationJa: "色を表す形容詞も性・数に一致します:bleu→bleue→bleus→bleues。注意点として、blanc(白)は女性形でblancheになります(発音が変わります)。",
    patternFr: "[nom] + couleur (accordée en genre/nombre)",
    patternJa: "[名詞] + 色(性・数に一致)",
    items: [
      { label: "bleu → bleue → bleus → bleues", noteFr: "Accord régulier", noteJa: "規則的な変化" },
      { label: "blanc → blanche", noteFr: "Irrégulier au féminin", noteJa: "女性形は不規則" },
      { label: "des chaussettes vertes", noteFr: "Accord au pluriel féminin", noteJa: "女性複数形の一致" }
    ],
    examples: [
      { fr: "J'ai une chemise bleue.", ja: "私は青いシャツを持っています。" },
      { fr: "Ses chaussures sont noires.", ja: "彼(彼女)の靴は黒いです。" },
      { fr: "Elle porte une robe blanche.", ja: "彼女は白いドレスを着ています。" },
      { fr: "Les feuilles sont vertes en été.", ja: "夏には葉が緑色です。" }
    ]
  },
  g17: {
    titleFr: "Faire du / de la / des + activités", titleJa: "faire du/de la/des + 活動",
    explanationFr: "Pour parler d'un loisir ou d'un sport, on utilise souvent « faire » + article partitif (du, de la, des), ou « jouer à » pour les sports avec ballon.",
    explanationJa: "趣味やスポーツについて話すときは、「faire」+部分冠詞(du、de la、des)、またはボールを使うスポーツには「jouer à」を使うことが多いです。",
    patternFr: "faire + du/de la/des + activité · jouer à + sport (avec ballon)",
    patternJa: "faire + du/de la/des + 活動・jouer à + スポーツ(球技)",
    items: [
      { label: "faire du sport", noteFr: "« du » car sport est masculin", noteJa: "sportは男性名詞なので「du」" },
      { label: "faire de la natation", noteFr: "« de la » car natation est féminin", noteJa: "natationは女性名詞なので「de la」" },
      { label: "jouer au foot / au tennis", noteFr: "« jouer à » pour les sports avec ballon/raquette", noteJa: "球技・ラケットスポーツには「jouer à」" }
    ],
    examples: [
      { fr: "Je fais du sport trois fois par semaine.", ja: "私は週に3回スポーツをします。" },
      { fr: "Il joue au tennis avec son père.", ja: "彼は父親とテニスをします。" },
      { fr: "Nous faisons du vélo le dimanche.", ja: "私たちは日曜日にサイクリングをします。" },
      { fr: "Elle aime lire et dessiner.", ja: "彼女は読書と絵を描くのが好きです。" }
    ]
  },
  g18: {
    titleFr: "Avoir mal à + partie du corps", titleJa: "avoir mal à + 体の部位",
    explanationFr: "Pour exprimer une douleur, on utilise « avoir mal à » + article contracté (au, à la, à l', aux) + la partie du corps.",
    explanationJa: "痛みを表すときは「avoir mal à」+縮約冠詞(au、à la、à l'、aux)+体の部位を使います。",
    patternFr: "avoir mal + au/à la/à l'/aux + partie du corps",
    patternJa: "avoir mal + au/à la/à l'/aux + 体の部位",
    items: [
      { label: "au (masculin)", noteFr: "J'ai mal au dos.", noteJa: "男性名詞:J'ai mal au dos.(背中が痛い)" },
      { label: "à la (féminin)", noteFr: "J'ai mal à la tête.", noteJa: "女性名詞:J'ai mal à la tête.(頭が痛い)" },
      { label: "aux (pluriel)", noteFr: "J'ai mal aux pieds.", noteJa: "複数形:J'ai mal aux pieds.(足が痛い)" }
    ],
    examples: [
      { fr: "J'ai mal à la tête depuis ce matin.", ja: "今朝から頭が痛いです。" },
      { fr: "Tu as mal au ventre ?", ja: "お腹が痛いの?" },
      { fr: "Il est malade, il reste à la maison.", ja: "彼は病気なので、家にいます。" },
      { fr: "Va à la pharmacie acheter un médicament.", ja: "薬局に行って薬を買ってきて。" }
    ]
  },
  g19: {
    titleFr: "Donner des indications", titleJa: "道を案内する(命令形での道案内)",
    explanationFr: "Pour donner un itinéraire, on utilise souvent l'impératif à la forme « vous » (forme polie) : Tournez, Continuez, Traversez. On utilise aussi des prépositions de lieu déjà connues.",
    explanationJa: "道案内をするときは、丁寧な「vous」の命令形をよく使います:Tournez(曲がってください)、Continuez(進んでください)、Traversez(渡ってください)。既に学んだ場所の前置詞もよく使われます。",
    patternFr: "Tournez / Continuez / Traversez + [direction ou lieu]",
    patternJa: "Tournez / Continuez / Traversez + [方向・場所]",
    items: [
      { label: "Tournez à droite/gauche", noteFr: "Indication de direction", noteJa: "方向の指示" },
      { label: "Continuez tout droit", noteFr: "Continuer dans la même direction", noteJa: "同じ方向に進む" },
      { label: "C'est en face de / au bout de", noteFr: "Situer un lieu précisément", noteJa: "場所を正確に示す" }
    ],
    examples: [
      { fr: "Tournez à droite, puis continuez tout droit.", ja: "右に曲がって、それから直進してください。" },
      { fr: "La pharmacie est en face de la banque.", ja: "薬局は銀行の向かいにあります。" },
      { fr: "Traversez la rue au feu rouge.", ja: "赤信号のところで道を渡ってください。" },
      { fr: "La gare est au bout de la rue.", ja: "駅は道の終わりにあります。" }
    ]
  },
  g20: {
    titleFr: "Les expressions impersonnelles avec « il »", titleJa: "非人称の「il」を使う表現",
    explanationFr: "Beaucoup d'expressions météorologiques utilisent « il » impersonnel (qui ne représente personne en particulier) : il fait beau, il pleut, il neige, il y a du vent.",
    explanationJa: "天気に関する多くの表現は、非人称の「il」(特定の誰かを指さない)を使います:il fait beau(晴れている)、il pleut(雨が降る)、il neige(雪が降る)、il y a du vent(風がある)。",
    patternFr: "il + fait/neige/pleut/y a + [expression météo]",
    patternJa: "il + fait/neige/pleut/y a + [天気の表現]",
    items: [
      { label: "il fait + adjectif", noteFr: "il fait beau, il fait froid", noteJa: "il fait beau(晴れ)、il fait froid(寒い)" },
      { label: "il + verbe", noteFr: "il neige, il pleut", noteJa: "il neige(雪)、il pleut(雨)" },
      { label: "il y a + nom", noteFr: "il y a du soleil, il y a du vent", noteJa: "il y a du soleil(晴れ)、il y a du vent(風)" }
    ],
    examples: [
      { fr: "Au printemps, il fait doux.", ja: "春は気候が穏やかです。" },
      { fr: "En hiver, il neige souvent dans les montagnes.", ja: "冬には山でよく雪が降ります。" },
      { fr: "Il y a du soleil, prenons des photos !", ja: "晴れているから、写真を撮りましょう!" },
      { fr: "N'oublie pas ton parapluie, il va pleuvoir.", ja: "傘を忘れないで、雨が降りそうだから。" }
    ]
  },
  g21: {
    titleFr: "Pouvoir et vouloir au présent", titleJa: "動詞 pouvoir と vouloir の現在形",
    explanationFr: "« pouvoir » (capacité/permission) et « vouloir » (désir) sont deux verbes irréguliers très utiles, surtout au téléphone pour être poli : Pouvez-vous... ? Je voudrais...",
    explanationJa: "「pouvoir」(できる/許可)と「vouloir」(望む)は非常に便利な不規則動詞で、特に電話で丁寧に話すときに使います:Pouvez-vous...?(〜していただけますか?)、Je voudrais...(〜が欲しいです)。",
    patternFr: "[sujet] + peux/peut/pouvons/pouvez/peuvent · veux/veut/voulons/voulez/veulent",
    patternJa: "[主語] + peux/peut/pouvons/pouvez/peuvent・veux/veut/voulons/voulez/veulent",
    conjugation: [
      { pronoun: "je", form: "peux / veux" },
      { pronoun: "tu", form: "peux / veux" },
      { pronoun: "il / elle", form: "peut / veut" },
      { pronoun: "nous", form: "pouvons / voulons" },
      { pronoun: "vous", form: "pouvez / voulez" },
      { pronoun: "ils / elles", form: "peuvent / veulent" }
    ],
    examples: [
      { fr: "Pouvez-vous répéter, s'il vous plaît ?", ja: "もう一度言っていただけますか?" },
      { fr: "Je voudrais parler à Marie.", ja: "マリーさんと話したいのですが。" },
      { fr: "Il ne peut pas venir aujourd'hui.", ja: "彼は今日来ることができません。" },
      { fr: "Nous voulons réserver une table.", ja: "私たちはテーブルを予約したいです。" }
    ]
  },
  g22: {
    titleFr: "La place des adverbes de fréquence", titleJa: "頻度の副詞の位置",
    explanationFr: "Les adverbes de fréquence comme toujours, souvent, parfois se placent généralement après le verbe conjugué. Certaines expressions comme « tous les jours » se placent plutôt en fin ou en début de phrase.",
    explanationJa: "toujours、souvent、parfoisなどの頻度を表す副詞は、通常活用した動詞の後に置きます。「tous les jours」などの表現は、文末や文頭に置かれることが多いです。",
    patternFr: "[sujet] + verbe + toujours/souvent/parfois/rarement/jamais",
    patternJa: "[主語] + 動詞 + toujours/souvent/parfois/rarement/jamais",
    items: [
      { label: "Je mange toujours à midi.", noteFr: "Adverbe après le verbe", noteJa: "副詞は動詞の後" },
      { label: "Tous les jours, je cours.", noteFr: "Expression en début de phrase", noteJa: "表現は文頭に置くことも" },
      { label: "ne...jamais", noteFr: "Négation entourant le verbe", noteJa: "動詞を挟む否定形" }
    ],
    examples: [
      { fr: "Je vais souvent à la bibliothèque.", ja: "私はよく図書館に行きます。" },
      { fr: "Elle ne mange jamais de viande.", ja: "彼女は絶対に肉を食べません。" },
      { fr: "D'habitude, nous dînons à vingt heures.", ja: "普段、私たちは20時に夕食をとります。" },
      { fr: "Il fait rarement ses devoirs le matin.", ja: "彼はまれに朝宿題をします。" }
    ]
  },
  g23: {
    titleFr: "La négation étendue", titleJa: "拡張された否定形",
    explanationFr: "En plus de « ne...pas », le français utilise d'autres négations : ne...plus (fini), ne...rien (aucune chose), ne...personne (aucune personne), ne...que (seulement).",
    explanationJa: "「ne...pas」以外にも、フランス語には他の否定表現があります:ne...plus(もう〜ない)、ne...rien(何も〜ない)、ne...personne(誰も〜ない)、ne...que(〜しか)。",
    patternFr: "ne + verbe + plus/rien/personne/que",
    patternJa: "ne + 動詞 + plus/rien/personne/que",
    items: [
      { label: "ne...plus", noteFr: "Une action qui s'est arrêtée", noteJa: "止まった行動を表す" },
      { label: "ne...rien / ne...personne", noteFr: "Absence de chose / de personne", noteJa: "物・人の不在" },
      { label: "ne...que", noteFr: "Restriction (= seulement)", noteJa: "制限(=〜しかない)" }
    ],
    examples: [
      { fr: "Il n'y a plus de pain.", ja: "パンはもうありません。" },
      { fr: "Je ne connais personne ici.", ja: "私はここで誰も知りません。" },
      { fr: "Elle ne mange que des légumes.", ja: "彼女は野菜しか食べません。" },
      { fr: "Je n'ai rien à dire.", ja: "私は何も言うことがありません。" }
    ]
  },
  g24: {
    titleFr: "Les comparatifs et le superlatif", titleJa: "比較級と最上級",
    explanationFr: "Pour comparer, on utilise plus...que (supériorité), moins...que (inférorité), aussi...que (égalité). Pour le superlatif (le plus haut degré), on utilise le/la plus ou le/la moins.",
    explanationJa: "比較するときは、plus...que(より〜)、moins...que(より少なく〜)、aussi...que(同じくらい〜)を使います。最上級(最も高い程度)は、le/la plusまたはle/la moinsを使います。",
    patternFr: "plus/moins/aussi + adjectif + que + [comparaison] · le/la plus/moins + adjectif",
    patternJa: "plus/moins/aussi + 形容詞 + que + [比較対象]・le/la plus/moins + 形容詞",
    items: [
      { label: "plus grand que", noteFr: "Supériorité", noteJa: "優越(より〜)" },
      { label: "moins cher que", noteFr: "Inférorité", noteJa: "劣勢(より少なく〜)" },
      { label: "aussi rapide que", noteFr: "Égalité", noteJa: "同等(同じくらい)" },
      { label: "bon → meilleur (irrégulier)", noteFr: "Comparatif irrégulier", noteJa: "不規則な比較形" }
    ],
    examples: [
      { fr: "Paris est plus grand que Lyon.", ja: "パリはリヨンより大きいです。" },
      { fr: "Ce gâteau est meilleur que l'autre.", ja: "このケーキはもう一方より美味しいです。" },
      { fr: "Elle court aussi vite que son frère.", ja: "彼女は兄(弟)と同じくらい速く走ります。" },
      { fr: "C'est le plus beau jour de ma vie.", ja: "これは私の人生で最も美しい日です。" }
    ]
  },
  g25: {
    titleFr: "Aller en / à + moyen de transport", titleJa: "aller en/à + 交通手段",
    explanationFr: "Pour dire comment on se déplace, on utilise « en » + moyen de transport (en train, en avion, en voiture), sauf pour « à pied » et « à vélo » qui utilisent « à ».",
    explanationJa: "移動手段を言うときは「en」+交通手段(en train、en avion、en voiture)を使いますが、「à pied」(歩いて)と「à vélo」(自転車で)は例外的に「à」を使います。",
    patternFr: "aller + en + [transport] (sauf à pied / à vélo)",
    patternJa: "aller + en + [交通手段](à pied/à véloは例外)",
    items: [
      { label: "en train / en avion / en voiture", noteFr: "« en » pour la plupart des transports", noteJa: "ほとんどの交通手段には「en」" },
      { label: "à pied / à vélo", noteFr: "Exceptions avec « à »", noteJa: "「à」を使う例外" }
    ],
    examples: [
      { fr: "Je vais à Paris en train.", ja: "私は電車でパリに行きます。" },
      { fr: "Elle va à l'école à pied.", ja: "彼女は歩いて学校に行きます。" },
      { fr: "Nous voyageons en avion cette année.", ja: "私たちは今年は飛行機で旅行します。" },
      { fr: "Il préfère aller au travail en métro.", ja: "彼は地下鉄で仕事に行くのが好きです。" }
    ]
  },
  g26: {
    titleFr: "Je voudrais (politesse) et les réservations", titleJa: "Je voudrais(丁寧な表現)と予約",
    explanationFr: "« Je voudrais » (conditionnel de « vouloir ») est la formule la plus polie pour demander quelque chose, très utile pour réserver ou commander.",
    explanationJa: "「Je voudrais」(「vouloir」の条件法)は何かを頼むときに最も丁寧な表現で、予約や注文の際に非常に便利です。",
    patternFr: "Je voudrais + nom/infinitif (formule polie)",
    patternJa: "Je voudrais + 名詞/動詞の原形(丁寧な表現)",
    items: [
      { label: "Je voudrais réserver...", noteFr: "Pour réserver poliment", noteJa: "丁寧に予約するとき" },
      { label: "Je voudrais une chambre pour deux personnes.", noteFr: "Préciser sa demande", noteJa: "要望を具体的に言う" }
    ],
    examples: [
      { fr: "Je voudrais réserver une chambre pour ce week-end.", ja: "今週末の部屋を予約したいです。" },
      { fr: "Pouvez-vous me donner la clé, s'il vous plaît ?", ja: "鍵をいただけますか?" },
      { fr: "Je voudrais payer par carte de crédit.", ja: "クレジットカードで支払いたいです。" },
      { fr: "L'hôtel est complet, désolé.", ja: "申し訳ありませんが、ホテルは満室です。" }
    ]
  },
  g27: {
    titleFr: "Proposer, accepter et refuser une invitation", titleJa: "誘う・受け入れる・断る",
    explanationFr: "Pour proposer une invitation, on utilise « Tu veux... ? » ou « Ça te dit de... ? ». Pour accepter, « Avec plaisir ! » ou « D'accord ! ». Pour refuser poliment, « Je suis désolé(e), mais... ».",
    explanationJa: "誘うときは「Tu veux...?」(〜したい?)や「Ça te dit de...?」(〜する気ある?)を使います。承諾するときは「Avec plaisir!」(喜んで!)や「D'accord!」(いいよ!)。丁寧に断るときは「Je suis désolé(e), mais...」(申し訳ないけど…)を使います。",
    patternFr: "Tu veux... ? / Ça te dit de... ? → Avec plaisir ! / Je suis désolé(e), mais...",
    patternJa: "Tu veux...? / Ça te dit de...? → Avec plaisir! / Je suis désolé(e), mais...",
    items: [
      { label: "Tu veux venir à ma fête ?", noteFr: "Inviter quelqu'un", noteJa: "誰かを誘う" },
      { label: "Avec plaisir !", noteFr: "Accepter joyeusement", noteJa: "喜んで受け入れる" },
      { label: "Je suis désolé(e), mais je ne peux pas.", noteFr: "Refuser poliment", noteJa: "丁寧に断る" }
    ],
    examples: [
      { fr: "Tu veux venir à mon anniversaire samedi ?", ja: "土曜日の私の誕生日に来る?" },
      { fr: "Avec plaisir, merci de m'inviter !", ja: "喜んで、招待してくれてありがとう!" },
      { fr: "Je suis désolé, mais je suis déjà pris ce jour-là.", ja: "ごめん、その日はもう予定があるんだ。" },
      { fr: "Joyeux anniversaire ! J'ai un cadeau pour toi.", ja: "誕生日おめでとう!あなたへのプレゼントがあるよ。" }
    ]
  },
  g28: {
    titleFr: "Le passé composé avec être", titleJa: "être を使う複合過去(移動動詞)",
    explanationFr: "Certains verbes, surtout de mouvement (aller, venir, partir, arriver, entrer, sortir, monter, descendre, rester, tomber), forment leur passé composé avec « être » au lieu de « avoir ». Le participe passé s'accorde avec le sujet.",
    explanationJa: "移動を表す一部の動詞(aller、venir、partir、arriver、entrer、sortir、monter、descendre、rester、tomber)は、avoirではなく「être」で複合過去を作ります。この場合、過去分詞は主語に性・数を一致させます。",
    patternFr: "[sujet] + être (présent) + participe passé (accordé)",
    patternJa: "[主語] + être(現在形) + 過去分詞(性・数の一致あり)",
    items: [
      { label: "il est allé / elle est allée", noteFr: "Accord au féminin : +e", noteJa: "女性形は+e" },
      { label: "ils sont partis / elles sont parties", noteFr: "Accord au pluriel : +s", noteJa: "複数形は+s" },
      { label: "Verbes avec être", noteFr: "aller, venir, partir, arriver, entrer, sortir, monter, descendre, rester, tomber", noteJa: "aller、venir、partir、arriver、entrer、sortir、monter、descendre、rester、tomber" }
    ],
    examples: [
      { fr: "Elle est allée au marché ce matin.", ja: "彼女は今朝市場に行きました。" },
      { fr: "Ils sont partis en vacances.", ja: "彼らは休暇に出発しました。" },
      { fr: "Nous sommes restés à la maison.", ja: "私たちは家に留まりました。" },
      { fr: "Elle est tombée, mais ça va.", ja: "彼女は倒れましたが、大丈夫です。" }
    ]
  },
  g29: {
    titleFr: "Récapitulatif — les points clés du niveau débutant", titleJa: "初級レベルの重要ポイントまとめ",
    explanationFr: "Félicitations, vous avez terminé le parcours débutant ! Voici un récapitulatif des structures essentielles apprises : être/avoir, les articles, les verbes en -er, le futur proche, l'impératif, le passé composé (avec avoir et être), les comparatifs, et bien plus. Continuez à pratiquer régulièrement !",
    explanationJa: "おめでとうございます、初級コースを終えました!学んだ重要な構造のまとめです:être/avoir、冠詞、-er動詞、近接未来、命令形、複合過去(avoirとêtre)、比較表現、その他たくさん。定期的に練習を続けましょう!",
    patternFr: "être/avoir · articles · -er verbes · futur proche · impératif · passé composé · comparatifs",
    patternJa: "être/avoir・冠詞・-er動詞・近接未来・命令形・複合過去・比較表現",
    items: [
      { label: "être / avoir", noteFr: "Les deux verbes les plus utilisés", noteJa: "最もよく使われる2つの動詞" },
      { label: "passé composé", noteFr: "avoir + participe passé (ou être pour le mouvement)", noteJa: "avoir+過去分詞(移動はêtre)" },
      { label: "futur proche", noteFr: "aller + infinitif", noteJa: "aller+動詞の原形" }
    ],
    examples: [
      { fr: "Bravo, tu as fini le niveau débutant !", ja: "よくやった、初級レベルを終えたね!" },
      { fr: "Félicitations pour tous tes efforts !", ja: "あなたの努力全てにおめでとう!" },
      { fr: "Bonne chance pour la suite de ton apprentissage !", ja: "これからの学習も頑張って!" },
      { fr: "C'est génial, continue comme ça !", ja: "すごい、そのまま続けて!" }
    ]
  }
};

// --------------------------------------------------------
// Lecture — textes graduels avec questions de compréhension
// --------------------------------------------------------
const READING_PASSAGES = {
  r00: {
    titleFr: "Comment ça s'écrit ?", titleJa: "綴りは?",
    textFr: "— Bonjour, quel est votre nom ? — Je m'appelle Marie Dupont. — Comment ça s'écrit ? — M-A-R-I-E, D-U-P-O-N-T. — Merci beaucoup ! Et vous, comment vous appelez-vous ? — Je m'appelle Kenji. — Pouvez-vous épeler votre prénom ? — Oui, K-E-N-J-I.",
    textJa: "— こんにちは、お名前は?— マリー・デュポンです。— 綴りは?— M-A-R-I-E、D-U-P-O-N-T です。— どうもありがとうございます!あなたのお名前は?— ケンジです。— 名前を一文字ずつ言っていただけますか?— はい、K-E-N-J-I です。",
    questions: [
      { questionFr: "Quel est le nom de famille de Marie ?", questionJa: "マリーの姓(苗字)は?", options: ["Dupont", "Marie", "Kenji", "Durand"], correctAnswer: "Dupont" },
      { questionFr: "Que signifie « Comment ça s'écrit ? » ?", questionJa: "「Comment ça s'écrit ?」の意味は?", options: ["お元気ですか?", "綴りは?", "何歳ですか?", "どこに住んでいますか?"], correctAnswer: "綴りは?" },
      { questionFr: "Comment s'écrit le prénom de Kenji ?", questionJa: "ケンジの名前のスペルは?", options: ["K-E-N-G-I", "K-E-N-J-I", "K-A-N-J-I", "K-E-N-Z-I"], correctAnswer: "K-E-N-J-I" }
    ]
  },
  r01: {
    titleFr: "Bonjour !", titleJa: "こんにちは!",
    textFr: "Bonjour ! Je m'appelle Aya. Comment tu t'appelles ? — Je m'appelle Paul. Enchanté ! — Enchantée ! Comment ça va ? — Ça va bien, merci. Et toi ? — Ça va bien aussi. Au revoir, Paul ! — Au revoir, Aya, à bientôt !",
    textJa: "こんにちは!私の名前はアヤです。あなたの名前は?— 僕はポールです。はじめまして!— はじめまして!元気?— 元気だよ、ありがとう。あなたは?— 私も元気です。さようなら、ポール!— さようなら、アヤ、またすぐに!",
    questions: [
      { questionFr: "Quel est le premier mot que dit Aya ?", questionJa: "アヤが最初に言った言葉は?", options: ["Au revoir", "Bonjour", "Bonsoir", "Pardon"], correctAnswer: "Bonjour" },
      { questionFr: "Comment se sent Paul ?", questionJa: "ポールの気分は?", options: ["fatigué", "ça va bien", "content triste", "malade"], correctAnswer: "ça va bien" },
      { questionFr: "Que signifie « Enchanté(e) » ?", questionJa: "「Enchanté(e)」の意味は?", options: ["さようなら", "はじめまして", "ありがとう", "すみません"], correctAnswer: "はじめまして" }
    ]
  },
  r02: {
    titleFr: "Je suis japonaise", titleJa: "私は日本人です",
    textFr: "Bonjour ! Je m'appelle Aya. Je suis japonaise. Je suis étudiante. Je suis contente aujourd'hui. Mon ami s'appelle Paul. Il est français. Il est sympa. Nous sommes amis.",
    textJa: "こんにちは!私の名前はアヤです。私は日本人です。私は学生です。今日、私は嬉しいです。私の友達はポールという名前です。彼はフランス人です。彼はいい人です。私たちは友達です。",
    questions: [
      { questionFr: "Quelle est la nationalité d'Aya ?", questionJa: "アヤの国籍は?", options: ["Française", "Japonaise", "Anglaise", "Italienne"], correctAnswer: "Japonaise" },
      { questionFr: "Comment est Paul ?", questionJa: "ポールはどんな人?", options: ["fatigué", "petit", "sympa", "professeur"], correctAnswer: "sympa" },
      { questionFr: "Comment se sent Aya aujourd'hui ?", questionJa: "アヤは今日どんな気分?", options: ["fatiguée", "contente", "triste", "malade"], correctAnswer: "contente" }
    ]
  },
  r03: {
    titleFr: "J'ai vingt ans", titleJa: "私は20歳です",
    textFr: "Je m'appelle Léo. J'ai vingt ans. J'ai un frère et une sœur. Mon frère a dix-huit ans. Ma sœur a quinze ans. Nous avons aussi un chien. Il s'appelle Milou. Il a trois ans.",
    textJa: "私の名前はレオです。私は20歳です。私には兄(弟)が一人、姉(妹)が一人います。兄(弟)は18歳です。姉(妹)は15歳です。私たちは犬も1匹飼っています。名前はミルーです。3歳です。",
    questions: [
      { questionFr: "Quel âge a Léo ?", questionJa: "レオは何歳?", options: ["dix-huit ans", "vingt ans", "quinze ans", "trois ans"], correctAnswer: "vingt ans" },
      { questionFr: "Qu'est-ce que Milou ?", questionJa: "ミルーは何?", options: ["un frère", "une sœur", "un chien", "un chat"], correctAnswer: "un chien" },
      { questionFr: "Quel âge a la sœur de Léo ?", questionJa: "妹(姉)は何歳?", options: ["vingt ans", "dix-huit ans", "quinze ans", "dix ans"], correctAnswer: "quinze ans" }
    ]
  },
  r04: {
    titleFr: "Ma chambre", titleJa: "私の部屋",
    textFr: "Voici ma chambre. Il y a une table et deux chaises. Sur la table, il y a un livre et un stylo. Il y a aussi un ordinateur. La fenêtre est grande et la porte est petite. J'aime ma maison.",
    textJa: "これが私の部屋です。テーブルが1つと椅子が2つあります。テーブルの上には本とペンがあります。パソコンもあります。窓は大きく、ドアは小さいです。私は自分の家が好きです。",
    questions: [
      { questionFr: "Combien de chaises y a-t-il dans la chambre ?", questionJa: "部屋には椅子がいくつある?", options: ["une", "deux", "trois", "quatre"], correctAnswer: "deux" },
      { questionFr: "Qu'est-ce qu'il y a sur la table ?", questionJa: "テーブルの上にあるものは?", options: ["un sac et un téléphone", "un livre et un stylo", "une chaise et une porte", "un ordinateur et une fenêtre"], correctAnswer: "un livre et un stylo" },
      { questionFr: "Qui est plus grand : la fenêtre ou la porte ?", questionJa: "窓と扉、どちらが大きい?", options: ["la fenêtre", "la porte", "les deux sont grandes", "les deux sont petites"], correctAnswer: "la fenêtre" }
    ]
  },
  r05: {
    titleFr: "Ma famille", titleJa: "私の家族",
    textFr: "Voici ma famille. Nous sommes cinq. Il y a mon père, ma mère, mon frère, ma sœur et moi. Mon père est ingénieur. Il travaille dans une grande entreprise. Ma mère est infirmière. Elle travaille à l'hôpital. Mon frère est étudiant à l'université. Il étudie l'informatique. Ma sœur est petite. Elle aime le piano. Moi, je suis lycéen. Le dimanche, nous allons au parc ensemble. J'aime beaucoup ma famille.",
    textJa: "これが私の家族です。私たちは5人家族です。父、母、兄(弟)、姉(妹)、そして私です。父はエンジニアです。大きな会社で働いています。母は看護師です。病院で働いています。兄(弟)は大学生です。情報科学を勉強しています。妹(姉)は小さいです。ピアノが好きです。私は高校生です。日曜日には、私たちは一緒に公園に行きます。私は家族が大好きです。",
    questions: [
      { questionFr: "Combien de personnes y a-t-il dans la famille ?", questionJa: "家族は何人?", options: ["trois", "quatre", "cinq", "six"], correctAnswer: "cinq" },
      { questionFr: "Quel est le métier du père ?", questionJa: "父の仕事は?", options: ["professeur", "ingénieur", "médecin", "infirmier"], correctAnswer: "ingénieur" },
      { questionFr: "Qu'est-ce que le frère étudie ?", questionJa: "兄(弟)は何を勉強している?", options: ["médecine", "informatique", "musique", "droit"], correctAnswer: "informatique" },
      { questionFr: "Que fait la famille le dimanche ?", questionJa: "日曜日に家族は何をする?", options: ["ils regardent la télévision", "ils vont au parc", "ils font les courses", "ils restent à la maison"], correctAnswer: "ils vont au parc" }
    ]
  },
  r06: {
    titleFr: "Ma routine", titleJa: "私のルーティン",
    textFr: "Chaque matin, je me réveille à sept heures. J'habite avec ma famille à Kyoto. Je mange le petit-déjeuner avec mon père. Ensuite, j'étudie le français à l'école. Mon frère travaille dans un magasin. Le soir, nous regardons la télévision ensemble. Ma sœur aime chanter. Elle chante souvent après le dîner. Le week-end, nous écoutons de la musique.",
    textJa: "毎朝、私は7時に起きます。私は家族と京都に住んでいます。父と一緒に朝食を食べます。それから、学校でフランス語を勉強します。兄(弟)は店で働いています。夜には、私たちは一緒にテレビを見ます。妹(姉)は歌うのが好きです。夕食の後によく歌います。週末には、私たちは音楽を聞きます。",
    questions: [
      { questionFr: "À quelle heure se réveille-t-elle ?", questionJa: "何時に起きる?", options: ["six heures", "sept heures", "huit heures", "neuf heures"], correctAnswer: "sept heures" },
      { questionFr: "Où habite-t-elle ?", questionJa: "どこに住んでいる?", options: ["Paris", "Tokyo", "Kyoto", "Lyon"], correctAnswer: "Kyoto" },
      { questionFr: "Où travaille son frère ?", questionJa: "兄(弟)はどこで働いている?", options: ["à l'école", "dans un magasin", "à l'hôpital", "dans un restaurant"], correctAnswer: "dans un magasin" },
      { questionFr: "Qu'est-ce que sa sœur aime faire ?", questionJa: "妹(姉)が好きなことは?", options: ["danser", "chanter", "cuisiner", "dessiner"], correctAnswer: "chanter" }
    ]
  },
  r07: {
    titleFr: "Au restaurant", titleJa: "レストランで",
    textFr: "Au restaurant, je voudrais du pain, du fromage et de l'eau, s'il vous plaît. Mon ami voudrait de la viande et des légumes. Le serveur apporte aussi du riz et du poisson. Nous aimons beaucoup ce restaurant français. — Merci beaucoup ! — De rien !",
    textJa: "レストランで、パンとチーズと水をお願いします。私の友達は肉と野菜が欲しいそうです。ウェイターは米と魚も持ってきます。私たちはこのフランス料理店がとても好きです。— どうもありがとう!— どういたしまして!",
    questions: [
      { questionFr: "Qu'est-ce que j'ai commandé ?", questionJa: "私は何を注文した?", options: ["du poisson et du riz", "du pain, du fromage et de l'eau", "de la viande seulement", "des légumes seulement"], correctAnswer: "du pain, du fromage et de l'eau" },
      { questionFr: "Qu'est-ce que mon ami voudrait ?", questionJa: "友達が欲しいものは?", options: ["du pain et du café", "de la viande et des légumes", "du lait et une pomme", "de l'eau et du riz"], correctAnswer: "de la viande et des légumes" },
      { questionFr: "Que signifie « De rien » ?", questionJa: "「De rien」の意味は?", options: ["ありがとう", "こんにちは", "どういたしまして", "さようなら"], correctAnswer: "どういたしまして" }
    ]
  },
  r08: {
    titleFr: "Ma semaine", titleJa: "私の一週間",
    textFr: "Voici ma semaine. Le lundi, j'étudie le français à l'école. Le mardi et le mercredi, je travaille dans un café. Le jeudi, j'ai un cours de musique. Le vendredi soir, je regarde un film avec des amis. Le samedi, je fais du sport. Le dimanche, je reste à la maison et j'écoute de la musique. Aujourd'hui, c'est mercredi, alors je travaille cet après-midi.",
    textJa: "これが私の一週間です。月曜日は学校でフランス語を勉強します。火曜日と水曜日はカフェで働きます。木曜日は音楽の授業があります。金曜日の夜は友達と映画を見ます。土曜日はスポーツをします。日曜日は家にいて音楽を聞きます。今日は水曜日なので、今日の午後は働きます。",
    questions: [
      { questionFr: "Qu'y a-t-il le jeudi ?", questionJa: "木曜日に何がある?", options: ["un cours de musique", "un cours de sport", "un film", "du travail"], correctAnswer: "un cours de musique" },
      { questionFr: "Quel jour sommes-nous aujourd'hui ?", questionJa: "今日は何曜日?", options: ["lundi", "mardi", "mercredi", "jeudi"], correctAnswer: "mercredi" },
      { questionFr: "Que fait-elle le dimanche ?", questionJa: "日曜日は何をする?", options: ["travailler", "faire du sport", "rester à la maison", "regarder un film"], correctAnswer: "rester à la maison" }
    ]
  },
  r09: {
    titleFr: "Chez le marchand de chaussures", titleJa: "靴屋さんで",
    textFr: "— Bonjour, je voudrais acheter des chaussures. Combien ça coûte ? — Elles coûtent trente euros. — C'est un peu cher... Vous avez quelque chose de moins cher ? — Oui, ce modèle est bon marché, il coûte quinze euros. — Parfait, je le prends ! Où est la caisse, s'il vous plaît ? — C'est là-bas, à droite.",
    textJa: "— こんにちは、靴を買いたいのですが。いくらですか?— 30ユーロです。— それは少し高いですね…もっと安いものはありますか?— はい、こちらのモデルは安くて、15ユーロです。— いいですね、それにします!レジはどこですか?— あちらの右側です。",
    questions: [
      { questionFr: "Quel est le prix des premières chaussures ?", questionJa: "最初の靴の価格は?", options: ["quinze euros", "vingt euros", "trente euros", "dix euros"], correctAnswer: "trente euros" },
      { questionFr: "Quel est le prix des chaussures finalement choisies ?", questionJa: "お客さんが最終的に選んだ靴の価格は?", options: ["trente euros", "vingt-cinq euros", "quinze euros", "cinq euros"], correctAnswer: "quinze euros" },
      { questionFr: "Où se trouve la caisse ?", questionJa: "レジはどこにある?", options: ["à gauche", "à droite", "devant", "derrière"], correctAnswer: "à droite" }
    ]
  },
  r10: {
    titleFr: "Le week-end dernier", titleJa: "先週末",
    textFr: "Le week-end dernier, il a fait beau à Paris. Samedi, j'ai visité un musée avec ma sœur. Nous avons beaucoup aimé les tableaux. Ensuite, nous avons mangé dans un petit restaurant français. Dimanche, il a plu toute la journée, alors nous avons regardé un film à la maison. Le soir, j'ai parlé avec mes parents au téléphone. C'était un bon week-end !",
    textJa: "先週末、パリは天気が良かったです。土曜日、私は姉(妹)と美術館を訪れました。私たちは絵画がとても気に入りました。それから、小さなフランス料理店で食事をしました。日曜日は一日中雨が降ったので、家で映画を見ました。夜には、両親と電話で話しました。良い週末でした!",
    questions: [
      { questionFr: "Qu'a-t-il fait samedi ?", questionJa: "土曜日に何をした?", options: ["visité un musée", "fait du sport", "travaillé", "voyagé en train"], correctAnswer: "visité un musée" },
      { questionFr: "Quel temps a-t-il fait dimanche ?", questionJa: "日曜日の天気は?", options: ["il a fait beau", "il a plu", "il a fait froid", "il a fait chaud"], correctAnswer: "il a plu" },
      { questionFr: "Qu'ont-ils fait à la maison dimanche ?", questionJa: "日曜日は家で何をした?", options: ["ils ont cuisiné", "ils ont regardé un film", "ils ont dormi", "ils ont lu un livre"], correctAnswer: "ils ont regardé un film" },
      { questionFr: "Qu'a-t-il fait le soir ?", questionJa: "夜、何をした?", options: ["il a écrit une lettre", "il a parlé avec ses parents au téléphone", "il a chanté", "il a dansé"], correctAnswer: "il a parlé avec ses parents au téléphone" }
    ]
  },
  r11: {
    titleFr: "Combien ça coûte ?", titleJa: "いくらですか?",
    textFr: "Au marché, les pommes coûtent deux euros. Les fraises coûtent quatre-vingts centimes. Le fromage coûte quinze euros. Le grand gâteau coûte trente-cinq euros. Ma mère achète tout pour soixante-dix euros. Elle donne cent euros et elle reçoit trente euros de monnaie.",
    textJa: "市場でりんごは2ユーロです。いちごは80サンチームです。チーズは15ユーロです。大きなケーキは35ユーロです。母は全部で70ユーロで買います。彼女は100ユーロを渡して、30ユーロのお釣りを受け取ります。",
    questions: [
      { questionFr: "Combien coûtent les pommes ?", questionJa: "りんごはいくらですか?", options: ["deux euros", "quatre-vingts centimes", "quinze euros", "trente-cinq euros"], correctAnswer: "deux euros" },
      { questionFr: "Combien coûte tout au total ?", questionJa: "合計でいくらですか?", options: ["cent euros", "soixante-dix euros", "trente euros", "quinze euros"], correctAnswer: "soixante-dix euros" },
      { questionFr: "Combien de monnaie reçoit-elle ?", questionJa: "お釣りはいくらですか?", options: ["dix euros", "vingt euros", "trente euros", "cent euros"], correctAnswer: "trente euros" }
    ]
  },
  r12: {
    titleFr: "Ma meilleure amie", titleJa: "私の一番の友達",
    textFr: "Je voudrais vous présenter ma meilleure amie, Léa. Elle a les cheveux longs et les yeux bleus. Elle est mince et assez grande. Léa est très gentille et intelligente. Elle est aussi un peu timide, mais avec ses amis, elle est drôle. Elle a vingt-deux ans, elle est jeune. J'aime beaucoup passer du temps avec elle.",
    textJa: "私の一番の友達、レアを紹介したいです。彼女は髪が長く、青い目をしています。彼女は痩せていて、背が高めです。レアはとても優しくて賢いです。少し内気ですが、友達といるときは面白いです。彼女は22歳で、若いです。私は彼女と過ごす時間がとても好きです。",
    questions: [
      { questionFr: "De quelle couleur sont les yeux de Léa ?", questionJa: "レアの目の色は?", options: ["verts", "bleus", "marron", "noirs"], correctAnswer: "bleus" },
      { questionFr: "Comment est le caractère de Léa ?", questionJa: "レアの性格は?", options: ["méchante et triste", "gentille et intelligente", "fatiguée et timide seulement", "fort et grand"], correctAnswer: "gentille et intelligente" },
      { questionFr: "Quel âge a Léa ?", questionJa: "レアは何歳?", options: ["vingt ans", "vingt-deux ans", "trente ans", "quarante ans"], correctAnswer: "vingt-deux ans" }
    ]
  },
  r13: {
    titleFr: "Où est mon chat ?", titleJa: "私の猫はどこ?",
    textFr: "Je cherche mon chat partout. Il n'est pas sous le lit. Il n'est pas derrière la porte. Il n'est pas dans la cuisine. Finalement, je le trouve ! Il est sur la chaise, à côté de la fenêtre. Il dort près de moi. Mon chat aime dormir chez moi, dans un endroit chaud.",
    textJa: "私は猫をあちこち探しています。ベッドの下にはいません。ドアの後ろにもいません。台所の中にもいません。ついに見つけました!椅子の上、窓の隣にいます。私の近くで寝ています。私の猫は、暖かい場所で家の中で寝るのが好きです。",
    questions: [
      { questionFr: "Où le chat n'est-il pas ?", questionJa: "猫がいなかった場所は?", options: ["sur la chaise", "sous le lit", "dans le jardin", "près de la fenêtre"], correctAnswer: "sous le lit" },
      { questionFr: "Où trouve-t-elle finalement le chat ?", questionJa: "最終的にどこで猫を見つけた?", options: ["dans la cuisine", "derrière la porte", "sur la chaise, à côté de la fenêtre", "sous la table"], correctAnswer: "sur la chaise, à côté de la fenêtre" },
      { questionFr: "Qu'aime faire le chat ?", questionJa: "猫が好きなことは?", options: ["jouer dehors", "dormir dans un endroit chaud", "manger beaucoup", "courir vite"], correctAnswer: "dormir dans un endroit chaud" }
    ]
  },
  r14: {
    titleFr: "Les instructions de maman", titleJa: "お母さんの指示",
    textFr: "Maman dit : « Léo, viens ici ! Fais tes devoirs avant de jouer. Range ta chambre, s'il te plaît. Prends ton manteau, il fait froid dehors. Écoute bien à l'école et sois sage ! » Léo répond : « Oui, maman, j'arrive ! »",
    textJa: "お母さんが言います:「レオ、ここに来て!遊ぶ前に宿題をしなさい。部屋を片付けてね。コートを持って行きなさい、外は寒いから。学校ではよく話を聞いて、良い子でいてね!」レオは答えます:「うん、お母さん、今行く!」",
    questions: [
      { questionFr: "Que doit faire Léo avant de jouer ?", questionJa: "遊ぶ前に何をすべき?", options: ["dormir", "ses devoirs", "manger", "sortir"], correctAnswer: "ses devoirs" },
      { questionFr: "Pourquoi doit-il prendre son manteau ?", questionJa: "なぜコートを持って行くべき?", options: ["il va pleuvoir", "il fait froid dehors", "il fait chaud", "c'est joli"], correctAnswer: "il fait froid dehors" },
      { questionFr: "Que répond Léo ?", questionJa: "レオは何と答えた?", options: ["Non, jamais !", "Oui, maman, j'arrive !", "Je ne veux pas.", "Plus tard."], correctAnswer: "Oui, maman, j'arrive !" }
    ]
  },
  r15: {
    titleFr: "Mes projets pour la semaine prochaine", titleJa: "来週の予定",
    textFr: "La semaine prochaine, je vais faire beaucoup de choses. Lundi, je vais aller chez le dentiste. Mardi, je vais étudier le français toute la journée. Mercredi, je vais voir mes amis. Le week-end, je vais visiter mes grands-parents. Après la visite, nous allons manger ensemble. Je suis content de mes projets !",
    textJa: "来週、私はたくさんのことをする予定です。月曜日は歯医者に行きます。火曜日は一日中フランス語を勉強します。水曜日は友達に会います。週末には祖父母を訪ねます。訪問の後、私たちは一緒に食事をします。私は自分の予定に満足しています!",
    questions: [
      { questionFr: "Qu'est-ce qu'il va faire lundi ?", questionJa: "月曜日に何をする予定?", options: ["étudier le français", "voir ses amis", "aller chez le dentiste", "visiter ses grands-parents"], correctAnswer: "aller chez le dentiste" },
      { questionFr: "Que va-t-il faire mardi ?", questionJa: "火曜日に何をする予定?", options: ["voir ses amis", "étudier le français toute la journée", "aller chez le dentiste", "manger avec sa famille"], correctAnswer: "étudier le français toute la journée" },
      { questionFr: "Que vont-ils faire après la visite des grands-parents ?", questionJa: "祖父母を訪ねた後、何をする予定?", options: ["dormir", "manger ensemble", "travailler", "voyager"], correctAnswer: "manger ensemble" }
    ]
  },
  r16: {
    titleFr: "Que porter aujourd'hui ?", titleJa: "今日何を着る?",
    textFr: "Ce matin, je choisis mes vêtements. Je mets un pantalon noir et une chemise blanche. Il fait un peu froid, alors je prends mon manteau bleu. Mes chaussettes sont vertes, elles sont drôles. Pour la fête ce soir, ma sœur va porter une robe rouge magnifique. Elle aime beaucoup les couleurs vives.",
    textJa: "今朝、私は服を選びます。黒いズボンと白いシャツを着ます。少し寒いので、青いコートを持って行きます。私の靴下は緑色で、ちょっと面白いです。今晩のパーティーのために、姉(妹)は素敵な赤いドレスを着る予定です。彼女は鮮やかな色がとても好きです。",
    questions: [
      { questionFr: "Quelle couleur est le pantalon ?", questionJa: "ズボンの色は?", options: ["noir", "blanc", "bleu", "vert"], correctAnswer: "noir" },
      { questionFr: "Pourquoi prend-il son manteau ?", questionJa: "なぜコートを持って行く?", options: ["il va pleuvoir", "il fait un peu froid", "il va à une fête", "il fait très chaud"], correctAnswer: "il fait un peu froid" },
      { questionFr: "Que va porter sa sœur ce soir ?", questionJa: "姉(妹)は今晩何を着る予定?", options: ["un pantalon noir", "une robe rouge", "un manteau bleu", "des chaussettes vertes"], correctAnswer: "une robe rouge" }
    ]
  },
  r17: {
    titleFr: "Le week-end de Thomas", titleJa: "トマの週末",
    textFr: "Thomas aime beaucoup les loisirs. Le samedi matin, il fait du sport au parc. Ensuite, il joue au foot avec ses amis. L'après-midi, il aime lire un bon livre ou dessiner. Le dimanche, toute la famille fait du vélo ensemble. Le soir, Thomas joue parfois aux jeux vidéo avec son frère. Il adore aussi la photographie et prend beaucoup de photos pendant ses voyages.",
    textJa: "トマは趣味がとても好きです。土曜日の朝は公園でスポーツをします。それから、友達とサッカーをします。午後は良い本を読んだり絵を描いたりするのが好きです。日曜日は家族全員で一緒にサイクリングをします。夜にはトマは時々兄(弟)とテレビゲームをします。彼は写真も大好きで、旅行中にたくさんの写真を撮ります。",
    questions: [
      { questionFr: "Que fait Thomas samedi matin ?", questionJa: "トマは土曜日の朝に何をする?", options: ["il lit", "il fait du sport au parc", "il dessine", "il voyage"], correctAnswer: "il fait du sport au parc" },
      { questionFr: "Qu'aime-t-il faire l'après-midi ?", questionJa: "午後は何をするのが好き?", options: ["jouer au foot", "lire ou dessiner", "faire du vélo", "jouer aux jeux vidéo"], correctAnswer: "lire ou dessiner" },
      { questionFr: "Qu'est-ce que Thomas adore aussi ?", questionJa: "トマが他に大好きなことは?", options: ["la natation", "la photographie", "le tennis", "la cuisine"], correctAnswer: "la photographie" }
    ]
  },
  r18: {
    titleFr: "Je suis malade", titleJa: "私は病気です",
    textFr: "Aujourd'hui, je ne me sens pas bien. J'ai mal à la tête et j'ai mal à la gorge. Je pense que je suis malade. Ma mère me dit d'aller chez le médecin. Le médecin regarde ma gorge et dit que ce n'est pas grave. Il me donne une ordonnance. J'achète le médicament à la pharmacie. Après deux jours, je me sens beaucoup mieux.",
    textJa: "今日、私は気分が良くありません。頭が痛くて、喉も痛いです。私は病気だと思います。母は医者に行くように言います。医者は喉を見て、大したことはないと言います。処方箋をくれます。私は薬局で薬を買います。2日後、私はずっと良くなります。",
    questions: [
      { questionFr: "Qu'est-ce qui lui fait mal ?", questionJa: "どこが痛い?", options: ["le dos et le ventre", "la tête et la gorge", "la main et le pied", "les yeux"], correctAnswer: "la tête et la gorge" },
      { questionFr: "Où va-t-il/elle ?", questionJa: "どこに行った?", options: ["à l'école", "chez le médecin", "au restaurant", "au marché"], correctAnswer: "chez le médecin" },
      { questionFr: "Où achète-t-il/elle le médicament ?", questionJa: "薬はどこで買った?", options: ["au supermarché", "à la pharmacie", "à l'hôpital", "chez le médecin"], correctAnswer: "à la pharmacie" }
    ]
  },
  r19: {
    titleFr: "Comment aller à la poste ?", titleJa: "郵便局へはどう行く?",
    textFr: "— Excusez-moi, comment aller à la poste ? — C'est facile. Continuez tout droit jusqu'au carrefour. Ensuite, tournez à gauche. Traversez la rue au feu rouge. La poste est en face de la station de métro, au bout de la rue. — Merci beaucoup ! — Je vous en prie, bonne journée !",
    textJa: "— すみません、郵便局へはどう行きますか?— 簡単です。交差点まで直進してください。それから左に曲がってください。赤信号のところで道を渡ってください。郵便局は地下鉄の駅の向かい、道の終わりにあります。— どうもありがとうございます!— どういたしまして、良い一日を!",
    questions: [
      { questionFr: "Que faut-il faire au carrefour ?", questionJa: "交差点で何をすべき?", options: ["tourner à droite", "tourner à gauche", "traverser", "s'arrêter"], correctAnswer: "tourner à gauche" },
      { questionFr: "Où traverse-t-on la rue ?", questionJa: "どこで道を渡る?", options: ["au carrefour", "au feu rouge", "à la station de métro", "à la poste"], correctAnswer: "au feu rouge" },
      { questionFr: "Où est la poste exactement ?", questionJa: "郵便局は正確にどこにある?", options: ["en face de la banque", "en face de la station de métro, au bout de la rue", "à côté du carrefour", "derrière la gare"], correctAnswer: "en face de la station de métro, au bout de la rue" }
    ]
  },
  r20: {
    titleFr: "Les quatre saisons au Japon", titleJa: "日本の四季",
    textFr: "Au Japon, il y a quatre saisons bien distinctes. Au printemps, il fait doux et les cerisiers fleurissent. En été, il fait très chaud et il y a beaucoup de soleil. En automne, la température baisse et les feuilles deviennent rouges et jaunes. En hiver, il neige dans certaines régions et il fait froid. J'aime beaucoup l'automne, c'est ma saison préférée.",
    textJa: "日本には4つのはっきりした季節があります。春は気候が穏やかで、桜が咲きます。夏はとても暑く、晴れの日が多いです。秋は気温が下がり、葉が赤や黄色になります。冬は一部の地域で雪が降り、寒くなります。私は秋がとても好きで、一番好きな季節です。",
    questions: [
      { questionFr: "Que se passe-t-il au printemps ?", questionJa: "春には何が起こる?", options: ["les cerisiers fleurissent", "il neige", "il fait très chaud", "les feuilles tombent"], correctAnswer: "les cerisiers fleurissent" },
      { questionFr: "Comment est l'été ?", questionJa: "夏はどんな感じ?", options: ["froid et nuageux", "doux et venteux", "chaud et ensoleillé", "froid et neigeux"], correctAnswer: "chaud et ensoleillé" },
      { questionFr: "Quelle est la saison préférée de l'auteur ?", questionJa: "筆者が一番好きな季節は?", options: ["le printemps", "l'été", "l'automne", "l'hiver"], correctAnswer: "l'automne" }
    ]
  },
  r21: {
    titleFr: "Un appel important", titleJa: "大切な電話",
    textFr: "— Allô ? — Allô, bonjour, je voudrais parler à monsieur Dupont, s'il vous plaît. — Je suis désolée, la ligne est occupée. Pouvez-vous patienter un instant ? — Oui, bien sûr. — ... Je suis désolée, monsieur Dupont ne peut pas décrocher maintenant. Voulez-vous laisser un message ? — Oui, pouvez-vous lui dire de me rappeler ce soir ? Mon numéro de téléphone est le 06 12 34 56 78. — D'accord, je note. Au revoir !",
    textJa: "— もしもし?— もしもし、こんにちは、デュポンさんとお話ししたいのですが。— 申し訳ございません、電話中です。少しお待ちいただけますか?— はい、もちろんです。— …申し訳ございません、デュポンさんは今電話に出られません。メッセージを残しますか?— はい、今晩電話をかけ直してほしいとお伝えいただけますか?私の電話番号は06 12 34 56 78です。— わかりました、メモします。さようなら!",
    questions: [
      { questionFr: "Pourquoi monsieur Dupont ne peut-il pas décrocher tout de suite ?", questionJa: "なぜデュポンさんはすぐに電話に出られない?", options: ["il n'est pas là", "la ligne est occupée", "il dort", "il ne veut pas"], correctAnswer: "la ligne est occupée" },
      { questionFr: "Que veut faire la personne qui appelle ?", questionJa: "電話をかけた人は何をしたい?", options: ["annuler l'appel", "laisser un message", "raccrocher immédiatement", "rappeler demain"], correctAnswer: "laisser un message" },
      { questionFr: "Quand monsieur Dupont doit-il rappeler ?", questionJa: "デュポンさんはいつ電話をかけ直すべき?", options: ["demain matin", "ce soir", "la semaine prochaine", "tout de suite"], correctAnswer: "ce soir" }
    ]
  },
  r22: {
    titleFr: "Ma routine habituelle", titleJa: "私のいつものルーティン",
    textFr: "D'habitude, je me réveille chaque matin à six heures et demie. Je fais toujours du sport avant le petit-déjeuner. Je vais souvent au travail à vélo. Le midi, je mange parfois avec des collègues. Le soir, je regarde rarement la télévision, je préfère lire. Le week-end, je ne travaille jamais. Une fois par semaine, je vais au cinéma avec des amis.",
    textJa: "普段、私は毎朝6時半に起きます。朝食の前にはいつもスポーツをします。よく自転車で仕事に行きます。昼は時々同僚と食事をします。夜はテレビをあまり見ません、読書のほうが好きです。週末は絶対に仕事をしません。週に1回、友達と映画を見に行きます。",
    questions: [
      { questionFr: "À quelle heure se réveille-t-il chaque matin ?", questionJa: "毎朝何時に起きる?", options: ["six heures", "six heures et demie", "sept heures", "huit heures"], correctAnswer: "six heures et demie" },
      { questionFr: "Comment va-t-il souvent au travail ?", questionJa: "よくどうやって仕事に行く?", options: ["en voiture", "à vélo", "en bus", "à pied"], correctAnswer: "à vélo" },
      { questionFr: "Que fait-il le week-end ?", questionJa: "週末は何をする?", options: ["il travaille toujours", "il ne travaille jamais", "il travaille parfois", "il travaille souvent"], correctAnswer: "il ne travaille jamais" }
    ]
  },
  r23: {
    titleFr: "Une chambre vide", titleJa: "空っぽの部屋",
    textFr: "Je rentre chez moi et je remarque que quelque chose est différent. Il n'y a personne dans le salon. Il n'y a plus rien sur la table. Je cherche mes clés, mais je ne trouve rien. Je n'ai aucune idée de ce qui se passe. Finalement, je vois un message : « Nous sommes déjà partis à la fête, viens nous rejoindre ! » Ah, je comprends enfin !",
    textJa: "家に帰ると、何かが違うことに気づきます。リビングには誰もいません。テーブルの上にはもう何もありません。鍵を探しますが、何も見つかりません。何が起こっているのか全く分かりません。ついにメッセージを見つけます:「もうパーティーに出発したよ、合流して!」ああ、ついに分かりました!",
    questions: [
      { questionFr: "Qui est dans le salon ?", questionJa: "リビングには誰がいる?", options: ["toute la famille", "personne", "un ami", "le chat"], correctAnswer: "personne" },
      { questionFr: "Que trouve-t-il/elle en cherchant ses clés ?", questionJa: "鍵を探して見つけたものは?", options: ["ses clés", "rien", "de l'argent", "un message seulement d'abord"], correctAnswer: "rien" },
      { questionFr: "Où sont partis les autres ?", questionJa: "他の人たちはどこに行った?", options: ["au travail", "à la fête", "à l'école", "chez le médecin"], correctAnswer: "à la fête" }
    ]
  },
  r24: {
    titleFr: "Deux villes différentes", titleJa: "2つの異なる都市",
    textFr: "Tokyo et Paris sont deux villes très différentes. Tokyo est plus grande que Paris, avec beaucoup plus d'habitants. Le métro de Tokyo est aussi rapide que celui de Paris, mais il est souvent plus ponctuel. La nourriture parisienne est délicieuse, mais je pense que le ramen japonais est meilleur ! Le prix des logements est plus cher à Tokyo qu'en province française. Malgré ces différences, j'aime les deux villes autant.",
    textJa: "東京とパリはとても異なる2つの都市です。東京はパリより大きく、はるかに人口が多いです。東京の地下鉄はパリと同じくらい速いですが、より時間に正確なことが多いです。パリの食べ物は美味しいですが、日本のラーメンのほうが美味しいと思います!住宅の値段は東京のほうがフランスの地方より高いです。これらの違いにもかかわらず、私は両方の都市が同じくらい好きです。",
    questions: [
      { questionFr: "Quelle ville est la plus grande ?", questionJa: "どちらの都市が大きい?", options: ["Paris", "Tokyo", "Les deux sont pareilles", "Aucune information"], correctAnswer: "Tokyo" },
      { questionFr: "Que pense l'auteur du ramen ?", questionJa: "筆者はラーメンについてどう思っている?", options: ["moins bon que la nourriture parisienne", "meilleur que la nourriture parisienne", "aussi mauvais", "il n'aime pas"], correctAnswer: "meilleur que la nourriture parisienne" },
      { questionFr: "Comment l'auteur aime-t-il les deux villes ?", questionJa: "筆者は両方の都市をどのように好きか?", options: ["il préfère Paris", "il préfère Tokyo", "il les aime autant", "il n'aime aucune des deux"], correctAnswer: "il les aime autant" }
    ]
  },
  r25: {
    titleFr: "Comment vas-tu à l'école ?", titleJa: "学校にはどうやって行く?",
    textFr: "— Comment vas-tu à l'école ? — D'habitude, je vais à l'école à pied, ça prend quinze minutes. Mais quand il pleut, je prends le bus. Mon frère, lui, va à l'université en métro parce que c'est loin. Le week-end, notre famille aime voyager en train pour visiter d'autres villes. L'année dernière, nous avons même pris l'avion pour aller à l'étranger !",
    textJa: "— 学校にはどうやって行くの?— 普段は歩いて学校に行きます、15分かかります。でも雨の時はバスに乗ります。私の兄(弟)は、大学が遠いので地下鉄で行きます。週末は、私たちの家族は他の都市を訪れるために電車で旅行するのが好きです。去年は、海外に行くために飛行機にも乗りました!",
    questions: [
      { questionFr: "Comment va-t-il/elle à l'école d'habitude ?", questionJa: "普段どうやって学校に行く?", options: ["en bus", "à pied", "en métro", "en voiture"], correctAnswer: "à pied" },
      { questionFr: "Pourquoi son frère prend-il le métro ?", questionJa: "なぜ兄(弟)は地下鉄に乗る?", options: ["c'est plus rapide", "l'université est loin", "il n'aime pas marcher", "il n'a pas de vélo"], correctAnswer: "l'université est loin" },
      { questionFr: "Comment ont-ils voyagé à l'étranger l'année dernière ?", questionJa: "去年、海外へどうやって旅行した?", options: ["en train", "en bateau", "en avion", "en voiture"], correctAnswer: "en avion" }
    ]
  },
  r26: {
    titleFr: "À la réception de l'hôtel", titleJa: "ホテルのフロントで",
    textFr: "— Bonjour, je voudrais réserver une chambre pour deux nuits, s'il vous plaît. — Bien sûr, pour combien de personnes ? — Pour deux personnes. — D'accord, nous avons une chambre libre. Le petit-déjeuner est inclus. — Parfait ! Comment puis-je payer ? — Vous pouvez payer par carte de crédit à la réception. — Merci beaucoup. — Voici votre clé, chambre numéro douze. Bon séjour !",
    textJa: "— こんにちは、2泊分の部屋を予約したいのですが。— もちろんです、何名様ですか?— 2名です。— わかりました、空いている部屋があります。朝食は含まれています。— 完璧です!どのようにお支払いできますか?— フロントでクレジットカードでお支払いいただけます。— どうもありがとうございます。— こちらが鍵です、12号室です。良いご滞在を!",
    questions: [
      { questionFr: "Pour combien de nuits réserve-t-il/elle ?", questionJa: "何泊予約した?", options: ["une nuit", "deux nuits", "trois nuits", "une semaine"], correctAnswer: "deux nuits" },
      { questionFr: "Qu'est-ce qui est inclus ?", questionJa: "何が含まれている?", options: ["le déjeuner", "le petit-déjeuner", "le dîner", "rien"], correctAnswer: "le petit-déjeuner" },
      { questionFr: "Quel est le numéro de la chambre ?", questionJa: "部屋番号は?", options: ["dix", "douze", "vingt", "deux"], correctAnswer: "douze" }
    ]
  },
  r27: {
    titleFr: "L'invitation de Sarah", titleJa: "サラの招待",
    textFr: "Sarah organise une fête pour son anniversaire samedi prochain. Elle invite tous ses amis. « Tu veux venir à ma fête ? » demande-t-elle à Paul. « Avec plaisir ! » répond-il. Mais Julie doit refuser : « Je suis désolée, mais je pars en voyage ce week-end. » Le jour de la fête, tout le monde se retrouve chez Sarah avec des cadeaux. Tous chantent « Joyeux anniversaire ! » et célèbrent ensemble.",
    textJa: "サラは来週の土曜日、自分の誕生日パーティーを開きます。彼女は全ての友達を招待します。「私のパーティーに来る?」とポールに尋ねます。「喜んで!」と彼は答えます。しかしジュリーは断らなければなりません:「ごめんね、この週末は旅行に行くんだ。」パーティーの日、みんながプレゼントを持ってサラの家に集まります。みんなで「誕生日おめでとう!」と歌い、一緒にお祝いします。",
    questions: [
      { questionFr: "Que répond Paul à l'invitation ?", questionJa: "ポールは招待にどう答えた?", options: ["il refuse", "il accepte avec plaisir", "il ne répond pas", "il hésite"], correctAnswer: "il accepte avec plaisir" },
      { questionFr: "Pourquoi Julie refuse-t-elle ?", questionJa: "なぜジュリーは断った?", options: ["elle est malade", "elle part en voyage", "elle n'aime pas les fêtes", "elle travaille"], correctAnswer: "elle part en voyage" },
      { questionFr: "Qu'apportent les invités à la fête ?", questionJa: "招待客はパーティーに何を持ってくる?", options: ["des livres", "des cadeaux", "de la nourriture seulement", "rien"], correctAnswer: "des cadeaux" }
    ]
  },
  r28: {
    titleFr: "Un voyage mouvementé", titleJa: "出来事の多い旅行",
    textFr: "La semaine dernière, je suis parti en voyage avec ma famille. Nous sommes arrivés à la gare très tôt. Ma sœur est montée dans le train la première. Pendant le voyage, mon petit frère est tombé, mais il n'a pas eu mal. Nous sommes descendus du train à midi. Le soir, nous sommes restés dans un petit hôtel près de la mer. Nous sommes revenus à la maison trois jours plus tard.",
    textJa: "先週、私は家族と旅行に出発しました。私たちはとても早く駅に到着しました。姉(妹)が最初に電車に乗りました。旅行中、私の弟(幼い方)が倒れましたが、痛くはありませんでした。私たちは正午に電車から降りました。夜は海の近くの小さなホテルに泊まりました。私たちは3日後に家に戻ってきました。",
    questions: [
      { questionFr: "Qui est monté dans le train le premier ?", questionJa: "最初に電車に乗ったのは?", options: ["le père", "la sœur", "le petit frère", "la mère"], correctAnswer: "la sœur" },
      { questionFr: "Qu'est-il arrivé au petit frère ?", questionJa: "幼い弟に何が起きた?", options: ["il est tombé", "il est parti", "il est resté à la maison", "il a pleuré"], correctAnswer: "il est tombé" },
      { questionFr: "Quand sont-ils revenus à la maison ?", questionJa: "いつ家に戻った?", options: ["le jour même", "deux jours plus tard", "trois jours plus tard", "une semaine plus tard"], correctAnswer: "trois jours plus tard" }
    ]
  },
  r29: {
    titleFr: "Félicitations pour votre progrès !", titleJa: "あなたの進歩におめでとう!",
    textFr: "Vous avez terminé le parcours débutant du français ! Vous connaissez maintenant l'alphabet, les nombres, la famille, la nourriture, les couleurs, et beaucoup de grammaire importante comme le passé composé et le futur proche. C'est un grand accomplissement ! Continuez à écouter du français, à lire des textes simples, et à pratiquer chaque jour. Bonne chance pour la suite de votre apprentissage !",
    textJa: "あなたはフランス語の初級コースを終えました!今では、アルファベット、数字、家族、食べ物、色、そして複合過去や近接未来など多くの重要な文法を知っています。これは大きな成果です!フランス語を聞き続け、簡単な文章を読み、毎日練習を続けましょう。これからの学習も頑張ってください!",
    questions: [
      { questionFr: "Qu'est-ce que l'apprenant connaît maintenant ?", questionJa: "学習者は今何を知っている?", options: ["seulement l'alphabet", "l'alphabet, les nombres, la famille et plus", "seulement les couleurs", "rien de nouveau"], correctAnswer: "l'alphabet, les nombres, la famille et plus" },
      { questionFr: "Que faut-il continuer à faire ?", questionJa: "何を続けるべき?", options: ["arrêter d'étudier", "écouter, lire et pratiquer chaque jour", "étudier seulement une fois par mois", "oublier le français"], correctAnswer: "écouter, lire et pratiquer chaque jour" },
      { questionFr: "Comment le texte décrit-il cet accomplissement ?", questionJa: "この達成をどう表現している?", options: ["sans importance", "un grand accomplissement", "un échec", "normal"], correctAnswer: "un grand accomplissement" }
    ]
  }
};

// --------------------------------------------------------
// Dictée — phrases courtes à écouter puis écrire (2 par étape)
// --------------------------------------------------------
const DICTATION_ITEMS = {
  d00a: { textFr: "Comment ça s'écrit ?", hintFr: "Écoutez comment on demande l'orthographe d'un mot.", hintJa: "「それはどう書きますか?(綴りは?)」" },
  d00b: { textFr: "A, B, C, D, E.", hintFr: "Écoutez les 5 premières lettres de l'alphabet.", hintJa: "アルファベットの最初の5文字を聞いて書きましょう。" },
  d01a: { textFr: "Bonjour, comment ça va ?", hintFr: "Écoutez une salutation suivie d'une question sur l'humeur.", hintJa: "「こんにちは、元気ですか?」を聞いて書きましょう。" },
  d01b: { textFr: "Merci beaucoup !", hintFr: "Écoutez une formule de remerciement enthousiaste.", hintJa: "「どうもありがとう!」" },
  d02a: { textFr: "Je suis content.", hintFr: "Écoutez une phrase exprimant la joie.", hintJa: "「私は嬉しいです」" },
  d02b: { textFr: "Tu es français ?", hintFr: "Écoutez une question sur la nationalité.", hintJa: "「あなたはフランス人ですか?」" },
  d03a: { textFr: "J'ai vingt ans.", hintFr: "Écoutez une phrase donnant un âge.", hintJa: "「私は20歳です」" },
  d03b: { textFr: "Il y a trois chats.", hintFr: "Écoutez une phrase avec « il y a » et un nombre d'animaux.", hintJa: "「猫が3匹います」" },
  d04a: { textFr: "Voici un livre et un stylo.", hintFr: "Écoutez une phrase présentant deux objets.", hintJa: "「これは本とペンです」" },
  d04b: { textFr: "La fenêtre est grande.", hintFr: "Écoutez une description d'un objet de la pièce.", hintJa: "「窓は大きいです」" },
  d05a: { textFr: "Voici ma famille.", hintFr: "Écoutez une phrase présentant la famille.", hintJa: "「これが私の家族です」" },
  d05b: { textFr: "Mon père est ingénieur.", hintFr: "Écoutez une phrase sur la profession du père.", hintJa: "「私の父はエンジニアです」" },
  d06a: { textFr: "Je travaille à Tokyo.", hintFr: "Écoutez une phrase sur un lieu de travail.", hintJa: "「私は東京で働いています」" },
  d06b: { textFr: "Nous regardons la télévision.", hintFr: "Écoutez une phrase sur une activité du soir.", hintJa: "「私たちはテレビを見ます」" },
  d07a: { textFr: "Je voudrais du pain.", hintFr: "Écoutez une phrase de commande au restaurant.", hintJa: "「パンをお願いします」" },
  d07b: { textFr: "Elle mange des pommes.", hintFr: "Écoutez une phrase sur un fruit.", hintJa: "「彼女はりんごを食べます」" },
  d08a: { textFr: "Aujourd'hui, c'est mercredi.", hintFr: "Écoutez une phrase donnant le jour de la semaine.", hintJa: "「今日は水曜日です」" },
  d08b: { textFr: "Quelle heure est-il ?", hintFr: "Écoutez une question sur l'heure.", hintJa: "「今何時ですか?」" },
  d09a: { textFr: "Combien ça coûte ?", hintFr: "Écoutez une question sur le prix.", hintJa: "「それはいくらですか?」" },
  d09b: { textFr: "C'est trop cher.", hintFr: "Écoutez une phrase sur un prix élevé.", hintJa: "「それは高すぎます」" },
  d10a: { textFr: "Il a fait beau samedi.", hintFr: "Écoutez une phrase sur la météo de samedi.", hintJa: "「土曜日は天気が良かったです」" },
  d10b: { textFr: "Nous avons regardé un film.", hintFr: "Écoutez une phrase sur une activité passée.", hintJa: "「私たちは映画を見ました」" },
  d11a: { textFr: "Ça coûte quatre-vingts euros.", hintFr: "Écoutez une phrase donnant un prix.", hintJa: "「それは80ユーロです」" },
  d11b: { textFr: "J'ai soixante-dix ans.", hintFr: "Écoutez une phrase donnant un âge élevé.", hintJa: "「私は70歳です」" },
  d12a: { textFr: "Elle a les cheveux longs.", hintFr: "Écoutez une description des cheveux.", hintJa: "「彼女は髪が長いです」" },
  d12b: { textFr: "Il est très gentil.", hintFr: "Écoutez une phrase sur le caractère de quelqu'un.", hintJa: "「彼はとても優しいです」" },
  d13a: { textFr: "Le chat est sous la table.", hintFr: "Écoutez une phrase de localisation.", hintJa: "「猫はテーブルの下にいます」" },
  d13b: { textFr: "Je vais chez mon ami.", hintFr: "Écoutez une phrase avec « chez ».", hintJa: "「私は友達の家に行きます」" },
  d14a: { textFr: "Viens ici !", hintFr: "Écoutez un ordre court.", hintJa: "「ここに来て!」" },
  d14b: { textFr: "Ferme la porte, s'il te plaît.", hintFr: "Écoutez une instruction polie.", hintJa: "「ドアを閉めてください」" },
  d15a: { textFr: "Je vais partir demain.", hintFr: "Écoutez une phrase au futur proche.", hintJa: "「私は明日出発します」" },
  d15b: { textFr: "Nous allons manger ce soir.", hintFr: "Écoutez un projet pour ce soir.", hintJa: "「私たちは今晩食べます」" },
  d16a: { textFr: "J'ai une chemise bleue.", hintFr: "Écoutez une phrase sur un vêtement et sa couleur.", hintJa: "「私は青いシャツを持っています」" },
  d16b: { textFr: "Ses chaussures sont noires.", hintFr: "Écoutez une description de chaussures.", hintJa: "「彼(彼女)の靴は黒いです」" },
  d17a: { textFr: "Je fais du sport le week-end.", hintFr: "Écoutez une phrase sur une activité sportive.", hintJa: "「私は週末にスポーツをします」" },
  d17b: { textFr: "Il joue au foot avec ses amis.", hintFr: "Écoutez une phrase sur un jeu avec des amis.", hintJa: "「彼は友達とサッカーをします」" },
  d18a: { textFr: "J'ai mal à la tête.", hintFr: "Écoutez une phrase sur une douleur.", hintJa: "「頭が痛いです」" },
  d18b: { textFr: "Il est malade aujourd'hui.", hintFr: "Écoutez une phrase sur l'état de santé de quelqu'un.", hintJa: "「彼は今日病気です」" },
  d19a: { textFr: "Tournez à droite, s'il vous plaît.", hintFr: "Écoutez une indication de direction.", hintJa: "「右に曲がってください」" },
  d19b: { textFr: "La banque est en face de la gare.", hintFr: "Écoutez une phrase de localisation.", hintJa: "「銀行は駅の向かいにあります」" },
  d20a: { textFr: "Il fait beau aujourd'hui.", hintFr: "Écoutez une phrase sur le temps qu'il fait.", hintJa: "「今日は天気が良いです」" },
  d20b: { textFr: "Il neige beaucoup en hiver.", hintFr: "Écoutez une phrase sur la neige.", hintJa: "「冬にはたくさん雪が降ります」" },
  d21a: { textFr: "Allô, qui est à l'appareil ?", hintFr: "Écoutez une phrase pour répondre au téléphone.", hintJa: "「もしもし、どちら様ですか?」" },
  d21b: { textFr: "Je voudrais parler à Marie.", hintFr: "Écoutez une demande polie au téléphone.", hintJa: "「マリーさんと話したいのですが」" },
  d22a: { textFr: "Je me lève toujours à sept heures.", hintFr: "Écoutez une phrase avec un adverbe de fréquence.", hintJa: "「私はいつも7時に起きます」" },
  d22b: { textFr: "Je ne fume jamais.", hintFr: "Écoutez une phrase négative avec « jamais ».", hintJa: "「私は絶対にタバコを吸いません」" },
  d23a: { textFr: "Il n'y a plus de pain.", hintFr: "Écoutez une phrase avec « ne...plus ».", hintJa: "「パンはもうありません」" },
  d23b: { textFr: "Je ne connais personne ici.", hintFr: "Écoutez une phrase avec « ne...personne ».", hintJa: "「私はここで誰も知りません」" },
  d24a: { textFr: "Elle est plus grande que moi.", hintFr: "Écoutez une phrase de comparaison.", hintJa: "「彼女は私より背が高いです」" },
  d24b: { textFr: "C'est le plus beau jour de ma vie.", hintFr: "Écoutez une phrase au superlatif.", hintJa: "「これは私の人生で最も美しい日です」" },
  d25a: { textFr: "Je vais à Paris en train.", hintFr: "Écoutez une phrase sur un moyen de transport.", hintJa: "「私は電車でパリに行きます」" },
  d25b: { textFr: "Elle va à l'école à pied.", hintFr: "Écoutez une phrase sur un trajet à pied.", hintJa: "「彼女は歩いて学校に行きます」" },
  d26a: { textFr: "Je voudrais réserver une chambre.", hintFr: "Écoutez une demande de réservation.", hintJa: "「部屋を予約したいです」" },
  d26b: { textFr: "L'addition, s'il vous plaît.", hintFr: "Écoutez une demande au restaurant.", hintJa: "「お会計をお願いします」" },
  d27a: { textFr: "Joyeux anniversaire !", hintFr: "Écoutez une expression de célébration.", hintJa: "「誕生日おめでとう!」" },
  d27b: { textFr: "Avec plaisir, merci de m'inviter !", hintFr: "Écoutez une acceptation joyeuse.", hintJa: "「喜んで、招待してくれてありがとう!」" },
  d28a: { textFr: "Elle est allée au marché.", hintFr: "Écoutez une phrase au passé composé avec être.", hintJa: "「彼女は市場に行きました」" },
  d28b: { textFr: "Ils sont partis en vacances.", hintFr: "Écoutez une phrase sur un départ en vacances.", hintJa: "「彼らは休暇に出発しました」" },
  d29a: { textFr: "Félicitations pour tous tes efforts !", hintFr: "Écoutez une phrase de félicitations.", hintJa: "「あなたの努力全てにおめでとう!」" },
  d29b: { textFr: "Bonne chance pour la suite !", hintFr: "Écoutez un encouragement final.", hintJa: "「これからも頑張って!」" }
};

// --------------------------------------------------------
// Discrimination auditive — paires minimales ciblant les sons
// difficiles à distinguer pour les Japonais (voyelles nasales,
// u/ou, r/l). Le japonais ne fait pas ces distinctions, donc le
// kana seul ne suffit pas — l'apprenant doit vraiment écouter.
// --------------------------------------------------------
const MINIMAL_PAIRS = [
  {
    id: 'mp01',
    wordA: { fr: "un", kana: "アン", ja: "1、不定冠詞(男性)" },
    wordB: { fr: "on", kana: "オン", ja: "私たち、人々(非人称代名詞)" },
    contrastFr: "Voyelles nasales : un vs on",
    contrastJa: "鼻母音:un(アン系)と on(オン)の違い"
  },
  {
    id: 'mp02',
    wordA: { fr: "bon", kana: "ボン", ja: "良い、おいしい" },
    wordB: { fr: "banc", kana: "バン", ja: "ベンチ" },
    contrastFr: "Voyelles nasales : on vs an",
    contrastJa: "鼻母音:on(オン)と an(アン系)の違い"
  },
  {
    id: 'mp03',
    wordA: { fr: "vin", kana: "ヴァン", ja: "ワイン" },
    wordB: { fr: "vent", kana: "ヴァン", ja: "風" },
    contrastFr: "Voyelles nasales : in vs an (le kana ne fait pas la différence, il faut écouter)",
    contrastJa: "鼻母音:in系とan系の違い(カタカナでは区別できないので、耳で聞き分けます)"
  },
  {
    id: 'mp04',
    wordA: { fr: "pain", kana: "パン", ja: "パン(食べ物)" },
    wordB: { fr: "pont", kana: "ポン", ja: "橋" },
    contrastFr: "Voyelles nasales : ain vs on",
    contrastJa: "鼻母音:ain系と on の違い"
  },
  {
    id: 'mp05',
    wordA: { fr: "tu", kana: "チュ", ja: "あなた(親しい間で)" },
    wordB: { fr: "tout", kana: "トゥ", ja: "すべて" },
    contrastFr: "Voyelles : u vs ou",
    contrastJa: "母音:u と ou の違い"
  },
  {
    id: 'mp06',
    wordA: { fr: "rue", kana: "リュ", ja: "道、通り" },
    wordB: { fr: "roue", kana: "ルー", ja: "車輪" },
    contrastFr: "Voyelles : u vs ou (après r)",
    contrastJa: "母音:u と ou の違い(rの後)"
  },
  {
    id: 'mp07',
    wordA: { fr: "dessus", kana: "ドゥシュ", ja: "上、の上に" },
    wordB: { fr: "dessous", kana: "ドゥスー", ja: "下、の下に" },
    contrastFr: "Voyelles : u vs ou",
    contrastJa: "母音:u と ou の違い"
  },
  {
    id: 'mp08',
    wordA: { fr: "riz", kana: "リ", ja: "米" },
    wordB: { fr: "lit", kana: "リ", ja: "ベッド" },
    contrastFr: "Consonnes : r vs l (le kana confond les deux, il faut écouter)",
    contrastJa: "子音:rとlの違い(日本語のらりるれろでは区別できません。耳で聞き分けます)"
  },
  {
    id: 'mp09',
    wordA: { fr: "roi", kana: "ロワ", ja: "王" },
    wordB: { fr: "loi", kana: "ロワ", ja: "法律" },
    contrastFr: "Consonnes : r vs l",
    contrastJa: "子音:rとlの違い"
  },
  {
    id: 'mp10',
    wordA: { fr: "deux", kana: "ドゥ", ja: "2" },
    wordB: { fr: "des", kana: "デ", ja: "いくつかの(不定冠詞複数)" },
    contrastFr: "Voyelles : eu vs é",
    contrastJa: "母音:eu(ドゥ)とé(デ)の違い"
  },
  {
    id: 'mp11',
    wordA: { fr: "long", kana: "ロン", ja: "長い" },
    wordB: { fr: "rond", kana: "ロン", ja: "丸い" },
    contrastFr: "Consonnes : l vs r (avec voyelle nasale on)",
    contrastJa: "子音:lとrの違い(鼻母音onを伴う)"
  },
  {
    id: 'mp12',
    wordA: { fr: "bon", kana: "ボン", ja: "良い" },
    wordB: { fr: "vont", kana: "ヴォン", ja: "彼らは行く(aller)" },
    contrastFr: "Consonnes : b vs v",
    contrastJa: "子音:bとvの違い"
  },
  {
    id: 'mp13',
    wordA: { fr: "beau", kana: "ボー", ja: "美しい" },
    wordB: { fr: "veau", kana: "ヴォー", ja: "子牛肉" },
    contrastFr: "Consonnes : b vs v",
    contrastJa: "子音:bとvの違い"
  },
  {
    id: 'mp14',
    wordA: { fr: "cousin", kana: "クザン", ja: "いとこ" },
    wordB: { fr: "coussin", kana: "クッサン", ja: "クッション" },
    contrastFr: "Consonnes : s vs z",
    contrastJa: "子音:sとzの違い"
  },
  {
    id: 'mp15',
    wordA: { fr: "chou", kana: "シュー", ja: "キャベツ" },
    wordB: { fr: "joue", kana: "ジュ", ja: "頬、遊ぶ" },
    contrastFr: "Consonnes : ch [ʃ] vs j [ʒ]",
    contrastJa: "子音:ch[ʃ]とj[ʒ]の違い"
  },
  {
    id: 'mp16',
    wordA: { fr: "les", kana: "レ", ja: "その(複数定冠詞)" },
    wordB: { fr: "lait", kana: "レ", ja: "牛乳" },
    contrastFr: "Voyelles : é [e] vs è [ɛ] (le kana ne fait pas la différence)",
    contrastJa: "母音:é[e]とè[ɛ]の違い(カタカナでは区別できません)"
  },
  {
    id: 'mp17',
    wordA: { fr: "an", kana: "アン", ja: "年" },
    wordB: { fr: "on", kana: "オン", ja: "私たちは(非人称代名詞)" },
    contrastFr: "Voyelles nasales : an vs on",
    contrastJa: "鼻母音:anとonの違い"
  },
  {
    id: 'mp18',
    wordA: { fr: "vue", kana: "ヴュ", ja: "景色" },
    wordB: { fr: "vous", kana: "ヴ", ja: "あなたたち" },
    contrastFr: "Voyelles : u [y] vs ou [u]",
    contrastJa: "母音:u[y]とou[u]の違い"
  },
  {
    id: 'mp19',
    wordA: { fr: "dans", kana: "ダン", ja: "〜の中に" },
    wordB: { fr: "dont", kana: "ドン", ja: "〜の(関係代名詞)" },
    contrastFr: "Voyelles nasales : an vs on",
    contrastJa: "鼻母音:anとonの違い"
  },
  {
    id: 'mp20',
    wordA: { fr: "queue", kana: "ク", ja: "列、尾" },
    wordB: { fr: "cou", kana: "ク", ja: "首" },
    contrastFr: "Voyelles : eu [ø] vs ou [u] (le kana ne fait pas la différence)",
    contrastJa: "母音:eu[ø]とou[u]の違い(カタカナでは区別できません)"
  },
  {
    id: 'mp21',
    wordA: { fr: "main", kana: "マン", ja: "手" },
    wordB: { fr: "mon", kana: "モン", ja: "私の" },
    contrastFr: "Voyelles nasales : in vs on",
    contrastJa: "鼻母音:inとonの違い"
  },
  {
    id: 'mp22',
    wordA: { fr: "fin", kana: "ファン", ja: "終わり" },
    wordB: { fr: "font", kana: "フォン", ja: "彼らはする(faire)" },
    contrastFr: "Voyelles nasales : in vs on",
    contrastJa: "鼻母音:inとonの違い"
  },
  {
    id: 'mp23',
    wordA: { fr: "pour", kana: "プール", ja: "〜のために" },
    wordB: { fr: "pur", kana: "ピュール", ja: "純粋な" },
    contrastFr: "Voyelles : ou [u] vs u [y]",
    contrastJa: "母音:ou[u]とu[y]の違い"
  },
  {
    id: 'mp24',
    wordA: { fr: "jus", kana: "ジュ", ja: "ジュース" },
    wordB: { fr: "joue", kana: "ジュ", ja: "頬、遊ぶ" },
    contrastFr: "Voyelles : u [y] vs ou [u] (même consonne j, le kana ne fait pas la différence)",
    contrastJa: "母音:u[y]とou[u]の違い(同じ子音j、カタカナでは区別できません)"
  },
  {
    id: 'mp25',
    wordA: { fr: "du", kana: "デュ", ja: "〜の(部分冠詞)" },
    wordB: { fr: "doux", kana: "ドゥ", ja: "柔らかい、優しい" },
    contrastFr: "Voyelles : u [y] vs ou [u]",
    contrastJa: "母音:u[y]とou[u]の違い"
  },
  {
    id: 'mp26',
    wordA: { fr: "rire", kana: "リール", ja: "笑う" },
    wordB: { fr: "lire", kana: "リール", ja: "読む" },
    contrastFr: "Consonnes : r vs l (le kana ne fait pas la différence)",
    contrastJa: "子音:rとlの違い(カタカナでは区別できません)"
  },
  {
    id: 'mp27',
    wordA: { fr: "trois", kana: "トロワ", ja: "3" },
    wordB: { fr: "toi", kana: "トワ", ja: "あなた" },
    contrastFr: "Présence du son « r »",
    contrastJa: "「r」の音の有無"
  },
  {
    id: 'mp28',
    wordA: { fr: "cœur", kana: "クール", ja: "心" },
    wordB: { fr: "cours", kana: "クール", ja: "授業、コース" },
    contrastFr: "Voyelles : eu [œ] vs ou [u] (le kana ne fait pas la différence)",
    contrastJa: "母音:eu[œ]とou[u]の違い(カタカナでは区別できません)"
  },
  {
    id: 'mp29',
    wordA: { fr: "sous", kana: "ス", ja: "下に" },
    wordB: { fr: "sûr", kana: "スュール", ja: "確かな" },
    contrastFr: "Voyelles : ou [u] vs u [y]",
    contrastJa: "母音:ou[u]とu[y]の違い"
  },
  {
    id: 'mp30',
    wordA: { fr: "cru", kana: "クリュ", ja: "生の、信じた" },
    wordB: { fr: "cou", kana: "ク", ja: "首" },
    contrastFr: "Voyelles : u [y] vs ou [u]",
    contrastJa: "母音:u[y]とou[u]の違い"
  }
];

// --------------------------------------------------------
// Jeu du genre — le ou la ? (rattaché à g04, Les articles)
// Le japonais n'a pas de genre grammatical : ce jeu entraîne
// spécifiquement la mémorisation du genre des noms.
// --------------------------------------------------------
const GENDER_ITEMS = [
  { fr: "table", article: "la", gender: "f", kana: "ターブル", ja: "テーブル" },
  { fr: "livre", article: "le", gender: "m", kana: "リーヴル", ja: "本" },
  { fr: "stylo", article: "le", gender: "m", kana: "スティロ", ja: "ペン" },
  { fr: "porte", article: "la", gender: "f", kana: "ポルト", ja: "ドア" },
  { fr: "fenêtre", article: "la", gender: "f", kana: "フネートル", ja: "窓" },
  { fr: "maison", article: "la", gender: "f", kana: "メゾン", ja: "家" },
  { fr: "père", article: "le", gender: "m", kana: "ペール", ja: "父" },
  { fr: "mère", article: "la", gender: "f", kana: "メール", ja: "母" },
  { fr: "frère", article: "le", gender: "m", kana: "フレール", ja: "兄・弟" },
  { fr: "sœur", article: "la", gender: "f", kana: "スール", ja: "姉・妹" },
  { fr: "fils", article: "le", gender: "m", kana: "フィス", ja: "息子" },
  { fr: "fille", article: "la", gender: "f", kana: "フィーユ", ja: "娘、女の子" },
  { fr: "pain", article: "le", gender: "m", kana: "パン", ja: "パン" },
  { fr: "café", article: "le", gender: "m", kana: "カフェ", ja: "コーヒー" },
  { fr: "pomme", article: "la", gender: "f", kana: "ポム", ja: "りんご" },
  { fr: "viande", article: "la", gender: "f", kana: "ヴィアンド", ja: "肉" },
  { fr: "riz", article: "le", gender: "m", kana: "リ", ja: "米" },
  { fr: "poisson", article: "le", gender: "m", kana: "ポワソン", ja: "魚" },
  { fr: "tête", article: "la", gender: "f", kana: "テット", ja: "頭" },
  { fr: "dos", article: "le", gender: "m", kana: "ド", ja: "背中" },
  { fr: "chaise", article: "la", gender: "f", kana: "シェーズ", ja: "椅子" },
  { fr: "sac", article: "le", gender: "m", kana: "サック", ja: "バッグ" },
  { fr: "téléphone", article: "le", gender: "m", kana: "テレフォン", ja: "電話" },
  { fr: "lait", article: "le", gender: "m", kana: "レ", ja: "牛乳" },
  { fr: "fromage", article: "le", gender: "m", kana: "フロマージュ", ja: "チーズ" },
  { fr: "manteau", article: "le", gender: "m", kana: "マント", ja: "コート" },
  { fr: "chemise", article: "la", gender: "f", kana: "シュミーズ", ja: "シャツ" },
  { fr: "robe", article: "la", gender: "f", kana: "ロブ", ja: "ドレス" },
  { fr: "voiture", article: "la", gender: "f", kana: "ヴォワチュール", ja: "車" },
  { fr: "chaussure", article: "la", gender: "f", kana: "ショスュール", ja: "靴" }
];

// --------------------------------------------------------
// Phrases utiles — phrasebook non gradué, consultable librement
// (indépendant du programme des 30 étapes)
// --------------------------------------------------------
const PHRASEBOOK = [
  {
    category: "Salutations et politesse", categoryJa: "挨拶と礼儀",
    phrases: [
      { fr: "Bonjour, comment allez-vous ?", kana: "ボンジュール、コモン・タレヴ・ヴ", ja: "こんにちは、お元気ですか?(丁寧)" },
      { fr: "Excusez-moi.", kana: "エクスキュゼ・モワ", ja: "すみません(呼びかけ)" },
      { fr: "S'il vous plaît.", kana: "シル・ヴ・プレ", ja: "お願いします" },
      { fr: "De rien.", kana: "ドゥ・リヤン", ja: "どういたしまして" },
      { fr: "À tout à l'heure.", kana: "ア・トゥ・タ・ルール", ja: "またあとで" },
      { fr: "Bon appétit !", kana: "ボナペティ", ja: "召し上がれ!" }
    ]
  },
  {
    category: "Au restaurant", categoryJa: "レストランで",
    phrases: [
      { fr: "Je voudrais une table pour deux, s'il vous plaît.", kana: "ジュ・ヴドレ・ユヌ・ターブル・プール・ドゥ", ja: "2名用のテーブルをお願いします" },
      { fr: "Qu'est-ce que vous recommandez ?", kana: "ケスク・ヴ・ルコマンデ", ja: "何がお勧めですか?" },
      { fr: "L'addition, s'il vous plaît.", kana: "ラディシオン、シル・ヴ・プレ", ja: "お会計をお願いします" },
      { fr: "C'était délicieux.", kana: "セテ・デリシュー", ja: "とても美味しかったです" },
      { fr: "Je suis allergique aux noix.", kana: "ジュ・スュイ・アレルジック・オ・ノワ", ja: "私はナッツアレルギーです" },
      { fr: "Un verre d'eau, s'il vous plaît.", kana: "アン・ヴェール・ドー", ja: "水を一杯お願いします" }
    ]
  },
  {
    category: "Faire des achats", categoryJa: "買い物",
    phrases: [
      { fr: "Combien ça coûte ?", kana: "コンビヤン・サ・クート", ja: "いくらですか?" },
      { fr: "Je peux l'essayer ?", kana: "ジュ・プ・レセイエ", ja: "試着できますか?" },
      { fr: "Avez-vous une autre taille ?", kana: "アヴェ・ヴ・ユヌ・オートル・タイユ", ja: "他のサイズはありますか?" },
      { fr: "Je regarde seulement, merci.", kana: "ジュ・ルガルド・スルマン", ja: "見ているだけです、ありがとう" },
      { fr: "Acceptez-vous les cartes ?", kana: "アクセプテ・ヴ・レ・キャルト", ja: "カードは使えますか?" },
      { fr: "C'est trop cher pour moi.", kana: "セ・トロ・シェール・プール・モワ", ja: "私には高すぎます" }
    ]
  },
  {
    category: "Demander de l'aide", categoryJa: "助けを求める",
    phrases: [
      { fr: "Pouvez-vous m'aider ?", kana: "プヴェ・ヴ・メデ", ja: "手伝っていただけますか?" },
      { fr: "Je suis perdu(e).", kana: "ジュ・スュイ・ペルデュ", ja: "道に迷いました" },
      { fr: "Appelez une ambulance !", kana: "アプレ・ユヌ・アンビュランス", ja: "救急車を呼んでください!" },
      { fr: "Où sont les toilettes ?", kana: "ウ・ソン・レ・トワレット", ja: "トイレはどこですか?" },
      { fr: "Je ne comprends pas.", kana: "ジュ・ヌ・コンプラン・パ", ja: "わかりません" },
      { fr: "Pouvez-vous parler plus lentement ?", kana: "プヴェ・ヴ・パルレ・プリュ・ラントマン", ja: "もっとゆっくり話していただけますか?" }
    ]
  },
  {
    category: "Petite conversation", categoryJa: "ちょっとした会話",
    phrases: [
      { fr: "D'où venez-vous ?", kana: "ドゥ・ヴネ・ヴ", ja: "どちらの出身ですか?" },
      { fr: "Je viens du Japon.", kana: "ジュ・ヴィヤン・デュ・ジャポン", ja: "私は日本から来ました" },
      { fr: "Depuis combien de temps apprenez-vous le français ?", kana: "ドゥピュイ・コンビヤン・ド・タン・アプルネ・ヴ・ル・フランセ", ja: "いつからフランス語を勉強していますか?" },
      { fr: "C'est la première fois que je viens ici.", kana: "セ・ラ・プルミエール・フォワ・ク・ジュ・ヴィヤン・イシ", ja: "ここに来るのは初めてです" },
      { fr: "On se reverra bientôt !", kana: "オン・ス・ルヴェラ・ビヤント", ja: "またすぐ会いましょう!" },
      { fr: "Passez une bonne journée !", kana: "パセ・ユヌ・ボンヌ・ジュルネ", ja: "良い一日を!" }
    ]
  }
];
