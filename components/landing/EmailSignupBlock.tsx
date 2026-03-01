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
  const [shake, setShake] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !value.includes("@")) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
    setSuccess(true);
    setValue("");
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
        disabled={success}
        className={inline ? `${inputClass} flex-1 min-w-[220px] bg-white/10 border-white/20 placeholder:text-white/25 text-white focus:border-primary` : inputClass}
      />
      <button type="submit" className={buttonClass}>
        {buttonText}
      </button>
      {!inline && afterNote}
      {success && (
        <p className={inline ? "text-emerald-400 text-sm font-medium mt-3 w-full" : "text-emerald-600 text-sm font-medium mt-3"}>
          {successMessage}
        </p>
      )}
    </form>
  );
}
