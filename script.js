const startButton = document.querySelector("#start-btn");

const audioContext = new AudioContext(); // JAVASCRIPT 에 있는 소리 추출기 가져오기

function playTone(frequency, startTime, duration) { // 내려고 하는 소리의 옵션 설정.
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain(); // gain = 볼륨 조절 장치

  oscillator.type = "square";
  oscillator.frequency.value = frequency; // 소리의 높이

  gain.gain.setValueAtTime(0.08, startTime); // 볼륨 0.08 설정
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + duration
  );

  oscillator.connect(gain); // oscillator랑 gain의 설정을 연결해준다.
  gain.connect(audioContext.destination);

  oscillator.start(startTime); // 소리 시작
  oscillator.stop(startTime + duration); // 서서히 볼륨을 줄임
}

function playStartSound() {
  const now = audioContext.currentTime;

  playTone(440, now, 0.1);
  playTone(660, now + 0.12, 0.1);
  playTone(880, now + 0.24, 0.18);
}

startButton.addEventListener("click", function () {
  playStartSound();

  setTimeout(function () {
    location.href = "./quiz-selection/index.html"; // 사이트 넘어가기
  }, 450);   // 450 = 450ms -> 클릭하고 0.45초 뒤에 이동
});