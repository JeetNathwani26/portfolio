import { useRef, useState } from "react";
import jeetAvatar from "../assets/jeet-avatar-new.png";
import avatarVideo from "../assets/jeet-wave.webm";

export default function ResumeChatbot({ theme = "light" }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-8 sm:right-8">
      <button
        type="button"
        onClick={() => window.open("/chatbot", "_blank", "noopener,noreferrer")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 p-[2px] shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-300 active:scale-95 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#ede9fe]"
        aria-label="Open Jeet's AI resume assistant in a new tab"
      >
        <span className={`relative flex h-full w-full items-center justify-center p-1 rounded-full shadow-inner overflow-hidden ${theme === "dark" ? "bg-slate-900" : "bg-violet-50"}`}>
          {/* Waving transparent WebM video on hover */}
          <video
            ref={videoRef}
            src={avatarVideo}
            playsInline
            muted
            loop
            preload="auto"
            className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(124,58,237,0.2)] transition-opacity duration-300 pointer-events-none ${
              isHovered ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />

          {/* Static avatar — shown when not hovering */}
          <img
            src={jeetAvatar}
            alt="Jeet 3D Avatar"
            className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(124,58,237,0.2)] transition-opacity duration-300 pointer-events-none ${
              isHovered ? "opacity-0 z-0" : "opacity-100 z-10"
            }`}
          />
        </span>

        {/* Pulsing online indicator */}
        <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-sm dark:border-slate-900">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        </span>

        {/* Hover pill tooltip */}
        <span className="pointer-events-none absolute right-[115%] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-opacity group-hover:flex items-center gap-1.5 border border-white/10 sm:flex opacity-0 group-hover:opacity-100">
          Chat with Jeet's AI <span className="animate-bounce">👋</span>
        </span>
      </button>
    </div>
  );
}
