type PreorderBadgeProps = {
  text?: string;
};

export function PreorderBadge({
  text = "🎬 Précommande ouverte · Accès garanti 1er juin 2026",
}: PreorderBadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-amber-300">
      {text}
    </div>
  );
}
