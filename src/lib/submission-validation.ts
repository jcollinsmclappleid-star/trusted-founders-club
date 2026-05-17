import { categoryOptions } from "@/lib/site";
import { getPackageByKey, type PackageKey } from "@/lib/packages";

export type SubmissionInput = {
  packageKey: string;
  founderName: string;
  founderEmail: string;
  founderWebsite?: string;
  socialProfile?: string;
  appName: string;
  appUrl: string;
  category: string;
  shortDescription: string;
  targetCustomer: string;
  problemSolved: string;
  appFunctionality: string;
  founderReason?: string;
  reviewAttention?: string;
  isLive?: "yes" | "no";
  loginRequired?: "yes" | "no";
  demoLogin?: string;
  logoUrl?: string;
  screenshotUrl?: string;
  accurateInfo: boolean;
  publicListingConsent: boolean;
  understandsAcceptance: boolean;
  understandsNoSeoGuarantees: boolean;
  acceptsTerms: boolean;
};

type ValidationResult =
  | {
      ok: true;
      data: NormalizedSubmission;
    }
  | {
      ok: false;
      errors: Record<string, string>;
    };

export type NormalizedSubmission = {
  packageKey: PackageKey;
  packagePrice: number;
  founderName: string;
  founderEmail: string;
  founderWebsite: string | null;
  socialProfile: string | null;
  appName: string;
  appUrl: string;
  category: string;
  shortDescription: string;
  targetCustomer: string;
  problemSolved: string;
  appFunctionality: string;
  founderReason: string | null;
  reviewAttention: string | null;
  isLive: boolean | null;
  loginRequired: boolean | null;
  demoLogin: string | null;
  logoUrl: string | null;
  screenshotUrl: string | null;
  accurateInfo: true;
  publicListingConsent: true;
  understandsAcceptance: true;
  understandsNoSeoGuarantees: true;
  acceptsTerms: true;
};

const requiredTextFields: Array<keyof SubmissionInput> = [
  "founderName",
  "founderEmail",
  "appName",
  "appUrl",
  "category",
  "shortDescription",
  "targetCustomer",
  "problemSolved",
  "appFunctionality",
];

const requiredConsents: Array<keyof SubmissionInput> = [
  "accurateInfo",
  "publicListingConsent",
  "understandsAcceptance",
  "understandsNoSeoGuarantees",
  "acceptsTerms",
];

const textLabels: Partial<Record<keyof SubmissionInput, string>> = {
  founderName: "Applicant name",
  founderEmail: "Applicant email",
  appName: "App name",
  appUrl: "App URL",
  category: "Category",
  shortDescription: "Short description",
  targetCustomer: "Target customer",
  problemSolved: "Problem solved",
  appFunctionality: "What does the app do?",
};

export function validateSubmissionInput(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: { form: "Invalid submission payload." } };
  }

  const value = input as Partial<SubmissionInput>;
  const errors: Record<string, string> = {};
  const selectedPackage = getPackageByKey(String(value.packageKey ?? ""));

  if (!selectedPackage) {
    errors.packageKey = "Choose a valid package.";
  }

  requiredTextFields.forEach((field) => {
    if (!asString(value[field]).trim()) {
      errors[field] = `${textLabels[field] ?? "This field"} is required.`;
    }
  });

  const founderEmail = asString(value.founderEmail).trim();
  if (founderEmail && !isValidEmail(founderEmail)) {
    errors.founderEmail = "Enter a valid email address.";
  }

  const appUrl = asString(value.appUrl).trim();
  if (appUrl && !isValidHttpUrl(appUrl)) {
    errors.appUrl = "Enter a valid app URL starting with http or https.";
  }

  const category = asString(value.category).trim();
  if (category && !categoryOptions.includes(category)) {
    errors.category = "Choose a valid category.";
  }

  (
    [
      ["founderWebsite", value.founderWebsite],
      ["socialProfile", value.socialProfile],
      ["logoUrl", value.logoUrl],
      ["screenshotUrl", value.screenshotUrl],
    ] as const
  ).forEach(([field, fieldValue]) => {
    const normalized = asString(fieldValue).trim();
    if (normalized && !isValidHttpUrl(normalized)) {
      errors[field] =
        "Enter a valid URL starting with http or https, or leave this blank.";
    }
  });

  requiredConsents.forEach((field) => {
    if (value[field] !== true) {
      errors[field] = "Required before continuing.";
    }
  });

  if (!selectedPackage || Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      packageKey: selectedPackage.key,
      packagePrice: selectedPackage.price,
      founderName: normalizeRequired(value.founderName),
      founderEmail,
      founderWebsite: normalizeOptional(value.founderWebsite),
      socialProfile: normalizeOptional(value.socialProfile),
      appName: normalizeRequired(value.appName),
      appUrl,
      category,
      shortDescription: normalizeRequired(value.shortDescription),
      targetCustomer: normalizeRequired(value.targetCustomer),
      problemSolved: normalizeRequired(value.problemSolved),
      appFunctionality: normalizeRequired(value.appFunctionality),
      founderReason: normalizeOptional(value.founderReason),
      reviewAttention: normalizeOptional(value.reviewAttention),
      isLive: yesNoToBoolean(value.isLive),
      loginRequired: yesNoToBoolean(value.loginRequired),
      demoLogin: normalizeOptional(value.demoLogin),
      logoUrl: normalizeOptional(value.logoUrl),
      screenshotUrl: normalizeOptional(value.screenshotUrl),
      accurateInfo: true,
      publicListingConsent: true,
      understandsAcceptance: true,
      understandsNoSeoGuarantees: true,
      acceptsTerms: true,
    },
  };
}

export function generateSubmissionSlug(appName: string) {
  const base =
    appName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "app";
  const suffix = crypto.randomUUID().slice(0, 8);

  return `${base}-${suffix}`;
}

export function toSubmissionInsert(data: NormalizedSubmission) {
  const now = new Date().toISOString();

  return {
    app_name: data.appName,
    slug: generateSubmissionSlug(data.appName),
    founder_name: data.founderName,
    founder_email: data.founderEmail,
    founder_website: data.founderWebsite,
    founder_social_url: data.socialProfile,
    app_url: data.appUrl,
    category: data.category,
    short_description: data.shortDescription,
    target_customer: data.targetCustomer,
    problem_solved: data.problemSolved,
    app_functionality: data.appFunctionality,
    founder_note: data.founderReason,
    review_attention_notes: data.reviewAttention,
    is_live: data.isLive,
    login_required: data.loginRequired,
    demo_login_details: data.demoLogin,
    logo_url: data.logoUrl,
    screenshot_url: data.screenshotUrl,
    package: data.packageKey,
    package_price: data.packagePrice,
    payment_status: "pending",
    review_status: "draft",
    public_review_quote: null,
    private_notes: null,
    badge_type: null,
    is_public: false,
    is_indexable: false,
    terms_accepted_at: now,
    public_listing_consent_at: now,
    refund_status: null,
    external_link_rel: "sponsored nofollow noopener",
    logo_alt: data.logoUrl ? `${data.appName} logo` : null,
    screenshot_alt: data.screenshotUrl ? `${data.appName} screenshot` : null,
  };
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeRequired(value: unknown) {
  return asString(value).trim();
}

function normalizeOptional(value: unknown) {
  const normalized = asString(value).trim();
  return normalized || null;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function yesNoToBoolean(value: unknown) {
  if (value === "yes") return true;
  if (value === "no") return false;
  return null;
}
