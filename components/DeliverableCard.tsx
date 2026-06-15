type DeliverableCardProps = {
  icon: string;
  title: string;
  description: string;
  tag?: string;
};

export function DeliverableCard({ icon, title, description, tag }: DeliverableCardProps) {
  return (
    <article className="relative rounded-xl border border-border bg-white p-5">
      {tag ? (
        <span className="absolute right-4 top-4 rounded-full border border-border bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
          {tag}
        </span>
      ) : null}
      <div className="mb-2 text-xl">{icon}</div>
      <h3 className="pr-16 text-base font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </article>
  );
}
