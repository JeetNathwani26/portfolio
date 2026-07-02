import { Code2, Database, Palette, Server } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
  { icon: Code2, title: "Frontend", items: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { icon: Server, title: "Backend", items: ["Node.js", "Express", "REST APIs", "GraphQL"] },
  { icon: Database, title: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"] },
  { icon: Palette, title: "Tools & More", items: ["Git", "Docker", "AWS", "Figma", "VS Code"] },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className=" mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="section-heading text-center text-5xl mb-8 font-bold theme-heading">
            About <span className="theme-primary">Me</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="theme-muted text-center text-lg mb-16 max-w-2xl mx-auto">
            I'm a passionate Full Stack Developer with a love for creating elegant 
            solutions to complex problems. With experience in the MERN stack and 
            modern web technologies, I build applications that are both beautiful 
            and performant.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: index * 0.1 }}
                className="theme-surface-strong p-6 rounded-xl border shadow-sm hover:border-[color:var(--page-primary)] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <skill.icon className="w-8 h-8 theme-primary mb-4" />
                <h3 className="font-semibold theme-heading mb-3">{skill.title}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="theme-muted text-sm">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
