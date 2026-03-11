# SSL (certificat) et indexation Google — Master Prompt

Ce guide traite des **3 priorités** identifiées : certificat SSL invalide, site non indexé, et renforcement de la marque.

---

## Priorité 1 — Corriger le certificat SSL (urgent)

**Erreur typique :**  
`SSL certificate verify failed: Hostname mismatch — le certificat n'est pas valide pour 'masterprompt.fr'`

Cela signifie que le certificat n’est pas émis pour `masterprompt.fr` (par ex. il est pour `www.masterprompt.fr` ou pour l’URL Vercel). Les visiteurs peuvent voir une alerte de sécurité et Google ne peut pas crawler correctement.

### À faire sur Vercel

1. Va sur **https://vercel.com** → ton projet **Master Prompt**.
2. **Settings** → **Domains**.
3. Vérifie que **les deux** domaines sont ajoutés et en statut **Valid** :
   - **masterprompt.fr** (sans www)
   - **www.masterprompt.fr**
4. Si un domaine manque : **Add** → saisis-le → valide.
5. Vercel affiche les **enregistrements DNS** à configurer chez ton hébergeur DNS (IONOS, OVH, Gandi, Cloudflare, etc.) :
   - Pour la **racine** (masterprompt.fr) : un enregistrement **A** avec **Nom** = `@` et **Valeur** = l’adresse IP indiquée par Vercel (ex. **`216.198.79.1`** — Vercel recommande cette nouvelle IP ; les anciennes `76.76.21.21` ou CNAME vers `cname.vercel-dns.com` restent valides mais tu peux suivre la recommandation affichée dans **Domains**).
   - Pour **www** : en général un **CNAME** vers `cname.vercel-dns.com` (si **www** affiche déjà « Configuration valide », ne rien changer).
6. **Chez ton registrar / DNS** : crée ou corrige les enregistrements **exactement** comme indiqué par Vercel. Attends la propagation (quelques minutes à 48 h).
7. Sur Vercel, clique sur **Refresh** à côté de chaque domaine. Quand le statut est **Valid**, Vercel a généré le certificat SSL (Let’s Encrypt) pour ce nom.
8. (Recommandé) Active la **redirection** : dans **Domains**, configure pour que `http://masterprompt.fr` et `www` redirigent vers **https://masterprompt.fr** (ou https://www, selon ta préférence).

### Points fréquents

- **Hostname mismatch** : le certificat est pour un autre nom. Vérifie que **masterprompt.fr** (et éventuellement **www.masterprompt.fr**) sont bien listés dans Vercel avec statut **Valid**.
- **DNS pas encore propagé** : Vercel ne peut pas émettre le certificat tant que le DNS ne pointe pas vers Vercel. Vérifie les enregistrements chez ton hébergeur DNS et réessaie **Refresh** plus tard.
- **Caractères spéciaux / sous-domaines** : si tu utilises un autre sous-domaine (ex. app.masterprompt.fr), ajoute-le aussi dans **Domains** et configure le CNAME indiqué.

Dès que les domaines sont **Valid**, le SSL est bon et les alertes navigateur disparaissent.

---

## Priorité 2 — Indexation Google (Search Console + sitemap)

Une fois le SSL corrigé, Google peut crawler le site. Pour accélérer l’indexation :

### 1. Google Search Console (GSC)

1. Va sur **https://search.google.com/search-console**.
2. **Ajouter une propriété** : choisis **Préfixe d’URL** et saisis **https://masterprompt.fr** (sans slash final).
3. **Vérification** : la méthode **Balise HTML** est pratique. GSC te donne une balise du type :  
   `<meta name="google-site-verification" content="abc123..." />`  
   - Dans ce projet : définis la variable d’environnement **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** avec la valeur `content` (la chaîne après `content="..."`). Le `layout.tsx` l’utilise pour injecter la balise.  
   - Redéploie, puis dans GSC clique sur **Vérifier**.  
   - Alternative : **Vérification par enregistrement DNS** (TXT) chez ton hébergeur de domaine.
4. Une fois la propriété **vérifiée**, tu as accès aux rapports et à l’outil d’inspection.

### 2. Soumettre le sitemap

1. Dans GSC : **Sitemaps** (menu gauche).
2. **Ajouter un sitemap** : saisis **sitemap.xml** (l’URL complète sera donc `https://masterprompt.fr/sitemap.xml`).
3. **Envoyer**. Google va crawler les URLs listées dans le sitemap.

Le projet contient déjà une route **`/sitemap.xml`** générée par Next.js (fichier `app/sitemap.ts`). Après déploiement, l’URL `https://masterprompt.fr/sitemap.xml` doit répondre avec un XML valide.

### 3. Demander l’indexation de la page d’accueil

1. Dans GSC : **Inspection d’URL** (barre en haut).
2. Saisis **https://masterprompt.fr**.
3. Clique sur **Demander une indexation**. Google va prioriser le crawl de cette URL.

Tu peux répéter pour **https://masterprompt.fr/courses** ou d’autres pages importantes si besoin.

---

## Priorité 3 — Marque et domaine (masterprompt.fr)

La recherche « masterprompt.fr » ou « Master Prompt » peut actuellement remonter des concurrents (masterprompt.dev, promptmaster.com, etc.). C’est courant au lancement.

- Une fois le **SSL OK** et le **site indexé**, Google pourra associer progressivement le nom de marque à **masterprompt.fr**.
- **Liens, partages et contenu** (landing, emails, réseaux) en **https://masterprompt.fr** renforceront cette association.

Pas d’action technique supplémentaire : prioriser SSL puis GSC + sitemap.

---

## Récap des actions cette semaine

| Priorité | Action | Où |
|----------|--------|-----|
| 1 | Vérifier / corriger les domaines **masterprompt.fr** et **www** → statut **Valid** | Vercel → Settings → Domains |
| 1 | Configurer les enregistrements DNS comme indiqué par Vercel | IONOS / OVH / autre DNS |
| 2 | Créer une propriété et vérifier le site | search.google.com/search-console |
| 2 | Soumettre le sitemap **sitemap.xml** | GSC → Sitemaps |
| 2 | Demander l’indexation de la page d’accueil | GSC → Inspection d’URL |

---

## Fichiers du projet concernés

- **`app/sitemap.ts`** : génère **/sitemap.xml** (URLs de la home, /login, /courses). La base URL vient de `NEXT_PUBLIC_APP_URL` (ex. `https://masterprompt.fr`).
- **`app/robots.ts`** : génère **/robots.txt** (autorise les crawlers, indique le sitemap, interdit /admin, /dashboard, /api).

Sur Vercel, définis **NEXT_PUBLIC_APP_URL** = **https://masterprompt.fr** (sans slash final) pour que le sitemap et les métadonnées utilisent le bon domaine.
