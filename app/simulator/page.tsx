"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { compoundGrowth, formatILS, formatNumber } from "@/lib/finance";
import { useUser } from "@/context/UserContext";
import { BottomNav } from "@/components/BottomNav";
import { Calculator, TrendingUp, Coins, Clock, Percent } from "lucide-react";

const PRESETS = [
  {
    id: "soldier",
    label: "חייל/ת",
    emoji: "🪖",
    initial: 0,
    monthly: 300,
    rate: 7,
    years: 3,
  },
  {
    id: "student",
    label: "סטודנט/ית",
    emoji: "🎓",
    initial: 5000,
    monthly: 500,
    rate: 7,
    years: 5,
  },
  {
    id: "worker",
    label: "שכיר/ה צעיר/ה",
    emoji: "💼",
    initial: 10000,
    monthly: 1000,
    rate: 8,
    years: 20,
  },
  {
    id: "custom",
    label: "מותאם אישית",
    emoji: "✏️",
    initial: 0,
    monthly: 500,
    rate: 7,
    years: 10,
  },
];

export default function SimulatorPage() {
  const router = useRouter();
  const { unlockAchievement, user } = useUser();

  const [initial, setInitial] = useState(0);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Unlock achievement
  useState(() => {
    if (!user.unlockedAchievements.includes("simulator-fan")) {
      unlockAchievement("simulator-fan");
    }
  });

  const data = useMemo(
    () => compoundGrowth(initial, monthly, rate / 100, years),
    [initial, monthly, rate, years]
  );

  const finalData = data[data.length - 1];
  const totalContributed = finalData.contributed;
  const totalInterest = finalData.interest;
  const totalValue = finalData.value;

  const handlePreset = (preset: (typeof PRESETS)[number]) => {
    setActivePreset(preset.id);
    setInitial(preset.initial);
    setMonthly(preset.monthly);
    setRate(preset.rate);
    setYears(preset.years);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-3 border border-ink-900/5 text-sm">
        <div className="font-bold text-ink-900 mb-1">שנה {d.year}</div>
        <div className="text-brand-600 font-semibold">{formatILS(d.value)}</div>
        <div className="text-xs text-ink-700/60 mt-0.5">
          הפקדות: {formatILS(d.contributed)}
        </div>
        <div className="text-xs text-emerald-600 font-medium">
          רווח: {formatILS(d.interest)}
        </div>
      </div>
    );
  };

  return (
    <main className="pb-28 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-indigo-400/5 to-transparent" />
        <div className="relative px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center shadow-soft">
              <Calculator size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black">סימולטור פיננסי</h1>
              <p className="text-xs text-ink-700/60">חשב את הכסף שלך בעתיד</p>
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="px-5 mt-2">
        <div className="text-xs font-bold text-ink-700/60 mb-2">בחר תרחיש:</div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePreset(p)}
              className={`shrink-0 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                activePreset === p.id
                  ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg"
                  : "bg-white shadow-soft text-ink-900"
              }`}
            >
              <span className="ml-1">{p.emoji}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="px-5 mt-5 space-y-5">
        <SliderInput
          icon={<Coins size={16} className="text-brand-500" />}
          label="סכום התחלתי"
          value={initial}
          onChange={(v) => {
            setInitial(v);
            setActivePreset("custom");
          }}
          min={0}
          max={100000}
          step={1000}
          format={(v) => formatILS(v)}
        />
        <SliderInput
          icon={<TrendingUp size={16} className="text-emerald-500" />}
          label="הפקדה חודשית"
          value={monthly}
          onChange={(v) => {
            setMonthly(v);
            setActivePreset("custom");
          }}
          min={0}
          max={10000}
          step={100}
          format={(v) => formatILS(v)}
        />
        <SliderInput
          icon={<Percent size={16} className="text-amber-500" />}
          label="תשואה שנתית"
          value={rate}
          onChange={(v) => {
            setRate(v);
            setActivePreset("custom");
          }}
          min={1}
          max={15}
          step={0.5}
          format={(v) => `${v}%`}
        />
        <SliderInput
          icon={<Clock size={16} className="text-violet-500" />}
          label="תקופה (שנים)"
          value={years}
          onChange={(v) => {
            setYears(v);
            setActivePreset("custom");
          }}
          min={1}
          max={40}
          step={1}
          format={(v) => `${v} שנים`}
        />
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 mt-6"
      >
        <div className="bg-white rounded-3xl p-5 shadow-soft">
          <div className="text-xs font-bold text-ink-700/60 mb-3">תוצאות</div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="text-center">
              <div className="text-[10px] text-ink-700/50 mb-0.5">הפקדות</div>
              <div className="font-bold text-sm ltr-nums text-ink-900">
                {formatILS(totalContributed)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-ink-700/50 mb-0.5">רווח מריבית</div>
              <div className="font-bold text-sm ltr-nums text-emerald-600">
                {formatILS(totalInterest)}
              </div>
            </div>
            <div className="text-center bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-2">
              <div className="text-[10px] text-white/70 mb-0.5">סה״כ</div>
              <div className="font-bold text-sm ltr-nums text-white">
                {formatILS(totalValue)}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-52 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}`}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${formatNumber(v)}`}
                  width={55}
                  orientation="right"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="contributed"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  fill="url(#colorContrib)"
                  name="הפקדות"
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#14b8a6"
                  strokeWidth={2.5}
                  fill="url(#colorValue)"
                  name="שווי"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-5 mt-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-violet-400" />
              הפקדות
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-brand-500" />
              שווי עם ריבית
            </span>
          </div>
        </div>
      </motion.div>

      {/* Fun fact */}
      <div className="px-5 mt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl shrink-0">💡</span>
          <div className="text-xs text-amber-800 leading-relaxed">
            {totalInterest > totalContributed ? (
              <span>
                <strong>וואו!</strong> הריבית דריבית הרוויחה לך יותר ממה שהפקדת
                בעצמך! זה כוח הזמן.
              </span>
            ) : (
              <span>
                <strong>טיפ:</strong> ככל שתגדיל את תקופת ההשקעה, ריבית דריבית
                תעבוד יותר בשבילך. נסה 20+ שנים!
              </span>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

// --- Slider Input Component ---
function SliderInput({
  icon,
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm font-bold text-ink-900">
          {icon}
          {label}
        </div>
        <div className="text-sm font-bold text-brand-600 ltr-nums bg-brand-50 px-2.5 py-1 rounded-xl">
          {format(value)}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-ink-900/5 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-gradient-to-br
            [&::-webkit-slider-thumb]:from-brand-400
            [&::-webkit-slider-thumb]:to-brand-600
            [&::-webkit-slider-thumb]:shadow-glow
            [&::-webkit-slider-thumb]:border-4
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to left, #14b8a6 0%, #14b8a6 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
          }}
        />
      </div>
    </div>
  );
}
