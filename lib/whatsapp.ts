export const WHATSAPP_PHONE_E164 = "33756802869";
export const WHATSAPP_DISPLAY_NUMBER = "+33 7 56 80 28 69";

export type WhatsAppContext =
  | "default"
  | "pack-ia"
  | "formation"
  | "accompagnement"
  | "abonnements"
  | "diagnostic"
  | "exemple"
  | "appel";

const MESSAGES: Record<WhatsAppContext, string> = {
  default: "Bonjour Michaël, j'ai une question sur Master Prompt.",
  "pack-ia": "Bonjour Michaël, j'ai une question sur le Pack IA (397€).",
  formation: "Bonjour Michaël, j'ai une question sur la Formation Master Prompt.",
  accompagnement: "Bonjour Michaël, j'ai une question sur l'Accompagnement 90 jours.",
  abonnements: "Bonjour Michaël, j'ai une question sur les abonnements Master Prompt.",
  diagnostic: "Bonjour Michaël, j'ai fait le diagnostic IA et j'aimerais en discuter.",
  exemple: "Bonjour Michaël, j'ai consulté le modèle Pack IA et j'ai une question.",
  appel: "Bonjour Michaël, j'ai réservé un appel discovery et j'ai une question avant notre échange.",
};

export function getWhatsAppUrl(context: WhatsAppContext = "default"): string {
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(MESSAGES[context])}`;
}

const MARKETING_PATH_PATTERNS = [
  /^\/$/,
  /^\/pack-ia(\/|$)/,
  /^\/formation(\/|$)/,
  /^\/accompagnement(\/|$)/,
  /^\/abonnements(\/|$)/,
  /^\/diagnostic(\/|$)/,
  /^\/formulaire-audit(\/|$)/,
  /^\/pack-ia\/merci$/,
  /^\/formation\/merci$/,
  /^\/appel(\/|$)/,
];

export function shouldShowWhatsAppFloating(pathname: string): boolean {
  return MARKETING_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
}
