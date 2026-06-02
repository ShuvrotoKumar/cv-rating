"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  
  // Mounted guard to prevent Next.js hydration mismatches
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Persist theme to DOM element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, mounted, router]);

  // Render a clean black skeleton loading screen during initial client mounting
  if (!mounted) {
    return <div className="h-screen w-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">Loading CVInsight...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar - responsive persistent navigation */}
      <Sidebar />
      
      {/* Primary Dashboard Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Navbar />
        
        {/* Dynamic page contents scrolled under navbar */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50 dark:bg-slate-950/20 radial-grid">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
