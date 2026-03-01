import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ModuleSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module_ = await prisma.module.findUnique({
    where: { slug, isPublished: true },
    include: {
      lessons: { orderBy: { order: "asc" } },
    },
  });

  if (!module_) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
        ← Formation
      </Link>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-navy">
        {module_.title}
      </h1>
      {module_.description && (
        <p className="text-muted">{module_.description}</p>
      )}

      <div className="space-y-4">
        <ul className="space-y-2">
          {module_.lessons.map((lesson, i) => (
            <li key={lesson.id}>
              <Link
                href={`/courses/${slug}/lessons/${lesson.id}`}
                className="text-sm text-primary hover:underline"
              >
                {i + 1}. {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
