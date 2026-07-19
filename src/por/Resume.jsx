import React, { useRef, useEffect, useState } from "react";
import { Download, ExternalLink, GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ─── Timeline data ─────────────────────────────────────────── */
const timeline = [
  {
    year: "2021",
    title: "Started BCA",
    desc: "Bachelor of Computer Applications",
    icon: <GraduationCap size={18} />,
    color: "#818cf8",
    side: "left",
  },
  {
    year: "2024",
    title: "Completed BCA",
    desc: "Graduated with honours in Computer Science",
    icon: <GraduationCap size={18} />,
    color: "#a78bfa",
    side: "right",
  },
  {
    year: "2024",
    title: "Started MCA",
    desc: "Master of Computer Applications",
    icon: <GraduationCap size={18} />,
    color: "#818cf8",
    side: "left",
  },
  {
    year: "2026",
    title: "Software Developer",
    desc: "Full-Stack Developer & Open Source Contributor",
    icon: <Briefcase size={18} />,
    color: "#fbbf24",
    side: "right",
  },
];

/* ─── Ripple hook ───────────────────────────────────────────── */
function useRipple() {
  const [ripples, setRipples] = useState([]);
  const addRipple = (e) => {
    const btn = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - btn.left;
    const y = e.clientY - btn.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };
  return [ripples, addRipple];
}

/* ─── Main component ────────────────────────────────────────── */
const Resume = () => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const [ripples, addRipple] = useRipple();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="resume"
      ref={sectionRef}
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
      className="flex items-center justify-center theme-section-alt"
    >
      {/* ── Animated Blob Background ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, -50, 40, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "10%", left: "8%",
            width: 420, height: 420, borderRadius: "60% 40% 55% 45% / 50% 60% 40% 55%",
            background: "radial-gradient(circle, rgba(129,140,248,0.22) 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 60, -40, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            position: "absolute", bottom: "10%", right: "10%",
            width: 380, height: 380, borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
            background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 50, 0], scale: [1, 1.08, 0.93, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          style={{
            position: "absolute", top: "50%", left: "55%",
            width: 300, height: 300, borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
            background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Mouse-follow glow */}
        <motion.div
          style={{
            position: "absolute",
            left: glowX,
            top: glowY,
            translateX: "-50%",
            translateY: "-50%",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.13) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(var(--page-border) 1px, transparent 1px), linear-gradient(90deg, var(--page-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.35,
        }} />
      </div>

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 12 }}
        >
          <span style={{
            display: "inline-block",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--page-primary)",
            background: "color-mix(in srgb, var(--page-primary) 12%, transparent)",
            padding: "4px 16px", borderRadius: 99,
            marginBottom: 16,
            border: "1px solid color-mix(in srgb, var(--page-primary) 25%, transparent)",
          }}>
            Career &amp; Education
          </span>
          <h2 className="theme-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.1 }}>
            My <span className="theme-primary">Resume</span>
          </h2>
        </motion.div>

        {/* Professional Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="theme-muted"
          style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px", fontSize: 16, lineHeight: 1.7 }}
        >
          Passionate full-stack developer with expertise in modern web technologies.
          Transforming complex problems into elegant, scalable solutions — one line of
          code at a time.
        </motion.p>

        {/* ── Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            {timeline.map((item, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    width: "100%",
                    maxWidth: 520,
                    justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    className="theme-surface theme-border"
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "14px 22px", borderRadius: 16,
                      border: "1px solid",
                      minWidth: 260,
                      boxShadow: `0 4px 24px color-mix(in srgb, ${item.color} 12%, transparent)`,
                      background: "var(--page-surface)",
                      backdropFilter: "blur(18px)",
                      flexDirection: i % 2 === 0 ? "row" : "row-reverse",
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: `color-mix(in srgb, ${item.color} 18%, transparent)`,
                      border: `2px solid ${item.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: item.color, flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ textAlign: i % 2 === 0 ? "left" : "right" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: item.color, letterSpacing: "0.1em" }}>{item.year}</div>
                      <div className="theme-heading" style={{ fontWeight: 700, fontSize: 15 }}>{item.title}</div>
                      <div className="theme-muted" style={{ fontSize: 12, marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                </motion.div>

                {i < timeline.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.1 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 0" }}
                  >
                    <div style={{ width: 2, height: 24, background: "linear-gradient(180deg, var(--page-primary), transparent)", borderRadius: 2 }} />
                    <ChevronDown size={16} style={{ color: "var(--page-primary)", opacity: 0.7 }} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* ── Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}
        >
          {/* Primary — Download Resume */}
          <a
            href="/Jeetkumar.pdf"
            download
            onClick={addRipple}
            style={{
              position: "relative", overflow: "hidden",
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px", borderRadius: 14,
              fontWeight: 700, fontSize: 15, color: "#fff",
              background: "var(--page-primary)",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              const icon = e.currentTarget.querySelector(".resume-dl-icon");
              if (icon) icon.style.transform = "translateY(3px)";
            }}
            onMouseLeave={e => {
              const icon = e.currentTarget.querySelector(".resume-dl-icon");
              if (icon) icon.style.transform = "translateY(0)";
            }}
          >
            {ripples.map(r => (
              <span key={r.id} style={{
                position: "absolute",
                left: r.x, top: r.y,
                width: 8, height: 8,
                marginLeft: -4, marginTop: -4,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)",
                animation: "resumeRipple 0.7s ease-out forwards",
                pointerEvents: "none",
              }} />
            ))}
            <Download
              size={20}
              className="resume-dl-icon"
              style={{ transition: "transform 0.25s ease" }}
            />
            Download Resume
          </a>

          {/* Secondary — View Resume */}
          <a
            href="/Jeetkumar.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "relative", overflow: "hidden",
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px", borderRadius: 14,
              fontWeight: 700, fontSize: 15,
              color: "var(--page-primary)",
              background: "color-mix(in srgb, var(--page-primary) 8%, transparent)",
              border: "1.5px solid color-mix(in srgb, var(--page-primary) 35%, transparent)",
              backdropFilter: "blur(16px)",
              textDecoration: "none",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--page-primary) 20%, transparent), 0 8px 32px color-mix(in srgb, var(--page-primary) 18%, transparent)";
              e.currentTarget.style.borderColor = "var(--page-primary)";
              e.currentTarget.style.background = "color-mix(in srgb, var(--page-primary) 14%, transparent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "color-mix(in srgb, var(--page-primary) 35%, transparent)";
              e.currentTarget.style.background = "color-mix(in srgb, var(--page-primary) 8%, transparent)";
            }}
          >
            <ExternalLink size={20} />
            View Resume
          </a>
        </motion.div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes resumeGlow {
          0%, 100% { box-shadow: 0 0 18px 2px color-mix(in srgb, var(--page-primary) 38%, transparent), 0 4px 24px color-mix(in srgb, var(--page-primary) 20%, transparent); }
          50%       { box-shadow: 0 0 32px 6px color-mix(in srgb, var(--page-primary) 55%, transparent), 0 8px 36px color-mix(in srgb, var(--page-primary) 30%, transparent); }
        }
        @keyframes resumeRipple {
          to { transform: scale(28); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Resume;