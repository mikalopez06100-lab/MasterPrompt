import { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  /** Aperçu visible derrière le flou (texte / éléments factices). */
  children: ReactNode;
  /** Aspect ratio du conteneur (par défaut 16/9 pour une thumbnail vidéo). */
  aspect?: "video" | "square" | "auto";
  className?: string;
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  auto: "",
};

export function LockedContent({
  title = "Réservé aux membres",
  subtitle,
  children,
  aspect = "video",
  className = "",
}: Props) {
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-border bg-slate-100 ${aspectClass[aspect]} ${className}`}>
      <div className="pointer-events-none absolute inset-0 select-none blur-[8px] saturate-50 opacity-70">
        {children}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/55 to-slate-900/80" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-navy"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-white drop-shadow-md">{title}</p>
        {subtitle && (
          <p className="max-w-[240px] text-xs text-white/85 drop-shadow">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
