import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot, Cloud, Cpu, Github, Layers3, Linkedin, Mail, MessageCircle, Server, Workflow } from "lucide-react";
import photo from "../assets/hero-new.png";
import TypingEffect from "./TypingEffect";
import { getEmailLink } from "./utils";


const emailHref = "mailto:jeetnathwani660@gmail.com";

const floatingCards = [
  { icon: <Server size={14} />, title: "Backend Development", className: "top-[-2%] left-[-10%] sm:top-[1%] sm:left-[-15%] lg:top-[1%] lg:left-[-15%] origin-left" },
  { icon: <Bot size={14} />, title: "AI Development", className: "top-[10%] right-[-10%] sm:right-[-15%] lg:right-[-15%] origin-right" },
  { icon: <Layers3 size={14} />, title: "Laravel Expert", className: "top-[50%] right-[-15%] sm:right-[-15%] lg:right-[-15%] origin-right" },
  { icon: <Workflow size={14} />, title: "API Integration", className: "bottom-[-1%] left-[-10%] sm:bottom-[10%] sm:left-[-15%] lg:left-[-15%] origin-left" },
  { icon: <Cloud size={14} />, title: "Cloud Deployment", className: "bottom-[-7%] right-[-10%] sm:bottom-[25%] sm:right-[-15%] lg:bottom-[10%] lg:right-[-15%] origin-right" },
];

const floatingCardsBeforeImage = floatingCards.slice(0, 2);
const floatingCardsAfterImage = floatingCards.slice(2);

const OrbitRing = ({ className }) => (
  <motion.div
    aria-hidden="true"
    className={`absolute inset-0 rounded-full border border-[rgba(124,58,237,0.18)] ${className}`}
    animate={{ rotate: 360 }}
    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
  />
);

const GlowBackground = () => (
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.24)_0%,rgba(99,102,241,0.12)_28%,rgba(255,255,255,0)_72%)] blur-3xl"
      animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.8, 0.55] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute left-[18%] top-[18%] h-24 w-24 rounded-full bg-[rgba(168,85,247,0.18)] blur-3xl"
      animate={{ x: [0, 18, 0], y: [0, -10, 0], opacity: [0.35, 0.6, 0.35] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute right-[10%] bottom-[18%] h-28 w-28 rounded-full bg-[rgba(59,130,246,0.16)] blur-3xl"
      animate={{ x: [0, -14, 0], y: [0, 8, 0], opacity: [0.3, 0.55, 0.3] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const FloatingCard = ({ icon, title, className, delay }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mobileAnimate = { opacity: 1, y: [0, -6, 0], scale: [0.98, 1.02, 0.98] };
  const desktopAnimate = { opacity: 1, y: [0, -10, 0], scale: 1 };

  const transition = {
    opacity: { duration: 0.45, delay },
    scale: { duration: 0.45, delay },
    y: { duration: isMobile ? 3.5 : 5.5, repeat: Infinity, ease: "easeInOut", delay },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={isMobile ? mobileAnimate : desktopAnimate}
      transition={transition}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`absolute flex items-center gap-2 rounded-2xl border border-white/50 bg-white/78 px-2.5 py-2 shadow-[0_14px_40px_rgba(76,29,149,0.12)] backdrop-blur-[18px] ${className}`}
    >
      <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(99,102,241,0.18),rgba(168,85,247,0.24))] text-sm">
        {icon}
      </span>
      <span className="whitespace-nowrap text-[13px] sm:text-[12px] font-semibold text-slate-800">{title}</span>
    </motion.div>
  );
};

const HeroImage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    whileHover={{ y: -4 }}
    className="relative mx-auto w-full max-w-[680px] aspect-square scale-[0.82] sm:scale-[0.8] lg:scale-100 origin-center pt-16 sm:pt-0 translate-y-6 sm:translate-y-8 lg:translate-y-0"
  >
    <GlowBackground />
    <div className="absolute inset-0 z-10">
      <div className="absolute inset-[10%] rounded-full border border-white/55 bg-white/70 backdrop-blur-[18px] shadow-[0_30px_90px_rgba(91,33,182,0.14)]" />
      <OrbitRing className="inset-[7%]" />
      <OrbitRing className="inset-[14%] opacity-50" />
      <div className="absolute inset-[20%] rounded-full border border-dashed border-[rgba(124,58,237,0.16)] opacity-80" />

      {floatingCardsBeforeImage.map((card, index) => (
        <FloatingCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          className={`${card.className} z-10`}
          delay={0.15 * index}
        />
      ))}
    </div>

    <div className="absolute left-1/2 bottom-[-10%] z-20 w-[78%] max-w-[350px] -translate-x-1/2 overflow-visible sm:w-[74%]">
      <motion.img
        src={photo}
        alt="Jeet Nathwani"
        className="relative z-20 h-auto w-full object-contain object-bottom translate-y-[7%] drop-shadow-[0_22px_30px_rgba(79,70,229,0.18)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    <div className="absolute inset-[16%] z-30 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,rgba(99,102,241,0.07)_34%,rgba(255,255,255,0)_72%)]" />

    {floatingCardsAfterImage.map((card, index) => (
      <FloatingCard
        key={card.title}
        icon={card.icon}
        title={card.title}
        className={`${card.className} z-40`}
        delay={0.15 * (index + floatingCardsBeforeImage.length)}
      />
    ))}
  </motion.div>
);

const Hero = ({ onViewWork }) => {
  const emailTarget = emailHref.startsWith("mailto:") ? undefined : "_blank";
  const emailRel = emailHref.startsWith("mailto:") ? undefined : "noopener noreferrer";
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0">
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[color:var(--page-primary)] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[color:var(--page-accent)] opacity-[0.08] blur-[140px]" />
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[8%] left-[-20%] w-[140%] h-px bg-gradient-to-r from-transparent via-[color:var(--page-primary)]/35 to-transparent animate-line-drift" />
          <div className="absolute top-[22%] left-[-24%] w-[150%] h-px bg-gradient-to-r from-transparent via-[color:var(--page-accent)]/30 to-transparent animate-line-drift [animation-delay:1.5s]" />
          <div className="absolute top-[44%] left-[-18%] w-[135%] h-px bg-gradient-to-r from-transparent via-[color:var(--page-primary)]/25 to-transparent animate-line-drift [animation-delay:3s]" />
          <div className="absolute top-[66%] left-[-22%] w-[145%] h-px bg-gradient-to-r from-transparent via-[color:var(--page-accent)]/25 to-transparent animate-line-drift [animation-delay:4.5s]" />
          <div className="absolute top-[84%] left-[-16%] w-[130%] h-px bg-gradient-to-r from-transparent via-[color:var(--page-primary)]/20 to-transparent animate-line-drift [animation-delay:6s]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--page-muted)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03] dark:opacity-[0.06]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-20 sm:mt-10 lg:pt-12 w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[calc(100vh-100px)]">
          <div className="order-2 lg:order-none lg:col-span-7 flex flex-col justify-center text-center lg:text-left z-20 mt-4 lg:mt-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-2xl md:text-3xl lg:text-[54px] font-black tracking-tight theme-heading leading-[1.1] mb-4"
            >
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)]">
                Jeet Nathwani
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold theme-primary mb-5 h-10 sm:h-12"
            >
              <TypingEffect />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:block text-base sm:text-lg md:text-xl theme-muted max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
            >
              Building secure, scalable, and high-performance web applications. Focused on clean architecture, seamless user experiences, and modern backend solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5 mb-8"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  if (onViewWork) onViewWork();
                }}
                className="group relative flex items-center justify-center gap-2 w-1/2 sm:w-auto min-w-0 px-3 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)] overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10">View My Work</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 w-1/2 sm:w-auto min-w-0 px-3 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base theme-heading theme-surface hover:bg-[color:var(--page-surface-muted)] theme-border border transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <span>Get in touch</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              {[
                { icon: <Github size={22} />, href: "https://github.com/JeetNathwani26" },
                { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/in/jeet-nathwani-274a06271/" },
                { icon: <MessageCircle size={22} />, href: "https://wa.me/917567120438" },
                { icon: <Mail size={22} />, href: emailHref, target: emailTarget, rel: emailRel },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target={social.target || "_blank"}
                  rel={social.rel || "noopener noreferrer"}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full theme-surface theme-border border text-[color:var(--page-muted)] hover:text-[color:var(--page-primary)] hover:border-[color:var(--page-primary)] transition-colors shadow-sm"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="order-1 lg:order-none lg:col-span-5 relative w-full h-[280px] sm:h-[500px] lg:h-full flex items-center justify-center mt-2 sm:mt-8 lg:mt-0">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


