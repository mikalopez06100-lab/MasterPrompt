import Link from "next/link";
import {
  getWhatsAppUrl,
  WHATSAPP_DISPLAY_NUMBER,
  type WhatsAppContext,
} from "@/lib/whatsapp";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type ButtonProps = {
  context?: WhatsAppContext;
  label?: string;
  variant?: "primary" | "outline" | "navy" | "compact";
  className?: string;
  showIcon?: boolean;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[#25D366] text-white shadow-sm hover:bg-[#20BD5A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
  outline:
    "border border-[#25D366] bg-white text-[#128C7E] hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
  navy: "bg-navy text-white hover:bg-navy/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
  compact:
    "bg-[#25D366] text-white hover:bg-[#20BD5A] px-3 py-2 text-xs font-semibold",
};

export function WhatsAppButton({
  context = "default",
  label = "Poser une question sur WhatsApp",
  variant = "primary",
  className = "",
  showIcon = true,
}: ButtonProps) {
  return (
    <Link
      href={getWhatsAppUrl(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${variantClasses[variant]} ${className}`}
    >
      {showIcon ? <WhatsAppIcon className="h-5 w-5 shrink-0" /> : null}
      {label}
    </Link>
  );
}

type HelpSectionProps = {
  context?: WhatsAppContext;
  title?: string;
  description?: string;
  className?: string;
};

export function WhatsAppHelpSection({
  context = "default",
  title = "Une question avant de vous lancer ?",
  description = "Réponse rapide sur WhatsApp — pas de chatbot, c'est Michaël qui répond personnellement.",
  className = "",
}: HelpSectionProps) {
  return (
    <section className={`px-4 py-10 sm:px-6 ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-[#128C7E]">
            <WhatsAppIcon className="h-6 w-6" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">WhatsApp direct</p>
          </div>
          <h2 className="mt-2 text-xl font-bold text-navy sm:text-2xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-medium text-navy">{WHATSAPP_DISPLAY_NUMBER}</span>
          </p>
        </div>
        <WhatsAppButton context={context} label="Écrire sur WhatsApp" />
      </div>
    </section>
  );
}

export function WhatsAppFooterLink() {
  return (
    <Link
      href={getWhatsAppUrl("default")}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-2 text-sm text-[#25D366] hover:text-white"
    >
      <WhatsAppIcon className="h-4 w-4" />
      WhatsApp — {WHATSAPP_DISPLAY_NUMBER}
    </Link>
  );
}

export { WhatsAppIcon };
