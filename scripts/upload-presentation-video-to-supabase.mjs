/**
 * Upload de la vidéo de présentation Formation Master Prompt vers Supabase Storage.
 * Bucket "assets" (public), path "videos/presentation-formation.mp4".
 * Méthode : upload resumable TUS (officiel Supabase), recommandé pour fichiers > 6 Mo.
 *
 * Usage :
 *   node scripts/upload-presentation-video-to-supabase.mjs [chemin]
 *
 * Chemin par défaut :
 *   C:\Users\ppmpc\Desktop\MasterPrompt\formation\Master_Prompt_-_Présentation_with_captions.mp4
 *
 * Pré-requis (variable de session ou .env.local) :
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ…   (JWT legacy, PAS sb_secret_…)
 */

import { createClient } from "@supabase/supabase-js";
import { createReadStream, existsSync, readFileSync, readdirSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as tus from "tus-js-client";
import { resolveSupabaseUrl } from "./supabase-env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^"'\n]*)["']?\s*$/);
    if (m) {
      const key = m[1];
      const value = m[2].trim();
      if (process.env[key] === undefined || process.env[key] === "") {
        process.env[key] = value;
      }
    }
  }
}

const DESKTOP_FORMATION = "C:\\Users\\ppmpc\\Desktop\\MasterPrompt\\formation";
const DEFAULT_VIDEO_PATH = `${DESKTOP_FORMATION}\\Master_Prompt_-_Présentation_with_captions.mp4`;

/** Si le chemin exact n'existe pas (encodage Windows), cherche `Master_Prompt_-_Présentation*.mp4`. */
function resolveDefaultPath() {
  if (existsSync(DEFAULT_VIDEO_PATH)) return DEFAULT_VIDEO_PATH;
  if (!existsSync(DESKTOP_FORMATION)) return DEFAULT_VIDEO_PATH;
  const found = readdirSync(DESKTOP_FORMATION).find(
    (name) =>
      name.toLowerCase().startsWith("master_prompt_-_pr") &&
      name.toLowerCase().endsWith(".mp4"),
  );
  if (found) return join(DESKTOP_FORMATION, found);
  return DEFAULT_VIDEO_PATH;
}

const videoPath = process.argv[2] || resolveDefaultPath();
if (!existsSync(videoPath)) {
  console.error(`Vidéo introuvable au chemin : ${videoPath}`);
  console.error("Vous pouvez passer un chemin différent en argument :");
  console.error('  node scripts/upload-presentation-video-to-supabase.mjs "C:\\chemin\\vers\\video.mp4"');
  process.exit(1);
}

loadEnvLocal();

const projectUrl = resolveSupabaseUrl();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!projectUrl || !serviceKey) {
  console.error("Manquent NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY.");
  console.error('→ Définissez-les dans .env.local ou dans la session : $env:SUPABASE_SERVICE_ROLE_KEY = "eyJ…"');
  process.exit(1);
}

function isJwt(token) {
  const parts = token.split(".");
  return parts.length === 3 && parts.every((p) => p.length > 0);
}
if (!isJwt(serviceKey)) {
  console.error("SUPABASE_SERVICE_ROLE_KEY ne ressemble pas à un JWT (3 segments séparés par '.').");
  console.error("→ Dashboard Supabase → Project Settings → API keys → 'service_role' (legacy JWT, commence par 'eyJ…').");
  console.error("  Les nouvelles 'sb_secret_…' ne sont pas compatibles avec l'upload TUS Storage.");
  process.exit(1);
}

const supabase = createClient(projectUrl, serviceKey);
const bucketName = (process.env.FORMATION_VIDEO_BUCKET || "assets").trim();
const storagePath = "videos/presentation-formation.mp4";
const TARGET_FILE_SIZE_LIMIT = 1024 * 1024 * 1024;

async function ensureBucket() {
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.error("Impossible de lister les buckets :", listErr.message);
    process.exit(1);
  }
  const hasBucket = buckets?.some((b) => b.name === bucketName);
  if (!hasBucket) {
    const { error: createErr } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: TARGET_FILE_SIZE_LIMIT,
    });
    if (createErr) {
      console.error("Création du bucket impossible :", createErr.message);
      process.exit(1);
    }
    console.log(`Bucket "${bucketName}" créé (public, 1 Go par fichier).`);
  }
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

function uploadResumable() {
  const stats = statSync(videoPath);
  const totalBytes = stats.size;
  console.log(`Vidéo présentation — ${formatBytes(totalBytes)} MB`);
  console.log(`Upload TUS vers ${bucketName}/${storagePath}…`);

  return new Promise((resolve, reject) => {
    const fileStream = createReadStream(videoPath);
    const upload = new tus.Upload(fileStream, {
      endpoint: `${projectUrl}/storage/v1/upload/resumable`,
      retryDelays: [0, 2000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${serviceKey}`,
        "x-upsert": "true",
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName,
        objectName: storagePath,
        contentType: "video/mp4",
        cacheControl: "31536000",
      },
      chunkSize: 6 * 1024 * 1024,
      uploadSize: totalBytes,
      onError(error) {
        reject(error);
      },
      onProgress(bytesUploaded, bytesTotal) {
        const pct = ((bytesUploaded / bytesTotal) * 100).toFixed(1);
        process.stdout.write(
          `\r  → ${formatBytes(bytesUploaded)} / ${formatBytes(bytesTotal)} MB (${pct} %)   `,
        );
      },
      onSuccess() {
        process.stdout.write("\n");
        resolve();
      },
    });
    upload.start();
  });
}

async function main() {
  await ensureBucket();
  await uploadResumable();

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
  console.log("\nVidéo de présentation uploadée avec succès.");
  console.log("URL publique :", urlData.publicUrl);
  console.log("\nÀ ajouter dans .env.local et Vercel :");
  console.log("NEXT_PUBLIC_PRESENTATION_VIDEO_URL=" + urlData.publicUrl);
}

main().catch((err) => {
  const msg = err && err.message ? err.message : String(err);
  console.error("\nUpload échoué :", msg);
  if (err && err.originalResponse) {
    try {
      console.error("Réponse serveur :", err.originalResponse.getBody?.() ?? "");
    } catch {
      // ignore
    }
  }
  process.exit(1);
});
