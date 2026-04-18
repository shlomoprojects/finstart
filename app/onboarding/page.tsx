"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, Goal, Level } from "@/context/UserContext";
import { ArrowLeft, Check } from "lucide-react";

const GOALS: Array<{ id: Goal; label: string; emoji: string; description: string }> = [
  { id: "save", label: "לחסוך כסף", emoji: "🏦", description: "לבנות קרן ביטחון" },
  { id: "invest", label: "להתחיל להשקיע", emoji: "📈", description: "לגרום לכסף לעבוד" },
  { id: "budget", label: "לנהל תקציב", emoji: "📊", description: "לדעת לאן הולך הכסף" },
  { id: "learn", label: "רק ללמוד", emoji: "🎓", description: "להבין את עולם הכסף" },
];

const LEVELS: Array<{ id: Level; label: string; emoji: string; description: string }> = [
  { id: "beginner", label: "מתחיל לגמרי", emoji: "🌱", description: "אין לי שום ידע פיננסי" },
  { id: "some", label: "קצת ידע", emoji: "🌿", description: "שמעתי על זה פה ושם" },
  { id: "confident", label: "יש לי רקע", emoji: "🌳", description: "רוצה להעמיק" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setUser, updateStreak } = useUser();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [level, setLevel] = useState<Level | null>(null);

  const TOTAL_STEPS = 4;

  const canContinue = () => {
    if (step === 0) return true;
    if (step === 1) return name.trim().length >= 2;
    if (step === 2) return goals.length > 0;
    if (step === 3) return level !== null;
    return false;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      // Save and go to dashboard
      setUser((prev) => ({
        ...prev,
        name: name.trim(),
        goals,
        level: level || "beginner",
        onboarded: true,
      }));
      updateStreak();
      router.push("/dashboard");
    }
  };

  const toggleGoal = (goal: Goal) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <main className="min-h-screen flex flex-col pb-8">
      {/* Progress Header */}
      <div className="pt-4 px-5 pb-2">
        <div className="flex items-center gap-2 mb-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          )}
          <div className="flex-1 flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= step ? "bg-gradient-to-r from-brand-400 to-brand-600" : "bg-ink-900/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 flex flex-col">
        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-7xl mb-6"
              >
                👋
              </motion.div>
              <h1 className="font-display text-4xl font-black mb-3 leading-tight">
                ברוכים הבאים
                <br />
                ל-<span className="text-gradient">FinStart</span>
              </h1>
              <p className="text-ink-700/70 text-lg text-balance">
                נעזור לך להבין את עולם הכסף בצורה פשוטה, קצרה וממכרת.
                <br />
                <span className="font-bold text-ink-900">בלי מילים מסובכות.</span>
              </p>
            </motion.div>
          )}

          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="text-5xl mb-4">🙋</div>
              <h1 className="font-display text-3xl font-black mb-2">איך קוראים לך?</h1>
              <p className="text-ink-700/70 mb-8">נתאים לך את החוויה</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="השם שלך..."
                autoFocus
                className="w-full px-5 py-4 bg-white border-2 border-ink-900/10 focus:border-brand-500 rounded-2xl text-lg font-semibold outline-none transition-colors shadow-soft"
              />
            </motion.div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-5xl mb-4 mt-4">🎯</div>
              <h1 className="font-display text-3xl font-black mb-2">מה המטרות שלך?</h1>
              <p className="text-ink-700/70 mb-6">אפשר לבחור כמה שרוצים</p>
              <div className="space-y-3">
                {GOALS.map((goal, i) => {
                  const selected = goals.includes(goal.id);
                  return (
                    <motion.button
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full p-4 rounded-2xl flex items-center gap-4 text-right transition-all ${
                        selected
                          ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-glow"
                          : "bg-white shadow-soft"
                      }`}
                    >
                      <div className={`text-3xl shrink-0 ${selected ? "" : ""}`}>{goal.emoji}</div>
                      <div className="flex-1 text-right">
                        <div className={`font-bold text-base ${selected ? "text-white" : "text-ink-900"}`}>
                          {goal.label}
                        </div>
                        <div className={`text-xs ${selected ? "text-white/80" : "text-ink-700/60"}`}>
                          {goal.description}
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selected ? "bg-white border-white" : "border-ink-900/20"
                        }`}
                      >
                        {selected && <Check className="w-4 h-4 text-brand-600" strokeWidth={3} />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Experience Level */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-5xl mb-4 mt-4">📚</div>
              <h1 className="font-display text-3xl font-black mb-2">מה הרמה שלך?</h1>
              <p className="text-ink-700/70 mb-6">אין תשובה נכונה או שגויה</p>
              <div className="space-y-3">
                {LEVELS.map((lv, i) => {
                  const selected = level === lv.id;
                  return (
                    <motion.button
                      key={lv.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLevel(lv.id)}
                      className={`w-full p-4 rounded-2xl flex items-center gap-4 text-right transition-all ${
                        selected
                          ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-glow"
                          : "bg-white shadow-soft"
                      }`}
                    >
                      <div className="text-3xl shrink-0">{lv.emoji}</div>
                      <div className="flex-1 text-right">
                        <div className={`font-bold text-base ${selected ? "text-white" : "text-ink-900"}`}>
                          {lv.label}
                        </div>
                        <div className={`text-xs ${selected ? "text-white/80" : "text-ink-700/60"}`}>
                          {lv.description}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="px-5 pt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!canContinue()}
          onClick={handleNext}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            canContinue()
              ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-glow"
              : "bg-ink-900/10 text-ink-900/40"
          }`}
        >
          {step === 0 && "בואו נתחיל"}
          {step === 1 && "המשך"}
          {step === 2 && "המשך"}
          {step === 3 && "יאללה, מתחילים! 🚀"}
        </motion.button>
      </div>
    </main>
  );
}
