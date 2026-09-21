const quizData = [
  { name: "호날두", src: "./img/호날두.png" },
  { name: "메시", src: "./img/메시.png" },
  { name: "손흥민", src: "./img/손흥민.png" },
  { name: "나카타", src: "./img/나카타.png" },
  { name: "지단", src: "./img/지단.png" },
  { name: "피를로", src: "./img/피를로.png" },
  { name: "호나우지뉴", src: "./img/호나우지뉴.png" },
  { name: "박항서", src: "./img/박항서.png" },
  { name: "히딩크", src: "./img/히딩크.png" },
  { name: "박지성", src: "./img/박지성.png" }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 180;
let timerInterval = null;
let audioCtx = null;

// DOM 요소
const mainBox = document.getElementById("mainBox");
const gameBox = document.getElementById("gameBox");
const quizResults = document.getElementById("quizResults");
const silverScreen = document.getElementById("silverScreen");
const perfectScreen = document.getElementById("perfectScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const silverRestartBtn = document.getElementById("silverRestartBtn");
const perfectRestartBtn = document.getElementById("perfectRestartBtn");

const startHomeBtn = document.getElementById("startHomeBtn");
const homeBtn = document.getElementById("homeBtn");
const resultHomeBtn = document.getElementById("resultHomeBtn");
const silverHomeBtn = document.getElementById("silverHomeBtn");
const perfectHomeBtn = document.getElementById("perfectHomeBtn");

const playerImage = document.getElementById("playerImage");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const timerEl = document.getElementById("timer");
const questionCountEl = document.getElementById("questionCount");

const scoreText = document.getElementById("scoreText");
const silverScoreText = document.getElementById("silverScoreText");
const gradeTitle = document.getElementById("gradeTitle");
const gradeDesc = document.getElementById("gradeDesc");

// AUDIO
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// 1. 골 효과음 (볼륨: 0.35 -> 0.08)
function playGoalSound() {
  initAudio();
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(523, now);
  osc.frequency.exponentialRampToValueAtTime(1046, now + 0.15);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.7);
}

// 2. 노골 효과음 (볼륨: 0.3 -> 0.06)
function playNoGoalSound() {
  initAudio();
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.8);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.8);
}

// 3. 킥 효과음 (볼륨: 0.5 -> 0.1)
function playKickSound() {
  initAudio();
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.25);
}

// 4. 결과 트로피 축하음 (볼륨: 0.3 -> 0.06)
function playPerfectSound() {
  initAudio();
  const now = audioCtx.currentTime;
  const notes = [523, 659, 784, 988, 1047, 1319];

  notes.forEach((frequency, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    const start = now + index * 0.12;

    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.06, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + 0.35);
  });
}

// 5. 음성 TTS 볼륨 (volume: 1 -> 0.4)
function speakGoal() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance("골");
  utterance.lang = "ko-KR";
  utterance.rate = 0.45;
  utterance.pitch = 1.35;
  utterance.volume = 0.4;
  window.speechSynthesis.speak(utterance);
}

function speakNoGoal() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance("노골");
  utterance.lang = "ko-KR";
  utterance.rate = 0.4;
  utterance.pitch = 0.65;
  utterance.volume = 0.4;
  window.speechSynthesis.speak(utterance);
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.65;
  utterance.pitch = 1.3;
  utterance.volume = 0.4;
  window.speechSynthesis.speak(utterance);
}

// 메인 선택 페이지(index.html)로 돌아가기 기능
function goHome() {
  clearInterval(timerInterval);
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  location.href = "../index.html";
}

// 게임 시작
function startGame() {
  initAudio();
  currentIndex = 0;
  score = 0;
  timeLeft = 180;

  clearInterval(timerInterval);

  mainBox.classList.add("hidden");
  quizResults.classList.add("hidden");
  silverScreen.classList.add("hidden");
  perfectScreen.classList.add("hidden");
  gameBox.classList.remove("hidden");

  playKickSound();
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  if (currentIndex >= quizData.length) {
    endGame();
    return;
  }

  const currentQuiz = quizData[currentIndex];
  playerImage.src = encodeURI(currentQuiz.src);
  playerImage.alt = "축구선수 이미지";

  questionCountEl.textContent = `STAGE: ${currentIndex + 1} / ${quizData.length}`;
  answerInput.value = "";

  setTimeout(() => {
    answerInput.focus();
  }, 50);
}

playerImage.onerror = function () {
  console.error("이미지를 불러올 수 없습니다:", this.src);
};

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

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  timerEl.textContent = `TIME: ${m}:${s}`;
}

function checkAnswer() {
  if (currentIndex >= quizData.length) return;

  const userAnswer = answerInput.value.trim().replace(/\s+/g, "");
  const correctAnswer = quizData[currentIndex].name.replace(/\s+/g, "");

  if (userAnswer === correctAnswer) {
    score++;
    playGoalSound();
    speakGoal();
  } else {
    playNoGoalSound();
    speakNoGoal();
  }

  currentIndex++;

  if (currentIndex < quizData.length) {
    setTimeout(() => {
      playKickSound();
      loadQuestion();
    }, 1000);
  } else {
    setTimeout(() => {
      endGame();
    }, 1000);
  }
}

// 게임 종료
function endGame() {
  clearInterval(timerInterval);
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  saveQuizResult("football", score);

  gameBox.classList.add("hidden");

  // 10점 만점: 금색 트로피
  if (score === 10) {
    showPerfect();
    return;
  }

  // 7~9점: 은색 트로피
  if (score >= 7) {
    showSilver();
    return;
  }

  // 0~6점: 일반 결과
  quizResults.classList.remove("hidden");
  scoreText.textContent = score;

  if (score <= 3) {
    gradeTitle.textContent = "AMATEUR";
    gradeDesc.textContent = "몸과 마음이 같지 않습니다. 공부하세요..";
  } else {
    gradeTitle.textContent = "SEMI-PRO";
    gradeDesc.textContent = "조금만 더 노력하면 프로 레벨입니다!";
  }
}

// 은색 트로피 연출 (7~9점)
function showSilver() {
  silverScreen.classList.remove("hidden");
  silverScoreText.textContent = `${score} / 10`;
  playPerfectSound();

  setTimeout(() => {
    speakText("참 잘했습니다! 은메달입니다!");
  }, 700);
}

// 금색 트로피 연출 (10점)
function showPerfect() {
  perfectScreen.classList.remove("hidden");
  playPerfectSound();

  setTimeout(() => {
    speakText("퍼펙트! 축하합니다!");
  }, 700);
}

// 이벤트 리스너
startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", checkAnswer);

restartBtn.addEventListener("click", startGame);
silverRestartBtn.addEventListener("click", startGame);
perfectRestartBtn.addEventListener("click", startGame);

// 홈 버튼 연결 (상위 index.html로 이동)
if (startHomeBtn) startHomeBtn.addEventListener("click", goHome);
homeBtn.addEventListener("click", goHome);
resultHomeBtn.addEventListener("click", goHome);
silverHomeBtn.addEventListener("click", goHome);
perfectHomeBtn.addEventListener("click", goHome);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});