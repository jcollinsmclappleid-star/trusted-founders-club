import Link from "next/link";
import { CredibilityProfileMockup } from "@/components/credibility-profile-mockup";

type BadgeVerificationPanelProps = {
  appName?: string;
  reviewedDate?: string;
  reviewId?: string;
};

export function BadgeVerificationPanel({
  appName = "approved apps",
  reviewedDate,
  reviewId,
}: BadgeVerificationPanelProps) {
  void appName;
  void reviewedDate;
  void reviewId;

  return (
    <section className="grid gap-6">
      <div>
        <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.18em]">
          Badge verification
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-[#111827] md:text-4xl">
          A badge your visitors can verify.
        </h2>
        <p className="text-muted mt-4 max-w-lg text-base leading-7">
          Accepted Founder Review submissions receive a badge that opens their
          public review profile—editorial note, checks, review ID, and website link in
          one place.
        </p>
        <Link
          href="/guidelines"
          className="text-secondary mt-4 inline-block text-sm font-semibold underline decoration-[#B8944E] underline-offset-4"
        >
          How we define scope →
        </Link>
      </div>
      <CredibilityProfileMockup variant="full" />
    </section>
  );
}
