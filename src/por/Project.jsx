import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with product management, cart functionality, and secure payment processing using Stripe.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates, team workspaces, and progress tracking.",
    tech: ["React", "Express", "Socket.io", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media metrics with beautiful data visualizations and automated reporting.",
    tech: ["React", "D3.js", "Node.js", "Redis"],
    github: "#",
    live: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 theme-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="section-heading text-center text-5xl mb-8 font-bold theme-heading">
            My <span className="theme-primary">Projects</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="section-subheading theme-muted mx-auto">
            Here are some of my recent projects that showcase my skills and passion
            for building great products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: index * 0.1 }}
              className="group theme-surface-strong rounded-xl border shadow-sm overflow-hidden hover:border-[color:var(--page-primary)] hover:shadow-md transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 theme-surface-muted flex items-center justify-center">
                <span className="text-4xl font-bold theme-primary">{project.title.charAt(0)}</span>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-xl theme-heading mb-2 group-hover:text-[color:var(--page-primary)] transition-colors">{project.title}</h3>
                <p className="theme-muted text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs font-medium theme-primary-soft px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a href={project.github} className="theme-icon transition-colors" aria-label="View GitHub repository"><Github size={20} /></a>
                  <a href={project.live} className="theme-icon transition-colors" aria-label="View live demo"><ExternalLink size={20} /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
