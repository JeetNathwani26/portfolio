import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Send, CheckCircle, Phone } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getEmailLink, isMobileDevice } from "./utils";


const emailHref = "mailto:jeetnathwani660@gmail.com";

const InputField = ({ label, name, type = "text", value, onChange, required = true }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <motion.label
        initial={false}
        animate={{
          y: isFocused || value ? -24 : 14,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? "var(--page-primary)" : "var(--page-muted)",
        }}
        className="absolute left-4 font-medium pointer-events-none origin-left transition-colors z-10"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={4}
          className={`w-full bg-transparent border-2 rounded-2xl p-4 text-[color:var(--page-text)] outline-none transition-all resize-none relative z-0 ${
            isFocused ? "border-[color:var(--page-primary)] shadow-[0_0_15px_rgba(79,70,229,0.2)]" : "theme-border border"
          }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-transparent border-2 rounded-2xl p-4 text-[color:var(--page-text)] outline-none transition-all relative z-0 h-[56px] ${
            isFocused ? "border-[color:var(--page-primary)] shadow-[0_0_15px_rgba(79,70,229,0.2)]" : "theme-border border"
          }`}
        />
      )}
    </div>
/* ─── Section fade-up variant ────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ─── Contact Info Row ───────────────────────────────────────── */
const InfoRow = ({ icon: Icon, label, value, href, available }) => {
  const isMailto = href && href.startsWith("mailto:");
  return (
    <motion.a
      href={href || "#"}
      target={href ? (isMailto ? undefined : "_blank") : undefined}
      rel={isMailto ? undefined : "noopener noreferrer"}
      whileHover={{ x: 6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl theme-surface border theme-border group cursor-pointer"
      style={{ textDecoration: "none" }}
    >
    <div
      className="flex items-center justify-center rounded-xl theme-primary-soft flex-shrink-0"
      style={{ width: 44, height: 44 }}
    >
      <Icon size={20} className="theme-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs theme-muted" style={{ marginBottom: 2 }}>
        {label}
      </p>
      <p className="theme-text font-medium text-xs sm:text-sm break-all sm:break-normal sm:truncate">{value}</p>
    </div>
    {available && (
      <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#10b981",
            display: "inline-block",
            animation: "pulse-dot 1.8s ease-in-out infinite",
          }}
        />
        Available
      </span>
    )}
  </motion.a>
  );
};

/* ─── Social Card ────────────────────────────────────────────── */
const SocialCard = ({ icon: Icon, label, href, color }) => {
  const isMailto = href && href.startsWith("mailto:");
  return (
    <motion.a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="flex flex-col items-center gap-2.5 sm:gap-3 p-4 sm:p-6 rounded-2xl theme-surface border theme-border cursor-pointer flex-1"
      style={{ textDecoration: "none", minWidth: 0 }}
    >
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{ width: 52, height: 52, background: color }}
    >
      <Icon size={24} color="#fff" />
    </div>
    <span className="theme-text font-semibold text-sm">{label}</span>
  </motion.a>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
      const email = "jeetnathwani660@gmail.com";
      if (isMobileDevice()) {
        window.location.href = `mailto:${email}`;
      } else {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
          "_blank"
        );
      }
      setFormState("sent");
      setTimeout(() => setFormState("idle"), 3000);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative theme-page overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[color:var(--page-primary)] opacity-[0.04] blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[color:var(--page-accent)] opacity-[0.04] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[color:var(--page-primary)] font-bold tracking-widest uppercase text-sm mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight theme-heading mb-6">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)]">
              Together
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="theme-surface-strong theme-border border rounded-3xl p-8 shadow-lg backdrop-blur-xl">
              <h3 className="text-2xl font-bold theme-heading mb-6">Contact Information</h3>
              <p className="theme-muted mb-8 leading-relaxed">
                Whether you have a question, a project proposal, or just want to say hi, I&apos;ll try my best to get back to you!
              </p>

              <div className="flex flex-col gap-6 mb-10">
                <a href={emailHref} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full theme-surface theme-border border flex items-center justify-center text-[color:var(--page-primary)] group-hover:bg-[color:var(--page-primary)] group-hover:text-white transition-all shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm theme-muted font-medium">Email Me</p>
                    <p className="font-semibold theme-text group-hover:text-[color:var(--page-primary)] transition-colors">
                      jeetnathwani660@gmail.com
                    </p>
                  </div>
                </a>

                <a href="https://wa.me/917567120438" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full theme-surface theme-border border flex items-center justify-center text-[color:var(--page-accent)] group-hover:bg-[color:var(--page-accent)] group-hover:text-white transition-all shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm theme-muted font-medium">Call / WhatsApp</p>
                    <p className="font-semibold theme-text group-hover:text-[color:var(--page-accent)] transition-colors">
                      +91 75671 20438
                    </p>
                  </div>
                </a>
              </div>

              <div className="w-full h-48 rounded-2xl overflow-hidden theme-border border relative group">
                <iframe
                  title="Vadodara Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221669!2d73.17308625!3d22.32210265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(100%) opacity(80%)" }}
                  allowFullScreen=""
                  loading="lazy"
                  className="transition-all duration-500 group-hover:filter-none"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-[color:var(--page-primary)] rounded-2xl transition-colors" />
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
              <span className="font-medium theme-muted">Follow me</span>
              <div className="flex gap-4">
                <a href="https://github.com/JeetNathwani26" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl theme-surface-strong theme-border border hover:bg-[color:var(--page-primary)] hover:border-[color:var(--page-primary)] hover:text-white transition-all shadow-sm hover:-translate-y-1">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/jeet-nathwani-274a06271/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl theme-surface-strong theme-border border hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all shadow-sm hover:-translate-y-1">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="theme-surface-strong theme-border border rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <h3 className="text-3xl font-bold theme-heading mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <InputField label="Your Name" name="name" value={formData.name} onChange={handleChange} />
                  <InputField label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
                <InputField label="Message" name="message" type="textarea" value={formData.message} onChange={handleChange} />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "submitting" || status === "success"}
                  className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)] shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center gap-3 overflow-hidden relative"
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.div key="idle" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="flex items-center gap-2">
                        <span>Send Message</span>
                        <Send size={18} />
                      </motion.div>
                    )}
                    {status === "submitting" && (
                      <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    )}
                    {status === "success" && (
                      <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2 text-green-100">
                        <CheckCircle size={20} />
                        <span>Message Sent Successfully!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-green-500/10 backdrop-blur-sm z-20 flex flex-col items-center justify-center border-2 border-green-500 rounded-3xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg mb-4"
                    >
                      <CheckCircle size={40} />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">Thank You!</h4>
                    <p className="text-green-700 dark:text-green-300 font-medium">I will get back to you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
