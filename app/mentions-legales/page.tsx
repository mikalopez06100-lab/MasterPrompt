import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Mentions légales — Master Prompt",
  description:
    "Mentions légales du site masterprompt.fr, édité par Michaël Lopez, auto-entrepreneur.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.masterprompt.fr/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Mentions légales</span>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <article className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-border bg-white p-6 sm:p-10">
          <header>
            <h1 className={`${syne.className} text-3xl font-bold sm:text-4xl`}>Mentions légales</h1>
          </header>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>1. Éditeur du site</h2>
            <p className="text-sm text-slate-700">Le site masterprompt.fr est édité par :</p>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Nom :</strong> Michaël Lopez</li>
              <li><strong>Statut :</strong> Auto-entrepreneur</li>
              <li><strong>SIRET :</strong> 452 917 412 00044</li>
              <li><strong>SIREN :</strong> 452 917 412</li>
              <li><strong>Adresse :</strong> 91 Corniche Paul Clermont, 06670 Colomars, France</li>
              <li><strong>Email :</strong>{" "}
                <a href="mailto:hello@masterprompt.fr" className="underline underline-offset-4">
                  hello@masterprompt.fr
                </a>
              </li>
              <li><strong>Téléphone :</strong> [À COMPLÉTER]</li>
              <li><strong>TVA :</strong> TVA non applicable — franchise en base de TVA (art. 293 B du CGI)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>2. Directeur de la publication</h2>
            <p className="text-sm text-slate-700">
              Michaël Lopez —{" "}
              <a href="mailto:hello@masterprompt.fr" className="underline underline-offset-4">
                hello@masterprompt.fr
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>3. Hébergement</h2>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Hébergeur :</strong> Vercel Inc.</li>
              <li><strong>Adresse :</strong> 340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis</li>
              <li><strong>Site :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4"
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>4. Propriété intellectuelle</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              L&apos;ensemble du contenu du site masterprompt.fr (textes, images, vidéos, structure, méthode
              PACO) est la propriété exclusive de Michaël Lopez, sauf mention contraire. Toute
              reproduction, représentation, modification ou exploitation, totale ou partielle, sans
              autorisation écrite préalable, est interdite et constitue une contrefaçon sanctionnée par
              les articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>5. Données personnelles</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Les informations relatives au traitement des données personnelles sont détaillées dans notre{" "}
              <Link href="/politique-confidentialite" className="underline underline-offset-4">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>6. Cookies</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Le site masterprompt.fr peut utiliser des cookies techniques nécessaires à son fonctionnement.
              Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé sans consentement préalable.
              Pour en savoir plus, consultez notre{" "}
              <Link href="/politique-confidentialite" className="underline underline-offset-4">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>7. Liens hypertextes</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Le site masterprompt.fr peut contenir des liens vers des sites tiers. Michaël Lopez n&apos;est
              pas responsable du contenu de ces sites et n&apos;exerce aucun contrôle sur ceux-ci.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>8. Droit applicable</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les
              tribunaux français seront seuls compétents.
            </p>
          </section>

          <p className="border-t border-border pt-6 text-xs text-muted">Dernière mise à jour : mai 2026</p>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
