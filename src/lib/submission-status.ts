import type Stripe from "stripe";
import {
  sendPaymentWorkflowEmails,
  sendSubmissionEmail,
} from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import {
  getAdminSubmissionByCheckoutSessionId,
  getAdminSubmissionById,
  getAdminSubmissionByPaymentIntentId,
} from "@/lib/submissions";

export function getPaymentIntentId(
  paymentIntent: string | Stripe.PaymentIntent | null,
) {
  if (!paymentIntent) return null;
  return typeof paymentIntent === "string" ? paymentIntent : paymentIntent.id;
}

export async function markSubmissionPaid({
  submissionId,
  checkoutSessionId,
  paymentIntentId,
}: {
  submissionId?: string | null;
  checkoutSessionId?: string | null;
  paymentIntentId?: string | null;
}) {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) return { ok: false, error };

  const existing = submissionId
    ? await getAdminSubmissionById(submissionId)
    : checkoutSessionId
      ? await getAdminSubmissionByCheckoutSessionId(checkoutSessionId)
      : { submission: null };

  const currentSubmission = existing.submission;

  const update = {
    payment_status:
      currentSubmission?.payment_status === "refunded" ? "refunded" : "paid",
    review_status:
      currentSubmission && currentSubmission.review_status !== "draft"
        ? currentSubmission.review_status
        : "paid_pending_review",
    stripe_payment_intent_id:
      paymentIntentId ?? currentSubmission?.stripe_payment_intent_id ?? null,
  };

  const query = submissionId
    ? supabase.from("app_submissions").update(update).eq("id", submissionId)
    : checkoutSessionId
      ? supabase
          .from("app_submissions")
          .update(update)
          .eq("stripe_checkout_session_id", checkoutSessionId)
      : null;

  if (!query) {
    return { ok: false, error: "Missing submission reference." };
  }

  const { error: updateError } = await query;
  if (updateError) {
    return { ok: false, error: updateError.message };
  }

  const refreshed = submissionId
    ? await getAdminSubmissionById(submissionId)
    : checkoutSessionId
      ? await getAdminSubmissionByCheckoutSessionId(checkoutSessionId)
      : { submission: null };

  if (refreshed.submission && refreshed.submission.payment_status === "paid") {
    await sendPaymentWorkflowEmails(refreshed.submission);
  }

  return { ok: true, error: null };
}

export async function markSubmissionPaymentFailed(submissionId?: string | null) {
  if (!submissionId) return { ok: false, error: "Missing submission reference." };

  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) return { ok: false, error };

  const { error: updateError } = await supabase
    .from("app_submissions")
    .update({ payment_status: "failed" })
    .eq("id", submissionId);

  if (updateError) {
    return { ok: false, error: updateError.message };
  }

  return { ok: true, error: null };
}

export async function markSubmissionRefunded(paymentIntentId?: string | null) {
  if (!paymentIntentId) {
    return { ok: false, error: "Missing payment intent reference." };
  }

  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) return { ok: false, error };

  const { error: updateError } = await supabase
    .from("app_submissions")
    .update({ payment_status: "refunded", refund_status: "refunded" })
    .eq("stripe_payment_intent_id", paymentIntentId);

  if (updateError) {
    return { ok: false, error: updateError.message };
  }

  const { submission } = await getAdminSubmissionByPaymentIntentId(paymentIntentId);
  if (submission) {
    await sendSubmissionEmail("refund", submission);
  }

  return { ok: true, error: null };
}
