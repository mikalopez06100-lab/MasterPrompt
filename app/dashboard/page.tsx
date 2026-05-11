import Link from "next/link";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getPrismaUserFromSupabase();
  const userId = user?.id;
  const firstName = user?.name?.split(" ")[0] ?? "Vous";

  const [recentPrompts, progressCount, publishedModuleCount] = await Promise.all([
    userId
      ? prisma.prompt.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 3,
        })
      : [],
    userId
      ? prisma.userProgress.count({ where: { userId, completed: true } })
      : 0,
    prisma.module.count({ where: { isPublished: true } }),
  ]);

  const formationPending = publishedModuleCount === 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Bonjour, <span className="text-primary">{firstName}</span>.
      </h1>

      {formationPending && (
        <section className="rounded-card border border-amber-200 bg-amber-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Précommande active
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold text-amber-950">
            Votre accès complet ouvre le 1<sup>er</sup> juin 2026
          </h2>
          <p className="mt-2 text-sm text-amber-900">
            Les 7 modules de formation, la bibliothèque de 300 prompts et les exercices
            seront ajoutés dans cet espace à la livraison. En attendant, vous pouvez
            visualiser un aperçu de l&apos;espace formation et regarder la vidéo de
            présentation ainsi que les 2 premiers modules déjà disponibles.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/espace-formation"
              className="rounded-md bg-amber-500 px-5 py-2.5 text-sm font-semibold text-amber-950 hover:bg-amber-400"
            >
              Voir l&apos;aperçu de mon espace formation →
            </Link>
            <Link
              href="/editor"
              className="rounded-md border border-amber-300 bg-white px-5 py-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-50"
            >
              Essayer l&apos;éditeur de prompts
            </Link>
          </div>
        </section>
      )}

      <section className="card grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-lg font-semibold text-slate-900">
            Votre progression
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {progressCount} leçon(s) complétée(s)
          </p>
          <Link href="/courses" className="btn-primary mt-4 inline-block">
            Reprendre la formation
          </Link>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-slate-900">
            Derniers prompts
          </h2>
          {recentPrompts.length === 0 ? (
            <p className="mt-1 text-sm text-slate-500">
              Aucun prompt sauvegardé. Utilisez l&apos;éditeur pour commencer.
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {recentPrompts.map((p) => (
                <li key={p.id} className="text-sm">
                  <Link
                    href={`/library?id=${p.id}`}
                    className="font-medium text-primary transition-colors hover:underline"
                  >
                    {p.title || p.content.slice(0, 40)}…
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/library"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Voir la bibliothèque →
          </Link>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-lg font-semibold text-slate-900">
          Continuer où vous en étiez
        </h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/editor"
            className="card-hover flex min-w-[220px] flex-1 flex-col border border-slate-200/80"
          >
            <span className="font-semibold text-slate-900">Éditeur de prompts</span>
            <span className="mt-1 text-sm text-slate-500">
              Analyser et améliorer vos prompts
            </span>
          </Link>
          <Link
            href="/exercises"
            className="card-hover flex min-w-[220px] flex-1 flex-col border border-slate-200/80"
          >
            <span className="font-semibold text-slate-900">Exercices</span>
            <span className="mt-1 text-sm text-slate-500">
              S&apos;entraîner avec des briefs
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
