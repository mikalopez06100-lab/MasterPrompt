import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Resend } from "resend";
import { LEAD_PDF_EMAIL_HTML } from "./email-lead-pdf-html";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.FROM_EMAIL ?? "Master Prompt <info@masterprompt.fr>";
const PDF_URL = process.env.LEAD_MAGNET_PDF_URL ?? "";
const UNSUBSCRIBE_URL = process.env.UNSUBSCRIBE_URL ?? "https://masterprompt.fr";

function loadEmailHtml(): string {
  const filePath = join(process.cwd(), "lib", "email-lead-pdf.html");
  if (existsSync(filePath)) {
    try {
      const content = readFileSync(filePath, "utf-8");
      if (content && content.length > 500) return content;
    } catch {
      // fallback to imported template
    }
  }
  return typeof LEAD_PDF_EMAIL_HTML === "string" ? LEAD_PDF_EMAIL_HTML : "";
}

export async function sendLeadPdfEmail(to: string, source?: string): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY non configuré" };
  }
  if (!PDF_URL) {
    return { ok: false, error: "LEAD_MAGNET_PDF_URL non configuré" };
  }

  const subject = "Vos 10 prompts sont là";
  let html = loadEmailHtml().replace(/\{\{LIEN_DESABONNEMENT\}\}/g, UNSUBSCRIBE_URL);

  if (!html || html.length < 500) {
    html = `
<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;padding:20px;background:#F0EDE8;">
<h1 style="color:#0D1B2A;">Vos 10 prompts sont là</h1>
<p>Bonjour,</p>
<p>Votre guide PDF <strong>10 Prompts Essentiels</strong> est en pièce jointe.</p>
<p>Utilisez-le dans ChatGPT, Claude ou Gemini en remplaçant les [crochets] par vos informations.</p>
<p>À très vite,<br>Michaël Lopez — Master Prompt</p>
<p style="font-size:12px;color:#64748B;"><a href="${UNSUBSCRIBE_URL}">Se désabonner</a> · <a href="https://masterprompt.fr">masterprompt.fr</a></p>
</body></html>`;
  }

  const text =
    "Vos 10 prompts sont là\n\nBonjour,\n\nVotre guide PDF 10 Prompts Essentiels est en pièce jointe. Utilisez-le dans ChatGPT, Claude ou Gemini en remplaçant les [crochets] par vos informations.\n\nÀ très vite,\nMichaël Lopez — Master Prompt\n\nmasterprompt.fr";

  try {
    const attachments = PDF_URL
      ? [{ filename: "Master-Prompt-10-prompts-essentiels.pdf", path: PDF_URL }]
      : undefined;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to.trim().toLowerCase()],
      subject,
      html,
      text,
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
