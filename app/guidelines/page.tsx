import type { Metadata } from "next";
import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { DisclaimerPanel } from "@/components/disclaimer-panel";
import { ContentBand, PageHero, SectionHeading } from "@/components/page-shell";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Submission Guidelines",
  description:
    "Read the approval standards and quality guidelines for Review Signal app reviews and public profiles.",
  path: "/guidelines",
});

const accepted = [
  "New apps, AI tools, SaaS products, calculators, directories and digital products",
  "Products with a clear public website or landing page",
  "Independent products with enough context to review fairly",
  "Useful tools that can be understood by a visitor without misleading claims",
];

const rejected = [
  "Misleading, harmful, illegal, spammy, cloned or non-functional products",
  "Adult content, gambling products, malware, spyware or products built for deception",
  "Apps that make unsupported medical, legal, financial, crypto or investment claims",
  "Products that exist mainly to manipulate search rankings",
  "Submissions with false applicant information or deceptive descriptions",
];

const standards = [
  "The app has a clear purpose.",
  "The website loads and represents the submitted product.",
  "The description is not misleading.",
  "The applicant has provided enough information.",
  "A public review would not overstate the product.",
  "The product is suitable for the Review Signal audience.",
];

export default function GuidelinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guidelines"
        title="Curated reviews for credible digital products."
        copy="Review Signal is selective by design. These guidelines explain what we review, what we reject and how we keep profiles useful, accurate and safe."
      />

      <ContentBand>
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-[#4F7F63]" size={22} />
              <h2 className="font-serif text-3xl text-[#111827]">
                What we accept
              </h2>
            </div>
            <ul className="mt-6 grid gap-4">
              {accepted.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[#6B7280]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#4F7F63]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-[#A66A2C]" size={22} />
              <h2 className="font-serif text-3xl text-[#111827]">
                What we reject
              </h2>
            </div>
            <ul className="mt-6 grid gap-4">
              {rejected.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[#6B7280]">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#A66A2C]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ContentBand>

      <ContentBand className="bg-[#FFFDF7]">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="Approval standards"
            title="Every profile should be useful, accurate and fair."
            copy="Our review process is manual. It checks basic suitability and public presentation before a profile, quote or badge is issued."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {standards.map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-4 text-sm font-medium leading-6 text-[#111827]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </ContentBand>

      <ContentBand>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Review wording",
              copy: "Reviews are short, practical and written for credibility. We do not publish fake testimonials or unsupported claims.",
            },
            {
              title: "No SEO guarantees",
              copy: "We do not guarantee rankings, indexing, traffic, sales or customers. Profiles are built for discovery and verification, not ranking promises.",
            },
            {
              title: "Regulated categories",
              copy: "Products making medical, legal, financial, crypto or investment claims may require additional review and may not be accepted.",
            },
            {
              title: "No indexing guarantees",
              copy: "Public profiles may be discoverable, but indexing is never guaranteed. App profiles default to noindex unless manually approved.",
            },
          ].map(({ title, copy }) => (
            <article
              key={title}
              className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6"
            >
              <ShieldCheck className="text-[#B8944E]" size={22} />
              <h2 className="mt-5 font-serif text-2xl text-[#111827]">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#6B7280]">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <DisclaimerPanel>
            The badge confirms review and listing status. It is not a guarantee
            of performance, security, compliance or commercial success.
          </DisclaimerPanel>
        </div>
      </ContentBand>
    </>
  );
}
