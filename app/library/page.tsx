import { redirect } from "next/navigation";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const user = await getPrismaUserFromSupabase();
  if (!user) redirect("/login");

  const prompts = await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Ma bibliothèque de prompts
      </h1>

      {prompts.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-500">
            Aucun prompt sauvegardé. Utilisez l&apos;éditeur et cliquez sur
            &quot;Sauvegarder dans ma bibliothèque&quot; pour les retrouver ici.
          </p>
          <Link href="/editor" className="btn-primary mt-6 inline-block">
            Ouvrir l&apos;éditeur
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {prompts.map((p) => (
            <li
              key={p.id}
              className="card-hover flex items-center justify-between border border-slate-200/80"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 truncate">
                  {p.title || "Sans titre"}
                </p>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {p.content.slice(0, 80)}…
                </p>
              </div>
              <Link
                href={`/editor?edit=${p.id}`}
                className="ml-4 shrink-0 rounded-button border-2 border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                Ouvrir
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
