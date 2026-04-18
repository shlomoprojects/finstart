"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { getLessonById, isLessonUnlocked, LESSONS } from "@/data/lessons";
import type { LessonSlide, QuizOption } from "@/data/lessons";
import { ArrowLeft, X, CheckCircle2, XCircle, Sparkles, ChevronLeft } from "lucide-react";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user, completeLesson, updateStreak } = useUser();

  const lessonId = params.id as string;
  const lesson = getLessonById(lessonId);

  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    if (lesson && !isLessonUnlocked(lesson, user.completedLessons)) {
      router.push("/dashboard");
    }
  }, [lesson, user.completedLessons, router]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5">
        <div className="text-center">
          <div className="text-5xl mb-4">🤷</div>
          <h2 className="font-display text-xl font-bold mb-2">שיעור לא נמצא</h2>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-brand-600 font-bold text-sm"
          >
            חזרה לדשבורד
          </button>
        </div>
      </div>
    );
  }

  const slides = lesson.slides;
  const totalSlides = slides.length;
  const currentSlide = slides[slideIdx];
  const progress = ((slideIdx + 1) / totalSlides) * 100;
  const isLastSlide = slideIdx === totalSlides - 1;

  const handleNext = () => {
    if (currentSlide.type === "quiz" && !answered) return;

    if (isLastSlide) {
      // Complete lesson
      completeLesson(lesson.id, lesson.xpReward);
      updateStreak();
      setShowCompletion(true);
    } else {
      setSlideIdx(slideIdx + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handleSelectAnswer = (option: QuizOption) => {
    if (answered) return;
    setSelectedAnswer(option.id);
    setAnswered(true);
  };

  // Completion screen
  if (showCompletion) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-7xl mb-6"
          >
            🎉
          </motion.div>
          <h1 className="font-display text-3xl font-black mb-2">כל הכבוד!</h1>
          <p className="text-ink-700/70 mb-2">
            סיימת את השיעור ״{lesson.title}״
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-3xl p-5 mt-6 mb-8 inline-flex items-center gap-3"
          >
            <Sparkles size={24} className="text-accent-400" />
            <div>
              <div className="text-xs font-medium text-white/70">הרווחת</div>
              <div className="font-display text-2xl font-bold ltr-nums">
                +{lesson.xpReward} XP
              </div>
            </div>
          </motion.div>

          <div className="space-y-3 w-full max-w-xs mx-auto">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/dashboard")}
              className="w-full py-4 bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-2xl font-bold text-lg shadow-glow"
            >
              המשך למסלול
            </motion.button>

            {/* Next lesson shortcut */}
            {(() => {
              const next = LESSONS.find((l) => l.order === lesson.order + 1);
              if (next) {
                return (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSlideIdx(0);
                      setSelectedAnswer(null);
                      setAnswered(false);
                      setShowCompletion(false);
                      router.push(`/lesson/${next.id}`);
                    }}
                    className="w-full py-4 bg-white text-brand-600 rounded-2xl font-bold text-lg shadow-soft border border-brand-200"
                  >
                    שיעור הבא: {next.title} ←
                  </motion.button>
                );
              }
              return null;
            })()}
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center"
          >
            <X size={18} className="text-ink-900/60" />
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-ink-900/50">
            <span>{lesson.emoji}</span>
            <span>{lesson.title}</span>
          </div>
          <div className="text-xs font-bold text-ink-700/60 ltr-nums">
            {slideIdx + 1}/{totalSlides}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-ink-900/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${lesson.color}`}
          />
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 px-5 flex flex-col justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {/* Intro slide */}
            {currentSlide.type === "intro" && (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.15 }}
                  className="text-6xl mb-6"
                >
                  {currentSlide.emoji}
                </motion.div>
                <h2 className="font-display text-3xl font-black text-ink-900 mb-4 leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-ink-700/80 text-lg leading-relaxed text-balance">
                  {currentSlide.body}
                </p>
              </div>
            )}

            {/* Concept slide */}
            {currentSlide.type === "concept" && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${lesson.color} flex items-center justify-center text-2xl shadow-soft`}>
                    {currentSlide.emoji}
                  </div>
                  <h2 className="font-display text-2xl font-black text-ink-900 flex-1">
                    {currentSlide.title}
                  </h2>
                </div>
                <div className="bg-white rounded-3xl p-5 shadow-soft">
                  {currentSlide.body?.split("\n").map((line, i) => (
                    <p
                      key={i}
                      className={`text-ink-700/90 leading-relaxed ${
                        line.startsWith("•") ? "mr-2 mb-1 font-medium" : "mb-3"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Example slide */}
            {currentSlide.type === "example" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">{currentSlide.emoji}</span>
                  <h2 className="font-display text-2xl font-black text-ink-900">
                    {currentSlide.title}
                  </h2>
                </div>
                <div className="relative bg-gradient-to-br from-brand-50 to-emerald-50 rounded-3xl p-5 border border-brand-200">
                  <div className="absolute top-3 left-3 text-[10px] font-bold text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">
                    דוגמה
                  </div>
                  {currentSlide.example?.split("\n").map((line, i) => (
                    <p
                      key={i}
                      className={`leading-relaxed ${
                        line.trim() === "" ? "h-3" : "text-ink-800 mb-1"
                      } ${line.startsWith("•") ? "mr-2 font-medium" : ""}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz slide */}
            {currentSlide.type === "quiz" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-lg shadow-soft">
                    ❓
                  </div>
                  <span className="text-xs font-bold text-accent-600 bg-accent-400/20 px-2 py-1 rounded-full">
                    שאלה
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-ink-900 mb-5 leading-snug">
                  {currentSlide.question}
                </h2>
                <div className="space-y-3">
                  {currentSlide.options?.map((option, i) => {
                    const isSelected = selectedAnswer === option.id;
                    const isCorrect = option.correct;
                    const showResult = answered;

                    let style = "bg-white shadow-soft border-2 border-transparent";
                    if (showResult && isSelected && isCorrect) {
                      style = "bg-emerald-50 border-2 border-emerald-400 shadow-emerald-100";
                    } else if (showResult && isSelected && !isCorrect) {
                      style = "bg-red-50 border-2 border-red-400 shadow-red-100";
                    } else if (showResult && isCorrect) {
                      style = "bg-emerald-50 border-2 border-emerald-300";
                    }

                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        whileTap={!answered ? { scale: 0.98 } : {}}
                        onClick={() => handleSelectAnswer(option)}
                        disabled={answered}
                        className={`quiz-option w-full p-4 rounded-2xl text-right flex items-center gap-3 ${style}`}
                      >
                        <div
                          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            showResult && isCorrect
                              ? "bg-emerald-500 text-white"
                              : showResult && isSelected && !isCorrect
                              ? "bg-red-500 text-white"
                              : "bg-ink-900/5 text-ink-900/60"
                          }`}
                        >
                          {showResult && isCorrect ? (
                            <CheckCircle2 size={18} />
                          ) : showResult && isSelected && !isCorrect ? (
                            <XCircle size={18} />
                          ) : (
                            String.fromCharCode(1488 + i)
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{option.text}</div>
                          {showResult && isSelected && option.explanation && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="text-xs mt-1 text-ink-700/70"
                            >
                              {option.explanation}
                            </motion.p>
                          )}
                          {showResult && isCorrect && !isSelected && option.explanation && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="text-xs mt-1 text-emerald-700/70"
                            >
                              {option.explanation}
                            </motion.p>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-8 pt-2">
        {currentSlide.type === "quiz" && !answered ? (
          <div className="text-center text-sm text-ink-700/50 py-4">
            בחר תשובה כדי להמשיך
          </div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-glow bg-gradient-to-br ${lesson.color} text-white`}
          >
            {isLastSlide ? "סיים שיעור 🎉" : "המשך"}
          </motion.button>
        )}
      </div>
    </main>
  );
}
