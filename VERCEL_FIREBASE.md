# Déploiement Vercel + Firebase

Ce guide décrit comment publier l’application sur **Vercel** et utiliser **Firebase Storage** pour les fichiers (vidéos, médias).

---

## 1. Base de données PostgreSQL

Vercel ne gère pas SQLite. Utilisez une base **PostgreSQL** :

- **Vercel Postgres** (add-on dans le dashboard Vercel)
- **Neon** (https://neon.tech) — gratuit
- **Supabase** (https://supabase.com) — gratuit

Une fois la base créée, récupérez l’URL de connexion et définissez-la dans les variables d’environnement Vercel sous le nom `DATABASE_URL`.

Après le premier déploiement, exécutez les migrations Prisma une fois (en local avec `DATABASE_URL` pointant vers la même base) :

```bash
npx prisma migrate deploy
```

Ou utilisez « Vercel Postgres » et le script proposé par Vercel pour pousser le schéma.

---

## 2. Déploiement sur Vercel

1. Poussez le projet sur **GitHub** (ou GitLab / Bitbucket).
2. Allez sur [vercel.com](https://vercel.com) → **Add New Project** → importez le dépôt.
3. Configurez le projet :
   - **Framework Preset** : Next.js
   - **Root Directory** : (laisser par défaut)
   - **Build Command** : `next build` (ou laisser vide)
   - **Output Directory** : (laisser par défaut)

4. **Variables d’environnement** à ajouter dans **Settings → Environment Variables** :

   | Nom                | Valeur                    | Environnement   |
   |--------------------|---------------------------|-----------------|
   | `DATABASE_URL`     | URL PostgreSQL            | Production (…)  |
   | `NEXTAUTH_URL`     | `https://votre-app.vercel.app` | Production |
   | `NEXTAUTH_SECRET`  | Secret fort (ex. `openssl rand -base64 32`) | Production |
   | `FIREBASE_PROJECT_ID` | ID projet Firebase   | Production      |
   | `FIREBASE_CLIENT_EMAIL` | Email du compte de service | Production |
   | `FIREBASE_PRIVATE_KEY`  | Clé privée (avec `\n` si collée) | Production |
   | `FIREBASE_STORAGE_BUCKET` | `votre-projet.appspot.com` | Production |
   | `FIREBASE_INTRO_VIDEO_PATH` | `videos/master-prompt-intro.mp4` (optionnel) | Production |

5. Déployez (push sur la branche connectée ou **Redeploy**).

---

## 3. Firebase Storage (fichiers / vidéos)

### Créer le projet Firebase

1. [Console Firebase](https://console.firebase.google.com) → **Créer un projet** (ou utiliser un existant).
2. **Build** → **Storage** → **Commencer** → choisir un emplacement et des règles (ex. mode test puis restreindre plus tard).
3. **Paramètres du projet** (engrenage) → **Comptes de service** → **Générer une nouvelle clé privée**.
4. Vous obtenez un fichier JSON contenant notamment :
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (dans Vercel, coller la clé en une ligne avec `\n` pour les retours à la ligne).
5. **Storage** → onglet **Fichiers** : le nom du bucket est du type `votre-projet.appspot.com` → `FIREBASE_STORAGE_BUCKET`.

### Mettre la vidéo d’intro dans Storage

1. Dans Storage → **Fichiers**, créez un dossier (ex. `videos`) si besoin.
2. Uploadez votre fichier (ex. `master-prompt-intro.mp4`) dans `videos/`.
3. Le chemin utilisé par l’app est celui défini par `FIREBASE_INTRO_VIDEO_PATH` (par défaut `videos/master-prompt-intro.mp4`).

Pour les **leçons** et **ressources** : vous pouvez enregistrer dans la base (Prisma) l’URL publique ou signée des fichiers hébergés dans Firebase (champs `videoUrl` sur les leçons, `url` sur les ressources).

---

## 4. Récapitulatif des variables

- **Obligatoires pour le déploiement** : `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
- **Obligatoires pour la vidéo d’intro (Firebase)** : `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_STORAGE_BUCKET`.
- **Optionnel** : `FIREBASE_INTRO_VIDEO_PATH` (défaut : `videos/master-prompt-intro.mp4`).

Sans configuration Firebase, la page Formation utilisera le fallback local `/videos/master-prompt-intro.mp4` si le fichier est présent dans `public/videos/`.
