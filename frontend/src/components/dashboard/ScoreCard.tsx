"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

interface ScoreCardProps {
  score: number;
  label: string;
  description: string;
  tooltipText?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ScoreCard({
  score,
  label,
  description,
  tooltipText,
  icon,
  className
}: ScoreCardProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine score colors based on value
  const getScoreColorClass = (val: number) => {
    if (val >= 85) return "stroke-emerald-500 text-emerald-500 dark:stroke-emerald-400 dark:text-emerald-400";
    if (val >= 70) return "stroke-indigo-500 text-indigo-500 dark:stroke-indigo-400 dark:text-indigo-400";
    if (val >= 50) return "stroke-amber-500 text-amber-500 dark:stroke-amber-400 dark:text-amber-400";
    return "stroke-rose-500 text-rose-500 dark:stroke-rose-400 dark:text-rose-400";
  };

  const getScoreBgClass = (val: number) => {
    if (val >= 85) return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300";
    if (val >= 70) return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-300";
    if (val >= 50) return "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-300";
    return "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-300";
  };

  const scoreLevel = (val: number) => {
    if (val >= 85) return "Excellent";
    if (val >= 70) return "Strong";
    if (val >= 50) return "Needs Work";
    return "Critical";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card flex items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] group relative overflow-hidden",
        className
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-slate-400 group-hover:text-primary transition-colors">{icon}</div>}
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</span>
          
          {tooltipText && (
            <div className="relative group/tooltip">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 p-2 rounded-lg bg-slate-900 text-white text-[10px] leading-normal font-normal opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none shadow-lg z-20">
                {tooltipText}
              </div>
            </div>
          )}
        </div>
        
        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">{description}</h4>
        
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mt-2", getScoreBgClass(score))}>
          {scoreLevel(score)}
        </span>
      </div>

      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="5"
            fill="transparent"
            className="text-slate-100 dark:text-slate-800"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="5.5"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            strokeLinecap="round"
            className={cn("transition-all duration-300", getScoreColorClass(score))}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-xl font-extrabold tracking-tight", getScoreColorClass(score).split(" ")[1])}>
            {score}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-semibold">Score</span>
        </div>
      </div>
    </motion.div>
  );
}
