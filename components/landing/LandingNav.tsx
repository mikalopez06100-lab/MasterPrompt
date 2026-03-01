import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export function LandingNav() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-[100] h-[60px] flex items-center justify-between px-6 md:px-8 bg-navy">
      <Logo href="/" size="sm" className="h-9 w-auto" />
      <Link
        href="#form-main"
        className="bg-primary text-white py-2 px-5 rounded-md text-sm font-semibold hover:opacity-85 transition-opacity"
      >
        Obtenir le guide gratuit →
      </Link>
    </nav>
  );
}
