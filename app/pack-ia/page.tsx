import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { PresentationVideo } from "@/components/landing/PresentationVideo";
import { PackIADeliverablesSection } from "@/components/pack-ia/PackIADeliverablesSection";
import { PACK_IA_FAQ_DELIVERABLES, PACK_IA_TIMELINE } from "@/lib/pack-ia-offer";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PriceBadge } from "@/components/PriceBadge";
import { PriceFigure } from "@/components/PriceFigure";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppHelpSection, WhatsAppButton } from "@/components/WhatsAppContact";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });
const headingClass = `${syne.className} tracking-normal [font-stretch:100%] [font-kerning:normal]`;

const PACK_IA_VSL_URL =
  process.env.NEXT_PUBLIC_PACK_IA_VSL_URL ||
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/videos/pack-ia-vsl.mp4";

export const metadata: Metadata = {
  title: "Pack IA Activité 397€ — Livrables adaptés à votre profil | Master Prompt",
  description:
    "Audit, stratégie marketing, automatisations IA : socle identique pour tous. Audit site ou landing, prompts métier et lead magnet si pertinents — arbitrés au brief. Livré en 5 jours.",
  alternates: { canonical: "https://www.masterprompt.fr/pack-ia" },
  openGraph: {
    title: "Pack IA Activité 397€ — livrables adaptés à votre profil",
    description:
      "Socle stratégique + livrables web et acquisition ajustés selon votre site et votre modèle économique. Forfait 397€, 5 jours.",
    type: "website",
    url: "https://www.masterprompt.fr/pack-ia",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pack IA Activité 397€",
    description:
      "Livrables adaptés à votre profil : audit, stratégie, automatisations, site ou landing, prompts métier et lead magnet si pertinents.",
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
    PACK_IA_FAQ_DELIVERABLES,
    { question: "Quels sont les délais ?", answer: "5 jours ouvrés à partir du brief de cadrage." },
    { question: "Comment se passe le brief ?", answer: "Visio de 60 min dans les 24h après commande : on valide ensemble site existant ou non, pertinence des prompts métier et du lead magnet, et le périmètre exact des livrables." },
    { question: "Le Pack est-il remboursable ?", answer: "Non, prestation sur-mesure démarrée immédiatement. Mais l'appel de cadrage initial est gratuit." },
    {
      question: "Site existant ou landing — comment choisir ?",
      answer:
        "Simple : si vous avez déjà un site, on audite et on optimise. Si vous n'en avez pas, on livre une landing HTML prête à déployer. Jamais les deux en doublon.",
    },
    {
      question: "Et si les prompts métier ou le lead magnet ne sont pas prioritaires ?",
      answer:
        "On ne les force pas. L'effort est réalloué sur les automatisations, le contenu ou un autre levier identifié dans la stratégie marketing.",
    },
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

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-border bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-amber-600`}>Pack IA Activité</p>
            <h1 className={`${headingClass} mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl`}>
              Pack Lancement IA — On structure votre activité avec l&apos;IA en 5 jours
            </h1>
            <div className="mt-5">
              <PriceBadge currentPrice="397€" note="Forfait tout inclus" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={stripeLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-amber-400"
              >
                Réserver mon Pack
              </Link>
              <Link
                href="/pack-ia/exemple"
                className="inline-block rounded-md border border-border bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
              >
                Voir le modèle de livraison
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted">Paiement sécurisé Stripe · Livraison en 5 jours ouvrés · Facture TVA</p>
          </div>

          <div className="lg:w-[360px]">
            <PresentationVideo
              src={PACK_IA_VSL_URL}
              caption="2 min — Présentation du Pack IA par Michaël Lopez"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6 text-sm text-slate-700">
          Vous avez compris l&apos;IA, mais vous ne savez pas par où commencer pour votre activité ? Le Pack IA
          vous donne un plan clair et des livrables prêts à l&apos;emploi en 5 jours —{" "}
          <strong>adaptés à votre profil</strong> (site existant ou non, prompts métier et lead magnet si pertinents).
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <PackIADeliverablesSection headingClass={headingClass} />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Déroulé jour par jour</h2>
          <div className="grid gap-4 md:grid-cols-5">
            {PACK_IA_TIMELINE.map((item) => (
              <article key={item.day} className="rounded-xl border border-border bg-white p-4 text-sm text-slate-700">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{item.day}</p>
                <p className={`${headingClass} mt-1 font-semibold text-navy`}>{item.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.detail}</p>
              </article>
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
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className={`${headingClass} text-xs font-semibold uppercase tracking-[0.2em] text-amber-400`}>
                Modèle public · consultable sans inscription
              </p>
              <h2 className={`${headingClass} mt-2 text-2xl font-bold sm:text-3xl`}>
                Voir le modèle de livraison Pack IA complet
              </h2>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                Modèle complet sur un cas où site, prompts métier et lead magnet étaient pertinents (artisan premium).
                Votre Pack réel peut différer : audit site <em>ou</em> landing, prompts et lead magnet seulement si
                adapté à votre modèle — arbitré au brief.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>✓ Socle + livrables adaptatifs consultables en entier</li>
                <li>✓ Cas type plomberie / rénovation SDB</li>
                <li>✓ Accès direct, sans email ni espace privé</li>
              </ul>
            </div>
            <Link
              href="/pack-ia/exemple"
              className="inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy shadow-sm transition hover:bg-amber-400"
            >
              Consulter le modèle
            </Link>
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
            <TestimonialBlock
              quote="Nous avons créé un tunnel de vente et une structure complète pour gérer les intervenants de façon hyper pro."
              name="Audrey"
              role="Fondatrice · Samsara Yoga Camp"
              offer="Pack IA Activité"
              websiteUrl="https://samsarayogacamp.com"
              websiteLabel="samsarayogacamp.com"
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
          <p className="mt-2 text-sm text-slate-600">
            Décrivez votre activité en deux lignes — je vous dis si le Pack IA est le bon choix.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <WhatsAppButton context="pack-ia" label="Question sur WhatsApp" variant="primary" />
            <Link href="/formation" className="rounded-md border border-border px-4 py-3 text-sm">Formation</Link>
            <Link href="/accompagnement" className="rounded-md border border-border px-4 py-3 text-sm">Accompagnement</Link>
          </div>
        </div>
      </section>

      <WhatsAppHelpSection
        context="pack-ia"
        title="Une question sur le Pack IA ?"
        description="Délais, contenu des livrables, compatibilité avec votre activité — réponse rapide sur WhatsApp avant de réserver."
      />
      <StickyBuyBar href={stripeLink} label="Pack IA Activité" priceLabel="397€ forfait" />
      <SiteFooter />
    </main>
  );
}
