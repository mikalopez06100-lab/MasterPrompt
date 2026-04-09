export const dynamic = "force-dynamic";

export default function AdminExercisesPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-semibold text-navy">Exercices</h1>
      <div className="rounded-card bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">
          Cette section est prete pour la gestion des exercices (briefs, niveaux,
          corrections types). Les donnees d&apos;exercices ne sont pas encore
          modélisées dans la base.
        </p>
      </div>
    </div>
  );
}
