import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.FROM_EMAIL ?? "Master Prompt <info@masterprompt.fr>";
const PDF_URL = process.env.LEAD_MAGNET_PDF_URL ?? "";

export async function sendLeadPdfEmail(to: string, source?: string): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY non configuré" };
  }
  if (!PDF_URL) {
    return { ok: false, error: "LEAD_MAGNET_PDF_URL non configuré" };
  }

  const subject = "Votre guide PDF Master Prompt — 10 prompts essentiels";
  const html = `
    <p>Bonjour,</p>
    <p>Merci pour votre inscription. Voici votre guide PDF <strong>« 10 Prompts Essentiels »</strong> en pièce jointe.</p>
    <p>Vous pouvez l'utiliser tout de suite dans ChatGPT, Claude ou Gemini.</p>
    <p>À bientôt,<br/>L'équipe Master Prompt</p>
  `;

  try {
    const attachments = PDF_URL
      ? [{ filename: "Master-Prompt-10-prompts-essentiels.pdf", path: PDF_URL }]
      : undefined;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to.trim().toLowerCase()],
      subject,
      html,
      attachments,
    });

    if (error) {
      console.error("[sendLeadPdfEmail]", error);
      const msg = typeof error === "object" && error !== null && "message" in error && typeof (error as { message: unknown }).message === "string"
        ? (error as { message: string }).message
        : String(error);
      return { ok: false, error: msg || "Échec envoi email" };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[sendLeadPdfEmail]", err);
    return { ok: false, error: message };
  }
}
