"use client";

import { useState } from "react";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { Button } from "@/components/ui/button";
import { useToastStore } from "@/store/useToastStore";
import { ShieldCheck, Users, UploadCloud, Coins, Search, Settings, ToggleLeft, ToggleRight, Sparkles, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const { analyses } = useAnalysisStore();
  const addToast = useToastStore((state) => state.addToast);

  // Administrative stats
  const totalUsers = 1840;
  const totalUploads = 8520 + analyses.length;
  const avgATS = 82;
  const systemMRR = "$24,580";

  // System status toggle controls
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [aiHeavyModel, setAiHeavyModel] = useState(true);

  // Sample candidate listings
  const [searchTerm, setSearchTerm] = useState("");
  const initialCandidates = [
    { id: "usr_92", name: "Alex Rivers", email: "alex.r@google.com", uploads: 4, lastScore: 89, date: "May 21, 2026", status: "Active" },
    { id: "usr_104", name: "Sara Jenkins", email: "sara.j@netflix.com", uploads: 2, lastScore: 74, date: "May 19, 2026", status: "Active" },
    { id: "usr_53", name: "David Chen", email: "d.chen@stripe.com", uploads: 8, lastScore: 92, date: "May 20, 2026", status: "Active" },
    { id: "usr_22", name: "Marcus Stone", email: "mstone@vercel.com", uploads: 1, lastScore: 61, date: "May 15, 2026", status: "Pending" },
    { id: "usr_119", name: "Eliza Vance", email: "evance@blackmesa.org", uploads: 3, lastScore: 84, date: "May 18, 2026", status: "Suspended" },
  ];

  const [candidates, setCandidates] = useState(initialCandidates);

  const handleToggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    addToast(maintenanceMode ? "Maintenance Mode deactivated!" : "Maintenance Mode activated!", "warning");
  };

  const handleToggleAIModel = () => {
    setAiHeavyModel(!aiHeavyModel);
    addToast(aiHeavyModel ? "AI model set to standard speed parsing" : "AI model set to high-fidelity GPT-4o", "success");
  };

  const handleAction = (candidateName: string, actionType: string) => {
    addToast(`${actionType} action triggered for candidate ${candidateName}`, "success");
  };

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16 select-none">
      {/* Title Header */}
      <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span>Administrative Dashboard</span>
          </h1>
          <p className="text-sm text-slate-500">Global system utilization analytics, user tracking database, and parameter configurations.</p>
        </div>
      </div>

      {/* Grid of Global Parameter metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ScoreCard
          score={totalUsers / 20 > 100 ? 100 : Math.round(totalUsers / 20)}
          label="Global Users"
          description={`${totalUsers} Active Accounts`}
          tooltipText="Total registered candidate accounts across all active pipelines."
          icon={<Users className="w-5 h-5 text-indigo-500" />}
        />
        <ScoreCard
          score={totalUploads / 100 > 100 ? 100 : Math.round(totalUploads / 100)}
          label="Total Uploads"
          description={`${totalUploads} Resumes Scanned`}
          tooltipText="All time parsed docx/pdf CV files logged in sandbox database."
          icon={<UploadCloud className="w-5 h-5 text-cyan-500" />}
        />
        <ScoreCard
          score={avgATS}
          label="Average ATS Index"
          description={`${avgATS}% Score Mean`}
          tooltipText="Historical average score returned across all uploaded candidate items."
          icon={<Sparkles className="w-5 h-5 text-purple-500" />}
        />
        <ScoreCard
          score={92}
          label="Monthly Revenue Index"
          description={`${systemMRR} MRR`}
          tooltipText="Total SaaS monthly recurring revenue parsed from active plans."
          icon={<Coins className="w-5 h-5 text-emerald-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: System settings panel */}
        <div className="lg:col-span-4 p-6 border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card rounded-3xl space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-400" />
              <span>Core Parameter Toggles</span>
            </h3>
            <p className="text-xs text-slate-500">Live operational adjustments and feature switches</p>
          </div>

          <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800/60">
            {/* Toggle 1: Maintenance */}
            <div className="pt-4 flex justify-between items-center">
              <div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Maintenance Standard</span>
                <p className="text-[10px] text-slate-400 max-w-[170px] leading-relaxed">Locks sandbox uploads during server upgrades.</p>
              </div>
              <button onClick={handleToggleMaintenance} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                {maintenanceMode ? (
                  <ToggleRight className="w-9 h-9 text-rose-500" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-400" />
                )}
              </button>
            </div>

            {/* Toggle 2: AI Parsing Standard */}
            <div className="pt-4 flex justify-between items-center">
              <div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Fidelity AI Auditing</span>
                <p className="text-[10px] text-slate-400 max-w-[170px] leading-relaxed">Enables high-fidelity parsing via GPT-4o systems.</p>
              </div>
              <button onClick={handleToggleAIModel} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                {aiHeavyModel ? (
                  <ToggleRight className="w-9 h-9 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: User/candidate account listings */}
        <div className="lg:col-span-8 p-6 border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 glass-card rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Active Accounts Sandbox</h3>
              <p className="text-xs text-slate-500">Database rows tracking candidate profiles</p>
            </div>
            
            {/* Search Input Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidate index..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/80 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/40 dark:bg-slate-950/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="p-4">User</th>
                  <th className="p-4">Sandbox CVs</th>
                  <th className="p-4">Last Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10">
                    <td className="p-4">
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{c.name}</span>
                        <span className="text-[10px] text-slate-400">{c.email}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-600 dark:text-slate-400">{c.uploads} CVs</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        c.lastScore >= 85 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400" :
                        c.lastScore >= 70 ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400" :
                        "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                      }`}>
                        {c.lastScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider ${
                        c.status === "Active" ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600" :
                        c.status === "Pending" ? "bg-amber-100 dark:bg-amber-950/30 text-amber-600" :
                        "bg-rose-100 dark:bg-rose-950/30 text-rose-600"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <Button variant="outline" size="sm" className="h-7 rounded-lg text-[10px] border-slate-200 dark:border-slate-800" onClick={() => handleAction(c.name, "Edit")}>
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 rounded-lg text-[10px] text-rose-500 border-slate-200 dark:border-slate-800 hover:bg-rose-50/50 hover:text-rose-600" onClick={() => handleAction(c.name, "Restrict")}>
                        Block
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
