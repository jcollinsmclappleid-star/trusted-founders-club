import type { Metadata } from "next";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { FadeInSection } from "@/components/fade-in-section";
import { ProfileDirectoryExplorer } from "@/components/profile-directory-explorer";
import { absoluteUrl, pageMetadata, primaryCta, siteConfig } from "@/lib/site";
import {
  buildDirectorySections,
  mergeDirectoryApps,
} from "@/lib/directory";
import {
  getPublicDirectoryApps,
  sampleDirectoryApps,
} from "@/lib/submissions";

export const metadata: Metadata = pageMetadata({
  title: "Profile directory | Review Signal",
  description:
    "Browse Review Signal public review profiles by industry—SaaS, education, legal tools and more. Each profile links to a full review record and website.",
  path: "/apps",
});

export const dynamic = "force-dynamic";

export default async function AppsPage() {
  const { apps: liveApps, error } = await getPublicDirectoryApps();
  const curatedApps = sampleDirectoryApps();
  const allApps = mergeDirectoryApps(liveApps, curatedApps);
  const sections = buildDirectorySections(allApps);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Review Signal profile directory",
    itemListElement: allApps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: app.name,
      url: absoluteUrl(
        app.profileHref.startsWith("/apps#") ? "/apps" : app.profileHref,
      ),
    })),
  };

  return (
    <>
      <section className="section-dark premium-grain border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8">
          <FadeInSection>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A943]">
                Profile directory
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-[#F8F4EA] md:text-5xl">
                Browse reviewed products by industry.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-[#A8ADB7]">
                Every listing is a public Review Signal profile—manual review,
                visitor quote where included, and a backlink to the product
                website. Filter by category or search by name.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#A8ADB7]">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                  {allApps.length} published profiles
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                  {sections.length} industry groups
                </span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="bg-[#F5F1E8] px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {error ? (
            <div className="mb-6 rounded-[10px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#A66A2C]">
              Live listings could not be loaded—showing curated directory
              profiles. Check your database configuration.
            </div>
          ) : null}

          <ProfileDirectoryExplorer apps={allApps} sections={sections} />
        </div>
      </section>

      <section className="section-dark border-t border-white/10 px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-2xl text-[#F8F4EA] md:text-3xl">
              Want your product in the directory?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[#A8ADB7]">
              Apply for a review profile. If accepted, your product appears here
              with a public record prospects can verify.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SecondaryButton dark href="/pricing">
              View pricing
            </SecondaryButton>
            <PrimaryButton dark href={siteConfig.submitHref} className="cta-glow">
              {primaryCta}
            </PrimaryButton>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
