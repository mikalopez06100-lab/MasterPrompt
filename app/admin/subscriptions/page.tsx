import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-navy">Abonnements</h1>
      <div className="rounded-card bg-white p-4 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="py-2 pr-4">Client</th>
              <th className="py-2 pr-4">Statut</th>
              <th className="py-2 pr-4">Prix Stripe</th>
              <th className="py-2 pr-4">Periode fin</th>
              <th className="py-2 pr-4">Cree le</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.id} className="border-t border-slate-100">
                <td className="py-2 pr-4">{s.user.name || s.user.email}</td>
                <td className="py-2 pr-4">{s.status}</td>
                <td className="py-2 pr-4">{s.stripePriceId}</td>
                <td className="py-2 pr-4">{s.currentPeriodEnd.toLocaleDateString("fr-FR")}</td>
                <td className="py-2 pr-4">{s.createdAt.toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {subscriptions.length === 0 && (
        <p className="text-sm text-slate-500">Aucun abonnement enregistre.</p>
      )}
    </div>
  );
}
