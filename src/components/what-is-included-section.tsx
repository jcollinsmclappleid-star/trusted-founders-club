"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  includedManifestIntro,
  includedManifestTiers,
  type IncludedManifestItem,
  type IncludedTierKey,
  type ProfileHighlightZone,
} from "@/lib/included-manifest";
import { ReviewProfileLivePanel } from "@/components/review-profile-live-panel";

type WhatIsIncludedSectionProps = {
  className?: string;
};

export function WhatIsIncludedSection({ className }: WhatIsIncludedSectionProps) {
  const [tier, setTier] = useState<IncludedTierKey>("founder");
  const [activeZone, setActiveZone] = useState<ProfileHighlightZone>("overview");

  const tierData = includedManifestTiers[tier];
  const items = tierData.items as IncludedManifestItem[];

  return (
    <div className={className}>
      <div className="grid gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-start">
        <div>
          <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.2em]">
            {includedManifestIntro.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#111827] md:text-4xl">
            {includedManifestIntro.title}
          </h2>
          <p className="text-muted mt-4 max-w-md text-sm leading-[1.75] md:text-base">
            {includedManifestIntro.copy}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Package outputs"
          >
            {(Object.keys(includedManifestTiers) as IncludedTierKey[]).map((key) => {
              const selected = tier === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setTier(key);
                    const first = includedManifestTiers[key].items[0];
                    if (first) setActiveZone(first.zone);
                  }}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                    selected
                      ? "border-[#B8944E]/50 bg-[#B8944E]/15 text-[#8A6B2E]"
                      : "border-[#E7E0D2] bg-[#FFFDF7] text-[#374151] hover:border-[#B8944E]/35",
                  )}
                >
                  {includedManifestTiers[key].label}
                </button>
              );
            })}
          </div>

          <ul className="mt-6 space-y-2">
            {items.map((item) => {
              const active = activeZone === item.zone;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveZone(item.zone)}
                    onFocus={() => setActiveZone(item.zone)}
                    onClick={() => setActiveZone(item.zone)}
                    className={cn(
                      "group flex w-full gap-4 rounded-[var(--radius-card)] border px-4 py-3.5 text-left transition-all duration-200",
                      active
                        ? "border-[#B8944E]/45 bg-[#FFFDF7] shadow-[var(--shadow-soft)]"
                        : "border-transparent bg-transparent hover:border-[#E7E0D2] hover:bg-[#FFFDF7]/80",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-sm font-semibold tabular-nums transition-colors",
                        active ? "text-[#8A6B2E]" : "text-[#9CA3AF]",
                      )}
                    >
                      {item.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[#111827]">{item.title}</span>
                        {item.founderOnly ? (
                          <span className="rounded-full border border-[#B8944E]/30 bg-[#B8944E]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8A6B2E]">
                            Founder Review
                          </span>
                        ) : null}
                      </span>
                      <span className="text-secondary mt-1 block text-xs leading-5">
                        {item.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:sticky lg:top-24">
          <ReviewProfileLivePanel activeZone={activeZone} />
        </div>
      </div>
    </div>
  );
}
