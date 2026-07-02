import reactLogo from "../assets/react.svg";
import { Bot, Github } from "lucide-react";

const tiles = [
  {
    content: <Bot size={50} className="text-white" />,
    className: "theme-primary-bg",
    style: { gridColumn: "1 / span 1", gridRow: "1 / span 1", animationDelay: "0s" },
  },
  {
    content: <Github size={50} className="text-white" />,
    className: "theme-primary-bg",
    style: { gridColumn: "3 / span 1", gridRow: "1 / span 1", animationDelay: "1s" },
  },
  {
    content: <span className="text-white font-black text-3xl">Node</span>,
    className: "theme-primary-bg",
    style: { gridColumn: "2 / span 1", gridRow: "2 / span 1", animationDelay: "2s" },
  },
  {
    content: <img src={reactLogo} alt="React" className="w-14 h-14" />,
    className: "theme-primary-bg",
    style: { gridColumn: "3 / span 1", gridRow: "3 / span 1", animationDelay: "3s" },
  },
  {
    content: <span className="text-white font-black text-3xl">PHP</span>,
    className: "theme-primary-bg",
    style: { gridColumn: "2 / span 1", gridRow: "4 / span 1", animationDelay: "4s" },
  },
  {
    content: <span className="text-white font-black text-2xl tracking-tight">Laravel</span>,
    className: "theme-primary-bg",
    style: { gridColumn: "4 / span 1", gridRow: "4 / span 1", animationDelay: "5s" },
  },
  {
    content: <span className="text-white font-black text-3xl">Python</span>,
    className: "theme-primary-bg",
    style: { gridColumn: "5 / span 1", gridRow: "2 / span 1", animationDelay: "6s" },
  },
  {
    content: <span className="text-white font-black text-2xl tracking-tight">AI/ML</span>,
    className: "theme-primary-bg",
    style: { gridColumn: "5 / span 1", gridRow: "3 / span 1", animationDelay: "7s" },
  },
  {
    content: <span className="text-white font-black text-3xl">Docker</span>,
    className: "theme-primary-bg",
    style: { gridColumn: "1 / span 1", gridRow: "5 / span 1", animationDelay: "8s" },
  },
  {
    content: <span className="text-white font-black text-3xl">AI</span>,
    className: "theme-primary-bg",
    style: { gridColumn: "4 / span 1", gridRow: "5 / span 1", animationDelay: "9s" },
  },
];

const Animation = () => {
  return (
    <div
      className="relative w-full h-full opacity-30 pointer-events-none overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--page-border) 1px, transparent 1px), linear-gradient(to bottom, var(--page-border) 1px, transparent 1px)",
        backgroundSize: "20% 20%",
      }}
    >
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`border theme-border ${tile.className} animate-combo flex items-center justify-center`}
            style={tile.style}
          >
            {tile.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animation;
