"use client";

import { motion } from "framer-motion";

interface StreakFlameProps {
  streak: number;
}

export function StreakFlame({ streak }: StreakFlameProps) {
  const isActive = streak > 0;
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-2xl ${
        isActive
          ? "bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg shadow-orange-500/30"
          : "bg-ink-900/5 text-ink-700/50"
      }`}
    >
      <motion.span
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-lg"
      >
        🔥
      </motion.span>
      <div>
        <div className="text-[10px] font-semibold leading-none opacity-90">רצף</div>
        <div className="text-sm font-bold ltr-nums leading-none mt-0.5">{streak}</div>
      </div>
    </motion.div>
  );
}
