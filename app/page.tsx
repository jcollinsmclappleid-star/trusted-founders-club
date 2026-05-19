import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OutcomeShowcase } from "@/components/outcome-showcase";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { FadeInSection } from "@/components/fade-in-section";
import { ProfilePreviewCard } from "@/components/profile-preview-card";
import { ReviewJourneyFlow } from "@/components/review-journey-flow";
import { TrustNote } from "@/components/trust-note";
import {
  pageMetadata,
  primaryCta,
  pricingPlans,
  secondaryCta,
  siteConfig,
  trustDisclaimers,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Review Signal | Review, quote and backlink for your product",
  description:
    "Get an independent review profile, a publishable quote for visitors, and a backlink from a public record they can verify before they buy.",
  path: "/",
});

export default function Home() {
  const featured = pricingPlans.find((p) => p.featured) ?? pricingPlans[1];
  const starter = pricingPlans.find((p) => !p.featured) ?? pricingPlans[0];

  return (
    <>
      {/* Hero — outcome-first, compact */}
      <section className="section-dark premium-grain border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <FadeInSection>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-[#D4A943]/30 bg-[#D4A943]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#E7C76B]">
                  Review · Quote · Backlink
                </p>
                <h1 className="mt-5 font-serif text-4xl leading-[1.06] text-[#F8F4EA] md:text-[3.25rem]">
                  Give prospects proof they can verify—before they buy.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#A8ADB7]">
                  Review Signal publishes a{" "}
                  <strong className="font-medium text-[#F8F4EA]">
                    manual review profile
                  </strong>
                  , a{" "}
                  <strong className="font-medium text-[#F8F4EA]">
                    quote you can show visitors
                  </strong>
                  , and a{" "}
                  <strong className="font-medium text-[#F8F4EA]">
                    backlink to your site
                  </strong>
                  —from one public record, not paid praise.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton
                    dark
                    fullMobile
                    href={siteConfig.submitHref}
                    className="cta-glow"
                  >
                    {primaryCta}
                  </PrimaryButton>
                  <SecondaryButton dark fullMobile href="/example-review">
                    {secondaryCta}
                  </SecondaryButton>
                </div>
                <TrustNote variant="short" dark className="mt-5 max-w-lg text-xs" />
              </div>
              <ProfilePreviewCard variant="hero" showLink={false} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Three outcomes — visual showcase */}
      <section className="border-b border-[#E7E0D2] bg-[#F5F1E8] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInSection>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A7324]">
                What you walk away with
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#111827] md:text-4xl">
                Three outcomes. One review process.
              </h2>
              <p className="mt-3 text-base leading-7 text-[#6B7280]">
                Not a generic directory listing—a credibility layer built for
                conversion: independent review, visitor-facing quote, and a
                follow link to your product.
              </p>
            </div>
            <div className="mt-10">
              <OutcomeShowcase />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Flow — prospect journey + your steps */}
      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInSection>
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl text-[#111827] md:text-4xl">
                How it works—for them and for you
              </h2>
              <p className="mt-3 text-base leading-7 text-[#6B7280]">
                Prospects verify. You apply once. We publish the record you can
                reuse on site, email and sales.
              </p>
            </div>
            <div className="mt-10 rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white p-6 md:p-10">
              <ReviewJourneyFlow />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Pricing strip + example — compact close */}
      <section className="section-dark border-y border-white/10 px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInSection>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="font-serif text-3xl text-[#F8F4EA] md:text-4xl">
                  From {starter.price} to {featured.price}
                </h2>
                <p className="mt-3 max-w-xl text-[#A8ADB7]">
                  <strong className="text-[#F8F4EA]">{starter.name}</strong> for
                  a lean profile and backlink.{" "}
                  <strong className="text-[#F8F4EA]">{featured.name}</strong> adds
                  the publishable quote, badge pack and deeper review summary.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1 text-[#E7C76B] hover:text-[#F8F4EA]"
                  >
                    Compare packages
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/apps"
                    className="inline-flex items-center gap-1 text-[#A8ADB7] hover:text-[#F8F4EA]"
                  >
                    Browse profile directory
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <PrimaryButton dark href={siteConfig.submitHref} className="cta-glow">
                  {primaryCta}
                </PrimaryButton>
                <SecondaryButton dark href="/example-review">
                  {secondaryCta}
                </SecondaryButton>
              </div>
            </div>
            <p className="mt-8 text-center text-xs leading-6 text-[#6B7280] lg:text-left">
              {trustDisclaimers.payment}{" "}
              <Link href="/guidelines" className="text-[#A8ADB7] underline">
                Guidelines
              </Link>
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Founder guides */}
      <section className="border-t border-[#E7E0D2] bg-white px-5 py-16 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7324]">
              Guides
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#111827] md:text-4xl">
              Grow traffic, users and revenue
            </h2>
            <p className="mt-4 max-w-2xl text-[#6B7280]">
              UK-focused playbooks for the outcomes founders search for—each
              links to how a Review Signal profile accelerates proof.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              <li>
                <Link
                  className="block rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-[#F7F3EA] p-5 font-semibold text-[#111827] hover:border-[#D4A943]/50"
                  href="/how-to-get-more-traffic-to-your-app"
                >
                  Get more app traffic
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-[#F7F3EA] p-5 font-semibold text-[#111827] hover:border-[#D4A943]/50"
                  href="/how-to-get-new-users-for-your-app"
                >
                  Get new users
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-[#F7F3EA] p-5 font-semibold text-[#111827] hover:border-[#D4A943]/50"
                  href="/how-to-get-paying-customers-for-your-saas"
                >
                  Get paying customers
                </Link>
              </li>
            </ul>
            <Link
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#9A7324] hover:text-[#111827]"
              href="/guides"
            >
              View all guides
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
