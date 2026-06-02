"use client";

import { useState } from "react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ConfirmationDialog } from "@/components/dashboard/ConfirmationDialog";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { Button } from "@/components/ui/button";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { FileUp, TrendingUp, HelpCircle, Layers, CheckCircle2, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { analyses, deleteAnalysis } = useAnalysisStore();
  const [analysisToDelete, setAnalysisToDelete] = useState<string | null>(null);

  // Dynamically calculate metrics from Zustand store
  const totalResumes = analyses.length;
  const avgScore = totalResumes > 0
    ? Math.round(analyses.reduce((sum, item) => sum + item.overallScore, 0) / totalResumes)
    : 0;
  
  const avgAtsScore = totalResumes > 0
    ? Math.round(analyses.reduce((sum, item) => sum + item.atsScore, 0) / totalResumes)
    : 0;

  // Visual status classes for bullet item scores
  const getScoreBadgeClass = (score: number) => {
    if (score >= 85) return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30";
    if (score >= 70) return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/30";
    return "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30";
  };

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">System Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of your candidate profiles and compatibility evaluations.</p>
        </div>
        <Button asChild className="rounded-2xl px-6 py-5 font-bold shadow-md shadow-primary/10">
          <Link href="/dashboard/upload" className="flex items-center gap-2">
            <FileUp className="w-4.5 h-4.5" />
            <span>Upload New Resume</span>
          </Link>
        </Button>
      </div>

      {/* Analytics Score Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard
          score={totalResumes * 8 > 100 ? 100 : totalResumes * 8}
          label="Profile Index"
          description={`${totalResumes} Resumes Analyzed`}
          tooltipText="Total number of resumes uploaded and processed in your sandbox."
          icon={<Layers className="w-5 h-5" />}
        />
        <ScoreCard
          score={avgAtsScore}
          label="Average ATS Index"
          description={`${avgAtsScore}% Match Probability`}
          tooltipText="Average keyword alignment matching standard applicant tracking models."
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <ScoreCard
          score={avgScore}
          label="Average Quality Index"
          description={`${avgScore}% Overall Standard`}
          tooltipText="Composite average score calculating structural, grammar, and alignment metrics."
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Metric progression chart (high-fidelity SVG Area Chart) */}
        <div className="lg:col-span-7 p-6 border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card rounded-3xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Analysis Progress Metrics</h3>
            <p className="text-xs text-slate-500">Historical ATS score evolution trends across uploads</p>
          </div>

          {/* SVG Area chart representation */}
          <div className="h-64 relative w-full pt-4">
            {totalResumes > 0 ? (
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.2" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.2" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.2" />

                {/* Line Path Area */}
                <path
                  d={`M 0 35 L 20 28 L 50 ${40 - (analyses[1]?.atsScore / 2.8 || 22)} L 80 ${40 - (analyses[0]?.atsScore / 2.8 || 32)} L 100 ${40 - (avgAtsScore / 2.8)} L 100 40 L 0 40 Z`}
                  fill="url(#chartGradient)"
                />
                
                {/* Visual line curve */}
                <path
                  d={`M 0 35 Q 10 32 20 28 T 50 ${40 - (analyses[1]?.atsScore / 2.8 || 22)} T 80 ${40 - (analyses[0]?.atsScore / 2.8 || 32)} T 100 ${40 - (avgAtsScore / 2.8)}`}
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="0.8"
                />

                {/* Data points */}
                <circle cx="20" cy="28" r="1.2" fill="#06B6D4" stroke="white" strokeWidth="0.3" />
                <circle cx="50" cy={40 - (analyses[1]?.atsScore / 2.8 || 22)} r="1.2" fill="#6366F1" stroke="white" strokeWidth="0.3" />
                <circle cx="80" cy={40 - (analyses[0]?.atsScore / 2.8 || 32)} r="1.2" fill="#6366F1" stroke="white" strokeWidth="0.3" />
                <circle cx="100" cy={40 - (avgAtsScore / 2.8)} r="1.5" fill="#4F46E5" stroke="white" strokeWidth="0.4" className="animate-pulse" />
              </svg>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-semibold">
                No parsing history available to graph.
              </div>
            )}
            
            {/* Chart axis label lines */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <span>Trial Standard</span>
              <span>Audit 2</span>
              <span>Audit 1</span>
              <span>Active Index</span>
            </div>
          </div>
        </div>

        {/* Recent analyses history list */}
        <div className="lg:col-span-5 p-6 border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Analysis History</h3>
              <p className="text-xs text-slate-500">Historical records of evaluations performed</p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 overflow-y-auto max-h-[260px] pr-1">
              {analyses.length > 0 ? (
                analyses.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="py-3.5 flex justify-between items-center group/item hover:bg-slate-50/20 dark:hover:bg-slate-900/20 rounded-xl px-2 transition-all"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 max-w-[170px] truncate group-hover/item:text-primary transition-colors">
                        {item.fileName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.date} • {item.fileSize}</p>
                    </div>
                    
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${getScoreBadgeClass(item.overallScore)}`}>
                      {item.overallScore}%
                    </span>
                    <Button variant="outline" size="sm" asChild className="h-8 rounded-xl px-3 border-slate-200 dark:border-slate-800">
                      <Link href={`/dashboard/results/${item.id}`}>View</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      onClick={() => setAnalysisToDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>

                ))
              ) : (
                <EmptyState
                  title="No CVs Uploaded"
                  description="You haven't uploaded any CVs yet. Upload your first CV to start getting AI-powered feedback."
                  buttonText="Upload Your First CV"
                  href="/dashboard/upload"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ConfirmationDialog
        isOpen={!!analysisToDelete}
        onClose={() => setAnalysisToDelete(null)}
        onConfirm={() => {
          if (analysisToDelete) {
            deleteAnalysis(analysisToDelete);
            setAnalysisToDelete(null);
          }
        }}
        title="Delete CV Analysis"
        description="Are you sure you want to delete this CV analysis? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}
