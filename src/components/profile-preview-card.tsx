import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { ReviewedSignalPill } from "@/components/reviewed-signal-pill";
import { TrustBadge } from "@/components/trust-badge";
import { heroProfileExample } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProfilePreviewCardProps = {
  variant?: "hero" | "section";
  className?: string;
  showLink?: boolean;
};

export function ProfilePreviewCard({
  variant = "hero",
  className,
  showLink = true,
}: ProfilePreviewCardProps) {
  const data = heroProfileExample;
  const compact = variant === "section";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[var(--radius-panel)] border border-white/10 bg-[#151922] shadow-[0_32px_100px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <header className="border-b border-white/10 bg-[#1B202B] px-5 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A943]">
            Public Review Profile
          </p>
          <span className="status-published rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-0.5 text-xs font-semibold">
            {data.status}
          </span>
        </div>
      </header>

      <div className={cn("p-5", compact ? "md:p-6" : "md:p-6")}>
        <p className="text-sm text-[#A8ADB7]">{data.category}</p>
        <h3
          className={cn(
            "mt-1 font-semibold text-[#F8F4EA]",
            compact ? "text-xl" : "text-2xl",
          )}
        >
          {data.productName}
        </h3>

        {!compact ? (
          <>
            <p className="mt-4 text-sm leading-7 text-[#A8ADB7]">{data.summary}</p>
            <figure className="mt-4 rounded-[8px] border border-[#D4A943]/25 bg-[#D4A943]/5 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E7C76B]">
                Visitor quote
              </p>
              <blockquote className="mt-1 font-serif text-sm leading-6 text-[#F8F4EA]">
                &ldquo;{data.publishableQuote}&rdquo;
              </blockquote>
            </figure>
          </>
        ) : null}

        <section className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A8ADB7]">
            Reviewed signals
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.reviewedSignals.map((signal) => (
              <ReviewedSignalPill key={signal} label={signal} dark />
            ))}
          </div>
        </section>

        <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A8ADB7]">
              Review ID
            </p>
            <p className="font-mono-label mt-1 text-[#F8F4EA]">{data.reviewId}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A8ADB7]">
              Backlink
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm font-medium text-[#22C55E]">
              Visit {data.websiteLabel}
              <ExternalLink size={12} aria-hidden="true" />
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-[10px] border border-white/10 bg-[#101216] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A8ADB7]">
              Badge
            </p>
            <p className="mt-1 text-sm text-[#F8F4EA]">Reviewed by Review Signal</p>
            <p className="mt-1 text-xs text-[#A8ADB7]">Click to view profile</p>
          </div>
          <TrustBadge variant="dark" className="max-w-[200px] shrink-0" />
        </div>

        {showLink ? (
          <Link
            href="/example-review"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E7C76B] hover:text-[#F8F4EA]"
          >
            View example profile
            <ExternalLink aria-hidden="true" size={14} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
