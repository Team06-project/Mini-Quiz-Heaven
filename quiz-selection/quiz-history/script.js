// 퀴즈 데이터
const allQuizzes = {
  easy: [
    {
      type: "ox",
      question: "우리나라 지폐에 나오는 인물들은 모두 역사적 위인들이다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "5만원=신사임당, 1만원=세종대왕, 5천원=율곡 이이, 1천원=이순신 장군. 당신의 지갑이 역사책입니다!",
    },
    {
      type: "image",
      question: "이 왕이 만든 가장 유명한 업적은?",
      image:
        "https://wimg.heraldcorp.com/news/cms/2025/05/15/news-p.v1.20250515.6947e41eea4e470cb50168e59cc05fd1_P1.jpg",
      options: ["한글 창제", "금속활자 발명", "측우기 개발", "팔만대장경"],
      correctAnswer: "한글 창제",
      fact: "세종대왕이 1446년 훈민정음을 반포했고, 당신이 지금 읽는 이 글자입니다!",
    },
    {
      type: "multiple",
      question: "다음 중 한국의 지폐에 그려진 건물이 아닌 것은?",
      image: null,
      options: ["불국사", "팔만대장경이 있는 절", "독립문", "해인사"],
      correctAnswer: "독립문",
      fact: "한국 지폐: 5만원=불국사, 1만원=경복궁 근정전, 5천원=율곡묘, 1천원=해전 장면",
    },
    {
      type: "image",
      question: "임진왜란 때 해전의 무패 영웅은?",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3foy9CkVHYaQ7u6S48NlZRrfFpkR-Yje2jouc7XfrQ&s=10",
      options: ["이순신 장군", "원균 장군", "김유신 장군", "을지문덕"],
      correctAnswer: "이순신 장군",
      fact: "이순신 장군: 23번의 해전에서 모두 승리! 거북선이라는 신무기도 만들었습니다.",
    },
    {
      type: "image",
      question: "다음은 어느 문화유산일까요?",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBDrrroy4X0XKJwk5bm_KHTW968uzseZ9LMn7nSCW3DQ&s=10",
      options: ["불국사", "석굴암", "팔만대장경", "해인사"],
      correctAnswer: "석굴암",
      fact: "석굴암: 신라의 과학적 건축 기술의 정수! 유네스코 세계문화유산으로 지정되었습니다.",
    },
    {
      type: "ox",
      question: "한글날(10월 9일)은 훈민정음이 반포된 날을 기념하는 날이다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "한글날(10월 9일)은 1446년 훈민정음이 반포된 날을 기념합니다. 당신이 10월 9일에 쉬는 것도 세종 덕분이에요!",
    },
    {
      type: "multiple",
      question: "삼국통일을 이룬 나라는?",
      image: null,
      options: ["고구려", "백제", "신라", "가야"],
      correctAnswer: "신라",
      fact: "신라가 676년 당나라의 도움을 받아 삼국통일을 완성했습니다.",
    },
    {
      type: "ox",
      question: "세종대왕은 한글을 창제했다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "세종대왕이 1446년 훈민정음을 반포했고, 당신이 지금 읽는 이 글자입니다!",
    },
    {
      type: "multiple",
      question: "다음 중 조선시대 지폐에 나온 인물이 아닌 것은?",
      image: null,
      options: ["신사임당", "정약용", "율곡 이이", "이순신 장군"],
      correctAnswer: "정약용",
      fact: "현재 한국 지폐에는 신사임당, 세종대왕, 율곡 이이, 이순신 장군이 나옵니다.",
    },
    {
      type: "ox",
      question: "한국의 국교(공식 종교)가 존재한다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "X",
      fact: "한국은 국교가 없지만, 역사적으로는 시대별로 다른 종교가 영향력을 가졌어요. 삼국시대 불교, 조선시대 유교, 근현대 기독교 등이 그렇습니다.",
    },
    {
      type: "multiple",
      question: "한글을 만든 목적으로 가장 옳은 것은?",
      image: null,
      options: [
        "중국 한자를 없애기 위해",
        "백성도 쉽게 배울 수 있는 문자를 만들기 위해",
        "왕의 권력을 과시하기 위해",
        "외국과의 무역을 위해",
      ],
      correctAnswer: "백성도 쉽게 배울 수 있는 문자를 만들기 위해",
      fact: "세종의 말: '훈민정음으로 백성들이 쉽게 소통하길 바란다'. 600년이 지난 지금도 그 바람이 이루어지고 있습니다!",
    },
    {
      type: "ox",
      question: "서울의 '세종로'는 세종대왕의 이름에서 비롯되었다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "당신이 매일 지나다니는 거리가 역사입니다! 서울에는 이순신로, 강감찬역 등 역사 인물의 이름이 숨어있어요.",
    },
  ],
  normal: [
    {
      type: "multiple",
      question: "다음 중 서울의 실제 지명에 숨어있는 역사적 인물의 이름은?",
      image: null,
      options: ["세종로", "이순신로", "강감찬역", "모두 맞다"],
      correctAnswer: "모두 맞다",
      fact: "세종로(서울 중심가), 이순신로(여러 지역), 강감찬역(지하철). 당신이 매일 지나다니는 거리가 역사입니다!",
    },
    {
      type: "ox",
      question: "이순신 장군은 23번의 해전에서 모두 승리했다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "이순신 장군: 23전 23승 무패 기록! 거북선이라는 신무기도 만들었습니다. '죽으면 죽는 것이고, 살면 사는 것이다'라는 명언을 남겼어요.",
    },
    {
      type: "image",
      question: "이 불국사는 어느 시대에 만들어졌을까요?",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4EGXZI-sJdmbOcCIPfJVkkoWAR5e7GLOj4X-xz5h8BQ&s=10",
      options: ["삼국시대", "통일신라", "고려", "조선"],
      correctAnswer: "통일신라",
      fact: "불국사: 신라의 화려한 건축 예술. 유네스코 세계문화유산으로 등재되었어요! 경주에 있습니다.",
    },
    {
      type: "ox",
      question: "장보고 장군은 거란 침입을 격파한 해전의 영웅이다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "X",
      fact: "장보고는 거란 침입과 무관합니다. 그는 신라 말기 '해상 무역왕'으로, 완도를 중심으로 청해진이라는 해상 무역 기지를 만들었어요. 거란 침입을 격파한 것은 강감찬입니다.",
    },
    {
      type: "multiple",
      question: "팔만대장경이 완성되는 데 걸린 시간은?",
      image: null,
      options: ["약 20년", "약 50년", "약 80년", "약 150년"],
      correctAnswer: "약 80년",
      fact: "팔만대장경: 약 80년에 걸쳐 목판에 불경을 새긴 고려시대 최고의 문화유산입니다. 유네스코 세계문화유산으로 등재되었어요!",
    },
    {
      type: "ox",
      question: "훈민정음이 반포된 연도는 1446년이다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "1446년은 세종 28년입니다. 약 600년이 지난 지금도 우리가 쓰고 있는 글자예요!",
    },
    {
      type: "multiple",
      question: "불국사와 석굴암은 누가 만들었나?",
      image: null,
      options: ["백제", "고구려", "신라", "통일신라"],
      correctAnswer: "통일신라",
      fact: "불국사(신라의 화려한 건축), 석굴암(신라의 과학적 건축). 둘 다 유네스코 세계문화유산이에요! 경주에 함께 있습니다.",
    },
    {
      type: "ox",
      question: "강감찬의 '귀주대첩'은 10만의 거란군을 격파한 전투다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "귀주대첩(926년): 강감찬 장군이 거란의 소수마 침입 때 기습 전술로 10만의 거란군을 격파했습니다. 매복 전술의 대성공이에요!",
    },
    {
      type: "multiple",
      question: "신사임당은 어떤 관계인가?",
      image: null,
      options: [
        "세종의 아내",
        "세종의 며느리",
        "율곡의 어머니",
        "이순신의 동생",
      ],
      correctAnswer: "율곡의 어머니",
      fact: "신사임당: 조선시대의 예술가이자 율곡 이이의 어머니. 5만원 지폐에 그려져 있어요!",
    },
    {
      type: "ox",
      question: "조선시대 정조는 '수원 화성'을 만들었다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "정조: 세종 다음으로 혁신적인 왕. 수원 화성은 유네스코 세계문화유산이에요! 당신이 수원에 갈 때 그 성곽이 정조의 유산입니다.",
    },
    {
      type: "multiple",
      question: "한글 이전 한국인들이 주로 사용한 문자는?",
      image: null,
      options: ["이두", "한자", "한자와 이두의 혼합", "상형문자"],
      correctAnswer: "한자와 이두의 혼합",
      fact: "한글 이전엔 중국 한자를 주로 썼고, 일부 이두(한자를 이용한 표기법)를 혼용했어요. 평민은 글을 배우기 어려웠습니다. 세종이 '누구나 쉽게 배울 수 있는' 한글을 만든 혁신!",
    },
    {
      type: "ox",
      question: "한국의 국경일은 총 5개다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "X",
      fact: "한국의 주요 국경일: 삼일절(3/1), 어린이날(5/5), 현충일(6/6), 광복절(8/15), 개천절(10/3), 한글날(10/9) 등이 있습니다.",
    },
  ],
  hard: [
    {
      type: "multiple",
      question: "한국 민족 최대의 축제 '설날'의 역사적 뿌리는?",
      image: null,
      options: [
        "고대 신앙 전통만 있음",
        "농경 문화 전통만 있음",
        "유교 전통만 있음",
        "고대 신앙, 농경, 유교가 모두 포함됨",
      ],
      correctAnswer: "고대 신앙, 농경, 유교가 모두 포함됨",
      fact: "차례(유교), 성묫길(신앙+농경), 세배(신분문화), 윷놀이(고대 점술). 당신의 설날이 바로 살아있는 역사박물관입니다!",
    },
    {
      type: "ox",
      question:
        "현대 한국의 위기 속에서 '민족 정체성'을 지킬 수 있었던 이유 중 하나가 한글이다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "식민지 시대 일본은 한글 사용을 억압하려 했지만, 한글은 쉬워서 모든 계층이 배울 수 있었습니다. 독립운동 선전물과 지하 신문이 한글로 만들어져 민족 정체성 유지에 결정적 역할을 했어요!",
    },
    {
      type: "multiple",
      question: "이황(퇴계)와 이이(율곡)의 공통점은?",
      image: null,
      options: [
        "같은 시대의 철학자",
        "서로 스승과 제자 관계",
        "모두 조선시대 성리학자",
        "모두 정치가였다",
      ],
      correctAnswer: "모두 조선시대 성리학자",
      fact: "이황과 이이: 조선시대 최고의 사상가. 돈과 지폐에도 나올 정도로 존경받습니다. 이황은 영남, 이이는 영서 지방을 중심으로 활동했어요.",
    },
    {
      type: "ox",
      question: "한글이 유네스코 '세계문화유산'으로 등재되었다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "X",
      fact: "한글은 2001년 유네스코 '기록유산'으로 등재되었습니다. 세계 유일의 문자 창제 기록으로 등재된 거예요. 다른 나라 문자들과 달리 한글은 창제자, 창제 시기, 창제 목적이 모두 명확합니다!",
    },
    {
      type: "multiple",
      question:
        "조선시대 '신분제'가 엄격했음에도 법치주의 전통이 있었던 이유는?",
      image: null,
      options: [
        "왕의 개인적 성향",
        "중국의 법 체계를 완전히 모방",
        "유교에서 강조하는 '예와 법'의 조화",
        "백성들의 강한 요구",
      ],
      correctAnswer: "유교에서 강조하는 '예와 법'의 조화",
      fact: "조선시대 유교적 법치주의: 정조가 만든 '흠흠신서'(법률서)가 현대 법 체계의 근거가 됐어요. 현재 법원 건물의 기둥이 이 전통을 담고 있습니다.",
    },
    {
      type: "ox",
      question: "을지문덕은 '살수 대첩'에서 수나라 군대를 격파했다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "살수 대첩(612년): 을지문덕이 수나라의 30만 군대를 격파했습니다. 한국 역사상 가장 위대한 승리 중 하나예요!",
    },
    {
      type: "multiple",
      question: "장보고가 세운 '청해진'의 위치는?",
      image: null,
      options: ["부산", "완도", "남해", "제주"],
      correctAnswer: "완도",
      fact: "청해진: 신라 말기 장보고가 완도를 중심으로 만든 해상 무역 기지. 동아시아 해상 무역을 장악했습니다. 당시 '해상의 실크로드' 주인공이었어요!",
    },
    {
      type: "ox",
      question: "유교에서 말하는 '음양오행'은 태극기의 디자인에 반영되어 있다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "태극(중앙)=음(파란색)과 양(빨간색)의 조화. 건곤감리(네 모서리)=음양오행설. 조선시대부터 내려온 철학이 현재까지 우리 문화 속에 살아있습니다!",
    },
    {
      type: "multiple",
      question: "역사적으로 한국 문화에 가장 큰 영향을 준 종교는 시대별로?",
      image: null,
      options: [
        "처음부터 끝까지 불교",
        "처음부터 끝까지 유교",
        "처음부터 끝까지 기독교",
        "삼국시대~고려는 불교, 조선시대는 유교, 근현대는 기독교 등",
      ],
      correctAnswer:
        "삼국시대~고려는 불교, 조선시대는 유교, 근현대는 기독교 등",
      fact: "종교 변화: 삼국시대부터 불교 융성(팔만대장경, 불국사, 석굴암 탄생) → 조선시대 유교 국교화(한글 창제, 과학 발전) → 근현대 기독교 급속 확산. 당신 할머니는 절에 다니고, 할아버지는 교회에 다닐 수 있는 이유가 여기 있습니다!",
    },
    {
      type: "ox",
      question: "'광복절'을 기념하지 않는 국가가 있다.",
      image: null,
      options: ["O", "X"],
      correctAnswer: "O",
      fact: "한국은 광복절(8월 15일)을 국경일로 지키지만, 일본은 이 날을 다르게 해석합니다. 역사 해석이 국가별로 다를 수 있다는 점을 보여줍니다.",
    },
    {
      type: "multiple",
      question: "한글 창제 과정을 기록한 '훈민정음 해례본'의 가치는?",
      image: null,
      options: [
        "아름다운 서예 작품이기 때문",
        "창제자의 의도와 과학적 원리를 명확히 하기 때문",
        "돈이 많이 들었기 때문",
        "오래되었기 때문",
      ],
      correctAnswer: "창제자의 의도와 과학적 원리를 명확히 하기 때문",
      fact: "훈민정음 해례본: 세계 유일의 문자 창제 기록! 다른 문자들과 달리 한글은 창제 목적, 원리, 사용법이 모두 명확하게 기록되어 있어요. 이것이 한글을 위대한 문자로 만드는 이유입니다!",
    },
  ],
};


// 게임 상태 변수
let currentDifficulty = "";
let currentQuizIndex = 0;
let userScore = 0;
let userAnswers = [];
let currentQuizzes = [];
let timeLeft = 0;
let timerInterval = null;
let isAnswered = false;

// 난이도별 시간 설정
const timePerQuestion = {
  easy: 20,
  normal: 30,
  hard: 40,
};

// 소리 재생 함수 (경고음)
function playWarningSound() {
  try {
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log("소리 재생 불가");
  }
}

// 시간 종료 소리
function playTimeOverSound() {
  try {
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log("소리 재생 불가");
  }
}

// 난이도 선택
function selectDifficulty(difficulty) {
  currentDifficulty = difficulty;
  currentQuizzes = allQuizzes[difficulty];
  currentQuizIndex = 0;
  userScore = 0;
  userAnswers = [];

  document.getElementById("mainPage").classList.add("hidden");
  document.getElementById("quizPage").classList.remove("hidden");

  showQuiz();
}

// 퀴즈 표시
function showQuiz() {
  const quiz = currentQuizzes[currentQuizIndex];
  const totalQuestions = currentQuizzes.length;

  // 헤더 업데이트
  document.getElementById("questionCount").textContent =
    `Q${currentQuizIndex + 1} / ${totalQuestions}`;
  document.getElementById("scoreDisplay").textContent = `점수: ${userScore}`;

  // 진행도 바 업데이트
  const progress = (currentQuizIndex / totalQuestions) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  // 이미지 표시
  const imageContainer = document.getElementById("quizImage");
  if (quiz.image) {
    imageContainer.innerHTML = `<img src="${quiz.image}" alt="문제 이미지" style="max-width: 100%; height: auto; border-radius: 8px;">`;
    imageContainer.classList.remove("hidden");
  } else {
    imageContainer.classList.add("hidden");
  }

  // 문제 표시
  document.getElementById("questionText").textContent = quiz.question;

  // 선택지 표시
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  quiz.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option, quiz.correctAnswer, quiz.fact);
    optionsContainer.appendChild(btn);
  });

  // 타이머 시작
  isAnswered = false;
  startTimer();
}

// 타이머 시작
function startTimer() {
  timeLeft = timePerQuestion[currentDifficulty];

  let timerContainer = document.getElementById("timerContainer");

  const updateTimer = () => {
    let timerDisplay = document.getElementById("timerDisplay");
    if (!timerDisplay) {
      timerContainer.innerHTML = `<div id="timerDisplay" class="timer">${timeLeft}초</div>`;
      timerDisplay = document.getElementById("timerDisplay");
    }

    timerDisplay.textContent = `${timeLeft}초`;

    // 시간 상태별 스타일
    timerDisplay.classList.remove("warning", "danger");
    if (timeLeft <= 5 && timeLeft > 3) {
      timerDisplay.classList.add("warning");
      if (timeLeft === 5) playWarningSound();
    } else if (timeLeft <= 3) {
      timerDisplay.classList.add("danger");
      if (timeLeft > 0) playWarningSound();
    }

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      handleTimeOver();
    }
  };

  // 초기 표시
  updateTimer();

  // 매 1초마다 업데이트
  timerInterval = setInterval(updateTimer, 1000);
}

// 시간 초과 처리
function handleTimeOver() {
  if (isAnswered) return;

  isAnswered = true;
  playTimeOverSound();

  const quiz = currentQuizzes[currentQuizIndex];
  userAnswers.push({
    selected: "시간 초과",
    correct: quiz.correctAnswer,
    isCorrect: false,
  });

  document.getElementById("quizPage").classList.add("hidden");
  document.getElementById("resultPage").classList.remove("hidden");

  const resultContainer = document.getElementById("resultContent");
  const html = `
      <div class="result-container incorrect">
          <div class="result-header">⏰ 시간 초과!</div>
          <div class="result-content">
              <p class="hint">💡 정답</p>
              <p class="fact">${quiz.fact}</p>
              <p class="correct-answer">정답: ${quiz.correctAnswer}</p>
          </div>
          <button class="next-btn" onclick="goToNextQuestion()">다음 문제</button>
      </div>
  `;

  resultContainer.innerHTML = html;
}

// 답 선택
function selectAnswer(selected, correct, fact) {
  if (isAnswered) return;

  isAnswered = true;
  clearInterval(timerInterval);

  const isCorrect = selected === correct;

  userAnswers.push({
    selected: selected,
    correct: correct,
    isCorrect: isCorrect,
  });

  if (isCorrect) {
    userScore += 10;
  }

  showResult(isCorrect, correct, fact);
}

// 결과 페이지 표시
function showResult(isCorrect, correct, fact) {
  document.getElementById("quizPage").classList.add("hidden");
  document.getElementById("resultPage").classList.remove("hidden");

  const resultContainer = document.getElementById("resultContent");
  const resultClass = isCorrect ? "correct" : "incorrect";
  const resultText = isCorrect ? "✅ 정답!" : "❌ 오답...";

  let html = `
      <div class="result-container ${resultClass}">
          <div class="result-header">${resultText}</div>
          <div class="result-content">
              <p class="hint">💡 ${isCorrect ? "흥미로운 사실" : "정답"}</p>
              <p class="fact">${fact}</p>
              ${!isCorrect ? `<p class="correct-answer">정답: ${correct}</p>` : ""}
          </div>
          <button class="next-btn" onclick="goToNextQuestion()">다음 문제</button>
      </div>
  `;

  resultContainer.innerHTML = html;
}

// 다음 문제
function goToNextQuestion() {
  currentQuizIndex++;

  document.getElementById("resultPage").classList.add("hidden");

  if (currentQuizIndex < currentQuizzes.length) {
    document.getElementById("quizPage").classList.remove("hidden");
    showQuiz();
  } else {
    showFinalResult();
  }
}

// 최종 결과
function showFinalResult() {
  document.getElementById("finalPage").classList.remove("hidden");

  const totalQuestions = currentQuizzes.length;
  const maxScore = totalQuestions * 10;
  const percentage = Math.round((userScore / maxScore) * 100);

  let typeEmoji = "";
  let typeText = "";

  if (percentage >= 90) {
    typeEmoji = "🔥";
    typeText = "역사와 일상을 완벽히 연결하는 사람";
  } else if (percentage >= 75) {
    typeEmoji = "✨";
    typeText = "역사와 일상의 연결고리를 아는 사람";
  } else if (percentage >= 50) {
    typeEmoji = "📚";
    typeText = "일상 속 역사에 눈뜬 사람";
  } else {
    typeEmoji = "🌱";
    typeText = "역사 탐험을 시작한 사람";
  }

  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const incorrectCount = userAnswers.filter((a) => !a.isCorrect).length;

  let html = `
      <div class="final-container">
          <h1 class="final-title">🎮 게임 종료! 🎮</h1>
          
          <div class="final-score">
              <h2>최종 점수: ${userScore} / ${maxScore}점</h2>
              <div class="score-percentage">${percentage}%</div>
              <div class="progress-bar">
                  <div class="progress-fill" style="width: ${percentage}%"></div>
              </div>
          </div>
          
          <div class="result-type">
              <h3>당신의 역사 타입:</h3>
              <p>${typeEmoji} ${typeText} ${typeEmoji}</p>
          </div>
          
          <div class="result-details">
              <p>✅ 정답: ${correctCount}개</p>
              <p>❌ 오답: ${incorrectCount}개</p>
              <p>난이도: ${
                currentDifficulty === "easy"
                  ? "⭐ EASY"
                  : currentDifficulty === "normal"
                    ? "⭐⭐ NORMAL"
                    : "⭐⭐⭐ HARD"
              }</p>
          </div>
          
          <div class="final-buttons">
              <button class="final-btn" onclick="shareResult()">🔗 결과 공유하기</button>
              <button class="final-btn" onclick="restartGame()">🏠 홈으로 돌아가기</button>
              <button class="final-btn" onclick="retryGame()">🔄 다시 도전</button>
          </div>
      </div>
  `;

  document.getElementById("finalContent").innerHTML = html;
}

// 결과 공유
function shareResult() {
  const percentage = Math.round(
    (userScore / (currentQuizzes.length * 10)) * 100,
  );
  const text = `나는 한국 역사 퀴즈에서 ${userScore}점 (${percentage}%)을 얻었어요! 당신도 도전해보세요! 🎮`;

  if (navigator.share) {
    navigator.share({
      title: "한국 역사 퀴즈",
      text: text,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("결과가 복사되었습니다!");
  }
}

// 홈으로
function restartGame() {
  clearInterval(timerInterval);
  document.getElementById("finalPage").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");

  currentQuizIndex = 0;
  userScore = 0;
  userAnswers = [];
  currentQuizzes = [];
}

// 재도전
function retryGame() {
  clearInterval(timerInterval);
  document.getElementById("finalPage").classList.add("hidden");
  document.getElementById("quizPage").classList.remove("hidden");

  currentQuizIndex = 0;
  userScore = 0;
  userAnswers = [];

  showQuiz();
}
