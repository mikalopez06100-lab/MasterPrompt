import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const modules = await prisma.module.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { lessons: true } } },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-navy">
        Formation
      </h1>

      {modules.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-muted">
            Aucun module pour le moment. Revenez bientôt.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {modules.map((mod) => (
            <li key={mod.id} className="card-hover border border-border">
              <h2 className="font-heading text-lg font-semibold text-navy">
                {mod.title}
              </h2>
              {mod.description && (
                <p className="mt-2 text-sm text-muted">{mod.description}</p>
              )}
              <p className="mt-2 text-sm font-medium text-muted">
                {mod._count.lessons} leçon(s)
              </p>
              <Link
                href={`/courses/${mod.slug}`}
                className="btn-primary mt-4 inline-block"
              >
                Voir le programme
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
