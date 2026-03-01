import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [moduleCount, lessonCount, userCount] = await Promise.all([
    prisma.module.count(),
    prisma.lesson.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-slate-900">
        Vue globale contenus
      </h1>

      <div className="grid gap-4 sm:grid-cols-3">
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
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/courses/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Ajouter un module
        </Link>
      </div>
    </div>
  );
}
