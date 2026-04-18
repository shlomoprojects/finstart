"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, TrendingUp, Trophy, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const TABS = [
  { href: "/dashboard", label: "בית", icon: Home },
  { href: "/simulator", label: "סימולטור", icon: TrendingUp },
  { href: "/achievements", label: "הישגים", icon: Trophy },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-md p-3">
        <nav className="bg-white/85 backdrop-blur-xl border border-ink-900/5 rounded-3xl shadow-soft px-2 py-2 flex items-center justify-around">
          {TABS.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <button
                key={tab.href}
                onClick={() => router.push(tab.href)}
                className="relative flex-1 flex flex-col items-center gap-0.5 py-2 rounded-2xl"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 flex flex-col items-center gap-0.5 ${isActive ? "text-white" : "text-ink-900/60"}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
