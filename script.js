const questions = [
  // ===== 勢いで判断するタイプ =====

  {
    text: "レストランでは最初に目に入ったメニューを選びがち？",
    riskYes: 8,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "careless"
  },
  {
    text: "買い物中に『残り1個』を見ると欲しくなる？",
    riskYes: 12,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "careless"
  },
  {
    text: "動画を最後まで見ずに次へ進むことが多い？",
    riskYes: 8,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "kind"
  },
  {
    text: "計画より直感を優先することが多い？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "careless"
  },

  // ===== 優しすぎるタイプ =====

  {
    text: "道で困っている人を見ると声をかけたくなる？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "kind",
    typeNo: "careless"
  },
  {
    text: "友達の頼みは断りづらい？",
    riskYes: 12,
    riskNo: 0,
    typeYes: "kind",
    typeNo: "impulse"
  },
  {
    text: "自分より相手を優先することが多い？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "kind",
    typeNo: "greed"
  },
  {
    text: "相談されると最後まで聞いてしまう？",
    riskYes: 8,
    riskNo: 0,
    typeYes: "kind",
    typeNo: "careless"
  },

  // ===== うまい話に弱いタイプ =====

  {
    text: "宝くじで高額当選を想像することがある？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "greed",
    typeNo: "impulse"
  },
  {
    text: "お得という言葉に弱い？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "greed",
    typeNo: "careless"
  },
  {
    text: "無料プレゼントを見ると応募したくなる？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "greed",
    typeNo: "kind"
  },
  {
    text: "少ない努力で大きな成果を期待する方だ？",
    riskYes: 15,
    riskNo: 0,
    typeYes: "greed",
    typeNo: "impulse"
  },

  // ===== 警戒心が薄いタイプ =====

  {
    text: "初対面の人ともすぐ仲良くなれる？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "careless",
    typeNo: "kind"
  },
  {
    text: "利用規約を読まずに同意することが多い？",
    riskYes: 15,
    riskNo: 0,
    typeYes: "careless",
    typeNo: "impulse"
  },
  {
    text: "人を疑うのは良くないと思う？",
    riskYes: 12,
    riskNo: 0,
    typeYes: "careless",
    typeNo: "kind"
  },
  {
    text: "ネットの情報をすぐ信じる方だ？",
    riskYes: 15,
    riskNo: 0,
    typeYes: "careless",
    typeNo: "impulse"
  },

  // ===== 心理ゲーム風 =====

  {
    text: "無人島に持っていくなら食料よりスマホだ？",
    riskYes: 6,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "careless"
  },
  {
    text: "信号待ちで誰もいなければ渡りたくなる？",
    riskYes: 12,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "careless"
  },
  {
    text: "占いは結構当たると思う？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "careless",
    typeNo: "impulse"
  },
  {
    text: "突然100万円もらえるなら理由は気にしない？",
    riskYes: 20,
    riskNo: 0,
    typeYes: "greed",
    typeNo: "careless"
  },

  // ===== 詐欺との関連が強い質問も少し残す =====

  {
    text: "人に頼まれると断れないことが多い？",
    riskYes: 15,
    riskNo: 0,
    typeYes: "kind",
    typeNo: "impulse"
  },
  {
    text: "急なセール情報に飛びつくことがある？",
    riskYes: 15,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "careless"
  },
  {
    text: "人の話を信じやすい方だと思う？",
    riskYes: 15,
    riskNo: 0,
    typeYes: "careless",
    typeNo: "kind"
  },
  {
    text: "秘密の話を聞くとワクワクする？",
    riskYes: 15,
    riskNo: 0,
    typeYes: "impulse",
    typeNo: "careless"
  }
];

questions.sort(() => Math.random() - 0.5);
// ====== タイプ別情報 ======
const resultMap = {
  "impulse-greed": {
    name: "⚡ 即決チャレンジャー",
    message: "チャンスを見ると素早く行動するタイプ。『今だけ』『限定』という言葉に注意しましょう。",
    scam: "SNS型投資詐欺、金融商品詐欺"
  },

  "impulse-kind": {
    name: "🎢 ワクワク優先タイプ",
    message: "面白そうな話や人とのつながりを大切にするタイプ。",
    scam: "SNS型ロマンス詐欺、交際あっせん詐欺"
  },

  "impulse-careless": {
    name: "🚀 スピード重視タイプ",
    message: "考えるより先に動くことが多いタイプ。",
    scam: "架空請求詐欺、ニセ警察詐欺"
  },

  "kind-careless": {
    name: "🤝 お人好しサポーター",
    message: "困っている人を助けたい気持ちが強いタイプ。",
    scam: "オレオレ詐欺、預貯金詐欺"
  },

  "kind-impulse": {
    name: "💖 共感マスター",
    message: "感情移入しやすく、人の話を真剣に聞くタイプ。",
    scam: "SNS型ロマンス詐欺、オレオレ詐欺"
  },

  "kind-greed": {
    name: "🌸 面倒見リーダー",
    message: "周囲を助けるために積極的に動くタイプ。",
    scam: "預貯金詐欺、キャッシュカード詐欺盗"
  },

  "greed-impulse": {
    name: "💰 一攫千金チャレンジャー",
    message: "大きなチャンスを逃したくないタイプ。",
    scam: "SNS型投資詐欺、金融商品詐欺"
  },

  "greed-careless": {
    name: "🎁 お得ハンター",
    message: "お得情報に敏感でチャンスを探すタイプ。",
    scam: "還付金詐欺、ギャンブル詐欺"
  },

  "greed-kind": {
    name: "📈 チャンス追求型",
    message: "人とのつながりも重視するタイプ。",
    scam: "融資保証金詐欺、金融商品詐欺"
  },

  "careless-kind": {
    name: "🔓 信頼しすぎタイプ",
    message: "人を疑うことが苦手なタイプ。",
    scam: "ニセ警察詐欺、キャッシュカード詐欺盗"
  },

  "careless-greed": {
    name: "🌐 情報うのみタイプ",
    message: "ネット情報を信じやすいタイプ。",
    scam: "架空請求詐欺、ニセ警察詐欺"
  },

  "careless-impulse": {
    name: "😌 楽観主義タイプ",
    message: "『大丈夫だろう』と思いやすいタイプ。",
    scam: "還付金詐欺、架空請求詐欺"
  }
};

// ====== ゲーム状態 ======
let currentQuestion = 0;
let totalRisk = 0;

let typeScores = {
  impulse: 0,
  careless: 0,
  kind: 0,
  greed: 0
};

// ====== DOM要素 ======
let questionText = document.getElementById("questionText");
let questionNumber = document.getElementById("questionNumber");
let progressText = document.getElementById("progressText");
let progressFill = document.getElementById("progressFill");
let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");

// ====== 質問表示 ======
function showQuestion() {
  const q = questions[currentQuestion];

  questionText.innerText = q.text;
  questionNumber.innerText = `QUESTION ${currentQuestion + 1}`;
  progressText.innerText = `${currentQuestion + 1} / ${questions.length}`;
  const progress = (currentQuestion / questions.length) * 100;
  progressFill.style.width = `${progress}%`;

  card.classList.remove("fade");
  void card.offsetWidth; // 再描画
  card.classList.add("fade");
}

// ====== 回答処理 ======
function answerQuestion(isYes) {
  const q = questions[currentQuestion];

  if (isYes) {
    totalRisk += q.riskYes || 0;
    typeScores[q.typeYes] += q.riskYes || 0;
  } else {
    totalRisk += q.riskNo || 0;
    typeScores[q.typeNo] += q.riskNo || 0;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ====== 結果表示 ======
function showResult() {
  progressText.innerText = `${questions.length} / ${questions.length}`;
  progressFill.style.width = `100%`;

  // 各タイプの最大スコア
  const maxTypeScores = {};
  for (const type in typeScores) {
    maxTypeScores[type] = questions
      .filter(q => q.typeYes === type || q.typeNo === type)
      .reduce((sum, q) => sum + (q.riskYes*(q.typeYes===type?1:0) + q.riskNo*(q.typeNo===type?1:0)), 0);
  }

  const riskPercent = Math.min(
    100,
    Math.round(totalRisk / questions.reduce((sum,q)=>sum+q.riskYes+q.riskNo,0) * 100)
  );

 const sortedTypes = Object.entries(typeScores)
  .sort((a, b) => b[1] - a[1]);

const primaryType = sortedTypes[0][0];
const secondaryType = sortedTypes[1][0];

const resultKey =
  `${primaryType}-${secondaryType}`;

const result =
  resultMap[resultKey];

  card.innerHTML = `
    <div class="result-title">診断結果</div>
    <div class="result-risk">危険度 ${riskPercent}%</div>
   <div class="result-type">
  あなたは<br>
  「${result.name}」
</div>

<div class="result-message">
  ${result.message}
  <br><br>
  <strong>狙われやすい詐欺</strong><br>
  ${result.scam}
</div>

    <button class="retry-btn learn-btn"
      onclick="window.open('https://www.police.pref.osaka.lg.jp/seikatsu/tokusyusagi/8083.html','_blank')">
      詐欺について学ぶ
    </button>

    <button class="retry-btn" onclick="restartGame()">もう一度診断する</button>
  `;
}

// ====== ゲーム再スタート ======
function restartGame() {
  currentQuestion = 0;
  totalRisk = 0;
  typeScores = { impulse:0, careless:0, kind:0, greed:0 };
  
  // 毎回シャッフル
  questions.sort(() => Math.random() - 0.5);

  card.innerHTML = `
    <div class="question-number" id="questionNumber">QUESTION 1</div>
    <div class="question-text" id="questionText"></div>
    <div class="button-group">
      <button class="answer-btn yes-btn" id="yesBtn">はい</button>
      <button class="answer-btn no-btn" id="noBtn">いいえ</button>
    </div>
  `;

  reconnectElements();
  showQuestion();
}

// ====== ボタン再接続 ======
function reconnectElements() {
  questionText = document.getElementById("questionText");
  questionNumber = document.getElementById("questionNumber");
  const newYesBtn = document.getElementById("yesBtn");
  const newNoBtn = document.getElementById("noBtn");

  newYesBtn.addEventListener("click", () => answerQuestion(true));
  newNoBtn.addEventListener("click", () => answerQuestion(false));

  yesBtn = newYesBtn;
  noBtn = newNoBtn;
}

// ====== 初期設定 ======
yesBtn.addEventListener("click", () => answerQuestion(true));
noBtn.addEventListener("click", () => answerQuestion(false));

showQuestion();
