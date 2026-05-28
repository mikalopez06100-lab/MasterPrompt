type TestimonialBlockProps = {
  quote: string;
  name: string;
  role: string;
  offer: string;
  websiteUrl?: string;
  websiteLabel?: string;
};

export function TestimonialBlock({
  quote,
  name,
  role,
  offer,
  websiteUrl,
  websiteLabel,
}: TestimonialBlockProps) {
  return (
    <article className="rounded-2xl border border-border bg-white p-6">
      <p className="text-sm tracking-[0.18em] text-amber-500">★★★★★</p>
      <blockquote className="mt-3 border-l-2 border-amber-500 pl-3 text-sm italic leading-relaxed text-slate-700">
        "{quote}"
      </blockquote>
      <div className="mt-4">
        <p className="font-semibold text-navy">{name}</p>
        <p className="text-sm text-muted">{role}</p>
        {websiteUrl ? (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm font-medium text-blue-700 underline-offset-2 hover:underline"
          >
            {websiteLabel ?? websiteUrl}
          </a>
        ) : null}
      </div>
      <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{offer}</span>
    </article>
  );
}
