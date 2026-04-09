import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertAdminUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

async function updateUserRole(formData: FormData) {
  "use server";
  await assertAdminUser();
  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!id || (role !== "STUDENT" && role !== "ADMIN")) return;
  await prisma.user.update({ where: { id }, data: { role } });
  revalidatePath("/admin/users");
}

async function updateUserName(formData: FormData) {
  "use server";
  await assertAdminUser();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id) return;
  await prisma.user.update({ where: { id }, data: { name: name || null } });
  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { prompts: true, progress: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-navy">Utilisateurs</h1>
      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="rounded-card bg-white p-4 shadow-sm space-y-3">
            <div className="text-sm text-slate-600">
              <p className="font-medium text-slate-900">{u.email}</p>
              <p>Prompts: {u._count.prompts} · Progressions: {u._count.progress}</p>
            </div>
            <form action={updateUserName} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={u.id} />
              <input
                type="text"
                name="name"
                defaultValue={u.name ?? ""}
                placeholder="Nom"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
              />
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Maj nom
              </button>
            </form>
            <form action={updateUserRole} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={u.id} />
              <select name="role" defaultValue={u.role} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">
                <option value="STUDENT">STUDENT</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover">
                Maj role
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
