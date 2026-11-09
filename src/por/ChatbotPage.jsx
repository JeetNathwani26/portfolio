import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import ChatIcon from "./ChatIcon";
import "./Chatbot.css";

const API_URL = (import.meta.env.VITE_CHAT_API_URL || "https://portfolio-chatbot-2-6nem.onrender.com").replace(/\/$/, "");
const greeting = { role: "model", text: "Hi! Ask me anything about Jeet's experience, skills, or projects." };
const placeholderPrompts = [
  "Ask about skills",
  "Ask about projects",
  "Ask about experience",
];
const suggestedPrompts = [
  { title: "Skills", text: "What skills does Jeet have?" },
  { title: "Projects", text: "Tell me about Jeet's projects." },
  { title: "Experience", text: "What is Jeet's work experience?" },
];

// Render a small, safe Markdown subset without injecting model-produced HTML.
function renderInline(text) {
  const tokens = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/g;
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) tokens.push(text.slice(cursor, match.index));
    if (match[1]) tokens.push(<strong key={match.index}>{match[1]}</strong>);
    else if (match[2]) tokens.push(<a key={match.index} href={match[3]} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2 hover:opacity-80">{match[2]}</a>);
    else tokens.push(<a key={match.index} href={match[4]} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2 hover:opacity-80">{match[4]}</a>);
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) tokens.push(text.slice(cursor));
  return tokens;
}

function FormattedMessage({ text }) {
  return text.split("\n").map((line, index) => <p key={index} className={index ? "mt-2" : ""}>{renderInline(line)}</p>);
}

function TypingMessage({ text }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let characterIndex = 0;
    const intervalId = window.setInterval(() => {
      characterIndex += 1;
      setVisibleText(text.slice(0, characterIndex));
      if (characterIndex === text.length) window.clearInterval(intervalId);
    }, 24);

    return () => window.clearInterval(intervalId);
  }, [text]);

  return <FormattedMessage text={visibleText} />;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    let promptIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId;

    const typePlaceholder = () => {
      const prompt = placeholderPrompts[promptIndex];
      characterIndex += deleting ? -1 : 1;
      setPlaceholder(prompt.slice(0, characterIndex));

      if (!deleting && characterIndex === prompt.length) {
        deleting = true;
        timeoutId = window.setTimeout(typePlaceholder, 1400);
        return;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;
        promptIndex = (promptIndex + 1) % placeholderPrompts.length;
      }

      timeoutId = window.setTimeout(typePlaceholder, deleting ? 45 : 85);
    };

    typePlaceholder();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text || loading) return;
    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      if (!API_URL) throw new Error("Chat API is not configured");
      const response = await fetch(`${API_URL}/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages.slice(-4) }) });
      if (!response.ok) throw new Error("Chat request failed");
      const { reply } = await response.json();
      setMessages((current) => [...current, { role: "model", text: reply }]);
    } catch {
      setMessages((current) => [...current, { role: "model", text: "I'm unavailable right now. Please try again shortly or contact Jeet directly." }]);
    } finally {
      setLoading(false);
    }
  };

  const send = (event) => {
    event.preventDefault();
    sendMessage(input.trim());
  };

  return <main className="chatbot-page">
    <header className="chatbot-header flex items-center justify-between">
      <a href="/" className="chatbot-back" aria-label="Back to portfolio"><ArrowLeft size={20} /> Back to portfolio</a>
      <div className="chatbot-header-profile"><span className="chatbot-avatar chatbot-avatar--header"><ChatIcon size={28} /></span><div><h1 className="chatbot-profile-title">Ask about Jeet</h1><p className="chatbot-profile-subtitle">Resume assistant</p></div></div>
    </header>
    <section className="chatbot-content">
      <div ref={listRef} className="chatbot-messages" aria-live="polite">
        {messages.map((message, index) => messages.length === 1 && index === 0 ? (
          <div key={`${message.role}-${index}`} className="chatbot-welcome">
            <span className="chatbot-welcome-icon"><ChatIcon size={28} /></span>
            <h2>Welcome, Jeet!</h2>
            <p><FormattedMessage text={greeting.text} /></p>
          </div>
        ) : index === 0 && message.role === "model" ? null : <div key={`${message.role}-${index}`} className={`chatbot-message-row ${message.role === "user" ? "chatbot-message-row--user" : ""}`}>
          <div className={`chatbot-bubble ${message.role === "user" ? "chatbot-bubble--user" : "chatbot-bubble--bot"}`}>
            {message.role === "user" ? <FormattedMessage text={message.text} /> : <TypingMessage text={message.text} />}
          </div>
        </div>)}
        {loading && <div className="chatbot-message-row"><div className="chatbot-bubble chatbot-bubble--bot">Thinking…</div></div>}
        {messages.length === 1 && !loading && <div className="chatbot-suggestions">
          {suggestedPrompts.map((prompt) => <button key={prompt.title} type="button" className="chatbot-suggestion" onClick={() => sendMessage(prompt.text)}>
            <strong>{prompt.title}</strong>
            <span>{prompt.text}</span>
          </button>)}
        </div>}
      </div>
      <form onSubmit={send} className="chatbot-input-bar">
        <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={2000} disabled={loading} className="chatbot-input" placeholder={placeholder} aria-label="Your question" autoFocus />
        <button type="submit" disabled={loading || !input.trim()} className="chatbot-send" aria-label="Send message"><Send size={21} /></button>
      </form>
    </section>
  </main>;
}
