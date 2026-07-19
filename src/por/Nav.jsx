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
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash;
    }
    return "#home";
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Fallback: highlight first section at top, last section at bottom
      if (window.scrollY < 50) {
        setActiveSection("#home");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveSection("#contact");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      setActiveSection(href);
      onNavigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "theme-surface-strong shadow-md" : "bg-transparent"
        }`}
    >
      <div className="w-full p-4 flex items-center justify-between theme-surface shadow-sm">
        <a href="#" className="text-xl font-bold theme-primary transition-colors">
          {"<JN />"}
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.label} className="relative py-2">
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${isActive ? "text-[color:var(--page-primary)] font-semibold" : "theme-muted hover:text-[color:var(--page-primary)]"
                    }`}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] theme-primary-bg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
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
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.label} className="relative w-full text-center py-1">
                  <a
                    href={link.href}
                    className={`block py-2 cursor-pointer transition-colors ${isActive ? "text-[color:var(--page-primary)] font-semibold" : "theme-muted hover:text-[color:var(--page-primary)]"
                      }`}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderlineMobile"
                      className="absolute bottom-0 left-1/4 right-1/4 h-[2px] theme-primary-bg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
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
