import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileText,
  SearchCheck,
  Share2,
} from "lucide-react";
import { AppDirectoryCard } from "@/components/app-directory-card";
import { BentoCell, BentoGrid } from "@/components/bento-grid";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { CredibilityProfileMockup } from "@/components/credibility-profile-mockup";
import { WhatIsIncludedSection } from "@/components/what-is-included-section";
import { FadeInSection } from "@/components/fade-in-section";
import { FeatureCard } from "@/components/feature-card";
import { HoverLift } from "@/components/hover-lift";
import {
  ContentBand,
  SectionFrame,
  SectionHeading,
} from "@/components/page-shell";
import { ProcessFlow, type ProcessStep } from "@/components/process-flow";
import { editorialListings } from "@/lib/editorial-real-listings";
import { badgeAssets, pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Review Signal | Editorial desk for digital products",
  description:
    "Manual review records, verification badges, and public profiles that help visitors verify a product before they visit your site.",
  path: "/",
});

const listingOutcomes = [
  {
    title: "Public review profile",
    copy: "Product summary, audience, what we checked, and an editorial note visitors can read in full.",
    Icon: FileText,
  },
  {
    title: "Verification badge",
    copy: "A click-through badge on your site that opens the same published record on the desk.",
    Icon: SearchCheck,
  },
  {
    title: "Quote and metadata",
    copy: "Founder Review adds a publishable quote, review ID, and reviewed date for sales and landing pages.",
    Icon: CheckCircle2,
  },
];

const featureShowcase = [
  {
    title: "Verify",
    copy: "The badge opens your live review profile on the desk—review ID, checks, and editorial note in one place.",
    Icon: BadgeCheck,
  },
  {
    title: "Understand",
    copy: "Visitors read what was reviewed, what stood out, and who the product is for before they click through.",
    Icon: BookOpen,
  },
  {
    title: "Share",
    copy: "Use the quote, badge, and metadata on site, email, and decks—always linking back to the same record.",
    Icon: Share2,
  },
];

const workflowSteps: ProcessStep[] = [
  {
    title: "Submit your product",
    copy: "Apply with your website and the context you want reviewed.",
    focus: "Choose Launch Listing or Founder Review on the form.",
  },
  {
    title: "Desk review",
    copy: "We review the live site, positioning, and public claims manually.",
    focus: "Typical turnaround within 24 hours after payment when accepted.",
  },
  {
    title: "Publish your record",
    copy: "If accepted, your review profile and badge go live together on the desk.",
    focus: "Visitors verify the review before following your site link.",
  },
];

const badgeReaderSteps = [
  "The badge opens the published review profile on the review desk.",
  "Read the editorial note, checks, and scope before following the website link.",
  "Use the review ID and date when you need to confirm the record is current.",
];

const badgeScopeNotes = [
  "Documents that Review Signal reviewed and listed the product—not third-party certification.",
  "Scope, limits, and what we checked are stated on each profile.",
  "Full definitions sit in our Guidelines and Terms.",
];

export default function Home() {
  const showcase = editorialListings;

  return (
    <>
      <section className="editorial-glow light-grid border-b border-[#E7E0D2] text-[#111827]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20 lg:px-8">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.22em]">
                  Review Signal · Editorial desk
                </p>
                <h1 className="mt-5 font-serif text-4xl leading-[1.08] md:text-6xl">
                  A review record visitors can verify before they buy.
                </h1>
                <p className="text-muted mt-6 max-w-2xl text-base leading-[1.75] md:text-lg">
                  We publish manual review profiles for useful digital products:
                  what we reviewed, what stood out, and a badge that links straight
                  back to that record. Prospects get third-party context; you get
                  assets you can place on site, email, and decks.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton
                    fullMobile
                    href={siteConfig.submitHref}
                    className="cta-glow"
                  >
                    Request review
                  </PrimaryButton>
                  <SecondaryButton fullMobile href="/apps">
                    Open the desk
                  </SecondaryButton>
                </div>
                <p className="text-secondary accent-edge mt-8 max-w-xl pl-4 text-sm leading-7">
                  Selective publication. Fees cover the review workflow; listing
                  follows desk standards.
                </p>
              </div>

              <HoverLift className="dark-showcase badge-shine rounded-[var(--radius-panel)] border border-[#B8944E]/40 p-3 shadow-[0_36px_110px_rgba(7,10,15,0.28)] md:p-4">
                <div className="overflow-hidden rounded-[14px] border border-[#B8944E]/35 bg-[#050A18]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badgeAssets.showcase}
                    alt="Review Signal badge treatments shown at publication scale"
                    className="w-full object-cover"
                    loading="eager"
                  />
                </div>
                <BentoGrid layout="equal3" className="px-1 pb-1 pt-4">
                  {[
                    {
                      label: "Verify in one click",
                      copy: "Badge opens the live review profile on the desk.",
                    },
                    {
                      label: "Read before you buy",
                      copy: "Editorial note, checks, and product context in one place.",
                    },
                    {
                      label: "Share with confidence",
                      copy: "Quote, badge, and review ID for your site and sales flow.",
                    },
                  ].map(({ label, copy }) => (
                    <BentoCell key={label}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E6D3A3]">
                        {label}
                      </p>
                      <p className="text-on-dark-muted mt-1 text-sm leading-6">
                        {copy}
                      </p>
                    </BentoCell>
                  ))}
                </BentoGrid>
              </HoverLift>
            </div>

            <HoverLift className="panel-elevated mt-10 flex flex-col items-start gap-3 rounded-[var(--radius-card)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-secondary text-sm leading-7">
                See a complete published record—including badge, quote, and checks.
              </p>
              <Link
                href="/example-review"
                className="text-sm font-semibold text-[#0B1220] underline decoration-[#B8944E] underline-offset-4"
              >
                View example profile →
              </Link>
            </HoverLift>
          </FadeInSection>
        </div>
      </section>

      <ContentBand variant="wash">
        <FadeInSection>
          <SectionHeading
            eyebrow="How the desk works"
            title="Verify, understand, and share—without extra noise."
            copy="Three layers that help visitors trust what they read and help you place a single source of truth on your site."
            size="large"
          />
          <BentoGrid layout="equal3" className="mt-10">
            {featureShowcase.map(({ title, copy, Icon }) => (
              <BentoCell key={title}>
                <FeatureCard
                  title={title}
                  copy={copy}
                  Icon={Icon}
                  variant="emphasis"
                />
              </BentoCell>
            ))}
          </BentoGrid>
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="washAlt" className="bg-[#FFFDF7]">
        <FadeInSection>
          <WhatIsIncludedSection />
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="wash">
        <FadeInSection>
          <SectionHeading
            eyebrow="Recent desk files"
            title="Real review profiles on the desk."
            copy="Each listing shows editorial notes, what we checked, screenshots where relevant, and an outbound link—so visitors can judge fit before they click through."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {showcase.map((listing) => (
              <AppDirectoryCard
                key={listing.name}
                app={{
                  initials: listing.initials,
                  name: listing.name,
                  category: listing.category,
                  description: listing.description,
                  quote: listing.quote,
                  website: listing.website,
                  logoSrc: listing.logoSrc,
                  screenshotSrc: listing.screenshotSrc,
                  profileHref: listing.profileHref,
                  reviewDeskNote: listing.reviewDeskNote,
                  checkedFor: listing.checkedFor,
                  complianceNote: listing.complianceNote,
                  statusLabel: "Review Published",
                }}
                featured
              />
            ))}
          </div>
        </FadeInSection>
      </ContentBand>

      <ContentBand>
        <FadeInSection>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <SectionHeading
              eyebrow="Review workflow"
              title="What the fee covers."
              copy="Payment starts a manual review. If your product is accepted, we publish the review profile and assets included in your chosen output."
            />
            <ProcessFlow steps={workflowSteps} />
          </div>
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="wash" className="bg-[#FFFDF7]">
        <FadeInSection>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <SectionHeading
              eyebrow="Three outputs"
              title="Built for verification, not vanity metrics."
              copy="Each layer adds something visitors and your team can use—without replacing your own claims."
            />
            <BentoGrid layout="featureRight">
              {listingOutcomes.map(({ title, copy, Icon }, index) => (
                <BentoCell key={title} span={index === 0 ? "wide" : "default"}>
                  <FeatureCard
                    title={title}
                    copy={copy}
                    Icon={Icon}
                    variant={index === 0 ? "emphasis" : "default"}
                  />
                </BentoCell>
              ))}
            </BentoGrid>
          </div>
        </FadeInSection>
      </ContentBand>

      <ContentBand id="reading-the-badge">
        <FadeInSection>
          <SectionFrame>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <SectionHeading
                  eyebrow="How to read the badge"
                  title="One place for scope and limits."
                  copy="We state what was reviewed on every profile. The points below apply across the desk; detail for each product lives on its public profile."
                />
                <Link
                  href="/guidelines"
                  className="text-secondary mt-6 inline-block text-sm font-semibold underline decoration-[#B8944E] underline-offset-4"
                >
                  Read full guidelines →
                </Link>
                <p className="text-eyebrow mt-8 text-xs font-semibold uppercase tracking-[0.16em]">
                  For visitors
                </p>
                <ul className="mt-3 space-y-2">
                  {badgeReaderSteps.map((item) => (
                    <li
                      key={item}
                      className="text-secondary flex gap-2 text-sm leading-7"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[#8A6B2E]"
                        size={16}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel-glass-lite rounded-[var(--radius-card)] p-5 md:p-6">
                <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.16em]">
                  Scope
                </p>
                <ul className="mt-4 space-y-3">
                  {badgeScopeNotes.map((item) => (
                    <li key={item} className="text-muted text-sm leading-7">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 hidden lg:block">
                  <CredibilityProfileMockup variant="compact" />
                </div>
              </div>
            </div>
          </SectionFrame>
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="washAlt">
        <FadeInSection>
          <BentoGrid layout="twoCol" className="gap-5">
            <BentoCell>
              <HoverLift
                as="article"
                className="panel-elevated h-full rounded-[var(--radius-panel)] p-6 md:p-7"
              >
                <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.2em]">
                  For readers
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                  Arrived from a badge?
                </h2>
                <p className="text-muted mt-4 text-sm leading-[1.7]">
                  Open the review profile for editorial context and checks, then follow the
                  website link if the product fits your needs.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton fullMobile href="/apps">
                    Open the desk
                  </PrimaryButton>
                  <SecondaryButton fullMobile href="/example-review">
                    Example profile
                  </SecondaryButton>
                </div>
              </HoverLift>
            </BentoCell>
            <BentoCell>
              <article className="dark-showcase hover-lift h-full rounded-[var(--radius-panel)] border border-[#B8944E]/35 p-6 shadow-[0_28px_90px_rgba(7,10,15,0.2)] md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E6D3A3]">
                  For applicants
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
                  Ready for a desk review?
                </h2>
                <p className="text-on-dark-muted mt-4 text-sm leading-[1.7]">
                  Choose your output on pricing, then submit product details. If
                  accepted, you receive the published review profile, badge, and—on Founder
                  Review—the quote and review metadata.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton dark fullMobile href="/pricing">
                    Outputs and fees
                  </PrimaryButton>
                  <SecondaryButton dark fullMobile href={siteConfig.submitHref}>
                    Begin submission
                  </SecondaryButton>
                </div>
              </article>
            </BentoCell>
          </BentoGrid>
        </FadeInSection>
      </ContentBand>

      <section className="section-wash border-t border-[#E7E0D2] px-5 py-12 sm:px-6 lg:px-8">
        <SectionFrame
          className="mx-auto max-w-7xl border-0 shadow-[var(--shadow-soft)]"
          innerClassName="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-2xl font-serif text-2xl leading-snug text-[#111827] md:text-3xl">
            Browse listed profiles, then request a review when your product is
            ready.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SecondaryButton fullMobile href="/apps">
              Open the desk
            </SecondaryButton>
            <PrimaryButton
              fullMobile
              href={siteConfig.submitHref}
              className="cta-glow"
            >
              Request review
            </PrimaryButton>
          </div>
        </SectionFrame>
      </section>
    </>
  );
}



