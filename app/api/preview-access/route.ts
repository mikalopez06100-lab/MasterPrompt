import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import {
  sendPreviewWelcomeEmail,
  sendPreviewAdminNotification,
} from "@/lib/email";

const COOKIE_NAME = "mp_preview_access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 jours

/** Whitelist des destinations autorisées après validation du gate (évite open-redirect). */
const ALLOWED_REDIRECTS = new Set(["/espace-formation", "/pack-ia/exemple"]);
const DEFAULT_REDIRECT = "/espace-formation";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeRedirect(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_REDIRECT;
  if (!ALLOWED_REDIRECTS.has(value)) return DEFAULT_REDIRECT;
  return value;
}

async function persistLead(email: string, source: string) {
  try {
    const existing = await prisma.lead.findUnique({ where: { email } });
    if (!existing) {
      await prisma.lead.create({ data: { email, source } });
      return { created: true, alreadyKnown: false };
    }
    if (source && existing.source !== source) {
      await prisma.lead.update({
        where: { id: existing.id },
        data: { source },
      });
    }
    return { created: false, alreadyKnown: true };
  } catch (dbError) {
    console.error("[preview-access] DB persist failed", dbError);
    return { created: false, alreadyKnown: false, error: true };
  }
}

async function pushToBrevo(email: string, source: string) {
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
        attributes: { SOURCE: source },
      }),
    });
  } catch {
    // Silencieux : on n'empêche pas l'accès si Brevo échoue
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; source?: string; redirectTo?: string }
    | null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  const source = (body?.source ?? "preview-espace-formation").toString().slice(0, 60);
  const redirectTo = sanitizeRedirect(body?.redirectTo);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const persist = await persistLead(email, source);

  const isNewLead = persist.created === true;

  await Promise.allSettled([
    pushToBrevo(email, source),
    sendPreviewWelcomeEmail({ email, source, redirectTo }),
    isNewLead
      ? sendPreviewAdminNotification({ email, source, redirectTo })
      : Promise.resolve({ ok: true }),
  ]);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });

  return NextResponse.json({ success: true, redirectTo });
}

export async function GET() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get(COOKIE_NAME)?.value === "1";
  return NextResponse.json({ hasAccess });
}
