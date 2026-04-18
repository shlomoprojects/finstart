"use client";

import { motion } from "framer-motion";
import { getLevelInfo } from "@/context/UserContext";

interface XPBarProps {
  xp: number;
  compact?: boolean;
}

export function XPBar({ xp, compact = false }: XPBarProps) {
  const { level, xpInCurrentLevel, xpForNextLevel, progress } = getLevelInfo(xp);

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold font-display shadow-glow">
              {level}
            </div>
          </div>
          <div>
            <div className="text-xs text-ink-700/60 font-medium">רמה</div>
            <div className="text-sm font-bold">רמה {level}</div>
          </div>
        </div>
        <div className="text-left">
          <div className="text-xs text-ink-700/60 font-medium">XP</div>
          <div className="text-sm font-bold ltr-nums">
            {xpInCurrentLevel} / {xpForNextLevel}
          </div>
        </div>
      </div>

      <div className="h-3 bg-ink-900/5 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full relative overflow-hidden"
        >
          <div className="absolute inset-0 shimmer" />
        </motion.div>
      </div>
    </div>
  );
}
