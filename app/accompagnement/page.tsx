import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { DeliverableCard } from "@/components/DeliverableCard";
import { AccompagnementApplicationForm } from "@/components/AccompagnementApplicationForm";
import { FAQAccordion } from "@/components/FAQAccordion";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Accompagnement IA 90 jours — Transformation business sur-mesure | Master Prompt",
  description:
    "Programme 90 jours, sessions hebdo, WhatsApp direct, livrables sur-mesure. Sur candidature.",
  alternates: { canonical: "https://www.masterprompt.fr/accompagnement" },
  openGraph: {
    title: "Accompagnement IA 90 jours — sur candidature",
    description:
      "Programme 90 jours, sessions hebdo, WhatsApp direct, livrables sur-mesure.",
    type: "website",
    url: "https://www.masterprompt.fr/accompagnement",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accompagnement IA 90 jours",
    description:
      "Transformation business sur-mesure avec l'IA. Sur candidature.",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
};

export default function AccompagnementPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Accompagnement IA 90 jours",
    provider: { "@type": "Organization", name: "Master Prompt" },
  };

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className={syne.className}>
        <Navbar />
      </div>
      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Accompagnement</span>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-white p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600">Niveau 3</p>
          <h1 className={`${syne.className} mt-2 text-3xl font-bold sm:text-5xl`}>
            Accompagnement 90 jours — Transformez votre activité avec l'IA
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Programme sur candidature pour dirigeants et solopreneurs qui veulent intégrer l&apos;IA en profondeur.
          </p>
          <a href="#candidature" className="mt-6 inline-block rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white">
            Candidater
          </a>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6 text-sm text-slate-700">
          Pour les activités déjà en croissance (équipe 0 à 5 personnes), avec une volonté d&apos;implémenter l&apos;IA dans les process commerciaux, marketing et opérationnels.
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${syne.className} mb-6 text-3xl font-bold`}>Ce qui est inclus</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DeliverableCard icon="🗓️" title="Sessions hebdo visio" description="Suivi opérationnel semaine après semaine." />
            <DeliverableCard icon="💬" title="Accès WhatsApp direct" description="Support court et réactif entre les sessions." />
            <DeliverableCard icon="🧩" title="Livrables sur-mesure" description="Documents, templates et assets adaptés à votre activité." />
            <DeliverableCard icon="⚙️" title="Automatisations implémentées" description="Workflows configurés et testés sur vos cas réels." />
            <DeliverableCard icon="📊" title="Pilotage 90 jours" description="Objectifs, indicateurs et priorités par phase." />
            <DeliverableCard icon="🎯" title="Autonomisation" description="Vous repartez avec une méthode durable." />
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            "Mois 1 — Diagnostic : cartographie des process et priorités business.",
            "Mois 2 — Implémentation : livrables, automatisations et routines.",
            "Mois 3 — Autonomisation : montée en compétence et stabilisation.",
          ].map((item) => (
            <article key={item} className="rounded-xl border border-border bg-white p-5 text-sm text-slate-700">{item}</article>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6">
          <h2 className={`${syne.className} text-2xl font-bold`}>Étude de cas — Cinémark Azur</h2>
          <p className="mt-2 text-sm text-slate-700"><strong>Avant :</strong> process commercial dispersé et production irrégulière.</p>
          <p className="mt-2 text-sm text-slate-700"><strong>Pendant :</strong> mise en place du site, automatisations et prompts structurés.</p>
          <p className="mt-2 text-sm text-slate-700"><strong>Après :</strong> exécution plus rapide et pilotage plus clair.</p>
          <Link href="https://cinemark-azur.com" target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-blue-700 underline">
            Voir cinemark-azur.com
          </Link>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6 text-sm text-slate-700">
          Durée : 90 jours. Places limitées (3 clients simultanés max). Tarif communiqué après appel de cadrage.
        </div>
      </section>

      <section id="candidature" className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${syne.className} mb-6 text-3xl font-bold`}>Formulaire de candidature</h2>
          <AccompagnementApplicationForm />
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${syne.className} mb-6 text-3xl font-bold`}>FAQ Accompagnement</h2>
          <FAQAccordion
            items={[
              {
                question: "À qui s'adresse ce programme ?",
                answer: "Aux dirigeants et solopreneurs avec activité déjà lancée, qui veulent intégrer l'IA en profondeur.",
              },
              {
                question: "Quel est l'engagement ?",
                answer: "90 jours, sessions hebdomadaires, livrables et suivi opérationnel.",
              },
              {
                question: "Comment candidater ?",
                answer: "Via le formulaire ci-dessus. Retour sous 48h.",
              },
            ]}
          />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6">
          <h3 className={`${syne.className} text-xl font-bold`}>Pas encore prêt ? Découvrez le Pack IA</h3>
          <Link href="/pack-ia" className="mt-4 inline-block rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white">
            Voir le Pack IA à 397€
          </Link>
        </div>
      </section>
    </main>
  );
}
