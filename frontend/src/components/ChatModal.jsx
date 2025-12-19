import { useState } from "react";
import { api } from "../api";

export default function ChatModal({ workflow }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", text: query },
    ]);

    try {
      const res = await api.post("/chat", {
        workflow,
        query,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: res.data?.response || "⚠️ No response from backend",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Failed to reach backend. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="chat">
      <h3>Chat</h3>

      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            {m.text}
          </div>
        ))}
        {loading && <div className="bot">Thinking…</div>}
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
        onKeyDown={(e) => e.key === "Enter" && send()}
      />

      <button onClick={send} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
