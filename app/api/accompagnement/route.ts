import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getInboundNotificationEmail, getResendFromHeader } from "@/lib/resend-addresses";

type Payload = {
  nom: string;
  email: string;
  telephone: string;
  activite: string;
  ca: string;
  attente: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<Payload> | null;
  if (!body) return NextResponse.json({ error: "Body invalide" }, { status: 400 });

  const nom = String(body.nom ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const telephone = String(body.telephone ?? "").trim();
  const activite = String(body.activite ?? "").trim();
  const ca = String(body.ca ?? "").trim();
  const attente = String(body.attente ?? "").trim();

  if (!nom || !email || !telephone || !activite || !ca || !attente) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: getResendFromHeader(),
        to: [getInboundNotificationEmail()],
        replyTo: email,
        subject: `Candidature Accompagnement — ${nom}`,
        html: `
          <h2>Nouvelle candidature Accompagnement</h2>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${telephone}</p>
          <p><strong>Activité :</strong> ${activite}</p>
          <p><strong>CA :</strong> ${ca}</p>
          <p><strong>Attente :</strong><br/>${attente.replace(/\n/g, "<br/>")}</p>
        `,
      });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID_ACCOMPAGNEMENT ?? "");
    if (brevoApiKey && Number.isFinite(listId)) {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": brevoApiKey },
        body: JSON.stringify({
          email,
          attributes: { NOM: nom, TELEPHONE: telephone, ACTIVITE: activite, CA: ca, ATTENTE: attente },
          listIds: [listId],
          updateEnabled: true,
        }),
      }).catch(() => null);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
