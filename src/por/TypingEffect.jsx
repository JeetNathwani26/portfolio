import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypingEffect = ({
  texts = [
    "Full Stack Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Laravel Developer",
    "AI/ML Developer",
  ],
  speed = 100,       // Typing speed in ms per character
  deleteSpeed = 60,  // Deleting speed in ms per character
  delay = 2000       // Pause duration in ms before erasing
}) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(texts[index].substring(0, subIndex + (isDeleting ? -1 : 1)));
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, texts, speed, deleteSpeed, delay]);

  return (
    <span className="relative inline-flex items-center">
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        className="inline-block w-[3px] h-[1em] ml-1 bg-current align-middle"
      />
    </span>
  );
};

export default TypingEffect;
