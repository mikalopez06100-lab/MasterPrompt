import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { PriceBadge } from "@/components/PriceBadge";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PreorderBadge } from "@/components/PreorderBadge";
import { CountdownBanner } from "@/components/CountdownBanner";
import { PresentationVideo } from "@/components/landing/PresentationVideo";
import { UnlockPreviewGate } from "@/components/landing/UnlockPreviewGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PriceFigure } from "@/components/PriceFigure";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Formation Master Prompt — Précommande 49€ · Accès 1er juin 2026",
  description:
    "Précommande à 49€ au lieu de 97€. 7 modules, méthode PACO, livraison garantie le 1er juin 2026 avec remboursement intégral si non-livrée.",
  alternates: { canonical: "https://www.masterprompt.fr/formation" },
  openGraph: {
    title: "Formation Master Prompt — Maîtriser l'IA en 7 modules",
    description:
      "7 modules, méthode PACO, 300 prompts métier. Accès à vie, garantie 14 jours.",
    type: "website",
    url: "https://www.masterprompt.fr/formation",
    images: ["https://www.masterprompt.fr/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation Master Prompt — 49€ lancement",
    description:
      "7 modules, méthode PACO, 300 prompts métier. Accès à vie, garantie 14 jours.",
    images: ["https://www.masterprompt.fr/logo.jpg"],
  },
};

export default function FormationPage() {
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK_FORMATION || "/billing";
  const promoEndDate = process.env.NEXT_PUBLIC_PROMO_END_DATE || "31/05/2026";
  const launchPriceActive = process.env.NEXT_PUBLIC_LAUNCH_PRICE_ACTIVE !== "false";
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
      question: "Qu'est-ce qu'une précommande ?",
      answer:
        "Vous payez maintenant au tarif préférentiel 49€ (au lieu de 97€ au lancement officiel) et recevez un accès complet à la formation le 1er juin 2026 par email.",
    },
    {
      question: "Pourquoi cette logique de précommande ?",
      answer:
        "Les 7 modules vidéo sont en cours de finalisation. Précommander permet de bloquer le tarif -49% et de faire partie des premiers apprenants, avec des teasers exclusifs chaque semaine jusqu'à l'accès.",
    },
    {
      question: "Et si la formation n'est pas livrée le 1er juin ?",
      answer:
        "Remboursement intégral automatique, sans justification à fournir. Votre paiement est sécurisé par Stripe.",
    },
    {
      question: "Avec quelle IA ça fonctionne ?",
      answer: "Toutes : ChatGPT, Claude, Gemini, Mistral. La méthode PACO est universelle.",
    },
    {
      question: "Quelle politique de remboursement après livraison ?",
      answer: "Garantie satisfait ou remboursé pendant 14 jours après accès, sans condition.",
    },
  ];

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <div className={syne.className}>
        <Navbar />
      </div>
      <CountdownBanner endDate={promoEndDate} />

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Formation</span>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-border bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <PreorderBadge />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-blue-600">Niveau 1</p>
            <h1 className={`${syne.className} mt-2 text-3xl font-bold sm:text-5xl`}>La Formation Master Prompt</h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              7 modules pour passer de l&apos;IA frustrante à l&apos;IA qui livre.
            </p>
            <div className="mt-6">
              <PriceBadge
                currentPrice={launchPriceActive ? "49€" : "97€"}
                originalPrice={launchPriceActive ? "97€" : undefined}
                note="Accès à vie"
              />
            </div>
            <p className="mt-2 text-sm text-amber-700">Lancement — fin du tarif promo le {promoEndDate}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={stripeLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy"
              >
                Précommander à {launchPriceActive ? "49€" : "97€"}
              </Link>
              <Link
                href="#apercu"
                className="inline-block rounded-md border border-border bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-50"
              >
                Voir l&apos;espace formation
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted">Paiement sécurisé Stripe · Accès 1er juin 2026 · Remboursement garanti</p>
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
                Découvrez l&apos;espace formation avant tout le monde
              </h2>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                7 modules vidéo, 300 prompts métier, exercices, éditeur intelligent. Entrez votre
                email et visitez l&apos;espace membre en mode aperçu — vous verrez exactement ce que
                vous obtiendrez le 1er juin 2026.
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

      <section className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-amber-300 bg-amber-50 p-6">
          <h2 className={`${syne.className} text-2xl font-bold text-amber-900`}>Transparence précommande</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <article className="rounded-lg bg-white p-4 text-sm text-slate-700">
              <strong>Pourquoi précommander ?</strong>
              <p className="mt-1">Tarif -49% réservé aux précommandants, avec accès prioritaire.</p>
            </article>
            <article className="rounded-lg bg-white p-4 text-sm text-slate-700">
              <strong>Quand vais-je recevoir la formation ?</strong>
              <p className="mt-1">Le 1er juin 2026 par email, avec identifiants et accès complet.</p>
            </article>
            <article className="rounded-lg bg-white p-4 text-sm text-slate-700">
              <strong>Et si la formation n&apos;est pas livrée ?</strong>
              <p className="mt-1">Remboursement intégral automatique, sans justification.</p>
            </article>
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
              {["7 modules vidéo", "300 prompts métier", "Quiz", "Exercices", "Accès à vie", "Mises à jour"].map((item) => (
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
          <h2 className={`${syne.className} text-2xl font-bold text-emerald-900`}>Garantie livraison + remboursement 14 jours</h2>
          <p className="mt-2 text-sm text-emerald-800">
            Livraison garantie le 1er juin 2026. En cas de retard, remboursement intégral automatique. Après accès, vous conservez la garantie 14 jours satisfait ou remboursé.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-8 text-white">
          <h2 className={`${syne.className} text-3xl font-bold`}>
            Précommander à{" "}
            <PriceFigure as="span" className="text-3xl font-bold text-amber-400 sm:text-4xl">
              {launchPriceActive ? "49€" : "97€"}
            </PriceFigure>
          </h2>
          <Link href={stripeLink} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy">
            Précommander maintenant
          </Link>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-white p-6">
          <h3 className={`${syne.className} text-xl font-bold`}>Pas sûr de l&apos;offre qui vous correspond ?</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Link href="/formation" className="rounded-md border border-border px-4 py-3 text-sm">Formation</Link>
            <Link href="/pack-ia" className="rounded-md border border-border px-4 py-3 text-sm">Pack IA</Link>
            <Link href="/accompagnement" className="rounded-md border border-border px-4 py-3 text-sm">Accompagnement</Link>
          </div>
        </div>
      </section>
      <StickyBuyBar href={stripeLink} label="Formation Master Prompt" priceLabel={launchPriceActive ? "49€ lancement" : "97€"} />
      <SiteFooter launchPriceActive={launchPriceActive} />
    </main>
  );
}
