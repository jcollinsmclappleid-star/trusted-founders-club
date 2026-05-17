import Stripe from "stripe";
import { getMissingEnv } from "@/lib/env";

export function getStripeClient() {
  const missing = getMissingEnv(["STRIPE_SECRET_KEY"]);

  if (missing.length > 0) {
    return {
      stripe: null,
      error: `Missing Stripe environment variables: ${missing.join(", ")}`,
    };
  }

  return {
    stripe: new Stripe(process.env.STRIPE_SECRET_KEY!),
    error: null,
  };
}
