import { getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getDownloadURL } from "firebase-admin/storage";
import * as admin from "firebase-admin";

function initFirebaseAdmin() {
  if (getApps().length > 0) return admin.app();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey || !storageBucket) {
    return null;
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket,
    });
  } catch {
    return null;
  }
}

initFirebaseAdmin();

/**
 * Retourne l'URL de téléchargement d'un fichier dans Firebase Storage.
 * @param path Chemin du fichier dans le bucket (ex: "videos/intro.mp4")
 */
export async function getStorageFileUrl(path: string): Promise<string | null> {
  const app = admin.apps[0] ? admin.app() : null;
  if (!app) return null;

  const bucket = getStorage(app).bucket();
  const file = bucket.file(path);

  try {
    const [exists] = await file.exists();
    if (!exists) return null;
    return await getDownloadURL(file);
  } catch {
    return null;
  }
}

export { getStorage } from "firebase-admin/storage";
export { admin };
