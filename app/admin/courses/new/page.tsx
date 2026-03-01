import { redirect } from "next/navigation";
import Link from "next/link";
import { CourseForm } from "../course-form";
import { prisma } from "@/lib/db";

async function createModule(formData: FormData) {
  "use server";
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const slug =
    String(formData.get("slug") ?? "").trim() ||
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  const isPublished = formData.get("published") === "on";
  if (!title) return;
  const maxOrder = await prisma.module
    .aggregate({ _max: { order: true } })
    .then((r) => (r._max.order ?? -1) + 1);
  await prisma.module.create({
    data: { title, description, slug, order: maxOrder, isPublished },
  });
  redirect("/admin/courses");
}

export default function NewModulePage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/courses" className="text-sm text-primary hover:underline">
        ← Modules
      </Link>
      <h1 className="font-heading text-2xl font-semibold text-navy">
        Nouveau module
      </h1>
      <CourseForm action={createModule} />
    </div>
  );
}
