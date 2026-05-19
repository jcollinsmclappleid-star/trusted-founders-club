import { ArrowRight, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { homeProcessFlow } from "@/lib/site";

const visitorSteps = [
  { label: "Sees your badge", sub: "On site or email" },
  { label: "Opens profile", sub: "Reads review + quote" },
  { label: "Clicks through", sub: "Backlink to your site" },
];

export function ReviewJourneyFlow() {
  return (
    <div className="space-y-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7324]">
          For your prospects
        </p>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-stretch">
          {visitorSteps.map((step, index) => (
            <div key={step.label} className="flex flex-1 items-center gap-3 md:gap-4">
              <div className="flex flex-1 flex-col rounded-[12px] border border-[#E7E0D2] bg-gradient-to-br from-white to-[#F5F1E8] p-4 shadow-sm">
                <MousePointerClick
                  aria-hidden="true"
                  className="text-[#D4A943]"
                  size={18}
                />
                <p className="mt-3 text-sm font-semibold text-[#111827]">
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">{step.sub}</p>
              </div>
              {index < visitorSteps.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="hidden shrink-0 text-[#D4A943] md:block"
                  size={20}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div id="how-it-works">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7324]">
          For you
        </p>
        <div className="relative mt-5">
          <div
            className="absolute left-8 right-8 top-6 hidden h-0.5 bg-gradient-to-r from-[#D4A943]/20 via-[#D4A943] to-[#D4A943]/20 md:block"
            aria-hidden="true"
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {homeProcessFlow.map((step, index) => (
              <li key={step.label} className="relative">
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-[#D4A943] bg-white text-sm font-bold text-[#9A7324] shadow-[0_0_0_6px_#F5F1E8]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#111827]">
                  {step.label}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 text-sm text-[#6B7280]">
          Full packages and pricing on{" "}
          <Link
            href="/pricing"
            className="font-semibold text-[#9A7324] underline decoration-[#D4A943] underline-offset-4"
          >
            the pricing page
          </Link>
          . Payment covers the review process—not a guaranteed positive review.
        </p>
      </div>
    </div>
  );
}
