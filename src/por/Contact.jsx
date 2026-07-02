import { Github, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="section-heading text-center text-5xl mb-8 font-bold theme-heading">
            Get In <span className="theme-primary">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.1 }}
            className="section-subheading theme-muted mx-auto mb-10"
          >
            I'm currently open to new opportunities and collaborations. Whether
            you have a question or just want to say hi, feel free to reach out!
          </motion.p>

          {/* Main CTA */}
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.2 }}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jeetnathwani660@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 theme-primary-bg text-white px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 shadow-md mb-12"
          >
            <Send size={20} />
            Send Me a Message
          </motion.a>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jeetnathwani660@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 theme-muted transition-colors group"
            >
              <div className="p-3 rounded-lg theme-surface-muted transition-colors">
                <Mail size={24} />
              </div>
            </a>
            <a
              href="https://github.com/JeetNathwani26"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 theme-muted transition-colors group"
            >
              <div className="p-3 rounded-lg theme-surface-muted transition-colors">
                <Github size={24} />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/jeet-nathwani-274a06271/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 theme-muted transition-colors group"
            >
              <div className="p-3 rounded-lg theme-surface-muted transition-colors">
                <Linkedin size={24} />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
