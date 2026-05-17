import { NextResponse } from "next/server";
import { getMissingEnv, getSiteUrl } from "@/lib/env";
import { getPackageByKey } from "@/lib/packages";
import {
  toSubmissionInsert,
  validateSubmissionInput,
} from "@/lib/submission-validation";
import { getStripeClient } from "@/lib/stripe-server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { getCurrentUser } from "@/lib/supabase-auth-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const missing = getMissingEnv([
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "STRIPE_SECRET_KEY",
  ]);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error:
          "Checkout is not configured. Missing environment variables: " +
          missing.join(", "),
      },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const validation = validateSubmissionInput(payload);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "Please review the highlighted fields.", fields: validation.errors },
      { status: 400 },
    );
  }

  const { user, error: userError } = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      {
        error:
          userError ??
          "Please log in or create an account before continuing to payment.",
      },
      { status: 401 },
    );
  }

  const { client: supabase, error: supabaseError } = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: supabaseError }, { status: 503 });
  }

  const { stripe, error: stripeError } = getStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: stripeError }, { status: 503 });
  }

  const selectedPackage = getPackageByKey(validation.data.packageKey);
  if (!selectedPackage) {
    return NextResponse.json(
      { error: "Invalid package selection." },
      { status: 400 },
    );
  }

  const { data: submission, error: insertError } = await supabase
    .from("app_submissions")
    .insert({ ...toSubmissionInsert(validation.data), user_id: user.id })
    .select("id, app_name, founder_email")
    .single();

  if (insertError || !submission) {
    return NextResponse.json(
      {
        error:
          "Could not create the submission record. Please check Supabase configuration.",
      },
      { status: 500 },
    );
  }

  try {
    const siteUrl = getSiteUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: validation.data.founderEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: selectedPackage.price,
            product_data: {
              name: `Review Signal - ${selectedPackage.name}`,
              description: selectedPackage.description,
            },
          },
        },
      ],
      success_url: `${siteUrl}/submit/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/submit/cancel?submission_id=${submission.id}`,
      metadata: {
        submission_id: submission.id,
        package: selectedPackage.key,
        founder_email: validation.data.founderEmail,
        app_name: validation.data.appName,
      },
      payment_intent_data: {
        metadata: {
          submission_id: submission.id,
          package: selectedPackage.key,
          founder_email: validation.data.founderEmail,
          app_name: validation.data.appName,
        },
      },
    });

    const { error: updateError } = await supabase
      .from("app_submissions")
      .update({
        stripe_checkout_session_id: session.id,
        payment_status: "checkout_created",
      })
      .eq("id", submission.id);

    if (updateError) {
      return NextResponse.json(
        {
          error:
            "Checkout was created, but the submission could not be updated. Please try again or contact support.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ checkoutUrl: session.url });
  } catch {
    return NextResponse.json(
      {
        error:
          "Stripe Checkout could not be created. Please check Stripe configuration.",
      },
      { status: 500 },
    );
  }
}
