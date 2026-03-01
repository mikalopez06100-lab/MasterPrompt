import { redirect } from "next/navigation";
import Link from "next/link";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { Logo } from "@/components/layout/Logo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getPrismaUserFromSupabase();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="flex w-56 flex-col border-r border-slate-200 bg-white">
        <div className="flex flex-col border-b border-slate-200 px-3 py-4">
          <Logo href="/admin" size="sm" />
          <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Admin
          </span>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          <Link
            href="/admin"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Tableau de bord
          </Link>
          <Link
            href="/admin/courses"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cours
          </Link>
        </nav>
        <Link
          href="/dashboard"
          className="border-t border-slate-200 p-3 text-sm text-muted hover:text-slate-900"
        >
          ← Retour à l&apos;app
        </Link>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
