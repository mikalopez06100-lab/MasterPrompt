/**
 * Rend le fond noir / gris très sombre transparent sur public/logo.png
 * et rogne les marges vides (meilleure taille en navbar).
 * Usage : node scripts/process-logo-transparent.mjs
 */

import { existsSync, unlinkSync, renameSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const logoPath = join(root, "public", "logo.png");
const outTmp = join(root, "public", "_logo_processed.png");

if (!existsSync(logoPath)) {
  console.error("Missing public/logo.png");
  process.exit(1);
}

const { data, info } = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const stride = channels;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * stride;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    if (max <= 24 && min <= 20) {
      data[i + 3] = 0;
      continue;
    }
    if (max < 58 && delta < 26) {
      const fade = Math.max(0, Math.min(1, (max - 24) / 34));
      data[i + 3] = Math.round(a * fade);
    }
  }
}

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;
const alphaCut = 8;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const ai = (y * width + x) * stride + 3;
    if (data[ai] > alphaCut) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
}

if (minX > maxX || minY > maxY) {
  console.error("Aucun pixel visible après traitement.");
  process.exit(1);
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

await sharp(Buffer.from(data), { raw: { width, height, channels: 4 } })
  .extract({ left: minX, top: minY, width: cropW, height: cropH })
  .png({ compressionLevel: 9 })
  .toFile(outTmp);

unlinkSync(logoPath);
renameSync(outTmp, logoPath);

console.log("OK public/logo.png — fond sombre neutralisé, rogne:", { minX, minY, cropW, cropH });
