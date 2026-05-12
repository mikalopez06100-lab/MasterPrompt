import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getInboundNotificationEmail, getResendFromHeader } from "@/lib/resend-addresses";

type ContactPayload = {
  prenom: string;
  email: string;
  activite: string;
  objectif: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<ContactPayload> | null;
  if (!body) return NextResponse.json({ error: "Body JSON invalide." }, { status: 400 });

  const prenom = String(body.prenom ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const activite = String(body.activite ?? "").trim();
  const objectif = String(body.objectif ?? "").trim();

  if (!prenom || !email || !activite || !objectif || !isValidEmail(email)) {
    return NextResponse.json({ error: "Champs invalides ou incomplets." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = getResendFromHeader();
  const to = getInboundNotificationEmail();

  if (!resendApiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY manquant." }, { status: 500 });
  }

  try {
    const resend = new Resend(resendApiKey);
    const subject = `Pack IA - ${prenom} (${activite})`;
    const html = `
      <h2>Nouvelle demande Pack IA</h2>
      <p><strong>Prenom :</strong> ${prenom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Activite :</strong> ${activite}</p>
      <p><strong>Objectif :</strong><br/>${objectif.replace(/\n/g, "<br/>")}</p>
    `;

    await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html,
    });

    const brevoApiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID_PACK_IA ?? "");
    if (brevoApiKey && Number.isFinite(listId)) {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          email,
          attributes: { PRENOM: prenom, ACTIVITE: activite, OBJECTIF: objectif },
          listIds: [listId],
          updateEnabled: true,
        }),
      }).catch(() => null);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
