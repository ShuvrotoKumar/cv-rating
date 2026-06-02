import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({ title, description, buttonText, href }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl bg-slate-50/50 dark:bg-slate-900/50">
      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
        <FileUp className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">{description}</p>
      <Button asChild className="rounded-xl px-6">
        <Link href={href}>{buttonText}</Link>
      </Button>
    </div>
  );
}
