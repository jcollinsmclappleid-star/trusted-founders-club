import type { Metadata } from "next";
import { PageHero } from "@/components/page-shell";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    "Read the privacy notice for Review Signal submissions, payments, emails and public listing consent.",
  path: "/privacy",
});

const sections = [
  {
    title: "Data collected through submission forms",
    copy: "Review Signal may collect applicant name, email address, account details, app name, app URL, category, description, target customer, applicant notes, logo and screenshot assets, selected package details and review workflow information when an app is submitted.",
  },
  {
    title: "Payment handling",
    copy: "Payments are intended to be handled by Stripe. Review Signal should not store full payment card details on its own servers.",
  },
  {
    title: "Public listing consent",
    copy: "Applicants must consent to public listing before approved app details, review quotes, profile pages or badges are published.",
  },
  {
    title: "Transactional emails",
    copy: "Review Signal may send transactional emails about payments, review status, requested changes, publication, rejection or refund updates. These are service emails, not a newsletter.",
  },
  {
    title: "Contact details",
    copy: "A production privacy notice should include a valid contact email for privacy questions and data requests before launch.",
  },
  {
    title: "Data deletion and contact requests",
    copy: "Applicants should be able to request correction or deletion of submitted personal information, subject to legal, payment and operational requirements.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice."
        copy="This notice explains the expected handling of submission data, account data, payment processing, transactional emails and public listing consent."
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
