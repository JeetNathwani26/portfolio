import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Home from './por/Hero';
import Nav from './por/Nav.jsx';
import About from './por/About.jsx';
import Projects from './por/Project.jsx';
import Contact from './por/Contact.jsx';
import Resume from './por/Resume.jsx';
import Skills from './por/Skills.jsx';
import Footer from './por/Footer.jsx';
import IntroLoader from './por/IntroLoader.jsx';
import ResumeChatbot from './por/ResumeChatbot.jsx';
import ChatbotPage from './por/ChatbotPage.jsx';
import useBackendHealth from './hooks/useBackendHealth.js';
function App() {
  const isChatbotPage = window.location.pathname === '/chatbot';
  const backendStatus = useBackendHealth();
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
    isChatbotPage ? <ChatbotPage backendStatus={backendStatus} /> :
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
          <Skills />
          <Projects />
          <Resume />
          <Contact />
          <Footer />
          <ResumeChatbot />
        </div>
      </div>
    </>
  );
}

export default App;
