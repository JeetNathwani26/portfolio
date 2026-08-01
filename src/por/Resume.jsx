import React from "react";
import { Download, ExternalLink, GraduationCap, Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "2024 - Present",
    title: "Software Developer",
    company: "Freelance / Open Source",
    desc: "Developing full-stack applications using React, Laravel, and Tailwind CSS. Contributing to open-source projects and building scalable APIs.",
    tech: ["React", "Laravel", "Tailwind", "MySQL"],
    icon: <Briefcase size={20} />,
    type: "work",
  },
  {
    year: "2024 - 2026",
    title: "Master of Computer Applications (MCA)",
    company: "GT University", // Replace with actual
    desc: "Pursuing advanced studies in computer science, focusing on modern software engineering practices and architectural patterns.",
    icon: <GraduationCap size={20} />,
    type: "education",
  },
  {
    year: "2021 - 2024",
    title: "Bachelor of Computer Applications (BCA)",
    company: " University", // Replace with actual
    desc: "Graduated with honors in Computer Science. Built foundational knowledge in programming, databases, and software development lifecycles.",
    icon: <GraduationCap size={20} />,
    type: "education",
  },
];

const TimelineItem = ({ item, index }) => {
  const isWork = item.type === "work";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:grid md:grid-cols-5 md:gap-8 items-center">
        {/* Left Side (Date & Company for Desktop) */}
        <div className="hidden md:flex flex-col items-end col-span-2 text-right pt-1">
          <span className="text-[color:var(--page-primary)] font-bold tracking-wider uppercase text-sm mb-1">{item.year}</span>
          <span className="theme-muted font-medium text-sm flex items-center gap-1 justify-end">
            <Calendar size={14} />
            {item.company}
          </span>
        </div>

        {/* Center Node */}
        <div className="absolute left-0 md:relative md:col-span-1 flex justify-center h-full">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-[-3rem] left-[15px] md:left-1/2 w-px bg-gradient-to-b from-[color:var(--page-primary)] via-[color:var(--page-border)] to-transparent -translate-x-1/2" />
          
          {/* Icon Node */}
          <div className={`relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 theme-surface-strong shadow-lg ${isWork ? 'text-[color:var(--page-accent)] border-[color:var(--page-accent)]' : 'text-[color:var(--page-primary)] border-[color:var(--page-primary)]'}`}>
            {item.icon}
          </div>
        </div>

        {/* Right Side (Content) */}
        <div className="col-span-2 pb-12 pt-1 md:pt-2">
          {/* Mobile Date & Company */}
          <div className="md:hidden mb-2">
            <span className="text-[color:var(--page-primary)] font-bold tracking-wider uppercase text-xs block mb-1">{item.year}</span>
            <span className="theme-muted font-medium text-xs flex items-center gap-1">
              <Calendar size={12} />
              {item.company}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold theme-heading mb-3">{item.title}</h3>
          <p className="theme-muted text-sm md:text-base leading-relaxed mb-4">{item.desc}</p>
          
          {item.tech && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tech.map((t, i) => (
                <span key={i} className="text-xs font-semibold theme-text bg-[color:var(--page-surface-muted)] px-3 py-1 rounded-full border theme-border">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Resume = () => {
  return (
    <section id="resume" className="py-24 lg:py-32 relative theme-section-alt overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[color:var(--page-primary)]/20 to-transparent" />
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[color:var(--page-primary)] font-bold tracking-widest uppercase text-sm mb-2 block">
            Career & Education
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight theme-heading mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)]">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="mb-24">
          {timeline.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Resume Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] p-8 md:p-12 theme-surface-strong theme-border border shadow-2xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--page-primary)]/5 to-[color:var(--page-accent)]/5 pointer-events-none" />
          
          <h3 className="text-2xl md:text-3xl font-bold theme-heading mb-4 relative z-10">
            Want the full picture?
          </h3>
          <p className="theme-muted mb-8 max-w-md mx-auto relative z-10">
            Download my complete resume to see a detailed overview of my skills, experiences, and educational background.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href="/Jeetkumar.pdf"
              download
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </a>
            <a
              href="/Jeetkumar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold theme-text theme-surface theme-border border hover:border-[color:var(--page-primary)] transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <ExternalLink size={20} />
              <span>View Online</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
