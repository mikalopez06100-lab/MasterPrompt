import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe n'est pas configuré côté serveur." },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const email: string | undefined = body.email?.trim() || undefined;

    const priceId = process.env.STRIPE_PRICE_ONE_TIME;
    const productId = process.env.STRIPE_PRODUCT_ONE_TIME;
    const requestOrigin = new URL(request.url).origin;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestOrigin || "http://localhost:3003";

    if (!priceId && !productId) {
      return NextResponse.json(
        { error: "Configuration Stripe manquante (prix ou produit)" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        priceId
          ? {
              price: priceId,
              quantity: 1,
            }
          : {
              price_data: {
                currency: "eur",
                product: productId!,
                unit_amount: 4900, // 49,00 € en cents
              },
              quantity: 1,
            },
      ],
      success_url: `${appUrl}/billing?status=success&next=login`,
      cancel_url: `${appUrl}/billing?status=cancelled`,
      customer_email: email,
      allow_promotion_codes: true, // le code promo est saisi sur la page Stripe
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session de paiement Stripe." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Erreur Stripe Checkout:", error);
    const message =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as any).message)
        : "Erreur lors de la création de la session de paiement.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

