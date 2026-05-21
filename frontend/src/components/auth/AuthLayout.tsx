import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-2 text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-slate-500">{subtitle}</p>
        </div>
        {children}
      </Card>
    </div>
  );
}
