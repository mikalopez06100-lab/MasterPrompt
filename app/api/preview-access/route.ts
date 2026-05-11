import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "mp_preview_access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 jours

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function pushToBrevo(email: string) {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID_PREVIEW ?? process.env.BREVO_LIST_ID_MAIN ?? "";
  const listId = Number(listIdRaw);
  if (!brevoApiKey || !Number.isFinite(listId) || listId <= 0) return;

  try {
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
        attributes: {
          SOURCE: "preview-espace-formation",
        },
      }),
    });
  } catch {
    // Silencieux : on n'empêche pas l'accès si Brevo échoue
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  await pushToBrevo(email);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });

  return NextResponse.json({ success: true, redirectTo: "/espace-formation" });
}

export async function GET() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get(COOKIE_NAME)?.value === "1";
  return NextResponse.json({ hasAccess });
}
