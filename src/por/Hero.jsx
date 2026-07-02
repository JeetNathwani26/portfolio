import { ArrowDown, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import photo from "../assets/photo4.png";
import "../App.css";
import Animation from "./Animation";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[calc(100vh-96px)] overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-bounce md:hidden" />
      <div className="relative z-10 mx-auto w-full px-4 pt-6 md:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">
          {/* PHOTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center md:justify-start transition-shadow duration-300"
          >
            <div className="relative w-full max-w-[620px] h-[520px] overflow-visible">
              <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
                <Animation />
              </div>
              <img
                src={photo}
                alt="Profile"
                className="absolute bottom-0 left-1/2 z-10 block w-[300px] sm:w-[340px] md:w-[360px] -translate-x-1/2 object-contain"
              />
            </div>
          </motion.div>

          {/* TEXT CONTENT */}
          <div className="text-center md:text-left px-2 md:max-w-xl md:justify-self-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="theme-primary font-medium mb-2"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 theme-heading"
            >
              Jeet Nathwani
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold theme-primary mb-4"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="theme-muted text-lg md:text-xl max-w-xl mx-auto mb-6 hidden md:block"
            >
              I build things for the web. Passionate about creating beautiful,
              functional, and user-friendly applications using the MERN stack.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center gap-6 mb-6"
            >
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jeetnathwani660@gmail.com" target="_blank" className="theme-icon transition-colors hover:scale-110" aria-label="Email"><Mail size={24} /></a>
              <a href="https://github.com/JeetNathwani26" target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:scale-110" aria-label="GitHub"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/jeet-nathwani-274a06271/" target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:scale-110" aria-label="LinkedIn"><Linkedin size={24} /></a>
              <a href="https://wa.me/917567120438" target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:scale-110" aria-label="WhatsApp"><MessageCircle size={24} /></a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-row sm:flex-row items-center justify-center gap-4"
            >
              <a href="#projects" className="theme-primary-bg text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition">View My Work</a>
              <a href="#contact" className="border theme-border theme-muted px-8 py-3 rounded-lg font-medium hover:text-[color:var(--page-primary)] transition">Get In Touch</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
