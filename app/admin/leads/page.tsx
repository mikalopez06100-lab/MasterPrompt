import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-navy">Leads</h1>
      <p className="text-sm text-slate-500">
        Derniers leads capturés depuis la landing (max 500).
      </p>
      <div className="rounded-card bg-white p-4 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Source</th>
              <th className="py-2 pr-4">PDF envoye</th>
              <th className="py-2 pr-4">Date inscription</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-slate-100">
                <td className="py-2 pr-4">{l.email}</td>
                <td className="py-2 pr-4">{l.source ?? "-"}</td>
                <td className="py-2 pr-4">{l.pdfSentAt ? "Oui" : "Non"}</td>
                <td className="py-2 pr-4">{l.createdAt.toLocaleString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leads.length === 0 && <p className="text-sm text-slate-500">Aucun lead pour le moment.</p>}
    </div>
  );
}
