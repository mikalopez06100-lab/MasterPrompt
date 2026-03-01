import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CourseForm } from "../course-form";

export const dynamic = "force-dynamic";

async function updateModule(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const { prisma } = await import("@/lib/db");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const isPublished = formData.get("published") === "on";
  if (!title || !slug) return;
  await prisma.module.update({
    where: { id },
    data: { title, description, slug, isPublished },
  });
  const { redirect: redirectTo } = await import("next/navigation");
  redirectTo("/admin/courses");
}

export default async function AdminCourseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const module_ = await prisma.module.findUnique({ where: { id } });
  if (!module_) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/courses" className="text-sm text-primary hover:underline">
        ← Modules
      </Link>
      <h1 className="font-heading text-2xl font-semibold text-navy">
        Modifier : {module_.title}
      </h1>
      <CourseForm
        action={updateModule}
        initial={{
          title: module_.title,
          description: module_.description ?? "",
          slug: module_.slug,
          isPublished: module_.isPublished,
        }}
        courseId={module_.id}
      />
    </div>
  );
}
