import Stripe from "stripe";

// En build (notamment sur Vercel), les variables d'env ne sont pas toujours présentes.
// On évite donc de throw au moment de l'import et on gère l'erreur dans les routes.
export const stripe =
  process.env.STRIPE_SECRET_KEY != null && process.env.STRIPE_SECRET_KEY !== ""
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

