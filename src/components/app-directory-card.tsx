import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { HoverLift } from "@/components/hover-lift";
import { PillChip } from "@/components/pill-chip";
import { TrustBadge } from "@/components/trust-badge";
import { cn } from "@/lib/utils";

export type EditorialDirectoryCardApp = {
  initials: string;
  name: string;
  category: string;
  description: string;
  quote: string;
  website: string;
  logoSrc?: string;
  screenshotSrc?: string;
  profileHref: string;
  reviewedDate?: string;
  statusLabel?: string;
  sample?: boolean;
  reviewDeskNote?: string;
  checkedFor?: string[];
  complianceNote?: string;
};

type AppDirectoryCardProps = {
  app: EditorialDirectoryCardApp;
  featured?: boolean;
  id?: string;
  variant?: "standard" | "compact";
};

function BrowserScreenshot({
  src,
  alt,
  compact,
}: {
  src: string;
  alt: string;
  compact: boolean;
}) {
  return (
    <div className="browser-frame screenshot-zoom mb-5">
      <div className="browser-frame-chrome" aria-hidden="true">
        <span className="browser-frame-dot" />
        <span className="browser-frame-dot" />
        <span className="browser-frame-dot" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          "w-full object-cover object-top",
          compact ? "h-32" : "h-44",
        )}
      />
    </div>
  );
}

export function AppDirectoryCard({
  app,
  featured,
  id,
  variant = "standard",
}: AppDirectoryCardProps) {
  const status = app.sample
    ? "Example"
    : (app.statusLabel ?? "Review Published");
  const compact = variant === "compact";

  const card = (
    <article
      id={id}
      className={cn(
        "flex h-full scroll-mt-28 flex-col rounded-[var(--radius-card)] border border-[#E7E0D2] bg-[#FFFDF7] p-5",
        featured
          ? "shadow-[var(--shadow-lift)]"
          : "shadow-[var(--shadow-soft)]",
      )}
    >
      {featured ? (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <PillChip variant="gold">Listed on Review Desk</PillChip>
          <PillChip variant="outline">Editorial pick</PillChip>
        </div>
      ) : null}

      {app.screenshotSrc ? (
        <BrowserScreenshot
          src={app.screenshotSrc}
          alt={`${app.name} website screenshot`}
          compact={compact}
        />
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {app.logoSrc ? (
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#B8944E]/35 bg-[#0B1220] p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={app.logoSrc}
                alt={`${app.name} logo`}
                loading="lazy"
                className="size-full rounded-[6px] object-contain"
              />
            </div>
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-[#B8944E]/35 bg-[#0B1220] text-sm font-semibold text-[#E6D3A3]">
              {app.initials}
            </div>
          )}
          <div>
            <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.16em]">
              {app.category}
            </p>
            <h2 className="mt-1 font-serif text-2xl leading-tight text-[#111827]">
              {app.name}
            </h2>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#B8944E]/35 bg-[#B8944E]/10 px-2.5 py-1 text-xs font-semibold text-[#8A6B2E]">
          <ShieldCheck aria-hidden="true" size={14} strokeWidth={1.8} />
          {status}
        </span>
      </div>

      <p className="text-muted mt-4 text-sm leading-7">{app.description}</p>

      {featured && app.reviewDeskNote ? (
        <p className="text-secondary mt-3 text-xs font-semibold uppercase tracking-[0.12em]">
          What it demonstrates
        </p>
      ) : null}

      {app.reviewDeskNote ? (
        <p className="mt-2 border-l-2 border-[#B8944E] pl-4 text-sm font-medium italic leading-7 text-[#111827]">
          {app.reviewDeskNote}
        </p>
      ) : null}

      <div className="text-muted mt-5 grid gap-3 border-y border-[#E7E0D2] py-4 text-xs uppercase tracking-[0.13em] sm:grid-cols-2">
        <p>
          <span className="text-eyebrow">Listing status</span>
          <span className="mt-1 block text-[11px] font-semibold normal-case tracking-normal text-[#111827]">
            {status}
          </span>
        </p>
        <p>
          <span className="text-eyebrow">Reviewed</span>
          <span className="mt-1 block text-[11px] font-semibold normal-case tracking-normal text-[#111827]">
            {app.reviewedDate ??
              (app.sample ? "Illustrative profile" : "See profile")}
          </span>
        </p>
      </div>

      {!compact && app.checkedFor?.length ? (
        <div className="mt-4">
          <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.14em]">
            What we checked
          </p>
          <ul className="text-secondary mt-2 space-y-1.5 text-sm leading-6">
            {app.checkedFor.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-semibold text-[#B8944E]">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!compact ? (
        <div className="mt-5 flex-1 rounded-[10px] bg-[#F7F3EA]/90 px-4 py-4">
          <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.16em]">
            Review excerpt
          </p>
          <p className="mt-3 font-serif text-base leading-7 text-[#111827]">
            &quot;{app.quote}&quot;
          </p>
        </div>
      ) : null}

      {!compact && app.complianceNote ? (
        <p className="text-muted mt-3 text-xs leading-5">{app.complianceNote}</p>
      ) : null}

      <div className="mt-5 grid gap-4 border-t border-[#E7E0D2] pt-5">
        <div className="dark-showcase badge-shine rounded-[14px] border border-[#B8944E]/35 p-3">
          <TrustBadge
            compact={compact}
            variant="dark"
            href={app.profileHref}
          />
          <p className="text-on-dark-muted mt-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
            Opens your public review record
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={app.profileHref}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-[8px] border border-[#0B1220]/20 px-3 text-xs font-semibold text-[#0B1220] transition hover:border-[#0B1220]/50 hover:bg-[#0B1220]/5"
          >
            View profile
          </Link>
          <a
            href={app.website}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-[8px] bg-[#0B1220] px-3 text-xs font-semibold text-[#FFFDF7] transition hover:bg-[#111827]"
          >
            Visit website
            <ExternalLink aria-hidden="true" size={14} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  );

  if (featured) {
    return <HoverLift className="h-full">{card}</HoverLift>;
  }

  return card;
}


