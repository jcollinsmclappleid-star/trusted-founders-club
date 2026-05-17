import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { FadeInSection } from "@/components/fade-in-section";
import { SectionFrame } from "@/components/page-shell";
import { SubmitAppForm } from "@/components/submit-app-form";
import { pageMetadata } from "@/lib/site";
import { getCurrentUser } from "@/lib/supabase-auth-server";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Apply For Review",
    description:
      "Apply for consideration by Review Signal. Accepted submissions may receive a public review record, website link and verification badge.",
    path: "/submit",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/submit");
  }

  return (
    <>
      <section className="editorial-glow light-grid border-b border-[#E7E0D2] px-5 py-16 text-[#111827] sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeInSection>
            <SectionFrame innerClassName="max-w-4xl !py-8 md:!py-10">
              <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.22em]">
                Request review
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-[1.05] md:text-6xl">
                Apply for a Review Signal review profile.
              </h1>
              <p className="text-muted mt-6 max-w-3xl text-lg leading-8">
                Tell us what you have built and where it lives. If accepted, you
                receive the public record, website link, and—on Founder Review—the
                badge, quote, and review metadata.
              </p>
              <p className="text-eyebrow mt-4 text-sm font-medium uppercase tracking-[0.12em]">
                Manual review · Selective publication · Verifiable badge
              </p>
              <div className="text-secondary panel-glass-lite accent-edge mt-6 flex max-w-full items-start gap-3 pl-4 text-sm leading-6">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#8A6B2E]"
                  size={18}
                />
                <span>
                  Payment starts the review workflow. Publication follows desk
                  standards; see{" "}
                  <a
                    href="/guidelines"
                    className="font-semibold text-[#0B1220] underline decoration-[#B8944E] underline-offset-4"
                  >
                    Guidelines
                  </a>{" "}
                  for scope.
                </span>
              </div>
            </SectionFrame>
          </FadeInSection>
        </div>
      </section>

      <section className="section-wash-alt px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SubmitAppForm />
        </div>
      </section>
    </>
  );
}

