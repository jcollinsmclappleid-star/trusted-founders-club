import { Link2, MessageSquareQuote, ScanSearch } from "lucide-react";
import type { SeoValueBenefit } from "@/lib/seo-types";

const icons = [ScanSearch, MessageSquareQuote, Link2] as const;

export function OutcomeValueStrip({ benefits }: { benefits: SeoValueBenefit[] }) {
  return (
    <section className="border-b border-[#E7E0D2] bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        {benefits.map((benefit, index) => {
          const Icon = icons[index] ?? ScanSearch;
          return (
            <article
              key={benefit.title}
              className="relative overflow-hidden rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-[#F7F3EA] p-6"
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: benefit.accent }}
                aria-hidden
              />
              <div
                className="flex size-11 items-center justify-center rounded-[10px] border border-[#E7E0D2] bg-white"
                style={{ color: benefit.accent }}
              >
                <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-[#111827]">
                {benefit.title}
              </h2>
              <p className="mt-2 text-base font-medium leading-7 text-[#111827]">
                {benefit.outcome}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {benefit.detail}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
