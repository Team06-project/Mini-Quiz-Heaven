// 1. 문제를 배열에 저장합니다. correct는 정답 숫자입니다.
// 문제를 바꾸고 싶으면 이 배열만 수정하면 됩니다.
const questions = [
  // STAGE 1: 보통 계산 (5문제)
  {
    question: "5 + 5 = ?",
    answers: [8, 10, 12, 15],
    correct: 10,
    explanation: "5에 5를 더하면 10입니다."
  },
  {
    question: "18 − 9 = ?",
    answers: [7, 8, 9, 11],
    correct: 9,
    explanation: "18에서 9를 빼면 9입니다."
  },
  {
    question: "7 + 8 = ?",
    answers: [13, 14, 16, 15],
    correct: 15,
    explanation: "7 + 8 = 15입니다."
  },
  {
    question: "5 × 4 = ?",
    answers: [20, 15, 25, 9],
    correct: 20,
    explanation: "5를 4번 더하면 20입니다."
  },
  {
    question: "27 ÷ 3 = ?",
    answers: [6, 8, 9, 12],
    correct: 9,
    explanation: "3 × 9 = 27이므로 정답은 9입니다."
  },
  // STAGE 2: 조금 어려운 곱셈·나눗셈 (5문제)
  {
    question: "8 × 7 = ?",
    answers: [48, 54, 64, 56],
    correct: 56,
    explanation: "8 × 7 = 56입니다."
  },
  {
    question: "72 ÷ 8 = ?",
    answers: [8, 9, 6, 7],
    correct: 9,
    explanation: "8 × 9 = 72이므로 정답은 9입니다."
  },
  {
    question: "12 × 4 = ?",
    answers: [36, 48, 46, 52],
    correct: 48,
    explanation: "10 × 4 + 2 × 4 = 40 + 8 = 48입니다."
  },
  {
    question: "96 ÷ 6 = ?",
    answers: [12, 14, 18, 16],
    correct: 16,
    explanation: "6 × 16 = 96이므로 정답은 16입니다."
  },
  {
    question: "15 × 3 = ?",
    answers: [45, 35, 50, 40],
    correct: 45,
    explanation: "15 + 15 + 15 = 45입니다."
  },
  // STAGE 3: 두 연산을 섞은 혼합 계산 (5문제)
  {
    question: "5 × 7 − 8 = ?",
    answers: [27, 25, 31, 19],
    correct: 27,
    explanation: "곱셈을 먼저 계산합니다. 35 − 8 = 27입니다."
  },
  {
    question: "30 ÷ 5 + 7 = ?",
    answers: [10, 12, 13, 15],
    correct: 13,
    explanation: "나눗셈을 먼저 계산합니다. 6 + 7 = 13입니다."
  },
  {
    question: "8 × 7 − 5 = ?",
    answers: [48, 51, 53, 56],
    correct: 51,
    explanation: "곱셈을 먼저 계산합니다. 56 − 5 = 51입니다."
  },
  {
    question: "6 × 9 + 8 = ?",
    answers: [60, 64, 62, 56],
    correct: 62,
    explanation: "6 × 9 = 54를 먼저 구한 뒤 8을 더하면 62입니다."
  },
  {
    question: "84 ÷ 7 − 5 = ?",
    answers: [6, 8, 9, 7],
    correct: 7,
    explanation: "84 ÷ 7 = 12, 12 − 5 = 7입니다."
  },
  // STAGE 4: 괄호와 여러 연산 (5문제)
  {
    question: "(8 + 7) × 3 = ?",
    answers: [45, 29, 42, 48],
    correct: 45,
    explanation: "괄호를 먼저 계산합니다. 15 × 3 = 45입니다."
  },
  {
    question: "9 × 8 − 24 ÷ 6 = ?",
    answers: [64, 68, 70, 66],
    correct: 68,
    explanation: "곱셈과 나눗셈을 먼저 계산하면 72 − 4 = 68입니다."
  },
  {
    question: "(36 ÷ 4 + 7) × 2 = ?",
    answers: [25, 30, 34, 32],
    correct: 32,
    explanation: "괄호 안은 9 + 7 = 16, 16 × 2 = 32입니다."
  },
  {
    question: "7 × (12 − 5) + 6 = ?",
    answers: [49, 61, 55, 42],
    correct: 55,
    explanation: "괄호 안은 7입니다. 7 × 7 + 6 = 49 + 6 = 55입니다."
  },
  {
    question: "(18 + 6) ÷ 3 × 5 = ?",
    answers: [40, 8, 30, 45],
    correct: 40,
    explanation: "괄호 안은 24입니다. 나눗셈과 곱셈은 왼쪽부터 계산해서 24 ÷ 3 × 5 = 8 × 5 = 40입니다."
  }
];

// 음악: HTML audio 요소로 파일을 재생합니다.
const music = document.querySelector("#music");
const musicButton = document.querySelector("#music-button");
const musicStatus = document.querySelector("#music-status");
let musicEnabled = true;
let musicTrack = "";
let musicBlocked = false;
music.volume = 0.8;


// 2. HTML 요소를 가져옵니다.
const intro = document.querySelector("#intro");
const game = document.querySelector("#game");
const result = document.querySelector("#result");
const questionText = document.querySelector("#question");
const answerButtons = document.querySelectorAll(".answer");
const feedback = document.querySelector("#feedback");
const timerText = document.querySelector("#timer");
const timeBar = document.querySelector("#time-bar");
const stageIntro = document.querySelector("#stage-intro");

// 3. 현재 게임 상태입니다. 배열의 첫 번째 번호는 0입니다.
let currentQuestion = 0;
let score = 0;
let timeLeft = 5;
// [추가 개념] 타이머 API는 제공된 수업 자료에서 확인되지 않았습니다.
let timer;
let nextTimer; // 다음 문제로 자동 이동할 때 사용하는 타이머
let answered = false;
let attempts = 0; // 한 문제에서 선택한 횟수: 최대 2번
let endTime = 0;
let userAnswers = []; // 선택한 답을 저장해서 게임이 끝난 뒤 보여줍니다.

let mathPlayer = null;
let mathRunId = "";
let mathResultSaved = false;

function startGame() {
  mathPlayer = window.quizMembers.requireUser();
  if (!mathPlayer) return;
  mathRunId = Date.now() + "-" + Math.random().toString(36).slice(2);
  mathResultSaved = false;
  document.body.classList.add("quiz-playing");
  clearInterval(timer); // 다시 시작할 때 이전 타이머를 지웁니다.
  clearTimeout(nextTimer);
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  intro.classList.add("is-hidden");
  result.classList.add("is-hidden");
  stageIntro.classList.add("is-hidden");
  stopEffects();
  showStageIntro();
}

function showQuestion() {
  showRabbit("ready");
  clearInterval(timer);
  answered = false;
  attempts = 0;
  document.querySelector("#attempts").textContent = "남은 기회 2 / 2";
  // 마지막 단계는 8초, 앞의 세 단계는 5초입니다.
  if (currentQuestion >= 15) {
    timeLeft = 8;
  } else {
    timeLeft = 5;
  }
  const item = questions[currentQuestion];
  questionText.textContent = item.question;
  document.querySelector("#question-number").textContent = "이번 단계 " + (currentQuestion % 5 + 1) + " / 5 · 전체 " + (currentQuestion + 1) + " / " + questions.length;
  document.querySelector("#score").textContent = score;
  timerText.textContent = timeLeft + "초";
  timeBar.max = timeLeft;
  timeBar.value = timeLeft;
  feedback.textContent = "정답을 선택하세요.";

  // 문제 번호에 따라 난이도 표시를 변경합니다.
  if (currentQuestion < 5) {
    document.querySelector("#stage").textContent = "STAGE 01 · 보통 계산";
  } else if (currentQuestion < 10) {
    document.querySelector("#stage").textContent = "STAGE 02 · 곱셈과 나눗셈";
  } else if (currentQuestion < 15) {
    document.querySelector("#stage").textContent = "STAGE 03 · 혼합 계산";
  } else {
    document.querySelector("#stage").textContent = "STAGE 04 · 괄호와 복합 계산";
  }

  for (let i = 0; i < answerButtons.length; i++) {
    // 수업의 createElement + textContent + append 방식입니다.
    answerButtons[i].textContent = "";
    const numberLabel = document.createElement("span");
    numberLabel.textContent = "0" + (i + 1);
    answerButtons[i].append(numberLabel, item.answers[i]);
    // [추가 개념] disabled: 답을 다시 선택할 수 있도록 버튼 활성화.
    answerButtons[i].disabled = false;
    answerButtons[i].className = "answer";
  }
  // [접근성 보조] focus: 키보드/화면 읽기 도구의 위치를 새 문제로 이동.
  questionText.focus({ preventScroll: true });

  // 현재 시각과 마감 시각의 차이로 남은 시간을 계산합니다.
  // Date.now()는 현재 시각입니다. 제한시간 뒤의 시각과 비교해서
  // 다른 탭을 보다가 돌아와도 제한시간이 늘어나지 않게 합니다.
  endTime = Date.now() + timeLeft * 1000;
  timer = setInterval(function () {
    let remaining = (endTime - Date.now()) / 1000;
    if (remaining < 0) {
      remaining = 0;
    }
    timeLeft = Math.ceil(remaining);
    timerText.textContent = timeLeft + "초";
    timeBar.value = remaining; // 막대는 소수 초로 부드럽게 줄어듭니다.
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(null); // 정답을 못 고른 채 시간이 끝나면 선택을 마감합니다.
    }
  }, 100);
}

function checkAnswer(selectedAnswer) {
  if (answered) { // 여러 번 클릭해도 점수는 한 번만 계산합니다.
    return;
  }
  if (Date.now() >= endTime) {
    selectedAnswer = null;
  }
  if (selectedAnswer !== null) {
    if (attempts >= 2) { // 버튼 외에 함수가 호출돼도 세 번째 선택은 막습니다.
      return;
    }
    attempts++;
    document.querySelector("#attempts").textContent = "남은 기회 " + (2 - attempts) + " / 2";
  }
  const item = questions[currentQuestion];

  // 재선택할 때 같은 문제 칸을 갱신합니다. 답 기록이 여러 개 늘어나지 않습니다.
  if (selectedAnswer !== null || userAnswers[currentQuestion] === undefined) {
    userAnswers[currentQuestion] = selectedAnswer;
  }
  if (selectedAnswer === item.correct) {
    answered = true;
    clearInterval(timer);
    playEffect("correct-sound");
    showRabbit("happy");
    score++;
    feedback.textContent = "정답! +1점";
  } else if (selectedAnswer === null) {
    showRabbit("sad");
    answered = true;
    clearInterval(timer);
    if (attempts < 2) {
      playEffect("wrong-sound");
    }
    timerText.textContent = "0초";
    timeBar.value = 0;
    if (attempts >= 2) {
      feedback.textContent = "기회를 모두 사용했어요. 다음 문제로 이동합니다.";
    } else {
      feedback.textContent = "시간 초과!";
    }
  } else {
    showRabbit("sad");
    playEffect("wrong-sound");
    if (attempts < 2) {
      feedback.textContent = "아쉬워요! 남은 시간 안에 한 번 더 골라 보세요.";
    } else {
      feedback.textContent = "두 번 모두 오답이에요. 다음 문제로 이동해요.";
    }
    if (attempts >= 2) {
      answered = true; // 두 번째 오답이면 남은 시간과 관계없이 선택을 마감합니다.
      clearInterval(timer);
    }
  }
  document.querySelector("#score").textContent = score;

  for (let i = 0; i < answerButtons.length; i++) {
    if (answered || attempts >= 2) {
      answerButtons[i].disabled = true;
    } else {
      answerButtons[i].disabled = false;
    }
    answerButtons[i].className = "answer";
    if (item.answers[i] === selectedAnswer && selectedAnswer === item.correct) {
      answerButtons[i].classList.add("correct");
    } else if (item.answers[i] === selectedAnswer) {
      answerButtons[i].classList.add("wrong");
    }
  }
  // setTimeout은 정해진 시간이 지난 뒤 함수를 한 번 실행합니다.
  // 정답, 시간 초과, 두 번째 오답은 결과를 0.7초 보여준 뒤 이동합니다.
  // 첫 오답만 원래 타이머와 마지막 한 번의 선택 기회를 유지합니다.
  if (answered) {
    nextTimer = setTimeout(nextQuestion, 700);
  }
}

function nextQuestion() {
  if (!answered) {
    return;
  }
  answered = false; // 같은 문제에서 두 번 이동하지 않도록 잠급니다.
  clearInterval(timer);
  clearTimeout(nextTimer);
  currentQuestion++;
  if (currentQuestion === questions.length) {
    showResult();
  } else if (currentQuestion % 5 === 0) {
    showStageIntro();
  } else {
    showQuestion();
  }
}

// 각 단계의 첫 문제 전에 시작 안내를 3초 보여줍니다.
function showStageIntro() {
  clearInterval(timer);
  clearTimeout(nextTimer);
  game.classList.add("is-hidden");
  stageIntro.classList.remove("is-hidden");
  const stageNumber = currentQuestion / 5 + 1;
  // 단계 시작과 함께 배경음악을 교체합니다. 문제마다 다시 시작하지는 않습니다.
  if (stageNumber === 1) {
    playMusic("quiz-bgm");
  }
  else {
    playMusic("quiz-bgm-" + stageNumber);
  }
  let seconds = 5;
  if (stageNumber === 4) {
    seconds = 8;
  }
  document.querySelector("#stage-title").textContent = "스테이지 " + stageNumber + " 시작";
  document.querySelector("#stage-message").textContent = "5문제 · 문제당 " + seconds + "초! 준비하세요.";
  document.querySelector("#stage-title").focus({ preventScroll: true });
  window.scrollTo(0, 0);
  const stageBar = document.querySelector("#stage-time-bar");
  const stageCountdown = document.querySelector("#stage-countdown");
  const stageEnd = Date.now() + 3000;
  stageBar.value = 3;
  stageCountdown.textContent = "3초 후 시작";
  timer = setInterval(function () {
    let remaining = (stageEnd - Date.now()) / 1000;
    if (remaining < 0) {
      remaining = 0;
    }
    stageBar.value = remaining;
    stageCountdown.textContent = Math.ceil(remaining) + "초 후 시작";
    if (remaining === 0) {
      clearInterval(timer);
      stageIntro.classList.add("is-hidden");
      game.classList.remove("is-hidden");
      showQuestion(); // 문제 제한시간은 이 시점부터 별도로 시작합니다.
    }
  }, 100);
}

function showResult() {
  document.body.classList.remove("quiz-playing");
  stopEffects();
  clearTimeout(nextTimer);
  stageIntro.classList.add("is-hidden");
  clearInterval(timer);
  game.classList.add("is-hidden");
  result.classList.remove("is-hidden");
  document.querySelector("#final-score").textContent = score;
  const rank = document.querySelector("#rank");
  const message = document.querySelector("#result-message");
  const icon = document.querySelector("#rank-icon");
  if (score <= 5) {
    icon.textContent = "🔧";
    rank.textContent = "워밍업 필요!";
    message.textContent = "아직 엔진이 덜 켜졌어요. 다시 한번 도전해 볼까요?";
    playMusic("warmup");
  } else if (score <= 10) {
    icon.textContent = "👍";
    rank.textContent = "굿 플레이!";
    message.textContent = "조금만 더 가면 상위권입니다.";
    playMusic("good-play");
  } else if (score <= 15) {
    icon.textContent = "🔥";
    rank.textContent = "폼 미쳤다!";
    message.textContent = "월드클래스까지 한 걸음!";
    playMusic("on-fire");
  } else {
    icon.textContent = "🏆";
    rank.textContent = "월드클래스!";
    message.textContent = "암산 챔피언 인정! 멋지게 해냈어요.";
    playMusic("champion");
  }
  document.querySelector("#result-heading").focus({ preventScroll: true });
  window.scrollTo(0, 0);
  showReview();
  const saveStatus = document.querySelector('#team-save-status');
  if (!mathResultSaved && mathPlayer) {
    try {
      saveQuizResult('math', score, mathPlayer.nickname, mathRunId);
      mathResultSaved = true;
      saveStatus.textContent = mathPlayer.nickname + ' 님의 기록을 저장했어요. 페이지 위의 닉네임 메뉴에서 랭킹과 도감을 확인하세요.';
      window.quizMembers.refresh();
    } catch(error) {
      saveStatus.textContent = '기록을 저장하지 못했어요. 현재 점수는 ' + score + '점입니다. 브라우저 저장소를 확인해 주세요.';
    }
  }
}

// 게임이 끝나면 전체 문제의 정답과 해설을 보여줍니다.
function showReview() {
  const reviewList = document.querySelector("#review-list");
  reviewList.textContent = "";
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
    // HTML 문자열을 조립하지 않고 수업에서 배운 방식으로 요소를 만듭니다.
    const title = document.createElement("strong");
    title.textContent = (i + 1) + ". " + item.question;
    const status = document.createElement("span");
    status.textContent = label;
    title.append(status);

    const answerText = document.createElement("p");
    answerText.textContent = "내 답: " + answerLabel + " · 정답: " + item.correct;
    const explanationText = document.createElement("p");
    explanationText.textContent = item.explanation;

    row.append(title, answerText, explanationText);
    reviewList.append(row);
  }
}


// 음악 재생 함수
function playMusic(track) {
  music.pause();
  musicTrack = track;
  musicBlocked = false;
  if (track === "") {
    music.currentTime = 0;
    musicStatus.textContent = "음악이 끝났어요.";
    return;
  }
  music.src = "audio/" + track + ".wav";
  // 배경음악은 반복하고 결과 음악은 한 번만 재생합니다.
  if (track === "quiz-bgm") {
    music.loop = true;
  } else if (track === "quiz-bgm-2") {
    music.loop = true;
  } else if (track === "quiz-bgm-3") {
    music.loop = true;
  } else if (track === "quiz-bgm-4") {
    music.loop = true;
  } else {
    music.loop = false;
  }
  if (musicEnabled) {
    resumeMusic();
  }
}

function resumeMusic() {
  musicBlocked = false;
  musicButton.textContent = "♪ 음악 켜짐";
  if (musicTrack === "quiz-bgm") {
    musicStatus.textContent = "♪ 스테이지 1 · 가벼운 출발";
  }
  else if (musicTrack === "quiz-bgm-2") {
    musicStatus.textContent = "♪ 스테이지 2 · 경쾌한 도전";
  }
  else if (musicTrack === "quiz-bgm-3") {
    musicStatus.textContent = "♪ 스테이지 3 · 속도를 올려요";
  }
  else if (musicTrack === "quiz-bgm-4") {
    musicStatus.textContent = "♪ 스테이지 4 · 마지막 집중!";
  }
  else if (musicTrack === "warmup") {
    musicStatus.textContent = "🔧 다시 도전하는 응원 음악";
  }
  else if (musicTrack === "good-play") {
    musicStatus.textContent = "👍 굿 플레이 축하 음악";
  }
  else if (musicTrack === "on-fire") {
    musicStatus.textContent = "🔥 신나는 도전 음악";
  }
  else {
    musicStatus.textContent = "🏆 암산 챔피언 우승 팡파르!";
  }
  // 재생이 차단되거나 음원 로딩에 실패해도 퀴즈는 계속 진행합니다.
  music.play().catch(function () {
    if (!musicEnabled || musicTrack === "") {
      return;
    }
    musicBlocked = true;
    musicButton.textContent = "▶ 음악 재생";
    musicStatus.textContent = "음악 버튼을 눌러 다시 재생해 주세요.";
  });
}

// 정답/오답 효과음은 배경음악과 별도의 audio 요소로 재생합니다.
function stopEffects() {
  document.querySelector("#correct-sound").pause();
  document.querySelector("#wrong-sound").pause();
}

function playEffect(soundId) {
  if (!musicEnabled) { // 음악 끄기는 효과음에도 적용합니다.
    return;
  }
  stopEffects();
  const sound = document.querySelector("#" + soundId);
  sound.currentTime = 0;
  sound.volume = 0.65;
  sound.play().catch(function () {
    // 효과음 재생에 실패해도 채점과 다음 문제 진행은 계속합니다.
  });
}

// 버튼을 눌렀을 때 실행할 함수 연결
document.querySelector("#start-button").addEventListener("click", startGame);
document.querySelector("#retry-button").addEventListener("click", startGame);
for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", function () {
    checkAnswer(questions[currentQuestion].answers[i]);
  });
}

musicButton.addEventListener("click", function () {
  if (musicBlocked && musicEnabled) {
    resumeMusic();
    return;
  }
  if (musicEnabled) {
    musicEnabled = false;
  } else {
    musicEnabled = true;
  }
  musicButton.setAttribute("aria-pressed", String(musicEnabled));
  if (musicEnabled) {
    musicButton.textContent = "♪ 음악 켜짐";
    if (musicTrack !== "") {
      resumeMusic();
    }
    else {
      musicStatus.textContent = "게임 시작을 누르면 음악이 나와요.";
    }
  } else {
    music.pause();
    stopEffects();
    musicButton.textContent = "♪ 음악 꺼짐";
    musicStatus.textContent = "음악을 껐어요.";
  }
});
music.addEventListener("ended", function () {
  if (!music.loop) {
    musicStatus.textContent = "결과 음악이 끝났어요. 다시 도전해 보세요!";
  }
});


// 표정만 바꾸고 기존 점수와 타이머는 그대로 사용합니다.
function showRabbit(state) {
  const rabbit = document.querySelector("#rabbit");
  const message = document.querySelector("#rabbit-message");
  rabbit.className = "rabbit " + state;
  if (state === "happy") {
    rabbit.setAttribute("aria-label", "활짝 웃으며 점프하는 토끼");
    message.textContent = "야호! 맞혔어!";
  } else if (state === "sad") {
    rabbit.setAttribute("aria-label", "귀를 내리고 실망하는 토끼");
    message.textContent = "아쉽다… 다시 힘내자!";
  } else {
    rabbit.setAttribute("aria-label", "웃으며 준비하는 토끼");
    message.textContent = "같이 풀어보자!";
  }
}

let motionEnabled = true;
document.querySelector("#motion-button").addEventListener("click", function () {
  const button = document.querySelector("#motion-button");
  if (motionEnabled) {
    motionEnabled = false;
    document.body.classList.add("motion-paused");
    button.textContent = "움직임 꺼짐";
  } else {
    motionEnabled = true;
    document.body.classList.remove("motion-paused");
    button.textContent = "움직임 켜짐";
  }
  button.setAttribute("aria-pressed", String(motionEnabled));
});
