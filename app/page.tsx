import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { AvatarStack } from "@/components/AvatarStack";
import { TestimonialsVideo } from "@/components/TestimonialsVideo";
import { EmailSignupBlock } from "@/components/landing/EmailSignupBlock";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });
const headingClass = `${syne.className} tracking-normal [font-stretch:100%] [font-kerning:normal]`;

const faqs = [
  {
    q: "Par quoi commencer ?",
    a: "Si vous voulez avancer seul à votre rythme, commencez par la Formation à 97€. Si vous voulez un livrable concret en 5 jours pour structurer votre activité, le Pack IA à 397€ est l'option directe. Si votre activité est déjà installée et que vous cherchez une transformation profonde sur 90 jours, l'Accompagnement se fait sur candidature.",
  },
  {
    q: "Faut-il connaître l'IA ?",
    a: "Non. La formation est conçue pour des entrepreneurs sans aucun background technique. La seule chose nécessaire : savoir utiliser un navigateur web. ChatGPT, Claude ou Gemini — la méthode PACO fonctionne avec n'importe quel modèle.",
  },
  {
    q: "Que couvre le Pack IA ?",
    a: "Livré en 5 jours ouvrés : un audit stratégique de votre activité, une landing page optimisée, 20 prompts métier personnalisés, 3 automatisations documentées (Zapier ou n8n), une session de travail de 60 minutes en visio, et un plan d'action sur 30 jours.",
  },
  {
    q: "Quelle politique de remboursement ?",
    a: "La Formation à 97€ est garantie satisfait ou remboursé pendant 14 jours, sans condition. Le Pack IA et l'Accompagnement, étant des prestations sur-mesure démarrées immédiatement, ne sont pas remboursables une fois la mission lancée — mais un appel de cadrage gratuit a lieu avant tout engagement.",
  },
  {
    q: "À qui s'adresse l'Accompagnement (niveau 3) ?",
    a: "Aux solopreneurs et dirigeants de TPE dont l'activité génère déjà du chiffre et qui veulent intégrer l'IA en profondeur dans leurs processus. Engagement de 90 jours, sessions hebdomadaires, accès WhatsApp direct, livrables sur-mesure. Sur candidature uniquement, places limitées.",
  },
  {
    q: "Délais de livraison ?",
    a: "Formation : accès immédiat après paiement, à vie. Pack IA : 5 jours ouvrés à partir du brief de cadrage. Accompagnement : démarrage sous 7 jours après acceptation de la candidature.",
  },
];

export const metadata: Metadata = {
  title: "Master Prompt | L'IA utile pour votre activité",
  description:
    "Maîtrisez l'IA pour votre activité avec la méthode PACO : Formation 97€, Pack IA 397€ et Accompagnement 90 jours. Résultats concrets dès la première semaine.",
  alternates: { canonical: "https://www.masterprompt.fr/" },
  openGraph: {
    title: "Master Prompt | L'IA utile pour votre activité",
    description:
      "Méthode PACO, Formation 97€, Pack IA 397€, Accompagnement 90 jours. Des résultats concrets pour votre activité dès la première semaine.",
    url: "https://www.masterprompt.fr/",
    type: "website",
    images: [
      {
        url: "https://www.masterprompt.fr/logo.png",
        width: 1200,
        height: 630,
        alt: "Master Prompt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Prompt | L'IA utile pour votre activité",
    description:
      "Méthode PACO, Formation 97€, Pack IA 397€, Accompagnement 90 jours. Des résultats concrets pour votre activité dès la première semaine.",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
};

export default function LandingPage() {
  const launchPriceActive = process.env.NEXT_PUBLIC_LAUNCH_PRICE_ACTIVE !== "false";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Master Prompt",
    url: "https://www.masterprompt.fr",
    logo: "https://www.masterprompt.fr/logo.png",
    founder: {
      "@type": "Person",
      name: "Michaël Lopez",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@masterprompt.fr",
      areaServed: "FR",
    },
  };

  return (
    <main className={`${dmSans.className} bg-ivory text-navy antialiased font-normal`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="bg-[#0A1620] px-4 py-14 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className={`${headingClass} mb-4 text-xs uppercase tracking-[0.2em] text-amber-500`}>Méthode PACO</p>
          <h1 className={`${headingClass} mb-4 text-3xl font-bold leading-[1.1] sm:text-4xl md:text-6xl`}>
            L&apos;IA qui travaille <span className="text-amber-500">vraiment</span> pour votre activité.
          </h1>
          <p className="mb-7 max-w-xl text-slate-300">
            Formation, Pack IA et accompagnement : choisissez le niveau adapté à votre situation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="#offres" className={`${headingClass} rounded-md bg-amber-500 px-6 py-3 text-center text-sm font-semibold text-navy`}>
              Découvrir les offres
            </Link>
            <Link href="#guide" className={`${headingClass} rounded-md border border-white/20 px-6 py-3 text-center text-sm`}>
              Guide gratuit
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <AvatarStack count={200} label="sur la liste d'attente" />
          <div className="flex flex-wrap gap-3 text-sm text-muted md:gap-5">
            <span>🎓 Formation 7 modules</span>
            <span>⚡ Pack livré en 5 jours</span>
            <span>🤖 Prompts métier personnalisés</span>
            <span>🛡️ Satisfaction garantie</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-blue-600`}>La méthode</p>
            <h2 className={`${headingClass} mt-2 text-3xl font-bold`}>PACO — la structure qui fait la différence</h2>
            <p className="mt-4 text-sm text-muted">
              Avant PACO, les prompts restent vagues. Avec PACO, vous donnez un cadre exploitable et l&apos;IA répond avec un résultat directement utilisable.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <h3 className={`${headingClass} text-sm font-semibold text-red-900`}>Avant : prompt vague</h3>
              <p className="mt-2 text-sm text-red-800">&quot;Écris-moi un email pour mon client.&quot;</p>
              <p className="mt-2 text-xs text-red-700">Résultat : générique, trop long, difficile à utiliser.</p>
            </article>
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <h3 className={`${headingClass} text-sm font-semibold text-emerald-900`}>Après : prompt PACO</h3>
              <p className="mt-2 text-sm text-emerald-800">
                Persona : conseiller commercial.<br />
                Action : rédiger un email de suivi.<br />
                Contexte : devis mariage, 80 personnes.<br />
                Output : 8 lignes, ton chaleureux, CTA appel.
              </p>
              <p className="mt-2 text-xs text-emerald-700">Résultat : clair, exploitable, prêt à envoyer.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="offres" className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <Link
            href="/formation"
            className="block rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
          >
            <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-muted`}>Niveau 1</p>
            <h3 className={`${headingClass} mt-2 text-2xl font-bold`}>Formation</h3>
            {launchPriceActive ? (
              <>
                <p className="mt-4 text-sm text-muted line-through">97€</p>
                <p className={`${headingClass} text-4xl font-bold text-amber-600`}>49€</p>
              </>
            ) : (
              <p className={`${headingClass} mt-4 text-4xl font-bold`}>97€</p>
            )}
          </Link>
          <Link
            href="/pack-ia"
            className="block rounded-2xl border border-amber-500 bg-navy p-6 text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(245,158,11,0.2)]"
          >
            <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-slate-500`}>Niveau 2</p>
            <h3 className={`${headingClass} mt-2 text-2xl font-bold`}>Pack IA Activité</h3>
            <p className={`${headingClass} mt-4 text-4xl font-bold text-amber-500`}>397€</p>
          </Link>
          <Link
            href="/accompagnement"
            className="block rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
          >
            <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-muted`}>Niveau 3</p>
            <h3 className={`${headingClass} mt-2 text-2xl font-bold`}>Accompagnement</h3>
            <p className={`${headingClass} mt-4 text-2xl font-bold`}>Sur candidature</p>
          </Link>
        </div>
      </section>

      <section id="guide" className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-blue-500/20 bg-[#0D2A4A] p-5 text-white sm:p-8">
          <h2 className={`${headingClass} text-2xl font-bold sm:text-3xl`}>10 prompts essentiels pour votre activité</h2>
          <p className="mb-5 mt-2 text-slate-300">Recevez le PDF gratuitement.</p>
          <div className="max-w-md">
            <EmailSignupBlock
              inputId="lead-magnet-v5"
              placeholder="votre@email.com"
              buttonText="Je reçois le guide"
              buttonGreen
              endpoint="/api/lead-magnet"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-2 text-3xl font-bold`}>Cas clients</h2>
          <p className="mb-6 max-w-2xl text-sm text-muted sm:text-base">
            Projets réels, exécution concrète. Accédez directement aux sites clients.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "The Nice Picnic", href: "https://thenicepicnic.com", domain: "thenicepicnic.com", tag: "Expérience premium" },
              { name: "Cinémark Azur", href: "https://cinemark-azur.com", domain: "cinemark-azur.com", tag: "Placement produit" },
              { name: "Douzième Homme", href: "https://douziemehomme-lejeu.com", domain: "douziemehomme-lejeu.com", tag: "Jeu & communauté" },
            ].map((item) => (
              <article
                key={item.name}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(15,23,42,0.12)]"
              >
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-500">{item.tag}</span>
                <Link href={item.href} target="_blank" rel="noreferrer noopener" className="mt-3 block rounded-xl border border-slate-200 bg-white p-4 transition-colors group-hover:border-blue-200">
                  <h3 className={`${headingClass} flex items-center justify-between text-lg font-semibold text-slate-900`}>
                    {item.name}
                    <span className="text-sm text-blue-600 transition-transform duration-200 group-hover:translate-x-1">↗</span>
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{item.domain}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Ils témoignent</h2>
          <TestimonialsVideo />
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-2xl bg-navy p-5 text-white sm:grid-cols-[180px,1fr] sm:gap-8 sm:p-8">
          <div className="mx-auto w-full max-w-[180px]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/20">
              <Image
                src="/avatars/michael-lopez-2026.png"
                alt="Michaël Lopez, fondateur de Master Prompt"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className={`${headingClass} text-2xl font-bold sm:text-3xl`}>Michaël Lopez</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
              <p>Pendant 25 ans, j&apos;ai créé et dirigé des entreprises dans des secteurs très différents : conception d&apos;espaces, immobilier, aménagement sur mesure, maîtrise d&apos;œuvre.</p>
              <p>À chaque fois, le même défi : faire plus avec moins. Moins de temps, moins de ressources, moins de marge d&apos;erreur.</p>
              <p>Quand l&apos;IA est arrivée, j&apos;ai fait comme tout le monde. J&apos;ai essayé. J&apos;ai été déçu. Les résultats étaient génériques, inutilisables, trop loin de la réalité d&apos;un entrepreneur.</p>
              <p>Puis j&apos;ai compris quelque chose que personne ne dit clairement : le problème, ce n&apos;est pas l&apos;IA. C&apos;est la façon dont on lui parle.</p>
              <p>Une fois que j&apos;ai maîtrisé la méthode, tout a changé. Emails de prospection, descriptions de services, comptes-rendus, plans d&apos;action : des tâches qui me prenaient 45 minutes se règlent en 5.</p>
              <p>J&apos;ai construit Master Prompt pour transmettre exactement cette méthode aux entrepreneurs et indépendants qui, comme moi, n&apos;ont pas de background technique mais ont des choses concrètes à accomplir.</p>
              <p className={`${headingClass} font-semibold text-white`}>7 modules. Zéro jargon. Des résultats dès la première semaine.</p>
              <p>
                Guide gratuit &quot;10 Prompts Essentiels&quot; :{" "}
                <Link href="https://www.masterprompt.fr" className="text-amber-300 underline underline-offset-4">
                  masterprompt.fr
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Questions fréquentes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-border bg-white p-5">
                <summary className="cursor-pointer text-sm font-semibold text-navy">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A1620] px-4 py-12 text-center text-white sm:px-6 sm:py-16">
        <h2 className={`${headingClass} text-3xl font-bold sm:text-4xl`}>Choisissez votre point d&apos;entrée</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/formation" className="rounded-md border border-white/20 px-5 py-3 text-sm">
            Formation — 49€ <span className="line-through text-white/60">97€</span>
          </Link>
          <Link href="/pack-ia" className="rounded-md bg-amber-500 px-5 py-3 text-sm font-bold text-navy">
            Pack IA — 397€
          </Link>
          <Link href="/accompagnement" className="rounded-md border border-white/20 px-5 py-3 text-sm">
            Accompagnement
          </Link>
        </div>
      </section>

      <footer className="bg-navy px-4 py-10 text-slate-400 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div>
            <p className={`${headingClass} text-sm font-semibold text-white`}>MASTER PROMPT</p>
            <p className="mt-2 text-sm">Formation, accompagnement et outils IA pour entrepreneurs.</p>
          </div>
          <div className="space-y-2 text-sm">
            <Link href="/formation" className="block">
              Formation — 49€ (97€)
            </Link>
            <Link href="/pack-ia" className="block">
              Pack IA — 397€
            </Link>
            <Link href="/abonnements" className="block">
              Abonnements
            </Link>
            <Link href="/accompagnement" className="block">
              Accompagnement
            </Link>
          </div>
          <div className="text-sm">
            <Link href="mailto:hello@masterprompt.fr" className="underline underline-offset-4 hover:text-white">
              hello@masterprompt.fr
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
