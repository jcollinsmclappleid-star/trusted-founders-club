import { ArrowUpRight, Link2, MessageSquareQuote, ScanSearch } from "lucide-react";
import { heroProfileExample, homeOutcomes } from "@/lib/site";

const icons = {
  review: ScanSearch,
  quote: MessageSquareQuote,
  backlink: Link2,
} as const;

export function OutcomeShowcase() {
  const data = heroProfileExample;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {homeOutcomes.map((outcome) => {
        const Icon = icons[outcome.id];
        return (
          <article
            key={outcome.id}
            className="group relative overflow-hidden rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white shadow-[0_20px_60px_rgba(16,18,22,0.06)]"
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: outcome.accent }}
              aria-hidden="true"
            />
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex size-11 items-center justify-center rounded-[10px] border border-[#E7E0D2] bg-[#F5F1E8]"
                  style={{ color: outcome.accent }}
                >
                  <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A7324]">
                  Outcome
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#111827]">
                {outcome.title}
              </h3>
              <p className="mt-2 text-base font-medium leading-7 text-[#111827]">
                {outcome.outcome}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {outcome.detail}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E7E0D2] bg-[#F5F1E8]/60 p-4">
              {outcome.id === "review" ? (
                <div className="rounded-[8px] border border-[#E7E0D2] bg-[#0B0F17] p-3 text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4A943]">
                    Live profile
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#F8F4EA]">
                    {data.productName}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#A8ADB7]">
                    {data.summary}
                  </p>
                  <p className="font-mono-label mt-3 text-[#A8ADB7]">
                    {data.reviewId}
                  </p>
                </div>
              ) : null}

              {outcome.id === "quote" ? (
                <figure className="rounded-[8px] border border-[#E7E0D2] bg-white p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9A7324]">
                    On your landing page
                  </p>
                  <blockquote className="mt-2 font-serif text-sm leading-6 text-[#111827]">
                    &ldquo;{data.publishableQuote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[10px] text-[#6B7280]">
                    Review Signal · Profile published
                  </figcaption>
                </figure>
              ) : null}

              {outcome.id === "backlink" ? (
                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-[6px] border border-[#E7E0D2] bg-white px-2 py-1.5 font-medium text-[#374151]">
                      Profile
                    </span>
                    <span className="text-[#D4A943]">→</span>
                    <span className="inline-flex items-center gap-1 rounded-[6px] border border-[#22C55E]/30 bg-[#22C55E]/10 px-2 py-1.5 font-semibold text-[#166534]">
                      {data.websiteLabel}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                  <p className="text-[11px] leading-5 text-[#6B7280]">
                    Visitors verify the review, then follow the outbound link to
                    your site from the same page.
                  </p>
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
