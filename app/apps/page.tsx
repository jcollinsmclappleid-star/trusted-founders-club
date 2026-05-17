import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  Link2,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { AppDirectoryCard } from "@/components/app-directory-card";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { BentoCell, BentoGrid } from "@/components/bento-grid";
import { FeatureCard } from "@/components/feature-card";
import { FadeInSection } from "@/components/fade-in-section";
import { ContentBand, SectionHeading } from "@/components/page-shell";
import { TrustBadge } from "@/components/trust-badge";
import { absoluteUrl, pageMetadata, siteConfig } from "@/lib/site";
import {
  getPublicDirectoryApps,
  sampleDirectoryApps,
} from "@/lib/submissions";
import type { DirectoryApp } from "@/lib/submissions";

export const metadata: Metadata = pageMetadata({
  title: "Review Desk | Reviewed Apps",
  description:
    "Editorial directory of manually reviewed digital products with public records, website links and badge verification.",
  path: "/apps",
});

export const dynamic = "force-dynamic";

/** Anchor targets for in-desk profile links (fallback listings). */
function listingAnchorId(app: DirectoryApp) {
  if (app.name.includes("Bucks 11")) return "listing-bucks-11-plus";
  if (app.name.includes("11Plus Test Hub")) return "listing-11plus-test-hub";
  if (app.name.includes("EHCP Clarity")) return "listing-ehcp-clarity";
  return undefined;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function AppsPage() {
  const { apps: approvedApps, error } = await getPublicDirectoryApps();
  const usingDeskFallback = approvedApps.length === 0;
  const visibleApps = usingDeskFallback
    ? sampleDirectoryApps()
    : approvedApps.map((app) => ({ ...app }));

  const featuredApp = visibleApps[0];
  const secondaryApps = visibleApps.slice(1);
  const groupedApps = Object.values(
    secondaryApps.reduce<
      Record<string, { id: string; label: string; title: string; copy: string; apps: DirectoryApp[] }>
    >((groups, app) => {
      const label = app.directoryGroup ?? app.category;
      const id = slugify(label);
      groups[id] ??= {
        id,
        label,
        title:
          label === "Education & assessment"
            ? "Education and assessment tools"
            : `${label} tools`,
        copy:
          label === "Education & assessment"
            ? "Diagnostics, practice flows and parent-facing readiness tools where score framing and child-data language matter."
            : "Reviewed products grouped by category, with profile notes, website context and clear listing boundaries.",
        apps: [],
      };
      groups[id].apps.push(app);
      return groups;
    }, {}),
  );

  const categoryLinks = [
    ...(featuredApp
      ? [
          {
            href: "#featured-profile",
            label: featuredApp.directoryGroup ?? featuredApp.category,
          },
        ]
      : []),
    ...groupedApps.map((group) => ({
      href: `#${group.id}`,
      label: group.label,
    })),
  ];

  const itemListJsonLd = usingDeskFallback
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Reviewed apps and AI tools",
        itemListElement: visibleApps.map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: app.name,
          url: absoluteUrl(
            app.profileHref.startsWith("/apps#")
              ? "/apps"
              : app.profileHref,
          ),
        })),
      };

  return (
    <>
      <section className="editorial-glow light-grid border-b border-[#E7E0D2] px-5 py-16 text-[#111827] sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.22em]">
              The Review Desk
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] md:text-7xl">
              Browse public review records.
            </h1>
            <p className="text-muted mt-6 max-w-3xl text-lg leading-8">
              Each review profile shows what the product does, what we checked, what
              stood out, and where to visit the site—with editorial context you
              can read before you click through.
            </p>
          </div>

          <div className="dark-showcase rounded-[18px] border border-[#B8944E]/35 p-6 text-[#FFFDF7] shadow-[0_28px_90px_rgba(7,10,15,0.2)]">
            <TrustBadge compact variant="dark" href="#featured-profile" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#E6D3A3]">
              Arrived from a badge?
            </p>
            <p className="text-on-dark-muted mt-3 text-sm leading-7">
              The badge opens the same review profile you see here—editorial note,
              checks, review ID, and website link in one verified record.
            </p>
            <div className="mt-5 grid gap-3 text-sm leading-6">
              {[
                "Read the review profile before visiting the website.",
                "See what we reviewed and what stood out.",
                "Follow the site link when the product fits your needs.",
              ].map((item) => (
                <p key={item} className="flex gap-2">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#E6D3A3]"
                    size={16}
                  />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#E7E0D2] bg-[#FFFDF7] px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.2em]">
            Browse by desk section
          </p>
          <div className="flex flex-wrap gap-2">
            {categoryLinks.map((category) => (
              <a
                key={category.href}
                href={category.href}
                className="rounded-[999px] border border-[#E7E0D2] bg-[#F7F3EA] px-3.5 py-2 text-xs font-semibold text-[#111827]"
              >
                {category.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContentBand>
        {error ? (
          <div className="mb-8 rounded-[10px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#A66A2C]">
            Live Supabase data failed to load—showing curated desk inventory
            instead. Check your environment configuration.
          </div>
        ) : null}

        {featuredApp ? (
          <article
            id="featured-profile"
            className="panel-elevated scroll-mt-28 overflow-hidden rounded-[var(--radius-panel)]"
          >
            {featuredApp.screenshotSrc ? (
              <div className="border-b border-[#E7E0D2] bg-[#0B1220]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredApp.screenshotSrc}
                  alt={`${featuredApp.name} website screenshot`}
                  className="h-[280px] w-full object-cover object-top"
                />
              </div>
            ) : null}
            <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
              <div>
                <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.2em]">
                  Featured profile
                </p>
                <div className="mt-4 flex items-start gap-4">
                  {featuredApp.logoSrc ? (
                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#B8944E]/35 bg-[#0B1220] p-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featuredApp.logoSrc}
                        alt={`${featuredApp.name} logo`}
                        className="size-full rounded-[6px] object-contain"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="text-muted text-sm font-medium">
                      {featuredApp.category}
                    </p>
                    <h2 className="mt-1 font-serif text-4xl leading-tight text-[#111827] md:text-5xl">
                      {featuredApp.name}
                    </h2>
                  </div>
                </div>
                <p className="text-muted mt-5 text-base leading-8">
                  {featuredApp.featuredSummary ?? featuredApp.description}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={featuredApp.profileHref}
                    className="inline-flex h-12 items-center justify-center rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:-translate-y-0.5 hover:bg-[#111827]"
                  >
                    View Profile
                  </Link>
                  <a
                    href={featuredApp.website}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] border border-[#0B1220]/20 px-5 text-sm font-semibold text-[#0B1220] transition hover:-translate-y-0.5 hover:border-[#0B1220]/50 hover:bg-[#0B1220]/5"
                  >
                    Visit Website
                    <ExternalLink aria-hidden="true" size={16} />
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  { label: "Audience", value: featuredApp.audience },
                  { label: "Why listed", value: featuredApp.whyListed },
                  { label: "Badge meaning", value: featuredApp.badgeMeaning },
                ].map(({ label, value }) =>
                  value ? (
                    <div
                      key={label}
                      className="rounded-[10px] border border-[#E7E0D2] bg-[#F7F3EA] p-4"
                    >
                      <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.16em]">
                        {label}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#374151]">
                        {value}
                      </p>
                    </div>
                  ) : null,
                )}
                <p className="text-muted text-xs leading-5">
                  {featuredApp.complianceNote}
                </p>
              </div>
            </div>
          </article>
        ) : null}
      </ContentBand>

      <ContentBand variant="wash" className="bg-[#FFFDF7]">
        <FadeInSection>
          <BentoGrid layout="equal3">
            {[
              {
                title: "Clarity and positioning",
                copy: "Reviewed for live website access, public claims, and how clearly the product is explained.",
                Icon: SearchCheck,
              },
              {
                title: "Structured review profiles",
                copy: "Profiles show what was checked, what stood out, and who the product is for.",
                Icon: ShieldCheck,
              },
              {
                title: "Verifiable badges",
                copy: "Badges link to the published review profile so visitors can verify the review before they click through.",
                Icon: Link2,
              },
            ].map(({ title, copy, Icon }) => (
              <BentoCell key={title}>
                <FeatureCard title={title} copy={copy} Icon={Icon} />
              </BentoCell>
            ))}
          </BentoGrid>
        </FadeInSection>
      </ContentBand>

      {groupedApps.map((group, index) => (
        <ContentBand key={group.id} className={index % 2 === 0 ? "" : "bg-[#FFFDF7]"}>
          <div id={group.id} className="scroll-mt-28">
            <SectionHeading
              eyebrow={group.label}
              title={group.title}
              copy={group.copy}
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {group.apps.map((app) => (
                <AppDirectoryCard
                  key={app.name}
                  id={listingAnchorId(app)}
                  app={{
                    ...app,
                    sample: false,
                  }}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </ContentBand>
      ))}

      <section className="bg-[#070A0F] px-5 py-16 text-[#FFFDF7] sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E6D3A3]">
            Want to be considered?
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
            Apply for a Review Signal record.
          </h2>
          <p className="text-on-dark-muted mx-auto mt-5 max-w-2xl text-base leading-8">
            Accepted submissions receive a public review profile, review note, website
            link, and badge assets—published when the desk accepts the product.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <SecondaryButton dark fullMobile href="/pricing">
              Outputs and fees
            </SecondaryButton>
            <PrimaryButton dark fullMobile href={siteConfig.submitHref}>
              Request review
            </PrimaryButton>
          </div>
        </div>
      </section>

      {itemListJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      ) : null}
    </>
  );
}
