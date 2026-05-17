"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TrustBadge } from "@/components/trust-badge";
import { exampleApp } from "@/lib/site";
import type { ProfileHighlightZone } from "@/lib/included-manifest";
import { cn } from "@/lib/utils";

type ReviewProfileLivePanelProps = {
  activeZone?: ProfileHighlightZone | null;
  className?: string;
  showLiveLabel?: boolean;
};

const zones: ProfileHighlightZone[] = [
  "overview",
  "summary",
  "editorial",
  "trust",
  "website",
  "badge",
  "directory",
  "metadata",
];

function Zone({
  zone,
  activeZone,
  children,
  className,
}: {
  zone: ProfileHighlightZone;
  activeZone?: ProfileHighlightZone | null;
  children: React.ReactNode;
  className?: string;
}) {
  const active = activeZone === zone;

  return (
    <div
      data-zone={zone}
      className={cn(
        "rounded-[10px] border border-transparent px-3 py-2.5 transition-all duration-300",
        active &&
          "border-[#B8944E]/50 bg-[#B8944E]/10 shadow-[0_0_0_1px_rgba(184,148,78,0.2),0_12px_40px_rgba(184,148,78,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ReviewProfileLivePanel({
  activeZone = "overview",
  className,
  showLiveLabel = true,
}: ReviewProfileLivePanelProps) {
  const initials = exampleApp.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className={cn("relative", className)}>
      {showLiveLabel ? (
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em]">
            Live profile preview
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4F7F63]/35 bg-[#4F7F63]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4F7F63]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4F7F63] opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#4F7F63]" />
            </span>
            Example record
          </span>
        </div>
      ) : null}

      <div className="browser-frame overflow-hidden shadow-[var(--shadow-lift)]">
        <div className="browser-frame-chrome">
          <span className="browser-frame-dot" />
          <span className="browser-frame-dot" />
          <span className="browser-frame-dot" />
          <span className="ml-2 truncate font-mono text-[10px] text-[#6B7280]">
            reviewsignal.com/example-review
          </span>
        </div>

        <div className="space-y-3 bg-[#FFFDF7] p-4">
          <Zone zone="directory" activeZone={activeZone}>
            <p className="text-eyebrow text-[10px] font-semibold uppercase tracking-[0.16em]">
              {exampleApp.category}
            </p>
          </Zone>

          <Zone zone="overview" activeZone={activeZone} className="!px-0">
            <div className="flex items-start gap-3 px-1">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-[#B8944E]/35 bg-[#0B1220] text-sm font-semibold text-[#E6D3A3]">
                {initials}
              </div>
              <div>
                <p className="font-semibold text-[#111827]">{exampleApp.name}</p>
                <p className="text-muted mt-1 text-xs leading-5">
                  {exampleApp.shortDescription.slice(0, 120)}…
                </p>
              </div>
            </div>
          </Zone>

          <Zone zone="summary" activeZone={activeZone}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A6B2E]">
              Service summary
            </p>
            <p className="text-secondary mt-1 text-xs leading-5">
              Calculator · England &amp; Wales · Financial modelling
            </p>
          </Zone>

          <Zone zone="editorial" activeZone={activeZone}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A6B2E]">
              Editorial note
            </p>
            <p className="mt-1 font-serif text-sm leading-6 text-[#111827]">
              &quot;{exampleApp.quote.slice(0, 100)}…&quot;
            </p>
          </Zone>

          <Zone zone="trust" activeZone={activeZone}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A6B2E]">
              What we checked
            </p>
            <ul className="text-secondary mt-1 space-y-1 text-xs leading-5">
              {exampleApp.checkedItems.slice(0, 2).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </Zone>

          <Zone zone="metadata" activeZone={activeZone}>
            <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-[#374151]">
              <p>
                <span className="text-eyebrow block uppercase tracking-[0.12em]">
                  Review ID
                </span>
                {exampleApp.reviewId}
              </p>
              <p>
                <span className="text-eyebrow block uppercase tracking-[0.12em]">
                  Reviewed
                </span>
                {exampleApp.reviewedDate}
              </p>
            </div>
          </Zone>

          <Zone zone="website" activeZone={activeZone}>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#111827]">Visit website</span>
              <ExternalLink size={13} className="text-[#8A6B2E]" aria-hidden="true" />
            </div>
          </Zone>

          <Zone
            zone="badge"
            activeZone={activeZone}
            className="dark-showcase !border-[#B8944E]/40 !bg-[#0B1220]"
          >
            <TrustBadge compact variant="dark" href="/example-review" />
            <p className="text-on-dark-muted mt-2 text-[10px] uppercase tracking-[0.14em]">
              Opens this profile
            </p>
          </Zone>
        </div>

        <div className="border-t border-[#E7E0D2] bg-[#F7F3EA]/80 px-4 py-2.5">
          <Link
            href="/example-review"
            className="text-xs font-semibold text-[#0B1220] underline decoration-[#B8944E] underline-offset-4"
          >
            Open full example profile →
          </Link>
        </div>
      </div>

      <div className="sr-only">
        {zones.map((z) => (
          <span key={z}>{z}</span>
        ))}
      </div>
    </div>
  );
}
