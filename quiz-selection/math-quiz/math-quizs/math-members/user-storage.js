// 팀 공통 키 quizUsers, currentUser를 그대로 사용합니다.
function getUsers() {
  const saved = localStorage.getItem('quizUsers');
  if (saved === null) return {};
  const users = JSON.parse(saved);
  if (!users || typeof users !== 'object' || Array.isArray(users)) {
    throw new Error('저장된 유저 정보의 형식이 올바르지 않습니다.');
  }
  return users;
}
function findQuizUser(users, nickname) {
  if (!Object.prototype.hasOwnProperty.call(users, nickname)) return null;
  const user = users[nickname];
  if (!user || typeof user !== 'object' || Array.isArray(user)) return null;
  return user;
}
function prepareQuizUser(user) {
  const names = ['movie', 'football', 'math', 'history', 'tf'];
  if (!user.scores || typeof user.scores !== 'object') user.scores = {};
  if (!user.clears || typeof user.clears !== 'object') user.clears = {};
  for (let i = 0; i < names.length; i++) {
    if (!Number.isFinite(user.scores[names[i]])) user.scores[names[i]] = 0;
    if (user.clears[names[i]] !== true) user.clears[names[i]] = false;
  }
  if (!Array.isArray(user.mathHistory)) user.mathHistory = [];
  return user;
}
function loginUser(nickname) {
  nickname = nickname.trim();
  if (nickname.length < 1 || nickname.length > 16) throw new Error('닉네임은 1~16자로 입력해 주세요.');
  if (['__proto__', 'constructor', 'prototype'].includes(nickname)) throw new Error('다른 닉네임을 입력해 주세요.');
  const users = getUsers();
  let user = findQuizUser(users, nickname);
  if (!user) user = { nickname: nickname };
  user.nickname = nickname;
  prepareQuizUser(user);
  users[nickname] = user;
  localStorage.setItem('quizUsers', JSON.stringify(users));
  localStorage.setItem('currentUser', nickname);
  return user;
}
function getCurrentUser() {
  const nickname = localStorage.getItem('currentUser');
  if (nickname === null) return null;
  const user = findQuizUser(getUsers(), nickname);
  if (!user) return null;
  user.nickname = nickname;
  return prepareQuizUser(user);
}
function logoutQuizUser() { localStorage.removeItem('currentUser'); }
function saveQuizResult(quizName, score, nickname, runId) {
  const names = ['movie', 'football', 'math', 'history', 'tf'];
  if (!names.includes(quizName) || !Number.isFinite(score) || score < 0) throw new Error('점수를 확인해 주세요.');
  if (quizName === 'math' && (!Number.isInteger(score) || score > 20)) throw new Error('수학 점수는 0~20점입니다.');
  if (!nickname) nickname = localStorage.getItem('currentUser');
  if (!nickname) throw new Error('먼저 닉네임을 등록해 주세요.');
  const users = getUsers();
  const user = findQuizUser(users, nickname);
  if (!user) throw new Error('게임을 시작한 사용자를 찾지 못했어요.');
  prepareQuizUser(user);
  if (quizName === 'math' && runId) {
    for (let i = 0; i < user.mathHistory.length; i++) {
      if (user.mathHistory[i].id === runId) return user;
    }
  }
  if (score > user.scores[quizName]) user.scores[quizName] = score;
  user.clears[quizName] = true;
  if (quizName === 'math') {
    user.mathHistory.unshift({id: runId || String(Date.now()), score: score, date: new Date().toISOString()});
    user.mathHistory = user.mathHistory.slice(0, 30);
  }
  localStorage.setItem('quizUsers', JSON.stringify(users));
  return user;
}
function getMathRanking() {
  const users = getUsers();
  const rows = [];
  for (const nickname in users) {
    const user = findQuizUser(users, nickname);
    if (!user || !user.clears || user.clears.math !== true) continue;
    if (!user.scores || !Number.isInteger(user.scores.math) || user.scores.math < 0 || user.scores.math > 20) continue;
    rows.push({nickname: nickname, score: user.scores.math});
  }
  rows.sort(function(a,b) { return b.score-a.score || a.nickname.localeCompare(b.nickname, 'ko'); });
  for (let i = 0; i < rows.length; i++) {
    rows[i].rank = i > 0 && rows[i].score === rows[i-1].score ? rows[i-1].rank : i+1;
  }
  return rows;
}
