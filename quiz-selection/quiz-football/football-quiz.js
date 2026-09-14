// 제공된 10문제 구성 (파일명 = 정답)
const quizData = [
  { name: "호날두", src: "./img/호날두.png" },
  { name: "메시", src: "./img/메시.png" },
  { name: "손흥민", src: "./img/손흥민.png" },
  { name: "나카타", src: "./img/나카타.png" },
  { name: "지단", src: "./img/지단.png" },
  { name: "피를로", src: "./img/피를로.png" },
  { name: "호나우딩요", src: "./img/호나우딩요.png" },
  { name: "박항서", src: "./img/박항서.png" },
  { name: "히딩크", src: "./img/히딩크.png" },
  { name: "박지성", src: "./img/박지성.png" }
];


let currentIndex = 0;
let score = 0;
let timeLeft = 180; // 3분 제한시간 (180초)
let timerInterval = null;

// DOM 요소
const mainBox = document.getElementById("mainBox");
const gameBox = document.getElementById("gameBox");
const quizResults = document.getElementById("quizResults");
const startBtn = document.getElementById("startBtn");
const playerImage = document.getElementById("playerImage");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const timerEl = document.getElementById("timer");
const questionCountEl = document.getElementById("questionCount");
const scoreText = document.getElementById("scoreText");
const gradeTitle = document.getElementById("gradeTitle");
const gradeDesc = document.getElementById("gradeDesc");
const restartBtn = document.getElementById("restartBtn");

// 이미지 로드 오류 처리
playerImage.onerror = function() {
  console.error(`이미지를 불러올 수 없습니다: ${this.src}`);
};

// 게임 시작 함수
function startGame() {
  currentIndex = 0;
  score = 0;
  timeLeft = 180;

  // 화면 전환
  mainBox.classList.add("hidden");
  quizResults.classList.add("hidden");
  gameBox.classList.remove("hidden");

  loadQuestion();
  startTimer();
}

// 문제 불러오기
function loadQuestion() {
  if (currentIndex >= quizData.length) {
    endGame();
    return;
  }

  const currentQuiz = quizData[currentIndex];
  playerImage.src = currentQuiz.src;
  questionCountEl.textContent = `STAGE: ${currentIndex + 1} / ${quizData.length}`;
  answerInput.value = "";
  answerInput.focus();
}

// 타이머 시작
function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  timerEl.textContent = `TIME: ${formattedMinutes}:${formattedSeconds}`;
}

// 정답 확인
function checkAnswer() {
  const userAnswer = answerInput.value.trim().replace(/\s+/g, "");
  const correctAnswer = quizData[currentIndex].name.replace(/\s+/g, "");

  if (userAnswer === correctAnswer) {
    score++;
  }

  currentIndex++;
  loadQuestion();
}

// 게임 종료 처리 및 결과 출력
function endGame() {
  clearInterval(timerInterval);
  gameBox.classList.add("hidden");
  quizResults.classList.remove("hidden");

  scoreText.textContent = score;

  if (score <= 3) {
    gradeTitle.textContent = "AMATEUR";
    gradeDesc.textContent = "몸과 마음이 같지 않습니다. 공부하세요..";
  } else if (score <= 7) {
    gradeTitle.textContent = "PRO";
    gradeDesc.textContent = "중수의 실력입니다.";
  } else {
    gradeTitle.textContent = "WORLD CLASS";
    gradeDesc.textContent = "센스가 최상이며 축구에 대한 열정이 뛰어 납니다.";
  }
}

// 이벤트 리스너 등록
startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

restartBtn.addEventListener("click", startGame);