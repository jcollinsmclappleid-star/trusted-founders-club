import type { Metadata } from "next";
import { EditorialProfileLayout } from "@/components/editorial-profile-layout";
import { PageHero } from "@/components/page-shell";
import { exampleApp, pageMetadata } from "@/lib/site";
import { getInitials } from "@/lib/submissions";

export const metadata: Metadata = pageMetadata({
  title: "Divorce Calculator UK — Example Editorial Profile",
  description:
    "See how Review Signal publishes an editorial review profile: summary, desk checks, trust signals, website link and verification badge framing.",
  path: "/example-review",
});

export default function ExampleReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Example profile"
        title="Editorial review profile: Divorce Calculator UK."
        copy="This is a real-format desk listing shown as an example. Wording focuses on what we publish and verify—not legal, financial or outcome guarantees."
      />

      <EditorialProfileLayout
        profileNote="Public profile with website link, review metadata and badge verification."
        name={exampleApp.name}
        category={exampleApp.category}
        initials={getInitials(exampleApp.name)}
        logoUrl={exampleApp.logoSrc}
        screenshotUrl={exampleApp.screenshotSrc}
        screenshotAlt={`${exampleApp.name} website screenshot`}
        shortDescription={exampleApp.shortDescription}
        website={exampleApp.website}
        quote={exampleApp.quote}
        reviewId={exampleApp.reviewId}
        reviewedDate={exampleApp.reviewedDate}
        reviewSummary={exampleApp.reviewSummary}
        helpsWithBullets={exampleApp.helpsWithBullets}
        checkedItems={exampleApp.checkedItems}
        trustSignals={exampleApp.trustSignals}
        complianceNote={exampleApp.complianceNote}
        aboutSection={{ title: "What the tool covers", body: exampleApp.about }}
        founderNoteSection={{
          title: "Positioning note",
          body: exampleApp.founderNote,
        }}
        badgeVerifyHref="#badge-verification"
      />
    </>
  );
}
