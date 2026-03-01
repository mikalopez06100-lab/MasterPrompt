import { NextResponse } from "next/server";
import { getStorageFileUrl } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/media/intro-video
 * Retourne l'URL de la vidéo d'introduction stockée sur Firebase Storage.
 * Chemin du fichier : FIREBASE_INTRO_VIDEO_PATH (ex: videos/master-prompt-intro.mp4)
 */
export async function GET() {
  const path = process.env.FIREBASE_INTRO_VIDEO_PATH || "videos/master-prompt-intro.mp4";
  const url = await getStorageFileUrl(path);
  if (!url) {
    return NextResponse.json(
      { error: "Vidéo d'introduction non disponible" },
      { status: 404 }
    );
  }
  return NextResponse.json({ url });
}
