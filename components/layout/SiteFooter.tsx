import Link from "next/link";
import { Syne } from "next/font/google";
import { Instagram, Linkedin } from "lucide-react";
import { WhatsAppFooterLink } from "@/components/WhatsAppContact";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/michael.lopez.pro/",
    label: "Instagram — @michael.lopez.pro",
    Icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/in/micha%C3%ABl-lopez-450342198/",
    label: "LinkedIn — Michaël Lopez",
    Icon: Linkedin,
  },
] as const;

type Props = {
  launchPriceActive?: boolean;
};

export function SiteFooter({ launchPriceActive = true }: Props) {
  const formationLabel = launchPriceActive ? "Formation — 49€ (97€)" : "Formation — 97€";

  return (
    <footer className="bg-navy px-4 py-10 text-slate-400 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className={`${syne.className} text-sm font-semibold text-white`}>MASTER PROMPT</p>
            <p className="mt-2 text-sm">Formation, accompagnement et outils IA pour entrepreneurs.</p>
          </div>

          <nav aria-label="Offres" className="space-y-2 text-sm">
            <Link href="/formation" className="block hover:text-white">{formationLabel}</Link>
            <Link href="/pack-ia" className="block hover:text-white">Pack IA — 397€</Link>
            <Link href="/accompagnement" className="block hover:text-white">Accompagnement</Link>
            <Link href="/abonnements" className="block hover:text-white">Abonnements</Link>
          </nav>

          <div className="text-sm">
            <Link
              href="mailto:hello@masterprompt.fr"
              className="underline underline-offset-4 hover:text-white"
            >
              hello@masterprompt.fr
            </Link>
            <WhatsAppFooterLink />
            <div className="mt-3 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <nav
            aria-label="Liens légaux"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400"
          >
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white">CGV</Link>
            <Link href="/politique-confidentialite" className="hover:text-white">Politique de confidentialité</Link>
            <span className="ml-auto text-[11px] text-slate-500">
              © {new Date().getFullYear()} Master Prompt
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
