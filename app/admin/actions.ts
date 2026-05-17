"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  parseSubmissionEmailType,
  sendSubmissionEmail,
  type SubmissionEmailType,
} from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { generateSubmissionSlug } from "@/lib/submission-validation";
import { getAdminSubmissionById, type AppSubmission } from "@/lib/submissions";

type MessageTone = "success" | "warning" | "danger";

export async function loginAdminAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin?error=Invalid%20admin%20password");
  }

  await setAdminSession();
  redirect("/admin/submissions");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin");
}

export async function saveSubmissionReviewAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin?error=Admin%20login%20required");
  }

  const id = String(formData.get("id") ?? "");
  const intent = String(formData.get("intent") ?? "");
  if (!id) redirect("/admin/submissions");

  const { submission, error: fetchError } = await getAdminSubmissionById(id);
  if (fetchError || !submission) {
    redirect(`/admin/submissions/${id}?tone=danger&message=Submission%20not%20found`);
  }

  const update = buildBaseUpdate(formData);
  const now = new Date().toISOString();
  let message = "Submission updated.";
  let tone: MessageTone = "success";
  let workflowEmailType: SubmissionEmailType | null = null;

  const validationError = validateIntent(intent, formData, submission);
  if (validationError) {
    redirectToSubmission(id, validationError, "warning");
  }

  if (intent === "request_changes") {
    Object.assign(update, {
      review_status: "needs_changes",
      is_public: false,
      is_indexable: false,
      change_request_message: trimOrNull(formData.get("change_request_message")),
    });
    message = "Changes requested.";
    tone = "warning";
    workflowEmailType = "needs_changes";
  } else if (intent === "reject") {
    Object.assign(update, {
      review_status: "rejected_refunded",
      is_public: false,
      is_indexable: false,
      rejection_reason: trimOrNull(formData.get("rejection_reason")),
    });
    message = "Submission rejected. Refund processing is still manual.";
    tone = "danger";
    workflowEmailType = "rejection";
  } else if (intent === "mark_refunded") {
    Object.assign(update, {
      refund_status: "refunded",
      payment_status: "refunded",
      review_status: "rejected_refunded",
      is_public: false,
      is_indexable: false,
    });
    message = "Submission marked refunded.";
    tone = "warning";
    workflowEmailType = "refund";
  } else if (intent === "add_review_quote") {
    Object.assign(update, {
      review_status: submission.is_public ? submission.review_status : "review_added",
      public_review_quote: trimOrNull(formData.get("public_review_quote")),
      review_id: submission.review_id ?? generateReviewId(submission.id),
      reviewed_at: submission.reviewed_at ?? now,
      badge_type: trimOrNull(formData.get("badge_type")) ?? "reviewed",
    });
    message = "Review quote saved.";
  } else if (intent === "approve_noindex") {
    Object.assign(update, approvalUpdate(submission, formData, now, false));
    message = "Submission approved public noindex.";
    workflowEmailType = "approval";
  } else if (intent === "approve_indexable") {
    Object.assign(update, approvalUpdate(submission, formData, now, true));
    message = "Submission approved public indexable.";
    workflowEmailType = "approval";
  } else if (intent === "publish_listing") {
    Object.assign(update, {
      is_public: true,
      slug: submission.slug ?? generateSubmissionSlug(submission.app_name),
      published_at: submission.published_at ?? now,
      reviewed_at: submission.reviewed_at ?? now,
      review_id: submission.review_id ?? generateReviewId(submission.id),
      badge_type: trimOrNull(formData.get("badge_type")) ?? "reviewed",
      external_link_rel:
        trimOrNull(formData.get("external_link_rel")) ??
        "sponsored nofollow noopener",
    });
    message = "Listing published.";
    workflowEmailType = "approval";
  } else if (intent === "resend_email") {
    const requestedEmailType = parseSubmissionEmailType(
      String(formData.get("email_type") ?? ""),
    );
    if (!requestedEmailType) {
      redirectToSubmission(id, "Choose a valid email type to resend.", "warning");
    }
    if (formData.get("confirm_resend") !== "yes") {
      redirectToSubmission(
        id,
        "Confirm the resend before sending another customer email.",
        "warning",
      );
    }
    workflowEmailType = requestedEmailType;
    message = "Email resend attempted.";
  }

  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    redirectToSubmission(id, error ?? "Supabase is not configured.", "danger");
  }

  const { error: updateError } = await supabase
    .from("app_submissions")
    .update(update)
    .eq("id", id);

  if (updateError) {
    redirectToSubmission(id, updateError.message, "danger");
  }

  const { submission: refreshedSubmission } = await getAdminSubmissionById(id);
  if (workflowEmailType && refreshedSubmission) {
    const emailResult = await sendSubmissionEmail(workflowEmailType, refreshedSubmission, {
      force: intent === "resend_email",
    });

    if (emailResult.skipped) {
      message = `${message} ${emailResult.error}`;
    } else if (!emailResult.ok) {
      message = `${message} Email not sent: ${emailResult.error ?? "Unknown email error."}`;
      tone = "warning";
    } else {
      message = `${message} Email sent.`;
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
  revalidatePath(`/admin/submissions/${id}`);
  revalidatePath("/apps");
  if (submission.slug) revalidatePath(`/apps/${submission.slug}`);
  if (refreshedSubmission?.slug) revalidatePath(`/apps/${refreshedSubmission.slug}`);

  redirectToSubmission(id, message, tone);
}

function buildBaseUpdate(formData: FormData) {
  return {
    public_review_quote: trimOrNull(formData.get("public_review_quote")),
    private_notes: trimOrNull(formData.get("private_notes")),
    change_request_message: trimOrNull(formData.get("change_request_message")),
    rejection_reason: trimOrNull(formData.get("rejection_reason")),
    badge_type: trimOrNull(formData.get("badge_type")),
    external_link_rel:
      trimOrNull(formData.get("external_link_rel")) ??
      "sponsored nofollow noopener",
  };
}

function validateIntent(
  intent: string,
  formData: FormData,
  submission: AppSubmission,
) {
  const quote = trimOrNull(formData.get("public_review_quote"));

  if (
    ["approve_noindex", "approve_indexable", "publish_listing"].includes(intent) &&
    submission.payment_status !== "paid"
  ) {
    return "Unpaid submissions cannot be approved or published.";
  }

  if (
    intent === "request_changes" &&
    !trimOrNull(formData.get("change_request_message"))
  ) {
    return "Change request message is required.";
  }

  if (intent === "reject" && !trimOrNull(formData.get("rejection_reason"))) {
    return "Rejection reason is required.";
  }

  const quoteRequired = submission.package === "founder_review";

  if (
    [
      "approve_noindex",
      "approve_indexable",
      "add_review_quote",
      "publish_listing",
    ].includes(intent) &&
    !quote &&
    quoteRequired
  ) {
    return "A public review quote is required for this package.";
  }

  if (intent === "approve_indexable" && !quote) {
    return "A public review quote is required before approving an indexable profile.";
  }

  if (intent === "publish_listing" && submission.review_status === "rejected_refunded") {
    return "Rejected submissions cannot be published.";
  }

  if (
    intent === "publish_listing" &&
    ![
      "approved_public",
      "approved_noindex",
      "approved_indexable",
      "review_added",
    ].includes(submission.review_status)
  ) {
    return "Approve or add a review quote before publishing the listing.";
  }

  return null;
}

function approvalUpdate(
  submission: AppSubmission,
  formData: FormData,
  now: string,
  indexable: boolean,
) {
  return {
    review_status: indexable ? "approved_indexable" : "approved_noindex",
    is_public: true,
    is_indexable: indexable,
    public_review_quote: trimOrNull(formData.get("public_review_quote")),
    private_notes: trimOrNull(formData.get("private_notes")),
    badge_type: trimOrNull(formData.get("badge_type")) ?? "reviewed",
    review_id: submission.review_id ?? generateReviewId(submission.id),
    reviewed_at: submission.reviewed_at ?? now,
    published_at: submission.published_at ?? now,
    indexing_approved_at: indexable ? now : null,
    indexing_approved_by: indexable ? "admin" : null,
    external_link_rel:
      trimOrNull(formData.get("external_link_rel")) ?? "sponsored nofollow noopener",
    slug: submission.slug ?? generateSubmissionSlug(submission.app_name),
  };
}

function trimOrNull(value: FormDataEntryValue | null) {
  const trimmed = String(value ?? "").trim();
  return trimmed || null;
}

function generateReviewId(id: string) {
  return `TFC-${id.slice(0, 8).toUpperCase()}`;
}

function redirectToSubmission(
  id: string,
  message: string,
  tone: MessageTone,
): never {
  redirect(
    `/admin/submissions/${id}?tone=${tone}&message=${encodeURIComponent(message)}`,
  );
}
