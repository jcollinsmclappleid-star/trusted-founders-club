import { NextResponse } from "next/server";
import { getMissingEnv, getSiteUrl } from "@/lib/env";
import { getPackageByKey } from "@/lib/packages";
import { siteConfig } from "@/lib/site";
import {
  toSubmissionInsert,
  validateSubmissionInput,
} from "@/lib/submission-validation";
import { getStripeClient } from "@/lib/stripe-server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

const assetFields = ["logoFile", "screenshotFile"] as const;
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"] as const;
const maxAssetSize = 5 * 1024 * 1024;

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

  let parsedRequest: ParsedRequest;
  try {
    parsedRequest = await parseSubmissionRequest(request);
  } catch {
    return NextResponse.json(
      { error: "Invalid submission payload." },
      { status: 400 },
    );
  }

  const assetErrors = validateAssetFiles(parsedRequest.files);
  if (Object.keys(assetErrors).length > 0) {
    return NextResponse.json(
      { error: "Please review the highlighted fields.", fields: assetErrors },
      { status: 400 },
    );
  }

  const validation = validateSubmissionInput(parsedRequest.payload);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "Please review the highlighted fields.", fields: validation.errors },
      { status: 400 },
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
    .insert(toSubmissionInsert(validation.data))
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

  const uploadResult = await uploadSubmissionAssets({
    files: parsedRequest.files,
    submissionId: submission.id,
    appName: validation.data.appName,
    supabase,
  });

  if (!uploadResult.ok) {
    return NextResponse.json(
      {
        error:
          uploadResult.error ??
          `Your submission was saved, but one or more assets could not be uploaded. Please try again or contact ${siteConfig.supportEmail}.`,
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
            `Checkout was created, but the submission could not be updated. Please try again or contact ${siteConfig.supportEmail}.`,
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

type ParsedRequest = {
  payload: Record<string, FormDataEntryValue | boolean>;
  files: Partial<Record<(typeof assetFields)[number], File>>;
};

async function parseSubmissionRequest(request: Request): Promise<ParsedRequest> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const payload: Record<string, FormDataEntryValue | boolean> = {};
    const files: ParsedRequest["files"] = {};

    formData.forEach((value, key) => {
      if (assetFields.includes(key as (typeof assetFields)[number])) {
        if (value instanceof File && value.size > 0) {
          files[key as (typeof assetFields)[number]] = value;
        }
        return;
      }

      payload[key] = [
        "accurateInfo",
        "publicListingConsent",
        "understandsAcceptance",
        "understandsNoSeoGuarantees",
        "acceptsTerms",
      ].includes(key)
        ? value === "true"
        : value;
    });

    return { payload, files };
  }

  return {
    payload: (await request.json()) as Record<string, FormDataEntryValue | boolean>,
    files: {},
  };
}

function validateAssetFiles(files: ParsedRequest["files"]) {
  const errors: Record<string, string> = {};

  assetFields.forEach((field) => {
    const file = files[field];
    if (!file) return;

    if (!allowedImageTypes.includes(file.type as (typeof allowedImageTypes)[number])) {
      errors[field] = "Upload a JPG, PNG or WebP image.";
    } else if (file.size > maxAssetSize) {
      errors[field] = "Upload an image smaller than 5MB.";
    }
  });

  return errors;
}

async function uploadSubmissionAssets({
  files,
  submissionId,
  appName,
  supabase,
}: {
  files: ParsedRequest["files"];
  submissionId: string;
  appName: string;
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>["client"]>;
}) {
  const update: Record<string, string | null> = {};

  for (const field of assetFields) {
    const file = files[field];
    if (!file) continue;

    const role = field === "logoFile" ? "logo" : "screenshot";
    const path = `applications/${submissionId}/${role}.${extensionForMime(file.type)}`;
    const { error } = await supabase.storage.from("listing-assets").upload(path, file, {
      contentType: file.type,
      upsert: true,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    if (role === "logo") {
      update.logo_storage_path = path;
      update.logo_alt = `${appName} logo`;
    } else {
      update.screenshot_storage_path = path;
      update.screenshot_alt = `${appName} screenshot`;
    }
  }

  if (Object.keys(update).length === 0) {
    return { ok: true };
  }

  update.asset_upload_status = "submitted_with_application";
  update.customer_updated_at = new Date().toISOString();

  const { error } = await supabase
    .from("app_submissions")
    .update(update)
    .eq("id", submissionId);

  return error ? { ok: false, error: error.message } : { ok: true };
}

function extensionForMime(mimeType: string) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  return "jpg";
}
