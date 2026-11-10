import ChatIcon from "./ChatIcon";

export default function ResumeChatbot() {
  return (
    <div>
      <button type="button" onClick={() => window.open("/chatbot", "_blank", "noopener,noreferrer")} className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#4f46e5] text-white shadow-[0_0_0_6px_#e0e7ff,0_10px_24px_rgba(79,70,229,.35)] transition hover:scale-105 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#e0e7ff] sm:bottom-8 sm:right-8 sm:h-[72px] sm:w-[72px]" aria-label="Open Jeet's resume chat in a new tab">
        <ChatIcon size={32} />
        <span className="absolute right-0 top-0 h-[13px] w-[13px] rounded-full border-2 border-white bg-[#22c55e] sm:right-0.5 sm:top-0.5 sm:h-[15px] sm:w-[15px]" />
      </button>
    </div>
  );
}
