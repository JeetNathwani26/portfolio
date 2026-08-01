import React from "react";
import { motion } from "framer-motion";
import { Server, Layout, Database, Terminal } from "lucide-react";

const skillCategories = [
  {
    title: "Backend",
    icon: <Server size={24} />,
    color: "from-blue-500 to-indigo-500",
    skills: ["Laravel", "PHP", "Node.js", "Python"],
  },
  {
    title: "Frontend",
    icon: <Layout size={24} />,
    color: "from-pink-500 to-rose-500",
    skills: ["React", "Tailwind CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Database",
    icon: <Database size={24} />,
    color: "from-emerald-500 to-teal-500",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "DevOps",
    icon: <Terminal size={24} />,
    color: "from-orange-500 to-amber-500",
    skills: ["Docker", "GitHub Actions", "AWS", "Linux"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden theme-page">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-[color:var(--page-primary)] opacity-[0.03] blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-[color:var(--page-accent)] opacity-[0.03] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight theme-heading mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)]">Expertise</span>
          </h2>
          <p className="text-lg md:text-xl theme-muted max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and the technologies I use to build modern applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl theme-surface theme-border border shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-[0.03] rounded-3xl transition-opacity duration-300 pointer-events-none`}
              />

              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold theme-heading">{category.title}</h3>
              </div>

              <ul className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[color:var(--page-primary)] to-[color:var(--page-accent)]" />
                    <span className="font-medium theme-text group-hover:text-[color:var(--page-primary)] transition-colors">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
