type DeliverableCardProps = {
  icon: string;
  title: string;
  description: string;
};

export function DeliverableCard({ icon, title, description }: DeliverableCardProps) {
  return (
    <article className="rounded-xl border border-border bg-white p-5">
      <div className="mb-2 text-xl">{icon}</div>
      <h3 className="text-base font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </article>
  );
}
