import os
import requests
import webbrowser
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

MATCH_CONTEXT = """You are IPLBot, a real-time cricket AI assistant for IPL 2026.
Current match: CSK vs MI, Match 42, Wankhede Stadium.
CSK scored 189/4 in 20 overs. MI chasing 190, currently 142/6 in 15.2 overs.
MI needs 48 runs off 28 balls. RRR: 14.2. Win probability: CSK 74%, MI 26%.
Be enthusiastic, use cricket emojis, keep replies short (2-3 lines max)."""

@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(BASE_DIR, filename)

@app.route("/api/chat", methods=["POST"])
def chat():
    if not ANTHROPIC_API_KEY:
        return jsonify({"error": "ANTHROPIC_API_KEY not set in .env file"}), 500

    data = request.get_json()
    messages = data.get("messages", [])

    try:
        res = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            json={
                "model": "claude-3-haiku-20240307",
                "max_tokens": 300,
                "system": MATCH_CONTEXT,
                "messages": messages,
            },
            timeout=20,
        )
        result = res.json()
        if "error" in result:
            return jsonify({"error": result["error"]["message"]}), 500
        reply = result["content"][0]["text"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("  🏏 IPL MATCH CHAT — Starting...")
    print("  ✅ Open: http://localhost:5000")
    print("=" * 50 + "\n")
    webbrowser.open("http://localhost:5000")
    app.run(port=5000, debug=False)