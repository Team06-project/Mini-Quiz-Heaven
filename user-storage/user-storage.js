function getUsers() {
  
  const savedUsers = localStorage.getItem("quizUsers");

  if (savedUsers === null) {
    return {};
  }

  return JSON.parse(savedUsers);
}



function loginUser(nickname) {
  const users = getUsers();


  if (users[nickname] === undefined) {
    users[nickname] = {
      nickname : nickname,

      scores : {
        movie : 0,
        football: 0,
        math : 0,
        history : 0,
        tf : 0
      },

      clears : {
        movie : false,
        football : false,
        math : false,
        history : false,
        tf : false
      }
    };

    localStorage.setItem(
      "quizUsers", JSON.stringify(users)
    );
  }
  localStorage.setItem(
    "currentUser", nickname
  );

  return users[nickname];
}

function getCurrentUser() {
  const nickname = localStorage.getItem("currentUser");

  if (nickname === null) {
    return null;
  }
  const users = getUsers();

  return users[nickname] || null;
}

function saveQuizResult(quizName, score) {
  const nickname = localStorage.getItem("currentUser");

  if (nickname === null) {
    return;
  }

  const users = getUsers();

  const user = users[nickname];

  if (user === undefined) {
    return;
  }

  if (score > user.scores[quizName]) {
    user.scores[quizName] = score;
  }

  user.clears[quizName] = true;

  localStorage.setItem(
    "quizUsers",
    JSON.stringify(users)
  );
}