"use client";

interface SkeletonProps {
  type?: "card" | "list" | "chart" | "text" | "circle";
  count?: number;
  className?: string;
}

export function SkeletonLoader({ type = "card", count = 1, className = "" }: SkeletonProps) {
  const shimmerClass = "animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl";

  const renderSkeleton = () => {
    switch (type) {
      case "circle":
        return (
          <div className={`w-24 h-24 rounded-full ${shimmerClass} ${className}`} />
        );
      case "chart":
        return (
          <div className={`w-full h-64 ${shimmerClass} flex items-end justify-between p-6 gap-2 ${className}`}>
            <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[40%]" />
            <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[75%]" />
            <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[55%]" />
            <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[90%]" />
            <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-t-lg h-[30%]" />
          </div>
        );
      case "list":
        return (
          <div className="space-y-4 w-full">
            {Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className={`p-4 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4 ${className}`}>
                <div className="space-y-2 flex-1">
                  <div className={`h-4 w-1/3 ${shimmerClass}`} />
                  <div className={`h-3 w-1/4 ${shimmerClass}`} />
                </div>
                <div className={`h-8 w-16 ${shimmerClass}`} />
              </div>
            ))}
          </div>
        );
      case "text":
        return (
          <div className="space-y-2 w-full">
            {Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className={`h-4 ${shimmerClass} ${idx % 2 === 0 ? "w-full" : "w-5/6"} ${className}`} />
            ))}
          </div>
        );
      case "card":
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className={`p-6 border border-slate-100 dark:border-slate-800 rounded-2xl glass-card flex flex-col gap-3 ${className}`}>
                <div className={`h-4 w-2/5 ${shimmerClass}`} />
                <div className={`h-8 w-3/5 ${shimmerClass}`} />
                <div className={`h-3 w-4/5 ${shimmerClass}`} />
              </div>
            ))}
          </div>
        );
    }
  };

  return renderSkeleton();
}
