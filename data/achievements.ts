import type { UserState } from "@/context/UserContext";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  check: (user: UserState) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    title: "הצעד הראשון",
    description: "השלמת את השיעור הראשון שלך",
    emoji: "👶",
    color: "from-teal-400 to-teal-600",
    check: (u) => u.completedLessons.length >= 1,
  },
  {
    id: "streak-3",
    title: "3 ימים ברצף",
    description: "למדת 3 ימים ברצף – התחלת ליצור הרגל!",
    emoji: "🔥",
    color: "from-orange-400 to-red-500",
    check: (u) => u.streak >= 3,
  },
  {
    id: "streak-7",
    title: "שבוע מלא",
    description: "7 ימים של למידה רצופה – אלוף!",
    emoji: "⚡",
    color: "from-amber-400 to-orange-600",
    check: (u) => u.streak >= 7,
  },
  {
    id: "xp-100",
    title: "100 XP",
    description: "הגעת ל-100 נקודות ניסיון",
    emoji: "⭐",
    color: "from-yellow-400 to-amber-500",
    check: (u) => u.xp >= 100,
  },
  {
    id: "xp-500",
    title: "500 XP",
    description: "כבר משקיע רציני!",
    emoji: "💎",
    color: "from-cyan-400 to-blue-600",
    check: (u) => u.xp >= 500,
  },
  {
    id: "budget-master",
    title: "מומחה תקציב",
    description: "השלמת את מסלול התקציב",
    emoji: "💰",
    color: "from-emerald-400 to-green-600",
    check: (u) => u.completedLessons.includes("budget-101") && u.completedLessons.includes("saving-basics"),
  },
  {
    id: "compound-pro",
    title: "אלוף הריבית דריבית",
    description: "הבנת את הפלא השמיני",
    emoji: "📈",
    color: "from-violet-400 to-purple-600",
    check: (u) => u.completedLessons.includes("compound-interest"),
  },
  {
    id: "all-lessons",
    title: "בוגר FinStart",
    description: "השלמת את כל השיעורים",
    emoji: "🎓",
    color: "from-indigo-400 to-purple-700",
    check: (u) => u.completedLessons.length >= 6,
  },
  {
    id: "simulator-fan",
    title: "סימולטור-נאוט",
    description: "השתמשת בסימולטור הפיננסי",
    emoji: "🚀",
    color: "from-pink-400 to-rose-600",
    check: (u) => u.unlockedAchievements.includes("simulator-fan"),
  },
];
