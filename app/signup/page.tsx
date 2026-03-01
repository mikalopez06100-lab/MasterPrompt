import { redirect } from "next/navigation";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

export default async function SignupPage() {
  const user = await getPrismaUserFromSupabase();
  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4">
      <div className="absolute left-4 top-4">
        <Logo href="/" size="md" />
      </div>

      <div className="w-full max-w-md rounded-card border border-border bg-white p-8 shadow-card">
        <div className="mb-6 h-1 w-12 rounded-full bg-primary" />
        <h1 className="font-heading text-2xl font-bold text-navy">
          Créer un compte
        </h1>
        <p className="mt-2 text-sm text-muted">
          Pas de mot de passe. Google ou Magic Link par email.
        </p>
        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/login" className="font-medium text-primary hover:underline">
            Aller à la page de connexion →
          </Link>
        </p>
      </div>
    </div>
  );
}
