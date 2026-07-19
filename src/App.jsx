import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Home from './por/Hero';
import Nav from './por/Nav.jsx';
import About from './por/About.jsx';
import Projects from './por/Project.jsx';
import Contact from './por/Contact.jsx';
import Resume from './por/Resume.jsx';
import IntroLoader from './por/IntroLoader.jsx';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    // Prevent scrolling during intro loader
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const handleNavigate = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100]"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <IntroLoader onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="theme-page min-h-screen overflow-x-hidden relative">
        <div className="relative z-50">
          <Nav onNavigate={handleNavigate} theme={theme} onToggleTheme={toggleTheme} />
        </div>

        <div>
          <Home onViewWork={() => handleNavigate('#projects')} />
          <About />
          <Projects />
          <Resume />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;

