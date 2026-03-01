# Configuration Supabase Auth (Magic Link + Google)

L’auth Supabase est en place. Pour que la connexion fonctionne, configure les URLs de redirection dans le dashboard Supabase.

## 1. URL de redirection (obligatoire)

1. Va sur **Supabase** → ton projet → **Authentication** → **URL Configuration**.
2. Dans **Redirect URLs**, ajoute :
   - En local : `http://localhost:3003/auth/callback`
   - En prod : `https://ton-domaine.vercel.app/auth/callback`
3. Enregistre.

## 2. Google OAuth (optionnel)

Pour le bouton « Continuer avec Google » :

1. **Google Cloud Console** : crée des identifiants OAuth 2 (type « Application Web »).
2. Dans **Authorized redirect URIs**, ajoute :
   - `https://vgdspxhuqdfilrkhipvx.supabase.co/auth/v1/callback`
3. Dans **Supabase** → **Authentication** → **Providers** → **Google** :
   - Active le provider.
   - Colle le **Client ID** et le **Client secret** Google.

## 3. Magic Link (email)

- Dans **Authentication** → **Providers** → **Email** : assure-toi que **Enable Email provider** est activé.
- **Confirm email** peut rester désactivé en dev pour recevoir le lien sans vérification d’email.

## 4. Tester

1. Lance l’app : `npm run dev` (depuis le dossier `MasterPrompt`).
2. Ouvre `http://localhost:3003/login`.
3. **Magic Link** : saisis un email → tu reçois un lien (vérifie les spams si besoin).
4. **Google** : après configuration du provider, le bouton redirige vers Google puis vers ton app.

Une fois connecté, tu es redirigé vers `/dashboard` et un utilisateur est créé ou synchronisé dans la table `User` (Prisma) avec ton `email` et ton `supabaseId`.
