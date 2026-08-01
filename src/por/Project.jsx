import React, { useMemo, useState } from "react";
import { ExternalLink, Github, ArrowRight, Layout, Database, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import khetMitraImg from "../assets/khetMitra.png";
import portfolioImg from "../assets/protfolio.png";

const projects = [
  {
    title: "KhetMitra - Smart Agriculture",
    category: "full-stack",
    badge: "Full Stack Platform",
    description: "A comprehensive agriculture management platform connecting landowners and managers for efficient farmland utilization, automated resource tracking, and real-time market data.",
    features: ["User Auth & Roles", "Real-time Tracking", "Data Visualization", "Responsive Dashboard"],
    tech: ["React", "Python", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/JeetNathwani26/khetmitr-frontend",
    live: "https://khetmitr-frontend.vercel.app/",
    image: khetMitraImg,
    icon: <Database className="text-[color:var(--page-primary)]" size={24} />
  },
  {
    title: "Developer Portfolio",
    category: "web-design",
    badge: "Frontend Showcase",
    description: "A modern animated developer portfolio built using React and Framer Motion featuring smooth scrolling, premium UI components, and fully responsive device-specific layouts.",
    features: ["Glassmorphism UI", "Framer Motion Animations", "Dark Mode", "Performance Optimized"],
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/JeetNathwani26",
    live: "#",
    image: portfolioImg,
    icon: <Layout className="text-[color:var(--page-accent)]" size={24} />
  }
];

const projectTabs = [
  { id: "all", label: "All Projects" },
  { id: "full-stack", label: "Full Stack" },
  { id: "web-design", label: "Web Design" },
  { id: "ai-model-train", label: "AI Model Train" },
  { id: "agent-creation", label: "Agent Creation" },
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center theme-surface theme-border border rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/3] shadow-xl">
        <div className="absolute inset-0 bg-[color:var(--page-surface)]/20 mix-blend-overlay z-10" />
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[color:var(--page-primary)] to-[color:var(--page-accent)]">
            <span className="text-6xl font-bold text-white">{project.title.charAt(0)}</span>
          </div>
        )}
        
        {/* Overlay Links on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-6 backdrop-blur-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/10 hover:bg-[color:var(--page-primary)] text-white transition-colors transform translate-y-8 group-hover:translate-y-0 duration-500 delay-100"
          >
            <Github size={24} />
          </a>
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/10 hover:bg-[color:var(--page-primary)] text-white transition-colors transform translate-y-8 group-hover:translate-y-0 duration-500 delay-150"
            >
              <ExternalLink size={24} />
            </a>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl theme-surface-strong theme-border border shadow-sm">
            {project.icon}
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-[color:var(--page-primary)]">
            {project.badge}
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-black theme-heading mb-6 tracking-tight group-hover:text-[color:var(--page-primary)] transition-colors">
          {project.title}
        </h3>

        <p className="text-lg theme-muted leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {project.features.map((feature, fIdx) => (
            <div key={fIdx} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--page-accent)]" />
              <span className="text-sm font-medium theme-text">{feature}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 text-sm font-semibold theme-text theme-surface-strong theme-border border rounded-xl shadow-sm hover:border-[color:var(--page-primary)] hover:text-[color:var(--page-primary)] transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={project.live !== "#" ? project.live : project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[color:var(--page-text)] hover:bg-[color:var(--page-primary)] transition-colors"
          >
            {project.live !== "#" ? "View Live Project" : "View Source Code"}
            <ArrowRight size={18} />
          </a>
          {project.live !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold theme-text hover:text-[color:var(--page-primary)] transition-colors"
            >
              <Github size={18} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter((project) => project.category === activeTab);
  }, [activeTab]);

  return (
    <section id="projects" className="py-24 lg:py-32 relative theme-page">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight theme-heading mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)]">Creation</span>
          </h2>
          <p className="text-lg md:text-xl theme-muted max-w-2xl mx-auto">
            A selection of my recent work showcasing real-world applications and modern web development practices.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 lg:mb-16">
          {projectTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold border transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[color:var(--page-primary)] text-white border-[color:var(--page-primary)] shadow-lg shadow-[color:var(--page-primary)]/20"
                  : "theme-surface theme-border text-[color:var(--page-text)] hover:border-[color:var(--page-primary)] hover:text-[color:var(--page-primary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-12 lg:gap-24">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
           <a
              href="https://github.com/JeetNathwani26"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl theme-surface theme-border border hover:border-[color:var(--page-primary)] shadow-sm hover:shadow-xl transition-all"
           >
              <Github className="theme-text group-hover:text-[color:var(--page-primary)] transition-colors" size={24} />
              <span className="font-bold theme-text group-hover:text-[color:var(--page-primary)] transition-colors">View More on GitHub</span>
              <ArrowRight className="theme-text group-hover:text-[color:var(--page-primary)] transition-colors group-hover:translate-x-1" size={20} />
           </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
