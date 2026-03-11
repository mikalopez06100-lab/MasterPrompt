import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const promoCode: string | undefined = body.promoCode?.trim() || undefined;
    const email: string | undefined = body.email?.trim() || undefined;

    const priceId = process.env.STRIPE_PRICE_ONE_TIME;
    const productId = process.env.STRIPE_PRODUCT_ONE_TIME;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3003";

    if (!priceId && !productId) {
      return NextResponse.json(
        { error: "Configuration Stripe manquante (prix ou produit)" },
        { status: 500 }
      );
    }

    let promotionCodeId: string | undefined;

    if (promoCode) {
      const promotionCodes = await stripe.promotionCodes.list({
        code: promoCode,
        active: true,
        limit: 1,
      });

      const promotion = promotionCodes.data[0];

      if (!promotion) {
        return NextResponse.json(
          { error: "Code promo invalide ou expiré." },
          { status: 400 }
        );
      }

      promotionCodeId = promotion.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        priceId
          ? {
              // Si un prix est configuré, on l'utilise tel quel
              price: priceId,
              quantity: 1,
            }
          : {
              // Sinon on construit la ligne à partir du produit + montant fixe
              price_data: {
                currency: "eur",
                product: productId!,
                unit_amount: 4900, // 49,00 € en cents
              },
              quantity: 1,
            },
      ],
      success_url: `${appUrl}/billing?status=success`,
      cancel_url: `${appUrl}/billing?status=cancelled`,
      customer_email: email,
      allow_promotion_codes: true,
      discounts: promotionCodeId ? [{ promotion_code: promotionCodeId }] : undefined,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session de paiement Stripe." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe Checkout:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement." },
      { status: 500 }
    );
  }
}

