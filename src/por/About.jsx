import { useRef, useState, useEffect } from "react";
import { Code2, Database, Palette, Server } from "lucide-react";
import { motion, useInView } from "framer-motion";

const skills = [
  { icon: Code2, title: "Frontend", items: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS"] },
  { icon: Server, title: "Backend", items: ["Laravel", "PHP", "Node.js", "REST APIs"] },
  { icon: Database, title: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"] },
  { icon: Palette, title: "Tools & More", items: ["Git", "Docker", "AWS", "Figma", "VS Code"] },
];

const floatingSymbols = [
  { text: "</>", x: "8%", y: "12%", delay: 0 },
  { text: "{}", x: "88%", y: "15%", delay: 1 },
  { text: "Laravel", x: "12%", y: "78%", delay: 2 },
  { text: "PHP", x: "80%", y: "82%", delay: 1.5 },
  { text: "API", x: "85%", y: "45%", delay: 0.5 },
  { text: "Docker", x: "4%", y: "48%", delay: 2.5 },
  { text: "React", x: "45%", y: "88%", delay: 3 },
];

// 1. StatCounter Component
const StatCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Extract digits and suffix (e.g. "3+" -> 15 and "+")
  const numMatch = value.match(/\d+/);
  const target = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500; // ms
    const increment = target / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      className="text-center p-4 rounded-2xl theme-surface border border-white/10 dark:border-slate-800/30 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-3xl md:text-4xl font-extrabold theme-primary mb-1">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm font-medium theme-muted uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

// 2. DevIllustration Component
const DevIllustration = () => {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center">
      {/* Background glowing gradient circle */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[60px] pointer-events-none" />

      {/* Main SVG Container */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-2xl text-slate-800 dark:text-slate-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desk line */}
        <line x1="50" y1="400" x2="450" y2="400" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" strokeLinecap="round" />

        {/* Coffee Mug */}
        <g className="translate-x-[360px] translate-y-[320px]">
          {/* Mug body */}
          <rect x="0" y="20" width="40" height="50" rx="6" fill="var(--page-primary)" opacity="0.8" />
          {/* Handle */}
          <path d="M40 30 C 50 30, 50 55, 40 55" stroke="var(--page-primary)" strokeWidth="4" fill="none" opacity="0.8" />
          {/* Steam lines */}
          <motion.path
            d="M10 10 Q 15 5, 10 0 T 15 -10"
            stroke="var(--page-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={{ y: [0, -8], opacity: [0, 0.7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.path
            d="M25 10 Q 20 5, 25 0 T 20 -10"
            stroke="var(--page-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={{ y: [0, -8], opacity: [0, 0.7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
          />
        </g>

        {/* Laptop Setup */}
        <g className="translate-x-[80px] translate-y-[120px]">
          {/* Laptop Lid/Screen (Back) */}
          <rect x="30" y="30" width="280" height="190" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="4" />

          {/* Screen Display (Inner) */}
          <rect x="42" y="42" width="256" height="166" rx="6" fill="#0f172a" />

          {/* Code lines on screen */}
          <g className="translate-x-[55px] translate-y-[55px]">
            {/* Header / imports */}
            <rect x="0" y="0" width="50" height="6" rx="3" fill="#6366f1" />
            <rect x="60" y="0" width="80" height="6" rx="3" fill="#38bdf8" />

            {/* Class definition */}
            <rect x="0" y="16" width="120" height="6" rx="3" fill="#ec4899" />

            {/* Functions & code lines */}
            <rect x="15" y="32" width="90" height="6" rx="3" fill="#f59e0b" />
            <rect x="30" y="48" width="140" height="6" rx="3" fill="#10b981" />

            <rect x="30" y="64" width="70" height="6" rx="3" fill="#6366f1" />
            <rect x="110" y="64" width="60" height="6" rx="3" fill="#38bdf8" />

            {/* PHP tag or Laravel syntax visualization */}
            <rect x="30" y="80" width="130" height="6" rx="3" fill="#a855f7" />
            <rect x="45" y="96" width="100" height="6" rx="3" fill="#f43f5e" />
            <rect x="45" y="112" width="80" height="6" rx="3" fill="#10b981" />

            {/* Brackets */}
            <rect x="15" y="128" width="15" height="6" rx="3" fill="#f59e0b" />
            <rect x="0" y="144" width="15" height="6" rx="3" fill="#ec4899" />
          </g>

          {/* Tiny pulse circle for cursor in editor */}
          <motion.circle
            cx="185"
            cy="154"
            r="3"
            fill="#38bdf8"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />

          {/* Laptop Hinge & Base */}
          <path d="M10 220 L330 220 C340 220, 340 232, 330 232 L10 232 C0 232, 0 220, 10 220 Z" fill="#64748b" />
          <rect x="140" y="222" width="60" height="6" rx="3" fill="#475569" />
          <path d="M130 220 L210 220 L200 225 L140 225 Z" fill="#334155" />
        </g>
      </svg>

      {/* Floating Badges overlayed on top of the SVG using absolute positions so they are easy to animate with Framer Motion! */}
      <motion.div
        className="absolute top-[15%] left-[10%] p-2 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 flex items-center gap-1.5 shadow-sm"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
        <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 font-mono">&lt;PHP&gt;</span>
      </motion.div>

      <motion.div
        className="absolute top-[28%] right-[8%] p-2 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 backdrop-blur-md border border-amber-500/30 flex items-center gap-1.5 shadow-sm"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="text-xs font-semibold text-amber-500 dark:text-amber-400 font-mono">Laravel</span>
      </motion.div>

      <motion.div
        className="absolute bottom-[35%] left-[8%] p-2 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 flex items-center gap-1.5 shadow-sm"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-xs font-semibold text-cyan-500 dark:text-cyan-400 font-mono">React</span>
      </motion.div>

      <motion.div
        className="absolute bottom-[22%] right-[15%] p-2 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 backdrop-blur-md border border-rose-500/30 flex items-center gap-1.5 shadow-sm"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <span className="text-xs font-semibold text-rose-500 dark:text-rose-400 font-mono">&#123; API &#125;</span>
      </motion.div>
    </div>
  );
};

// 3. SkillCard Component with Mouse-Glow Hover Effect
const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const IconComponent = skill.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="relative overflow-hidden theme-surface p-6 rounded-2xl border border-white/10 dark:border-slate-800/30 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-indigo-500/30 dark:hover:border-indigo-400/30 group"
    >
      {/* Radial glow background tracking mouse */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400">
            <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          </div>
          <h3 className="font-semibold text-lg theme-heading group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300">{skill.title}</h3>
        </div>
        <ul className="space-y-2">
          {skill.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm theme-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// 4. Main About Component
const About = () => {
  const containerRef = useRef(null);

  return (
    <section id="about" ref={containerRef} className="relative py-20 md:py-32 overflow-hidden">
      {/* Ambient background blur blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-indigo-500/5 dark:bg-indigo-600/3 blur-[80px] md:blur-[120px] top-[10%] left-[-10%]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/5 dark:bg-purple-600/3 blur-[80px] md:blur-[120px] bottom-[10%] right-[-10%]"
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -40, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Developer Symbols */}
        {floatingSymbols.map((symbol, idx) => (
          <motion.div
            key={idx}
            className="absolute text-slate-400/10 dark:text-slate-600/10 font-mono text-xl sm:text-2xl pointer-events-none select-none"
            style={{ left: symbol.x, top: symbol.y }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: symbol.delay,
            }}
          >
            {symbol.text}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center text-4xl sm:text-5xl md:text-6xl mb-16 font-bold tracking-tight theme-heading"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">Me</span>
          </motion.h1>

          {/* Intro text and statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mb-20"
          >
            <div className="text-lg md:text-xl leading-relaxed theme-muted mb-8 max-w-3xl text-center">
              I build scalable and modern web applications with a strong focus on backend development, clean architecture, and exceptional user experiences. Passionate about Laravel, PHP, REST APIs, Docker, and modern web technologies.
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mt-4">
              <StatCounter value="3+" label="Projects Completed" />
              <StatCounter value="10+" label="Technologies Mastered" />
              <StatCounter value="6+" label="Experiance (Months)" />
              <StatCounter value="100%" label="Passion" />
            </div>
          </motion.div>

          {/* Skill cards header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-10 text-center theme-heading"
          >
            My Tech <span className="theme-primary">Stack</span>
          </motion.h2>
        </div>
      </div>

      {/* Full-width Tech Stack Container */}
      <div className="w-full px-4 md:px-8 lg:px-12 mt-0">
        <div
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden w-full"
          style={{
            background: "rgba(99,102,241,0.03)",
            border: "1px solid rgba(99,102,241,0.10)",
          }}
        >
          {/* Animated SVG lines with traveling dots behind cards */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Line 1 */}
            <line x1="0" y1="22%" x2="100%" y2="22%" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="6 8" />
            {/* Line 2 */}
            <line x1="0" y1="42%" x2="100%" y2="42%" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="6 8" />
            {/* Line 3 */}
            <line x1="0" y1="62%" x2="100%" y2="62%" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="6 8" />
            {/* Line 4 */}
            <line x1="0" y1="82%" x2="100%" y2="82%" stroke="rgba(139,92,246,0.12)" strokeWidth="1" strokeDasharray="6 8" />

            {/* Traveling dot – Line 1 */}
            <motion.circle
              r="3"
              fill="rgba(99,102,241,0.8)"
              filter="url(#glow)"
              initial={{ cx: "-2%" }}
              animate={{ cx: ["0%", "102%"] }}
              style={{ cy: "22%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0 }}
            />
            <motion.circle
              r="2"
              fill="rgba(99,102,241,0.4)"
              initial={{ cx: "-2%" }}
              animate={{ cx: ["0%", "102%"] }}
              style={{ cy: "22%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.8 }}
            />

            {/* Traveling dot – Line 2 */}
            <motion.circle
              r="3"
              fill="rgba(139,92,246,0.85)"
              filter="url(#glow2)"
              initial={{ cx: "102%" }}
              animate={{ cx: ["100%", "-2%"] }}
              style={{ cy: "42%" }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
            <motion.circle
              r="2"
              fill="rgba(139,92,246,0.4)"
              initial={{ cx: "102%" }}
              animate={{ cx: ["100%", "-2%"] }}
              style={{ cy: "42%" }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2.3 }}
            />

            {/* Traveling dot – Line 3 */}
            <motion.circle
              r="3"
              fill="rgba(99,102,241,0.8)"
              filter="url(#glow)"
              initial={{ cx: "-2%" }}
              animate={{ cx: ["0%", "102%"] }}
              style={{ cy: "62%" }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
            />
            <motion.circle
              r="2"
              fill="rgba(99,102,241,0.35)"
              initial={{ cx: "-2%" }}
              animate={{ cx: ["0%", "102%"] }}
              style={{ cy: "62%" }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 2.8 }}
            />

            {/* Traveling dot – Line 4 */}
            <motion.circle
              r="3"
              fill="rgba(168,85,247,0.85)"
              filter="url(#glow3)"
              initial={{ cx: "102%" }}
              animate={{ cx: ["100%", "-2%"] }}
              style={{ cy: "82%" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 0.2 }}
            />
            <motion.circle
              r="2"
              fill="rgba(168,85,247,0.4)"
              initial={{ cx: "102%" }}
              animate={{ cx: ["100%", "-2%"] }}
              style={{ cy: "82%" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2.5 }}
            />

            {/* SVG filters for glow effect */}
            <defs>
              <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow2" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow3" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Skill cards grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Section Divider - Glowing gradient line */}
      <div className="w-full flex items-center justify-center mt-16 md:mt-24 px-6">
        <div className="h-[2px] w-full max-w-[250px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent dark:via-indigo-400 opacity-30 relative">
          <div className="absolute inset-0 bg-indigo-500 dark:bg-indigo-400 blur-[4px] opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default About;
