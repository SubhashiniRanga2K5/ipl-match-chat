function switchTab(tab) {
  document.getElementById("chat-panel").style.display =
    tab === "chat" ? "flex" : "none";

  document.getElementById("ai-panel").style.display =
    tab === "ai" ? "flex" : "none";

  document.getElementById("prediction-panel").style.display =
    tab === "prediction" ? "flex" : "none";

  document.getElementById("stats-panel").style.display =
    tab === "stats" ? "flex" : "none";

  // fix active tab
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById("tab-" + tab).classList.add("active");
}