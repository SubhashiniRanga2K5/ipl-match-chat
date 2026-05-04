async function aiSend() {
  const input = document.getElementById("ai-input");
  const msg = input.value.trim();
  if (!msg) return;

  const c = document.getElementById("ai-messages");

  // show user
  const user = document.createElement("div");
  user.innerText = "🧑 " + msg;
  c.appendChild(user);

  input.value = "";

  // fake typing
  const typing = document.createElement("div");
  typing.innerText = "🤖 thinking...";
  c.appendChild(typing);

  setTimeout(() => {
    typing.remove();

    let reply = "";

    if (msg.toLowerCase().includes("score")) {
      reply = "🏏 CSK 189/4 vs MI 142/6 — MI needs 48 off 28 balls";
    } else if (msg.toLowerCase().includes("win")) {
      reply = "🏆 CSK ahead — 74% win probability";
    } else {
      const replies = [
        "🔥 Intense match!",
        "💥 Big over coming!",
        "🎯 Pressure on MI!",
        "🏏 CSK dominating!",
        "⚡ Game can flip anytime!"
      ];
      reply = replies[Math.floor(Math.random()*replies.length)];
    }

    const bot = document.createElement("div");
    bot.innerText = "🤖 " + reply;
    bot.style.color = "#00b4d8";

    c.appendChild(bot);
    c.scrollTop = c.scrollHeight;

  }, 1000);
}