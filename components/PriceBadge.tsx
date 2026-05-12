import { PriceFigure } from "@/components/PriceFigure";

type PriceBadgeProps = {
  currentPrice: string;
  originalPrice?: string;
  note?: string;
  accent?: "amber" | "navy";
};

export function PriceBadge({ currentPrice, originalPrice, note, accent = "amber" }: PriceBadgeProps) {
  return (
    <div>
      {originalPrice ? <p className="text-sm text-muted line-through">{originalPrice}</p> : null}
      <PriceFigure
        as="p"
        className={`text-4xl font-bold sm:text-5xl ${accent === "amber" ? "text-amber-500" : "text-navy"}`}
      >
        {currentPrice}
      </PriceFigure>
      {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
    </div>
  );
}
