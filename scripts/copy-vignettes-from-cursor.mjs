/**
 * Copie les 5 images depuis le dossier Cursor assets vers public/avatars.
 * Si les images ne sont pas trouvées : place-les à la main dans public/avatars/
 * sous les noms vignette-1.png à vignette-5.png puis lance upload-vignettes-to-supabase.mjs
 */
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dstDir = join(root, "public", "avatars");

// Essai 1 : fichiers directement dans assets (noms complets)
const assetsDir = join(root, "..", ".cursor", "projects", "c-Users-ppmpc-MasterPrompt", "assets");
const filesInAssets = [
  "c__Users_ppmpc_AppData_Roaming_Cursor_User_workspaceStorage_05e818a04df36e89f89fa0ad5a8f226b_images_images-caba5c21-baee-4a61-90c6-682763866894.png",
  "c__Users_ppmpc_AppData_Roaming_Cursor_User_workspaceStorage_05e818a04df36e89f89fa0ad5a8f226b_images_images__1_-3a61c949-347a-4701-a3e4-1032444729e1.png",
  "c__Users_ppmpc_AppData_Roaming_Cursor_User_workspaceStorage_05e818a04df36e89f89fa0ad5a8f226b_images_images__2_-803924fb-4f86-414f-9d4d-b02ac4ebf5d8.png",
  "c__Users_ppmpc_AppData_Roaming_Cursor_User_workspaceStorage_05e818a04df36e89f89fa0ad5a8f226b_images_t_l_chargement__1_-3c1202ed-a635-4e4e-ab3c-be6eee2be684.png",
  "c__Users_ppmpc_AppData_Roaming_Cursor_User_workspaceStorage_05e818a04df36e89f89fa0ad5a8f226b_images_t_l_chargement-cabb9b44-fb8a-4535-b64b-9f567cfdaa7e.png",
];

// Essai 2 : sous-dossier _images
const baseSub = join(assetsDir, "c__Users_ppmpc_AppData_Roaming_Cursor_User_workspaceStorage_05e818a04df36e89f89fa0ad5a8f226b_images");
const filesInSub = [
  "images-caba5c21-baee-4a61-90c6-682763866894.png",
  "images__1_-3a61c949-347a-4701-a3e4-1032444729e1.png",
  "images__2_-803924fb-4f86-414f-9d4d-b02ac4ebf5d8.png",
  "t_l_chargement__1_-3c1202ed-a635-4e4e-ab3c-be6eee2be684.png",
  "t_l_chargement-cabb9b44-fb8a-4535-b64b-9f567cfdaa7e.png",
];

let base = assetsDir;
let files = filesInSub;
if (existsSync(join(baseSub, filesInSub[0]))) {
  base = baseSub;
} else if (existsSync(join(assetsDir, filesInAssets[0]))) {
  files = filesInAssets;
} else {
  base = null;
}

if (!existsSync(dstDir)) mkdirSync(dstDir, { recursive: true });

if (!base) {
  console.log("Les 5 images Cursor n'ont pas été trouvées automatiquement.");
  console.log("Place tes 5 images dans public/avatars/ sous les noms :");
  console.log("  vignette-1.png, vignette-2.png, ... vignette-5.png");
  console.log("Puis lance : node scripts/upload-vignettes-to-supabase.mjs");
  process.exit(0);
}

for (let i = 0; i < files.length; i++) {
  const src = join(base, files[i]);
  const dst = join(dstDir, `vignette-${i + 1}.png`);
  if (!existsSync(src)) {
    console.error("Source not found:", src);
    process.exit(1);
  }
  copyFileSync(src, dst);
  console.log("Copied vignette-" + (i + 1) + ".png");
}
console.log("Done. Run: node scripts/upload-vignettes-to-supabase.mjs");
