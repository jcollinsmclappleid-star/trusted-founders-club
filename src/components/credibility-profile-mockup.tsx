import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { exampleApp } from "@/lib/site";
import { PillChip } from "@/components/pill-chip";
import { TrustBadge } from "@/components/trust-badge";
import { cn } from "@/lib/utils";

const trustHighlights = [
  { label: "Manual review completed", Icon: CheckCircle2 },
  { label: `Review ID · ${exampleApp.reviewId}`, Icon: FileText },
  { label: exampleApp.reviewedDate, Icon: Clock3 },
];

type CredibilityProfileMockupProps = {
  variant?: "full" | "compact";
  className?: string;
};

export function CredibilityProfileMockup({
  variant = "full",
  className,
}: CredibilityProfileMockupProps) {
  const initials = exampleApp.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const compact = variant === "compact";

  return (
    <div className={cn("relative", className)}>
      {!compact ? (
        <>
          <div className="absolute -left-8 top-14 hidden h-28 w-28 rounded-full border border-[#B8944E]/30 lg:block" />
          <div className="absolute -right-7 bottom-14 hidden h-24 w-24 rounded-full border border-[#6C8DBF]/25 lg:block" />
        </>
      ) : null}

      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-panel)] border border-white/10 bg-[#101827] shadow-[0_34px_100px_rgba(0,0,0,0.38)]",
          compact ? "p-3" : "p-4",
        )}
      >
        <div className="panel-glass-lite rounded-[12px] border border-[#E7E0D2] bg-[#FFFDF7] p-4 md:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E7E0D2] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-[#B8944E]/35 bg-[#0B1220] font-semibold text-[#E6D3A3]">
                {initials}
              </div>
              <div>
                <PillChip variant="gold">{exampleApp.category}</PillChip>
                <p
                  className={cn(
                    "mt-2 font-semibold text-[#111827]",
                    compact ? "text-base" : "text-lg",
                  )}
                >
                  {exampleApp.name}
                </p>
              </div>
            </div>
            <PillChip variant="gold">Review Published</PillChip>
          </div>

          {!compact ? (
            <p className="text-muted mt-4 text-sm leading-7">
              {exampleApp.shortDescription}
            </p>
          ) : null}

          <div className="accent-edge-top mt-4 rounded-[10px] bg-[#F7F3EA]/80 p-4">
            <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.16em]">
              Editorial review excerpt
            </p>
            <p className="mt-2 font-serif text-base leading-7 text-[#111827] md:text-lg">
              &quot;{exampleApp.quote}&quot;
            </p>
          </div>

          <div
            className={cn(
              "mt-4 grid gap-2",
              compact ? "grid-cols-1" : "sm:grid-cols-3",
            )}
          >
            {trustHighlights.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-start gap-2 rounded-[8px] border border-[#E7E0D2]/90 bg-white/80 px-3 py-2.5"
              >
                <Icon
                  aria-hidden="true"
                  size={16}
                  className="mt-0.5 shrink-0 text-[#8A6B2E]"
                  strokeWidth={1.8}
                />
                <span className="text-xs font-medium leading-5 text-[#374151]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-[8px] border border-[#E7E0D2] bg-white px-3 py-2.5 text-xs">
            <span className="text-eyebrow font-semibold uppercase tracking-[0.14em]">
              Website link on profile
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#0B1220]">
              Visit site
              <ExternalLink size={13} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div
          className={cn(
            "badge-shine mt-3 flex flex-col gap-3 rounded-[10px] border border-[#B8944E]/25 bg-[#070A0F] p-3 sm:flex-row sm:items-center sm:justify-between",
            compact && "mt-2",
          )}
        >
          <TrustBadge compact variant="dark" href="/example-review" />
          <p className="text-on-dark-muted flex items-center gap-2 text-xs">
            <ShieldCheck
              aria-hidden="true"
              size={15}
              className="shrink-0 text-[#B8944E]"
            />
            Opens the published review profile
          </p>
        </div>

        {!compact ? (
          <p className="text-on-dark-muted mt-3 text-[11px] leading-5">
            Review Signal supports credibility and discoverability. It does not
            guarantee rankings, traffic, or enquiries.
          </p>
        ) : null}
      </div>
    </div>
  );
}
