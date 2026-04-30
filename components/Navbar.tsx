"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

const navLinks = [
  { href: "/formation", label: "Formation — 49€ (97€)" },
  { href: "/pack-ia", label: "Pack IA — 397€" },
  { href: "/accompagnement", label: "Accompagnement" },
];

const navCTA = { href: "#guide", label: "Guide gratuit →" };

export function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] border-b border-white/10 bg-navy px-5 py-3 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Logo href="/" size="sm" className="h-9 w-auto" />
        <Link
          href={navCTA.href}
          className="rounded-md bg-amber-500 px-3 py-2 text-xs font-bold text-navy transition hover:opacity-90 md:hidden"
        >
          Guide gratuit
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          <span className="mr-2 text-[11px] uppercase tracking-[0.14em] text-slate-400">Offres</span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={navCTA.href}
            className="ml-2 rounded-md bg-amber-500 px-4 py-2 text-xs font-bold text-navy transition hover:opacity-90"
          >
            {navCTA.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
