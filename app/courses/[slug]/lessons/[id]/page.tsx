import { notFound } from "next/navigation";
import Link from "next/link";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { prisma } from "@/lib/db";
import { MarkCompleteButton } from "./mark-complete";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const user = await getPrismaUserFromSupabase();
  const { slug, id } = await params;

  const lesson = await prisma.lesson.findFirst({
    where: { id, module: { slug, isPublished: true } },
    include: { module: true },
  });

  if (!lesson) notFound();

  const progress = user
    ? await prisma.userProgress.findUnique({
        where: {
          userId_moduleId: { userId: user.id, moduleId: lesson.moduleId },
        },
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <Link
        href={`/courses/${slug}`}
        className="text-sm font-medium text-primary hover:underline"
      >
        ← {lesson.module.title}
      </Link>

      <h1 className="font-heading text-3xl font-bold tracking-tight text-navy">
        {lesson.title}
      </h1>

      {user && (
        <MarkCompleteButton
          moduleId={lesson.moduleId}
          completed={progress?.completed ?? false}
        />
      )}
    </div>
  );
}
