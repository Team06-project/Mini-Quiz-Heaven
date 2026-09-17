const playButtons = document.querySelectorAll(".play-button");

const audioContext = new AudioContext()

function playTone(frequency, startTime, duration) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.08, startTime);

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + duration
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

function playStartSound() {
  const now = audioContext.currentTime;

  playTone(440, now, 0.1);
  playTone(660, now + 0.12, 0.1);
  playTone(880, now + 0.24, 0.18);
}

playButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    playStartSound();

    const link = button.dataset.link;

    setTimeout(function () {
      location.href = link;
    }, 450);

  });

});

// 퀴즈 검색 기능

const searchInput = document.querySelector("#quiz-search");
const quizCards = document.querySelectorAll(".quiz-card");
const noResult = document.querySelector("#no-result")


searchInput.addEventListener("input", function () {

  const keyword = searchInput.value
    .trim()
    .toLowerCase();

  let matchCount = 0;

  quizCards.forEach(function (card) {

    const cardText = card.textContent
      .toLowerCase();


      if (cardText.includes(keyword)) {
        card.style.display = "";
        matchCount++;
      } else {
        card.style.display = "none";
      }

  });

  noResult.style.display =
    matchCount == 0 ? "block" : "none";


});

