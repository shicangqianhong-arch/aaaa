const questions = [
  {
    text: "今だけ限定に弱い？",
    risk: 20,
    type: "impulse"
  },
  {
    text: "知らないURLを押したことがある？",
    risk: 25,
    type: "careless"
  },
  {
    text: "人に頼まれると断れない？",
    risk: 20,
    type: "kind"
  },
  {
    text: "『絶対儲かる』に惹かれる？",
    risk: 25,
    type: "greed"
  },
  {
    text: "パスワードを使い回している？",
    risk: 20,
    type: "careless"
  },
  {
    text: "急かされると冷静さを失う？",
    risk: 20,
    type: "impulse"
  },
  {
    text: "困っている人を見ると放っておけない？",
    risk: 15,
    type: "kind"
  },
  {
    text: "SNS広告をすぐ信じる？",
    risk: 20,
    type: "careless"
  },
  {
    text: "高額プレゼント企画に応募したことがある？",
    risk: 15,
    type: "greed"
  },
  {
    text: "『秘密の話』にワクワクする？",
    risk: 15,
    type: "impulse"
  }
];

const typeInfo = {
  impulse: {
    name: "勢いで判断するタイプ",
    message:
      "急かされる話には要注意！\n一度立ち止まって確認しましょう。"
  },

  careless: {
    name: "警戒心が薄いタイプ",
    message:
      "URLやSMSのリンクは\n本物か確認する習慣をつけましょう。"
  },

  kind: {
    name: "優しすぎるタイプ",
    message:
      "困っている人を助けたい気持ちは素敵ですが、\n詐欺師はその優しさを利用します。"
  },

  greed: {
    name: "うまい話に弱いタイプ",
    message:
      "『簡単に儲かる』話は危険！\n冷静に疑う力を持ちましょう。"
  }
};

let currentQuestion = 0;
let totalRisk = 0;

let typeScores = {
  impulse: 0,
  careless: 0,
  kind: 0,
  greed: 0
};

let questionText =
  document.getElementById("questionText");

let questionNumber =
  document.getElementById("questionNumber");

const progressText =
  document.getElementById("progressText");

const progressFill =
  document.getElementById("progressFill");

let yesBtn =
  document.getElementById("yesBtn");

let noBtn =
  document.getElementById("noBtn");

const card =
  document.getElementById("card");

function showQuestion() {

  const q = questions[currentQuestion];

  questionText.innerText = q.text;

  questionNumber.innerText =
    `QUESTION ${currentQuestion + 1}`;

  progressText.innerText =
    `${currentQuestion + 1} / ${questions.length}`;

  const progress =
    ((currentQuestion) / questions.length) * 100;

  progressFill.style.width = `${progress}%`;

  card.classList.remove("fade");

  void card.offsetWidth;

  card.classList.add("fade");
}

function answerQuestion(isYes) {

  const q = questions[currentQuestion];

  if (isYes) {
    totalRisk += q.risk;

    typeScores[q.type] += q.risk;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {

    showQuestion();

  } else {

    showResult();
  }
}

function showResult() {

  progressText.innerText =
    `${questions.length} / ${questions.length}`;

  progressFill.style.width = `100%`;

  const maxPossible =
    questions.reduce((sum, q) => sum + q.risk, 0);

  const riskPercent =
    Math.min(
      100,
      Math.round((totalRisk / maxPossible) * 100)
    );

  let highestType = "impulse";

  for (const type in typeScores) {

    if (
      typeScores[type] >
      typeScores[highestType]
    ) {
      highestType = type;
    }
  }

  const result = typeInfo[highestType];

 card.innerHTML = `
  <div class="result-title">
    診断結果
  </div>

  <div class="result-risk">
    ${riskPercent}%
  </div>

  <div class="result-type">
    あなたは<br>
    「${result.name}」
  </div>

  <div class="result-message">
    ${result.message.replace(/\n/g, "<br>")}
  </div>

  <button
    class="retry-btn"
    onclick="window.open(
      'https://www.police.pref.osaka.lg.jp/seikatsu/tokusyusagi/8083.html',
      '_blank'
    )"
    style="
      margin-bottom: 16px;
      width: 100%;
    "
  >
    詐欺について学ぶ
  </button>

  <button
    class="retry-btn"
    onclick="restartGame()"
  >
    もう一度診断する
  </button>
`;
}

function restartGame() {

  currentQuestion = 0;
  totalRisk = 0;

  typeScores = {
    impulse: 0,
    careless: 0,
    kind: 0,
    greed: 0
  };

  card.innerHTML = `
    <div class="question-number" id="questionNumber">
      QUESTION 1
    </div>

    <div class="question-text" id="questionText">
    </div>

    <div class="button-group">
      <button class="answer-btn yes-btn" id="yesBtn">
        はい
      </button>

      <button class="answer-btn no-btn" id="noBtn">
        いいえ
      </button>
    </div>
  `;

  reconnectElements();

  showQuestion();
}

function reconnectElements() {

  questionText =
    document.getElementById("questionText");

  questionNumber =
    document.getElementById("questionNumber");

  const newYesBtn =
    document.getElementById("yesBtn");

  const newNoBtn =
    document.getElementById("noBtn");

  newYesBtn.addEventListener("click", () => {
    answerQuestion(true);
  });

  newNoBtn.addEventListener("click", () => {
    answerQuestion(false);
  });
  yesBtn = newYesBtn;
  noBtn = newNoBtn;
}

yesBtn.addEventListener("click", () => {
  answerQuestion(true);
});

noBtn.addEventListener("click", () => {
  answerQuestion(false);
});

showQuestion();
