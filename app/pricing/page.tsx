import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { BadgeVerificationPanel } from "@/components/badge-verification-panel";
import { PrimaryButton } from "@/components/buttons";
import { ComparisonTable } from "@/components/comparison-table";
import { FAQAccordion } from "@/components/faq-accordion";
import { FadeInSection } from "@/components/fade-in-section";
import { PillChip } from "@/components/pill-chip";
import { ProcessFlow, type ProcessStep } from "@/components/process-flow";
import { ContentBand, PageHero, SectionFrame, SectionHeading } from "@/components/page-shell";
import { PricingCard } from "@/components/pricing-card";
import { WhatIsIncludedSection } from "@/components/what-is-included-section";
import { pageMetadata, pricingPlans, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Choose the depth of Review Signal output: directory record or full review note, quote, badge and verification metadata.",
  path: "/pricing",
});

const timelineSteps: ProcessStep[] = [
  {
    title: "Desk queue",
    copy: "Your application enters the manual review queue after payment.",
    focus: "The selected output defines profile depth and badge eligibility.",
  },
  {
    title: "Live review",
    copy: "We review the live website, positioning, and public claims.",
    focus: "Typical turnaround within 24 hours when accepted.",
  },
  {
    title: "Publication",
    copy: "Accepted records are published on the review desk.",
    focus: "Launch Listing publishes the directory profile and link.",
  },
  {
    title: "Founder assets",
    copy: "Founder Review adds the badge, quote, and review metadata.",
    focus: "Badge always links back to the public review profile.",
  },
];

export default function PricingPage() {
  const orderedPlans = [...pricingPlans].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  );

  return (
    <>
      <PageHero
        eyebrow="Review outputs"
        title="Choose the depth of public review record."
        copy="Launch Listing creates a reviewed directory record. Founder Review adds the full editorial note, published quote, black verification badge, review ID and clarity feedback if the submission is accepted."
      />

      <section className="section-wash border-y border-[#E7E0D2] px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {[
            "Manual review before publication",
            "Public review profile with website link when accepted",
            "Founder Review adds badge, quote, and review ID",
            "Click-to-verify record on the review desk",
          ].map((item) => (
            <PillChip key={item} variant="gold">
              {item}
            </PillChip>
          ))}
        </div>
      </section>

      <ContentBand variant="wash">
        <FadeInSection>
          <div
            id="plans"
            className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8"
          >
            {orderedPlans.map((plan) => (
              <div
                key={plan.name}
                className={plan.featured ? "order-first lg:order-none" : ""}
              >
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="washAlt" className="bg-[#FFFDF7]">
        <ComparisonTable />
      </ContentBand>

      <ContentBand variant="wash" className="bg-[#FFFDF7]">
        <FadeInSection>
          <WhatIsIncludedSection />
        </FadeInSection>
      </ContentBand>

      <ContentBand>
        <FadeInSection>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <SectionHeading
              eyebrow="What happens after payment"
              title="Payment starts the workflow. Publication follows desk standards."
              copy="Your fee covers the manual review and the publishing assets in your chosen output when the submission is accepted."
            />
            <ProcessFlow steps={timelineSteps} />
          </div>
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="wash" className="bg-[#FFFDF7]">
        <FadeInSection>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionFrame innerClassName="!p-6">
              <div className="flex gap-3">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#8A6B2E]"
                  size={20}
                />
                <div>
                  <h2 className="font-serif text-3xl text-[#111827]">
                    Before you apply
                  </h2>
                  <p className="text-muted mt-4 text-sm leading-7">
                    Payment starts the review workflow. If your product is
                    accepted, you receive the public assets in your plan—review profile,
                    link, and badge or quote as selected.
                  </p>
                  <p className="text-muted mt-3 text-sm leading-7">
                    Review Signal supports credibility and discoverability. It
                    does not guarantee rankings, traffic, or enquiries. Desk-wide
                    rules are in our{" "}
                    <a
                      href="/guidelines"
                      className="font-semibold text-[#0B1220] underline decoration-[#B8944E] underline-offset-4"
                    >
                      Guidelines
                    </a>
                    .
                  </p>
                </div>
              </div>
            </SectionFrame>
            <BadgeVerificationPanel />
          </div>
        </FadeInSection>
      </ContentBand>

      <ContentBand>
        <SectionHeading
          eyebrow="FAQ"
          title="Pricing and review questions."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <FAQAccordion />
        </div>
      </ContentBand>

      <section className="dark-showcase px-5 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E6D3A3]">
            Ready to apply
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
            Publish a record visitors can verify.
          </h2>
          <div className="mt-8">
            <PrimaryButton
              dark
              fullMobile
              href={siteConfig.submitHref}
              className="cta-glow"
            >
              Request review
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}


