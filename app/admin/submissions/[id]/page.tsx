import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { saveSubmissionReviewAction } from "../../actions";
import {
  AdminStatusBadge,
  statusTone,
} from "@/components/admin-status-badge";
import { CopyButton } from "@/components/copy-button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  buildSubmissionEmailPreview,
  emailTypeLabel,
  getEmailProviderStatus,
  workflowEmailTypes,
} from "@/lib/email";
import {
  formatDate,
  formatPounds,
  createSignedAssetUrl,
  getAdminSubmissionById,
} from "@/lib/submissions";

type SubmissionDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    message?: string;
    tone?: "success" | "warning" | "danger";
  }>;
};

export default async function SubmissionDetailPage({
  params,
  searchParams,
}: SubmissionDetailPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin?error=Admin%20login%20required");
  }

  const { id } = await params;
  const query = await searchParams;
  const { submission, error } = await getAdminSubmissionById(id);

  if (!submission && !error) {
    notFound();
  }

  if (!submission) {
    return (
      <AdminPageShell>
        <Message tone="danger" message={error ?? "Submission not found."} />
      </AdminPageShell>
    );
  }
  const logoPreviewUrl = await createSignedAssetUrl(submission.logo_storage_path);
  const screenshotPreviewUrl = await createSignedAssetUrl(
    submission.screenshot_storage_path,
  );

  return (
    <AdminPageShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/submissions"
            className="text-sm font-semibold text-[#6B7280] underline decoration-[#B8944E]/50 underline-offset-4"
          >
            Back to submissions
          </Link>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-[#111827]">
            {submission.app_name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <AdminStatusBadge
              value={submission.payment_status}
              tone={statusTone(submission.payment_status)}
            />
            <AdminStatusBadge
              value={submission.review_status}
              tone={statusTone(submission.review_status)}
            />
            <AdminStatusBadge
              value={submission.is_public ? "public" : "private"}
              tone={submission.is_public ? "success" : "neutral"}
            />
            <AdminStatusBadge
              value={submission.is_indexable ? "indexable" : "noindex"}
              tone={submission.is_indexable ? "gold" : "neutral"}
            />
          </div>
        </div>
        {submission.is_public && submission.slug ? (
          <Link
            href={`/apps/${submission.slug}`}
            className="inline-flex h-10 items-center justify-center rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-[#111827]"
          >
            View public profile
          </Link>
        ) : null}
      </div>

      {query.message ? (
        <Message tone={query.tone ?? "success"} message={query.message} />
      ) : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <DetailSection title="Founder">
            <ValueRow label="Founder name" value={submission.founder_name} />
            <ValueRow label="Founder email" value={submission.founder_email} />
            <ValueRow label="Customer user ID" value={submission.user_id} />
            <ValueRow label="Founder website" value={submission.founder_website} />
            <ValueRow label="Founder social URL" value={submission.founder_social_url} />
          </DetailSection>

          <DetailSection title="App">
            <ValueRow label="App name" value={submission.app_name} />
            <ValueRow label="Slug" value={submission.slug} />
            <ValueRow label="App URL" value={submission.app_url} link />
            <ValueRow label="Category" value={submission.category} />
            <ValueRow label="Short description" value={submission.short_description} />
            <ValueRow label="Target customer" value={submission.target_customer} />
            <ValueRow label="Problem solved" value={submission.problem_solved} />
            <ValueRow label="App functionality" value={submission.app_functionality} />
            <ValueRow label="Founder note" value={submission.founder_note} />
            <ValueRow
              label="Review attention notes"
              value={submission.review_attention_notes}
            />
            <ValueRow label="Is live" value={submission.is_live} />
            <ValueRow label="Login required" value={submission.login_required} />
            <ValueRow label="Demo login details" value={submission.demo_login_details} />
            <ValueRow label="Logo URL" value={submission.logo_url} link />
            <ValueRow label="Screenshot URL" value={submission.screenshot_url} link />
            <ValueRow label="Logo storage path" value={submission.logo_storage_path} />
            <ValueRow
              label="Screenshot storage path"
              value={submission.screenshot_storage_path}
            />
            <ValueRow label="Asset upload status" value={submission.asset_upload_status} />
            <ValueRow
              label="Customer updated at"
              value={formatDate(submission.customer_updated_at)}
            />
            {logoPreviewUrl || screenshotPreviewUrl ? (
              <div className="grid gap-4 py-4 sm:grid-cols-2">
                {logoPreviewUrl ? (
                  <AssetPreview title="Logo preview" src={logoPreviewUrl} />
                ) : null}
                {screenshotPreviewUrl ? (
                  <AssetPreview title="Screenshot preview" src={screenshotPreviewUrl} />
                ) : null}
              </div>
            ) : null}
          </DetailSection>

          <DetailSection title="Commercial">
            <ValueRow label="Package" value={submission.package.replaceAll("_", " ")} />
            <ValueRow label="Package price" value={formatPounds(submission.package_price)} />
            <ValueRow label="Payment status" value={submission.payment_status} />
            <ValueRow
              label="Stripe checkout session ID"
              value={submission.stripe_checkout_session_id}
            />
            <ValueRow
              label="Stripe payment intent ID"
              value={submission.stripe_payment_intent_id}
            />
            <ValueRow label="Refund status" value={submission.refund_status} />
          </DetailSection>
        </div>

        <form action={saveSubmissionReviewAction} className="space-y-6">
          <input type="hidden" name="id" value={submission.id} />

          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_24px_70px_rgba(17,24,39,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
              Review controls
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#111827]">
              Review and publishing
            </h2>

            <div className="mt-6 grid gap-5">
              <Textarea
                label="Public review quote"
                name="public_review_quote"
                defaultValue={submission.public_review_quote}
                rows={5}
              />
              <Textarea
                label="Private notes"
                name="private_notes"
                defaultValue={submission.private_notes}
                rows={5}
              />
              <Textarea
                label="Change request message"
                name="change_request_message"
                defaultValue={submission.change_request_message}
                rows={4}
              />
              <Textarea
                label="Rejection reason"
                name="rejection_reason"
                defaultValue={submission.rejection_reason}
                rows={4}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextInput
                  label="Badge type"
                  name="badge_type"
                  defaultValue={submission.badge_type ?? "reviewed"}
                />
                <TextInput
                  label="External link rel"
                  name="external_link_rel"
                  defaultValue={
                    submission.external_link_rel ?? "sponsored nofollow noopener"
                  }
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <ReadOnlyField
                  label="Current review status"
                  value={submission.review_status}
                />
                <ReadOnlyField
                  label="Review ID"
                  value={submission.review_id ?? "Generated on approval"}
                />
              </div>
            </div>
          </section>

          <EmailPreviewPanel submission={submission} />

          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
            <h2 className="font-serif text-3xl text-[#111827]">Actions</h2>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              Approving indexable profiles is a manual quality decision. Unpaid
              or rejected submissions cannot be published.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ActionButton intent="save_notes" label="Save draft review notes" />
              <ActionButton intent="add_review_quote" label="Add review quote" />
              <ActionButton
                intent="request_changes"
                label="Request changes"
                tone="warning"
              />
              <ActionButton intent="reject" label="Reject" tone="danger" />
              <ActionButton
                intent="mark_refunded"
                label="Mark refunded"
                tone="warning"
              />
              <ActionButton
                intent="publish_listing"
                label="Publish listing"
                tone="success"
              />
              <ActionButton
                intent="approve_noindex"
                label="Approve public noindex"
                tone="success"
              />
              <ActionButton
                intent="approve_indexable"
                label="Approve public indexable"
                tone="gold"
              />
            </div>
          </section>

          <DetailSection title="Review metadata">
            <ValueRow label="Review status" value={submission.review_status} />
            <ValueRow label="Is public" value={submission.is_public} />
            <ValueRow label="Is indexable" value={submission.is_indexable} />
            <ValueRow label="Review ID" value={submission.review_id} />
            <ValueRow label="Reviewed at" value={formatDate(submission.reviewed_at)} />
            <ValueRow label="Published at" value={formatDate(submission.published_at)} />
            <ValueRow
              label="Indexing approved at"
              value={formatDate(submission.indexing_approved_at)}
            />
            <ValueRow
              label="Indexing approved by"
              value={submission.indexing_approved_by}
            />
          </DetailSection>
        </form>
      </div>
    </AdminPageShell>
  );
}

function AdminPageShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-[70vh] bg-[#F7F3EA] px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
      <h2 className="font-serif text-3xl text-[#111827]">{title}</h2>
      <div className="mt-5 divide-y divide-[#E7E0D2]">{children}</div>
    </section>
  );
}

function EmailPreviewPanel({
  submission,
}: {
  submission: Awaited<ReturnType<typeof getAdminSubmissionById>>["submission"];
}) {
  if (!submission) return null;

  const provider = getEmailProviderStatus();
  const previews = workflowEmailTypes.map((type) => ({
    type,
    ...buildSubmissionEmailPreview(type, submission),
  }));

  return (
    <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
        Email controls
      </p>
      <h2 className="mt-2 font-serif text-3xl text-[#111827]">
        Customer and admin notifications
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">
        Workflow emails are sent server-side only. Resends require explicit
        confirmation to avoid accidental duplicate customer emails.
      </p>

      {!provider.configured ? (
        <div className="mt-5 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#7A461B]">
          Email provider is not configured. Missing: {provider.missing.join(", ")}.
        </div>
      ) : null}
      {provider.adminNotificationMissing ? (
        <div className="mt-5 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#7A461B]">
          Admin notification email is not configured. Missing:{" "}
          ADMIN_NOTIFICATION_EMAIL.
        </div>
      ) : null}

      <div className="mt-5 divide-y divide-[#E7E0D2] rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] px-4">
        <ValueRow label="Last email type" value={submission.last_email_type} />
        <ValueRow
          label="Last email sent"
          value={formatDate(submission.last_email_sent_at)}
        />
        <ValueRow label="Last email error" value={submission.last_email_error} />
        <ValueRow
          label="Payment email"
          value={formatDate(submission.payment_received_email_sent_at)}
        />
        <ValueRow
          label="Admin notification"
          value={formatDate(submission.admin_notification_sent_at)}
        />
        <ValueRow
          label="Approval email"
          value={formatDate(submission.approval_email_sent_at)}
        />
        <ValueRow
          label="Needs changes email"
          value={formatDate(submission.needs_changes_email_sent_at)}
        />
        <ValueRow
          label="Rejection email"
          value={formatDate(submission.rejection_email_sent_at)}
        />
        <ValueRow
          label="Refund email"
          value={formatDate(submission.refund_email_sent_at)}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label
            htmlFor="email_type"
            className="mb-2 block text-sm font-semibold text-[#111827]"
          >
            Email type to resend
          </label>
          <select
            id="email_type"
            name="email_type"
            className="h-12 w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20"
          >
            {workflowEmailTypes.map((type) => (
              <option key={type} value={type}>
                {emailTypeLabel(type)}
              </option>
            ))}
          </select>
        </div>
        <ActionButton
          intent="resend_email"
          label="Resend selected email"
          tone="warning"
        />
      </div>

      <label className="mt-4 flex gap-3 rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-4 text-sm leading-6 text-[#6B7280]">
        <input
          type="checkbox"
          name="confirm_resend"
          value="yes"
          className="mt-1 size-4 rounded border-[#E7E0D2] accent-[#B8944E]"
        />
        I understand this may send another email to the founder or admin
        notification address.
      </label>

      <div className="mt-6 space-y-3">
        {previews.map((preview) => {
          const copyValue = `Subject: ${preview.subject}\n\n${preview.text}`;
          return (
            <details
              key={preview.type}
              className="rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-[#111827]">
                {emailTypeLabel(preview.type)} preview
              </summary>
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B8944E]">
                    {preview.subject}
                  </p>
                  <CopyButton value={copyValue} />
                </div>
                <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] p-3 text-xs leading-6 text-[#111827]">
                  {preview.text}
                </pre>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function ValueRow({
  label,
  value,
  link,
}: {
  label: string;
  value: string | boolean | null;
  link?: boolean;
}) {
  const display =
    typeof value === "boolean" ? (value ? "Yes" : "No") : value || "Not provided";

  return (
    <div className="grid gap-2 py-3 text-sm sm:grid-cols-[180px_1fr]">
      <dt className="font-semibold text-[#111827]">{label}</dt>
      <dd className="break-words leading-6 text-[#6B7280]">
        {link && value ? (
          <a
            href={String(value)}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="text-[#0B1220] underline decoration-[#B8944E]/50 underline-offset-4"
          >
            {display}
          </a>
        ) : (
          display
        )}
      </dd>
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows,
}: {
  label: string;
  name: string;
  defaultValue: string | null;
  rows: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 py-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20"
      />
    </div>
  );
}

function AssetPreview({ title, src }: { title: string; src: string }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-[#111827]">{title}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        className="aspect-video w-full rounded-[6px] border border-[#E7E0D2] bg-[#F7F3EA] object-contain"
      />
    </div>
  );
}

function TextInput({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="h-12 w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20"
      />
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-[#111827]">{label}</p>
      <div className="flex h-12 items-center rounded-[6px] border border-[#E7E0D2] bg-[#F7F3EA] px-3 text-sm text-[#6B7280]">
        {value.replaceAll("_", " ")}
      </div>
    </div>
  );
}

function ActionButton({
  intent,
  label,
  tone = "neutral",
}: {
  intent: string;
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "gold";
}) {
  const classes = {
    neutral: "border-[#0B1220]/20 text-[#0B1220] hover:bg-[#0B1220]/5",
    success: "border-[#4F7F63]/30 bg-[#4F7F63]/10 text-[#2F5B42]",
    warning: "border-[#A66A2C]/30 bg-[#A66A2C]/10 text-[#7A461B]",
    danger: "border-red-900/30 bg-red-900/10 text-red-900",
    gold: "border-[#B8944E]/40 bg-[#B8944E]/10 text-[#735724]",
  };

  return (
    <button
      name="intent"
      value={intent}
      className={`min-h-11 rounded-[6px] border px-4 py-2 text-sm font-semibold transition ${classes[tone]}`}
    >
      {label}
    </button>
  );
}

function Message({
  tone,
  message,
}: {
  tone: "success" | "warning" | "danger";
  message: string;
}) {
  const classes = {
    success: "border-[#4F7F63]/30 bg-[#4F7F63]/10 text-[#2F5B42]",
    warning: "border-[#A66A2C]/30 bg-[#A66A2C]/10 text-[#7A461B]",
    danger: "border-red-900/30 bg-red-900/10 text-red-900",
  };

  return (
    <div className={`mt-6 rounded-[8px] border p-4 text-sm ${classes[tone]}`}>
      {message}
    </div>
  );
}
