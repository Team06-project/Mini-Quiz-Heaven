// 1. 문제를 배열에 저장합니다. correct는 정답 숫자입니다.
// 문제를 바꾸고 싶으면 이 배열만 수정하면 됩니다.
const questions = [
  // STAGE 1: 보통 계산 (5문제)
  { question: "5 + 5 = ?", answers: [8, 10, 12, 15], correct: 10, explanation: "5에 5를 더하면 10입니다." },
  { question: "18 − 9 = ?", answers: [7, 8, 9, 11], correct: 9, explanation: "18에서 9를 빼면 9입니다." },
  { question: "7 + 8 = ?", answers: [13, 14, 16, 15], correct: 15, explanation: "7 + 8 = 15입니다." },
  { question: "5 × 4 = ?", answers: [20, 15, 25, 9], correct: 20, explanation: "5를 4번 더하면 20입니다." },
  { question: "27 ÷ 3 = ?", answers: [6, 8, 9, 12], correct: 9, explanation: "3 × 9 = 27이므로 정답은 9입니다." },
  // STAGE 2: 조금 어려운 곱셈·나눗셈 (5문제)
  { question: "8 × 7 = ?", answers: [48, 54, 64, 56], correct: 56, explanation: "8 × 7 = 56입니다." },
  { question: "72 ÷ 8 = ?", answers: [8, 9, 6, 7], correct: 9, explanation: "8 × 9 = 72이므로 정답은 9입니다." },
  { question: "12 × 4 = ?", answers: [36, 48, 46, 52], correct: 48, explanation: "10 × 4 + 2 × 4 = 40 + 8 = 48입니다." },
  { question: "96 ÷ 6 = ?", answers: [12, 14, 18, 16], correct: 16, explanation: "6 × 16 = 96이므로 정답은 16입니다." },
  { question: "15 × 3 = ?", answers: [45, 35, 50, 40], correct: 45, explanation: "15 + 15 + 15 = 45입니다." },
  // STAGE 3: 두 연산을 섞은 혼합 계산 (5문제)
  { question: "5 × 7 − 8 = ?", answers: [27, 25, 31, 19], correct: 27, explanation: "곱셈을 먼저 계산합니다. 35 − 8 = 27입니다." },
  { question: "30 ÷ 5 + 7 = ?", answers: [10, 12, 13, 15], correct: 13, explanation: "나눗셈을 먼저 계산합니다. 6 + 7 = 13입니다." },
  { question: "8 × 7 − 5 = ?", answers: [48, 51, 53, 56], correct: 51, explanation: "곱셈을 먼저 계산합니다. 56 − 5 = 51입니다." },
  { question: "6 × 9 + 8 = ?", answers: [60, 64, 62, 56], correct: 62, explanation: "6 × 9 = 54를 먼저 구한 뒤 8을 더하면 62입니다." },
  { question: "84 ÷ 7 − 5 = ?", answers: [6, 8, 9, 7], correct: 7, explanation: "84 ÷ 7 = 12, 12 − 5 = 7입니다." },
  // STAGE 4: 괄호와 여러 연산 (5문제)
  { question: "(8 + 7) × 3 = ?", answers: [45, 29, 42, 48], correct: 45, explanation: "괄호를 먼저 계산합니다. 15 × 3 = 45입니다." },
  { question: "9 × 8 − 24 ÷ 6 = ?", answers: [64, 68, 70, 66], correct: 68, explanation: "곱셈과 나눗셈을 먼저 계산하면 72 − 4 = 68입니다." },
  { question: "(36 ÷ 4 + 7) × 2 = ?", answers: [25, 30, 34, 32], correct: 32, explanation: "괄호 안은 9 + 7 = 16, 16 × 2 = 32입니다." },
  { question: "7 × (12 − 5) + 6 = ?", answers: [49, 61, 55, 42], correct: 55, explanation: "괄호 안은 7입니다. 7 × 7 + 6 = 49 + 6 = 55입니다." },
  { question: "(18 + 6) ÷ 3 × 5 = ?", answers: [40, 8, 30, 45], correct: 40, explanation: "괄호 안은 24입니다. 나눗셈과 곱셈은 왼쪽부터 계산해서 24 ÷ 3 × 5 = 8 × 5 = 40입니다." }
];

// 2. HTML 요소를 가져옵니다.
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const questionText = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const feedback = document.getElementById("feedback");
const timerText = document.getElementById("timer");
const timeBar = document.getElementById("time-bar");
const stageClear = document.getElementById("stage-clear");

// 3. 현재 게임 상태입니다. 배열의 첫 번째 번호는 0입니다.
let currentQuestion = 0;
let score = 0;
let timeLeft = 5;
let timer;
let nextTimer; // 다음 문제로 자동 이동할 때 사용하는 타이머
let answered = false;
let endTime = 0;
let userAnswers = []; // 선택한 답을 저장해서 게임이 끝난 뒤 보여줍니다.

function startGame() {
  clearInterval(timer); // 다시 시작할 때 이전 타이머를 지웁니다.
  clearTimeout(nextTimer);
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  intro.hidden = true;
  result.hidden = true;
  stageClear.hidden = true;
  game.hidden = false;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  answered = false;
  // 마지막 4단계는 어려우므로 8초, 1~3단계는 5초입니다.
  timeLeft = currentQuestion >= 15 ? 8 : 5;
  const item = questions[currentQuestion];
  questionText.textContent = item.question;
  document.getElementById("question-number").textContent = "이번 단계 " + (currentQuestion % 5 + 1) + " / 5 · 전체 " + (currentQuestion + 1) + " / " + questions.length;
  document.getElementById("score").textContent = score;
  timerText.textContent = timeLeft + "초";
  timeBar.max = timeLeft;
  timeBar.value = timeLeft;
  feedback.textContent = "정답을 선택하세요.";

  // 문제 번호에 따라 난이도 표시를 변경합니다.
  if (currentQuestion < 5) {
    document.getElementById("stage").textContent = "STAGE 01 · 보통 계산";
  } else if (currentQuestion < 10) {
    document.getElementById("stage").textContent = "STAGE 02 · 곱셈과 나눗셈";
  } else if (currentQuestion < 15) {
    document.getElementById("stage").textContent = "STAGE 03 · 혼합 계산";
  } else {
    document.getElementById("stage").textContent = "STAGE 04 · 괄호와 복합 계산";
  }

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].innerHTML = "<span>0" + (i + 1) + "</span>" + item.answers[i];
    answerButtons[i].disabled = false;
    answerButtons[i].className = "answer";
  }
  questionText.focus();

  // Date.now()는 현재 시각입니다. 제한시간 뒤의 시각과 비교해서
  // 다른 탭을 보다가 돌아와도 제한시간이 늘어나지 않게 합니다.
  endTime = Date.now() + timeLeft * 1000;
  timer = setInterval(function () {
    timeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    timerText.textContent = timeLeft + "초";
    timeBar.value = timeLeft;
    if (timeLeft === 0) {
      checkAnswer(null); // null은 시간 초과를 뜻합니다.
    }
  }, 100);
}

function checkAnswer(selectedAnswer) {
  if (answered) return; // 여러 번 클릭해도 점수는 한 번만 계산합니다.
  if (Date.now() >= endTime) selectedAnswer = null;
  answered = true;
  clearInterval(timer);
  const item = questions[currentQuestion];

  userAnswers.push(selectedAnswer);
  if (selectedAnswer === item.correct) {
    score++;
    feedback.textContent = "정답! +1점";
  } else if (selectedAnswer === null) {
    timerText.textContent = "0초";
    timeBar.value = 0;
    feedback.textContent = "시간 초과!";
  } else {
    feedback.textContent = "아쉬워요! 다음 문제에 도전하세요.";
  }
  document.getElementById("score").textContent = score;

  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].disabled = true;
    if (item.answers[i] === selectedAnswer && selectedAnswer === item.correct) {
      answerButtons[i].classList.add("correct");
    } else if (item.answers[i] === selectedAnswer) {
      answerButtons[i].classList.add("wrong");
    }
  }
  // setTimeout은 정해진 시간이 지난 뒤 함수를 한 번 실행합니다.
  // 700밀리초 = 0.7초 동안 정답/오답 여부만 보여줍니다.
  nextTimer = setTimeout(nextQuestion, 700);
}

function nextQuestion() {
  if (!answered) return;
  currentQuestion++;
  if (currentQuestion % 5 === 0) {
    showStageClear();
  } else {
    showQuestion();
  }
}

// 5문제를 끝낼 때마다 통과 화면을 잠깐 보여줍니다.
function showStageClear() {
  game.hidden = true;
  stageClear.hidden = false;
  const stageNumber = currentQuestion / 5;
  document.getElementById("clear-title").textContent = "STAGE " + stageNumber + " CLEAR!";
  document.getElementById("clear-message").textContent = stageNumber === 4 ? "4개 스테이지 완료! 최종 결과를 확인합니다." : "5문제 완료! 다음은 STAGE " + (stageNumber + 1) + "입니다.";
  document.getElementById("clear-title").focus();
  nextTimer = setTimeout(function () {
    stageClear.hidden = true;
    if (currentQuestion === questions.length) {
      showResult();
    } else {
      game.hidden = false;
      showQuestion();
    }
  }, 1500);
}

function showResult() {
  clearInterval(timer);
  game.hidden = true;
  result.hidden = false;
  document.getElementById("final-score").textContent = score;
  const rank = document.getElementById("rank");
  const message = document.getElementById("result-message");
  if (score < 8) {
    rank.textContent = "워밍업 필요!";
    message.textContent = "아직 엔진이 덜 켜졌어요. 다시 한번 도전해 볼까요?";
  } else if (score < 16) {
    rank.textContent = "굿 플레이!";
    message.textContent = "조금만 더 가면 상위권입니다.";
  } else {
    rank.textContent = "월드클래스!";
    message.textContent = "암산 챔피언 인정! 멋지게 해냈어요.";
  }
  document.getElementById("result-heading").focus();
  showReview();
}

// 게임이 끝나면 전체 문제의 정답과 해설을 보여줍니다.
function showReview() {
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const item = questions[i];
    const myAnswer = userAnswers[i];
    const row = document.createElement("li");
    let label = "오답";
    let answerLabel = myAnswer;
    if (myAnswer === item.correct) {
      label = "정답";
      row.className = "review-correct";
    } else if (myAnswer === null) {
      label = "시간 초과";
      answerLabel = "선택하지 않음";
    }
    // 아래 내용은 이 파일에 직접 작성한 문제와 숫자만 사용합니다.
    row.innerHTML = "<strong>" + (i + 1) + ". " + item.question + " <span>" + label + "</span></strong>"
      + "<p>내 답: " + answerLabel + " · 정답: " + item.correct + "</p>"
      + "<p>" + item.explanation + "</p>";
    reviewList.appendChild(row);
  }
}

// 4. 버튼 클릭과 함수를 연결합니다.
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("retry-button").addEventListener("click", startGame);
for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", function () {
    checkAnswer(questions[currentQuestion].answers[i]);
  });
}
