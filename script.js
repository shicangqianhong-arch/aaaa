// ====== 質問データ（心理ゲーム風に意表を突く） ======
const questions = [
  {
    text: "住むとしたら家は大きい方が良い？",
    riskYes: 1,
    riskNo: 3,
    typeYes: "greed",
    typeNo: "careless"
  },
  {
    text: "猫と犬なら飼うなら猫である。",
    riskYes: 1,
    riskNo: 2,
    typeYes: "impulse",
    typeNo: "kind"
  },
  {
    text: "知らないメールに書かれた甘い話に惹かれる？",
    riskYes: 20,
    riskNo: 0,
    typeYes: "greed",
    typeNo: "careless"
  },
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
    text: "パスワードを複数サービスで同じものを使っている？",
    riskYes: 20,
    riskNo: 0,
    typeYes: "careless",
    typeNo: "impulse"
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
  },
  {
    text: "宝くじや懸賞に応募したことがある？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "greed",
    typeNo: "impulse"
  },
  {
    text: "困っている人を放っておけない？",
    riskYes: 10,
    riskNo: 0,
    typeYes: "kind",
    typeNo: "greed"
  }
];

// ====== タイプ別情報 ======
const typeInfo = {
  impulse: {
    name: "勢いで判断するタイプ",
    message:
      "急かされる話には要注意！<br>一度立ち止まって確認しましょう。"
  },
  careless: {
    name: "警戒心が薄いタイプ",
    message:
      "URLやSMSのリンクは<br>本物か確認する習慣をつけましょう。"
  },
  kind: {
    name: "優しすぎるタイプ",
    message:
      "困っている人を助けたい気持ちは素敵ですが、<br>詐欺師はその優しさを利用します。"
  },
  greed: {
    name: "うまい話に弱いタイプ",
    message:
      "『簡単に儲かる』話は危険！<br>冷静に疑う力を持ちましょう。"
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

  // 最も傾向が強いタイプ
  let highestType = Object.keys(typeScores)[0];
  for (const type in typeScores) {
    if (typeScores[type] > typeScores[highestType]) highestType = type;
  }
  const result = typeInfo[highestType];

  card.innerHTML = `
    <div class="result-title">診断結果</div>
    <div class="result-risk">危険度 ${riskPercent}%</div>
    <div class="result-type">あなたは<br>「${result.name}」</div>
    <div class="result-message">${result.message}</div>

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