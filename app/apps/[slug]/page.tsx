import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialProfileLayout } from "@/components/editorial-profile-layout";
import { absoluteUrl } from "@/lib/site";
import {
  createSignedAssetUrl,
  defaultDeskCheckedItems,
  getInitials,
  getPublicSubmissionBySlug,
  getReviewId,
  getReviewedDate,
  submissionEditorialComplianceNote,
  submissionHelpsWithBullets,
  submissionReviewSummary,
} from "@/lib/submissions";

type ProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { submission } = await getPublicSubmissionBySlug(slug);

  if (!submission) {
    return {
      title: "App Profile Not Found | Review Signal",
      robots: { index: false, follow: true },
    };
  }

  const url = absoluteUrl(`/apps/${slug}`);

  return {
    title: `${submission.app_name} | Review Signal`,
    description: submission.short_description,
    alternates: { canonical: url },
    robots: {
      index: submission.is_indexable,
      follow: true,
    },
    openGraph: {
      title: `${submission.app_name} | Review Signal`,
      description: submission.short_description,
      url,
      type: "website",
    },
  };
}

export default async function AppProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const { submission } = await getPublicSubmissionBySlug(slug);

  if (!submission) notFound();

  const logoUrl = await createSignedAssetUrl(submission.logo_storage_path);
  const screenshotUrl = await createSignedAssetUrl(
    submission.screenshot_storage_path,
  );
  const reviewedDate = getReviewedDate(submission);
  const reviewId = getReviewId(submission);
  const helpsWithBullets = submissionHelpsWithBullets(submission);
  const helps =
    helpsWithBullets.length > 0
      ? helpsWithBullets
      : [submission.short_description];

  const softwareJsonLd = submission.is_indexable
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: submission.app_name,
        applicationCategory: submission.category,
        description: submission.short_description,
        url: submission.app_url,
      }
    : null;

  const aboutBody = `${submission.app_name} helps ${submission.target_customer} with ${submission.problem_solved} through ${submission.app_functionality}.`;

  return (
    <>
      <EditorialProfileLayout
        profileNote="Public profile with website link, review metadata and badge verification."
        name={submission.app_name}
        category={submission.category}
        initials={getInitials(submission.app_name)}
        logoUrl={logoUrl}
        logoAlt={submission.logo_alt ?? undefined}
        shortDescription={submission.short_description}
        website={submission.app_url}
        websiteRel={
          submission.external_link_rel ?? "sponsored nofollow noopener"
        }
        quote={
          submission.public_review_quote ??
          "Listed after manual suitability review by Review Signal."
        }
        reviewId={reviewId}
        reviewedDate={reviewedDate}
        reviewSummary={submissionReviewSummary(submission)}
        helpsWithBullets={helps}
        checkedItems={defaultDeskCheckedItems}
        trustSignals={[
          "Manually reviewed listing",
          "Public profile on Review Signal",
          "Website checked at review time",
          "Verification badge available",
        ]}
        complianceNote={submissionEditorialComplianceNote()}
        aboutSection={{ title: "What the product does", body: aboutBody }}
        founderNoteSection={
          submission.founder_note
            ? { title: "Founder note", body: submission.founder_note }
            : null
        }
        screenshotUrl={screenshotUrl}
        screenshotAlt={submission.screenshot_alt ?? undefined}
        badgeVerifyHref={`/apps/${slug}#badge-verification`}
      />

      {softwareJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      ) : null}
    </>
  );
}
