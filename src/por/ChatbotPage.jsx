import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Send,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jeetAvatar from "../assets/jeet-avatar-new.png";
import avatarVideo from "../assets/jeet-wave.webm";

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

export default function ChatbotPage({ theme: propTheme }) {
  const backendStatus = "ready";
  const [localTheme, setLocalTheme] = useState(() => {
    // ChatbotPage manages its own theme when opened in a new tab
    return propTheme || window.localStorage.getItem("portfolio-theme") || "light";
  });
  const isDark = localTheme === "dark";

  const toggleTheme = () => {
    setLocalTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem("portfolio-theme", next);
      return next;
    });
  };
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Sync localTheme to <html data-theme> so CSS variables and dark: classes apply correctly
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localTheme);
  }, [localTheme]);

  const handleAvatarMouseEnter = () => {
    setIsAvatarHovered(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleAvatarMouseLeave = () => {
    setIsAvatarHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

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

      // Filter out any fallback messages and limit to max 4 (backend schema limit)
      let cleanHistory = nextMessages
        .filter(
          (m) =>
            !m.text.includes("trouble connecting") &&
            !m.text.includes("currently asleep") &&
            !m.text.includes("taking a moment to respond") &&
            !m.text.includes("rate limit was temporarily reached")
        )
        .slice(-4);

      let response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: cleanHistory }),
      });

      // If backend rejected due to history size, retry immediately with just the current message
      if (!response.ok && cleanHistory.length > 1) {
        response = await fetch(`${API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ role: "user", text: messageText }] }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errMsg = errorData?.detail || errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errMsg);
      }

      const { reply } = await response.json();
      setMessages((current) => [...current, { role: "model", text: reply }]);
    } catch (err) {
      console.error("Chat API request error:", err);
      let errorText =
        "I'm temporarily having trouble connecting to the server. Feel free to contact Jeet directly via email or LinkedIn!";

      if (err.message?.includes("429")) {
        errorText = "The AI rate limit was temporarily reached. Please wait a few seconds and try asking again!";
      } else if (
        err.message?.includes("504") ||
        err.message?.includes("502") ||
        err.message?.includes("Failed to fetch") ||
        err.name === "TypeError"
      ) {
        errorText =
          "The backend server is waking up from sleep (Render free tier). Please wait a few moments and try asking again!";
      }

      setMessages((current) => [
        ...current,
        {
          role: "model",
          text: errorText,
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
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .chat-scroll-area {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .chat-scroll-area::-webkit-scrollbar {
          display: none;
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

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
              isDark
                ? "border-white/10 bg-[#131620] text-amber-400 hover:text-amber-300 hover:border-amber-500/40"
                : "border-slate-200/80 bg-white text-slate-500 hover:text-violet-600 hover:border-violet-300"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* Main Content Area (Scrollable messages + Hero) */}
      <div className="relative flex min-h-0 flex-1 flex-col w-full overflow-hidden">
        <div
          ref={listRef}
          className="chat-scroll-area flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {messages.length === 1 ? (
            /* BEGIN: MainContentHero */
            <main className="flex-1 min-h-full flex flex-col items-center justify-center my-auto px-4 py-6 sm:py-8 max-w-4xl mx-auto w-full text-center relative z-10">
              {/* Soft Decorative Ambient Glow behind avatar */}

              {/* Avatar — fixed-size container prevents ANY layout shift (CLS = 0) */}
              <div className="relative mb-4 sm:mb-5" data-purpose="hero-avatar-container">
                {/* Ambient halo — decorative only, does not affect layout */}

                {/*
                  ┌─ outer: reserves EXACTLY w-40 h-40 / md:w-56 md:h-56 at all times ─┐
                  │  overflow-hidden clips any stray canvas pixels.                      │
                  │  Both children are absolute + inset-0 so they never change size.     │
                  └─────────────────────────────────────────────────────────────────────┘
                */}
                <div
                  className="relative w-[100px] h-[100px] rounded-full overflow-hidden cursor-pointer"
                  style={{ flexShrink: 0 }}
                  onMouseEnter={handleAvatarMouseEnter}
                  onMouseLeave={handleAvatarMouseLeave}
                  onClick={() => sendMessage("Hi! Can you give me a quick intro about Jeet and what he does?")}
                >
                  {/* Waving transparent WebM video on hover */}
                  <video
                    ref={videoRef}
                    src={avatarVideo}
                    poster={jeetAvatar}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 pointer-events-none scale-[1.32] -translate-y-[12%] ${
                      isAvatarHovered ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  />

                  {/* Static avatar image — shown when not hovering */}
                  <img
                    alt="Jeet Avatar"
                    src={jeetAvatar}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 pointer-events-none scale-[1.32] -translate-y-[12%] ${
                      isAvatarHovered ? "opacity-0 z-0" : "opacity-100 z-10"
                    }`}
                  />
                </div>
              </div>

              {/* Hero Titles & Subtitle */}
              <div className="space-y-2 max-w-2xl mx-auto mb-5 sm:mb-6" data-purpose="hero-heading">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                  Welcome! Ask about <span className="text-gradient">Jeet</span>
                </h1>
              </div>

              {/* Running Line Animated Prompt Pills */}
              <div
                className="w-full max-w-2xl overflow-hidden mb-4 sm:mb-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
                data-purpose="quick-prompts-running-line"
              >
                <div className="animate-marquee flex items-center gap-2.5 py-1">
                  {[...quickPills, ...quickPills].map((pill, idx) => (
                    <button
                      key={`${pill.label}-${idx}`}
                      type="button"
                      onClick={() => sendMessage(pill.query)}
                      className={`group shrink-0 flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full shadow-xs hover:shadow-sm transition-all cursor-pointer ${
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
              </div>
            </main>
          ) : (
            /* BEGIN: ChatMessageThread */
            <div className="mx-auto flex w-4/5 max-w-6xl flex-col gap-4 sm:gap-5 py-4 px-2 sm:px-4">
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
                      className={`max-w-[92%] break-words rounded-2xl px-4 sm:px-5 py-3 text-sm leading-relaxed sm:max-w-[85%] lg:max-w-[80%] sm:text-[15px] ${
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
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
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

            {/* Overview Button */}
            <button
              aria-label="Overview for Jeet"
              type="button"
              onClick={() => sendMessage("Can you give me a comprehensive overview of Jeet, including his background, core technical skills, and top projects?")}
              disabled={loading || backendStatus !== "ready"}
              title="Overview of Jeet"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                isDark
                  ? "bg-violet-500/15 text-violet-300 hover:bg-violet-500/25 border border-violet-500/30"
                  : "bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-500 shrink-0" />
              <span>Overview</span>
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
