import Link from "next/link";

export function LandingNav() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-[100] h-[60px] flex items-center justify-between px-6 md:px-8 bg-navy">
      <Link href="/" className="font-heading font-black text-[1.15rem] text-white">
        Master<span className="text-primary">Prompt</span>
      </Link>
      <Link
        href="#form-main"
        className="bg-primary text-white py-2 px-5 rounded-md text-sm font-semibold hover:opacity-85 transition-opacity"
      >
        Obtenir le guide gratuit →
      </Link>
    </nav>
  );
}
