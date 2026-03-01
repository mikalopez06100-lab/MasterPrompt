"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
    >
      {pending ? "Enregistrement…" : "Enregistrer"}
    </button>
  );
}

export function CourseForm({
  action,
  initial,
  courseId,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: { title: string; description: string; slug: string; isPublished: boolean };
  courseId?: string;
}) {
  return (
    <form
      action={action}
      className="flex max-w-md flex-col gap-4 rounded-card bg-white p-6 shadow-sm"
    >
      {courseId && <input type="hidden" name="id" value={courseId} />}
      <div>
        <label className="block text-sm font-medium text-slate-700">Titre</label>
        <input
          type="text"
          name="title"
          defaultValue={initial?.title}
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Slug (URL)</label>
        <input
          type="text"
          name="slug"
          defaultValue={initial?.slug}
          placeholder="ex: bases-du-prompt"
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          name="description"
          defaultValue={initial?.description}
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.isPublished}
          id="published"
          className="rounded border-slate-300 text-primary focus:ring-primary"
        />
        <label htmlFor="published" className="text-sm text-slate-700">
          Publié
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
