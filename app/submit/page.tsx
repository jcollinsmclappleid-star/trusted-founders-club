import type { Metadata } from "next";
import { FadeInSection } from "@/components/fade-in-section";
import { SectionFrame } from "@/components/page-shell";
import { SubmitAppForm } from "@/components/submit-app-form";
import { TrustNote } from "@/components/trust-note";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Apply for a Review Signal profile",
    description:
      "Submit your product, app, website or service for manual review. Payment covers the review process and profile creation—not a guaranteed positive review.",
    path: "/submit",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

export default function SubmitPage() {
  return (
    <>
      <section className="section-dark border-b border-white/10 px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInSection>
            <SectionFrame
              className="border-white/10 bg-[#151922] shadow-none"
              innerClassName="max-w-4xl !py-8 md:!py-10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4A943]">
                Application
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-[#F8F4EA] md:text-5xl">
                Apply for a Review Signal profile
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#A8ADB7]">
                Submit your product, app, website or service for manual review. If
                suitable, we will create a public review profile and badge you can
                link from your site.
              </p>
              <TrustNote variant="payment" dark className="mt-6 max-w-3xl" />
            </SectionFrame>
          </FadeInSection>
        </div>
      </section>

      <section className="section-light px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SubmitAppForm />
        </div>
      </section>
    </>
  );
}
