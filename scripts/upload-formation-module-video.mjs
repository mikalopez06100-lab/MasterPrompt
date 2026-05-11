/**
 * Upload d'une vidéo de module Formation Master Prompt vers Supabase Storage.
 * Bucket : voir FORMATION_VIDEO_BUCKET (défaut "assets"), path videos/module-XX.mp4 (public).
 * Méthode : upload resumable TUS (officiel Supabase) — recommandé pour fichiers > 6 Mo.
 *
 * Usage :
 *   node scripts/upload-formation-module-video.mjs <numero> [chemin]
 *
 * Exemples :
 *   node scripts/upload-formation-module-video.mjs 1
 *   node scripts/upload-formation-module-video.mjs 2 "C:\\chemin\\vers\\Module_2.mp4"
 *
 * Chemins par défaut (sur Desktop) :
 *   Module 1 : Master_Prompt_-_Module_1.mp4
 *   Module 2 : Module_2_-_la_méthode_PACO.mp4
 *
 * Pré-requis dans .env.local :
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 *
 * Optionnel :
 *   FORMATION_VIDEO_BUCKET=nom-du-bucket   (défaut : assets)
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
  if (!existsSync(path)) return; // .env.local optionnel si les variables sont déjà dans la session.
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^"'\n]*)["']?\s*$/);
    if (m) {
      const key = m[1];
      const value = m[2].trim();
      // La session courante prime : on n'écrase pas une valeur déjà fournie via $env:KEY.
      if (process.env[key] === undefined || process.env[key] === "") {
        process.env[key] = value;
      }
    }
  }
}

const DESKTOP_FORMATION = "C:\\Users\\ppmpc\\Desktop\\MasterPrompt\\formation";
const DEFAULT_PATHS = {
  1: `${DESKTOP_FORMATION}\\Master_Prompt_-_Module_1.mp4`,
  2: `${DESKTOP_FORMATION}\\Module_2_-_la_méthode_PACO.mp4`,
};

/** Si le chemin exact n'existe pas (encodage Windows), cherche Module_N_*.mp4 sur le Desktop. */
function resolveDefaultVideoPath(num) {
  const direct = DEFAULT_PATHS[num];
  if (direct && existsSync(direct)) return direct;
  if (!existsSync(DESKTOP_FORMATION)) return direct || "";
  const prefix = `Module_${num}_`;
  const found = readdirSync(DESKTOP_FORMATION).find(
    (name) => name.startsWith(prefix) && name.toLowerCase().endsWith(".mp4"),
  );
  if (found) return join(DESKTOP_FORMATION, found);
  return direct || "";
}

const moduleNumber = Number(process.argv[2]);
if (!Number.isFinite(moduleNumber) || moduleNumber < 1 || moduleNumber > 7) {
  console.error("Numéro de module invalide. Usage :");
  console.error("  node scripts/upload-formation-module-video.mjs <numero> [chemin]");
  console.error("  numero doit être entre 1 et 7");
  process.exit(1);
}

const videoPath = process.argv[3] || resolveDefaultVideoPath(moduleNumber) || "";
if (!videoPath || !existsSync(videoPath)) {
  console.error(`Vidéo introuvable au chemin : ${videoPath || "(aucun par défaut pour ce module)"}`);
  console.error("Passez un chemin en argument :");
  console.error(`  node scripts/upload-formation-module-video.mjs ${moduleNumber} "C:\\chemin\\vers\\video.mp4"`);
  process.exit(1);
}

loadEnvLocal();

const projectUrl = resolveSupabaseUrl();
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!projectUrl || !serviceKey) {
  console.error("Manquent NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY.");
  console.error("→ Définissez-les dans .env.local ou dans la session : $env:SUPABASE_SERVICE_ROLE_KEY = \"eyJ…\"");
  process.exit(1);
}

/**
 * L'endpoint TUS de Supabase Storage exige un JWT (3 segments séparés par "."). Les nouvelles
 * "secret keys" (sb_secret_...) ne sont PAS acceptées ici. On détecte tôt pour donner un message
 * clair plutôt qu'un cryptique "Invalid Compact JWS" à 5 % d'upload.
 */
function isJwt(token) {
  const parts = token.split(".");
  return parts.length === 3 && parts.every((p) => p.length > 0);
}
if (!isJwt(serviceKey)) {
  console.error("SUPABASE_SERVICE_ROLE_KEY ne ressemble pas à un JWT (3 segments séparés par '.').");
  console.error(
    "→ Dashboard Supabase → Project Settings → API keys → 'service_role' (legacy JWT, commence par 'eyJ…').",
  );
  console.error("  Les nouvelles 'sb_secret_…' ne sont pas compatibles avec l'upload TUS Storage.");
  process.exit(1);
}

const supabase = createClient(projectUrl, serviceKey);
const bucketName = (process.env.FORMATION_VIDEO_BUCKET || "assets").trim();
const paddedNumber = String(moduleNumber).padStart(2, "0");
const storagePath = `videos/module-${paddedNumber}.mp4`;
/** Plafond par fichier que l'on souhaite autoriser sur ce bucket (1 Go suffit pour les modules). */
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
    return;
  }

  // Bucket existant : forcer la limite à 1 Go pour qu'il accepte les gros modules.
  const { error: updateErr } = await supabase.storage.updateBucket(bucketName, {
    public: true,
    fileSizeLimit: TARGET_FILE_SIZE_LIMIT,
  });
  if (updateErr) {
    console.warn(
      `Avertissement : impossible de mettre à jour la limite du bucket "${bucketName}" : ${updateErr.message}`,
    );
    console.warn("→ Vérifiez la 'Global file size limit' du projet (Dashboard → Storage → Settings).");
  } else {
    console.log(`Bucket "${bucketName}" : limite par fichier portée à 1 Go.`);
  }
}

function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

function uploadResumable() {
  const stats = statSync(videoPath);
  const totalBytes = stats.size;
  console.log(`Module ${moduleNumber} — ${formatBytes(totalBytes)} MB`);
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
      // 6 Mo : taille requise par Supabase pour TUS.
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
  console.log(`\nVidéo Module ${moduleNumber} uploadée avec succès.`);
  console.log("URL publique :", urlData.publicUrl);
  console.log("\nÀ ajouter dans .env.local et Vercel :");
  console.log(`NEXT_PUBLIC_MODULE_${moduleNumber}_VIDEO_URL=${urlData.publicUrl}`);
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
  if (/exceeded|maximum|size/i.test(msg)) {
    console.error(`
→ Le projet refuse encore les fichiers de cette taille.
  Vérifier dans Dashboard Supabase → Storage → Settings : « Global file size limit » à 1 GB (ou plus).
  Sur le plan Pro fraîchement activé, ce réglage peut nécessiter quelques minutes pour être appliqué.
`);
  }
  process.exit(1);
});
