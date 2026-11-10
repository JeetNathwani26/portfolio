import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import ChatIcon from "./ChatIcon";

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

export default function ChatbotPage({ backendStatus, theme }) {
  const isDark = theme === "dark";
  const pageBackground = isDark ? "bg-[#09090b]" : "bg-[#f8f7ff]";
  const surface = isDark ? "bg-[#09090b]" : "bg-white";
  const text = isDark ? "text-white" : "text-[#0f172a]";
  const muted = isDark ? "text-[#a1a1aa]" : "text-[#475569]";
  const border = isDark ? "border-white/10" : "border-[#e8e6f8]";
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
    if (backendStatus !== "ready") {
      setMessages((current) => [...current, {
        role: "model",
        text: backendStatus === "unavailable"
          ? "The chatbot is temporarily unavailable. Please try again later."
          : "The chatbot server is starting. Please try again in a moment.",
      }]);
      return;
    }
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

  return <main className={`flex min-h-screen min-h-[100dvh] flex-col overflow-hidden font-sans ${pageBackground} ${text}`}>
    <header className={`flex h-20 shrink-0 items-center justify-between border-b px-3 sm:h-[104px] sm:px-6 lg:px-14 ${surface} ${border}`}>
      <a href="/" className={`inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium no-underline sm:text-[17px] ${muted}`} aria-label="Back to portfolio"><ArrowLeft size={20} className="text-[#4f46e5]" /> Back to portfolio</a>
      <div className="flex items-center gap-2 text-right sm:gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#4f46e5] shadow-[0_8px_18px_rgba(79,70,229,.3)] sm:h-[52px] sm:w-[52px] sm:rounded-2xl"><ChatIcon size={28} /></span><div><h1 className={`m-0 text-sm font-extrabold sm:text-lg ${text}`}>Ask about Jeet</h1><p className={`m-0 mt-0.5 text-xs font-medium sm:text-sm ${muted}`}>Resume assistant</p><p className={`m-0 mt-0.5 text-[11px] font-bold ${backendStatus === "ready" ? "text-[#22c55e]" : backendStatus === "unavailable" ? "text-red-600" : muted}`}>{backendStatus === "ready" ? "Online" : backendStatus === "unavailable" ? "Unavailable" : "Starting..."}</p></div></div>
    </header>
    <section className="mx-auto flex w-[calc(100%-24px)] min-w-0 flex-1 flex-col sm:w-[calc(100%-32px)] lg:w-[min(920px,calc(100%-48px))]">
      <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto py-4 [scrollbar-width:none] sm:gap-6 sm:py-8 [&::-webkit-scrollbar]:hidden" aria-live="polite">
        {messages.map((message, index) => messages.length === 1 && index === 0 ? (
          <div key={`${message.role}-${index}`} className="flex min-h-[150px] flex-col items-center justify-center px-3 text-center sm:min-h-[180px]">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#4f46e5] shadow-[0_8px_18px_rgba(79,70,229,.3)]"><ChatIcon size={28} /></span>
            <h2 className={`m-0 text-[21px] font-extrabold sm:text-2xl ${text}`}>Welcome, Jeet!</h2>
            <p className={`m-2 max-w-[460px] text-sm leading-6 sm:text-base ${muted}`}><FormattedMessage text={greeting.text} /></p>
          </div>
        ) : index === 0 && message.role === "model" ? null : <div key={`${message.role}-${index}`} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : ""}`}>
          <div className={`max-w-[88%] break-words px-4 py-3 text-[15px] leading-relaxed sm:max-w-[82%] sm:text-[17px] ${message.role === "user" ? "rounded-[20px_20px_6px_20px] bg-[#4f46e5] px-[22px] font-medium text-white" : `rounded-[20px_20px_20px_6px] ${text}`}`}>
            {message.role === "user" ? <FormattedMessage text={message.text} /> : <TypingMessage text={message.text} />}
          </div>
        </div>)}
        {loading && <div className="flex items-end gap-2"><div className={`max-w-[88%] break-words rounded-[20px_20px_20px_6px] px-4 py-3 text-[15px] leading-relaxed sm:text-[17px] ${text}`}>Thinking…</div></div>}
        {messages.length === 1 && !loading && <div className="mx-auto grid w-full max-w-[720px] grid-cols-1 gap-2.5 pt-3 sm:grid-cols-3 sm:gap-3 sm:pt-5">
          {suggestedPrompts.map((prompt) => <button key={prompt.title} type="button" className={`flex min-h-0 flex-col gap-1.5 rounded-2xl border p-3 text-left font-sans transition hover:-translate-y-0.5 hover:border-[#4f46e5] hover:shadow-[0_8px_18px_rgba(79,70,229,.12)] sm:min-h-[82px] sm:p-4 ${surface} ${border}`} onClick={() => sendMessage(prompt.text)}>
            <strong className={`text-[15px] ${text}`}>{prompt.title}</strong>
            <span className={`text-[13px] ${muted}`}>{prompt.text}</span>
          </button>)}
        </div>}
      </div>
      <form onSubmit={send} className="flex h-[62px] shrink-0 gap-2 pb-1 pt-1.5 sm:h-[70px] sm:gap-3.5 sm:pt-3.5">
        <input value={input} onChange={(event) => setInput(event.target.value)} maxLength={2000} disabled={loading || backendStatus !== "ready"} className={`min-w-0 flex-1 rounded-[28px] border-2 bg-transparent px-4 text-[15px] outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-[#e0e7ff] sm:px-[22px] sm:text-[17px] ${border} ${text}`} placeholder={backendStatus === "ready" ? placeholder : "Connecting to chatbot…"} aria-label="Your question" autoFocus />
        <button type="submit" disabled={loading || backendStatus !== "ready" || !input.trim()} className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#4f46e5] text-white hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14" aria-label="Send message"><Send size={21} /></button>
      </form>
    </section>
  </main>;
}
