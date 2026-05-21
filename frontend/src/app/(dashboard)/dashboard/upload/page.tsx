"use client";

import { UploadZone } from "@/components/dashboard/UploadZone";
import { ShieldCheck, HelpCircle } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 select-none">
      {/* Title block */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">AI CV Optimization Sandbox</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Upload your resume below. Our system will analyze formatting guidelines, ATS keyword weights, and spelling indices.
        </p>
      </div>

      {/* Main glassmorphic wrapper */}
      <div className="p-8 border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card rounded-3xl shadow-xl space-y-8">
        
        {/* Actual Upload Zone */}
        <UploadZone />
        
        {/* Layout notice footers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
          <div className="flex gap-2.5">
            <ShieldCheck className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <div className="space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Strict Candidate Data Security</span>
              <p className="leading-relaxed">All parsed content details are encrypted. You can permanently wipe document logs from settings at any point.</p>
            </div>
          </div>
          
          <div className="flex gap-2.5">
            <HelpCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
            <div className="space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">ATS Compliance Guidelines</span>
              <p className="leading-relaxed">We recommend uploading standard vertical layouts (single-column PDF or Word formats) for optimal scoring indices.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
