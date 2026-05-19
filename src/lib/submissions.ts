import { absoluteUrl, ownedListingWebsiteRel, paidListingWebsiteRel } from "@/lib/site";
import { editorialListings } from "@/lib/editorial-real-listings";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export type PaymentStatus =
  | "pending"
  | "checkout_created"
  | "paid"
  | "failed"
  | "refunded";

export type ReviewStatus =
  | "draft"
  | "paid_pending_review"
  | "needs_changes"
  | "approved_public"
  | "approved_noindex"
  | "approved_indexable"
  | "rejected_refunded"
  | "review_added";

export type AppSubmission = {
  id: string;
  app_name: string;
  slug: string | null;
  founder_name: string;
  founder_email: string;
  founder_website: string | null;
  founder_social_url: string | null;
  app_url: string;
  category: string;
  short_description: string;
  target_customer: string;
  problem_solved: string;
  app_functionality: string;
  founder_note: string | null;
  review_attention_notes: string | null;
  is_live: boolean | null;
  login_required: boolean | null;
  demo_login_details: string | null;
  logo_url: string | null;
  screenshot_url: string | null;
  logo_storage_path: string | null;
  screenshot_storage_path: string | null;
  additional_screenshot_paths: string[] | null;
  asset_upload_status: string | null;
  customer_updated_at: string | null;
  package: string;
  package_price: number;
  payment_status: PaymentStatus;
  review_status: ReviewStatus;
  public_review_quote: string | null;
  private_notes: string | null;
  badge_type: string | null;
  is_public: boolean;
  is_indexable: boolean;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  terms_accepted_at: string | null;
  public_listing_consent_at: string | null;
  review_id: string | null;
  indexing_approved_at: string | null;
  indexing_approved_by: string | null;
  change_request_message: string | null;
  rejection_reason: string | null;
  refund_status: string | null;
  external_link_rel: string | null;
  logo_alt: string | null;
  screenshot_alt: string | null;
  created_at: string | null;
  updated_at: string | null;
  reviewed_at: string | null;
  published_at: string | null;
  last_email_type: string | null;
  last_email_sent_at: string | null;
  last_email_error: string | null;
  approval_email_sent_at: string | null;
  needs_changes_email_sent_at: string | null;
  rejection_email_sent_at: string | null;
  payment_received_email_sent_at: string | null;
  admin_notification_sent_at: string | null;
  refund_email_sent_at: string | null;
};

export type DirectoryApp = {
  initials: string;
  name: string;
  category: string;
  description: string;
  quote: string;
  featuredSummary?: string;
  audience?: string;
  whyListed?: string;
  badgeMeaning?: string;
  website: string;
  websiteRel?: string;
  logoSrc?: string;
  screenshotSrc?: string;
  profileHref: string;
  reviewedDate?: string;
  statusLabel?: string;
  sample?: boolean;
  directoryGroup?: string;
  reviewDeskNote?: string;
  checkedFor?: string[];
  complianceNote?: string;
};

export type AdminFilter =
  | "paid_pending_review"
  | "needs_changes"
  | "approved"
  | "rejected"
  | "all";

const submissionSelect = `
  id,
  app_name,
  slug,
  founder_name,
  founder_email,
  founder_website,
  founder_social_url,
  app_url,
  category,
  short_description,
  target_customer,
  problem_solved,
  app_functionality,
  founder_note,
  review_attention_notes,
  is_live,
  login_required,
  demo_login_details,
  logo_url,
  screenshot_url,
  logo_storage_path,
  screenshot_storage_path,
  additional_screenshot_paths,
  asset_upload_status,
  customer_updated_at,
  package,
  package_price,
  payment_status,
  review_status,
  public_review_quote,
  private_notes,
  badge_type,
  is_public,
  is_indexable,
  stripe_checkout_session_id,
  stripe_payment_intent_id,
  terms_accepted_at,
  public_listing_consent_at,
  review_id,
  indexing_approved_at,
  indexing_approved_by,
  change_request_message,
  rejection_reason,
  refund_status,
  external_link_rel,
  logo_alt,
  screenshot_alt,
  created_at,
  updated_at,
  reviewed_at,
  published_at,
  last_email_type,
  last_email_sent_at,
  last_email_error,
  approval_email_sent_at,
  needs_changes_email_sent_at,
  rejection_email_sent_at,
  payment_received_email_sent_at,
  admin_notification_sent_at,
  refund_email_sent_at
`;

export function formatPounds(pence: number | null | undefined) {
  if (!pence) return "\u00a30";
  return `\u00a3${Math.round(pence / 100)}`;
}

export function formatDate(value?: string | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function getReviewId(submission: AppSubmission) {
  return submission.review_id ?? `TFC-${submission.id.slice(0, 8).toUpperCase()}`;
}

export function getReviewedDate(submission: AppSubmission) {
  return formatDate(submission.reviewed_at ?? submission.published_at);
}

export function toDirectoryApp(submission: AppSubmission): DirectoryApp {
  return {
    initials: getInitials(submission.app_name),
    name: submission.app_name,
    category: submission.category,
    description: submission.short_description,
    quote:
      submission.public_review_quote ??
      "Listed after a manual suitability review by Review Signal.",
    website: submission.app_url,
    websiteRel: submission.external_link_rel ?? paidListingWebsiteRel,
    profileHref: `/apps/${submission.slug}`,
    reviewedDate: getReviewedDate(submission),
    statusLabel: "Review Published",
  };
}

/** Default desk checks shown on dynamic profiles when no custom list is stored. */
export const defaultDeskCheckedItems = [
  "Product clarity and positioning",
  "Live accessibility at review time",
  "Framing vs implied guarantees or outcomes",
  "Suitability for public directory listing",
];

export function submissionReviewSummary(submission: AppSubmission) {
  const quote = submission.public_review_quote?.trim();
  if (quote && quote.length > 24) {
    return quote;
  }
  return submission.short_description;
}

export function submissionHelpsWithBullets(submission: AppSubmission) {
  return [
    submission.target_customer,
    submission.problem_solved,
    submission.app_functionality,
  ]
    .map((line) => line?.trim())
    .filter((line): line is string => Boolean(line));
}

export function submissionEditorialComplianceNote() {
  return "This profile describes editorial listing review only. It is not a ranking guarantee, test-score promise, admission outcome, legal advice or certification of security or regulatory compliance. Website experiences may change after publication.";
}

export function sampleDirectoryApps(): DirectoryApp[] {
  return editorialListings.map((listing) => ({
    initials: listing.initials,
    name: listing.name,
    category: listing.category,
    description: listing.description,
    quote: listing.quote,
    featuredSummary: listing.featuredSummary,
    audience: listing.audience,
    whyListed: listing.whyListed,
    badgeMeaning: listing.badgeMeaning,
    website: listing.website,
    websiteRel: listing.websiteRel ?? ownedListingWebsiteRel,
    logoSrc: listing.logoSrc,
    screenshotSrc: listing.screenshotSrc,
    profileHref: listing.profileHref,
    directoryGroup: listing.directoryGroup,
    reviewDeskNote: listing.reviewDeskNote,
    checkedFor: listing.checkedFor,
    complianceNote: listing.complianceNote,
    statusLabel: "Review Published",
  }));
}

export async function getPublicDirectoryApps() {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    return { apps: [], error };
  }

  const { data, error: queryError } = await supabase
    .from("app_submissions")
    .select(submissionSelect)
    .eq("is_public", true)
    .eq("payment_status", "paid")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (queryError) {
    return { apps: [], error: queryError.message };
  }

  const submissions = (data ?? []) as AppSubmission[];
  return {
    apps: submissions
      .filter((submission) => submission.slug)
      .map((submission) => toDirectoryApp(submission)),
    error: null,
  };
}

export async function getPublicSubmissionBySlug(slug: string) {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    return { submission: null, error };
  }

  const { data, error: queryError } = await supabase
    .from("app_submissions")
    .select(submissionSelect)
    .eq("slug", slug)
    .eq("is_public", true)
    .eq("payment_status", "paid")
    .maybeSingle();

  if (queryError) {
    return { submission: null, error: queryError.message };
  }

  return { submission: data as AppSubmission | null, error: null };
}

export async function getIndexablePublicProfiles() {
  const { client: supabase } = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase
    .from("app_submissions")
    .select("slug, updated_at, published_at")
    .eq("is_public", true)
    .eq("is_indexable", true)
    .eq("payment_status", "paid")
    .not("slug", "is", null);

  return (data ?? []) as Array<{
    slug: string;
    updated_at: string | null;
    published_at: string | null;
  }>;
}

export async function getAdminOverview() {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    return { counts: null, error };
  }

  const [pending, approved, changes, rejected] = await Promise.all([
    supabase
      .from("app_submissions")
      .select("id", { count: "exact", head: true })
      .eq("review_status", "paid_pending_review"),
    supabase
      .from("app_submissions")
      .select("id", { count: "exact", head: true })
      .eq("is_public", true)
      .eq("payment_status", "paid"),
    supabase
      .from("app_submissions")
      .select("id", { count: "exact", head: true })
      .eq("review_status", "needs_changes"),
    supabase
      .from("app_submissions")
      .select("id", { count: "exact", head: true })
      .or("review_status.eq.rejected_refunded,payment_status.eq.refunded"),
  ]);

  return {
    counts: {
      pending: pending.count ?? 0,
      approved: approved.count ?? 0,
      needsChanges: changes.count ?? 0,
      rejected: rejected.count ?? 0,
    },
    error:
      pending.error?.message ??
      approved.error?.message ??
      changes.error?.message ??
      rejected.error?.message ??
      null,
  };
}

export async function getAdminSubmissions(filter: AdminFilter) {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    return { submissions: [], error };
  }

  let query = supabase
    .from("app_submissions")
    .select(submissionSelect)
    .order("created_at", { ascending: false });

  if (filter === "paid_pending_review") {
    query = query.eq("review_status", "paid_pending_review");
  } else if (filter === "needs_changes") {
    query = query.eq("review_status", "needs_changes");
  } else if (filter === "approved") {
    query = query.in("review_status", [
      "approved_public",
      "approved_noindex",
      "approved_indexable",
      "review_added",
    ]);
  } else if (filter === "rejected") {
    query = query.or("review_status.eq.rejected_refunded,payment_status.eq.refunded");
  }

  const { data, error: queryError } = await query;
  if (queryError) {
    return { submissions: [], error: queryError.message };
  }

  return {
    submissions: (data ?? []) as AppSubmission[],
    error: null,
  };
}

export async function getAdminSubmissionById(id: string) {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    return { submission: null, error };
  }

  const { data, error: queryError } = await supabase
    .from("app_submissions")
    .select(submissionSelect)
    .eq("id", id)
    .maybeSingle();

  if (queryError) {
    return { submission: null, error: queryError.message };
  }

  return { submission: data as AppSubmission | null, error: null };
}

export async function getAdminSubmissionByCheckoutSessionId(
  checkoutSessionId: string,
) {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    return { submission: null, error };
  }

  const { data, error: queryError } = await supabase
    .from("app_submissions")
    .select(submissionSelect)
    .eq("stripe_checkout_session_id", checkoutSessionId)
    .maybeSingle();

  if (queryError) {
    return { submission: null, error: queryError.message };
  }

  return { submission: data as AppSubmission | null, error: null };
}

export async function getAdminSubmissionByPaymentIntentId(
  paymentIntentId: string,
) {
  const { client: supabase, error } = getSupabaseAdmin();
  if (!supabase) {
    return { submission: null, error };
  }

  const { data, error: queryError } = await supabase
    .from("app_submissions")
    .select(submissionSelect)
    .eq("stripe_payment_intent_id", paymentIntentId)
    .maybeSingle();

  if (queryError) {
    return { submission: null, error: queryError.message };
  }

  return { submission: data as AppSubmission | null, error: null };
}

export function profileUrl(slug: string) {
  return absoluteUrl(`/apps/${slug}`);
}

export async function createSignedAssetUrl(path?: string | null) {
  if (!path) return null;

  const { client: supabase } = getSupabaseAdmin();
  if (!supabase) return null;

  const { data } = await supabase.storage
    .from("listing-assets")
    .createSignedUrl(path, 60 * 60);

  return data?.signedUrl ?? null;
}
