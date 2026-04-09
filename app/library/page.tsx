import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CopyPromptButton } from "./copy-prompt-button";
import { LibraryMetierSelect } from "./metier-select";
import { BUILTIN_PROMPTS } from "@/lib/prompt-library";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  marketing: "Marketing",
  rh: "Ressources humaines",
  ux: "UX / Produit",
  it: "Tech / IT",
  general: "General",
  "général": "General",
  "architecte-interieur": "Architecte d'interieur",
  "plombier-independant": "Plombier independant",
  "entrepreneur-independant": "Entrepreneur independant (Cinemark Azur)",
  "jardinier-independant": "Jardinier independant",
  "artiste-sculpteur": "Artiste sculpteur (EZEA)",
  "coiffeur-independant": "Coiffeur independant",
  "traiteur-evenementiel": "Traiteur evenementiel",
  "chef-a-domicile": "Chef a domicile",
  "coach-sportif-independant": "Coach sportif independant",
  "agence-immobiliere": "Agence immobiliere",
  "journaliste-independant": "Journaliste independant",
  "courtier-credit": "Courtier en credit",
  "marchand-de-biens": "Marchand de biens",
  "conciergerie-lcd": "Conciergerie location courte duree",
  "maitre-oeuvre-btp": "Maitre d'oeuvre BTP",
};

function getCategoryLabel(raw: string | null) {
  if (!raw) return "General";
  const normalized = raw.trim().toLowerCase();
  return CATEGORY_LABELS[normalized] ?? raw;
}

export default async function LibraryPage({
  searchParams,
}: {
  searchParams?: { metier?: string };
}) {
  const user = await getPrismaUserFromSupabase();
  if (!user) redirect("/login");

  const [myPrompts, sharedPromptsFromDb] = await Promise.all([
    prisma.prompt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.prompt.findMany({
      where: {
        OR: [{ userId: null }, { isShared: true }],
      },
      orderBy: [{ category: "asc" }, { title: "asc" }],
    }),
  ]);

  const sharedPrompts = [
    ...BUILTIN_PROMPTS.map((p) => ({
      id: `builtin:${p.id}`,
      title: p.title,
      content: p.content,
      category: p.category,
      isBuiltin: true,
    })),
    ...sharedPromptsFromDb.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      category: p.category,
      isBuiltin: false,
    })),
  ];

  const sharedByCategory = sharedPrompts.reduce<Record<string, typeof sharedPrompts>>(
    (acc, prompt) => {
      const key = getCategoryLabel(prompt.category);
      if (!acc[key]) acc[key] = [];
      acc[key].push(prompt);
      return acc;
    },
    {}
  );

  const sortedCategories = Object.keys(sharedByCategory).sort((a, b) =>
    a.localeCompare(b, "fr")
  );

  const totalShared = sharedPrompts.length;
  const totalMine = myPrompts.length;

  const categoryQueryMap = Object.fromEntries(
    sortedCategories.map((c) => [c, encodeURIComponent(c.toLowerCase())])
  );

  const quickFilterLinks = [
    { label: "Tous les metiers", href: "/library" },
    ...sortedCategories.map((category) => ({
      label: category,
      href: `/library?metier=${categoryQueryMap[category]}`,
    })),
  ];

  const selectedCategoryRaw = (searchParams?.metier ?? "").trim().toLowerCase();
  const selectedCategory = sortedCategories.find(
    (c) => c.toLowerCase() === selectedCategoryRaw
  );

  const allSections = sortedCategories.map((category) => ({
    category,
    prompts: sharedByCategory[category],
  }));
  const categorySections = selectedCategory
    ? allSections.filter((section) => section.category === selectedCategory)
    : allSections;

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Ma bibliothèque de prompts
      </h1>

      <div className="card space-y-3 border border-slate-200/80">
        <h2 className="font-heading text-lg font-semibold text-slate-900">
          Prompts prets a l&apos;emploi par metier
        </h2>
        <p className="text-sm text-slate-500">
          {totalShared} prompt(s) partages, classes par categorie metier.
        </p>
        <Suspense
          fallback={
            <div className="h-10 max-w-md animate-pulse rounded-lg bg-slate-100" />
          }
        >
          <LibraryMetierSelect categories={sortedCategories} />
        </Suspense>
        <div className="flex flex-wrap gap-2 pt-1">
          {quickFilterLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                item.href === "/library"
                  ? !selectedCategory
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  : selectedCategory &&
                      item.href === `/library?metier=${categoryQueryMap[selectedCategory]}`
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {categorySections.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-500">
            Aucun prompt metier partage pour le moment.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {categorySections.map(({ category, prompts }) => (
            <section key={category} className="space-y-3">
              <h3 className="font-heading text-xl font-semibold text-slate-900">
                {category}
              </h3>
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
                        {p.content.slice(0, 100)}…
                      </p>
                    </div>
                    {p.isBuiltin ? (
                      <Link
                        href={`/editor?template=${encodeURIComponent(p.id.replace("builtin:", ""))}`}
                        className="ml-4 shrink-0 rounded-button border-2 border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        Utiliser
                      </Link>
                    ) : (
                      <Link
                        href={`/editor?edit=${p.id}`}
                        className="ml-4 shrink-0 rounded-button border-2 border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        Utiliser
                      </Link>
                    )}
                    <CopyPromptButton content={p.content} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="card space-y-3 border border-slate-200/80">
        <h2 className="font-heading text-lg font-semibold text-slate-900">
          Mes prompts sauvegardes
        </h2>
        <p className="text-sm text-slate-500">
          {totalMine} prompt(s) enregistres dans votre espace.
        </p>
      </div>

      {myPrompts.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-500">
            Aucun prompt sauvegarde. Utilisez l&apos;editeur et cliquez sur
            &quot;Sauvegarder dans ma bibliotheque&quot; pour les retrouver ici.
          </p>
          <Link href="/editor" className="btn-primary mt-6 inline-block">
            Ouvrir l&apos;editeur
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {myPrompts.map((p) => (
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
              <CopyPromptButton content={p.content} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
