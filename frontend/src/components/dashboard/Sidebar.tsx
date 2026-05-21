"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileUp, Settings, CreditCard, ShieldAlert, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const addToast = useToastStore((state) => state.addToast);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload CV", href: "/dashboard/upload", icon: FileUp },
    { name: "System Pricing", href: "/pricing", icon: CreditCard },
    { name: "Admin Portal", href: "/dashboard/admin", icon: ShieldAlert, badge: "System" },
  ];

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully.", "info");
    router.push("/");
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 text-slate-100 p-6 flex flex-col justify-between hidden md:flex h-full select-none z-20">
      <div className="space-y-10">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-2 group.brand">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white font-extrabold shadow-md">
            C
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            CVInsight <span className="text-indigo-400 font-medium">AI</span>
          </span>
        </Link>

        {/* Menu Navigation */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group duration-200 cursor-pointer",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-indigo-500/25 scale-[1.02]"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4.5 h-4.5 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                    isActive ? "bg-white text-primary" : "bg-indigo-950 text-indigo-400 border border-indigo-900/40"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile actions */}
      <div className="pt-6 border-t border-slate-800/80 space-y-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-xl transition-all cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
