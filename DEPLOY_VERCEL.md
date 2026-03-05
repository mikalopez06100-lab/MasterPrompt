# Déploiement sur Vercel + nom de domaine

## 1. Préparer le dépôt Git

Si ce n’est pas déjà fait :

```powershell
cd C:\Users\ppmpc\MasterPrompt
git init
git add .
git commit -m "Initial commit - Master Prompt"
```

Crée un dépôt sur **GitHub** (ou GitLab / Bitbucket), puis :

```powershell
git remote add origin https://github.com/TON-USERNAME/master-prompt.git
git branch -M main
git push -u origin main
```

---

## 2. Créer le projet sur Vercel

1. Va sur **https://vercel.com** et connecte-toi (avec GitHub si possible).
2. **Add New…** → **Project**.
3. **Import** le dépôt `master-prompt` (ou le nom de ton repo).
4. Vercel détecte Next.js : ne change rien au **Framework Preset**.
5. **Environment Variables** : ajoute **toutes** les variables ci-dessous (pour **Production**, **Preview** et **Development** si tu veux les mêmes partout).

### Variables à renseigner sur Vercel

Copie **toutes** les variables ci-dessous dans **Settings → Environment Variables** (Production + Preview si besoin). Tu peux reprendre les valeurs de ton `.env.local` en adaptant celles qui dépendent de l’environnement (URL du site, secrets).

| Nom | Exemple de valeur / description | Secret ? | Obligatoire |
|-----|----------------------------------|----------|-------------|
| `DATABASE_URL` | URL Postgres Supabase (ex. `postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres`) | Oui | Oui |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://vgdspxhuqdfilrkhipvx.supabase.co` (ton projet Supabase) | Non | Oui |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé « anon » / public Supabase | Non | Oui |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé « service_role » Supabase (Settings → API) | Oui | Oui |
| `NEXTAUTH_URL` | En prod : `https://masterprompt.fr` (ou ton URL Vercel) — sans slash final | Non | Si NextAuth utilisé |
| `NEXTAUTH_SECRET` | Secret fort (ex. `openssl rand -base64 32`) | Oui | Si NextAuth utilisé |
| `NEXT_PUBLIC_APP_URL` | URL du site : `https://masterprompt.fr` ou `https://ton-projet.vercel.app` | Non | Recommandé (auth, liens) |
| `NEXT_PUBLIC_LOGO_URL` | URL du logo (ex. `https://…supabase.co/storage/v1/object/public/assets/logo.png`) | Non | Optionnel |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | URL de la vidéo hero (ex. `…/assets/videos/bienvenue.mp4`) | Non | Optionnel |
| `RESEND_API_KEY` | Clé API Resend (envoi email + PDF) | Oui | Oui (pour le formulaire PDF) |
| `FROM_EMAIL` | `Master Prompt <info@masterprompt.fr>` | Non | Oui (pour le formulaire PDF) |
| `LEAD_MAGNET_PDF_URL` | URL publique du PDF (ex. `https://…supabase.co/…/pdfs/master-prompt-10-prompts-essentiels.pdf`) | Non | Oui (pour le formulaire PDF) |

**Optionnel — Firebase** (uniquement si tu utilises l’API `/api/media/intro-video`) :

| Nom | Description | Secret ? |
|-----|--------------|----------|
| `FIREBASE_PROJECT_ID` | ID du projet Firebase | Non |
| `FIREBASE_CLIENT_EMAIL` | Email du compte de service Firebase | Non |
| `FIREBASE_PRIVATE_KEY` | Clé privée du compte de service (guillemets, `\n` pour les retours à la ligne) | Oui |
| `FIREBASE_STORAGE_BUCKET` | Nom du bucket Storage (ex. `ton-projet.appspot.com`) | Non |
| `FIREBASE_INTRO_VIDEO_PATH` | Chemin du fichier (ex. `videos/master-prompt-intro.mp4`) | Non |

Tu peux copier/coller depuis ton `.env.local`, puis **modifier** `NEXTAUTH_URL` et `NEXT_PUBLIC_APP_URL` pour mettre l’URL de production (ex. `https://masterprompt.fr`) une fois le domaine en place (voir étape 4).

**Checklist Vercel — noms des variables à créer :**  
`DATABASE_URL` · `NEXT_PUBLIC_SUPABASE_URL` · `NEXT_PUBLIC_SUPABASE_ANON_KEY` · `SUPABASE_SERVICE_ROLE_KEY` · `NEXTAUTH_URL` · `NEXTAUTH_SECRET` · `NEXT_PUBLIC_APP_URL` · `NEXT_PUBLIC_LOGO_URL` · `NEXT_PUBLIC_HERO_VIDEO_URL` · `RESEND_API_KEY` · `FROM_EMAIL` · `LEAD_MAGNET_PDF_URL`

**Médias (Supabase Storage, bucket `assets`) :**
- **Logo :** placer le fichier dans `public/logo.png`, puis `node scripts/upload-logo-to-supabase.mjs`. Définir `NEXT_PUBLIC_LOGO_URL` sur Vercel (ou laisser vide pour le logo local).
- **Vidéo hero :** placer la vidéo dans `public/videos/bienvenue.mp4`, puis `node scripts/upload-hero-video-to-supabase.mjs`. Définir `NEXT_PUBLIC_HERO_VIDEO_URL` sur Vercel (ou laisser vide pour la vidéo locale).
- **PDF lead magnet :** le PDF est déjà uploadé sur Supabase ; l’URL est dans `LEAD_MAGNET_PDF_URL` (voir `.env.local`). Pour mettre à jour le PDF plus tard : placer le fichier dans `public/pdfs/master-prompt-10-prompts-essentiels.pdf`, puis `node scripts/upload-lead-pdf-to-supabase.mjs`. Pour la config email (Resend, domaine, Vercel), voir **GUIDE-DEBUTANT-EMAIL-PDF.md**.

6. Clique sur **Deploy**. Attends la fin du build.

### 2.1. Rendre le déploiement public (désactiver la connexion Vercel)

Par défaut, Vercel peut protéger certains déploiements (Vercel Authentication / Password Protection) et demander une connexion Vercel.

1. Dans ton projet Vercel : onglet **Settings**.
2. Dans le menu de gauche, ouvre **Deployment Protection** (ou **Security** → **Deployment Protection**).
3. Pour l’environnement **Production** :
   - Désactive **Vercel Authentication**.
   - Désactive **Password Protection** si elle est activée.
4. Sauvegarde.  

Ton site (URL `*.vercel.app` + domaine personnalisé) devient alors accessible **sans connexion Vercel**.  
Tu peux laisser la protection activée pour les déploiements **Preview** si tu veux que seuls toi / ton équipe y aient accès.

---

## 3. Vérifier le déploiement

- Vercel te donne une URL du type **https://master-prompt-xxx.vercel.app**.
- Ouvre-la : la landing doit s’afficher.
- Va sur **/login** et vérifie que la page fonctionne (le Magic Link enverra un lien vers cette URL tant que `NEXT_PUBLIC_APP_URL` n’est pas encore ton domaine).

---

## 4. Ajouter ton nom de domaine

1. Dans le projet Vercel : **Settings** → **Domains**.
2. Clique sur **Add** et saisis ton domaine (ex. **masterprompt.fr** ou **app.masterprompt.fr**).
3. Vercel affiche les **enregistrements DNS** à créer chez ton registrar (OVH, Gandi, Cloudflare, etc.) :
   - Soit un **A** pointant vers `76.76.21.21`
   - Soit un **CNAME** pointant vers `cname.vercel-dns.com` (souvent pour un sous-domaine type `app.`)

4. Chez ton **registrar** (où tu as acheté le domaine) :
   - Crée l’enregistrement indiqué par Vercel (A ou CNAME).
   - Attends la propagation (quelques minutes à 48 h).

5. Sur Vercel, clique sur **Refresh** à côté du domaine : quand le statut est **Valid**, le domaine est actif.

6. (Recommandé) **Redirection HTTPS** : dans **Settings** → **Domains**, assure-toi que **Redirect** est activé pour forcer `https://`.

---

## 5. Après la mise en place du domaine

1. **Vercel** → **Settings** → **Environment Variables**  
   - Modifie `NEXT_PUBLIC_APP_URL` pour mettre **https://ton-domaine.com** (sans slash final).  
   - **Save** puis **Redeploy** le projet (Deployments → ⋮ → Redeploy).

2. **Supabase** → **Authentication** → **URL Configuration**  
   - **Site URL** : `https://ton-domaine.com`  
   - **Redirect URLs** : ajoute `https://ton-domaine.com/auth/callback`  
   - Enregistre.

Après ça, connexion (Magic Link / Google) et redirections fonctionneront avec ton nom de domaine.

---

## 6. Récap

| Étape | Où | Action |
|-------|-----|--------|
| 1 | Git | Pousser le code sur GitHub |
| 2 | Vercel | Import du repo + variables d’env + Deploy |
| 3 | Vercel | Tester l’URL *.vercel.app |
| 4 | Vercel + DNS | Ajouter le domaine dans Vercel + créer A ou CNAME |
| 5 | Vercel + Supabase | Mettre `NEXT_PUBLIC_APP_URL` + Site URL / Redirect URLs |

Si tu me donnes ton nom de domaine (ex. masterprompt.fr ou app.masterprompt.fr), je peux adapter les exemples dans ce fichier ou dans la config (vercel.json, .env.example) pour qu’ils correspondent exactement.
