"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Goal = "save" | "invest" | "budget" | "learn";
export type Level = "beginner" | "some" | "confident";

export interface UserState {
  name: string;
  goals: Goal[];
  level: Level;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedLessons: string[];
  unlockedAchievements: string[];
  onboarded: boolean;
}

const DEFAULT_STATE: UserState = {
  name: "",
  goals: [],
  level: "beginner",
  xp: 0,
  streak: 0,
  lastActiveDate: "",
  completedLessons: [],
  unlockedAchievements: [],
  onboarded: false,
};

interface UserContextValue {
  user: UserState;
  setUser: (updater: (prev: UserState) => UserState) => void;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  resetProgress: () => void;
  unlockAchievement: (id: string) => void;
  updateStreak: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

const STORAGE_KEY = "finstart:user";

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(a: string, b: string): number {
  if (!a || !b) return Infinity;
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserState;
        setUserState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch (e) {
      console.warn("Failed to load user state", e);
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn("Failed to save user state", e);
    }
  }, [user, hydrated]);

  const setUser: UserContextValue["setUser"] = (updater) => {
    setUserState((prev) => updater(prev));
  };

  const addXP = (amount: number) => {
    setUser((p) => ({ ...p, xp: p.xp + amount }));
  };

  const updateStreak = () => {
    setUser((p) => {
      const today = todayKey();
      if (p.lastActiveDate === today) return p;
      const diff = daysBetween(p.lastActiveDate, today);
      const newStreak = diff === 1 ? p.streak + 1 : 1;
      return { ...p, streak: newStreak, lastActiveDate: today };
    });
  };

  const completeLesson = (lessonId: string, xpReward: number) => {
    setUser((p) => {
      if (p.completedLessons.includes(lessonId)) return p;
      return {
        ...p,
        xp: p.xp + xpReward,
        completedLessons: [...p.completedLessons, lessonId],
      };
    });
  };

  const unlockAchievement = (id: string) => {
    setUser((p) => {
      if (p.unlockedAchievements.includes(id)) return p;
      return { ...p, unlockedAchievements: [...p.unlockedAchievements, id] };
    });
  };

  const resetProgress = () => {
    setUserState(DEFAULT_STATE);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, addXP, completeLesson, resetProgress, unlockAchievement, updateStreak }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

// Level calculation
export function getLevelInfo(xp: number) {
  // Each level needs 100 * level XP. L1: 0-100, L2: 100-300, L3: 300-600...
  let level = 1;
  let xpForNextLevel = 100;
  let xpAccumulated = 0;
  while (xp >= xpAccumulated + xpForNextLevel) {
    xpAccumulated += xpForNextLevel;
    level++;
    xpForNextLevel = 100 * level;
  }
  const xpInCurrentLevel = xp - xpAccumulated;
  const progress = (xpInCurrentLevel / xpForNextLevel) * 100;
  return { level, xpInCurrentLevel, xpForNextLevel, progress };
}
