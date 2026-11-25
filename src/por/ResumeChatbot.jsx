import ChatIcon from "./ChatIcon";
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
        <ChatIcon size={32} />
        <span className="chat-launcher__dot" />
      </button>
    </div>
  );
}
