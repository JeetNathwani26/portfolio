import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center theme-section-alt opacity-90">
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold theme-primary tracking-wider">
            {"<JN />"}
          </h1>
        </motion.div>

        {/* Animated rings */}
        <motion.div
          className="absolute border-2 rounded-full w-40 h-40"
          style={{ borderColor: "color-mix(in srgb, var(--page-primary) 30%, transparent)" }}
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute border rounded-full w-40 h-40"
          style={{ borderColor: "color-mix(in srgb, var(--page-primary) 20%, transparent)" }}
          animate={{ scale: [1, 2], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export default Loader;
