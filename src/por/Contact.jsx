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


/* ─── Floating Blob ─────────────────────────────────────────── */
const Blob = ({ style, colorA, colorB, size, duration, delay }) => (
  <motion.div
    aria-hidden="true"
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle at 30% 30%, ${colorA}, ${colorB})`,
      filter: "blur(72px)",
      opacity: 0.28,
      pointerEvents: "none",
      zIndex: 0,
      ...style,
    }}
    animate={{ x: [0, 28, -18, 0], y: [0, -36, 18, 0], scale: [1, 1.1, 0.94, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ─── Divider ────────────────────────────────────────────────── */
const Divider = () => (
  <div
    style={{
      width: "100%",
      height: 1,
      background:
        "linear-gradient(90deg, transparent, var(--page-border), transparent)",
      margin: "0 auto",
    }}
  />
);

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

/* ─── Main Component ─────────────────────────────────────────── */
const Contact = () => {
  const [formState, setFormState] = useState("idle"); // idle | sending | sent

  const handleSend = (e) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => {
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
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-32"
      style={{ isolation: "isolate" }}
    >
      {/* ── Animated Background Blobs ── */}
      <Blob
        colorA="rgba(99,102,241,0.55)"
        colorB="rgba(139,92,246,0.15)"
        size="520px"
        duration={12}
        delay={0}
        style={{ top: "-80px", left: "-120px" }}
      />
      <Blob
        colorA="rgba(139,92,246,0.45)"
        colorB="rgba(59,130,246,0.12)"
        size="400px"
        duration={16}
        delay={3}
        style={{ bottom: "0px", right: "-100px" }}
      />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>

      <div className="container mx-auto px-6 relative" style={{ zIndex: 1 }}>

        {/* ══ SECTION 1 — Header ══ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase theme-primary mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold theme-heading mb-4">
            Get In <span className="theme-primary">Touch</span>
          </h2>
          <p className="theme-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Let&apos;s Build Something{" "}
            <span className="theme-text font-semibold">Amazing</span> Together
          </p>
        </motion.div>

        <Divider />

        {/* ══ SECTION 2 — Professional Text + Contact Card ══ */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 py-12 md:py-16 items-start max-w-5xl mx-auto">

          {/* Left — Professional Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={0}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold theme-heading mb-5 leading-snug">
              I&apos;m currently open to{" "}
              <span className="theme-primary">new opportunities</span> &amp;
              collaborations.
            </h3>
            <p className="theme-muted text-base leading-relaxed mb-6">
              Whether you have an exciting project in mind, want to discuss
              technology, or just want to say hi — my inbox is always open.
              I&apos;ll get back to you as soon as possible.
            </p>
            <p className="theme-muted text-base leading-relaxed mb-8">
              I specialize in building scalable full-stack applications with
              Laravel, PHP, React, and modern web technologies. Let&apos;s turn
              your idea into reality.
            </p>

            {/* Quick stats */}
            <div className="flex gap-4 sm:gap-8 flex-wrap">
              {[
                { val: "< 24h", label: "Response Time" },
                { val: "100%", label: "Commitment" },
                { val: "Open", label: "To Freelance" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  custom={i + 1}
                  viewport={{ once: false, amount: 0.2 }}
                  className="flex flex-col"
                >
                  <span className="text-xl font-bold theme-primary">{s.val}</span>
                  <span className="text-xs theme-muted mt-0.5">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={1}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col gap-3"
          >
            <InfoRow
              icon={Mail}
              label="Email"
              value="jeetnathwani660@gmail.com"
              href={getEmailLink()}
            />
            <InfoRow
              icon={Linkedin}
              label="LinkedIn"
              value="jeet-nathwani-274a06271"
              href="https://www.linkedin.com/in/jeet-nathwani-274a06271/"
            />
            <InfoRow
              icon={Github}
              label="GitHub"
              value="JeetNathwani26"
              href="https://github.com/JeetNathwani26"
            />
            <InfoRow
              icon={MapPin}
              label="Location"
              value="Vadodara, Gujarat, India"
            />
            <InfoRow
              icon={CheckCircle2}
              label="Status"
              value="Ready to collaborate"
              available
            />
          </motion.div>
        </div>

        <Divider />

        {/* ══ SECTION 3 — Send Message ══ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center py-12 md:py-16"
        >
          <h3 className="text-xl md:text-2xl font-bold theme-heading mb-3">
            Ready to start a conversation?
          </h3>
          <p className="theme-muted text-sm mb-8 max-w-sm mx-auto">
            Click below and I&apos;ll receive your message directly in my inbox.
          </p>
          <motion.button
            onClick={handleSend}
            disabled={formState !== "idle"}
            whileHover={formState === "idle" ? { scale: 1.06, y: -2 } : {}}
            whileTap={formState === "idle" ? { scale: 0.97 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="inline-flex items-center gap-3 theme-primary-bg text-white px-8 py-4 rounded-2xl font-semibold text-base cursor-pointer"
            style={{
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
              border: "none",
              outline: "none",
            }}
            id="contact-send-btn"
          >
            {formState === "sending" ? (
              <>
                <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                Opening…
              </>
            ) : formState === "sent" ? (
              <>
                <CheckCircle2 size={20} />
                Message Sent! ✓
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </motion.button>
        </motion.div>

        <Divider />

        {/* ══ SECTION 4 — Social Cards ══ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="py-12 md:py-16"
        >
          <p className="text-center text-xs font-semibold tracking-widest uppercase theme-muted mb-8">
            Find me on
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto w-full">
            <SocialCard
              icon={Mail}
              label="Email"
              href={getEmailLink()}
              color="linear-gradient(135deg, #ea4335, #fbbc04)"
            />
            <SocialCard
              icon={Github}
              label="GitHub"
              href="https://github.com/JeetNathwani26"
              color="linear-gradient(135deg, #24292e, #57606a)"
            />
            <SocialCard
              icon={Linkedin}
              label="LinkedIn"
              href="https://www.linkedin.com/in/jeet-nathwani-274a06271/"
              color="linear-gradient(135deg, #0077b5, #00a0dc)"
            />
          </div>
        </motion.div>

        <Divider />

        {/* ══ SECTION 5 — Footer Tagline ══ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
          className="text-center pt-12 pb-4"
        >
          <p className="text-2xl md:text-3xl font-bold theme-heading">
            Thanks for Visiting
          </p>
          <p className="theme-muted text-sm mt-3">
            {" "}· Designed by Jeet Nathwani
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
