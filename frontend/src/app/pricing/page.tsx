"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, HelpCircle, ArrowLeft, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";

export default function PricingPage() {
  const { theme, toggleTheme } = useThemeStore();
  const [isAnnual, setIsAnnual] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const plans = [
    {
      name: "Starter",
      description: "Ideal for entry-level professionals seeking basic optimization checks.",
      price: "$0",
      period: "forever",
      features: [
        "2 Free Resume Analyses / Month",
        "Overall Compatibility Score",
        "Layout Parsing Warnings",
        "Basic Bulleted Suggestions",
        "Standard Email Response Support"
      ],
      cta: "Get Started Free",
      highlight: false,
      href: "/dashboard/upload"
    },
    {
      name: "Pro Professional",
      description: "Everything you need to bypass ATS screeners and land high-paying roles.",
      price: isAnnual ? "$19" : "$29",
      period: "month",
      features: [
        "Unlimited PDF & Word Analyses",
        "Full ATS Keyword Gap Lists",
        "Granular Scoring Breakdowns",
        "Advanced LLM Rewrites Suggestion",
        "Target Career Matching Matrix",
        "24/7 Priority Discord & Email Help"
      ],
      cta: "Upgrade to Professional Pro",
      highlight: true,
      href: "/dashboard/upload"
    }
  ];

  const comparisons = [
    { feature: "Resume Upload Limit", starter: "2 per month", pro: "Unlimited" },
    { feature: "ATS Keyword Auditing", starter: "✓ (Basic)", pro: "✓ (Comprehensive)" },
    { feature: "Advanced LLM Bullet Suggestion", starter: "✗", pro: "✓" },
    { feature: "Career Match Analysis", starter: "✗", pro: "✓" },
    { feature: "PDF / DOCX File Parsing", starter: "✓", pro: "✓" },
    { feature: "Admin Panel Settings", starter: "✗", pro: "✓ (If Admin)" },
    { feature: "Customer Support Team", starter: "Standard Email", pro: "24/7 Priority VIP" }
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 radial-grid transition-colors duration-300 relative pb-24">
      {/* Background radial overlays */}
      <div className="absolute top-[-5%] left-[20%] w-[50%] h-[30%] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] right-[10%] w-[45%] h-[25%] bg-cyan-500/10 dark:bg-cyan-500/25 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-md">
              C
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              CVInsight <span className="text-primary dark:text-indigo-400 font-medium">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-5xl pt-16 space-y-16">
        {/* Header Titles */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Pricing Strategy</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">Choose the perfect plan</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Invest in your credentials. Level up your application scores and land premium interviews.
          </p>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <span className={`text-sm font-semibold transition-colors ${!isAnnual ? "text-slate-800 dark:text-white" : "text-slate-400"}`}>Monthly billing</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 p-1 flex items-center transition-colors relative cursor-pointer"
            >
              <motion.div
                layout
                className="w-4 h-4 rounded-full bg-primary"
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${isAnnual ? "text-slate-800 dark:text-white" : "text-slate-400"}`}>
              Annual billing <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">Save 35%</span>
            </span>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="flex flex-col md:flex-row gap-8 items-stretch max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="flex-1 flex flex-col"
              whileHover={{ y: -6 }}
            >
              <div className={`p-8 rounded-3xl border w-full flex flex-col justify-between h-full transition-all ${
                plan.highlight
                  ? "border-primary bg-indigo-500/5 dark:bg-indigo-950/10 shadow-xl shadow-indigo-500/5 ring-1 ring-primary"
                  : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40"
              }`}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{plan.name}</h3>
                    {plan.highlight && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white px-2.5 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-5xl font-extrabold text-slate-800 dark:text-white">{plan.price}</span>
                    <span className="text-sm text-slate-400 font-semibold">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="w-full mt-8 rounded-2xl py-6 font-bold" variant={plan.highlight ? "default" : "outline"}>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Side-by-Side Detailed Technical Comparison Sheet */}
        <div className="pt-16 border-t border-slate-200 dark:border-slate-800 space-y-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">Detailed Plan Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Feature</th>
                  <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Starter</th>
                  <th className="p-4 text-sm font-bold text-slate-500 dark:text-slate-400">Professional Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {comparisons.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10">
                    <td className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">{item.feature}</td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{item.starter}</td>
                    <td className="p-4 text-sm font-medium text-primary dark:text-indigo-400">{item.pro}</td>
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
