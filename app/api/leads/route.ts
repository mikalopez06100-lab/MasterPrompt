import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendLeadPdfEmail } from "@/lib/email";

function isValidEmail(value: string): boolean {
  const trimmed = value?.trim?.() ?? "";
  return trimmed.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/** GET : diagnostic (vérifier que la route et les variables d’env sont présentes) */
export async function GET() {
  const resendSet = Boolean(process.env.RESEND_API_KEY);
  const pdfUrlSet = Boolean(process.env.LEAD_MAGNET_PDF_URL);
  const fromEmailSet = Boolean(process.env.FROM_EMAIL);
  let dbOk = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch {
    // ignore
  }
  return NextResponse.json({
    status: "ok",
    checks: { resend: resendSet, pdfUrl: pdfUrlSet, fromEmail: fromEmailSet, database: dbOk },
  });
}

export async function POST(request: Request) {
  try {
    let body: { email?: unknown; source?: unknown };
    try {
      body = (await request.json()) as { email?: unknown; source?: unknown };
    } catch {
      return NextResponse.json({ error: "Requête invalide (JSON attendu)" }, { status: 400 });
    }
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.trim() || null : null;

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    let existing;
    try {
      existing = await prisma.lead.findUnique({ where: { email } });
    } catch (dbError) {
      const msg = dbError instanceof Error ? dbError.message : "Erreur base de données";
      console.error("[POST /api/leads] DB", dbError);
      return NextResponse.json(
        { error: `Base de données : ${msg}. Vérifiez que la table Lead existe (prisma db push).` },
        { status: 500 }
      );
    }

    if (existing?.pdfSentAt) {
      return NextResponse.json({ success: true, message: "already_sent" });
    }

    let lead = existing;
    try {
      if (!lead) {
        lead = await prisma.lead.create({
          data: { email, source },
        });
      } else if (source) {
        lead = await prisma.lead.update({
          where: { id: lead.id },
          data: { source },
        });
      }
    } catch (dbError) {
      const msg = dbError instanceof Error ? dbError.message : "Erreur base de données";
      console.error("[POST /api/leads] DB write", dbError);
      return NextResponse.json({ error: `Base de données : ${msg}` }, { status: 500 });
    }

    const { ok, error } = await sendLeadPdfEmail(email, source ?? undefined);
    if (!ok) {
      return NextResponse.json(
        { error: error ?? "Impossible d'envoyer l'email" },
        { status: 500 }
      );
    }

    try {
      await prisma.lead.update({
        where: { id: lead!.id },
        data: { pdfSentAt: new Date() },
      });
    } catch (dbError) {
      console.error("[POST /api/leads] DB update pdfSentAt", dbError);
      // On ne renvoie pas d’erreur au client : l’email est parti
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Une erreur est survenue";
    console.error("[POST /api/leads]", e);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
