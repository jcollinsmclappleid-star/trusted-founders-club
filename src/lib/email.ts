import "server-only";

import { reviewPackages } from "@/lib/packages";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { absoluteUrl, badgeAssets, siteConfig } from "@/lib/site";
import {
  formatDate,
  profileUrl,
  type AppSubmission,
} from "@/lib/submissions";

export type SubmissionEmailType =
  | "payment_received"
  | "admin_new_paid_submission"
  | "approval"
  | "needs_changes"
  | "rejection"
  | "refund";

type EmailContent = {
  subject: string;
  text: string;
};

type SendResult = {
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

const emailLabels: Record<SubmissionEmailType, string> = {
  payment_received: "Payment received",
  admin_new_paid_submission: "Admin new paid submission",
  approval: "Approved and published",
  needs_changes: "Needs changes",
  rejection: "Rejected",
  refund: "Refund marked",
};

const timestampFieldByType: Record<SubmissionEmailType, keyof AppSubmission> = {
  payment_received: "payment_received_email_sent_at",
  admin_new_paid_submission: "admin_notification_sent_at",
  approval: "approval_email_sent_at",
  needs_changes: "needs_changes_email_sent_at",
  rejection: "rejection_email_sent_at",
  refund: "refund_email_sent_at",
};

export const workflowEmailTypes = Object.keys(
  emailLabels,
) as SubmissionEmailType[];

export function emailTypeLabel(type: SubmissionEmailType) {
  return emailLabels[type];
}

export function parseSubmissionEmailType(value: string) {
  return workflowEmailTypes.includes(value as SubmissionEmailType)
    ? (value as SubmissionEmailType)
    : null;
}

export function getEmailProviderStatus() {
  const missing = [
    !process.env.RESEND_API_KEY ? "RESEND_API_KEY" : null,
    !process.env.FROM_EMAIL ? "FROM_EMAIL" : null,
  ].filter(Boolean) as string[];

  return {
    configured: missing.length === 0,
    missing,
    adminNotificationMissing: !process.env.ADMIN_NOTIFICATION_EMAIL,
  };
}

export function isEmailConfigured() {
  return getEmailProviderStatus().configured;
}

export function canReceiveBadgeEmbed(submission: Pick<AppSubmission, "package">) {
  return submission.package === "founder_review";
}

export function buildBadgeEmbedCode(publicProfileUrl: string) {
  const imgUrl = absoluteUrl(badgeAssets.dark);
  return `<a href="${publicProfileUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;line-height:0;border:0;text-decoration:none;">
  <img src="${imgUrl}" alt="Reviewed by ${siteConfig.name} - click to verify" style="max-width:min(100%, 420px);width:auto;height:auto;border:0;display:block;" />
</a>`;
}

export function buildSubmissionEmailPreview(
  type: SubmissionEmailType,
  submission: AppSubmission,
): EmailContent {
  const publicProfileUrl = submission.slug
    ? profileUrl(submission.slug)
    : "[Profile URL]";
  const adminSubmissionUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin/submissions/${submission.id}`;
  const packageName =
    reviewPackages[submission.package as keyof typeof reviewPackages]?.name ??
    submission.package.replaceAll("_", " ");

  if (type === "payment_received") {
    return {
      subject: "Your app has entered the Review Signal review queue",
      text: [
        `Hi ${submission.founder_name},`,
        "",
        `Thanks for submitting ${submission.app_name} to Review Signal.`,
        "",
        "Payment has been received and your app is now in the manual review queue.",
        "",
        "Approved submissions are usually reviewed and published within 24 hours. If we need anything else, we'll contact you using this email address.",
        "",
        "A quick note: not every app is accepted, and we do not guarantee rankings, indexing, traffic or sales.",
        "",
        "Thanks,",
        "Review Signal",
      ].join("\n"),
    };
  }

  if (type === "admin_new_paid_submission") {
    return {
      subject: `New app submission ready for review: ${submission.app_name}`,
      text: [
        "A new paid submission is ready for review.",
        "",
        `App: ${submission.app_name}`,
        `Founder: ${submission.founder_name}`,
        `Package: ${packageName}`,
        `URL: ${submission.app_url}`,
        "",
        "Review in admin:",
        adminSubmissionUrl,
      ].join("\n"),
    };
  }

  if (type === "approval") {
    const quote =
      submission.public_review_quote ?? "Reviewed by Review Signal.";
    const includesReviewAssets = canReceiveBadgeEmbed(submission);
    const quoteBlock = includesReviewAssets
      ? [
          "Your approved review quote:",
          `"${quote}"`,
          "",
          "You can use the approved quote and badge on your landing page, subject to the badge and quote usage terms.",
        ]
      : [
          "Your public listing confirms the app was manually reviewed for listing suitability.",
        ];
    const badgeBlock = includesReviewAssets
      ? [
          "",
          "Badge embed code:",
          buildBadgeEmbedCode(publicProfileUrl),
          "",
          "The badge links back to your Review Signal profile so visitors can verify the review.",
        ]
      : [
          "",
          "This package includes the public listing profile. Review quote and badge embed assets are included with the Founder Review package.",
        ];

    return {
      subject: "Your Review Signal profile is live",
      text: [
        `Hi ${submission.founder_name},`,
        "",
        `Your app profile for ${submission.app_name} is now live on Review Signal.`,
        "",
        "View your profile:",
        publicProfileUrl,
        "",
        ...quoteBlock,
        ...badgeBlock,
        "",
        "Thanks,",
        "Review Signal",
      ].join("\n"),
    };
  }

  if (type === "needs_changes") {
    return {
      subject: `We need a few changes before listing ${submission.app_name}`,
      text: [
        `Hi ${submission.founder_name},`,
        "",
        `Thanks for submitting ${submission.app_name}.`,
        "",
        "Before we can publish your Review Signal profile, we need a few changes or clarifications:",
        "",
        submission.change_request_message ?? "[Change Request Message]",
        "",
        "You can update your submission from your account.",
        "",
        "Thanks,",
        "Review Signal",
      ].join("\n"),
    };
  }

  if (type === "rejection") {
    return {
      subject: "Update on your Review Signal submission",
      text: [
        `Hi ${submission.founder_name},`,
        "",
        `Thanks for submitting ${submission.app_name} to Review Signal.`,
        "",
        "After review, we're not able to publish this submission at this stage.",
        "",
        "Reason:",
        submission.rejection_reason ?? "[Rejection Reason]",
        "",
        "If a refund applies under the terms shown at checkout, it will be handled separately.",
        "",
        "Thanks,",
        "Review Signal",
      ].join("\n"),
    };
  }

  return {
    subject: "Refund update for your Review Signal submission",
    text: [
      `Hi ${submission.founder_name},`,
      "",
      `A refund has been marked for your Review Signal submission for ${submission.app_name}.`,
      "",
      "Please allow the payment provider's normal processing time for the refund to appear.",
      "",
      "Thanks,",
      "Review Signal",
    ].join("\n"),
  };
}

export async function sendSubmissionEmail(
  type: SubmissionEmailType,
  submission: AppSubmission,
  options: { force?: boolean } = {},
): Promise<SendResult> {
  const readinessError = getEmailReadinessError(type, submission);
  if (readinessError) {
    await recordEmailResult(
      type,
      submission.id,
      submission.founder_email || "not configured",
      "",
      "error",
      readinessError,
    );
    return { ok: false, error: readinessError };
  }

  const recipient =
    type === "admin_new_paid_submission"
      ? process.env.ADMIN_NOTIFICATION_EMAIL
      : submission.founder_email;

  if (!recipient) {
    const error =
      type === "admin_new_paid_submission"
        ? "ADMIN_NOTIFICATION_EMAIL is not configured."
        : "Submission founder email is missing.";
    await recordEmailResult(type, submission.id, "not configured", "", "error", error);
    return { ok: false, error };
  }

  const alreadySent = submission[timestampFieldByType[type]];
  if (alreadySent && !options.force) {
    return {
      ok: true,
      skipped: true,
      error: `${emailLabels[type]} email was already sent on ${formatDate(String(alreadySent))}.`,
    };
  }

  const content = buildSubmissionEmailPreview(type, submission);
  const provider = getEmailProviderStatus();
  if (!provider.configured) {
    const error = `Email provider is not configured. Missing: ${provider.missing.join(", ")}.`;
    await recordEmailResult(
      type,
      submission.id,
      recipient,
      content.subject,
      "error",
      error,
    );
    return { ok: false, error };
  }

  const result = await sendResendEmail(recipient, content);
  await recordEmailResult(
    type,
    submission.id,
    recipient,
    content.subject,
    result.ok ? "sent" : "error",
    result.error,
  );

  return result;
}

function getEmailReadinessError(
  type: SubmissionEmailType,
  submission: AppSubmission,
) {
  if (type === "approval" && (!submission.is_public || !submission.slug)) {
    return "Approval email requires a live public profile.";
  }

  if (type === "needs_changes" && !submission.change_request_message) {
    return "Needs changes email requires a change request message.";
  }

  if (type === "rejection" && !submission.rejection_reason) {
    return "Rejection email requires a rejection reason.";
  }

  return null;
}

export async function sendPaymentWorkflowEmails(submission: AppSubmission) {
  await sendSubmissionEmail("payment_received", submission);
  await sendSubmissionEmail("admin_new_paid_submission", submission);
}

async function sendResendEmail(to: string, content: EmailContent): Promise<SendResult> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL,
        to,
        subject: content.subject,
        text: content.text,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return {
        ok: false,
        error: `Resend returned ${response.status}: ${body.slice(0, 300)}`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Email send failed.",
    };
  }
}

async function recordEmailResult(
  type: SubmissionEmailType,
  submissionId: string,
  recipient: string,
  subject: string,
  status: "sent" | "error",
  error?: string,
) {
  const { client: supabase } = getSupabaseAdmin();
  if (!supabase) return;

  await supabase.from("email_events").insert({
    submission_id: submissionId,
    email_type: type,
    recipient,
    subject,
    status,
    error: error ?? null,
  });

  const now = new Date().toISOString();
  const update: Record<string, string | null> = {
    last_email_type: type,
    last_email_error: error ?? null,
  };

  if (status === "sent") {
    update.last_email_sent_at = now;
    update[timestampFieldByType[type] as string] = now;
  }

  await supabase.from("app_submissions").update(update).eq("id", submissionId);
}
