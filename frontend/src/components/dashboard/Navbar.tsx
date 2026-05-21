"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Bell, Moon, Sun, User, Compass, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/useToastStore";

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const { theme, toggleTheme } = useThemeStore();
  const addToast = useToastStore((state) => state.addToast);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Resume analysis Software Engineer_CV complete!", read: false, time: "2m ago" },
    { id: 2, text: "Welcome to CVInsight AI! Get started by uploading a resume.", read: true, time: "1h ago" }
  ]);

  const handleClearNotifications = () => {
    setNotifications([]);
    addToast("Notifications cleared", "info");
  };

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md px-6 flex items-center justify-between transition-colors duration-300">
      
      {/* Route title or description */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Hi, {user?.name || "Candidate"}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        <span className="text-xs text-slate-400 font-medium">CVInsight Cloud Workspace</span>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-4 relative">
        
        {/* Toggle Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
          title="Toggle Mode"
        >
          {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer relative"
          >
            <Bell className="w-4.5 h-4.5" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          <AnimatePresence>
            {showNotifications && (
              <>
                {/* Backdrop Clicker */}
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 p-4 space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Notifications</span>
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearNotifications}
                        className="text-[10px] text-slate-400 hover:text-rose-500 font-semibold cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div key={notif.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100/50 dark:border-slate-900/60 flex flex-col gap-1">
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {notif.text}
                          </p>
                          <span className="text-[9px] text-slate-400">{notif.time}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-6 font-medium">No new notifications</p>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User profile dropdown indicator */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-600 hover:scale-105 transition-transform flex items-center justify-center text-white text-xs font-extrabold shadow-sm border border-white/20 select-none">
          {user?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
        </div>

      </div>
    </header>
  );
}
