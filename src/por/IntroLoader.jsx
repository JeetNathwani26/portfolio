import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const loadingMessages = [
  "LOADING PORTFOLIO...",
  "PREPARING PROJECTS...",
  "ALMOST READY...",
];

const IntroLoader = ({ onComplete }) => {
  const [phase, setPhase] = useState("hello"); // "hello" | "loading" | "done"
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    // Phase 1: Show "Hello" for 1.5s
    const helloTimer = setTimeout(() => setPhase("loading"), 1500);
    return () => clearTimeout(helloTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    // Cycle loading messages
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => i + 1);
    }, 900);

    // After loading phase, complete
    const doneTimer = setTimeout(() => {
      clearInterval(msgTimer);
      onComplete?.();
    }, loadingMessages.length * 900 + 400);

    const handleKey = (e) => {
      if (e.key === "Escape") onComplete?.();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      clearInterval(msgTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [phase, onComplete]);

  const currentMsg = loadingMessages[Math.min(msgIndex, loadingMessages.length - 1)];
  const progress = Math.min(((msgIndex + 1) / loadingMessages.length) * 100, 100);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center ocupicity-8"
      style={{ background: "var(--page-bg-end)", color: "var(--page-text)" }}
      onClick={phase === "loading" ? onComplete : undefined}
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, color-mix(in srgb, var(--page-primary) 12%, transparent), transparent 60%)" }} />

      <div className="absolute top-8 left-8 text-xs tracking-[0.35em]" style={{ color: "var(--page-muted)" }}>
        <span style={{ color: "var(--page-primary)" }}>JN</span> / PORTFOLIO
      </div>

      <AnimatePresence mode="wait">
        {phase === "hello" && (
          <motion.div
            key="hello"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ color: "var(--page-text)" }}>
              Jeet's{" "}
              <span style={{ color: "var(--page-primary)" }}>Portfolio</span>
            </h1>
            <p className="mt-4 text-sm tracking-widest" style={{ color: "var(--page-muted)" }}>Welcome — let's get you in</p>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center px-6"
          >
            {/* Progress bar */}
            <div className="mb-8 h-[2px] w-40 mx-auto overflow-hidden rounded-full" style={{ background: "color-mix(in srgb, var(--page-primary) 15%, transparent)" }}>
              <motion.div
                className="h-full bg-[color:var(--page-primary)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.h2
                key={currentMsg}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="font-mono text-2xl md:text-4xl font-bold uppercase tracking-widest"
                style={{ color: "var(--page-text)" }}
              >
                {currentMsg}
              </motion.h2>
            </AnimatePresence>

            <p className="mt-6 text-xs tracking-[0.3em]" style={{ color: "var(--page-muted)" }}>ESC / TAP TO SKIP</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroLoader;
