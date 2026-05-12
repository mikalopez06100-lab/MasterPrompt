import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { LockedProposalDeliverable } from "@/components/preview/LockedProposalDeliverable";
import { PriceFigure } from "@/components/PriceFigure";
import { getAccessLevel } from "@/lib/access-level";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Exemple de Pack IA livré — Aperçu confidentiel | Master Prompt",
  description:
    "Découvrez la structure d'un Pack IA réellement livré : audit, stratégie, automatisations et landing page. Données client confidentielles.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.masterprompt.fr/pack-ia/exemple" },
};

export default async function PackIAExempleAperçuPage() {
  const accessLevel = await getAccessLevel();
  if (accessLevel === "none") {
    redirect("/pack-ia#exemple");
  }

  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK_PACK || "/api/contact";

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span>{" "}
          <Link href="/pack-ia">Pack IA</Link> <span>›</span>{" "}
          <span>Exemple de livraison (aperçu)</span>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Mode aperçu confidentiel
              </p>
              <h1 className={`${syne.className} mt-1 text-2xl font-bold text-amber-950 sm:text-3xl`}>
                Voici la structure d&apos;un Pack IA réellement livré
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-amber-900">
                Les données du client (nom, secteur précis, métriques business, marques) sont volontairement
                <strong> floutées</strong>. Ce que vous voyez : la <strong>profondeur des livrables</strong>
                que vous recevrez, pas le contenu réel d&apos;un autre client.
              </p>
            </div>
            <Link
              href={stripeLink}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-navy shadow-sm transition hover:bg-amber-400"
            >
              Réserver mon Pack — <PriceFigure as="span" className="text-sm font-semibold text-navy">397€</PriceFigure>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Pack IA Activité</p>
          <h2 className={`${syne.className} mt-2 text-2xl font-bold sm:text-3xl`}>
            Exemple : artisan-entrepreneur du secteur premium
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            Brief client : structurer son activité, automatiser ses devis et générer plus de demandes
            qualifiées grâce à l&apos;IA. Livraison en 5 jours ouvrés.
          </p>
          <div className="mt-4 grid gap-3 text-xs text-muted sm:grid-cols-4">
            <span className="rounded-full border border-border px-3 py-1">Activité : ███████ premium</span>
            <span className="rounded-full border border-border px-3 py-1">Localisation : ███████</span>
            <span className="rounded-full border border-border px-3 py-1">Équipe : ██ personnes</span>
            <span className="rounded-full border border-border px-3 py-1">CA cible : ██████ € / an</span>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${syne.className} mb-4 text-2xl font-bold sm:text-3xl`}>Les 4 livrables du Pack</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <LockedProposalDeliverable
              badge="Livrable 1 / 4"
              title="Audit business model"
              description="Analyse stratégique de votre activité : forces, frictions, leviers IA prioritaires."
            >
              <FakeAuditContent />
            </LockedProposalDeliverable>

            <LockedProposalDeliverable
              badge="Livrable 2 / 4"
              title="Stratégie marketing"
              description="Plan marketing détaillé : positionnement, audiences, canaux, calendrier 90 jours."
            >
              <FakeMarketingContent />
            </LockedProposalDeliverable>

            <LockedProposalDeliverable
              badge="Livrable 3 / 4"
              title="Automatisations IA"
              description="3 scénarios documentés (Zapier ou n8n) avec architecture, prompts et étapes d'implémentation."
            >
              <FakeAutomationContent />
            </LockedProposalDeliverable>

            <LockedProposalDeliverable
              badge="Livrable 4 / 4"
              title="Landing page optimisée"
              description="Page HTML prête à déployer, structurée pour convertir vos visiteurs en demandes."
            >
              <FakeLandingContent />
            </LockedProposalDeliverable>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-white p-6">
          <h2 className={`${syne.className} text-2xl font-bold`}>Engagement de confidentialité</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              • Aucun nom de client, marque, donnée chiffrée ou contenu textuel exact n&apos;est exposé dans
              cet aperçu — uniquement la <strong>structure</strong> et la <strong>profondeur</strong> du Pack.
            </li>
            <li>
              • Vos propres livrables resteront <strong>privés</strong> et ne seront jamais utilisés en
              démonstration sans votre accord écrit.
            </li>
            <li>
              • Vous recevez les 4 documents en HTML autonome, hébergés où vous voulez (votre domaine, votre
              Drive, ou un espace privé Master Prompt).
            </li>
          </ul>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className={`${syne.className} text-2xl font-bold sm:text-3xl`}>Prêt à lancer votre Pack ?</h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                <PriceFigure as="span" className="font-semibold text-white">397€</PriceFigure> forfait · livré en 5
                jours ouvrés · paiement sécurisé Stripe · facture TVA fournie · appel de cadrage gratuit avant tout
                engagement.
              </p>
            </div>
            <Link
              href={stripeLink}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy"
            >
              Réserver mon Pack
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Contenu factice sous le flou — aucune donnée client réelle ─── */

function FakeAuditContent() {
  return (
    <div className="space-y-3 text-[11px] leading-relaxed text-slate-700">
      <h4 className="text-sm font-bold text-navy">1. Diagnostic activité</h4>
      <p>
        Activité ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████.
        ███████ ███████ ███████ ███████.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {["Forces", "Frictions", "Opportunités"].map((label) => (
          <div key={label} className="rounded-md border border-slate-300 bg-white p-2">
            <p className="text-[9px] font-semibold uppercase text-slate-500">{label}</p>
            <p className="mt-1">███ ████ ███████ ████ ████ ███████ ████ ███████</p>
          </div>
        ))}
      </div>
      <h4 className="text-sm font-bold text-navy">2. Leviers IA prioritaires</h4>
      <ul className="space-y-1.5">
        <li>• Levier 1 — ███████ ███████ ███████ ███████ ███████ ███████</li>
        <li>• Levier 2 — ███████ ███████ ███████ ███████ ███████ ███████</li>
        <li>• Levier 3 — ███████ ███████ ███████ ███████ ███████ ███████</li>
      </ul>
      <h4 className="text-sm font-bold text-navy">3. KPIs cibles 90 jours</h4>
      <div className="grid grid-cols-3 gap-2">
        {["KPI 1", "KPI 2", "KPI 3"].map((k) => (
          <div key={k} className="rounded-md bg-emerald-50 p-2 text-center">
            <p className="text-[9px] font-semibold uppercase text-emerald-700">{k}</p>
            <p className="mt-1 text-lg font-bold text-emerald-900">██ %</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeMarketingContent() {
  return (
    <div className="space-y-3 text-[11px] leading-relaxed text-slate-700">
      <h4 className="text-sm font-bold text-navy">Positionnement</h4>
      <p>
        Vous êtes le ███████ ███████ ███████ qui ███████ ███████ ███████ ███████ ███████ ███████ ███████
        sans ███████ ███████ ███████ ███████.
      </p>
      <h4 className="text-sm font-bold text-navy">3 personae prioritaires</h4>
      <div className="space-y-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-md border border-slate-300 bg-white p-2">
            <p className="text-[9px] font-semibold uppercase text-slate-500">Persona {n}</p>
            <p className="mt-1">███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████</p>
          </div>
        ))}
      </div>
      <h4 className="text-sm font-bold text-navy">Calendrier 90 jours</h4>
      <div className="grid grid-cols-4 gap-1.5">
        {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((w) => (
          <div key={w} className="rounded bg-blue-50 p-1.5 text-center text-[9px] font-semibold text-blue-900">
            {w} · ████
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeAutomationContent() {
  return (
    <div className="space-y-3 text-[11px] leading-relaxed text-slate-700">
      <h4 className="text-sm font-bold text-navy">Scénario 1 — Génération de devis</h4>
      <div className="flex items-center gap-1.5">
        {["Form", "IA", "Doc", "Email", "CRM"].map((step, i) => (
          <span key={step} className="flex items-center gap-1">
            <span className="rounded bg-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-700">{step}</span>
            {i < 4 && <span className="text-slate-400">→</span>}
          </span>
        ))}
      </div>
      <p>███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████.</p>
      <h4 className="text-sm font-bold text-navy">Scénario 2 — Onboarding client</h4>
      <p>███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████.</p>
      <h4 className="text-sm font-bold text-navy">Scénario 3 — Veille concurrentielle</h4>
      <p>███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████ ███████.</p>
      <div className="mt-2 rounded-md border border-slate-300 bg-slate-50 p-2 font-mono text-[10px]">
        <p className="text-slate-500"># Prompt PACO type</p>
        <p>Persona: ███████ ███████ ███████</p>
        <p>Action: ███████ ███████ ███████ ███████</p>
        <p>Context: ███████ ███████ ███████</p>
        <p>Output: ███████ ███████</p>
      </div>
    </div>
  );
}

function FakeLandingContent() {
  return (
    <div className="space-y-2 text-[11px] leading-relaxed text-slate-700">
      <div className="rounded-md border border-slate-300 bg-navy p-3 text-white">
        <p className="text-[9px] uppercase text-amber-400">█████████</p>
        <p className="mt-1 text-base font-bold">███████ ███████ ███████ ███████</p>
        <p className="mt-1 text-[10px] text-slate-300">███████ ███████ ███████ ███████ ███████ ███████.</p>
        <button className="mt-2 rounded bg-amber-500 px-3 py-1 text-[10px] font-bold text-navy">
          ████████████
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-md border border-slate-300 bg-white p-2 text-center">
            <p className="text-base">█</p>
            <p className="mt-1 text-[9px] font-semibold">███████</p>
            <p className="mt-1 text-[9px] text-slate-500">███████ ███████ ███████</p>
          </div>
        ))}
      </div>
      <div className="rounded-md border border-slate-300 bg-white p-2">
        <p className="text-[9px] font-semibold text-slate-500">Témoignage client</p>
        <p className="mt-1 italic">« ███████ ███████ ███████ ███████ ███████ ███████ ███████ »</p>
        <p className="mt-1 text-[9px] text-slate-500">— ███████ ███████, ███████</p>
      </div>
      <div className="rounded-md border border-slate-300 bg-emerald-50 p-2 text-center">
        <p className="text-[9px] font-semibold uppercase text-emerald-700">CTA final</p>
        <p className="mt-1 text-sm font-bold text-emerald-900">███████ ███████ ███████</p>
      </div>
    </div>
  );
}
