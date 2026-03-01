"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PenLine,
  Dumbbell,
  Library,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

const nav = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/courses", label: "Formation", icon: BookOpen },
  { href: "/editor", label: "Éditeur", icon: PenLine },
  { href: "/exercises", label: "Exercices", icon: Dumbbell },
  { href: "/library", label: "Bibliothèque", icon: Library },
  { href: "/progress", label: "Progression", icon: TrendingUp },
  { href: "/billing", label: "Abonnement", icon: CreditCard },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 flex-col border-r border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-200/80 px-4 py-4">
        <Logo href="/dashboard" size="sm" />
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-button px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
