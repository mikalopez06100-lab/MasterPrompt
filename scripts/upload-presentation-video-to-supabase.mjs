/**
 * Upload de la vidéo de présentation Formation Master Prompt vers Supabase Storage.
 * Bucket "assets", path "videos/presentation-formation.mp4" (bucket public).
 *
 * Lancement :
 *   node scripts/upload-presentation-video-to-supabase.mjs
 *
 * Vous pouvez surcharger le chemin source via argument CLI :
 *   node scripts/upload-presentation-video-to-supabase.mjs "C:\chemin\vers\video.mp4"
 *
 * Pré-requis dans .env.local :
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { resolveSupabaseUrl } from "./supabase-env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) {
    console.error(".env.local introuvable. Configurez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^"'\n]*)["']?\s*$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

loadEnvLocal();

const url = resolveSupabaseUrl();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Manquent NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY dans .env.local");
  process.exit(1);
}

const DEFAULT_VIDEO_PATH = "C:\\Users\\ppmpc\\Desktop\\MasterPrompt\\formation\\Master_Prompt_-_Présentation_with_captions.mp4";
const videoPath = process.argv[2] || DEFAULT_VIDEO_PATH;

if (!existsSync(videoPath)) {
  console.error(`Vidéo introuvable au chemin : ${videoPath}`);
  console.error("Vous pouvez passer un chemin différent en argument :");
  console.error('  node scripts/upload-presentation-video-to-supabase.mjs "C:\\chemin\\vers\\video.mp4"');
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const bucketName = "assets";
const storagePath = "videos/presentation-formation.mp4";

async function main() {
  const stats = statSync(videoPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`Lecture du fichier (${sizeMb} MB)…`);

  const videoBuffer = readFileSync(videoPath);

  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.error("Impossible de lister les buckets :", listErr.message);
    process.exit(1);
  }
  const hasBucket = buckets?.some((b) => b.name === bucketName);
  if (!hasBucket) {
    const { error: createErr } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 524288000, // 500 MB
    });
    if (createErr) {
      console.error("Création du bucket impossible :", createErr.message);
      process.exit(1);
    }
    console.log(`Bucket "${bucketName}" créé (public).`);
  }

  console.log(`Upload vers ${bucketName}/${storagePath}…`);
  const { error: uploadErr } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, videoBuffer, {
      contentType: "video/mp4",
      upsert: true,
      cacheControl: "31536000", // 1 an
    });

  if (uploadErr) {
    console.error("Upload échoué :", uploadErr.message);
    process.exit(1);
  }

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
  console.log("\nVidéo de présentation uploadée avec succès.");
  console.log("URL publique :", urlData.publicUrl);
  console.log("\nÀ ajouter dans .env.local et Vercel :");
  console.log("NEXT_PUBLIC_PRESENTATION_VIDEO_URL=" + urlData.publicUrl);
}

main().catch((err) => {
  console.error("Erreur inattendue :", err);
  process.exit(1);
});
