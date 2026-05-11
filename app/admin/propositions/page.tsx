import Link from "next/link";
import { proposals } from "@/lib/proposals";
import { CopyButton } from "./CopyButton";

export const dynamic = "force-dynamic";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://www.masterprompt.fr";

function countDeliverables(p: (typeof proposals)[number]): number {
  if (p.deliverableGroups?.length) {
    return p.deliverableGroups.reduce(
      (sum, group) => sum + group.deliverables.length,
      0,
    );
  }
  if (p.deliverables?.length) return p.deliverables.length;
  let n = 0;
  if (p.analysisPdfUrl || p.analysisHtmlUrl) n += 1;
  if (p.mockupUrl) n += 1;
  return n;
}

export default function AdminPropositionsPage() {
  const token = process.env.PROPOSAL_ACCESS_TOKEN?.trim() || "";
  const tokenConfigured = token.length > 0;

  const rows = proposals
    .slice()
    .sort((a, b) => a.clientName.localeCompare(b.clientName, "fr"))
    .map((p) => {
      const publicPath = `/propositions/${p.slug}`;
      const publicUrlNoToken = `${APP_URL}${publicPath}`;
      const clientUrl = tokenConfigured
        ? `${publicUrlNoToken}?token=${encodeURIComponent(token)}`
        : publicUrlNoToken;
      return {
        slug: p.slug,
        clientName: p.clientName,
        title: p.title,
        deliverablesCount: countDeliverables(p),
        publicPath,
        publicUrlNoToken,
        clientUrl,
      };
    });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-semibold text-navy">
          Propositions clients
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Espaces privés générés à partir de <code>lib/proposals.ts</code>.{" "}
          {rows.length} proposition{rows.length > 1 ? "s" : ""} active
          {rows.length > 1 ? "s" : ""}.
        </p>
      </header>

      {!tokenConfigured && (
        <div className="rounded-card border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>PROPOSAL_ACCESS_TOKEN non configuré</strong> sur cet environnement.
          Les liens client ci-dessous ne contiendront pas de token — les clients
          tomberont sur la page « Espace privé ». Configurez la variable d&apos;env
          dans Vercel et redéployez.
        </div>
      )}

      <div className="rounded-card bg-white p-4 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2 pr-4">Client</th>
              <th className="py-2 pr-4">Slug</th>
              <th className="py-2 pr-4">Titre</th>
              <th className="py-2 pr-4">Livrables</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-t border-slate-100 align-top">
                <td className="py-3 pr-4 font-medium text-navy">
                  {r.clientName}
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-slate-600">
                  {r.slug}
                </td>
                <td className="py-3 pr-4 text-slate-700">{r.title}</td>
                <td className="py-3 pr-4 text-center text-slate-700">
                  {r.deliverablesCount}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={r.clientUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                    >
                      Ouvrir (avec token) ↗
                    </Link>
                    <Link
                      href={r.publicPath}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Voir sans token
                    </Link>
                    <CopyButton text={r.clientUrl} label="Copier lien client" />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-500">
                  Aucune proposition.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-card border border-slate-200 bg-white p-4 text-sm text-slate-600">
        <p className="font-semibold text-navy">Comment ajouter une proposition ?</p>
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>
            Placer les fichiers HTML/PDF dans{" "}
            <code className="rounded bg-slate-100 px-1">
              public/proposals/&lt;slug&gt;/
            </code>
          </li>
          <li>
            Ajouter l&apos;entrée dans{" "}
            <code className="rounded bg-slate-100 px-1">lib/proposals.ts</code>{" "}
            (tableau <code>proposals</code>)
          </li>
          <li>Commit + push : Vercel rebuild automatiquement</li>
          <li>
            Partager le lien « avec token » avec le client (visible ci-dessus)
          </li>
        </ol>
      </div>
    </div>
  );
}
