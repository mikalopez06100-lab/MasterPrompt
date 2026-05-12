import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Resend } from "resend";
import { LEAD_PDF_EMAIL_HTML } from "./email-lead-pdf-html";
import { getInboundNotificationEmail, getResendFromHeader } from "./resend-addresses";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = getResendFromHeader();
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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "https://www.masterprompt.fr";
const ADMIN_NOTIF_TO = getInboundNotificationEmail();

type PreviewContext = {
  email: string;
  source: string;
  redirectTo: string;
};

function describePreview(source: string, redirectTo: string): {
  label: string;
  ctaUrl: string;
  ctaLabel: string;
  intro: string;
} {
  if (source.includes("pack-ia") || redirectTo.startsWith("/pack-ia")) {
    return {
      label: "Exemple Pack IA",
      ctaUrl: `${APP_URL}/pack-ia/exemple`,
      ctaLabel: "Voir l'exemple de Pack IA",
      intro:
        "Vous avez débloqué un aperçu confidentiel d'un Pack IA déjà livré. Toutes les données client sont anonymisées.",
    };
  }
  return {
    label: "Espace formation",
    ctaUrl: `${APP_URL}/espace-formation`,
    ctaLabel: "Accéder à l'espace formation",
    intro:
      "Vous avez débloqué l'aperçu de l'espace formation Master Prompt : 7 modules, bibliothèque de prompts, exercices, éditeur intelligent. Les modules complets seront accessibles le 1er juin 2026 après précommande.",
  };
}

export async function sendPreviewWelcomeEmail({
  email,
  source,
  redirectTo,
}: PreviewContext): Promise<{ ok: boolean; error?: string }> {
  if (!resend) return { ok: false, error: "RESEND_API_KEY non configuré" };

  const ctx = describePreview(source, redirectTo);
  const subject = `Votre accès au ${ctx.label.toLowerCase()} est ouvert`;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background:#F0EDE8; margin:0; padding:32px 16px; color:#0D1B2A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:16px; padding:32px;">
    <tr><td>
      <p style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#64748B; margin:0 0 12px;">MASTER PROMPT</p>
      <h1 style="font-size:24px; margin:0 0 16px; color:#0D1B2A;">Votre accès est ouvert</h1>
      <p style="font-size:15px; line-height:1.6; color:#334155;">Bonjour,</p>
      <p style="font-size:15px; line-height:1.6; color:#334155;">${ctx.intro}</p>
      <p style="margin:28px 0;">
        <a href="${ctx.ctaUrl}" style="display:inline-block; background:#F59E0B; color:#0D1B2A; font-weight:700; text-decoration:none; padding:14px 24px; border-radius:8px; font-size:14px;">${ctx.ctaLabel} →</a>
      </p>
      <p style="font-size:13px; line-height:1.6; color:#64748B;">Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :<br><a href="${ctx.ctaUrl}" style="color:#1D4ED8; word-break:break-all;">${ctx.ctaUrl}</a></p>
      <hr style="border:none; border-top:1px solid #E2E8F0; margin:28px 0;">
      <p style="font-size:13px; line-height:1.6; color:#334155;">À très vite,<br>Michaël Lopez — Master Prompt</p>
      <p style="font-size:11px; line-height:1.6; color:#94A3B8; margin-top:20px;">Vous recevez cet email parce que vous avez demandé un aperçu sur masterprompt.fr. Désabonnement : répondez simplement à cet email.</p>
    </td></tr>
  </table>
</body>
</html>`;

  const text =
    `Votre accès au ${ctx.label.toLowerCase()} est ouvert.\n\n` +
    `${ctx.intro}\n\n` +
    `Lien : ${ctx.ctaUrl}\n\n` +
    `À très vite,\nMichaël Lopez — Master Prompt\nmasterprompt.fr`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[sendPreviewWelcomeEmail]", error);
      const msg =
        typeof error === "object" && error !== null && "message" in error && typeof (error as { message: unknown }).message === "string"
          ? (error as { message: string }).message
          : String(error);
      return { ok: false, error: msg };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[sendPreviewWelcomeEmail]", err);
    return { ok: false, error: message };
  }
}

export async function sendPreviewAdminNotification({
  email,
  source,
  redirectTo,
}: PreviewContext): Promise<{ ok: boolean; error?: string }> {
  if (!resend) return { ok: false, error: "RESEND_API_KEY non configuré" };

  const ctx = describePreview(source, redirectTo);
  const subject = `[Lead aperçu] ${email} — ${ctx.label}`;
  const html = `
    <h2>Nouveau lead aperçu</h2>
    <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Source :</strong> ${source}</p>
    <p><strong>Aperçu débloqué :</strong> ${ctx.label} (<a href="${ctx.ctaUrl}">${ctx.ctaUrl}</a>)</p>
    <p><strong>Reçu le :</strong> ${new Date().toISOString()}</p>
    <hr>
    <p style="color:#64748B; font-size:12px;">Notification automatique de masterprompt.fr — la table <code>Lead</code> a été mise à jour.</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_NOTIF_TO],
      replyTo: email,
      subject,
      html,
    });
    if (error) {
      console.error("[sendPreviewAdminNotification]", error);
      const msg =
        typeof error === "object" && error !== null && "message" in error && typeof (error as { message: unknown }).message === "string"
          ? (error as { message: string }).message
          : String(error);
      return { ok: false, error: msg };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[sendPreviewAdminNotification]", err);
    return { ok: false, error: message };
  }
}
