/**
 * Compresse (optionnel) et upload la VSL Accompagnement vers Supabase Storage.
 * Usage: node scripts/upload-accompagnement-vsl.mjs [chemin.mp4]
 */
import { createClient } from "@supabase/supabase-js";
import { createReadStream, existsSync, readFileSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as tus from "tus-js-client";
import { resolveSupabaseUrl } from "./supabase-env.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const DEFAULT = join(root, "public", "videos", "accompagnement-vsl-compressed.mp4");
const videoPath = process.argv[2] || DEFAULT;
const storagePath = "videos/accompagnement-vsl.mp4";
const bucketName = (process.env.FORMATION_VIDEO_BUCKET || "assets").trim();

function loadEnv() {
  for (const f of [".env.local", ".env", ".env.vercel.prod"]) {
    const path = join(root, f);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^"'\n]*)["']?\s*$/);
      if (m && (!process.env[m[1]] || m[1] === "SUPABASE_SERVICE_ROLE_KEY")) {
        process.env[m[1]] = m[2].trim();
      }
    }
  }
}

if (!existsSync(videoPath)) {
  console.error("Vidéo introuvable:", videoPath);
  process.exit(1);
}

loadEnv();
const projectUrl = resolveSupabaseUrl();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!projectUrl || !serviceKey?.includes(".")) {
  console.error("JWT SUPABASE_SERVICE_ROLE_KEY requis pour TUS");
  process.exit(1);
}

const supabase = createClient(projectUrl, serviceKey);
const totalBytes = statSync(videoPath).size;
console.log(`Upload ${(totalBytes / 1024 / 1024).toFixed(1)} MB → ${bucketName}/${storagePath}`);

await new Promise((resolve, reject) => {
  const upload = new tus.Upload(createReadStream(videoPath), {
    endpoint: `${projectUrl}/storage/v1/upload/resumable`,
    retryDelays: [0, 2000, 5000, 10000],
    headers: { authorization: `Bearer ${serviceKey}`, "x-upsert": "true" },
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
    onError: reject,
    onSuccess: resolve,
  });
  upload.start();
});

const { data } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
console.log("URL:", data.publicUrl);
console.log("NEXT_PUBLIC_ACCOMPAGNEMENT_VSL_URL=" + data.publicUrl);
