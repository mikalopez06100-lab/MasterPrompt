import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

const navLinks = [
  { href: "/formation", label: "Formation — 49€ (97€)", mobileLabel: "Formation 49€" },
  { href: "/pack-ia", label: "Pack IA — 397€", mobileLabel: "Pack IA 397€" },
  { href: "/accompagnement", label: "Accompagnement", mobileLabel: "Accompagnement" },
  { href: "/abonnements", label: "Abonnements", mobileLabel: "Abonnements" },
];

const navCTA = { href: "/diagnostic", label: "Diagnostic gratuit →", mobileLabel: "Diagnostic →" };
const navBooking = { href: "/appel", label: "Réserver un appel →", mobileLabel: "Appel →" };

export function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] border-b border-white/10 bg-navy">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-5 md:px-10">
        <div className="flex items-center justify-between gap-3">
          <Logo href="/" size="sm" onDark />
          <div className="hidden items-center gap-1 md:flex">
            <span className="mr-2 text-[11px] uppercase tracking-[0.14em] text-slate-400">Offres</span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-xs font-medium font-sans text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={navBooking.href}
              className="ml-2 rounded-md border border-white/25 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              {navBooking.label}
            </Link>
            <Link
              href={navCTA.href}
              className="cta-pulse ml-2 rounded-md bg-amber-500 px-4 py-2 text-xs font-bold text-navy transition hover:opacity-90"
            >
              {navCTA.label}
            </Link>
          </div>
        </div>

        <div className="relative mt-3 md:hidden">
          <div
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-4 px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Navigation offres"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 snap-start whitespace-nowrap rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium font-sans text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {link.mobileLabel}
              </Link>
            ))}
            <Link
              href={navBooking.href}
              className="shrink-0 snap-start whitespace-nowrap rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              {navBooking.mobileLabel}
            </Link>
            <Link
              href={navCTA.href}
              className="cta-pulse shrink-0 snap-start whitespace-nowrap rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-navy transition hover:opacity-90"
            >
              {navCTA.mobileLabel}
            </Link>
            <span className="w-3 shrink-0 snap-none" aria-hidden />
          </div>
        </div>
      </div>
    </nav>
  );
}
