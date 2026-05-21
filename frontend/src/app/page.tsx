"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Zap,
  Bot,
  Target,
  Sparkles,
  ArrowRight,
  Check,
  HelpCircle,
  ChevronDown,
  Layers,
  Search,
  CheckCircle2,
  Moon,
  Sun,
  Laptop
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Mounted check to prevent Next hydration flickering
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // Apply theme attribute
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Billing Toggle
  const [isAnnual, setIsAnnual] = useState(false);

  // Scanning simulation state for Hero Page
  const [scanStep, setScanStep] = useState<"idle" | "scanning" | "done">("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanScore, setScanScore] = useState(0);

  useEffect(() => {
    if (scanStep === "scanning") {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setScanStep("done");
              // Roll score to 94
              let s = 0;
              const scoreInterval = setInterval(() => {
                s += 2;
                setScanScore(s);
                if (s >= 94) {
                  clearInterval(scoreInterval);
                }
              }, 25);
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [scanStep]);

  const handleStartScan = () => {
    setScanStep("scanning");
    setScanProgress(0);
    setScanScore(0);
  };

  const handleResetScan = () => {
    setScanStep("idle");
    setScanProgress(0);
    setScanScore(0);
  };

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      title: "ATS Optimization Engine",
      description: "Ensure your resume bypasses automated ATS screeners. Detect formatting and parsing flaws instantly.",
      icon: ShieldCheck,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/20"
    },
    {
      title: "Real-time AI Scoring",
      description: "Get an instant, data-driven visual score out of 100 across key sections: skills, keywords, layout, and grammar.",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/20"
    },
    {
      title: "Contextual AI Feedback",
      description: "Get specific, actionable, line-by-line recommendations written by advanced LLMs to boost impact.",
      icon: Bot,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      title: "Semantic Role Matching",
      description: "Align your professional highlights with standard market profiles. Discover exact match and missing keyword ratios.",
      icon: Target,
      color: "text-cyan-500",
      bg: "bg-cyan-50 dark:bg-cyan-950/20"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for passive job seekers wanting basic improvements.",
      price: isAnnual ? "$0" : "$0",
      period: "forever",
      features: [
        "2 AI Resume Analyses per month",
        "Overall Compatibility Score",
        "Key ATS Parsing Check",
        "Email Support"
      ],
      cta: "Get Started",
      highlight: false,
      href: "/dashboard/upload"
    },
    {
      name: "Pro Professional",
      description: "Unlock all features to actively land elite engineering positions.",
      price: isAnnual ? "$19" : "$29",
      period: "month",
      features: [
        "Unlimited Resume Analyses",
        "Granular Scoring & Progress Charts",
        "Advanced ATS Keyword Recommendations",
        "Tailored Job & Salary Match Profiles",
        "24/7 Priority VIP Support"
      ],
      cta: "Upgrade to Pro",
      highlight: true,
      href: "/dashboard/upload"
    }
  ];

  const faqs = [
    {
      q: "How does the CVInsight AI analyzer work?",
      a: "CVInsight AI parses your PDF or Word document layout into raw content data. Our LLM-powered algorithm cross-references your career achievements with ATS parser structures, industry skills directories, and style criteria to generate a high-fidelity visual evaluation report."
    },
    {
      q: "Will this optimize my resume for specific applicant tracking systems?",
      a: "Absolutely. Most systems (like Workday, Taleo, Greenhouse) search for direct skills matching, clean formatting parsing, and standard headings. Our analyzer mimics these standard parsers to reveal exactly what they see vs. what they omit."
    },
    {
      q: "Is my personal resume data secure?",
      a: "Yes, data privacy is our absolute priority. Your uploaded resumes are encrypted in transit and at rest. We never sell your personal information or training sets, and files can be deleted permanently from your dashboard at any time."
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes. You can manage your billing plan directly inside the Settings tab of your dashboard. Cancellations are instant, with features remaining available until the end of your billing cycle."
    }
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 radial-grid transition-colors duration-300 relative overflow-hidden">
      {/* Top Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[10%] w-[50%] h-[30%] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[15%] right-[5%] w-[40%] h-[25%] bg-cyan-500/10 dark:bg-cyan-500/25 blur-[120px] rounded-full pointer-events-none" />

      {/* Global Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              CVInsight <span className="text-primary dark:text-indigo-400 font-medium">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#ats-explanation" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              ATS Standard
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <Button asChild size="sm" className="rounded-xl font-semibold shadow-sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors hidden sm:block">
                  Sign In
                </Link>
                <Button asChild size="sm" className="rounded-xl font-semibold shadow-md">
                  <Link href="/dashboard/upload">Upload CV</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-28 relative">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Conversion text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Revolutionizing Job Search
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
            >
              Analyze your resume with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
                AI intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl"
            >
              Transform your CV in seconds. Get professional applicant scoring, missing high-priority ATS keyword injection checklists, style fixes, and specific target career recommendations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="rounded-2xl px-8 font-extrabold text-md shadow-lg shadow-indigo-500/25 flex items-center gap-2 group" asChild>
                <Link href="/dashboard/upload">
                  Upload Resume Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl px-8 font-bold text-md shadow-sm" asChild>
                <Link href="#features">Explore Platform Features</Link>
              </Button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md"
            >
              <div>
                <p className="text-3xl font-extrabold text-slate-800 dark:text-white">98%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Parser Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-800 dark:text-white">10s</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Average Analysis</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-800 dark:text-white">40k+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CVs Optimized</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Animated scanner hero simulation */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 glass-card p-6 shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800/60 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">CVInsight_AI_Parser.tsx</span>
              </div>

              {/* Scanning visual area */}
              <div className="relative h-64 border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 overflow-hidden flex flex-col gap-2.5 shadow-inner">
                {/* Simulated content text blocks */}
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-4/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mt-4" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-3/6" />
                
                <AnimatePresence>
                  {scanStep === "scanning" && (
                    <>
                      {/* Laser beam line */}
                      <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute left-0 right-0 h-1 bg-cyan-400 dark:bg-cyan-500 shadow-[0_0_12px_#22D3EE] z-10"
                      />
                      {/* Ambient laser glow sheet */}
                      <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute left-0 right-0 h-10 bg-gradient-to-b from-cyan-400/20 to-transparent transform -translate-y-10"
                      />
                    </>
                  )}
                </AnimatePresence>

                {scanStep === "done" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-950/20 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">CV Scan Complete</p>
                    <p className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{scanScore}% Overall Score</p>
                  </motion.div>
                )}
              </div>

              {/* Dynamic bottom controls */}
              <div className="mt-6 flex flex-col gap-2">
                {scanStep === "idle" && (
                  <button
                    onClick={handleStartScan}
                    className="w-full py-3 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-600/95 text-white font-bold rounded-2xl shadow-md cursor-pointer transition-transform active:scale-95"
                  >
                    Test Live Simulation Scan
                  </button>
                )}

                {scanStep === "scanning" && (
                  <div className="space-y-2 py-1">
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 transition-all duration-100" style={{ width: `${scanProgress}%` }} />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      <span>Analyzing layout...</span>
                      <span>{scanProgress}%</span>
                    </div>
                  </div>
                )}

                {scanStep === "done" && (
                  <button
                    onClick={handleResetScan}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold rounded-2xl cursor-pointer"
                  >
                    Reset & Test Again
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Marquee Grid */}
      <section className="py-12 border-y border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
            Candidates Landed Offers At World-Class Engineering Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-40 dark:opacity-25 grayscale hover:grayscale-0 hover:opacity-75 transition-all">
            <span className="text-xl font-extrabold tracking-tight">STRIPE</span>
            <span className="text-xl font-extrabold tracking-tight">VERCEL</span>
            <span className="text-xl font-extrabold tracking-tight">LINEAR</span>
            <span className="text-xl font-extrabold tracking-tight">NETFLIX</span>
            <span className="text-xl font-extrabold tracking-tight">GOOGLE</span>
          </div>
        </div>
      </section>

      {/* Features breakdown */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Complete SaaS Toolset</span>
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">
              Everything you need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-500">outperform recruiters</span>
            </h2>
            <p className="text-slate-500">Traditional resume editing is guessing. CVInsight AI offers clear, quantifiable data alignment metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className={`w-12 h-12 rounded-2xl ${feat.bg} ${feat.color} flex items-center justify-center mb-4`}>
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">{feat.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Explanation section */}
      <section id="ats-explanation" className="py-20 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-200/40 dark:border-slate-800/40">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            {/* Visual representation of an ATS parsing view */}
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Normal ATS Parser View</span>
                <span className="text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded-full">3 Flaws Flagged</span>
              </div>

              <div className="space-y-3 font-mono text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p><span className="text-slate-400">[PARSER]</span> Reading: Candidate Profile...</p>
                <p><span className="text-slate-400">[PARSER]</span> ERROR: Could not parse dual-column table layout.</p>
                <p><span className="text-slate-400">[PARSER]</span> WARNING: 'Senior Engineer' target keyword not found.</p>
                <p><span className="text-slate-400">[PARSER]</span> Skills Found: HTML, CSS, JavaScript (Matches: 12%)</p>
                <p><span className="text-slate-400">[PARSER]</span> Recommendation: Reject (Index score below threshold)</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-2">
                <Search className="w-4 h-4 text-primary animate-pulse" />
                <span>Modern parsers read linearly. Graphs and multi-column designs break keywords.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Beat the bots</span>
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">Why 90% of resumes are discarded before reaching human eyes</h2>
            <p className="text-slate-500 leading-relaxed">
              Most Fortune 500 corporations utilize Applicant Tracking Systems (ATS) to filter candidate pipelines. These systems use simple, linear parsing models. Complex grid boundaries, icons, and non-standard styling labels break the text parser completely, rendering your qualifications invisible.
            </p>
            <p className="text-slate-500 leading-relaxed">
              CVInsight AI runs deep, structural tests simulating standard parsers. We identify layout boundaries, scan lists, check spelling indices, and match precise industry synonyms to guarantee your index scores rank at the absolute top of the pipeline.
            </p>
            <Button size="lg" className="rounded-2xl px-8 font-bold" asChild>
              <Link href="/dashboard/upload">Scan Your CV Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Page */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">SaaS Pricing Plans</span>
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">Simple, transparent pricing</h2>
            <p className="text-slate-500">Pick the perfect plan to accelerate your interview pipeline.</p>

            {/* Monthly/Annual billing slider toggle */}
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

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className="flex-1 flex"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`p-8 rounded-3xl border w-full flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? "border-primary bg-indigo-500/5 dark:bg-indigo-950/10 shadow-xl shadow-indigo-500/5 ring-1 ring-primary"
                    : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40"
                }`}>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{plan.name}</h3>
                      {plan.highlight && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-primary text-white px-2.5 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 leading-normal">{plan.description}</p>
                    
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
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="py-24 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-200/40 dark:border-slate-800/40">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Got Questions?</span>
            <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about CVInsight AI.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200/60 dark:border-slate-800/60 rounded-2xl bg-white dark:bg-slate-900/40 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 flex justify-between items-center text-left font-bold text-slate-800 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/20"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/50 leading-relaxed bg-slate-50/30 dark:bg-slate-950/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-purple-500/5 to-cyan-500/10 dark:from-indigo-950/20 dark:via-purple-950/5 dark:to-cyan-950/20 pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-8 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">Ready to land your dream role?</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Stop sending blind applications. Get the exact key data that applicant tracking bots and top-tier recruiters search for.
          </p>
          <Button size="lg" className="rounded-2xl px-10 py-6 font-extrabold text-md shadow-lg shadow-primary/20" asChild>
            <Link href="/dashboard/upload">Start Your First Free Scan</Link>
          </Button>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-12 transition-colors">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">C</div>
            <span className="font-extrabold text-sm text-slate-800 dark:text-white">CVInsight AI</span>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} CVInsight AI Platform. All rights reserved. Designed for elite career growth.
          </p>

          <div className="flex gap-6 text-xs text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
