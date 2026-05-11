export type FAQItem = {
  question: string;
  answer?: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="group rounded-xl border border-border bg-white p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-navy">
            {item.question}
            <span className="text-xl text-amber-500 transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer?.trim() || "Réponse à venir."}</p>
        </details>
      ))}
    </div>
  );
}
