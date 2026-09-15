function movePage(page) {

  playStartSound();

  setTimeout(function () {
    location.href = page;
  }, 450);

}