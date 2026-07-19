import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import khetMitraImg from "../assets/khetMitra.png";
import portfolioImg from "../assets/protfolio.png";

const projects = [
  {
    title: "KhetMitra -- Smart Agriculture Platform",
    description: "Developed a full-stack agriculture management platform connecting landowners and managers for efficient farmland utilization.",
    tech: ["React", "python", "MongoDB", "Tailwind css"],
    github: "https://github.com/JeetNathwani26/khetmitr-frontend",
    live: "https://khetmitr-frontend.vercel.app/",
    image: khetMitraImg,
  },
  {
    title: "Developer Portfolio",
    description: "A modern animated developer portfolio built using React and Framer Motion featuring smooth scrolling, interactive UI components, and responsive layouts.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/JeetNathwani26",
    live: "#",
    image: portfolioImg,
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 theme-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="section-heading text-center text-3xl sm:text-4xl md:text-5xl mb-8 font-bold theme-heading">
            My <span className="theme-primary">Projects</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="section-subheading theme-muted mx-auto">
            Here are some of my recent projects that showcase my skills and passion
            for building great products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: index * 0.1 }}
              className="group theme-surface-strong rounded-xl border shadow-sm overflow-hidden hover:border-[color:var(--page-primary)] hover:shadow-md transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 theme-surface-muted flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <span className="text-4xl font-bold theme-primary">{project.title.charAt(0)}</span>
                )}
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
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:text-[color:var(--page-primary)]" aria-label="View GitHub repository"><Github size={20} /></a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="theme-icon transition-colors hover:text-[color:var(--page-primary)]" aria-label="View live demo"><ExternalLink size={20} /></a>
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
