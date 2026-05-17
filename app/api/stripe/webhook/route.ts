import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getMissingEnv } from "@/lib/env";
import {
  getPaymentIntentId,
  markSubmissionPaid,
  markSubmissionPaymentFailed,
  markSubmissionRefunded,
} from "@/lib/submission-status";
import { getStripeClient } from "@/lib/stripe-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const missing = getMissingEnv([
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
  ]);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error:
          "Stripe webhook is not configured. Missing environment variables: " +
          missing.join(", "),
      },
      { status: 503 },
    );
  }

  const { stripe, error } = getStripeClient();
  if (!stripe) {
    return NextResponse.json({ error }, { status: 503 });
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await markSubmissionPaid({
        submissionId: session.metadata?.submission_id,
        checkoutSessionId: session.id,
        paymentIntentId: getPaymentIntentId(session.payment_intent),
      });
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await markSubmissionPaymentFailed(paymentIntent.metadata.submission_id);
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      await markSubmissionRefunded(getPaymentIntentId(charge.payment_intent));
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
