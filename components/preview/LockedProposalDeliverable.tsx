import { ReactNode } from "react";

type Props = {
  badge: string;
  title: string;
  description: string;
  /** Aperçu factice du livrable, recouvert d'un flou intense et d'un overlay confidentiel. */
  children: ReactNode;
  /** Étiquette de l'overlay (ex. "Confidentiel — réservé client"). */
  lockTitle?: string;
  lockSubtitle?: string;
};

/**
 * Carte "livrable de Pack IA" en aperçu : la structure est lisible (titre, sous-titres, blocs de KPI)
 * pour donner une idée du contenu réel, mais l'ensemble est flouté et marqué CONFIDENTIEL.
 * Le contenu enfant est volontairement factice (aucune donnée client réelle ne doit transiter ici).
 */
export function LockedProposalDeliverable({
  badge,
  title,
  description,
  children,
  lockTitle = "Confidentiel — réservé client",
  lockSubtitle = "Le rendu réel sera personnalisé à votre activité",
}: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-white">
      <header className="border-b border-border bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">{badge}</p>
        <h3 className="mt-1 text-lg font-semibold text-navy">{title}</h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </header>

      <div className="relative h-[360px] overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 select-none p-6 blur-[6px] saturate-[0.85] opacity-90">
          {children}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/15 via-slate-900/40 to-slate-900/75" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
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
          <p className="text-sm font-semibold text-white drop-shadow-md">{lockTitle}</p>
          <p className="max-w-[320px] text-xs text-white/90 drop-shadow">{lockSubtitle}</p>
          <span className="mt-1 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            Aperçu structurel uniquement
          </span>
        </div>
      </div>
    </article>
  );
}
