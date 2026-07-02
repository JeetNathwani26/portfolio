import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css'
import Home from './por/Hero';
import Nav from './por/Nav.jsx';
import About from './por/About.jsx';
import Projects from './por/Project.jsx';
import Contact from './por/Contact.jsx';
import Resume from './por/Resume.jsx';
import Loader from './por/Loader.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [targetHref, setTargetHref] = useState(null);
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
    // Initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && targetHref) {
      // Small delay to ensure any layout shifts have settled before scrolling
      const scrollTimer = setTimeout(() => {
        const element = document.querySelector(targetHref);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setTargetHref(null); // Reset target
      }, 100);
      return () => clearTimeout(scrollTimer);
    }
  }, [isLoading, targetHref]);

  const handleNavigate = (href) => {
    // Don't show loader if we are already there, but let's just do it anyway for effect
    setTargetHref(href);
    setIsLoading(true);
    // Loader displays for 1.5s during navigation
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100]"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="theme-page min-h-screen">
        <Nav onNavigate={handleNavigate} theme={theme} onToggleTheme={toggleTheme} />
        <Home />
        <About />
        <Projects />
        <Contact />
        <Resume />
      </div>
    </>
  )
}

export default App
