import Link from "next/link";
import { prisma } from "@/lib/db";
import { proposals } from "@/lib/proposals";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [moduleCount, lessonCount, userCount, promptCount, progressCount, subscriptionCount, leadCount] = await Promise.all([
    prisma.module.count(),
    prisma.lesson.count(),
    prisma.user.count(),
    prisma.prompt.count({ where: { OR: [{ isShared: true }, { userId: null }] } }),
    prisma.userProgress.count(),
    prisma.subscription.count(),
    prisma.lead.count(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-slate-900">
        Vue globale contenus
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{moduleCount}</p>
          <p className="text-sm text-muted">modules</p>
        </div>
        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{lessonCount}</p>
          <p className="text-sm text-muted">leçons</p>
        </div>
        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{userCount}</p>
          <p className="text-sm text-muted">utilisateurs</p>
        </div>
        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{promptCount}</p>
          <p className="text-sm text-muted">prompts partages</p>
        </div>
        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{progressCount}</p>
          <p className="text-sm text-muted">entrees progression</p>
        </div>
        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{subscriptionCount}</p>
          <p className="text-sm text-muted">abonnements</p>
        </div>
        <div className="rounded-card bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-primary">{leadCount}</p>
          <p className="text-sm text-muted">leads</p>
        </div>
        <Link
          href="/admin/propositions"
          className="rounded-card bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <p className="text-2xl font-bold text-primary">{proposals.length}</p>
          <p className="text-sm text-muted">propositions clients →</p>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/courses/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Ajouter un module
        </Link>
        <Link
          href="/admin/prompts"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Gerer la bibliotheque prompts
        </Link>
        <Link
          href="/admin/users"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Gerer les utilisateurs
        </Link>
        <Link
          href="/admin/progress"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Suivre la progression
        </Link>
        <Link
          href="/admin/subscriptions"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Voir les abonnements
        </Link>
        <Link
          href="/admin/propositions"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Propositions clients
        </Link>
      </div>
    </div>
  );
}
