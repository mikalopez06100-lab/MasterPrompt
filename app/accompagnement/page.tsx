import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { DeliverableCard } from "@/components/DeliverableCard";
import { AccompagnementApplicationForm } from "@/components/AccompagnementApplicationForm";
import { PresentationVideo } from "@/components/landing/PresentationVideo";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppHelpSection, WhatsAppButton } from "@/components/WhatsAppContact";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });
const headingClass = `${syne.className} tracking-normal`;

const VSL_URL =
  process.env.NEXT_PUBLIC_ACCOMPAGNEMENT_VSL_URL ||
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/videos/accompagnement-vsl.mp4";

export const metadata: Metadata = {
  title: "Accompagnement IA 90 jours — Transformation sur-mesure | Master Prompt",
  description:
    "Programme 90 jours pour intégrer l'IA dans votre business : sessions hebdo, WhatsApp direct, automatisations et livrables sur-mesure. Places limitées.",
  alternates: { canonical: "https://www.masterprompt.fr/accompagnement" },
  openGraph: {
    title: "Accompagnement IA 90 jours — sur candidature",
    description: "Transformez votre activité avec l'IA. Programme 90 jours, places limitées.",
    type: "website",
    url: "https://www.masterprompt.fr/accompagnement",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
};

const PAIN_POINTS = [
  "Vous utilisez l'IA en mode brouillon — sans impact mesurable sur le CA ou le temps gagné.",
  "Vos process (devis, suivi client, contenu) restent manuels et chronophages.",
  "Vous voulez passer du stade « j'ai testé ChatGPT » à « l'IA tourne dans mon activité ».",
];

const IDEAL_FOR = [
  "Dirigeant ou solopreneur avec activité déjà lancée",
  "Équipe de 0 à 5 personnes",
  "CA en croissance, prêt à investir 90 jours",
  "Volonté d'implémenter — pas juste de consommer de la théorie",
];

const MONTHS = [
  {
    label: "Mois 1",
    title: "Diagnostic & priorisation",
    body: "Cartographie de vos process, identification des leviers IA à fort ROI, plan d'action 90 jours.",
  },
  {
    label: "Mois 2",
    title: "Implémentation",
    body: "Livrables sur-mesure, automatisations configurées, prompts et workflows testés sur vos cas réels.",
  },
  {
    label: "Mois 3",
    title: "Autonomisation",
    body: "Montée en compétence de votre équipe, stabilisation des routines, passage en mode autonome.",
  },
];

const CASE_STUDIES = [
  {
    name: "Cinémark Azur",
    sector: "Placement produit · Cinéma indépendant · PACA",
    url: "https://cinemark-azur.com",
    urlLabel: "cinemark-azur.com",
    avant:
      "Process commercial dispersé, production irrégulière et peu de visibilité sur les opportunités en cours.",
    pendant:
      "Création d'une plateforme de présentation des films et des partenaires avec back-office complet, agent de lecture de scripts, CRM et automatisations pour l'envoi de propositions commerciales.",
    apres:
      "Exécution plus rapide, pipeline commercial structuré et pilotage clair des productions et des marques.",
  },
  {
    name: "HelioToit Énergie",
    sector: "Photovoltaïque · Villas haut de gamme · Côte d'Azur",
    url: "https://xn--heliotoitnergie-jnb.com/",
    urlLabel: "heliotoiténergie.com",
    avant:
      "Image de marque peu différenciée, devis et rapports rédigés à la main, peu de supports commerciaux structurés.",
    pendant:
      "Refonte totale de l'image de marque, site vitrine, supports de communication, agent pour l'édition de rapports et automatisation de la rédaction de devis.",
    apres:
      "Positionnement premium cohérent, cycle commercial accéléré et livrables clients générés en quelques minutes.",
  },
] as const;

export default function AccompagnementPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Accompagnement IA 90 jours",
    provider: { "@type": "Organization", name: "Master Prompt" },
  };

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy antialiased`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Accompagnement</span>
        </div>
      </section>

      {/* Hero + VSL — même pattern que /formation */}
      <section id="vsl" className="px-4 pb-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-border bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-amber-600`}>
              Niveau 3 · Accompagnement
            </p>
            <h1 className={`${headingClass} mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl`}>
              Intégrez l&apos;IA dans votre activité —{" "}
              <span className="text-amber-600">en 90 jours</span>, pas en 9 mois
            </h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              Sessions hebdo, WhatsApp direct, livrables et automatisations sur-mesure. Un programme
              intensif pour les dirigeants qui veulent des résultats concrets — pas une formation de plus.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/appel"
                className={`${headingClass} inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-amber-400`}
              >
                Réserver un appel discovery →
              </Link>
              <a
                href="#candidature"
                className="inline-block rounded-md border border-border bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
              >
                Candidater par formulaire
              </a>
            </div>
            <p className="mt-3 text-xs text-muted">
              3 places simultanées max · Tarif communiqué après l&apos;appel de cadrage
            </p>
          </div>

          <div className="lg:w-[360px]">
            <PresentationVideo
              src={VSL_URL}
              caption="3 min — Présentation de l'accompagnement par Michaël Lopez"
            />
          </div>
        </div>
      </section>

      {/* Pain + ideal */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className={`${headingClass} text-xl font-bold`}>Vous vous reconnaissez ?</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {PAIN_POINTS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-amber-600" aria-hidden>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-8">
            <h2 className={`${headingClass} text-xl font-bold`}>Profil idéal</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {IDEAL_FOR.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-emerald-600" aria-hidden>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Inclus */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-2 text-3xl font-bold`}>Ce qui est inclus</h2>
          <p className="mb-6 text-sm text-muted">Tout est sur-mesure — rien de générique.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DeliverableCard icon="🗓️" title="Sessions hebdo visio" description="1h par semaine — suivi opérationnel, pas du blabla." />
            <DeliverableCard icon="💬" title="WhatsApp direct" description="Réponses courtes entre les sessions quand ça bloque." />
            <DeliverableCard icon="🧩" title="Livrables sur-mesure" description="Documents, templates et assets adaptés à votre métier." />
            <DeliverableCard icon="⚙️" title="Automatisations live" description="Workflows configurés et testés sur vos vrais cas." />
            <DeliverableCard icon="📊" title="Pilotage 90 jours" description="Objectifs, KPIs et priorités par phase." />
            <DeliverableCard icon="🎯" title="Autonomisation" description="Vous repartez avec une méthode — pas une dépendance." />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-8 text-center text-3xl font-bold`}>Les 90 jours, étape par étape</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {MONTHS.map((m, i) => (
              <article key={m.label} className="relative rounded-2xl border border-border bg-ivory p-6">
                <span className={`${headingClass} text-xs font-bold uppercase tracking-wider text-amber-600`}>
                  {m.label}
                </span>
                <h3 className={`${headingClass} mt-2 text-lg font-bold`}>{m.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{m.body}</p>
                {i < MONTHS.length - 1 ? (
                  <span className="absolute -right-3 top-1/2 hidden text-2xl text-slate-300 md:block" aria-hidden>
                    →
                  </span>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Études de cas */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className={`${headingClass} text-center text-xs uppercase tracking-[0.2em] text-amber-600`}>
            Études de cas
          </p>
          <h2 className={`${headingClass} mt-2 text-center text-3xl font-bold`}>
            Ce qu&apos;on a mis en place
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.name}
                className="rounded-2xl border border-border bg-navy p-6 text-white sm:p-8"
              >
                <p className="text-xs text-slate-400">{study.sector}</p>
                <h3 className={`${headingClass} mt-1 text-xl font-bold sm:text-2xl`}>{study.name}</h3>
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">Avant</p>
                    <p className="mt-1 text-sm text-slate-300">{study.avant}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-amber-400">Pendant</p>
                    <p className="mt-1 text-sm text-slate-200">{study.pendant}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">Après</p>
                    <p className="mt-1 text-sm text-slate-300">{study.apres}</p>
                  </div>
                </div>
                <Link
                  href={study.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-block text-sm font-semibold text-amber-400 underline underline-offset-4 hover:text-amber-300"
                >
                  Voir {study.urlLabel} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-amber-400/40 bg-amber-50 p-8 text-center">
          <h2 className={`${headingClass} text-2xl font-bold sm:text-3xl`}>
            Réservez votre appel de cadrage
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            30 minutes pour voir si l&apos;accompagnement correspond à votre situation. Sans engagement.
          </p>
          <Link
            href="/appel"
            className={`${headingClass} mt-6 inline-block rounded-md bg-amber-500 px-8 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:bg-amber-400`}
          >
            Choisir un créneau — 30 min
          </Link>
          <p className="mt-4 text-xs text-muted">
            Préférez WhatsApp ?{" "}
            <WhatsAppButton context="accompagnement" label="Écrire ici" variant="compact" className="inline-flex align-middle" />
          </p>
        </div>
      </section>

      {/* Candidature */}
      <section id="candidature" className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-2 text-3xl font-bold`}>Candidature écrite</h2>
          <p className="mb-6 max-w-2xl text-sm text-slate-600">
            Vous préférez nous écrire avant l&apos;appel ? Remplissez le formulaire — réponse sous 48h.
          </p>
          <AccompagnementApplicationForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Questions fréquentes</h2>
          <FAQAccordion
            items={[
              {
                question: "À qui s'adresse ce programme ?",
                answer:
                  "Aux dirigeants et solopreneurs avec une activité déjà lancée (0 à 5 personnes), qui veulent intégrer l'IA en profondeur dans leurs process — pas juste tester des outils.",
              },
              {
                question: "Quel est l'engagement ?",
                answer:
                  "90 jours, une session visio par semaine, livrables et automatisations sur-mesure, accès WhatsApp entre les sessions.",
              },
              {
                question: "Comment démarrer ?",
                answer:
                  "Réservez un appel discovery (30 min) via le bouton ci-dessus, ou remplissez le formulaire de candidature. On valide ensemble l'adéquation avant de démarrer.",
              },
              {
                question: "Quel est le tarif ?",
                answer:
                  "Communiqué après l'appel de cadrage, en fonction de votre situation et du périmètre. Le Pack IA (397€) est déductible si vous passez à l'accompagnement dans les 30 jours.",
              },
            ]}
          />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6">
          <h3 className={`${headingClass} text-xl font-bold`}>Pas encore prêt pour 90 jours ?</h3>
          <p className="mt-2 text-sm text-slate-600">
            Commencez par le Pack IA — livrables en 5 jours, forfait 397€.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/pack-ia" className="inline-block rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white">
              Voir le Pack IA — 397€
            </Link>
            <WhatsAppButton context="accompagnement" label="Discuter sur WhatsApp" variant="outline" />
          </div>
        </div>
      </section>

      <WhatsAppHelpSection
        context="accompagnement"
        title="Une question avant de réserver ?"
        description="Éligibilité, format, disponibilité — contact direct sur WhatsApp."
      />
      <SiteFooter />
    </main>
  );
}
