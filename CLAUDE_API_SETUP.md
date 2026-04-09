# Configuration Claude API (Anthropic)

Ce guide active le retravail de prompts dans l'editeur avec Claude.

## 1) Creer une cle API Anthropic

1. Ouvrez [Anthropic Console](https://console.anthropic.com/).
2. Creez une API key.
3. Copiez la cle (`sk-ant-...`).

## 2) Configurer en local

Dans `.env.local`, ajoutez :

```bash
ANTHROPIC_API_KEY="sk-ant-..."
ANTHROPIC_MODEL="claude-3-5-sonnet-20241022"
```

Puis redemarrer l'app :

```bash
npm run dev
```

## 3) Configurer sur Vercel

Ajoutez les variables suivantes dans **Settings > Environment Variables** :

- `ANTHROPIC_API_KEY` (obligatoire)
- `ANTHROPIC_MODEL` (optionnel, recommande)

Appliquez-les sur **Development / Preview / Production** selon vos besoins, puis redeploy.

## 4) Tester dans l'application

1. Connectez-vous.
2. Allez dans `/editor`.
3. Collez un prompt.
4. Cliquez **Retravailler avec Claude**.
5. Verifiez la proposition, puis cliquez **Remplacer mon prompt par cette version**.

### Persona metier (nouveau)

Dans l'editeur, choisissez un persona avant le retravail :

- General business
- Marketing
- Commercial / Vente
- Ressources humaines
- UX / Produit
- Tech / IT

Le persona ajuste les instructions envoyees a Claude pour obtenir une version plus pertinente selon le metier cible.

## 5) Erreurs frequentes

- `ANTHROPIC_API_KEY manquante sur le serveur`  
  -> Variable absente sur l'environnement courant.

- `Reponse Claude invalide`  
  -> Le modele a renvoye une reponse non JSON; relancer la requete.

- `401 Non autorise`  
  -> Vous etes deconnecte.
