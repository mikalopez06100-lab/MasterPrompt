import Link from "next/link";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getPrismaUserFromSupabase();
  const userId = user?.id;
  const firstName = user?.name?.split(" ")[0] ?? "Vous";

  const [recentPrompts, progressCount] = await Promise.all([
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
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Bonjour, <span className="text-primary">{firstName}</span>.
      </h1>

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
