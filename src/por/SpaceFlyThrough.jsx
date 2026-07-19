import { motion } from "framer-motion";

const SpaceFlyThrough = ({ isActive }) => {
  if (!isActive) return null;

  // Generate random stars for the warp speed effect
  const stars = Array.from({ length: 45 }).map((_, idx) => {
    // Generate stars radiating outwards from the center
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 250;
    const targetX = Math.cos(angle) * distance * 4;
    const targetY = Math.sin(angle) * distance * 4;
    
    return {
      id: idx,
      targetX,
      targetY,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 1.5,
      duration: 1.2 + Math.random() * 1.2,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[55] bg-black/15 backdrop-blur-[1px]">
      {/* Deep cinematic vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />

      {/* Grid Scanline overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
        }}
      />
      
      {/* Stars Starfield (radial animation) */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white dark:bg-indigo-200 shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          style={{
            left: "50%",
            top: "50%",
            width: star.size,
            height: star.size,
            marginLeft: -star.size / 2,
            marginTop: -star.size / 2,
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: [0, star.targetX],
            y: [0, star.targetY],
            scale: [0, 2.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Floating Holographic Info Badge 1 (flies past at around 1.0 - 2.5s, About section) */}
      <motion.div
        initial={{ opacity: 0, x: -200, y: 150, rotateY: 35, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0.9, 0.9, 0],
          x: [-200, 100, 350],
          y: [150, 0, -150],
          scale: [0.5, 1.2, 0.5]
        }}
        transition={{ duration: 2.0, delay: 0.7, ease: "easeInOut" }}
        className="absolute left-1/4 top-1/3 p-4 theme-surface border border-[color:var(--page-primary)]/40 rounded-xl backdrop-blur-lg text-slate-800 dark:text-slate-100 shadow-[0_0_20px_rgba(79,70,229,0.2)]"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full theme-primary-bg animate-ping" />
          <p className="font-mono text-xs text-[color:var(--page-primary)] font-bold tracking-wider">SYSTEM STATUS</p>
        </div>
        <p className="font-semibold text-sm">Traversing About Me Module...</p>
        <div className="mt-2 w-32 h-1 theme-surface-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, delay: 0.7 }}
            className="h-full theme-primary-bg"
          />
        </div>
      </motion.div>

      {/* Floating Holographic Info Badge 2 (flies past at around 2.2 - 3.7s, Project section approaching) */}
      <motion.div
        initial={{ opacity: 0, x: 250, y: 200, rotateY: -35, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0.9, 0.9, 0],
          x: [250, -50, -300],
          y: [200, 50, -100],
          scale: [0.5, 1.2, 0.5]
        }}
        transition={{ duration: 2.0, delay: 2.0, ease: "easeInOut" }}
        className="absolute right-1/4 top-1/2 p-4 theme-surface border border-[color:var(--page-accent)]/40 rounded-xl backdrop-blur-lg text-slate-800 dark:text-slate-100 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[color:var(--page-accent)] animate-ping" />
          <p className="font-mono text-xs text-[color:var(--page-accent)] font-bold tracking-wider">PROJECT DEPLOY</p>
        </div>
        <p className="font-semibold text-sm">Locking Projects Coordinates...</p>
        <div className="mt-2 w-32 h-1 theme-surface-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, delay: 2.0 }}
            className="h-full bg-[color:var(--page-accent)]"
          />
        </div>
      </motion.div>

      {/* Futuristic Sci-fi HUD rings and lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 border border-dashed border-white rounded-full absolute"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-56 h-56 border border-white/40 rounded-full absolute"
        />
        <div className="absolute w-48 h-0.5 bg-white/30" />
        <div className="absolute h-48 w-0.5 bg-white/30" />
        
        {/* Animated target box in center */}
        <motion.div 
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 border border-white flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </div>

      {/* Speed lines on left and right borders */}
      <div className="absolute top-0 bottom-0 left-4 w-12 flex flex-col justify-around opacity-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className="h-16 w-0.5 bg-white rounded-full"
            animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: Math.random() }}
          />
        ))}
      </div>
      <div className="absolute top-0 bottom-0 right-4 w-12 flex flex-col justify-around opacity-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className="h-16 w-0.5 bg-white rounded-full"
            animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: Math.random() }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpaceFlyThrough;
