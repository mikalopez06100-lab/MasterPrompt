"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mt-6 space-y-4">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="flex w-full items-center justify-center gap-2 rounded-button border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
      >
        Continuer avec Google
      </button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-muted">ou</span>
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setLoading(true);
          try {
            const result = await signIn("credentials", {
              email: email.trim(),
              callbackUrl: "/dashboard",
              redirect: false,
            });
            if (result?.error) {
              setError("Inscription / connexion impossible. Réessayez.");
              setLoading(false);
              return;
            }
            if (result?.ok) {
              const url = result.url ?? "/dashboard";
              window.location.href = url;
              return;
            }
            setError("Une erreur est survenue.");
          } catch (err) {
            setError("Une erreur est survenue. Réessayez.");
          }
          setLoading(false);
        }}
        className="space-y-3"
      >
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-button border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {loading ? "Inscription…" : "Commencer gratuitement"}
        </button>
      </form>
      <p className="text-center text-sm text-muted">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Connexion
        </Link>
      </p>
    </div>
  );
}
