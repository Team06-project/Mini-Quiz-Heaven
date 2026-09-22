// quiz-content.md의 문항을 페이지에 표시합니다. A는 기준, B는 사람·가치를 먼저 본 선택입니다.
const quizData = [
  {
    scenario: "SCENARIO #01",
    question: `친구가 “나 요즘 너무 우울해서 식물 하나 샀어…”라고 말합니다. 이야기를 더 나눈다면 무엇을 먼저 살펴볼까요?`,
    choiceA: "식물을 돌보는 일이 부담이 되지는 않을지, 기분 전환에 도움이 될 방법이 무엇인지 생각한다.",
    choiceB: "친구가 어떤 마음으로 식물을 샀는지, 지금 어떤 위로가 필요한지 먼저 듣는다."
  },
  {
    scenario: "SCENARIO #02",
    question: `친한 동료가 “오늘 출근하다가 가벼운 접촉 사고가 났어”라고 말합니다. 다친 곳이 없는지 확인한 뒤, 무엇부터 도울까요?`,
    choiceA: "사고 상황을 정리하고 보험 처리나 다음 절차를 함께 확인한다.",
    choiceB: "많이 놀랐을 동료의 마음을 살피고 필요한 도움을 먼저 물어본다."
  },
  {
    scenario: "SCENARIO #03",
    question: "친구가 중요한 선택을 앞두고 고민을 털어놓습니다. 나는 보통 어떤 방식으로 돕나요?",
    choiceA: "선택지의 장단점과 현실적인 결과를 함께 비교한다.",
    choiceB: "친구에게 무엇이 중요한지, 각 선택이 친구와 주변 사람에게 어떤 의미인지 먼저 듣는다."
  },
  {
    scenario: "SCENARIO #04",
    question: "팀원들이 프로젝트에 열심히 참여했지만 결과는 기대에 못 미쳤습니다. 팀의 성과를 평가할 때 무엇에 먼저 무게를 둘까요?",
    choiceA: "약속한 목표, 실제 기여도, 결과를 같은 기준으로 살펴본다.",
    choiceB: "각자의 노력과 사정, 평가가 팀원들에게 미칠 영향도 함께 살펴본다."
  },
  {
    scenario: "SCENARIO #05",
    question: "친구에게 영화나 드라마 한 편을 추천하려고 합니다. 어떤 이유가 먼저 떠오르나요?",
    choiceA: "이야기의 짜임새와 완성도가 좋아서 추천하고 싶다.",
    choiceB: "친구가 작품의 감정선이나 메시지에 공감할 것 같아서 추천하고 싶다."
  },
  {
    scenario: "SCENARIO #06",
    question: "팀원의 작업에서 수정이 필요한 부분을 발견했습니다. 같은 내용을 전달하더라도 무엇을 먼저 고민하나요?",
    choiceA: "어떤 부분을 왜 고쳐야 하는지 근거와 수정 방법을 명확히 정리한다.",
    choiceB: "필요한 내용을 전달하면서도 상대가 받아들이기 좋은 방식과 표현을 고른다."
  },
  {
    scenario: "SCENARIO #07",
    question: `친구가 “다친 길고양이를 병원에 데려다주느라 늦었어. 미안해”라고 합니다. 남은 모임 일정을 정할 때 무엇을 먼저 고려하나요?`,
    choiceA: "남은 시간과 다른 참석자의 일정을 확인해 가능한 계획을 정한다.",
    choiceB: "친구의 사정과 모두의 마음을 살피며 일정을 조정할 방법을 찾는다."
  },
  {
    scenario: "SCENARIO #08",
    question: "친구들과 공동 과제를 시작합니다. 누가 어떤 일을 맡을지 정할 때 무엇을 먼저 살펴볼까요?",
    choiceA: "각자의 능력, 작업 시간, 목표를 비교해 효율적으로 나눈다.",
    choiceB: "각자가 원하는 역할과 부담을 살피고 모두가 납득할 수 있게 나눈다."
  }
];

let currentQuestionIndex = 0;
let selectedChoice = null;
let choicesHistory = [];

const viewStart = document.getElementById('view-start');
const viewQuestion = document.getElementById('view-question');
const viewResult = document.getElementById('view-result');

const questionIndexBadge = document.getElementById('question-index-badge');
const progressBarFill = document.getElementById('progress-bar-fill');
const questionTag = document.getElementById('question-tag');
const questionText = document.getElementById('question-text');
const cardChoiceA = document.getElementById('card-choice-a');
const cardChoiceB = document.getElementById('card-choice-b');
const badgeChoiceA = document.getElementById('badge-choice-a');
const badgeChoiceB = document.getElementById('badge-choice-b');
const textChoiceA = document.getElementById('text-choice-a');
const textChoiceB = document.getElementById('text-choice-b');
const btnNext = document.getElementById('btn-next');

const summaryCountA = document.getElementById('summary-count-a');
const summaryCountB = document.getElementById('summary-count-b');
const resultBadgeTier = document.getElementById('result-badge-tier');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const resultBox = document.getElementById('result-box');
const choiceSound = document.getElementById('choice-sound');
const resultSound = document.getElementById('result-sound');

function playEffect(sound, volume) {
  sound.pause();
  sound.currentTime = 0;
  sound.volume = volume;
  sound.play().catch(() => {
    // 효과음 재생이 차단되어도 퀴즈는 계속 진행한다.
  });
}

function startQuiz() {
  resultSound.pause();
  resultSound.currentTime = 0;
  currentQuestionIndex = 0;
  choicesHistory = [];
  selectedChoice = null;
  showView('question');
  renderQuestion();
}

function showView(view) {
  viewStart.classList.add('hidden');
  viewQuestion.classList.add('hidden');
  viewResult.classList.add('hidden');

  if (view === 'start') viewStart.classList.remove('hidden');
  if (view === 'question') viewQuestion.classList.remove('hidden');
  if (view === 'result') viewResult.classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
  const q = quizData[currentQuestionIndex];
  selectedChoice = null;

  questionIndexBadge.textContent = `${currentQuestionIndex + 1} / ${quizData.length}`;
  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  questionTag.textContent = q.scenario;
  questionText.textContent = q.question;
  textChoiceA.textContent = q.choiceA;
  textChoiceB.textContent = q.choiceB;

  resetChoiceCards();
  btnNext.disabled = true;

  if (currentQuestionIndex === quizData.length - 1) {
    btnNext.innerHTML = `<span>결과 분석 확인하기</span><span>★</span>`;
  } else {
    btnNext.innerHTML = `<span>선택 완료 후 다음으로</span><span>▶</span>`;
  }
}

function resetChoiceCards() {
  cardChoiceA.classList.remove('selected');
  cardChoiceB.classList.remove('selected');
  cardChoiceA.setAttribute('aria-pressed', 'false');
  cardChoiceB.setAttribute('aria-pressed', 'false');
  cardChoiceA.style.borderColor = '#202235';
  cardChoiceB.style.borderColor = '#202235';
  cardChoiceA.style.backgroundColor = '#0c0d16';
  cardChoiceB.style.backgroundColor = '#0c0d16';

  badgeChoiceA.classList.remove('border-arcade-green', 'text-arcade-green', 'bg-green-950');
  badgeChoiceA.classList.add('border-gray-700', 'text-gray-300', 'bg-[#161829]');

  badgeChoiceB.classList.remove('border-arcade-green', 'text-arcade-green', 'bg-green-950');
  badgeChoiceB.classList.add('border-gray-700', 'text-gray-300', 'bg-[#161829]');
}

function selectChoice(choice) {
  selectedChoice = choice;
  resetChoiceCards();
  playEffect(choiceSound, 0.45);

  if (choice === 'A') {
    cardChoiceA.classList.add('selected');
    cardChoiceA.setAttribute('aria-pressed', 'true');
    cardChoiceA.style.borderColor = '#00ff66';
    cardChoiceA.style.backgroundColor = 'rgba(0, 255, 102, 0.08)';
    badgeChoiceA.classList.remove('border-gray-700', 'text-gray-300', 'bg-[#161829]');
    badgeChoiceA.classList.add('border-arcade-green', 'text-arcade-green', 'bg-green-950');
  } else if (choice === 'B') {
    cardChoiceB.classList.add('selected');
    cardChoiceB.setAttribute('aria-pressed', 'true');
    cardChoiceB.style.borderColor = '#00ff66';
    cardChoiceB.style.backgroundColor = 'rgba(0, 255, 102, 0.08)';
    badgeChoiceB.classList.remove('border-gray-700', 'text-gray-300', 'bg-[#161829]');
    badgeChoiceB.classList.add('border-arcade-green', 'text-arcade-green', 'bg-green-950');
  }

  btnNext.disabled = false;
}

function submitChoice() {
  if (!selectedChoice) return;

  choicesHistory.push(selectedChoice);

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    renderFinalResult();
  }
}

function renderFinalResult() {
  const countA = choicesHistory.filter(c => c === 'A').length;
  const countB = quizData.length - countA;
  displayResultByScore(countA, countB);
  showView('result');
  choiceSound.pause();
  choiceSound.currentTime = 0;
  playEffect(resultSound, 0.55);
}

function displayResultByScore(countA, countB) {
  summaryCountA.textContent = countA;
  summaryCountB.textContent = countB;

  resultBox.className = "w-full max-w-2xl bg-arcade-panel/95 rounded-xl p-6 md:p-10 shadow-2xl text-left relative overflow-hidden";

  if (countA >= 0 && countA <= 2) {
    resultBox.classList.add('pixel-border-pink');
    resultBadgeTier.className = "retro-badge bg-pink-950 text-arcade-pink border border-arcade-pink text-xs";
    resultBadgeTier.textContent = "0~2점";
    resultTitle.textContent = "사람과 가치를 먼저 살핀 선택";
    resultTitle.className = "font-bold text-xl md:text-2xl text-arcade-pink mb-4 leading-tight";
    resultDescription.innerHTML = `<p>이번 퀴즈에서는 결정이 사람에게 어떤 의미를 갖는지 먼저 살핀 답이 많았습니다. 상대의 상황과 관계를 고려하는 방식이 자연스럽게 떠올랐군요. 필요할 때 사실이나 일정도 함께 확인하면 선택의 근거가 더 분명해질 수 있습니다.</p>`;
  } else if (countA >= 3 && countA <= 5) {
    resultBox.classList.add('pixel-border-amber');
    resultBadgeTier.className = "retro-badge bg-amber-950 text-arcade-amber border border-arcade-amber text-xs";
    resultBadgeTier.textContent = "3~5점";
    resultTitle.textContent = "두 기준을 함께 살핀 선택";
    resultTitle.className = "font-bold text-xl md:text-2xl text-arcade-amber mb-4 leading-tight";
    resultDescription.innerHTML = `<p>상황에 따라 근거와 결과를 먼저 보기도 하고, 사람에게 미칠 영향부터 생각하기도 했습니다. 한 가지 방식에만 기대기보다 문제에 맞는 기준을 고른 답변이네요. 특히 4점은 A와 B를 같은 횟수로 선택한 결과입니다.</p>`;
  } else {
    resultBox.classList.add('pixel-border-cyan');
    resultBadgeTier.className = "retro-badge bg-cyan-950 text-arcade-cyan border border-arcade-cyan text-xs";
    resultBadgeTier.textContent = "6~8점";
    resultTitle.textContent = "논리와 기준을 먼저 살핀 선택";
    resultTitle.className = "font-bold text-xl md:text-2xl text-arcade-cyan mb-4 leading-tight";
    resultDescription.innerHTML = `<p>이번 퀴즈에서는 사실, 원칙, 실행 가능한 방법을 먼저 살핀 답이 많았습니다. 문제를 정리하고 해결책을 찾는 방식이 자연스럽게 떠올랐군요. 결정이 사람에게 미칠 영향도 함께 확인하면 더 폭넓게 판단할 수 있습니다.</p>`;
  }
}

function restartQuiz() {
  startQuiz();
}

function goToHome() {
  window.location.href = '../../quiz-selection/index.html';
}
