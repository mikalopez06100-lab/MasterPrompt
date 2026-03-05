"use client";

import { useState } from "react";

type Props = {
  inputId: string;
  placeholder?: string;
  buttonText: string;
  buttonGreen?: boolean;
  successMessage?: string;
  afterNote?: React.ReactNode;
  /** Mettre input et bouton côte à côte (footer CTA) */
  inline?: boolean;
};

export function EmailSignupBlock({
  inputId,
  placeholder = "votre@email.com",
  buttonText,
  buttonGreen = false,
  successMessage = "✓ Votre PDF est en route ! Vérifiez votre boîte mail.",
  afterNote,
  inline = false,
}: Props) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || success) return;

    setError(null);
    if (!value || !value.includes("@")) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: inputId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg = data?.error || "Impossible d'envoyer l'email. Réessayez.";
        setError(msg);
        return;
      }
      setSuccess(true);
      setValue("");
    } catch (err) {
      setError("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `card-input ${shake ? "animate-shake border-red-500" : ""}`;
  const buttonClass = `py-4 rounded-button font-sans text-base font-semibold cursor-pointer transition-all whitespace-nowrap ${
    inline ? "px-7" : "w-full mt-3"
  } ${
    buttonGreen
      ? "bg-emerald-600 hover:bg-emerald-700 shadow-[0_4px_14px_rgba(22,163,74,0.35)] text-white"
      : "bg-primary text-white hover:bg-primary-hover shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
  }`;

  return (
    <form onSubmit={handleSubmit} className={inline ? "flex gap-3 flex-wrap justify-center w-full max-w-[460px]" : ""}>
      <input
        id={inputId}
        type="email"
        placeholder={placeholder}
        autoComplete="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={success || loading}
        className={inline ? `${inputClass} flex-1 min-w-[220px] bg-white/10 border-white/20 placeholder:text-white/25 text-white focus:border-primary` : inputClass}
      />
      <button type="submit" className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`} disabled={loading || success}>
        {loading ? "Envoi en cours…" : buttonText}
      </button>
      {!inline && afterNote}
      {error && (
        <p className={inline ? "text-red-200 text-sm font-medium mt-3 w-full" : "text-red-600 text-sm font-medium mt-3"}>
          {error}
        </p>
      )}
      {success && (
        <p className={inline ? "text-emerald-400 text-sm font-medium mt-3 w-full" : "text-emerald-600 text-sm font-medium mt-3"}>
          {successMessage}
        </p>
      )}
    </form>
  );
}
