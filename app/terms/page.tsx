import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description:
    "Read the service terms for Review Signal reviews, public profiles and badge usage.",
  path: "/terms",
});

const sections = [
  {
    title: "Service overview",
    copy: "Review Signal provides manual review, public profile and badge services for submitted apps and digital products. Approved submissions may receive public listing assets depending on the selected package.",
  },
  {
    title: "Payment and approval",
    copy: "Payment does not guarantee approval. Submissions are reviewed for suitability. If your app is unsuitable, we may request changes or reject and refund according to the policy shown at checkout.",
  },
  {
    title: "Right to reject unsuitable submissions",
    copy: "We may reject misleading, harmful, illegal, non-functional, spammy or unsuitable submissions. Products involving adult content, gambling, malware, spyware or regulated medical, legal, financial, crypto or investment claims may require extra review or may not be accepted.",
  },
  {
    title: "No SEO or ranking guarantees",
    copy: "Review Signal does not guarantee search rankings, indexing, traffic, sales, customers, domain authority increases or any specific SEO outcome.",
  },
  {
    title: "No indexing guarantees",
    copy: "Public profiles may be discoverable, but we do not guarantee that any profile will be indexed by Google or any other search engine. App profiles default to noindex unless manually approved.",
  },
  {
    title: "Review quote usage",
    copy: "Approved Enhanced Review Profile submissions may use the published review quote on their own landing page, provided it is not edited in a misleading way or used after a profile has been removed.",
  },
  {
    title: "Badge usage",
    copy: "Approved submissions may use the Reviewed by Review Signal badge and link it to their public profile. The badge must not be presented as a certification, security audit, legal approval or guarantee of performance.",
  },
  {
    title: "Right to remove listings",
    copy: "We reserve the right to remove or update listings if the product becomes misleading, harmful, illegal, non-functional, unsuitable or inconsistent with our quality standards.",
  },
  {
    title: "No misleading use",
    copy: "Applicants must not use review assets in a way that overstates what was reviewed or implies endorsement, investment advice, compliance approval or commercial success.",
  },
  {
    title: "Public listing consent",
    copy: "By submitting an app, applicants consent to public listing details being published if the submission is approved. Private notes, demo login details and admin review notes are not intended for public display.",
  },
  {
    title: "Contact and company details",
    copy: `${siteConfig.name} is operated by ${siteConfig.companyName}, ${siteConfig.companyRegistration}. Contact ${siteConfig.supportEmail} for support queries about an application or published profile.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Service terms."
        copy="These terms explain the review, profile and badge service for Review Signal."
      />

      <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_24px_70px_rgba(17,24,39,0.06)] md:p-8">
          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-b border-[#E7E0D2] pb-8 last:border-0 last:pb-0"
              >
                <h2 className="font-serif text-2xl text-[#111827]">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                  {section.copy}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
