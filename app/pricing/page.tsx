import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "@/components/buttons";
import { ComparisonTable } from "@/components/comparison-table";
import { FAQAccordion } from "@/components/faq-accordion";
import { FadeInSection } from "@/components/fade-in-section";
import { IntegrityCard } from "@/components/integrity-card";
import { PillChip } from "@/components/pill-chip";
import { ReviewProcessSteps } from "@/components/review-process-steps";
import { ContentBand, PageHero, SectionHeading } from "@/components/page-shell";
import { PricingCard } from "@/components/pricing-card";
import { TrustNote } from "@/components/trust-note";
import {
  pageMetadata,
  primaryCta,
  pricingPlans,
  profileDeliverables,
  siteConfig,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing | Review Signal",
  description:
    "Choose a Starter or Enhanced review profile package. Paid manual review process with public profile and badge—no guaranteed positive outcome.",
  path: "/pricing",
});

export default function PricingPage() {
  const orderedPlans = [...pricingPlans].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  );

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Get a public review profile"
        copy="You pay for the manual review process and profile creation. If your product is suitable and accepted, we publish a public review profile and badge you can link from your site."
      />

      <section className="section-wash border-y border-[#E7E0D2] px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {[
            "Manual review process",
            "Public review profile when accepted",
            "Enhanced adds badge pack and deeper summary",
            "Badge links to your review record",
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

      <ContentBand variant="washAlt">
        <ComparisonTable />
      </ContentBand>

      <ContentBand>
        <FadeInSection>
          <SectionHeading
            eyebrow="After you apply"
            title="What happens after payment and application"
            copy="Submit your application and complete payment. We review suitability, assess your live product and publish your profile if accepted."
          />
          <div className="mt-10">
            <ReviewProcessSteps />
          </div>
          <TrustNote className="mt-8 max-w-3xl" />
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="wash">
        <FadeInSection>
          <SectionHeading
            eyebrow="Included in every profile"
            title="What is included in every accepted profile"
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profileDeliverables.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-[var(--radius-card)] border border-[#E7E0D2] bg-white px-4 py-3 text-sm text-[#374151]"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#D4A943]"
                  size={16}
                />
                {item}
              </li>
            ))}
          </ul>
        </FadeInSection>
      </ContentBand>

      <ContentBand variant="washAlt">
        <FadeInSection>
          <SectionHeading
            eyebrow="Integrity"
            title="What Review Signal does and does not do"
          />
          <div className="mt-10">
            <IntegrityCard />
          </div>
        </FadeInSection>
      </ContentBand>

      <ContentBand>
        <SectionHeading
          eyebrow="FAQ"
          title="Pricing and review questions"
          align="center"
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <FAQAccordion />
        </div>
      </ContentBand>

      <section className="section-dark px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl text-[#F8F4EA] md:text-5xl">
            Ready to apply for a review profile?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8ADB7]">
            Choose Starter or Enhanced, then submit your product for manual review.
          </p>
          <div className="mt-8">
            <PrimaryButton
              dark
              fullMobile
              href={siteConfig.submitHref}
              className="cta-glow"
            >
              {primaryCta}
            </PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
