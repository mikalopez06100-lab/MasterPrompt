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
        <div className="card space-y-4 border border-amber-200 bg-amber-50 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Précommande active
          </p>
          <h2 className="font-heading text-2xl font-bold text-amber-950">
            Votre accès complet ouvre le 1<sup>er</sup> juin 2026
          </h2>
          <p className="text-sm text-amber-900">
            Les 7 modules vidéo, la bibliothèque de 300 prompts, les exercices et
            l&apos;éditeur intelligent seront débloqués automatiquement à cette date dans
            cet espace. Vous recevrez un email de notification.
          </p>
          <p className="text-sm text-amber-900">
            En attendant, vous pouvez parcourir un aperçu détaillé de l&apos;espace
            formation et visionner la vidéo de présentation ainsi que les 2 premiers
            modules déjà disponibles.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
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
