import React, { useEffect, useState } from "react";
import { Menu, X, Download, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#resume" },
];

const Nav = ({ onNavigate, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

    const observeSections = () => {
      navLinks.forEach((link) => {
        const element = document.querySelector(link.href);
        if (element) {
          observer.observe(element);
        }
      });
      // also observe contact section explicitly for CTA
      const contactEl = document.querySelector("#contact");
      if (contactEl) observer.observe(contactEl);
    };

    // Need a slight delay to ensure elements are rendered
    setTimeout(observeSections, 100);

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 mx-auto w-full max-w-7xl flex justify-center`}
    >
      <div
        className={`w-full flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 border ${
          isScrolled
            ? "theme-surface-strong shadow-lg theme-border backdrop-blur-xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="text-2xl font-black tracking-tighter theme-heading hover:text-[color:var(--page-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="text-[color:var(--page-primary)]">.</span>JN
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6 bg-[color:var(--page-surface-muted)] px-6 py-2 rounded-full border theme-border">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.label} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-sm font-medium transition-colors px-1 py-1 block ${
                      isActive
                        ? "text-[color:var(--page-primary)] font-semibold"
                        : "theme-text hover:text-[color:var(--page-primary)]"
                    }`}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-[color:var(--page-primary)] rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className="p-2 rounded-full hover:bg-[color:var(--page-surface-muted)] transition-colors" />
          
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium theme-text bg-[color:var(--page-surface-muted)] hover:bg-[color:var(--page-border)] transition-colors border theme-border"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            <MessageSquare size={16} />
            <span>Let's Talk</span>
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className="p-2" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="theme-text p-2 hover:bg-[color:var(--page-surface-muted)] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 p-6 rounded-2xl theme-surface-strong theme-border border shadow-2xl backdrop-blur-2xl lg:hidden flex flex-col gap-6"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block text-lg font-medium transition-colors ${
                        isActive
                          ? "text-[color:var(--page-primary)]"
                          : "theme-text hover:text-[color:var(--page-primary)]"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="h-px w-full bg-[color:var(--page-border)]" />
            <div className="flex flex-col gap-3">
              <a
                href="/resume.pdf"
                download
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium theme-text bg-[color:var(--page-surface-muted)] border theme-border"
              >
                <Download size={18} />
                Download Resume
              </a>
              <button
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)]"
              >
                <MessageSquare size={18} />
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
