import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  updateCustomerSubmissionAction,
  uploadSubmissionAssetAction,
} from "../../actions";
import { AdminStatusBadge, statusTone } from "@/components/admin-status-badge";
import { CopyButton } from "@/components/copy-button";
import { TrustBadge } from "@/components/trust-badge";
import { buildBadgeEmbedCode, canReceiveBadgeEmbed } from "@/lib/email";
import { categoryOptions } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase-auth-server";
import {
  createSignedAssetUrl,
  customerNextStep,
  formatDate,
  getCustomerSubmissionById,
  getReviewedDate,
  isCustomerEditable,
  profileUrl,
} from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Submission Detail | Review Signal",
};

export const dynamic = "force-dynamic";

type SubmissionPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string; tone?: "success" | "warning" | "danger" }>;
};

export default async function CustomerSubmissionPage({
  params,
  searchParams,
}: SubmissionPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const { user } = await getCurrentUser();
  if (!user) redirect(`/login?next=/account/submissions/${id}`);

  const { submission, error } = await getCustomerSubmissionById(id, user.id);
  if (!submission && !error) notFound();
  if (!submission) {
    return <AccountShell><Message tone="danger" message={error ?? "Submission not found."} /></AccountShell>;
  }

  const editable = isCustomerEditable(submission);
  const logoUrl = await createSignedAssetUrl(submission.logo_storage_path);
  const screenshotUrl = await createSignedAssetUrl(submission.screenshot_storage_path);
  const approved =
    submission.is_public &&
    ["approved_noindex", "approved_public", "approved_indexable", "review_added"].includes(
      submission.review_status,
    );
  const publicProfileUrl =
    approved && submission.slug ? profileUrl(submission.slug) : null;
  const badgeAvailable = approved && canReceiveBadgeEmbed(submission);
  const badgeEmbed =
    publicProfileUrl && badgeAvailable ? buildBadgeEmbedCode(publicProfileUrl) : "";

  return (
    <AccountShell>
      <Link
        href="/account/submissions"
        className="text-sm font-semibold text-[#6B7280] underline decoration-[#B8944E]/50 underline-offset-4"
      >
        Back to submissions
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
            Submission
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-[#111827] md:text-5xl">
            {submission.app_name}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6B7280]">
            {customerNextStep(submission)}
          </p>
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
              value={editable ? "editable" : "locked"}
              tone={editable ? "gold" : "neutral"}
            />
          </div>
        </div>
        {publicProfileUrl ? (
          <Link
            href={publicProfileUrl}
            className="inline-flex h-11 items-center justify-center rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-[#111827]"
          >
            View public profile
          </Link>
        ) : null}
      </div>

      {query.message ? (
        <Message tone={query.tone ?? "success"} message={query.message} />
      ) : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div className="space-y-8">
          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
            <h2 className="font-serif text-3xl text-[#111827]">App details</h2>
            {editable ? (
              <form action={updateCustomerSubmissionAction} className="mt-6 grid gap-5">
                <input type="hidden" name="id" value={submission.id} />
                <Field label="App name" name="app_name" defaultValue={submission.app_name} />
                <Field label="App URL" name="app_url" defaultValue={submission.app_url} />
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#111827]" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={submission.category}
                    className="h-12 w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <Textarea label="Short description" name="short_description" defaultValue={submission.short_description} rows={3} />
                <Textarea label="Target customer" name="target_customer" defaultValue={submission.target_customer} rows={3} />
                <Textarea label="Problem solved" name="problem_solved" defaultValue={submission.problem_solved} rows={3} />
                <Textarea label="App functionality" name="app_functionality" defaultValue={submission.app_functionality} rows={4} />
                <Textarea label="Founder note" name="founder_note" defaultValue={submission.founder_note ?? ""} rows={4} />
                <Textarea label="Review attention notes" name="review_attention_notes" defaultValue={submission.review_attention_notes ?? ""} rows={4} />
                <button className="h-11 rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-[#111827]">
                  Save updates
                </button>
              </form>
            ) : (
              <div className="mt-5 grid gap-3 text-sm leading-7 text-[#6B7280]">
                <p>{submission.short_description}</p>
                <p><strong className="text-[#111827]">Target customer:</strong> {submission.target_customer}</p>
                <p><strong className="text-[#111827]">Problem solved:</strong> {submission.problem_solved}</p>
                <p><strong className="text-[#111827]">What it does:</strong> {submission.app_functionality}</p>
              </div>
            )}
          </section>

          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
            <h2 className="font-serif text-3xl text-[#111827]">Assets</h2>
            <p className="mt-3 text-sm leading-7 text-[#6B7280]">
              Upload listing assets for your profile. Images stay private until
              an approved profile is published.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <AssetPanel
                title="Logo"
                assetType="logo"
                submissionId={submission.id}
                imageUrl={logoUrl}
                editable={editable}
              />
              <AssetPanel
                title="Screenshot"
                assetType="screenshot"
                submissionId={submission.id}
                imageUrl={screenshotUrl}
                editable={editable}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
            <h2 className="font-serif text-3xl text-[#111827]">Status summary</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <Row label="Payment status" value={submission.payment_status} />
              <Row label="Review status" value={submission.review_status} />
              <Row label="Submitted" value={formatDate(submission.created_at)} />
              <Row label="Next step" value={customerNextStep(submission)} />
            </div>
            {submission.review_status === "needs_changes" && submission.change_request_message ? (
              <div className="mt-5 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#7A461B]">
                {submission.change_request_message}
              </div>
            ) : null}
            {submission.review_status === "rejected_refunded" ? (
              <div className="mt-5 rounded-[8px] border border-red-900/30 bg-red-900/10 p-4 text-sm leading-6 text-red-900">
                {submission.rejection_reason ?? "This submission was not approved for publication."}
                {submission.refund_status ? ` Refund status: ${submission.refund_status}.` : ""}
              </div>
            ) : null}
          </section>

          {approved ? (
            <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
              <h2 className="font-serif text-3xl text-[#111827]">Review outcome</h2>
              <p className="mt-4 font-serif text-xl leading-8 text-[#111827]">
                &quot;{submission.public_review_quote ?? "Reviewed by Review Signal."}&quot;
              </p>
              <div className="mt-5 grid gap-2 text-sm text-[#6B7280]">
                <p>Review ID: {submission.review_id ?? "Pending"}</p>
                <p>Reviewed: {getReviewedDate(submission)}</p>
              </div>
              {publicProfileUrl && badgeAvailable ? (
                <div className="mt-6 space-y-5">
                  <div className="dark-showcase rounded-[12px] border border-[#B8944E]/30 p-3">
                    <TrustBadge href={publicProfileUrl} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label htmlFor="badge-embed" className="text-sm font-semibold text-[#111827]">
                        Badge embed code
                      </label>
                      <CopyButton value={badgeEmbed} />
                    </div>
                    <textarea
                      id="badge-embed"
                      readOnly
                      value={badgeEmbed}
                      className="h-32 w-full rounded-[6px] border border-[#E7E0D2] bg-[#F7F3EA] p-3 text-xs text-[#111827]"
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[#111827]">Plain link</p>
                      <CopyButton value={`Reviewed by Review Signal: ${publicProfileUrl}`} />
                    </div>
                    <p className="break-all rounded-[6px] border border-[#E7E0D2] bg-[#F7F3EA] p-3 text-xs text-[#6B7280]">
                      Reviewed by Review Signal: {publicProfileUrl}
                    </p>
                  </div>
                </div>
              ) : publicProfileUrl ? (
                <div className="mt-6 rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-4 text-sm leading-6 text-[#6B7280]">
                  Your public profile is live. Badge embed access is included
                  with the Founder Review package.
                </div>
              ) : null}
            </section>
          ) : (
            <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
              <h2 className="font-serif text-3xl text-[#111827]">Review outcome</h2>
              <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                Your public profile, review quote and badge will appear here if
                your submission is approved.
              </p>
            </section>
          )}

          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-5 text-sm leading-7 text-[#6B7280]">
            Review Signal does not guarantee rankings, indexing, traffic
            or sales.
          </section>
        </aside>
      </div>
    </AccountShell>
  );
}

function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#111827]">{label}</label>
      <input id={name} name={name} defaultValue={defaultValue} className="h-12 w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20" />
    </div>
  );
}

function Textarea({ label, name, defaultValue, rows }: { label: string; name: string; defaultValue: string; rows: number }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#111827]">{label}</label>
      <textarea id={name} name={name} defaultValue={defaultValue} rows={rows} className="w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 py-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20" />
    </div>
  );
}

function AssetPanel({ title, assetType, submissionId, imageUrl, editable }: { title: string; assetType: string; submissionId: string; imageUrl: string | null; editable: boolean }) {
  return (
    <div className="rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-4">
      <h3 className="text-sm font-semibold text-[#111827]">{title}</h3>
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={`${title} preview`} className="mt-4 aspect-video w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] object-contain" />
      ) : (
        <div className="mt-4 flex aspect-video items-center justify-center rounded-[6px] border border-dashed border-[#B8944E]/40 bg-[#FFFDF7] text-sm text-[#6B7280]">
          No {title.toLowerCase()} uploaded
        </div>
      )}
      {editable ? (
        <form action={uploadSubmissionAssetAction} className="mt-4 space-y-3">
          <input type="hidden" name="id" value={submissionId} />
          <input type="hidden" name="asset_type" value={assetType} />
          <input name="asset" type="file" accept="image/jpeg,image/png,image/webp" className="block w-full text-sm text-[#6B7280] file:mr-3 file:rounded-[6px] file:border-0 file:bg-[#0B1220] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#FFFDF7]" />
          <button className="h-10 rounded-[6px] border border-[#0B1220]/20 px-3 text-xs font-semibold text-[#0B1220] hover:bg-[#0B1220]/5">
            Upload {title}
          </button>
        </form>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#E7E0D2] pb-3 last:border-0">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B8944E]">{label}</p>
      <p className="mt-1 text-[#6B7280]">{value.replaceAll("_", " ")}</p>
    </div>
  );
}

function Message({ tone, message }: { tone: "success" | "warning" | "danger"; message: string }) {
  const classes = {
    success: "border-[#4F7F63]/30 bg-[#4F7F63]/10 text-[#2F5B42]",
    warning: "border-[#A66A2C]/30 bg-[#A66A2C]/10 text-[#7A461B]",
    danger: "border-red-900/30 bg-red-900/10 text-red-900",
  };
  return <div className={`mt-6 rounded-[8px] border p-4 text-sm ${classes[tone]}`}>{message}</div>;
}
