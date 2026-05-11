import { NextResponse } from "next/server";
import { Resend } from "resend";

type AuditIntakePayload = {
  contactNom: string;
  contactEmail: string;
  pitch: string;
  stage: string;
  launchedRevenueRange?: string;
  idealClient: string;
  competitors: string;
  objective12m: string;
  constraints: string[];
  constraintsDetails?: string;
  failedAttempts: string;
  priorities: string[];
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nl2br(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<AuditIntakePayload> | null;
  if (!body) {
    return NextResponse.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  const contactNom = String(body.contactNom ?? "").trim();
  const contactEmail = String(body.contactEmail ?? "").trim().toLowerCase();
  const pitch = String(body.pitch ?? "").trim();
  const stage = String(body.stage ?? "").trim();
  const launchedRevenueRange = String(body.launchedRevenueRange ?? "").trim();
  const idealClient = String(body.idealClient ?? "").trim();
  const competitors = String(body.competitors ?? "").trim();
  const objective12m = String(body.objective12m ?? "").trim();
  const constraints = Array.isArray(body.constraints)
    ? body.constraints.map((item) => String(item).trim()).filter(Boolean)
    : [];
  const constraintsDetails = String(body.constraintsDetails ?? "").trim();
  const failedAttempts = String(body.failedAttempts ?? "").trim();
  const priorities = Array.isArray(body.priorities)
    ? body.priorities.map((item) => String(item).trim()).filter(Boolean)
    : [];

  if (
    !contactNom ||
    !contactEmail ||
    !isValidEmail(contactEmail) ||
    !pitch ||
    !stage ||
    !idealClient ||
    !competitors ||
    !objective12m ||
    !failedAttempts ||
    priorities.length === 0
  ) {
    return NextResponse.json({ error: "Champs invalides ou incomplets." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY manquant." }, { status: 500 });
  }

  const from = process.env.EMAIL_FROM ?? process.env.FROM_EMAIL ?? "hello@masterprompt.fr";
  const to = process.env.EMAIL_TO ?? "hello@masterprompt.fr";

  const html = `
    <h2>Nouveau formulaire audit client</h2>
    <p><strong>Nom :</strong> ${escapeHtml(contactNom)}</p>
    <p><strong>Email :</strong> ${escapeHtml(contactEmail)}</p>
    <hr/>
    <p><strong>1) Positionnement :</strong><br/>${nl2br(pitch)}</p>
    <p><strong>2) Stade :</strong> ${escapeHtml(stage)}${launchedRevenueRange ? ` (${escapeHtml(launchedRevenueRange)})` : ""}</p>
    <p><strong>3) Client ideal :</strong><br/>${nl2br(idealClient)}</p>
    <p><strong>4) Concurrents :</strong><br/>${nl2br(competitors)}</p>
    <p><strong>5) Objectif 12 mois :</strong><br/>${nl2br(objective12m)}</p>
    <p><strong>6) Contraintes :</strong> ${constraints.length ? escapeHtml(constraints.join(", ")) : "Aucune indiquee"}</p>
    <p><strong>Details contraintes :</strong><br/>${constraintsDetails ? nl2br(constraintsDetails) : "Non precise"}</p>
    <p><strong>7) Tentatives non concluantes :</strong><br/>${nl2br(failedAttempts)}</p>
    <p><strong>8) Priorites de challenge :</strong> ${escapeHtml(priorities.join(", "))}</p>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from,
      to: [to],
      replyTo: contactEmail,
      subject: `Audit client - ${contactNom}`,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
