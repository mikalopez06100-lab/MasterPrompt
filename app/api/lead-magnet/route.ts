import { NextResponse } from "next/server";
import { sendLeadPdfEmail } from "@/lib/email";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const { ok, error } = await sendLeadPdfEmail(email, "lead-magnet-v5");
  if (!ok) {
    return NextResponse.json({ error: error ?? "Envoi email impossible." }, { status: 500 });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID_MAIN ?? "");
  if (brevoApiKey && Number.isFinite(listId)) {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    }).catch(() => null);
  }

  return NextResponse.json({ success: true });
}
