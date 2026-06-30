import { prisma } from "@/lib/db";
import { isFormationLaunched } from "@/lib/formation-launch";

const MODULE_VIDEO_ENVS = [
  { order: 1, key: "NEXT_PUBLIC_MODULE_1_VIDEO_URL" },
  { order: 2, key: "NEXT_PUBLIC_MODULE_2_VIDEO_URL" },
  { order: 3, key: "NEXT_PUBLIC_MODULE_3_VIDEO_URL" },
  { order: 4, key: "NEXT_PUBLIC_MODULE_4_VIDEO_URL" },
  { order: 5, key: "NEXT_PUBLIC_MODULE_5_VIDEO_URL" },
  { order: 6, key: "NEXT_PUBLIC_MODULE_6_VIDEO_URL" },
  { order: 7, key: "NEXT_PUBLIC_MODULE_7_VIDEO_URL" },
  { order: 8, key: "NEXT_PUBLIC_MODULE_8_VIDEO_URL" },
] as const;

function videoUrlFromEnv(key: string): string | null {
  const v = process.env[key]?.trim().replace(/\r\n/g, "");
  return v && v.length > 0 ? v : null;
}

/**
 * Publie tous les modules et synchronise les URLs vidéo connues si besoin.
 */
export async function ensureFormationPublishedIfLaunched(): Promise<void> {
  if (!isFormationLaunched()) return;

  for (const { order, key } of MODULE_VIDEO_ENVS) {
    const url = videoUrlFromEnv(key);
    if (!url) continue;
    await prisma.module.updateMany({
      where: { order },
      data: { videoUrl: url, isPublished: true },
    });
  }

  await prisma.module.updateMany({
    where: { order: { gte: 4 } },
    data: { isPublished: true },
  });
}
