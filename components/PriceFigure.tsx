import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

type PriceFigureProps = {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div";
};

/** Montants en euros — typo lisible (DM Sans + chiffres tabulaires), sans effet « écrasé » de Syne. */
export function PriceFigure({ children, className = "", as: Tag = "span" }: PriceFigureProps) {
  return (
    <Tag className={`${dmSans.className} tabular-nums tracking-tight ${className}`.trim()}>{children}</Tag>
  );
}
