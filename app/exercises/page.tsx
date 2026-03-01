export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-navy">
        Exercices
      </h1>

      <div className="card p-12 text-center">
        <p className="text-muted">
          Aucun exercice pour le moment. Revenez bientôt.
        </p>
      </div>
    </div>
  );
}
