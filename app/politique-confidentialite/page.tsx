import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Politique de confidentialité — Master Prompt",
  description:
    "Politique de confidentialité et traitement des données personnelles sur masterprompt.fr.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.masterprompt.fr/politique-confidentialite",
  },
};

const dataRows: Array<{ data: string; purpose: string; legal: string }> = [
  {
    data: "Adresse email",
    purpose:
      "Envoi du guide gratuit, séquences d'emails marketing (consentement explicite), livraison de la formation",
    legal: "Consentement (art. 6.1.a RGPD) / Exécution du contrat (art. 6.1.b)",
  },
  {
    data: "Nom, prénom",
    purpose: "Facturation, communication commerciale",
    legal: "Exécution du contrat (art. 6.1.b RGPD)",
  },
  {
    data: "Données de paiement",
    purpose: "Traitement des transactions",
    legal: "Exécution du contrat — traitées directement par Stripe, non stockées par masterprompt.fr",
  },
  {
    data: "Données de navigation (cookies techniques)",
    purpose: "Fonctionnement du site, authentification",
    legal: "Intérêt légitime (art. 6.1.f RGPD)",
  },
  {
    data: "Réponses au questionnaire client",
    purpose: "Personnalisation de la prestation Pack IA / Accompagnement",
    legal: "Exécution du contrat (art. 6.1.b RGPD)",
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Politique de confidentialité</span>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <article className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-border bg-white p-6 sm:p-10">
          <header>
            <h1 className={`${syne.className} text-3xl font-bold sm:text-4xl`}>
              Politique de confidentialité
            </h1>
            <p className="mt-2 text-sm text-muted">Dernière mise à jour : mai 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>1. Responsable du traitement</h2>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Michaël Lopez</strong>, auto-entrepreneur</li>
              <li>SIRET : 452 917 412 00044</li>
              <li>91 Corniche Paul Clermont, 06670 Colomars, France</li>
              <li>Email :{" "}
                <a href="mailto:hello@masterprompt.fr" className="underline underline-offset-4">
                  hello@masterprompt.fr
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>2. Données collectées et finalités</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-border text-left text-navy">
                    <th className="py-2 pr-4 font-semibold">Données</th>
                    <th className="py-2 pr-4 font-semibold">Finalité</th>
                    <th className="py-2 font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row) => (
                    <tr key={row.data} className="border-b border-border align-top">
                      <td className="py-3 pr-4">{row.data}</td>
                      <td className="py-3 pr-4">{row.purpose}</td>
                      <td className="py-3">{row.legal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>3. Durée de conservation</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Emails marketing :</strong> jusqu&apos;au désabonnement ou 3 ans après le dernier
                contact actif.
              </li>
              <li>
                <strong>Données de facturation :</strong> 10 ans (obligation légale comptable).
              </li>
              <li>
                <strong>Données de compte client :</strong> durée de la relation contractuelle + 3 ans.
              </li>
              <li>
                <strong>Données de navigation :</strong> 13 mois maximum (recommandation CNIL).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>4. Sous-traitants et transferts</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              masterprompt.fr utilise les sous-traitants suivants, tous soumis à des garanties
              contractuelles conformes au RGPD :
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Stripe Inc.</strong> (paiements) — États-Unis, certifié PCI DSS, Privacy Shield /
                clauses contractuelles types UE.{" "}
                <a
                  href="https://stripe.com/fr/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4"
                >
                  stripe.com/fr/privacy
                </a>
              </li>
              <li>
                <strong>Brevo (ex-Sendinblue)</strong> (emailing) — France / UE.{" "}
                <a
                  href="https://www.brevo.com/fr/legal/privacypolicy/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4"
                >
                  brevo.com/fr/legal/privacypolicy
                </a>
              </li>
              <li>
                <strong>Supabase Inc.</strong> (base de données) — États-Unis, clauses contractuelles
                types UE.{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4"
                >
                  supabase.com/privacy
                </a>
              </li>
              <li>
                <strong>Vercel Inc.</strong> (hébergement) — États-Unis, clauses contractuelles types UE.{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4"
                >
                  vercel.com/legal/privacy-policy
                </a>
              </li>
              <li>
                <strong>Mux Inc.</strong> (vidéos) — États-Unis, clauses contractuelles types UE.{" "}
                <a
                  href="https://mux.com/privacy/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-4"
                >
                  mux.com/privacy
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>5. Vos droits</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles.</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes.</li>
              <li>
                <strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données («&nbsp;droit à l&apos;oubli&nbsp;»).
              </li>
              <li><strong>Droit à la limitation</strong> : suspendre le traitement de vos données.</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré.</li>
              <li>
                <strong>Droit d&apos;opposition</strong> : vous opposer à un traitement basé sur
                l&apos;intérêt légitime ou à des fins marketing.
              </li>
              <li>
                <strong>Retrait du consentement</strong> : à tout moment pour les traitements basés sur le
                consentement, sans effet rétroactif.
              </li>
            </ul>
            <p className="text-sm text-slate-700">
              Pour exercer vos droits :{" "}
              <a href="mailto:hello@masterprompt.fr" className="underline underline-offset-4">
                hello@masterprompt.fr
              </a>{" "}
              — réponse sous 30 jours.
            </p>
            <p className="text-sm text-slate-700">
              En cas de réclamation non résolue, vous pouvez saisir la <strong>CNIL</strong> :{" "}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-4"
              >
                cnil.fr/fr/plaintes
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>6. Cookies</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              masterprompt.fr utilise uniquement des cookies techniques nécessaires au fonctionnement du
              site (authentification, session utilisateur) et des cookies de fonctionnement Next.js. Aucun
              cookie publicitaire tiers n&apos;est déposé sans consentement préalable.
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur — cela peut
              affecter le fonctionnement de certaines fonctionnalités du site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>7. Sécurité</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              masterprompt.fr met en œuvre les mesures techniques et organisationnelles appropriées pour
              protéger vos données : chiffrement HTTPS, accès restreints aux données, hébergement sur
              infrastructure sécurisée (Vercel / Supabase). Les données de paiement ne transitent pas par
              nos serveurs — elles sont traitées directement par Stripe (certifié PCI DSS niveau 1).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>8. Modifications</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Cette politique peut être mise à jour. La version en vigueur est toujours accessible à
              l&apos;adresse{" "}
              <Link href="/politique-confidentialite" className="underline underline-offset-4">
                masterprompt.fr/politique-confidentialite
              </Link>
              . En cas de modification substantielle, les utilisateurs inscrits seront informés par email.
            </p>
          </section>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
