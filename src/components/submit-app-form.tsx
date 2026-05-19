"use client";

import type { FormEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  FileUp,
  Image,
  Send,
  ShieldCheck,
} from "lucide-react";
import { ProcessFlow, type ProcessStep } from "@/components/process-flow";
import { categoryOptions, pricingPlans } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormValues = {
  packageName: string;
  founderName: string;
  founderEmail: string;
  founderWebsite: string;
  socialProfile: string;
  appName: string;
  appUrl: string;
  category: string;
  shortDescription: string;
  targetCustomer: string;
  problemSolved: string;
  appFunctionality: string;
  founderReason: string;
  reviewAttention: string;
  isLive: "yes" | "no";
  loginRequired: "yes" | "no";
  demoLogin: string;
  logoUrl: string;
  screenshotUrl: string;
  accurateInfo: boolean;
  publicListingConsent: boolean;
  understandsAcceptance: boolean;
  understandsNoSeoGuarantees: boolean;
  acceptsTerms: boolean;
};

type ErrorMap = Partial<Record<keyof FormValues, string>>;
type AssetErrorMap = ErrorMap & Partial<Record<"logoFile" | "screenshotFile", string>>;
type ConsentField =
  | "accurateInfo"
  | "publicListingConsent"
  | "understandsAcceptance"
  | "understandsNoSeoGuarantees"
  | "acceptsTerms";

const defaultValues: FormValues = {
  packageName: "Enhanced Review Profile",
  founderName: "",
  founderEmail: "",
  founderWebsite: "",
  socialProfile: "",
  appName: "",
  appUrl: "",
  category: "",
  shortDescription: "",
  targetCustomer: "",
  problemSolved: "",
  appFunctionality: "",
  founderReason: "",
  reviewAttention: "",
  isLive: "yes",
  loginRequired: "no",
  demoLogin: "",
  logoUrl: "",
  screenshotUrl: "",
  accurateInfo: false,
  publicListingConsent: false,
  understandsAcceptance: false,
  understandsNoSeoGuarantees: false,
  acceptsTerms: false,
};

const requiredTextFields: Array<keyof FormValues> = [
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

const requiredConsents: Array<{ name: ConsentField; label: string }> = [
  {
    name: "accurateInfo",
    label: "I confirm the information provided is accurate.",
  },
  {
    name: "publicListingConsent",
    label: "I consent to my app being publicly listed if approved.",
  },
  {
    name: "understandsAcceptance",
    label:
      "I understand that payment covers the review process and profile creation, not a guaranteed positive review or endorsement.",
  },
  {
    name: "understandsNoSeoGuarantees",
    label:
      "I understand Review Signal does not guarantee SEO rankings, indexing, traffic or sales.",
  },
  {
    name: "acceptsTerms",
    label: "I accept the terms.",
  },
];

const sidebarSteps: ProcessStep[] = [
  {
    title: "Choose your output",
    copy: "Select Starter or Enhanced on the form.",
  },
  {
    title: "Submit details",
    copy: "Share product context, URLs, and what you want reviewed.",
  },
  {
    title: "Desk review",
    copy: "We review manually after payment—usually within 24 hours when accepted.",
    focus: "Publication follows review standards, not payment alone.",
  },
];

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

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function fieldLabel(field: keyof FormValues) {
  const labels: Partial<Record<keyof FormValues, string>> = {
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

  return labels[field] ?? "This field";
}

export function SubmitAppForm() {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<AssetErrorMap>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPlan = useMemo(
    () =>
      pricingPlans.find((plan) => plan.name === values.packageName) ??
      pricingPlans[1],
    [values.packageName],
  );

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setCheckoutError("");
  }

  function updateAsset(field: "logoFile" | "screenshotFile", file: File | null) {
    if (field === "logoFile") {
      setLogoFile(file);
    } else {
      setScreenshotFile(file);
    }
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setCheckoutError("");
  }

  function validate() {
    const nextErrors: AssetErrorMap = {};

    if (!values.packageName) {
      nextErrors.packageName = "Choose a package.";
    }

    requiredTextFields.forEach((field) => {
      if (typeof values[field] === "string" && !values[field].trim()) {
        nextErrors[field] = `${fieldLabel(field)} is required.`;
      }
    });

    if (values.founderEmail && !isValidEmail(values.founderEmail)) {
      nextErrors.founderEmail = "Enter a valid email address.";
    }

    if (values.appUrl && !isValidHttpUrl(values.appUrl)) {
      nextErrors.appUrl = "Enter a valid app URL starting with http or https.";
    }

    (["founderWebsite", "socialProfile", "logoUrl", "screenshotUrl"] as const).forEach(
      (field) => {
        if (values[field] && !isValidHttpUrl(values[field])) {
          nextErrors[field] =
            "Enter a valid URL starting with http or https, or leave this blank.";
        }
      },
    );

    (
      [
        ["logoFile", logoFile],
        ["screenshotFile", screenshotFile],
      ] as const
    ).forEach(([field, file]) => {
      if (!file) return;

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        nextErrors[field] = "Upload a JPG, PNG or WebP image.";
      } else if (file.size > 5 * 1024 * 1024) {
        nextErrors[field] = "Upload an image smaller than 5MB.";
      }
    });

    requiredConsents.forEach(({ name }) => {
      if (!values[name]) {
        nextErrors[name] = "Required before continuing.";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || !validate()) {
      return;
    }

    setIsSubmitting(true);
    setCheckoutError("");

    try {
      const formData = new FormData();
      Object.entries({
        ...values,
        packageKey: selectedPlan.key,
      }).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (logoFile) {
        formData.append("logoFile", logoFile);
      }

      if (screenshotFile) {
        formData.append("screenshotFile", screenshotFile);
      }

      const response = await fetch("/api/submissions/checkout", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
        fields?: AssetErrorMap;
      };

      if (!response.ok) {
        if (result.fields) {
          setErrors(result.fields);
        }
        setCheckoutError(
          result.error ??
            "Checkout could not be created. Please review the form and try again.",
        );
        return;
      }

      if (!result.checkoutUrl) {
        setCheckoutError("Checkout could not be created. Please try again.");
        return;
      }

      window.location.assign(result.checkoutUrl);
    } catch {
      setCheckoutError(
        "Checkout could not be created. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <form noValidate onSubmit={handleSubmit} className="space-y-9">
        <section
          aria-labelledby="package-heading"
          className="panel-elevated p-5 md:p-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
                Review output
              </p>
              <h2 id="package-heading" className="mt-2 font-serif text-3xl text-[#111827]">
                Choose the record you want considered.
              </h2>
              <p className="mt-2 text-sm text-[#6B7280]">
                Publication is not automatic. The selected output defines what
                can be issued if the submission is accepted for publication.
              </p>
            </div>
            {errors.packageName ? <FieldError message={errors.packageName} /> : null}
          </div>

          <fieldset className="mt-6 grid gap-4 lg:grid-cols-2">
            <legend className="sr-only">Choose your package</legend>
            {pricingPlans.map((plan) => {
              const selected = values.packageName === plan.name;
              return (
                <label
                  key={plan.name}
                  className={cn(
                    "relative flex cursor-pointer flex-col rounded-[10px] border bg-[#FFFDF7] p-5 transition focus-within:ring-2 focus-within:ring-[#B8944E] focus-within:ring-offset-2 focus-within:ring-offset-[#FFFDF7]",
                    selected
                      ? "border-[#B8944E] shadow-[0_18px_50px_rgba(184,148,78,0.14)] ring-1 ring-[#B8944E]/35"
                      : "border-[#E7E0D2] hover:border-[#B8944E]/50",
                  )}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="packageName"
                    value={plan.name}
                    checked={selected}
                    onChange={() => updateField("packageName", plan.name)}
                  />
                  {plan.badge ? (
                    <span className="mb-4 w-fit rounded-[4px] bg-[#B8944E] px-2.5 py-1 text-xs font-semibold text-[#070A0F]">
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="mb-4 h-[26px]" />
                  )}
                  <span className="font-serif text-2xl text-[#111827]">
                    {plan.name}
                  </span>
                  <span className="mt-3 text-4xl font-semibold text-[#111827]">
                    {plan.price}
                  </span>
                  <span className="mt-3 text-sm leading-6 text-[#6B7280]">
                    {plan.description}
                  </span>
                  <span className="mt-5 grid gap-2 border-t border-[#E7E0D2] pt-5">
                    {plan.includes.map((item) => (
                      <span
                        key={item}
                        className="flex gap-2 text-xs leading-5 text-[#374151]"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[#B8944E]"
                          size={14}
                        />
                        {item}
                      </span>
                    ))}
                  </span>
                </label>
              );
            })}
          </fieldset>
        </section>

        <FormSection eyebrow="Applicant details" title="Tell us who is submitting.">
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              label="Applicant name"
              value={values.founderName}
              error={errors.founderName}
              required
              onChange={(value) => updateField("founderName", value)}
            />
            <TextField
              label="Applicant email"
              type="email"
              value={values.founderEmail}
              error={errors.founderEmail}
              required
              onChange={(value) => updateField("founderEmail", value)}
            />
            <TextField
              label="Company website"
              value={values.founderWebsite}
              error={errors.founderWebsite}
              helper="Optional"
              onChange={(value) => updateField("founderWebsite", value)}
            />
            <TextField
              label="LinkedIn or X profile"
              value={values.socialProfile}
              error={errors.socialProfile}
              helper="Optional"
              onChange={(value) => updateField("socialProfile", value)}
            />
          </div>
        </FormSection>

        <FormSection eyebrow="App details" title="Help us understand the product.">
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              label="App name"
              value={values.appName}
              error={errors.appName}
              required
              onChange={(value) => updateField("appName", value)}
            />
            <TextField
              label="App URL"
              value={values.appUrl}
              error={errors.appUrl}
              required
              onChange={(value) => updateField("appUrl", value)}
            />
            <SelectField
              label="Category"
              value={values.category}
              error={errors.category}
              required
              onChange={(value) => updateField("category", value)}
            />
            <TextField
              label="Target customer"
              value={values.targetCustomer}
              error={errors.targetCustomer}
              required
              onChange={(value) => updateField("targetCustomer", value)}
            />
            <TextareaField
              className="md:col-span-2"
              label="Short description"
              value={values.shortDescription}
              error={errors.shortDescription}
              required
              rows={3}
              onChange={(value) => updateField("shortDescription", value)}
            />
            <TextareaField
              label="Problem solved"
              value={values.problemSolved}
              error={errors.problemSolved}
              required
              onChange={(value) => updateField("problemSolved", value)}
            />
            <TextareaField
              label="What does the app do?"
              value={values.appFunctionality}
              error={errors.appFunctionality}
              required
              onChange={(value) => updateField("appFunctionality", value)}
            />
          </div>
        </FormSection>

        <FormSection eyebrow="Applicant context" title="Give the review useful context.">
          <div className="grid gap-5">
            <TextareaField
              label="Why did you build this?"
              value={values.founderReason}
              helper="Optional, but helpful for editorial context."
              onChange={(value) => updateField("founderReason", value)}
            />
            <TextareaField
              label="What should we pay attention to during review?"
              value={values.reviewAttention}
              helper="Optional"
              onChange={(value) => updateField("reviewAttention", value)}
            />
            <div className="grid gap-5 md:grid-cols-2">
              <RadioGroup
                label="Is the app live and usable?"
                value={values.isLive}
                onChange={(value) => updateField("isLive", value)}
              />
              <RadioGroup
                label="Is login required to review?"
                value={values.loginRequired}
                onChange={(value) => updateField("loginRequired", value)}
              />
            </div>
            <TextareaField
              label="Demo login details"
              value={values.demoLogin}
              helper="Optional. Do not include sensitive credentials you cannot rotate later."
              rows={3}
              onChange={(value) => updateField("demoLogin", value)}
            />
          </div>
        </FormSection>

        <FormSection eyebrow="Profile assets" title="Upload assets for the profile.">
          <p className="-mt-2 mb-5 text-sm leading-7 text-[#6B7280]">
            Add the image assets we can use on an approved public profile. JPG,
            PNG and WebP files up to 5MB are accepted. Public image links are
            still useful if your assets already live online.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <FileField
              label="Logo upload"
              file={logoFile}
              error={errors.logoFile}
              icon={Image}
              onChange={(file) => updateAsset("logoFile", file)}
            />
            <FileField
              label="Product screenshot upload"
              file={screenshotFile}
              error={errors.screenshotFile}
              icon={FileUp}
              onChange={(file) => updateAsset("screenshotFile", file)}
            />
            <TextField
              label="Logo URL"
              value={values.logoUrl}
              error={errors.logoUrl}
              helper="Optional"
              onChange={(value) => updateField("logoUrl", value)}
            />
            <TextField
              label="Screenshot URL"
              value={values.screenshotUrl}
              error={errors.screenshotUrl}
              helper="Optional"
              onChange={(value) => updateField("screenshotUrl", value)}
            />
          </div>
        </FormSection>

        <FormSection eyebrow="Consent" title="Confirm the review terms.">
          <div className="grid gap-3">
            {requiredConsents.map(({ name, label }) => (
              <label
                key={name}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-[8px] border bg-[#F7F3EA] p-4 text-sm leading-6 text-[#111827] transition focus-within:ring-2 focus-within:ring-[#B8944E]",
                  errors[name] ? "border-[#A66A2C]" : "border-[#E7E0D2]",
                )}
              >
                <input
                  type="checkbox"
                  checked={Boolean(values[name])}
                  onChange={(event) => updateField(name, event.target.checked)}
                  className="mt-1 size-4 accent-[#B8944E]"
                />
                <span>
                  {label}
                  {errors[name] ? <FieldError message={errors[name]} /> : null}
                </span>
              </label>
            ))}
          </div>
        </FormSection>

        <section className="rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
                Secure checkout handoff
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                We create a pending submission record first, then send you to
                Stripe Checkout. Payment status is only updated after Stripe
                confirms payment.
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:-translate-y-0.5 hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-[#B8944E] focus:ring-offset-2 focus:ring-offset-[#FFFDF7] md:w-auto"
            >
              {isSubmitting ? "Creating secure checkout..." : "Continue to Payment"}
              <CreditCard aria-hidden="true" size={16} strokeWidth={1.8} />
            </button>
          </div>

          {Object.keys(errors).length > 0 ? (
            <div
              role="alert"
              className="mt-5 rounded-[10px] border border-[#A66A2C]/35 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#5F3517]"
            >
              Please review the highlighted fields before continuing.
            </div>
          ) : null}

          {checkoutError ? (
            <div
              role="alert"
              className="mt-5 rounded-[10px] border border-[#A66A2C]/35 bg-[#A66A2C]/10 p-5"
            >
              <div className="flex gap-3">
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#A66A2C]"
                  size={20}
                />
                <div>
                  <h2 className="font-serif text-2xl text-[#111827]">Checkout issue</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5F3517]">
                    {checkoutError}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#111827]">
                    Selected package: {selectedPlan.name} - {selectedPlan.price}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </form>

      <aside className="lg:sticky lg:top-6">
        <div className="dark-showcase rounded-[var(--radius-panel)] border border-[#B8944E]/35 p-6 shadow-[0_28px_80px_rgba(7,10,15,0.16)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E6D3A3]">
            What happens next
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight">
            A simple path into manual review.
          </h2>
          <p className="text-on-dark-muted mt-4 text-sm leading-7">
            After payment, your app enters the manual review queue. Approved
            submissions are usually published within 24 hours with review profile and
            badge assets.
          </p>

          <div className="mt-6 [&_article]:border-white/10 [&_article]:bg-white/[0.04] [&_article]:text-[#FFFDF7]">
            <ProcessFlow steps={sidebarSteps} compact />
          </div>

          <div className="mt-6 rounded-[10px] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex gap-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#E6D3A3]"
                size={18}
              />
              <p className="text-on-dark-muted text-sm leading-6">
                We review every submission manually. Accepted products receive
                the public record and assets in their chosen plan.
              </p>
            </div>
          </div>

          <div className="text-on-dark-muted mt-6 grid gap-3 text-sm">
            <p className="flex gap-2">
              <Clock3 aria-hidden="true" className="shrink-0 text-[#B8944E]" size={17} />
              Manual review. Quality standards apply.
            </p>
            <p className="flex gap-2">
              <FileText aria-hidden="true" className="shrink-0 text-[#B8944E]" size={17} />
              Published within 24 hours if approved.
            </p>
            <p className="flex gap-2">
              <Send aria-hidden="true" className="shrink-0 text-[#B8944E]" size={17} />
              No ranking promises. Not every app is accepted.
            </p>
            <p className="flex gap-2">
              <FileText aria-hidden="true" className="shrink-0 text-[#B8944E]" size={17} />
              No SEO or ranking guarantees.
            </p>
            <p className="flex gap-2">
              <Send aria-hidden="true" className="shrink-0 text-[#B8944E]" size={17} />
              Stripe Checkout handles payment securely.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function FormSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] p-5 shadow-[0_24px_70px_rgba(17,24,39,0.05)] md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-3xl text-[#111827]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  helper,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helper?: string;
  required?: boolean;
  type?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} helper={helper} />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClassName(error)}
      />
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </div>
  );
}

function FileField({
  label,
  file,
  onChange,
  error,
  icon: Icon,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  icon: LucideIcon;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} helper="Optional" />
      <label
        htmlFor={id}
        className={cn(
          "flex min-h-28 cursor-pointer flex-col justify-between rounded-[8px] border bg-[#F7F3EA] p-4 transition focus-within:ring-2 focus-within:ring-[#B8944E]",
          error ? "border-[#A66A2C]" : "border-[#E7E0D2] hover:border-[#B8944E]/50",
        )}
      >
        <input
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
        <span className="flex items-center gap-3 text-sm font-semibold text-[#111827]">
          <span className="flex size-10 items-center justify-center rounded-[6px] border border-[#B8944E]/30 bg-[#FFFDF7] text-[#8A6B2E]">
            <Icon aria-hidden="true" size={18} />
          </span>
          Choose image
        </span>
        <span className="mt-4 block min-h-5 truncate text-xs font-medium text-[#6B7280]">
          {file ? `${file.name} (${formatFileSize(file.size)})` : "JPG, PNG or WebP up to 5MB"}
        </span>
      </label>
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  error,
  helper,
  required,
  rows = 4,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helper?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} label={label} required={required} helper={helper} />
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClassName(error), "min-h-28 resize-y py-3")}
      />
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} />
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClassName(error)}
      >
        <option value="">Select a category</option>
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </div>
  );
}

function RadioGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "yes" | "no";
  onChange: (value: "yes" | "no") => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-[#111827]">{label}</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {(["yes", "no"] as const).map((option) => (
          <label
            key={option}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-[6px] border px-4 py-3 text-sm font-semibold capitalize transition focus-within:ring-2 focus-within:ring-[#B8944E]",
              value === option
                ? "border-[#B8944E] bg-[#B8944E]/10 text-[#111827]"
                : "border-[#E7E0D2] bg-[#F7F3EA] text-[#6B7280]",
            )}
          >
            <input
              className="sr-only"
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
  helper,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  helper?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-[#111827]">
      {label}
      {required ? <span className="text-[#A66A2C]"> *</span> : null}
      {helper ? (
        <span className="ml-2 text-xs font-medium text-[#6B7280]">{helper}</span>
      ) : null}
    </label>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#A66A2C]">
      <AlertCircle aria-hidden="true" size={14} />
      {message}
    </p>
  );
}

function fieldClassName(error?: string) {
  return cn(
    "h-12 w-full rounded-[6px] border bg-[#FFFDF7] px-3 text-sm text-[#111827] outline-none transition placeholder:text-[#6B7280]/55 focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20",
    error ? "border-[#A66A2C]" : "border-[#E7E0D2]",
  );
}
