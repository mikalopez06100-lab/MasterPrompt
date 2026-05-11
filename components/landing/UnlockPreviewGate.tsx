"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  variant?: "dark" | "light";
  /** Destination après validation. Défaut : valeur renvoyée par l'API (/espace-formation). */
  redirectTo?: string;
  /** Source à transmettre à l'API (utile pour segmenter dans Brevo). */
  source?: string;
  /** Libellé du bouton de soumission. */
  buttonLabel?: string;
  /** Identifiant unique pour l'input (utile si plusieurs gates sur la même page). */
  inputId?: string;
};

export function UnlockPreviewGate({
  variant = "dark",
  redirectTo,
  source,
  buttonLabel = "Voir l'espace formation",
  inputId = "preview-gate-email",
}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Merci d'entrer un email valide.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/preview-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, redirectTo }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || "Impossible de débloquer l'aperçu. Réessayez.");
        return;
      }
      router.push(redirectTo || data?.redirectTo || "/espace-formation");
      router.refresh();
    } catch {
      setError("Erreur de connexion. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = variant === "dark";
  const inputClass = isDark
    ? "w-full rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-amber-400 focus:outline-none"
    : "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-muted focus:border-blue-500 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor={inputId} className="sr-only">
        Votre email
      </label>
      <input
        id={inputId}
        type="email"
        autoComplete="email"
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className={`${inputClass} sm:flex-1`}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Chargement…" : buttonLabel}
      </button>
      {error && (
        <p className={`mt-1 w-full text-xs ${isDark ? "text-red-200" : "text-red-600"}`}>{error}</p>
      )}
    </form>
  );
}
