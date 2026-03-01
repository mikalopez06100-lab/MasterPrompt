import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center justify-between px-6 md:px-12 bg-ivory/90 backdrop-blur-xl border-b border-border">
      <Logo href="/" size="md" />
      <div className="flex items-center gap-10">
        <Link href="#programme" className="text-sm text-muted hover:text-navy transition-colors hidden md:inline">
          Programme
        </Link>
        <Link href="#tarif" className="text-sm text-muted hover:text-navy transition-colors hidden md:inline">
          Tarif
        </Link>
        <Link href="#faq" className="text-sm text-muted hover:text-navy transition-colors hidden md:inline">
          FAQ
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-white bg-navy py-2.5 px-5 rounded-md hover:opacity-85 transition-opacity"
        >
          Rejoindre →
        </Link>
      </div>
    </nav>
  );
}
