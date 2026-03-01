"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/layout/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("callbackUrl") ?? "/dashboard"
      : "/dashboard";

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
        },
      });
      if (err) {
        setError(err.message ?? "Une erreur est survenue.");
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
        },
      });
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4">
      <div className="absolute left-4 top-4">
        <Logo href="/" size="md" />
      </div>

      <div className="w-full max-w-md rounded-card border border-border bg-white p-8 shadow-card">
        <div className="mb-6 h-1 w-12 rounded-full bg-primary" />
        <h1 className="font-heading text-2xl font-bold text-navy">
          Connectez-vous pour continuer
        </h1>
        <p className="mt-2 text-sm text-muted">
          Magic Link par email ou Google. Pas de mot de passe.
        </p>

        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-button border-2 border-border bg-white py-3 text-sm font-semibold text-navy transition-all hover:border-primary/30 hover:bg-slate-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuer avec Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-muted">ou</span>
            </div>
          </div>

          {sent ? (
            <div className="rounded-button bg-primary-light p-4 text-center text-sm text-navy">
              Un lien de connexion a été envoyé à <strong>{email}</strong>. Cliquez dessus pour vous connecter.
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-3">
              {error && (
                <p className="rounded-button bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="card-input w-full"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? "Envoi…" : "Envoyer un lien magique par email"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          En vous connectant, vous acceptez nos conditions d&apos;utilisation.
        </p>
      </div>
    </div>
  );
}
