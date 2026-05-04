# 🏏 IPL Match Chat — AI Powered

Live IPL match chat with real-time AI bot powered by Claude.

## ⚡ Quick Start

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Add your API key
Open `.env` and paste your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxx
```
Get your key at: https://console.anthropic.com

### 3. Run
```bash
python app.py
```
Browser opens automatically at **http://localhost:5000** 🚀

## 📁 Folder Structure
```
ipl-match-chat/
├── app.py           ← Flask backend (run this)
├── .env             ← Your API key (never commit!)
├── requirements.txt
├── README.md
├── index.html       ← Full frontend
├── style.css
├── config.js
├── ui.js
├── chat.js
└── ai-bot.js
```

> ⚠️ **Do NOT open index.html directly** — always run `python app.py` and use http://localhost:5000

## 🔧 Tech Stack
- **Frontend**: Vanilla JS, CSS3 (Rajdhani + Bebas Neue fonts)
- **Backend**: Flask (Python)
- **AI**: Claude 3 Haiku via Anthropic API