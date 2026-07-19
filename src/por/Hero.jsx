import { ArrowDown, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import photo from "../assets/photo5.png";
import "../App.css";
import Animation from "./Animation";
import TypingEffect from "./TypingEffect";
import { getEmailLink } from "./utils";


const Hero = ({ onViewWork }) => {
  const emailHref = getEmailLink();
  const emailTarget = emailHref.startsWith("mailto:") ? undefined : "_blank";
  const emailRel = emailHref.startsWith("mailto:") ? undefined : "noopener noreferrer";

  return (
    <section id="home" className="relative min-h-[calc(100vh-64px)] pt-6 md:pt-16 pb-12 md:pb-0 overflow-hidden">
      {/* Dynamic Aurora Mesh & Wave Strokes Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glow Orb 1 (Indigo/Blue) */}
        <motion.div
          className="absolute w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-[80px] sm:blur-[120px] top-[-10%] left-[-10%]"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glow Orb 2 (Violet/Purple) */}
        <motion.div
          className="absolute w-[400px] sm:w-[500px] md:w-[700px] h-[400px] sm:h-[500px] md:h-[700px] rounded-full bg-purple-500/10 dark:bg-purple-600/5 blur-[100px] sm:blur-[130px] bottom-[-20%] right-[-10%]"
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glow Orb 3 (Amber/Orange accent) */}
        <motion.div
          className="absolute w-[280px] sm:w-[350px] md:w-[500px] h-[280px] sm:h-[350px] md:h-[500px] rounded-full bg-amber-500/8 dark:bg-amber-600/4 blur-[70px] sm:blur-[100px] top-[30%] left-[30%] md:left-[45%]"
          animate={{
            x: [0, 100, -60, 0],
            y: [0, 80, -70, 0],
            scale: [1, 1.2, 0.85, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glow Orb 4 (Teal/Cyan) */}
        <motion.div
          className="absolute w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] rounded-full bg-teal-500/8 dark:bg-teal-600/4 blur-[90px] sm:blur-[120px] bottom-[20%] left-[5%] md:left-[15%]"
          animate={{
            x: [0, -50, 70, 0],
            y: [0, 70, -35, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Vector wave strokes on top of the mesh */}
        <svg
          className="absolute w-full h-full min-h-[600px] opacity-60 dark:opacity-40"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Glowing Stroke Wave 1 */}
          <motion.path
            d="M0 250 C 360 150, 720 350, 1080 150 C 1260 50, 1380 250, 1440 200"
            stroke="var(--page-primary)"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            fill="none"
            animate={{
              d: [
                "M0 250 C 360 150, 720 350, 1080 150 C 1260 50, 1380 250, 1440 200",
                "M0 200 C 400 280, 680 180, 1020 280 C 1200 330, 1340 100, 1440 220",
                "M0 250 C 360 150, 720 350, 1080 150 C 1260 50, 1380 250, 1440 200"
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Glowing Stroke Wave 2 */}
          <motion.path
            d="M0 450 C 300 350, 600 550, 900 350 C 1200 150, 1350 450, 1440 400"
            stroke="var(--page-accent)"
            strokeWidth="1"
            strokeOpacity="0.2"
            fill="none"
            animate={{
              d: [
                "M0 450 C 300 350, 600 550, 900 350 C 1200 150, 1350 450, 1440 400",
                "M0 400 C 350 480, 620 320, 950 480 C 1180 560, 1320 300, 1440 420",
                "M0 450 C 300 350, 600 550, 900 350 C 1200 150, 1350 450, 1440 400"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Glowing Stroke Wave 3 (Dashed Curve Line for depth) */}
          <motion.path
            d="M0 150 C 400 80, 800 220, 1200 100 C 1300 70, 1380 180, 1440 120"
            stroke="var(--page-accent)"
            strokeWidth="1"
            strokeDasharray="5,5"
            strokeOpacity="0.15"
            fill="none"
            animate={{
              d: [
                "M0 150 C 400 80, 800 220, 1200 100 C 1300 70, 1380 180, 1440 120",
                "M0 180 C 350 120, 750 280, 1150 140 C 1280 90, 1360 220, 1440 160",
                "M0 150 C 400 80, 800 220, 1200 100 C 1300 70, 1380 180, 1440 120"
              ]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Glowing Stroke Wave 4 (Lower Solid Curve Line) */}
          <motion.path
            d="M0 600 C 300 500, 600 700, 900 550 C 1200 400, 1350 650, 1440 580"
            stroke="var(--page-primary)"
            strokeWidth="1.2"
            strokeOpacity="0.2"
            fill="none"
            animate={{
              d: [
                "M0 600 C 300 500, 600 700, 900 550 C 1200 400, 1350 650, 1440 580",
                "M0 550 C 350 580, 650 620, 950 580 C 1150 480, 1300 580, 1440 600",
                "M0 600 C 300 500, 600 700, 900 550 C 1200 400, 1350 650, 1440 580"
              ]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-bounce md:hidden" />
      <div className="relative z-10 mx-auto w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* PHOTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center md:justify-start transition-shadow duration-300 top-2 md:top-0 md:-ml-4"
          >
            <div className="relative w-full max-w-[620px] h-[380px] sm:h-[450px] md:h-[520px] overflow-visible mr-0 pr-0">
              <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
                <Animation />
              </div>

              {/* Animated Mobile Badges */}
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="absolute left-2 top-16 z-20 md:hidden"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-max rounded-2xl border theme-border theme-surface px-4 py-3 shadow-xl text-sm text-slate-900 dark:text-slate-100 cursor-pointer"
                >
                  <p className="font-semibold theme-heading">Full Stack</p>
                  <span className="font-medium theme-heading">Developer</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="absolute right-3 top-24 z-20 md:hidden"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-max rounded-2xl border theme-border theme-surface px-4 py-3 shadow-xl text-sm text-slate-900 dark:text-slate-100 cursor-pointer"
                >
                  <p className="font-semibold theme-heading">AI/ML</p>
                  <p className="theme-muted text-xs">Developer</p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="absolute left-2 bottom-10 z-20 md:hidden"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-max rounded-2xl border theme-border theme-surface px-4 py-3 shadow-xl text-sm text-slate-900 dark:text-slate-100 cursor-pointer"
                >
                  <p className="font-semibold theme-heading">Software Testing</p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                className="absolute right-0 bottom-10 z-20 md:hidden"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-max rounded-2xl border theme-border theme-surface px-4 py-3 shadow-xl text-sm text-slate-900 dark:text-slate-100 cursor-pointer"
                >
                  <p className="font-semibold theme-heading">Web Development</p>
                  <span className="font-medium theme-heading">Developer</span>
                </motion.div>
              </motion.div>

              <img
                src={photo}
                alt="Profile"
                className="absolute bottom-0 left-1/2 z-10 block w-[260px] sm:w-[300px] md:w-[320px] -translate-x-1/2 object-contain"
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
              <TypingEffect />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="theme-muted text-lg md:text-xl max-w-xl mx-auto mb-6 hidden md:block"
            >
              Building secure, scalable, and high-performance web applications with Laravel, PHP, MySQL, Docker, and modern JavaScript. Focused on clean architecture, performance, and exceptional user experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center md:justify-start gap-6 mb-6"
            >
              <a href={emailHref} target={emailTarget} rel={emailRel} className="theme-icon transition-colors hover:scale-110" aria-label="Email"><Mail size={24} /></a>
              <a href="https://github.com/JeetNathwani26" target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:scale-110" aria-label="GitHub"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/jeet-nathwani-274a06271/" target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:scale-110" aria-label="LinkedIn"><Linkedin size={24} /></a>
              <a href="https://wa.me/917567120438" target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:scale-110" aria-label="WhatsApp"><MessageCircle size={24} /></a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  if (onViewWork) {
                    onViewWork();
                  }
                }}
                className="w-full sm:w-auto text-center theme-primary-bg text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:scale-105 transition"
              >
                View My Work
              </a>
              <a href="#contact" className="w-full sm:w-auto text-center border theme-border theme-muted px-6 sm:px-8 py-3 rounded-lg font-medium hover:text-[color:var(--page-primary)] transition">Get In Touch</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
