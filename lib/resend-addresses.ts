/**
 * Expéditeur / destinataires Resend — priorité EMAIL_FROM puis FROM_EMAIL
 * (sur Vercel, une seule des deux peut être renseignée).
 */
export function getResendFromHeader(): string {
  const explicit = process.env.EMAIL_FROM?.trim() || process.env.FROM_EMAIL?.trim();
  if (explicit) return explicit;
  return "Master Prompt <info@masterprompt.fr>";
}

export function getInboundNotificationEmail(): string {
  return process.env.EMAIL_TO?.trim() || "hello@masterprompt.fr";
}

export function hasOutboundFromConfigured(): boolean {
  return Boolean(process.env.EMAIL_FROM?.trim() || process.env.FROM_EMAIL?.trim());
}
