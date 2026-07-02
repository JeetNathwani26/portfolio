import { motion } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";

const ThemeToggle = ({ theme, onToggle, className = "", showLabel = false }) => {
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium theme-surface-strong theme-text shadow-sm ${className}`}
    >
      {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
      {showLabel ? (isDark ? "Light mode" : "Dark mode") : null}
    </motion.button>
  );
};

export default ThemeToggle;
