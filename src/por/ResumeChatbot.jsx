import { useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatIcon from "./ChatIcon";
import avatar from "../assets/jeet-avatar-circle.jpg";
import "./Chatbot.css";

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
    <div>
      <button type="button" onClick={() => window.open("/chatbot", "_blank", "noopener,noreferrer")} className="chat-launcher" aria-label="Open Jeet's resume chat in a new tab">
        <img className="chat-launcher__avatar" src={avatar} alt="" />
        <span className="chat-launcher__helper" aria-hidden="true">
          <MessageCircle size={16} strokeWidth={2.5} />
        </span>
        <span className="chat-launcher__dot" />
      </button>
    </div>
  );
}
