"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResult } from "@/store/useAnalysisStore";
import { CheckCircle2, AlertOctagon, Sparkles, Briefcase, Key, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightPanelProps {
  result: AnalysisResult;
}

export function InsightPanel({ result }: InsightPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "career">("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview & Impact", icon: Sparkles },
    { id: "skills" as const, label: "Skills & ATS Match", icon: Key },
    { id: "career" as const, label: "Career & Roles", icon: Compass },
  ];

  const getImpactColor = (impact: "High" | "Medium" | "Low") => {
    if (impact === "High") return "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30";
    if (impact === "Medium") return "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30";
    return "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30";
  };

  return (
    <div className="w-full space-y-6">
      {/* Dynamic Tab headers */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 p-1 bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl w-full md:w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2.5 px-5 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer",
                isActive
                  ? "text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary hidden"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[350px]">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Strengths & Weaknesses */}
              <div className="space-y-6">
                <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3>Key Strengths</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.strengths.map((strength, index) => (
                      <li key={index} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-rose-500 font-bold">
                    <AlertOctagon className="w-5 h-5" />
                    <h3>Areas for Improvement</h3>
                  </div>
                  <ul className="space-y-3">
                    {result.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">AI Recalibration Suggestions</h3>
                  <p className="text-sm text-slate-500">Step-by-step guides to optimize candidate index profiles</p>
                </div>

                <div className="space-y-4">
                  {result.suggestions.map((sug, index) => (
                    <div key={index} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col gap-2 hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{sug.category}</span>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", getImpactColor(sug.impact))}>
                          {sug.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                        {sug.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* ATS Keyword Checklist */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">ATS Keyword Analysis</h3>
                  <p className="text-sm text-slate-500">Matched and missing keyword parser statistics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Found */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Keywords Found ({result.keywordsFound.length})</span>
                    <div className="flex flex-wrap gap-2">
                      {result.keywordsFound.map((kw, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Keywords Missing ({result.keywordsMissing.length})</span>
                    <div className="flex flex-wrap gap-2">
                      {result.keywordsMissing.map((kw, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Technical Skills Match */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Skills Alignment Matrix</h3>
                  <p className="text-sm text-slate-500">Individual skill presence and level detection</p>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-y-auto max-h-[350px] pr-2">
                  {result.skillsList.map((skill, index) => (
                    <div key={index} className="py-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          skill.level === "Expert" ? "bg-purple-50 text-purple-700 dark:bg-purple-950/25 dark:text-purple-300" :
                          skill.level === "Intermediate" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/25 dark:text-indigo-300" :
                          "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        )}>
                          {skill.level}
                        </span>
                        <span className={cn(
                          "text-[10px] font-bold px-2.5 py-0.5 rounded-full",
                          skill.match
                            ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500"
                        )}>
                          {skill.match ? "Matched" : "Absent"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "career" && (
            <motion.div
              key="career"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Recommended roles cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.recommendedRoles.map((rec, index) => (
                  <div key={index} className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-primary rounded-2xl">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                          {rec.matchPercentage}% <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase">Match</span>
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">{rec.role}</h4>
                        <p className="text-sm text-slate-500 font-medium">{rec.salary}</p>
                      </div>

                      <div className="space-y-2 mt-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Match Rationale</span>
                        <ul className="space-y-1">
                          {rec.reasons.map((reason, ri) => (
                            <li key={ri} className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex gap-1.5">
                              <span className="text-primary mt-1">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
