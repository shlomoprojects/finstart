"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser, getLevelInfo } from "@/context/UserContext";
import { LESSONS, isLessonUnlocked } from "@/data/lessons";
import { ACHIEVEMENTS } from "@/data/achievements";
import { XPBar } from "@/components/XPBar";
import { StreakFlame } from "@/components/StreakFlame";
import { LessonCard } from "@/components/LessonCard";
import { BottomNav } from "@/components/BottomNav";
import {
  TrendingUp,
  Trophy,
  Sparkles,
  BookOpen,
  ChevronLeft,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, updateStreak, unlockAchievement } = useUser();

  // Redirect if not onboarded
  useEffect(() => {
    if (!user.onboarded && typeof window !== "undefined") {
      const raw = localStorage.getItem("finstart:user");
      if (!raw || !JSON.parse(raw).onboarded) {
        router.push("/onboarding");
      }
    }
  }, [user.onboarded, router]);

  // Update streak on page visit
  useEffect(() => {
    updateStreak();
  }, []);

  // Check achievements
  useEffect(() => {
    ACHIEVEMENTS.forEach((ach) => {
      if (!user.unlockedAchievements.includes(ach.id) && ach.check(user)) {
        unlockAchievement(ach.id);
      }
    });
  }, [user.xp, user.completedLessons.length, user.streak]);

  const { level } = getLevelInfo(user.xp);
  const completedCount = user.completedLessons.length;
  const totalLessons = LESSONS.length;
  const completionPct = Math.round((completedCount / totalLessons) * 100);

  // Greeting based on time
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "בוקר טוב";
    if (h < 17) return "צהריים טובים";
    if (h < 21) return "ערב טוב";
    return "לילה טוב";
  };

  // Next lesson to take
  const nextLesson = LESSONS.find(
    (l) =>
      !user.completedLessons.includes(l.id) &&
      isLessonUnlocked(l, user.completedLessons)
  );

  if (!user.onboarded) return null;

  return (
    <main className="pb-28 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 via-brand-400/5 to-transparent" />
        <div className="relative px-5 pt-6 pb-4">
          {/* Top row */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-ink-700/60 font-medium"
              >
                {getGreeting()} 👋
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="font-display text-2xl font-black text-ink-900"
              >
                {user.name || "חבר/ה"}
              </motion.h1>
            </div>
            <StreakFlame streak={user.streak} />
          </div>

          {/* XP Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-4 shadow-soft"
          >
            <XPBar xp={user.xp} />
          </motion.div>
        </div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-5 mt-3 grid grid-cols-3 gap-2"
      >
        <div className="bg-white rounded-2xl p-3 text-center shadow-soft">
          <div className="text-2xl mb-1">📚</div>
          <div className="font-bold text-lg ltr-nums">{completedCount}/{totalLessons}</div>
          <div className="text-[10px] text-ink-700/60 font-medium">שיעורים</div>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-soft">
          <div className="text-2xl mb-1">⭐</div>
          <div className="font-bold text-lg ltr-nums">{user.xp}</div>
          <div className="text-[10px] text-ink-700/60 font-medium">XP</div>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-soft">
          <div className="text-2xl mb-1">🏆</div>
          <div className="font-bold text-lg ltr-nums">{user.unlockedAchievements.length}</div>
          <div className="text-[10px] text-ink-700/60 font-medium">הישגים</div>
        </div>
      </motion.div>

      {/* Continue learning CTA */}
      {nextLesson && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-5 mt-5"
        >
          <button
            onClick={() => router.push(`/lesson/${nextLesson.id}`)}
            className="w-full relative overflow-hidden rounded-3xl p-5 text-right bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-accent-400" />
                <span className="text-xs font-bold text-white/80">
                  {completedCount === 0 ? "התחל ללמוד" : "המשך ללמוד"}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold mb-1">
                {nextLesson.title}
              </h3>
              <p className="text-sm text-white/70">{nextLesson.subtitle}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-white/60 flex items-center gap-1">
                  <BookOpen size={12} />
                  {nextLesson.duration} דק׳ · +{nextLesson.xpReward} XP
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChevronLeft size={18} className="text-white" />
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      )}

      {/* Completion celebration */}
      {completedCount === totalLessons && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-5 mt-5"
        >
          <div className="relative overflow-hidden rounded-3xl p-5 text-center bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
            <span className="text-4xl">🎓</span>
            <h3 className="font-display text-xl font-bold mt-2">
              מזל טוב! סיימת הכל!
            </h3>
            <p className="text-sm text-white/80 mt-1">
              השלמת את כל השיעורים ב-FinStart. אתה מוכן לעולם הפיננסי.
            </p>
          </div>
        </motion.div>
      )}

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="px-5 mt-5 grid grid-cols-2 gap-3"
      >
        <button
          onClick={() => router.push("/simulator")}
          className="bg-white rounded-2xl p-4 text-right shadow-soft active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="font-bold text-sm">סימולטור</div>
          <div className="text-[11px] text-ink-700/60">חשב ריבית דריבית</div>
        </button>
        <button
          onClick={() => router.push("/achievements")}
          className="bg-white rounded-2xl p-4 text-right shadow-soft active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3">
            <Trophy size={20} className="text-white" />
          </div>
          <div className="font-bold text-sm">הישגים</div>
          <div className="text-[11px] text-ink-700/60">
            {user.unlockedAchievements.length}/{ACHIEVEMENTS.length} נפתחו
          </div>
        </button>
      </motion.div>

      {/* Progress bar */}
      <div className="px-5 mt-5 mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold">מסלול הלמידה</span>
          <span className="text-xs text-ink-700/60 ltr-nums">{completionPct}% הושלם</span>
        </div>
        <div className="h-2 bg-ink-900/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
          />
        </div>
      </div>

      {/* Lessons list */}
      <div className="px-5 space-y-3 mt-2">
        {LESSONS.map((lesson, i) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            unlocked={isLessonUnlocked(lesson, user.completedLessons)}
            completed={user.completedLessons.includes(lesson.id)}
            index={i}
          />
        ))}
      </div>

      {/* Notification mock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="px-5 mt-6"
      >
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-lg">
            🔔
          </div>
          <div>
            <div className="font-bold text-sm text-brand-800">תזכורת יומית</div>
            <div className="text-xs text-brand-700/70 mt-0.5">
              {completedCount === 0
                ? "עוד לא התחלת! שיעור ראשון לוקח רק 3 דקות."
                : user.streak >= 3
                ? `${user.streak} ימים ברצף – אל תשבור את הרצף!`
                : "בוא תלמד היום ותשמור על הרצף 🔥"}
            </div>
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </main>
  );
}
