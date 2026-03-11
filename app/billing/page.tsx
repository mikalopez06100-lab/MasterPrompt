/* Page de paiement simple avec Stripe Checkout + code promo */

"use client";

import { useState } from "react";

export default function BillingPage() {
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim() || undefined,
          promoCode: promoCode.trim() || undefined,
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
        Paiement Master Prompt
      </h1>

      <div className="card p-8 space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-slate-500 font-semibold mb-2">
            Offre de lancement
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-heading font-bold text-slate-900">
              49€
            </span>
            <span className="text-sm text-slate-400 line-through">97€</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Accès complet à la formation Master Prompt. Paiement unique via
            Stripe.
          </p>
        </div>

        <form onSubmit={handleCheckout} className="space-y-4">
          {error && (
            <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {statusMessage && (
            <p className="rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-800">
              {statusMessage}
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
              L&apos;email utilisé pour recevoir le reçu et l&apos;accès.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Code promo (optionnel)
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="PROMO10"
            />
            <p className="text-xs text-slate-400">
              Saisissez le code fourni (s&apos;il y en a un). Il sera vérifié
              côté Stripe.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Redirection vers Stripe…" : "Payer maintenant avec Stripe"}
          </button>

          <p className="mt-3 text-xs text-slate-400 text-center">
            Paiement sécurisé Stripe · TVA incluse · Vous serez redirigé vers
            une page de paiement sécurisée.
          </p>
        </form>
      </div>
    </div>
  );
}

