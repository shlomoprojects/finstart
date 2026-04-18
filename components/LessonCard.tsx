"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle2, PlayCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Lesson } from "@/data/lessons";

interface LessonCardProps {
  lesson: Lesson;
  unlocked: boolean;
  completed: boolean;
  index: number;
}

export function LessonCard({ lesson, unlocked, completed, index }: LessonCardProps) {
  const router = useRouter();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileTap={unlocked ? { scale: 0.98 } : {}}
      disabled={!unlocked}
      onClick={() => unlocked && router.push(`/lesson/${lesson.id}`)}
      className={`relative w-full text-right rounded-3xl p-4 overflow-hidden transition-all ${
        unlocked
          ? "bg-white shadow-soft hover:shadow-lg active:shadow-sm cursor-pointer"
          : "bg-ink-900/5 cursor-not-allowed"
      }`}
    >
      {/* Gradient accent strip */}
      {unlocked && (
        <div
          className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${lesson.color}`}
        />
      )}

      <div className="flex items-center gap-3">
        {/* Emoji / Status */}
        <div
          className={`relative shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
            unlocked
              ? `bg-gradient-to-br ${lesson.color} shadow-soft`
              : "bg-ink-900/5"
          }`}
        >
          {completed ? (
            <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.5} />
          ) : unlocked ? (
            <span>{lesson.emoji}</span>
          ) : (
            <Lock className="w-5 h-5 text-ink-900/30" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              unlocked ? "bg-brand-100 text-brand-700" : "bg-ink-900/5 text-ink-900/40"
            }`}>
              שיעור {lesson.order}
            </span>
            {completed && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                הושלם ✓
              </span>
            )}
          </div>
          <h3 className={`font-bold text-base leading-tight truncate ${unlocked ? "text-ink-900" : "text-ink-900/40"}`}>
            {lesson.title}
          </h3>
          <p className={`text-xs mt-0.5 truncate ${unlocked ? "text-ink-900/60" : "text-ink-900/30"}`}>
            {lesson.subtitle}
          </p>
          <div className="flex items-center gap-3 mt-2 text-[11px]">
            <span className={`flex items-center gap-1 ${unlocked ? "text-ink-900/50" : "text-ink-900/30"}`}>
              <Clock size={11} />
              {lesson.duration} דק׳
            </span>
            <span className={`font-bold ${unlocked ? "text-brand-600" : "text-ink-900/30"}`}>
              +{lesson.xpReward} XP
            </span>
          </div>
        </div>

        {/* CTA icon */}
        {unlocked && !completed && (
          <div className="shrink-0">
            <PlayCircle className="w-6 h-6 text-ink-900/20" />
          </div>
        )}
      </div>
    </motion.button>
  );
}
