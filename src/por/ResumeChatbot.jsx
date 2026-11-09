import ChatIcon from "./ChatIcon";
import "./Chatbot.css";

export default function ResumeChatbot() {
  return (
    <div>
      <button type="button" onClick={() => window.open("/chatbot", "_blank", "noopener,noreferrer")} className="chat-launcher" aria-label="Open Jeet's resume chat in a new tab">
        <ChatIcon size={32} />
        <span className="chat-launcher__dot" />
      </button>
    </div>
  );
}
