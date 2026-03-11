import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY manquant dans les variables d'environnement");
}

// On laisse Stripe utiliser la version d'API par défaut liée au SDK installé
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

