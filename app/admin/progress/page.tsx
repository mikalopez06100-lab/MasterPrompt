import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProgressPage() {
  const progress = await prisma.userProgress.findMany({
    orderBy: { completedAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      module: { select: { title: true } },
    },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-navy">Progression</h1>
      <p className="text-sm text-slate-500">
        Dernieres progressions (max 200 lignes) pour suivre l&apos;engagement.
      </p>
      <div className="rounded-card bg-white p-4 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2 pr-4">Utilisateur</th>
              <th className="py-2 pr-4">Module</th>
              <th className="py-2 pr-4">Complete</th>
              <th className="py-2 pr-4">Score quiz</th>
              <th className="py-2 pr-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {progress.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                <td className="py-2 pr-4">{row.user.name || row.user.email}</td>
                <td className="py-2 pr-4">{row.module.title}</td>
                <td className="py-2 pr-4">{row.completed ? "Oui" : "Non"}</td>
                <td className="py-2 pr-4">{row.quizScore ?? "-"}</td>
                <td className="py-2 pr-4">
                  {row.completedAt ? row.completedAt.toLocaleString("fr-FR") : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
