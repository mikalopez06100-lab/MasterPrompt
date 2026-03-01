import { redirect } from "next/navigation";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const user = await getPrismaUserFromSupabase();
  if (!user) redirect("/login");

  const [progressList, promptCount] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId: user.id, completed: true },
    }),
    prisma.prompt.count({ where: { userId: user.id } }),
  ]);

  const completedLessons = progressList.length;

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Ma progression
      </h1>

      <div className="card grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
          <p className="font-heading text-3xl font-bold text-primary">{completedLessons}</p>
          <p className="text-sm font-medium text-slate-500">leçon(s) complétée(s)</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
          <p className="font-heading text-3xl font-bold text-primary">{promptCount}</p>
          <p className="text-sm font-medium text-slate-500">prompt(s) sauvegardé(s)</p>
        </div>
      </div>

      {completedLessons === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-500">
            Vous n&apos;avez pas encore commencé.
          </p>
          <Link href="/courses" className="btn-primary mt-4 inline-block">
            Lancer la formation
          </Link>
        </div>
      ) : (
        <p className="text-sm font-medium text-slate-500">
          Continuez sur la formation pour débloquer plus de contenu.
        </p>
      )}
    </div>
  );
}
