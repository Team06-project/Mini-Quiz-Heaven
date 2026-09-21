// 수학퀴즈 전용 닉네임·랭킹·도감 화면입니다.
(function () {
  const host = document.querySelector('[data-member-panel]');
  if (!host) return;
  host.innerHTML = '<details class="member-box"><summary>👤 <span id="member-label">닉네임 · 랭킹 · 도감</span></summary><p class="member-scroll-hint">↓ 아래 기록은 이 창 안에서 스크롤해 보세요.</p><div class="member-content" tabindex="0" role="region" aria-label="닉네임 등록과 수학 기록"><p class="member-note">이 브라우저에 저장된 기록입니다. 닉네임은 계정 인증이 아니며, 같은 닉네임을 입력하면 해당 기록을 사용합니다.</p><form id="member-form"><label for="member-nickname">닉네임</label><input id="member-nickname" maxlength="16" placeholder="1~16자 닉네임" autocomplete="off" required><button type="submit">등록 / 변경</button><button type="button" id="member-logout">로그아웃</button></form><p id="member-notice" role="status"></p><div class="member-columns"><section><h2>🏆 수학 랭킹</h2><p>최고점수 기준 · 20점 만점 · 동점은 공동 순위</p><p id="member-my-rank"></p><ol id="member-ranking"></ol></section><section><h2>📚 내 퀴즈 도감</h2><p>퀴즈를 끝까지 완료하면 도감에 표시돼요.</p><ul id="member-collection"></ul><h3>수학 도전 배지</h3><ul id="member-badges"></ul></section></div><section><h2>📝 최근 수학 기록</h2><ol id="member-history"></ol></section></div><div class="member-start"><button id="member-start-button" type="button">▶ GAME START</button></div></details>';
  const box = host.querySelector('details');
  document.querySelector('#member-start-button').addEventListener('click', function () {
    document.querySelector('#start-button').click();
  });
  const notice = document.querySelector('#member-notice');
  function item(list,text,className) {
    const li = document.createElement('li');
    li.textContent = text;
    if(className) li.className = className;
    list.append(li);
  }
  function render() {
    try {
      const user = getCurrentUser();
      const rows = getMathRanking();
      document.querySelector('#member-label').textContent = user ? user.nickname + ' · 수학 최고 ' + user.scores.math + '점 · 랭킹 / 도감 보기' : '닉네임 등록 · 랭킹 · 도감';
      document.querySelector('#member-logout').disabled = !user;
      const ranking = document.querySelector('#member-ranking');ranking.textContent = '';
      let mine = null;
      for (let i=0;i<rows.length;i++) {
        if(user && rows[i].nickname===user.nickname) mine=rows[i];
        if(i<10) item(ranking,rows[i].rank+'위 · '+rows[i].nickname+' · '+rows[i].score+'점',user && rows[i].nickname===user.nickname?'member-mine':'');
      }
      if(rows.length===0) item(ranking,'아직 완료한 기록이 없어요. 첫 기록을 남겨보세요!');
      document.querySelector('#member-my-rank').textContent = mine ? '내 순위: '+mine.rank+'위 / '+rows.length+'명' : '수학퀴즈를 완료하면 내 순위가 표시돼요.';
      const collection=document.querySelector('#member-collection');collection.textContent='';
      const names=['movie','football','math','history','tf'];
      const labels=['🎬 영화','⚽ 축구','📐 수학','📖 역사','💬 T/F'];
      for(let i=0;i<names.length;i++) {
        const done=user && user.clears[names[i]]===true;
        item(collection,labels[i]+' · '+(done?'완료!':'미획득'),done?'member-earned':'member-locked');
      }
      const badges=document.querySelector('#member-badges');badges.textContent='';
      const limits=[0,6,11,16,20];const badgeNames=['🌱 첫 완주','👍 굿 플레이','🔥 실력자','🏆 암산 챔피언','💎 만점'];
      for(let i=0;i<limits.length;i++) {
        const done=user && user.clears.math && user.scores.math>=limits[i];
        item(badges,badgeNames[i]+' · '+(done?'획득':(limits[i]===0?'완주하면 획득':limits[i]+'점부터 획득')),done?'member-earned':'member-locked');
      }
      const history=document.querySelector('#member-history');history.textContent='';
      if(!user || user.mathHistory.length===0) item(history,'아직 수학 기록이 없어요.');
      else for(let i=0;i<Math.min(user.mathHistory.length,5);i++) {
        const row=user.mathHistory[i];
        if(row && Number.isInteger(row.score)) item(history,row.score+' / 20점 · '+new Date(row.date).toLocaleString('ko-KR'));
      }
    } catch(error) {
      notice.textContent='기록을 읽을 수 없어요. 저장된 데이터를 지우지 않았습니다. 브라우저의 저장소 설정과 기존 데이터를 확인해 주세요.';
    }
  }
  document.querySelector('#member-form').addEventListener('submit',function(event){
    event.preventDefault();
    if(document.body.classList.contains('quiz-playing')) return;
    try { const user=loginUser(document.querySelector('#member-nickname').value);notice.textContent=user.nickname+' 님으로 시작합니다.';render(); }
    catch(error){notice.textContent='등록 실패: '+error.message;}
  });
  document.querySelector('#member-logout').addEventListener('click',function(){
    if(document.body.classList.contains('quiz-playing')) return;
    try{logoutQuizUser();notice.textContent='로그아웃했어요. 이전 기록은 보관됩니다.';render();}catch(error){notice.textContent='저장소를 사용할 수 없어요.';}
  });
  window.quizMembers = {
    refresh: render,
    requireUser: function(){
      try {const user=getCurrentUser();if(user)return user;notice.textContent='게임을 시작하기 전에 닉네임을 등록해 주세요.';}
      catch(error){notice.textContent='브라우저 저장소를 사용할 수 없어요. 저장소 설정을 확인해 주세요.';}
      box.open=true;document.querySelector('#member-nickname').focus();return null;
    }
  };
  window.addEventListener('storage',function(){render();});
  render();
})();
