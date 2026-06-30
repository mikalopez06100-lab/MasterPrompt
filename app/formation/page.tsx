import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { PriceBadge } from "@/components/PriceBadge";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PresentationVideo } from "@/components/landing/PresentationVideo";
import { UnlockPreviewGate } from "@/components/landing/UnlockPreviewGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppHelpSection, WhatsAppButton } from "@/components/WhatsAppContact";
import { PriceFigure } from "@/components/PriceFigure";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Formation Master Prompt — 49€ · Maîtriser l'IA en 7 modules",
  description:
    "Formation à 49€ au lieu de 97€. 7 modules + 1 bonus, méthode PACO, accès à vie, garantie 14 jours satisfait ou remboursé.",
  alternates: { canonical: "https://www.masterprompt.fr/formation" },
  openGraph: {
    title: "Formation Master Prompt — Maîtriser l'IA en 7 modules",
    description:
      "7 modules, méthode PACO, 300 prompts métier. Accès à vie, garantie 14 jours.",
    type: "website",
    url: "https://www.masterprompt.fr/formation",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation Master Prompt — 49€",
    description:
      "7 modules, méthode PACO, 300 prompts métier. Accès à vie, garantie 14 jours.",
    images: ["https://www.masterprompt.fr/logo.png"],
  },
};

export default function FormationPage() {
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK_FORMATION || "/billing";
  const presentationVideoUrl = process.env.NEXT_PUBLIC_PRESENTATION_VIDEO_URL || "";
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formation Master Prompt",
    description:
      "Formation en 7 modules pour maîtriser la méthode PACO et utiliser l'IA dans son activité.",
    provider: {
      "@type": "Organization",
      name: "Master Prompt",
      url: "https://www.masterprompt.fr",
    },
  };

  const faqItems = [
    {
      question: "Comment accéder à la formation après achat ?",
      answer:
        "Après paiement Stripe, connectez-vous avec la même adresse email sur masterprompt.fr. Votre espace formation (7 modules, bibliothèque, quiz, éditeur) est débloqué immédiatement.",
    },
    {
      question: "Avec quelle IA ça fonctionne ?",
      answer: "Toutes : ChatGPT, Claude, Gemini, Mistral. La méthode PACO est universelle.",
    },
    {
      question: "Quelle politique de remboursement ?",
      answer: "Garantie satisfait ou remboursé pendant 14 jours après achat, sans condition.",
    },
    {
      question: "L'accès est-il limité dans le temps ?",
      answer:
        "Non. Les vidéos et l'espace formation restent accessibles à vie. Le correcteur PACO est inclus 3 mois, puis optionnel à 4,90 €/mois.",
    },
  ];

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Formation</span>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-border bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-blue-600">Niveau 1</p>
            <h1 className={`${syne.className} mt-2 text-3xl font-bold sm:text-5xl`}>La Formation Master Prompt</h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              7 modules pour passer de l&apos;IA frustrante à l&apos;IA qui livre.
            </p>
            <div className="mt-6">
              <PriceBadge currentPrice="49€" originalPrice="97€" note="Accès à vie" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={stripeLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy"
              >
                Commander à 49€
              </Link>
              <Link
                href="#apercu"
                className="inline-block rounded-md border border-border bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
              >
                Voir l&apos;espace formation
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted">Paiement sécurisé Stripe · Accès immédiat · Garantie 14 jours</p>
          </div>

          {presentationVideoUrl && (
            <div className="lg:w-[360px]">
              <PresentationVideo src={presentationVideoUrl} />
            </div>
          )}
        </div>
      </section>

      <section id="apercu" className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-6 text-white sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className={`${syne.className} text-xs font-semibold uppercase tracking-[0.2em] text-amber-400`}>
                Aperçu gratuit
              </p>
              <h2 className={`${syne.className} mt-2 text-2xl font-bold sm:text-3xl`}>
                Découvrez l&apos;espace formation avant d&apos;acheter
              </h2>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                7 modules vidéo, 300 prompts métier, exercices, éditeur intelligent. Entrez votre
                email et visitez l&apos;espace membre en mode aperçu — vous verrez exactement ce que
                vous obtiendrez après commande.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>✓ Navigation libre dans tous les onglets</li>
                <li>✓ Aperçu détaillé des 7 modules et de la bibliothèque</li>
                <li>✓ Zéro engagement · Désabonnement en 1 clic</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <UnlockPreviewGate variant="dark" />
              <p className="mt-3 text-xs text-slate-400">
                En soumettant votre email, vous acceptez de recevoir occasionnellement des
                informations sur la formation Master Prompt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            "Solopreneur : vous voulez produire plus vite et mieux.",
            "Consultant-coach : vous voulez structurer vos livrables clients.",
            "Artisan-prestataire : vous voulez gagner du temps sur les tâches répétitives.",
          ].map((text) => (
            <article key={text} className="rounded-xl border border-border bg-white p-5 text-sm text-slate-700">
              {text}
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${syne.className} mb-6 text-3xl font-bold`}>Le programme</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Module 1 — Comprendre l'IA et le Prompt Engineering", "Comment fonctionnent vraiment les LLMs, pourquoi vos prompts actuels échouent, ce que l'IA peut et ne peut pas faire."],
              ["Module 2 — La méthode PACO", "Le seul framework dont vous avez besoin. Persona, Action, Contexte, Output appliqués à votre quotidien."],
              ["Module 3 — Communication & Marketing", "Emails, posts, pages de vente, newsletters, biographies. Templates réutilisables."],
              ["Module 4 — Gestion & Productivité", "Devis, comptes-rendus, plans d'action, analyse de données, organisation du temps."],
              ["Module 5 — Ateliers pratiques", "Application sur des cas réels avec retour immédiat. De la pratique pure, pas de théorie."],
              ["Module 6 — Enchaînements IA, vers l'automatisation", "Combiner plusieurs prompts pour créer des flux de travail. Le module différenciant."],
              ["Module 7 — Éthique, RGPD et veille continue", "Ce qu'on ne doit jamais confier à une IA. Protection des données, hallucinations, risques légaux."],
              ["Module 8 bonus — Comment devenir l'entreprise que l'IA recommande", "Positionnement, contenus et signaux de confiance pour être recommandé par ChatGPT, Perplexity et les moteurs de demain."],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-base font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-sm text-muted">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className={`${syne.className} text-xl font-bold text-red-900`}>SANS méthode PACO</h2>
            <p className="mt-2 text-sm text-red-800">Prompt vague : &quot;Écris-moi un email pour mon client.&quot;</p>
          </article>
          <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className={`${syne.className} text-xl font-bold text-emerald-900`}>Prompt PACO</h3>
            <p className="mt-2 text-sm text-emerald-800">Persona + Action + Contexte + Output = résultat exploitable.</p>
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-white p-5">
            <h2 className={`${syne.className} text-xl font-bold`}>Ce qui est inclus</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {["7 modules vidéo + 1 bonus", "300 prompts métier", "Quiz", "Exercices", "Accès à vie aux vidéos et à l'espace", "Correcteur PACO — 3 mois inclus, puis 4,90 €/mois"].map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border border-border bg-white p-5">
            <h3 className={`${syne.className} text-xl font-bold`}>Ce qui n&apos;est pas inclus</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>✗ Accompagnement personnalisé</li>
              <li>✗ Livrables sur-mesure</li>
              <li>✗ Support 1:1</li>
            </ul>
            <Link href="/pack-ia" className="mt-4 inline-block text-sm font-semibold text-blue-700 underline">
              Besoin de sur-mesure ? Voir le Pack IA
            </Link>
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <TestimonialBlock
            quote="Avant, je perdais du temps sur mes relances et mes programmes. Maintenant j'ai des prompts calibrés à mon activité, je vais plus vite et mes messages sont beaucoup plus clairs."
            name="Mathieu S."
            role="Coach sportif · Entraîneur de snowboard"
            offer="Formation + Pack IA"
          />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${syne.className} mb-6 text-3xl font-bold`}>FAQ Formation</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-emerald-300 bg-emerald-50 p-6">
          <h2 className={`${syne.className} text-2xl font-bold text-emerald-900`}>Garantie satisfait ou remboursé 14 jours</h2>
          <p className="mt-2 text-sm text-emerald-800">
            Si la formation ne vous convient pas, remboursement intégral dans les 14 jours suivant votre achat, sans justification.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-8 text-white">
          <h2 className={`${syne.className} text-3xl font-bold`}>
            Commander à{" "}
            <PriceFigure as="span" className="text-3xl font-bold text-amber-400 sm:text-4xl">
              49€
            </PriceFigure>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            <PriceFigure as="span" className="line-through text-slate-400">97€</PriceFigure>{" "}
            · Accès immédiat · Accès à vie
          </p>
          <Link href={stripeLink} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy">
            Commander maintenant
          </Link>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6">
          <h3 className={`${syne.className} text-xl font-bold`}>Pas sûr de l&apos;offre qui vous correspond ?</h3>
          <p className="mt-2 text-sm text-slate-600">
            Formation seule ou Pack IA sur-mesure — décrivez votre situation, je vous oriente.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <WhatsAppButton context="formation" label="Question sur WhatsApp" />
            <Link href="/pack-ia" className="rounded-md border border-border px-4 py-3 text-sm">Pack IA</Link>
            <Link href="/accompagnement" className="rounded-md border border-border px-4 py-3 text-sm">Accompagnement</Link>
          </div>
        </div>
      </section>

      <WhatsAppHelpSection
        context="formation"
        title="Une question sur la formation ?"
        description="Accès, contenu des modules, garantie remboursement — je réponds sur WhatsApp."
      />
      <StickyBuyBar href={stripeLink} label="Formation Master Prompt" priceLabel="49€" />
      <SiteFooter />
    </main>
  );
}
