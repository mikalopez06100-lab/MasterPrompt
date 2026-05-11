import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"] });

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
      <p className={`${syne.className} text-5xl font-extrabold ${accent === "amber" ? "text-amber-500" : "text-navy"}`}>
        {currentPrice}
      </p>
      {note ? <p className="mt-1 text-sm text-muted">{note}</p> : null}
    </div>
  );
}
