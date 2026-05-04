// ============================================================
// CHAT.JS — Messages, sending, bot simulation, typing
// ============================================================

function getUserByName(name) {
  return USERS.find(u => u.name === name) || USERS[0];
}

function addMsg(user, text, isSystem = false) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');

  if (isSystem) {
    div.style.cssText = 'display:flex;justify-content:center;padding:4px 0';
    div.innerHTML = `<div class="msg-text sys">${text}</div>`;
  } else {
    const u = typeof user === 'string' ? getUserByName(user) : user;
    const initials = u.name.slice(0, 2).toUpperCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    div.className = 'msg';
    div.innerHTML = `
      <div class="msg-avatar" style="background:${u.bg};color:${u.color}">${initials}</div>
      <div class="msg-body">
        <div class="msg-header">
          <span class="msg-name" style="color:${u.color}">${u.name}</span>
          <span class="msg-time">${time}</span>
        </div>
        <div class="msg-text">${text}</div>
        <div class="msg-reactions">
          <span class="reaction" onclick="addReaction(this,'🔥')">🔥 ${Math.floor(Math.random()*15+1)}</span>
          <span class="reaction" onclick="addReaction(this,'❤️')">❤️ ${Math.floor(Math.random()*8+1)}</span>
        </div>
      </div>`;
  }

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addSysMsg(text) {
  addMsg(null, text, true);
}

function addReaction(el, emoji) {
  const num = parseInt(el.textContent.trim().split(' ')[1] || '1') + 1;
  el.textContent = emoji + ' ' + num;
  el.style.borderColor = 'var(--ipl-gold)';
}

function sendMessage() {
  const input = document.getElementById('msg-input');
  const text = input.value.trim();
  if (!text) return;
  const you = { name: 'You', color: '#00e5ff', bg: 'rgba(0,229,255,0.2)' };
  const replyPrefix = STATE.replyTo ? `<small style="color:var(--muted);display:block;margin-bottom:4px">↩ ${STATE.replyTo}</small>` : '';
  addMsg(you, replyPrefix + text);
  input.value = '';
  cancelReply();
  setTimeout(() => {
    const m = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
    addMsg(m.user, m.text);
  }, 800 + Math.random() * 1500);
}

function sendQuick(text) {
  const you = { name: 'You', color: '#00e5ff', bg: 'rgba(0,229,255,0.2)' };
  addMsg(you, text);
}

function sendQuickReaction(emoji) {
  sendQuick(emoji.repeat(3) + ' !!');
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

let typingTimeout;
function handleTyping() {
  document.getElementById('typing-indicator').textContent = 'You are typing...';
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    document.getElementById('typing-indicator').textContent = '';
  }, 1000);
}

function cancelReply() {
  STATE.replyTo = null;
  document.getElementById('reply-preview').style.display = 'none';
}

function triggerGif() {
  const gifs = ['🎉🎊🏏', '🔥💥⚡', '😂🤣😭', '🏆🥇🎯'];
  sendQuick(gifs[Math.floor(Math.random() * gifs.length)] + ' [GIF]');
}

function loadInitialMessages() {
  const initial = [
    { user: 'DhoniMSD',     text: 'CSK OP! 🦁🔥' },
    { user: 'MI_Rohit',     text: 'MI will chase this easily 💪' },
    { user: 'CricketFan99', text: 'What a game! Both teams giving their best tonight 🏏' },
    { user: 'WhistlePodu',  text: 'Come on CSK! Whistle Podu!! 🎺' },
  ];
  initial.forEach((m, i) => setTimeout(() => addMsg(m.user, m.text), i * 200));
}

function startBotInterval() {
  setInterval(() => {
    const m = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
    const ti = document.getElementById('typing-indicator');
    ti.textContent = m.user + ' is typing...';
    setTimeout(() => {
      addMsg(m.user, m.text);
      ti.textContent = '';
    }, 1200);
  }, 5000 + Math.random() * 5000);
}

function startTypingSimulation() {
  setInterval(() => {
    const u = USERS[Math.floor(Math.random() * USERS.length)];
    const ti = document.getElementById('typing-indicator');
    ti.textContent = u.name + ' is typing...';
    setTimeout(() => { ti.textContent = ''; }, 1500);
  }, 9000);
}