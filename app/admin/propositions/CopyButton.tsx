"use client";

import { useState } from "react";

type Props = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "Copier" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const fallback = window.prompt("Copiez ce lien :", text);
      if (fallback !== null) setCopied(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
        copied
          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
          : "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
      }`}
    >
      {copied ? "Copié ✓" : label}
    </button>
  );
}
