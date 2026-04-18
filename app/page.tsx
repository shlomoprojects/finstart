"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { Sparkles } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user.onboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [router, user.onboarded]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Animated background blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 -right-20 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [45, 0, 45],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 -left-20 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl"
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative mb-6"
      >
        <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 shadow-glow flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 rotate-12" />
          <span className="text-5xl relative z-10">💰</span>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="absolute -top-2 -left-2 bg-accent-500 rounded-full p-2 shadow-lg"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>

      {/* Brand name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="font-display text-5xl font-black text-ink-900 tracking-tight"
      >
        Fin<span className="text-gradient">Start</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-3 text-ink-700/70 text-center max-w-xs text-balance"
      >
        הדרך החכמה והמהנה ללמוד על כסף.
        <br />
        <span className="text-brand-600 font-bold">בלי שיעמום.</span>
      </motion.p>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            className="w-2 h-2 rounded-full bg-brand-500"
          />
        ))}
      </div>
    </main>
  );
}
