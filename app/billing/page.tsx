"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PriceFigure } from "@/components/PriceFigure";

function BillingPageContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const status = searchParams.get("status");
  const next = searchParams.get("next");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Impossible de démarrer le paiement.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("URL de paiement Stripe manquante.");
        setLoading(false);
      }
    } catch {
      setError("Une erreur est survenue. Merci de réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Commander Master Prompt
      </h1>

      <div className="card p-8 space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-slate-500 font-semibold mb-2">
            Offre de lancement — Précommande
          </p>
          <div className="flex items-baseline gap-2">
            <PriceFigure className="text-4xl font-bold text-slate-900">49€</PriceFigure>
            <PriceFigure className="text-sm font-medium text-slate-400 line-through">97€</PriceFigure>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Vous réservez dès maintenant votre accès à la formation Master
            Prompt au tarif de lancement. L&apos;accès complet à la plateforme
            sera ouvert en avant-première aux personnes ayant précommandé.
          </p>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          {error && (
            <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {status === "success" && (
            <div className="rounded-md bg-emerald-50 border border-emerald-200 px-3 py-3 text-sm text-emerald-900 space-y-2">
              <p className="font-medium">Paiement confirme. Votre acces est active.</p>
              <p>
                Prochaine etape: connectez-vous pour acceder a la plateforme.
              </p>
              {next === "login" && (
                <Link href="/login?callbackUrl=/dashboard" className="inline-flex text-emerald-900 underline underline-offset-2 font-semibold">
                  Se connecter a la plateforme
                </Link>
              )}
            </div>
          )}
          {status === "cancelled" && (
            <p className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-900">
              Paiement annule. Vous pouvez reessayer quand vous voulez.
            </p>
          )}

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Adresse email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="vous@exemple.com"
            />
            <p className="text-xs text-slate-400">
              L&apos;email utilisé pour recevoir votre reçu et, dès l&apos;ouverture,
              vos identifiants d&apos;accès à la formation.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Redirection vers Stripe…"
              : "Valider ma précommande à 49€"}
          </button>

          <p className="mt-3 text-xs text-slate-400 text-center">
            Paiement sécurisé Stripe · TVA incluse · Vous serez redirigé vers
            une page de paiement sécurisée. Accès à la formation dès son
            ouverture officielle (vous serez prévenu par email en priorité).
          </p>
        </form>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl p-8 text-sm text-slate-500">Chargement...</div>}>
      <BillingPageContent />
    </Suspense>
  );
}

