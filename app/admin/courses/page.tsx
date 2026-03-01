import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { lessons: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-navy">
          Modules
        </h1>
        <Link
          href="/admin/courses/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Nouveau module
        </Link>
      </div>

      <ul className="space-y-3">
        {modules.map((m) => (
          <li
            key={m.id}
            className="rounded-card flex items-center justify-between bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-navy">{m.title}</p>
              <p className="text-sm text-muted">
                {m._count.lessons} leçon(s) · {m.isPublished ? "Publié" : "Brouillon"}
              </p>
            </div>
            <Link
              href={`/admin/courses/${m.id}`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Modifier
            </Link>
          </li>
        ))}
      </ul>

      {modules.length === 0 && (
        <p className="text-muted">Aucun module. Créez-en un pour commencer.</p>
      )}
    </div>
  );
}
