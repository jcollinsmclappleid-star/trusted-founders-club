import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { exampleApp } from "@/lib/site";
import { SecondaryButton } from "@/components/buttons";
import { TrustBadge } from "@/components/trust-badge";

export function ProfilePreviewCard() {
  const initials = exampleApp.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <article className="overflow-hidden rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] shadow-[0_28px_80px_rgba(7,10,15,0.12)]">
      <div className="border-b border-[#E7E0D2] bg-[#F7F3EA] px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
            Live desk profile · Divorce Calculator UK
          </p>
          <span className="rounded-[6px] border border-[#B8944E]/35 bg-[#B8944E]/10 px-2.5 py-1 text-xs font-semibold text-[#7A5D2D]">
            Review Published
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-[8px] border border-[#B8944E]/35 bg-[#0B1220] text-lg font-semibold text-[#E6D3A3]">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-[#6B7280]">
              {exampleApp.category}
            </p>
            <h3 className="mt-1 font-serif text-3xl text-[#111827]">
              {exampleApp.name}
            </h3>
          </div>
        </div>

        <p className="mt-5 text-base leading-7 text-[#4B5563]">
          {exampleApp.shortDescription}
        </p>

        <div className="mt-6 rounded-[8px] border border-[#E7E0D2] bg-white/55 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8944E]">
            Review excerpt
          </p>
          <p className="mt-3 font-serif text-lg leading-7 text-[#111827]">
            &quot;{exampleApp.quote}&quot;
          </p>
        </div>

        <div className="mt-6 grid gap-3 border-y border-[#E7E0D2] py-5 text-sm text-[#6B7280] sm:grid-cols-3">
          {[
            ["Review ID", exampleApp.reviewId],
            ["Review note", exampleApp.reviewedDate],
            ["Status", "Review Published"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs uppercase tracking-[0.14em] text-[#B8944E]">
                {label}
              </p>
              <p className="mt-1 font-medium text-[#111827]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="dark-showcase rounded-[12px] border border-[#B8944E]/30 p-2">
            <TrustBadge compact href="/example-review" />
          </span>
          <SecondaryButton href="/example-review" className="sm:h-11">
            Open editorial profile
          </SecondaryButton>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#6B7280]">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-[#B8944E]" />
            Website reviewed for listing context
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ExternalLink size={16} className="text-[#6C8DBF]" />
            Website link included
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ArrowUpRight size={16} className="text-[#B8944E]" />
            Click-to-verify badge
          </span>
        </div>
      </div>
    </article>
  );
}
