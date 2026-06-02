"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
// import { InsightPanel } from "@/components/dashboard/InsightPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, FileText, CheckCircle2, AlertTriangle, PenTool, Layout } from "lucide-react";
import Link from "next/link";
import { useToastStore } from "@/store/useToastStore";

const InsightPanel = dynamic(() => import("@/components/dashboard/InsightPanel").then((mod) => mod.InsightPanel), {
  ssr: false,
  loading: () => <div className="p-8 border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card rounded-3xl h-64 flex items-center justify-center">Loading insights...</div>,
});

export default function AnalysisResultsPage() {
  const params = useParams();
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);
  const { activeAnalysis, setActiveAnalysis } = useAnalysisStore();

  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      setActiveAnalysis(id);
    }
  }, [id, setActiveAnalysis]);

  if (!activeAnalysis) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 space-y-6 select-none">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center border border-rose-100 dark:border-rose-900/30">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Analysis Report Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The requested evaluation log does not exist or has been deleted.</p>
        </div>
        <Button asChild className="rounded-2xl px-6">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 select-none">
      {/* Page header navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800/80 pb-6">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" asChild className="rounded-xl p-0 hover:bg-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white gap-1 bg-transparent cursor-pointer">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Evaluation Report</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 border border-slate-200/40 dark:border-slate-800/80">
              ID: #{activeAnalysis.id}
            </span>
          </div>
          <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span>{activeAnalysis.fileName} ({activeAnalysis.fileSize}) • Evaluated on {activeAnalysis.date}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl px-4 border-slate-200 dark:border-slate-800" onClick={() => addToast("PDF export initiated", "info")}>
            Export to PDF
          </Button>
          <Button className="rounded-2xl px-5 font-bold" asChild>
            <Link href="/dashboard/upload">Scan Another CV</Link>
          </Button>
        </div>
      </div>

      {/* Grid of detailed ScoreCards */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Granular Compatibility Indices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <ScoreCard
            score={activeAnalysis.overallScore}
            label="Overall Grade"
            description={`${activeAnalysis.overallScore}% Grade`}
            tooltipText="Consolidated candidate index rating."
            icon={<Award className="w-5 h-5 text-yellow-500" />}
          />
          <ScoreCard
            score={activeAnalysis.atsScore}
            label="ATS Parsing"
            description={`${activeAnalysis.atsScore}% Score`}
            tooltipText="Scanners keyword matching threshold score."
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          />
          <ScoreCard
            score={activeAnalysis.skillsScore}
            label="Skill Alignment"
            description={`${activeAnalysis.skillsScore}% Score`}
            tooltipText="Calculated from specific technical alignment matrices."
            icon={<Compass className="w-5 h-5 text-indigo-500" />}
          />
          <ScoreCard
            score={activeAnalysis.grammarScore}
            label="Grammar Index"
            description={`${activeAnalysis.grammarScore}% Score`}
            tooltipText="Checks overall reading clarity levels."
            icon={<PenTool className="w-5 h-5 text-purple-500" />}
          />
          <ScoreCard
            score={activeAnalysis.formattingScore}
            label="Formatting Layout"
            description={`${activeAnalysis.formattingScore}% Score`}
            tooltipText="Verifies table boundaries, standard margins, and column layouts."
            icon={<Layout className="w-5 h-5 text-cyan-500" />}
          />
        </div>
      </div>

      {/* Detailed Actionable Tabs InsightPanel */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">AI Analysis Breakdowns</h2>
        <div className="p-8 border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card rounded-3xl shadow-xl">
          <InsightPanel result={activeAnalysis} />
        </div>
      </div>
    </div>
  );
}
