import type { Metadata } from "next";
import Link from "next/link";
import { PrimaryButton } from "@/components/buttons";
import { ContentBand, PageHero, SectionHeading } from "@/components/page-shell";
import { seoGuides } from "@/lib/seo-pages";
import { pageMetadata, primaryCta, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Guides for UK Founders | Review Signal",
  description:
    "Outcome-driven guides on traffic, users, paying customers, reviews and trust—plus how a Review Signal profile accelerates growth. Apply from £99.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Guides for UK founders"
        copy="Practical playbooks for the outcomes you are chasing—more traffic, users, revenue and credible proof—with Review Signal profiles you can publish on your site from £99."
      />

      <ContentBand>
        <SectionHeading
          title="Choose your outcome"
          copy="Each guide is 1,600+ words of actionable advice with a clear path to a public review profile, publishable quote and badge."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {seoGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                className="group flex h-full flex-col rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white p-6 transition hover:border-[#D4A943]/50 hover:shadow-[0_20px_60px_rgba(16,18,22,0.06)]"
                href={`/${guide.slug}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A7324]">
                  {guide.desiredOutcome}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-[#111827] group-hover:text-[#9A7324]">
                  {guide.h1}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#6B7280]">
                  {guide.description}
                </p>
                <span className="mt-6 text-sm font-semibold text-[#111827]">
                  Read guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <PrimaryButton href={siteConfig.submitHref}>{primaryCta}</PrimaryButton>
        </div>
      </ContentBand>
    </>
  );
}
