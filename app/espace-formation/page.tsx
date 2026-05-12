import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { LockedContent } from "@/components/preview/LockedContent";
import { ModuleVideoCard } from "@/components/preview/ModuleVideoCard";
import { PriceFigure } from "@/components/PriceFigure";
import { getAccessLevel, type AccessLevel } from "@/lib/access-level";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Espace Formation — Aperçu Master Prompt",
  description:
    "Découvrez en avant-première l'espace formation Master Prompt : 7 modules vidéo, bibliothèque de prompts, exercices et éditeur intelligent.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.masterprompt.fr/espace-formation" },
};

type TabKey = "modules" | "bibliotheque" | "exercices" | "editeur" | "profil";

const TABS: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: "modules", label: "Modules vidéo", icon: "▶" },
  { key: "bibliotheque", label: "Bibliothèque prompts", icon: "✦" },
  { key: "exercices", label: "Exercices pratiques", icon: "✎" },
  { key: "editeur", label: "Éditeur de prompts", icon: "▤" },
  { key: "profil", label: "Mon profil", icon: "◉" },
];

type ModuleConfig = {
  num: number;
  title: string;
  duration: string;
  lessons: number;
  videoEnvVar?: string;
};

const MODULES: ModuleConfig[] = [
  { num: 1, title: "Comprendre l'IA et le Prompt Engineering", duration: "32 min", lessons: 6, videoEnvVar: "NEXT_PUBLIC_MODULE_1_VIDEO_URL" },
  { num: 2, title: "La méthode PACO", duration: "45 min", lessons: 8, videoEnvVar: "NEXT_PUBLIC_MODULE_2_VIDEO_URL" },
  { num: 3, title: "Communication & Marketing", duration: "38 min", lessons: 7 },
  { num: 4, title: "Gestion & Productivité", duration: "41 min", lessons: 7 },
  { num: 5, title: "Ateliers pratiques", duration: "55 min", lessons: 9 },
  { num: 6, title: "Enchaînements IA, vers l'automatisation", duration: "47 min", lessons: 8 },
  { num: 7, title: "Éthique, RGPD et veille continue", duration: "29 min", lessons: 5 },
];

function resolveModuleVideoUrl(envVar: string | undefined): string | undefined {
  if (!envVar) return undefined;
  const value = process.env[envVar];
  return value && value.trim().length > 0 ? value : undefined;
}

const PROMPTS_PREVIEW = [
  { metier: "Coach sportif", title: "Programme personnalisé sur 4 semaines" },
  { metier: "Architecte d'intérieur", title: "Présentation projet client haut de gamme" },
  { metier: "Conciergerie LCD", title: "Annonce Airbnb optimisée conversion" },
  { metier: "Coiffeur indépendant", title: "Stories Instagram série avant/après" },
  { metier: "Traiteur événementiel", title: "Devis mariage 80 personnes détaillé" },
  { metier: "Maître d'œuvre BTP", title: "Compte-rendu chantier hebdo client" },
];

export default async function EspaceFormationPreviewPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const accessLevel = await getAccessLevel();
  if (accessLevel === "none") {
    redirect("/formation#apercu");
  }

  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK_FORMATION || "/billing";
  const launchPriceActive = process.env.NEXT_PUBLIC_LAUNCH_PRICE_ACTIVE !== "false";

  const tabParam = (searchParams?.tab ?? "modules") as TabKey;
  const activeTab: TabKey = TABS.some((t) => t.key === tabParam) ? tabParam : "modules";

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span>{" "}
          <Link href="/formation">Formation</Link> <span>›</span>{" "}
          <span>Espace formation (aperçu)</span>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Mode aperçu — Accès limité
              </p>
              <h1 className={`${syne.className} mt-1 text-2xl font-bold text-amber-950 sm:text-3xl`}>
                Voici à quoi ressemble votre espace formation
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-amber-900">
                Tous les contenus ci-dessous (vidéos, prompts, exercices, éditeur) sont floutés. Ils
                seront débloqués automatiquement le <strong>1er juin 2026</strong> après votre
                précommande.
              </p>
            </div>
            <Link
              href={stripeLink}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-navy shadow-sm transition hover:bg-amber-400"
            >
              Précommander à{" "}
              <PriceFigure as="span" className="font-semibold text-navy">
                {launchPriceActive ? "49€" : "97€"}
              </PriceFigure>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-2 lg:sticky lg:top-6 lg:self-start">
            <p className={`${syne.className} px-2 text-xs font-semibold uppercase tracking-wider text-muted`}>
              Navigation
            </p>
            <nav className="flex flex-col gap-1 rounded-2xl border border-border bg-white p-2">
              {TABS.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <Link
                    key={tab.key}
                    href={`/espace-formation?tab=${tab.key}`}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-navy text-white"
                        : "text-navy hover:bg-slate-100"
                    }`}
                  >
                    <span className={`text-base ${isActive ? "text-amber-400" : "text-muted"}`}>
                      {tab.icon}
                    </span>
                    <span className="flex-1">{tab.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="rounded-2xl border border-border bg-white p-4 text-xs text-muted">
              <p className={`${syne.className} text-sm font-semibold text-navy`}>Progression</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-0 bg-emerald-500" />
              </div>
              <p className="mt-2">0 / 50 leçons complétées</p>
              <p className="mt-1 italic">Disponible le 1er juin 2026</p>
            </div>
          </aside>

          <div className="space-y-6">
            {activeTab === "modules" && <ModulesTab accessLevel={accessLevel} />}
            {activeTab === "bibliotheque" && <BibliothequeTab />}
            {activeTab === "exercices" && <ExercicesTab />}
            {activeTab === "editeur" && <EditeurTab />}
            {activeTab === "profil" && <ProfilTab />}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className={`${syne.className} text-2xl font-bold sm:text-3xl`}>
                Débloquez l&apos;accès complet
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Précommande à{" "}
                <PriceFigure as="span" className="font-semibold text-slate-200">
                  {launchPriceActive ? "49€" : "97€"}
                </PriceFigure>{" "}
                · Accès le 1er juin 2026 ·
                Remboursement intégral si non-livré · Garantie 14 jours après accès.
              </p>
            </div>
            <Link
              href={stripeLink}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy"
            >
              Précommander maintenant
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ModulesTab({ accessLevel }: { accessLevel: AccessLevel }) {
  const presentationVideoUrl = process.env.NEXT_PUBLIC_PRESENTATION_VIDEO_URL || undefined;
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Présentation + 7 modules vidéo</h2>
        <p className="mt-1 text-sm text-muted">
          50 leçons · 4h30 de contenu · Captions FR · Téléchargement hors-ligne
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {presentationVideoUrl && (
          <ModuleVideoCard
            moduleNumber={0}
            badgeLabel="Présentation"
            title="Bienvenue dans Master Prompt"
            duration="2 min"
            lessons={0}
            videoUrl={presentationVideoUrl}
            accessLevel={accessLevel}
            alwaysUnlocked
          />
        )}
        {MODULES.map((mod) => (
          <ModuleVideoCard
            key={mod.num}
            moduleNumber={mod.num}
            title={mod.title}
            duration={mod.duration}
            lessons={mod.lessons}
            videoUrl={resolveModuleVideoUrl(mod.videoEnvVar)}
            accessLevel={accessLevel}
          />
        ))}
      </div>
    </>
  );
}

function BibliothequeTab() {
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Bibliothèque de 300 prompts métier</h2>
        <p className="mt-1 text-sm text-muted">
          Classés par métier · Copiables en un clic · Mis à jour mensuellement
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {PROMPTS_PREVIEW.map((p) => (
          <article key={p.title} className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {p.metier}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-navy">{p.title}</h3>
            <div className="mt-3">
              <LockedContent
                title="Prompt réservé"
                subtitle="Précommandez pour copier ce prompt"
                aspect="auto"
                className="h-32"
              >
                <div className="space-y-1 p-3 text-xs leading-relaxed text-slate-700">
                  <p>Persona : tu es un expert {p.metier.toLowerCase()}…</p>
                  <p>Action : rédige une réponse structurée…</p>
                  <p>Contexte : client, attentes, contraintes…</p>
                  <p>Output : format markdown, ton chaleureux…</p>
                </div>
              </LockedContent>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ExercicesTab() {
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Exercices pratiques</h2>
        <p className="mt-1 text-sm text-muted">
          Briefs réels d&apos;entrepreneurs · Retour automatique sur votre prompt · Niveau progressif
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "Brief 1 : Email de relance impayé",
          "Brief 2 : Description produit Etsy",
          "Brief 3 : Post LinkedIn cas client",
          "Brief 4 : Compte-rendu réunion équipe",
          "Brief 5 : Argumentaire commercial téléphone",
          "Brief 6 : Newsletter mensuelle abonnés",
        ].map((b) => (
          <article key={b} className="rounded-xl border border-border bg-white p-4">
            <h3 className="text-sm font-semibold text-navy">{b}</h3>
            <p className="mt-1 text-xs text-muted">≈ 8 min · Difficulté progressive</p>
            <div className="mt-3">
              <LockedContent
                title="Exercice verrouillé"
                aspect="auto"
                className="h-24"
              >
                <div className="p-3 text-xs text-slate-700">
                  Consigne détaillée, contexte client, attendu de livraison, grille d&apos;auto-évaluation…
                </div>
              </LockedContent>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function EditeurTab() {
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Éditeur de prompts intelligent</h2>
        <p className="mt-1 text-sm text-muted">
          Analyse votre prompt en temps réel selon la méthode PACO et suggère des améliorations.
        </p>
      </header>
      <article className="rounded-2xl border border-border bg-white p-4">
        <LockedContent
          title="Éditeur réservé aux membres"
          subtitle="Analyse PACO temps réel · Sauvegarde dans votre bibliothèque"
          aspect="auto"
          className="h-80"
        >
          <div className="space-y-3 p-5 text-sm">
            <div className="rounded-lg border border-slate-300 bg-white p-3">
              <p className="text-xs font-semibold text-muted">PERSONA</p>
              <p>Tu es un conseiller commercial expérimenté…</p>
            </div>
            <div className="rounded-lg border border-slate-300 bg-white p-3">
              <p className="text-xs font-semibold text-muted">ACTION</p>
              <p>Rédige un email de suivi pour un devis…</p>
            </div>
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-xs">
              <p className="font-semibold text-emerald-900">Score PACO : 8,5 / 10</p>
              <p className="mt-1 text-emerald-800">
                Suggestions : préciser le format de sortie et ajouter une contrainte de longueur.
              </p>
            </div>
          </div>
        </LockedContent>
      </article>
    </>
  );
}

function ProfilTab() {
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Mon profil</h2>
        <p className="mt-1 text-sm text-muted">
          Vos paramètres, votre métier, vos préférences de personnalisation des prompts.
        </p>
      </header>
      <article className="rounded-2xl border border-border bg-white p-4">
        <LockedContent
          title="Profil verrouillé"
          subtitle="Disponible après précommande"
          aspect="auto"
          className="h-64"
        >
          <div className="grid gap-3 p-5 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-muted">Nom complet</p>
              <p>Michaël L.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Email</p>
              <p>vous@exemple.com</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Métier</p>
              <p>Coach sportif indépendant</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted">Ton préféré</p>
              <p>Chaleureux et direct</p>
            </div>
          </div>
        </LockedContent>
      </article>
    </>
  );
}
