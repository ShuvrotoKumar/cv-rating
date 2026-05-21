import Link from "next/link";
import { LayoutDashboard, FileUp, Settings, CreditCard } from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload", href: "/dashboard/upload", icon: FileUp },
    { name: "Pricing", href: "/dashboard/pricing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-950 text-white p-6 flex flex-col">
      <div className="text-2xl font-bold mb-10 text-cyan-400">CVInsight AI</div>
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
