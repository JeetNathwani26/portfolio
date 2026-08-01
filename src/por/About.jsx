import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const StatCounter = ({ value, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const numMatch = value.match(/\d+/);
  const target = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);

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
  }, [isInView, target, duration]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 rounded-3xl theme-surface-strong theme-border border shadow-lg hover:shadow-xl transition-shadow backdrop-blur-xl group"
    >
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[color:var(--page-primary)] to-[color:var(--page-accent)] mb-2 group-hover:scale-110 transition-transform">
        {count}{suffix}
      </div>
      <div className="text-sm font-semibold theme-muted uppercase tracking-widest text-center">
        {label}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden theme-section-alt">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight theme-heading mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--page-primary)] to-[color:var(--page-accent)]">Me</span>
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center text-center max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg theme-muted leading-relaxed mb-6 max-w-3xl mx-auto">
                I am a passionate software engineer specializing in backend architecture, API design, and scalable web solutions. With a strong foundation in PHP, Laravel, and React, I thrive in building systems that are not only performant but also maintainable and secure.
              </p>
              <p className="text-lg theme-muted leading-relaxed mb-10 max-w-3xl mx-auto">
                My approach to development involves understanding the core business requirements and translating them into robust technical solutions. Whether it's designing a complex database schema, optimizing query performance, or crafting a seamless user interface, I am dedicated to excellence in every line of code.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl"
            >
              <StatCounter value="3+" label="Projects" />
              <StatCounter value="1+" label="Years Experience" />
              <StatCounter value="10+" label="Technologies" />
              <StatCounter value="100%" label="Client Satisfaction" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
