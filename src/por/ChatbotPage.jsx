import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Mic,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jeetAvatar from "../assets/jeet-avatar.png";
import jeetAvatarAnimated from "../assets/jeet-avatar-animated.gif";

const API_URL = (import.meta.env.VITE_CHAT_API_URL || "https://portfolio-chatbot-2-6nem.onrender.com").replace(/\/$/, "");

const greeting = {
  role: "model",
  text: "Hi! I'm Jeet's AI Assistant. Ask me anything about Jeet's technical experience, skills, projects, or how to get in touch!",
};

const placeholderPrompts = [
  "Ask about Jeet's core skills...",
  "Ask about KhetMitra & other projects...",
  "Ask about work experience & background...",
  "How to contact or hire Jeet?",
];

const quickPills = [
  {
    icon: "⚡",
    iconColor: "text-amber-500",
    label: "Core Skills",
    query: "What are Jeet's primary technical skills, frameworks, and programming languages?",
  },
  {
    icon: "🚀",
    iconColor: "text-indigo-500",
    label: "Top Projects",
    query: "Tell me about Jeet's featured projects like KhetMitra and e-commerce applications.",
  },
  {
    icon: "💼",
    iconColor: "text-amber-700",
    label: "Work Experience",
    query: "What is Jeet's professional work experience and background?",
  },
  {
    icon: "🤖",
    iconColor: "text-purple-600",
    label: "AI & Agents",
    query: "What experience does Jeet have in AI development and LLM agent systems?",
  },
  {
    icon: "📫",
    iconColor: "text-rose-500",
    label: "Contact Info",
    query: "How can I contact Jeet for freelance projects or employment opportunities?",
  },
  {
    icon: "📄",
    iconColor: "text-blue-500",
    label: "Resume",
    query: "Can you summarize Jeet's resume, qualifications, and key achievements?",
  },
];

// Markdown subset renderer
function renderInline(text) {
  const tokens = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/g;
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > cursor) tokens.push(text.slice(cursor, match.index));
    if (match[1]) {
      tokens.push(<strong key={match.index} className="font-semibold text-violet-600 dark:text-violet-400">{match[1]}</strong>);
    } else if (match[2]) {
      tokens.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-violet-600 dark:text-violet-400 underline underline-offset-2 hover:opacity-80"
        >
          {match[2]}
          <ExternalLink size={12} className="inline opacity-70" />
        </a>
      );
    } else {
      tokens.push(
        <a
          key={match.index}
          href={match[4]}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-violet-600 dark:text-violet-400 underline underline-offset-2 hover:opacity-80"
        >
          {match[4]}
          <ExternalLink size={12} className="inline opacity-70" />
        </a>
      );
    }
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) tokens.push(text.slice(cursor));
  return tokens;
}

function FormattedMessage({ text }) {
  return text.split("\n").map((line, index) => (
    <p key={index} className={index ? "mt-2" : ""}>
      {renderInline(line)}
    </p>
  ));
}

function TypingMessage({ text }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;
    const step = text.length > 300 ? 5 : text.length > 120 ? 3 : 1;
    const interval = window.setInterval(() => {
      index = Math.min(index + step, text.length);
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [text]);

  return <FormattedMessage text={visibleText} />;
}

export default function ChatbotPage({ backendStatus, theme }) {
  const isDark = theme === "dark";
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

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
        timeoutId = window.setTimeout(typePlaceholder, 1600);
        return;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;
        promptIndex = (promptIndex + 1) % placeholderPrompts.length;
      }

      timeoutId = window.setTimeout(typePlaceholder, deleting ? 35 : 75);
    };

    typePlaceholder();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async (messageText) => {
    if (!messageText || loading) return;

    if (backendStatus !== "ready") {
      setMessages((current) => [
        ...current,
        {
          role: "model",
          text:
            backendStatus === "unavailable"
              ? "The chatbot backend is currently asleep or unavailable. Please reach out to Jeet directly at jeetnathwani660@gmail.com."
              : "The chatbot server is waking up (cold start can take 20-30s). Please give it a few moments and try again!",
        },
      ]);
      return;
    }

    const nextMessages = [...messages, { role: "user", text: messageText }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      if (!API_URL) throw new Error("Chat API is not configured");
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-5) }),
      });
      if (!response.ok) throw new Error("Chat request failed");
      const { reply } = await response.json();
      setMessages((current) => [...current, { role: "model", text: reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "model",
          text: "I'm temporarily having trouble connecting to the server. Feel free to contact Jeet directly via email or LinkedIn!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input.trim());
  };

  const resetChat = () => {
    setMessages([greeting]);
    setInput("");
  };

  return (
    <div
      className={`min-h-screen h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between antialiased relative overflow-hidden font-sans select-text ${
        isDark ? "bg-[#09090b] text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
      style={{ boxSizing: "border-box" }}
    >
      {/* Custom Styles matching user HTML */}
      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .avatar-soft-glow {
          background: radial-gradient(circle at 50% 30%, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%);
          box-shadow: 
            0 10px 30px -5px rgba(124, 58, 237, 0.18),
            0 20px 40px -15px rgba(99, 102, 241, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.9);
        }
        .avatar-soft-glow-dark {
          background: radial-gradient(circle at 50% 30%, #1e1b4b 0%, #0f172a 60%, #020617 100%);
          box-shadow: 
            0 10px 30px -5px rgba(124, 58, 237, 0.35),
            0 20px 40px -15px rgba(99, 102, 241, 0.25),
            inset 0 1px 2px rgba(255, 255, 255, 0.1);
        }
        .ambient-halo {
          background: radial-gradient(circle, rgba(167, 139, 250, 0.24) 0%, rgba(243, 232, 255, 0.08) 55%, transparent 75%);
        }
      `}</style>

      {/* BEGIN: MainHeader */}
      <header
        className={`w-full px-4 sm:px-10 py-3.5 sm:py-4 flex items-center justify-between z-20 backdrop-blur-md border-b sticky top-0 transition-all ${
          isDark
            ? "bg-[#09090b]/80 border-white/10"
            : "bg-white/75 border-slate-100"
        }`}
      >
        {/* Back to Portfolio Action */}
        <a
          href="/"
          className={`group flex items-center gap-2 text-sm font-semibold transition-colors py-1.5 px-3 rounded-xl ${
            isDark
              ? "text-slate-300 hover:text-violet-400 hover:bg-violet-950/40"
              : "text-slate-600 hover:text-violet-600 hover:bg-violet-50/60"
          }`}
          data-purpose="back-navigation"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 stroke-current" />
          <span>Back to Portfolio</span>
        </a>

        {/* Top Right Agent Card & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`flex items-center gap-3.5 pl-2 pr-4 py-1.5 rounded-full border shadow-xs ${
              isDark
                ? "bg-[#131620] border-white/10 text-slate-200"
                : "bg-white border-slate-200/80 text-slate-800"
            }`}
            data-purpose="header-agent-badge"
          >
            <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
              <img
                alt="Jeet Avatar"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(124,58,237,0.15)]"
                src={jeetAvatar}
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${
                  isDark ? "border-[#131620]" : "border-white"
                } ${
                  backendStatus === "ready"
                    ? "bg-emerald-500"
                    : backendStatus === "unavailable"
                    ? "bg-rose-500"
                    : "bg-amber-400"
                }`}
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="text-xs font-bold">Ask about Jeet</span>
                <span className="text-[10px] font-semibold tracking-wide bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded-full uppercase">
                  AI Agent
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {backendStatus === "ready"
                  ? "Ready to answer"
                  : backendStatus === "unavailable"
                  ? "Offline"
                  : "Connecting..."}
              </span>
            </div>
          </div>

          {/* Reset chat button */}
          {messages.length > 1 && (
            <button
              type="button"
              onClick={resetChat}
              title="Reset conversation"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                isDark
                  ? "border-white/10 bg-[#131620] text-slate-400 hover:text-violet-400 hover:border-violet-500/40"
                  : "border-slate-200/80 bg-white text-slate-500 hover:text-violet-600 hover:border-violet-300"
              }`}
              aria-label="Restart chat"
            >
              <RotateCcw size={15} />
            </button>
          )}
        </div>
      </header>
      {/* END: MainHeader */}

      {/* Main Content Area (Scrollable messages + Hero) */}
      <div className="relative flex min-h-0 flex-1 flex-col w-full overflow-hidden">
        <div
          ref={listRef}
          className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {messages.length === 1 ? (
            /* BEGIN: MainContentHero */
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 sm:py-8 max-w-4xl mx-auto w-full text-center relative z-10">
              {/* Soft Decorative Ambient Glow behind avatar */}
              <div className="absolute -top-12 w-96 h-96 ambient-halo pointer-events-none -z-10 rounded-full blur-2xl" />

              {/* Free-floating Character Avatar (No circle, no cutoff, transparent cutout view) */}
              <div className="relative mb-6 group" data-purpose="hero-avatar-container">
                {/* Soft Decorative Ambient Halo behind avatar */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 ambient-halo pointer-events-none rounded-full blur-2xl opacity-80 -z-10" />

                <div
                  className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 cursor-pointer"
                  onMouseEnter={() => setIsAvatarHovered(true)}
                  onMouseLeave={() => setIsAvatarHovered(false)}
                  onClick={() => sendMessage("Hi! Can you give me a quick intro about Jeet and what he does?")}
                >
                  <img
                    alt="Jeet Avatar"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_25px_rgba(124,58,237,0.22)] transition-transform duration-300 group-hover:scale-105"
                    src={isAvatarHovered ? jeetAvatarAnimated : jeetAvatar}
                  />
                  {/* Subtle hover prompt pill overlay */}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-medium tracking-wide shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {isAvatarHovered ? "Playing GIF ✨" : "Hover Me 👋"}
                  </span>
                </div>

                {/* Refined Online Active Badge */}
                <div
                  className={`absolute bottom-2 right-2 sm:right-4 p-1 rounded-full shadow-md border ${
                    isDark ? "bg-[#131620] border-white/10" : "bg-white border-slate-100"
                  }`}
                  title="Online and ready"
                >
                  <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#131620] flex items-center justify-center">
                    <span className="w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                  </div>
                </div>
              </div>

              {/* Hero Titles & Subtitle */}
              <div className="space-y-3 max-w-2xl mx-auto mb-6 sm:mb-8" data-purpose="hero-heading">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Welcome! Ask about <span className="text-gradient">Jeet</span>
                </h1>
                <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Explore Jeet's full-stack expertise, AI systems, featured projects, or ask any question about his career experience.
                </p>
              </div>

              {/* Primary Single Hero CTA */}
              <div className="mb-8 sm:mb-10" data-purpose="primary-call-to-action">
                <button
                  type="button"
                  onClick={() => sendMessage("Hi! Can you give me a quick intro about Jeet and what he does?")}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-200 dark:shadow-indigo-950/50 hover:shadow-indigo-300 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                >
                  <motion.span
                    className="text-base inline-block origin-[70%_70%]"
                    animate={{ rotate: [0, 16, -10, 16, -5, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                  >
                    👋
                  </motion.span>
                  <span>Say Hi to Jeet's AI</span>
                </button>
              </div>

              {/* Quick Suggestion Action Pills */}
              <div
                className="w-full max-w-2xl flex flex-wrap items-center justify-center gap-2.5 mb-4 sm:mb-8"
                data-purpose="quick-prompts"
              >
                {quickPills.map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => sendMessage(pill.query)}
                    className={`group flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full shadow-xs hover:shadow-sm transition-all ${
                      isDark
                        ? "text-slate-200 bg-[#131620] hover:bg-[#1a1e2d] border border-white/10 hover:border-violet-400"
                        : "text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-violet-300"
                    }`}
                  >
                    <span className={`${pill.iconColor} group-hover:scale-110 transition-transform`}>
                      {pill.icon}
                    </span>
                    <span>{pill.label}</span>
                  </button>
                ))}
              </div>
            </main>
          ) : (
            /* BEGIN: ChatMessageThread */
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-5 py-4">
              {messages.map((message, index) => {
                const isUser = message.role === "user";
                return (
                  <motion.div
                    key={`${message.role}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="relative mt-0.5 h-8 w-8 sm:h-9 sm:w-9 shrink-0 flex items-center justify-center">
                        <img
                          src={jeetAvatar}
                          alt="Jeet AI"
                          className="h-full w-full object-contain filter drop-shadow-[0_2px_4px_rgba(124,58,237,0.15)]"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] break-words rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[78%] sm:text-[15px] ${
                        isUser
                          ? "rounded-tr-sm bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950/40"
                          : `rounded-tl-sm border shadow-xs ${
                              isDark
                                ? "bg-[#131620] border-white/10 text-slate-100"
                                : "bg-white border-slate-200/90 text-slate-800"
                            }`
                      }`}
                    >
                      {isUser ? (
                        <FormattedMessage text={message.text} />
                      ) : index === messages.length - 1 && !loading ? (
                        <TypingMessage text={message.text} />
                      ) : (
                        <FormattedMessage text={message.text} />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 flex items-center justify-center">
                    <img
                      src={jeetAvatar}
                      alt="Jeet AI"
                      className="h-full w-full object-contain filter drop-shadow-[0_2px_4px_rgba(124,58,237,0.15)]"
                    />
                  </div>
                  <div
                    className={`flex items-center gap-1.5 rounded-2xl rounded-tl-sm border px-4 py-3 ${
                      isDark
                        ? "bg-[#131620] border-white/10 text-slate-200"
                        : "bg-white border-slate-200/90 text-slate-700"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="ml-2 text-xs font-medium text-slate-400">
                      Jeet's AI is thinking…
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BEGIN: ChatDockFooter */}
      <footer className="w-full pb-4 sm:pb-6 pt-2 px-4 sm:px-6 relative z-20 shrink-0">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Quick pills bar inside chat when thread has started */}
          {messages.length > 1 && (
            <div className="w-full flex items-center gap-2 overflow-x-auto py-1 mb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => sendMessage(pill.query)}
                  disabled={loading || backendStatus !== "ready"}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    isDark
                      ? "bg-[#131620] border-white/10 text-slate-300 hover:border-violet-400"
                      : "bg-white border-slate-200 text-slate-600 hover:border-violet-300"
                  } disabled:opacity-50`}
                >
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Modern Pill-Shaped Chat Input */}
          <form
            onSubmit={handleSend}
            className={`w-full rounded-full p-2 pl-5 sm:pl-6 border shadow-md flex items-center gap-3 transition-all focus-within:border-violet-600 focus-within:ring-4 focus-within:ring-violet-600/10 ${
              isDark
                ? "bg-[#131620] border-white/10 shadow-black/20"
                : "bg-white border-slate-200/90 shadow-slate-100"
            }`}
            data-purpose="chat-input-bar"
          >
            {/* Text Input Field */}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading || backendStatus !== "ready"}
              className={`w-full bg-transparent border-0 text-sm sm:text-base focus:ring-0 focus:outline-none font-normal placeholder:text-slate-400 ${
                isDark ? "text-slate-100" : "text-slate-800"
              }`}
              placeholder={backendStatus === "ready" ? (placeholder || "Ask anything about Jeet's experience, stack, or projects...") : "Connecting to chatbot server…"}
              type="text"
            />

            {/* Mic / Voice Action Icon */}
            <button
              aria-label="Voice input"
              type="button"
              onClick={() => sendMessage("Can you give me an overview of Jeet's skills and projects?")}
              className={`p-2 transition-colors rounded-full ${
                isDark
                  ? "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Send Button */}
            <button
              aria-label="Send message"
              type="submit"
              disabled={loading || backendStatus !== "ready" || !input.trim()}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md hover:opacity-95 hover:shadow-lg transition-all active:scale-95 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 -rotate-45 translate-x-0.5 -translate-y-0.5 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </form>

          {/* Small Helper Caption */}
          <p
            className={`text-xs mt-2.5 font-medium tracking-tight text-center ${
              isDark ? "text-slate-500" : "text-slate-500"
            }`}
            data-purpose="disclaimer-text"
          >
            Jeet's AI Assistant can answer questions about projects, experience &amp; tech stack.
          </p>
        </div>
      </footer>
      {/* END: ChatDockFooter */}
    </div>
  );
}
