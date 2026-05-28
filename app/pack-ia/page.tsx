import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { DeliverableCard } from "@/components/DeliverableCard";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PriceBadge } from "@/components/PriceBadge";
import { PriceFigure } from "@/components/PriceFigure";
import { UnlockPreviewGate } from "@/components/landing/UnlockPreviewGate";
import { SiteFooter } from "@/components/layout/SiteFooter";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });
const headingClass = `${syne.className} tracking-normal [font-stretch:100%] [font-kerning:normal]`;

export const metadata: Metadata = {
  title: "Pack IA Activité 397€ — Structurer son business avec l'IA en 5 jours | Master Prompt",
  description:
    "Audit, landing page, 20 prompts métier, 3 automatisations, session stratégique. Livré en 5 jours. Forfait 397€.",
  alternates: { canonical: "https://www.masterprompt.fr/pack-ia" },
  openGraph: {
    title: "Pack IA Activité 397€ — livré en 5 jours",
    description:
      "Audit, landing page, 20 prompts métier, 3 automatisations, session stratégique. Forfait 397€.",
    type: "website",
    url: "https://www.masterprompt.fr/pack-ia",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pack IA Activité 397€",
    description:
      "Audit, landing page, 20 prompts métier, 3 automatisations, session stratégique.",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
};

export default function PackIAPage() {
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK_PACK || "/api/contact";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pack IA Activité",
    provider: { "@type": "Organization", name: "Master Prompt" },
    areaServed: "FR",
    offers: { "@type": "Offer", price: "397", priceCurrency: "EUR" },
  };
  const faqItems = [
    { question: "Quels sont les délais ?", answer: "5 jours ouvrés à partir du brief de cadrage." },
    { question: "Comment se passe le brief ?", answer: "Visio de 60 min dans les 24h après commande." },
    { question: "Le Pack est-il remboursable ?", answer: "Non, prestation sur-mesure démarrée immédiatement. Mais l'appel de cadrage initial est gratuit." },
    { question: "La landing page est-elle hébergée ?", answer: "Livrée en HTML, vous l'hébergez où vous voulez (Vercel/Netlify gratuit, ou je vous accompagne)." },
    {
      question: "Y a-t-il des frais après la livraison du Pack ?",
      answer:
        "Le Pack IA est un paiement unique sans obligation de suite. Si vous souhaitez que nous hébergions votre site, maintenions vos automatisations ou développions votre visibilité SEO, des abonnements mensuels sont disponibles à partir de 49€/mois — après livraison, pas avant.",
    },
    { question: "Et si je veux aller plus loin ?", answer: "Le Pack IA est déductible si vous prenez l'Accompagnement 90 jours dans les 30 jours." },
  ];

  return (
    <main className={`${dmSans.className} bg-ivory text-navy antialiased font-normal`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className={syne.className}>
        <Navbar />
      </div>
      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Pack IA</span>
        </div>
      </section>

      <section className="bg-[#0A1620] px-4 py-14 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-amber-500`}>Pack IA Activite</p>
          <h1 className={`${headingClass} mt-3 text-3xl font-bold sm:text-4xl md:text-5xl`}>
            Pack Lancement IA — On structure votre activité avec l&apos;IA en 5 jours
          </h1>
          <div className="mt-5"><PriceBadge currentPrice="397€" note="Forfait tout inclus" /></div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={stripeLink} target="_blank" rel="noreferrer noopener" className="inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy">
              Réserver mon Pack
            </Link>
            <Link href="#exemple" className="inline-block rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5">
              Voir un exemple de Pack livré
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6 text-sm text-slate-700">
          Vous avez compris l&apos;IA, mais vous ne savez pas par où commencer pour votre activité ? Le Pack IA vous donne un plan clair et des livrables prêts à l&apos;emploi en 5 jours.
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Ce que vous recevez en 5 jours</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DeliverableCard icon="🔎" title="Audit stratégique" description="Analyse complète de votre activité et des leviers IA prioritaires." />
            <DeliverableCard icon="🧱" title="Landing page optimisée" description="Page prête à déployer, structurée pour convertir." />
            <DeliverableCard icon="🧠" title="20 prompts métier" description="Prompts PACO personnalisés à votre activité." />
            <DeliverableCard icon="⚙️" title="3 automatisations documentées" description="Procédures claires à implémenter avec Zapier ou n8n." />
            <DeliverableCard icon="📞" title="Session visio 60 min" description="Cadrage et mise en place ensemble." />
            <DeliverableCard icon="🗺️" title="Plan d'action 30 jours" description="Feuille de route priorisée pour passer à l'exécution." />
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Déroulé jour par jour</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {["J1 Brief de cadrage", "J2 Audit & stratégie", "J3 Landing + prompts", "J4 Automatisations", "J5 Session + plan 30 jours"].map((item) => (
              <article key={item} className="rounded-xl border border-border bg-white p-4 text-sm text-slate-700">{item}</article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className={`${headingClass} text-xl font-bold text-emerald-900`}>Pour qui c&apos;est</h2>
            <p className="mt-2 text-sm text-emerald-800">Indépendants et petites équipes qui veulent des livrables concrets, rapidement.</p>
          </article>
          <article className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h3 className={`${headingClass} text-xl font-bold text-red-900`}>Pour qui ce n&apos;est pas</h3>
            <p className="mt-2 text-sm text-red-800">Si vous cherchez uniquement de la théorie ou un support quotidien 1:1.</p>
          </article>
        </div>
      </section>

      <section id="exemple" className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-6 text-white sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className={`${headingClass} text-xs font-semibold uppercase tracking-[0.2em] text-amber-400`}>
                Aperçu gratuit · confidentialité préservée
              </p>
              <h2 className={`${headingClass} mt-2 text-2xl font-bold sm:text-3xl`}>
                Voir un exemple de Pack IA livré à un vrai client
              </h2>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                Audit business model, stratégie marketing, automatisations IA et landing page : la structure
                complète d&apos;un Pack livré, avec les données client floutées pour respecter notre engagement
                de confidentialité.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>✓ Les 4 livrables visibles dans leur format final</li>
                <li>✓ Données business et marques masquées</li>
                <li>✓ Aucun engagement · Désabonnement en 1 clic</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <UnlockPreviewGate
                variant="dark"
                redirectTo="/pack-ia/exemple"
                source="preview-pack-ia"
                buttonLabel="Voir l'exemple"
                inputId="pack-preview-gate-email"
              />
              <p className="mt-3 text-xs text-slate-400">
                En soumettant votre email, vous acceptez de recevoir occasionnellement des informations sur
                le Pack IA Master Prompt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Témoignages clients</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialBlock
              quote="Michaël a structuré ce que j'avais en tête et l'a rendu actionnable. Landing page, automatisations, prompts : tout est opérationnel."
              name="Julien M."
              role="Fondateur · The Nice Picnic"
              offer="Pack IA Activité"
            />
            <TestimonialBlock
              quote="Michaël a structuré la stratégie, développé le site et mis en place les outils IA qui font tourner l'agence."
              name="Dominic G."
              role="Fondateur · Cinémark Azur"
              offer="Accompagnement IA Transformation"
            />
            <TestimonialBlock
              quote="Nous avons structuré 13 ans de bricolage et je vais le transformer en véritable actif monétisable."
              name="Davide C."
              role="Plombier · Var"
              offer="Pack IA Activité"
              websiteUrl="https://cacouledesource.fr"
              websiteLabel="cacouledesource.fr"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6">
          <h2 className={`${headingClass} text-2xl font-bold`}>Le tarif</h2>
          <p className="mt-2 text-sm text-slate-700">
            <PriceFigure as="span" className="font-semibold text-slate-900">397€</PriceFigure> forfait, tout inclus,
            paiement sécurisé Stripe, facture TVA fournie.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>FAQ Pack</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-8 text-white">
          <h2 className={`${headingClass} text-3xl font-bold`}>
            Réserver mon Pack —{" "}
            <PriceFigure as="span" className="text-3xl font-bold text-white">
              397€
            </PriceFigure>
          </h2>
          <Link href={stripeLink} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy">
            Réserver mon Pack
          </Link>
        </div>
      </section>

      <section className="bg-[#0A1620] px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-amber-500`}>Continuité</p>
          <h3 className={`${headingClass} mt-2 text-2xl font-bold text-white sm:text-3xl`}>Votre Pack IA livré. Et après ?</h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            Les automatisations tournent sur une infrastructure. Le site a besoin d&apos;un hébergement. Le SEO demande de la régularité. Nos abonnements prennent le relais — à partir de 49€/mois.
          </p>
          <Link href="/abonnements" className="mt-5 inline-block text-sm font-semibold text-emerald-400 underline underline-offset-4">
            Voir les offres d&apos;abonnement →
          </Link>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6">
          <h3 className={`${headingClass} text-xl font-bold`}>Pas sûr de l&apos;offre qui vous correspond ?</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Link href="/formation" className="rounded-md border border-border px-4 py-3 text-sm">Formation</Link>
            <Link href="/pack-ia" className="rounded-md border border-border px-4 py-3 text-sm">Pack IA</Link>
            <Link href="/accompagnement" className="rounded-md border border-border px-4 py-3 text-sm">Accompagnement</Link>
          </div>
        </div>
      </section>
      <StickyBuyBar href={stripeLink} label="Pack IA Activité" priceLabel="397€ forfait" />
      <SiteFooter />
    </main>
  );
}
