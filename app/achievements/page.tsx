"use client";

import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { ACHIEVEMENTS } from "@/data/achievements";
import { BottomNav } from "@/components/BottomNav";
import { Lock, Trophy } from "lucide-react";

export default function AchievementsPage() {
  const { user } = useUser();

  const unlockedCount = user.unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <main className="pb-28 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-orange-400/5 to-transparent" />
        <div className="relative px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-soft">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black">הישגים</h1>
              <p className="text-xs text-ink-700/60">
                <span className="ltr-nums">{unlockedCount}/{totalCount}</span>{" "}
                הישגים נפתחו
              </p>
            </div>
          </div>

          {/* Progress circle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-5 shadow-soft mt-4 flex items-center gap-5"
          >
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#achieveGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 42 * (1 - unlockedCount / totalCount),
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="achieveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-lg font-black text-ink-900 ltr-nums">
                  {Math.round((unlockedCount / totalCount) * 100)}%
                </span>
              </div>
            </div>
            <div>
              <div className="font-bold text-ink-900 mb-1">
                {unlockedCount === 0
                  ? "רק מתחילים!"
                  : unlockedCount === totalCount
                  ? "אלוף/ה! הכל נפתח!"
                  : `עוד ${totalCount - unlockedCount} הישגים לפתוח`}
              </div>
              <div className="text-xs text-ink-700/60">
                המשיכו ללמוד ולהשלים שיעורים כדי לפתוח הישגים חדשים
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Achievements grid */}
      <div className="px-5 mt-4 space-y-3">
        {ACHIEVEMENTS.map((ach, i) => {
          const unlocked = user.unlockedAchievements.includes(ach.id) || ach.check(user);
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-3xl p-4 flex items-center gap-4 overflow-hidden ${
                unlocked
                  ? "bg-white shadow-soft"
                  : "bg-ink-900/[0.03]"
              }`}
            >
              {/* Gradient bar */}
              {unlocked && (
                <div
                  className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${ach.color}`}
                />
              )}

              {/* Icon */}
              <div
                className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                  unlocked
                    ? `bg-gradient-to-br ${ach.color} shadow-soft`
                    : "bg-ink-900/5"
                }`}
              >
                {unlocked ? (
                  <span>{ach.emoji}</span>
                ) : (
                  <Lock size={20} className="text-ink-900/25" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-sm ${
                    unlocked ? "text-ink-900" : "text-ink-900/40"
                  }`}
                >
                  {ach.title}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    unlocked ? "text-ink-700/60" : "text-ink-900/30"
                  }`}
                >
                  {unlocked ? ach.description : "???"}
                </p>
              </div>

              {/* Badge */}
              {unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: i * 0.05 + 0.2 }}
                  className="shrink-0"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Motivational */}
      {unlockedCount < totalCount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-5 mt-6"
        >
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 text-center">
            <span className="text-2xl">💪</span>
            <p className="text-sm text-brand-800 font-medium mt-2">
              כל שיעור שתשלימו מקרב אתכם להישג הבא!
            </p>
          </div>
        </motion.div>
      )}

      <BottomNav />
    </main>
  );
}
