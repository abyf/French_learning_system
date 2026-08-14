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
  { id: 's10', order: 11, titleFr: "Le week-end dernier (passé composé)", titleJa: "先週末(複合過去)", vocabId: 's10', grammarId: 'g10', readingId: 'r10', dictationIds: ['d10a', 'd10b'] }
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
  d10b: { textFr: "Nous avons regardé un film.", hintFr: "Écoutez une phrase sur une activité passée.", hintJa: "「私たちは映画を見ました」" }
};
