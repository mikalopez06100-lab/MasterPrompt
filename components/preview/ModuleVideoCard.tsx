import { LockedContent } from "./LockedContent";

type Props = {
  moduleNumber: number;
  title: string;
  duration: string;
  lessons: number;
  /** URL Supabase de la vidéo. Si vide, on n'affiche jamais le player (fallback gradient). */
  videoUrl?: string;
  /** Niveau d'accès du visiteur. "full" lit la vidéo, sinon = LockedContent flouté. */
  accessLevel: "none" | "preview" | "full";
  /** Label personnalisé pour le bloc "MODULE XX" (ex. "INTRO" pour la présentation). */
  badgeLabel?: string;
  /** Si vrai, la vidéo se lit même en mode preview (utile pour les teasers publics). */
  alwaysUnlocked?: boolean;
};

export function ModuleVideoCard({
  moduleNumber,
  title,
  duration,
  lessons,
  videoUrl,
  accessLevel,
  badgeLabel,
  alwaysUnlocked = false,
}: Props) {
  const hasVideo = Boolean(videoUrl);
  const isUnlocked = hasVideo && (alwaysUnlocked || accessLevel === "full");
  const moduleLabel = badgeLabel ?? `Module ${moduleNumber}`;
  const badge = badgeLabel ?? `MODULE ${String(moduleNumber).padStart(2, "0")}`;

  return (
    <article className="rounded-2xl border border-border bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
        {moduleLabel}
      </p>
      <h3 className="mt-1 text-base font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-xs text-muted">
        {lessons > 0 ? `${lessons} leçons · ${duration}` : duration}
      </p>

      <div className="mt-3">
        {isUnlocked ? (
          <div className="overflow-hidden rounded-xl border border-border bg-black">
            <video
              src={videoUrl}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full object-contain"
              crossOrigin="anonymous"
            >
              Votre navigateur ne supporte pas la lecture vidéo HTML5.
            </video>
          </div>
        ) : (
          <LockedContent
            title="Vidéo réservée aux membres"
            subtitle={hasVideo ? `${lessons} leçons · ${duration} · Disponible 1er juillet 2026` : `${lessons} leçons · ${duration}`}
            aspect="video"
          >
            <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-navy via-slate-700 to-slate-900">
              <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-navy">
                {badge}
              </span>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 text-navy"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>
          </LockedContent>
        )}
      </div>
    </article>
  );
}
