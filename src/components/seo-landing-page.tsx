import Link from "next/link";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { FAQAccordion } from "@/components/faq-accordion";
import { OutcomeValueStrip } from "@/components/outcome-value-strip";
import { ContentBand, PageHero, SectionHeading } from "@/components/page-shell";
import { PricingCard } from "@/components/pricing-card";
import { buildGuideJsonLd } from "@/lib/seo-schema";
import type { SeoGuide } from "@/lib/seo-types";
import {
  pageMetadata,
  pricingPlans,
  primaryCta,
  secondaryCta,
  siteConfig,
} from "@/lib/site";
import { getSeoGuideBySlug } from "@/lib/seo-pages";

type SeoLandingPageProps = {
  guide: SeoGuide;
};

function GuideToc({ sections }: { sections: SeoGuide["content"]["sections"] }) {
  return (
    <nav
      aria-label="On this page"
      className="rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7324]">
        On this page
      </p>
      <ol className="mt-4 flex flex-col gap-2 text-sm">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              className="text-[#6B7280] transition hover:text-[#111827]"
              href={`#${section.id}`}
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function GuideSectionBody({
  section,
}: {
  section: SeoGuide["content"]["sections"][number];
}) {
  const HeadingTag = section.level === "h3" ? "h3" : "h2";

  return (
    <article id={section.id} className="scroll-mt-28">
      <HeadingTag
        className={
          section.level === "h3"
            ? "mt-8 text-xl font-semibold text-[#111827]"
            : "font-serif text-3xl leading-tight text-[#111827] md:text-4xl"
        }
      >
        {section.heading}
      </HeadingTag>
      <div className="mt-6 space-y-5 text-base leading-8 text-[#374151]">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      {section.list ? (
        <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-8 text-[#374151]">
          {section.list.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.table ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E7E0D2] bg-[#F5F1E8]">
                {section.table.headers.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 font-semibold text-[#111827]"
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row[0]} className="border-b border-[#E7E0D2]">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${row[0]}-${cellIndex}`}
                      className="px-4 py-3 text-[#374151]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </article>
  );
}

function MidPageCta() {
  return (
    <div className="panel-elevated flex flex-col items-start justify-between gap-6 rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-[#0B0F17] p-8 md:flex-row md:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A943]">
          Review Signal
        </p>
        <p className="mt-2 max-w-xl text-lg font-medium text-[#F8F4EA]">
          Publish your review profile, quote and badge—ready for your site and
          campaigns.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <PrimaryButton dark href={siteConfig.submitHref}>
          {primaryCta}
        </PrimaryButton>
        <SecondaryButton dark href="/example-review">
          {secondaryCta}
        </SecondaryButton>
      </div>
    </div>
  );
}

function RelatedGuides({ slugs }: { slugs: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {slugs.map((slug) => {
        const related = getSeoGuideBySlug(slug);
        if (!related) return null;
        return (
          <Link
            key={slug}
            className="group rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white p-5 transition hover:border-[#D4A943]/50"
            href={`/${slug}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A7324]">
              Related guide
            </p>
            <p className="mt-2 font-semibold text-[#111827] group-hover:text-[#9A7324]">
              {related.h1}
            </p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B7280]">
              {related.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export function SeoLandingPage({ guide }: SeoLandingPageProps) {
  const jsonLd = buildGuideJsonLd(guide);
  const orderedPlans = [...pricingPlans].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  );
  const faqForAccordion = guide.content.faq.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <>
      <PageHero
        eyebrow={guide.eyebrow}
        title={guide.h1}
        copy={guide.heroCopy}
      />
      <OutcomeValueStrip benefits={guide.content.valueBenefits} />

      <ContentBand variant="default">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <GuideToc sections={guide.content.sections} />
            </div>
          </aside>

          <div className="min-w-0 space-y-16">
            <p className="text-sm text-[#6B7280]">
              By Review Signal editorial team · Last updated{" "}
              <time dateTime={guide.updatedAt}>
                {new Date(guide.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>

            {guide.content.sections.map((section, index) => (
              <div key={section.id}>
                <GuideSectionBody section={section} />
                {index === 5 ? (
                  <div className="mt-12">
                    <MidPageCta />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </ContentBand>

      <ContentBand variant="wash">
        <SectionHeading
          eyebrow="Packages"
          title="Review profiles from £99"
          copy="Choose Starter or Enhanced—both include manual review and published assets when your product is suitable and accepted."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {orderedPlans.map((plan) => (
            <PricingCard key={plan.key} plan={plan} />
          ))}
        </div>
        <div className="mt-8">
          <PrimaryButton href="/pricing">View full pricing</PrimaryButton>
        </div>
      </ContentBand>

      <ContentBand variant="default">
        <SectionHeading title="Frequently asked questions" />
        <div className="mt-10 max-w-3xl">
          <FAQAccordion items={faqForAccordion} />
        </div>
      </ContentBand>

      <ContentBand variant="washAlt">
        <SectionHeading title="More guides for UK founders" />
        <div className="mt-10">
          <RelatedGuides slugs={guide.relatedSlugs} />
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <PrimaryButton href={siteConfig.submitHref}>{primaryCta}</PrimaryButton>
          <SecondaryButton href="/guides">All guides</SecondaryButton>
        </div>
      </ContentBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export function seoGuideMetadata(guide: SeoGuide) {
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/${guide.slug}`,
  });
}
