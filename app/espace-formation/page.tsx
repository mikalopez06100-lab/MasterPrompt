import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { LockedContent } from "@/components/preview/LockedContent";
import { ModuleVideoCard } from "@/components/preview/ModuleVideoCard";
import { PriceFigure } from "@/components/PriceFigure";
import { getAccessLevel, hasFormationVideoAccess, type AccessLevel } from "@/lib/access-level";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { formationVideoApiPath } from "@/lib/formation-video-server";
import { QuizLauncher } from "@/components/quiz/QuizLauncher";
import { LibraryContent } from "@/components/library/LibraryContent";
import { EditorContent } from "@/components/editor/EditorContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Espace Formation — Master Prompt",
  description:
    "Découvrez en avant-première l'espace formation Master Prompt : 7 modules vidéo + 1 bonus, bibliothèque de prompts, quiz de validation et éditeur intelligent.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.masterprompt.fr/espace-formation" },
};

type TabKey = "modules" | "bibliotheque" | "quiz" | "editeur" | "profil";

const TABS: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: "modules", label: "Modules vidéo", icon: "▶" },
  { key: "bibliotheque", label: "Bibliothèque prompts", icon: "✦" },
  { key: "quiz", label: "Quiz de validation", icon: "?" },
  { key: "editeur", label: "Éditeur de prompts", icon: "▤" },
  { key: "profil", label: "Mon profil", icon: "◉" },
];

import {
  FORMATION_BONUS_MODULE,
  FORMATION_MODULES,
  FORMATION_MODULE_COUNT,
} from "@/lib/formation-modules";

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
  searchParams?: { tab?: string; metier?: string; template?: string; edit?: string };
}) {
  const accessLevel = await getAccessLevel();
  const member = accessLevel === "full" ? await getPrismaUserFromSupabase() : null;
  if (accessLevel === "none") {
    redirect("/formation#apercu");
  }

  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_LINK_FORMATION || "/billing";

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
          <span>{accessLevel === "full" ? "Espace formation" : "Espace formation (aperçu)"}</span>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6">
        <div
          className={`mx-auto max-w-6xl rounded-2xl border p-5 sm:p-6 ${
            accessLevel === "full"
              ? "border-emerald-300 bg-emerald-50"
              : "border-amber-300 bg-amber-50"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              {accessLevel === "full" ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Accès membre actif
                  </p>
                  <h1 className={`${syne.className} mt-1 text-2xl font-bold text-emerald-950 sm:text-3xl`}>
                    Bienvenue{member?.name ? `, ${member.name.split(" ")[0]}` : ""} — votre espace formation
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-emerald-900">
                    Retrouvez ici vos {FORMATION_MODULE_COUNT} modules, le bonus, la bibliothèque et le
                    quiz de validation. C&apos;est votre parcours principal — pas besoin du dashboard classique.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Mode aperçu — Accès limité
                  </p>
                  <h1 className={`${syne.className} mt-1 text-2xl font-bold text-amber-950 sm:text-3xl`}>
                    Voici à quoi ressemble votre espace formation
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-amber-900">
                    Tous les contenus ci-dessous (vidéos, prompts, quiz, éditeur) sont floutés.
                    Débloquez l&apos;accès complet en commandant la formation ou avec un code d&apos;accès, puis
                    connectez-vous avec le même email.
                  </p>
                </>
              )}
            </div>
            {accessLevel !== "full" ? (
              <Link
                href={stripeLink}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-navy shadow-sm transition hover:bg-amber-400"
              >
                Commander à{" "}
                <PriceFigure as="span" className="font-semibold text-navy">
                  49€
                </PriceFigure>
              </Link>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/correcteur"
                  className="rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                >
                  Correcteur PACO →
                </Link>
                <Link
                  href="/account"
                  className="rounded-md border border-emerald-400 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
                >
                  Mon compte
                </Link>
              </div>
            )}
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
              <p className="mt-2">0 / {FORMATION_MODULE_COUNT + 1} modules complétés</p>
              {accessLevel !== "full" && (
                <p className="mt-1 italic">Débloqué après achat ou code d&apos;accès</p>
              )}
            </div>
          </aside>

          <div className="space-y-6">
            {activeTab === "modules" && <ModulesTab accessLevel={accessLevel} />}
            {activeTab === "bibliotheque" && (
              <BibliothequeTab
                accessLevel={accessLevel}
                memberId={member?.id}
                metier={searchParams?.metier}
              />
            )}
            {activeTab === "quiz" && <QuizTab accessLevel={accessLevel} />}
            {activeTab === "editeur" && <EditeurTab accessLevel={accessLevel} />}
            {activeTab === "profil" && <ProfilTab accessLevel={accessLevel} member={member} />}
          </div>
        </div>
      </section>

      {accessLevel !== "full" && (
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-2xl bg-navy p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <h2 className={`${syne.className} text-2xl font-bold sm:text-3xl`}>
                Débloquez l&apos;accès complet
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                <PriceFigure as="span" className="font-semibold text-slate-200 line-through">97€</PriceFigure>{" "}
                <PriceFigure as="span" className="font-semibold text-amber-400">49€</PriceFigure>
                {" "}· Accès immédiat · Garantie 14 jours.
              </p>
            </div>
            <Link
              href={stripeLink}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy"
            >
              Commander maintenant
            </Link>
          </div>
        </div>
      </section>
      )}
    </main>
  );
}

function ModulesTab({ accessLevel }: { accessLevel: AccessLevel }) {
  const canWatch = hasFormationVideoAccess(accessLevel);
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>
          Présentation + {FORMATION_MODULE_COUNT} modules + bonus
        </h2>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <ModuleVideoCard
          moduleNumber={0}
          badgeLabel="Présentation"
          title="Bienvenue dans Master Prompt"
          videoUrl={canWatch ? formationVideoApiPath(0) : undefined}
          accessLevel={accessLevel}
        />
        {FORMATION_MODULES.map((mod) => (
          <ModuleVideoCard
            key={mod.order}
            moduleNumber={mod.order}
            title={mod.title}
            videoUrl={canWatch ? formationVideoApiPath(mod.order) : undefined}
            accessLevel={accessLevel}
          />
        ))}
      </div>

      <header className="pt-4">
        <h3 className={`${syne.className} text-xl font-bold`}>Module bonus</h3>
        <p className="mt-1 text-sm text-muted">
          Réservé aux membres — {FORMATION_BONUS_MODULE.title}
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <ModuleVideoCard
          moduleNumber={FORMATION_BONUS_MODULE.order}
          badgeLabel="Bonus"
          title={FORMATION_BONUS_MODULE.title}
          videoUrl={canWatch ? formationVideoApiPath(FORMATION_BONUS_MODULE.order) : undefined}
          accessLevel={accessLevel}
        />
      </div>
    </>
  );
}

function BibliothequeTab({
  accessLevel,
  memberId,
  metier,
}: {
  accessLevel: AccessLevel;
  memberId?: string;
  metier?: string;
}) {
  const unlocked = accessLevel === "full" && memberId;
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Bibliothèque de 300 prompts métier</h2>
        <p className="mt-1 text-sm text-muted">
          Classés par métier · Copiables en un clic · Mis à jour mensuellement
        </p>
      </header>
      {unlocked ? (
        <LibraryContent userId={memberId} metier={metier} embedded hideTitle />
      ) : (
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
                subtitle="Commandez la formation pour copier ce prompt"
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
      )}
    </>
  );
}

function QuizTab({ accessLevel }: { accessLevel: AccessLevel }) {
  const unlocked = accessLevel === "full";
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Quiz de validation</h2>
        <p className="mt-1 text-sm text-muted">
          10 questions QCM · Tirage transversal sur les 7 modules · Score et correction détaillée
        </p>
      </header>
      {unlocked ? (
        <QuizLauncher unlocked />
      ) : (
        <article className="rounded-2xl border border-border bg-white p-4">
          <LockedContent
            title="Quiz réservé aux membres"
            subtitle="10 questions · ~3 minutes · Nouveau tirage à chaque tentative"
            aspect="auto"
            className="h-48"
          >
            <div className="space-y-2 p-5 text-sm text-slate-700">
              <p>Module 03 · Que signifie l&apos;acronyme PACO ?</p>
              <p className="text-xs text-muted">4 choix · Correction à la fin du quiz</p>
            </div>
          </LockedContent>
        </article>
      )}
    </>
  );
}

function EditeurTab({ accessLevel }: { accessLevel: AccessLevel }) {
  const unlocked = accessLevel === "full";
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Éditeur de prompts intelligent</h2>
        <p className="mt-1 text-sm text-muted">
          Analyse votre prompt en temps réel selon la méthode PACO et suggère des améliorations.
        </p>
      </header>
      {unlocked ? (
        <EditorContent embedded hideTitle />
      ) : (
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
      )}
    </>
  );
}

function ProfilTab({
  accessLevel,
  member,
}: {
  accessLevel: AccessLevel;
  member: { name: string | null; email: string } | null;
}) {
  const unlocked = accessLevel === "full" && member;
  return (
    <>
      <header>
        <h2 className={`${syne.className} text-2xl font-bold`}>Mon profil</h2>
        <p className="mt-1 text-sm text-muted">
          Vos paramètres, votre métier, vos préférences de personnalisation des prompts.
        </p>
      </header>
      {unlocked ? (
        <article className="rounded-2xl border border-border bg-white p-6">
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Nom</p>
              <p className="mt-1 font-medium text-navy">{member.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Email</p>
              <p className="mt-1 font-medium text-navy">{member.email}</p>
            </div>
          </div>
          <Link
            href="/account"
            className="mt-6 inline-flex rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
          >
            Gérer mon compte →
          </Link>
        </article>
      ) : (
      <article className="rounded-2xl border border-border bg-white p-4">
        <LockedContent
          title="Profil verrouillé"
          subtitle="Disponible après achat de la formation"
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
      )}
    </>
  );
}
