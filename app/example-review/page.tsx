import type { Metadata } from "next";
import { EditorialProfileLayout } from "@/components/editorial-profile-layout";
import { PageHero } from "@/components/page-shell";
import { exampleApp, ownedListingWebsiteRel, pageMetadata } from "@/lib/site";
import { getInitials } from "@/lib/submissions";

export const metadata: Metadata = pageMetadata({
  title: "Example public review profile",
  description:
    "See how Review Signal publishes a public review profile: summary, reviewed signals, trust notes, website link and badge linked to the review record.",
  path: "/example-review",
});

export default function ExampleReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Example profile"
        title="Public review profile: Divorce Calculator UK"
        copy="A published example showing review summary, reviewed signals and a badge that links back to this record—not legal, financial or outcome guarantees."
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
        websiteRel={ownedListingWebsiteRel}
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
