import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <section
      id="resume"
      className="min-h-screen flex items-center justify-center theme-section-alt"
    >
      <div className="text-center px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}
          className="text-3xl md:text-5xl font-bold theme-heading mb-6"
        >
          My <span className="theme-primary">Resume</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.1 }}
          className="theme-muted max-w-xl mx-auto mb-8"
        >
          Download my resume to learn more about my skills, projects, and
          experience.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.2 }}
          href="/public/Jeetkumar.pdf"
          download
          className="inline-flex items-center gap-3 theme-primary-bg text-white px-8 py-3 rounded-lg font-medium transition-transform hover:scale-105 shadow-md"
        >
          <Download size={20} />
          Download Resume
        </motion.a>
      </div>
    </section>
  );
};

export default Resume;
