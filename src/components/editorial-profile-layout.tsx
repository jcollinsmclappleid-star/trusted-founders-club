import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { BadgeVerificationPanel } from "@/components/badge-verification-panel";
import { DisclaimerPanel } from "@/components/disclaimer-panel";
import { ReviewQuoteCard } from "@/components/review-quote-card";
import { TrustBadge } from "@/components/trust-badge";
import { paidListingWebsiteRel, siteConfig } from "@/lib/site";

export type EditorialProfileLayoutProps = {
  eyebrow?: string;
  profileNote: string;
  statusLabel?: string;
  name: string;
  category: string;
  initials: string;
  logoUrl?: string | null;
  logoAlt?: string;
  shortDescription: string;
  website: string;
  websiteRel?: string;
  quote: string;
  quoteMeta?: string;
  reviewId: string;
  reviewedDate: string;
  reviewSummary: string;
  helpsWithTitle?: string;
  helpsWithBullets: string[];
  checkedItems: string[];
  trustSignals: string[];
  complianceNote: string;
  aboutSection?: { title: string; body: string };
  founderNoteSection?: { title: string; body: string } | null;
  screenshotUrl?: string | null;
  screenshotAlt?: string;
  /** href for "click to verify" — usually `#badge-verification` on this page */
  badgeVerifyHref: string;
};

const TRUST_ICONS: LucideIcon[] = [
  SearchCheck,
  FileText,
  ShieldCheck,
  ShieldCheck,
];

export function EditorialProfileLayout({
  eyebrow = "Review profile",
  profileNote,
  statusLabel = "Review Published",
  name,
  category,
  initials,
  logoUrl,
  logoAlt,
  shortDescription,
  website,
  websiteRel = paidListingWebsiteRel,
  quote,
  quoteMeta = `Reviewed by ${siteConfig.name}`,
  reviewId,
  reviewedDate,
  reviewSummary,
  helpsWithTitle = "What the product helps with",
  helpsWithBullets,
  checkedItems,
  trustSignals,
  complianceNote,
  aboutSection,
  founderNoteSection,
  screenshotUrl,
  screenshotAlt,
  badgeVerifyHref,
}: EditorialProfileLayoutProps) {
  return (
    <section className="bg-[#F5F1E8] px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] shadow-[0_28px_90px_rgba(7,10,15,0.1)]">
          <header className="border-b border-white/10 bg-[#0B0F17] px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A943]">
                  {eyebrow}
                </p>
                <p className="mt-1 text-sm text-[#A8ADB7]">{profileNote}</p>
              </div>
              <span className="status-published rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1.5 text-xs font-semibold">
                {statusLabel}
              </span>
            </div>
          </header>

          <div className="grid gap-10 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <div className="flex items-start gap-4">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={logoAlt ?? `${name} logo`}
                    className="size-16 rounded-[8px] border border-[#B8944E]/35 bg-[#0B1220] object-contain"
                  />
                ) : (
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-[8px] border border-[#B8944E]/35 bg-[#0B1220] text-xl font-semibold text-[#E6D3A3]">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">
                    {category}
                  </p>
                  <h1 className="mt-1 font-serif text-4xl leading-tight text-[#111827] md:text-5xl">
                    {name}
                  </h1>
                </div>
              </div>

              <p className="mt-6 text-lg leading-8 text-[#4B5563]">
                {shortDescription}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={website}
                  target="_blank"
                  rel={websiteRel}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:-translate-y-0.5 hover:bg-[#111827]"
                >
                  Visit Website
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
                <span className="dark-showcase rounded-[12px] border border-[#B8944E]/30 p-2">
                  <TrustBadge compact href={badgeVerifyHref} />
                </span>
              </div>
            </div>

            <ReviewQuoteCard quote={quote} meta={quoteMeta} />
          </div>

          <div className="grid gap-0 border-t border-[#E7E0D2] md:grid-cols-3">
            {[
              ["Review ID", reviewId],
              ["Reviewed on", reviewedDate],
              ["Status", statusLabel],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-b border-[#E7E0D2] p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8944E]">
                  {label}
                </p>
                <p
                  className={`mt-2 font-medium text-[#111827] ${label === "Review ID" ? "font-mono-label" : ""}`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <section className="rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
              <h2 className="font-serif text-3xl text-[#111827]">
                Review summary
              </h2>
              <p className="mt-4 text-base leading-8 text-[#6B7280]">
                {reviewSummary}
              </p>
            </section>

            <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
              <h2 className="font-serif text-3xl text-[#111827]">
                {helpsWithTitle}
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[#6B7280]">
                {helpsWithBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
              <h2 className="font-serif text-3xl text-[#111827]">
                Reviewed signals
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {checkedItems.map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] px-3 py-2 text-sm font-medium text-[#111827]"
                  >
                    <CheckCircle2 size={16} className="text-[#B8944E]" />
                    {item}
                  </p>
                ))}
              </div>
            </section>

            {screenshotUrl ? (
              <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshotUrl}
                  alt={screenshotAlt ?? `${name} screenshot`}
                  className="w-full rounded-[6px] border border-[#E7E0D2] object-cover"
                />
              </section>
            ) : null}

            {aboutSection ? (
              <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
                <h2 className="font-serif text-3xl text-[#111827]">
                  {aboutSection.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[#6B7280]">
                  {aboutSection.body}
                </p>
              </section>
            ) : null}

            {founderNoteSection ? (
              <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
                <h2 className="font-serif text-3xl text-[#111827]">
                  {founderNoteSection.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[#6B7280]">
                  {founderNoteSection.body}
                </p>
              </section>
            ) : null}

            <section className="rounded-[8px] border border-[#A66A2C]/25 bg-[#FFFDF7] p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8944E]">
                Compliance note
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                {complianceNote}
              </p>
            </section>

            <div id="badge-verification">
              <BadgeVerificationPanel
                appName={name}
                reviewedDate={reviewedDate}
                reviewId={reviewId}
              />
            </div>

            <DisclaimerPanel>
              This review is not an endorsement, guarantee of performance,
              certification, legal advice or educational outcome. It describes
              manual listing review and suitability for this directory.
            </DisclaimerPanel>
          </div>

          <aside className="space-y-6 rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 lg:sticky lg:top-6 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8944E]">
              Useful trust signals
            </p>
            <div className="mt-5 grid gap-3">
              {trustSignals.map((signal, index) => {
                const Icon = TRUST_ICONS[index] ?? ShieldCheck;
                return (
                  <div
                    key={signal}
                    className="flex items-center gap-3 rounded-[6px] border border-[#E7E0D2] bg-[#F7F3EA] p-3 text-sm font-medium text-[#111827]"
                  >
                    <Icon
                      aria-hidden="true"
                      className="text-[#B8944E]"
                      size={17}
                      strokeWidth={1.8}
                    />
                    {signal}
                  </div>
                );
              })}
            </div>
            <div className="rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8944E]">
                What this profile documents
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#6B7280]">
                The profile records review metadata, the published quote where
                supplied, and a badge verification target. It does not certify
                security, compliance or future product behaviour.
              </p>
            </div>
            <p className="text-sm leading-7 text-[#6B7280]">
              Profile published {reviewedDate}. Website experiences may change
              after publication.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
