import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertAdminUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

async function createSharedPrompt(formData: FormData) {
  "use server";
  await assertAdminUser();
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (!title || !content) return;

  await prisma.prompt.create({
    data: {
      title,
      category: category || null,
      content,
      isShared: true,
      userId: null,
    },
  });
  revalidatePath("/admin/prompts");
  revalidatePath("/library");
}

async function updateSharedPrompt(formData: FormData) {
  "use server";
  await assertAdminUser();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const shared = String(formData.get("shared") ?? "") === "on";
  if (!id || !title || !content) return;

  await prisma.prompt.update({
    where: { id },
    data: {
      title,
      category: category || null,
      content,
      isShared: shared,
      userId: null,
    },
  });
  revalidatePath("/admin/prompts");
  revalidatePath("/library");
}

async function deleteSharedPrompt(formData: FormData) {
  "use server";
  await assertAdminUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.prompt.delete({ where: { id } });
  revalidatePath("/admin/prompts");
  revalidatePath("/library");
}

export default async function AdminPromptsPage() {
  const prompts = await prisma.prompt.findMany({
    where: { OR: [{ userId: null }, { isShared: true }] },
    orderBy: [{ category: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-navy">
        Bibliotheque prompts
      </h1>

      <form action={createSharedPrompt} className="rounded-card bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">Ajouter un prompt partage</h2>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="text"
          name="category"
          placeholder="Categorie metier (ex: marketing)"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <textarea
          name="content"
          placeholder="Contenu du prompt"
          rows={4}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
          Ajouter
        </button>
      </form>

      <div className="space-y-3">
        {prompts.map((p) => (
          <div key={p.id} className="rounded-card bg-white p-4 shadow-sm space-y-3">
            <form action={updateSharedPrompt} className="space-y-2">
              <input type="hidden" name="id" value={p.id} />
              <input
                type="text"
                name="title"
                defaultValue={p.title}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                name="category"
                defaultValue={p.category ?? ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <textarea
                name="content"
                defaultValue={p.content}
                rows={4}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" name="shared" defaultChecked={p.isShared || p.userId === null} />
                Visible dans la bibliotheque publique
              </label>
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Enregistrer
              </button>
            </form>
            <form action={deleteSharedPrompt}>
              <input type="hidden" name="id" value={p.id} />
              <button className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50">
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
