import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const Nav = ({ onNavigate, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      onNavigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "theme-surface-strong shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full p-4 flex items-center justify-between theme-surface shadow-sm">
        <a href="#" className="text-xl font-bold theme-primary transition-colors">
          {"<JN />"}
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium theme-muted hover:text-[color:var(--page-primary)] transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} className="px-3 py-2" />
          </li>
          <li>
            <motion.a
              href="https://wa.me/917567120438"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              className="theme-primary-bg text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              Say Hello
              <motion.span
                variants={{
                  hover: {
                    rotate: [0, 20, -10, 20, -10, 0],
                    transition: { duration: 0.6, repeat: Infinity },
                  },
                }}
                className="inline-block origin-bottom-right"
              >
                !
              </motion.span>
            </motion.a>
          </li>
        </ul>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className="px-3 py-2" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[color:var(--page-text)] hover:text-[color:var(--page-primary)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden theme-surface-strong border-b shadow-md rounded-b-lg"
        >
          <ul className="container mx-auto px-6 py-4 flex flex-col gap-4 items-center w-full">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block theme-muted hover:text-[color:var(--page-primary)] transition-colors py-2 cursor-pointer"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel />
            </li>
            <li>
              <motion.a
                href="#contact"
                whileHover="hover"
                className="theme-primary-bg text-white inline-flex items-center gap-1 px-5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                onClick={(e) => handleLinkClick(e, "#contact")}
              >
                Say Hello
                <motion.span
                  variants={{
                    hover: {
                      rotate: [0, 20, -10, 20, -10, 0],
                      transition: { duration: 0.6, repeat: Infinity },
                    },
                  }}
                  className="inline-block origin-bottom-right"
                >
                  !
                </motion.span>
              </motion.a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Nav;
