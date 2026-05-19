"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, Search } from "lucide-react";
import { AppDirectoryCard } from "@/components/app-directory-card";
import type { DirectoryApp } from "@/lib/submissions";
import {
  directoryIndustries,
  resolveIndustryId,
  type DirectorySection,
} from "@/lib/directory";
import { cn } from "@/lib/utils";

type ProfileDirectoryExplorerProps = {
  apps: DirectoryApp[];
  sections: DirectorySection[];
};

export function ProfileDirectoryExplorer({
  apps,
  sections,
}: ProfileDirectoryExplorerProps) {
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [query, setQuery] = useState("");

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((app) => {
      const matchesQuery =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q);
      const matchesIndustry =
        activeIndustry === "all" || resolveIndustryId(app) === activeIndustry;
      return matchesQuery && matchesIndustry;
    });
  }, [apps, query, activeIndustry]);

  const visibleSections = useMemo(() => {
    if (activeIndustry !== "all") {
      const industry = directoryIndustries.find((i) => i.id === activeIndustry);
      if (!industry) return [];
      return [{ industry, apps: filteredApps }];
    }
    if (query.trim()) {
      return [
        {
          industry: directoryIndustries[0],
          apps: filteredApps,
        },
      ];
    }
    return sections
      .map((section) => ({
        ...section,
        apps: section.apps.filter((app) =>
          filteredApps.some((f) => f.name === app.name),
        ),
      }))
      .filter((s) => s.apps.length > 0);
  }, [activeIndustry, filteredApps, query, sections]);

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: apps.length };
    for (const section of sections) {
      counts[section.industry.id] = section.apps.length;
    }
    return counts;
  }, [apps.length, sections]);

  return (
    <div className="space-y-8">
      <div className="rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white p-4 shadow-[0_16px_50px_rgba(16,18,22,0.05)] md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9A7324]"
              size={18}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories…"
              className="h-11 w-full rounded-[10px] border border-[#E7E0D2] bg-[#F5F1E8]/50 pl-10 pr-4 text-sm text-[#111827] outline-none transition focus:ring-2 focus:ring-[#D4A943]"
              aria-label="Search directory profiles"
            />
          </div>
          <p className="flex items-center gap-2 text-sm text-[#6B7280]">
            <LayoutGrid size={16} className="text-[#D4A943]" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-[#111827]">
                {filteredApps.length}
              </strong>{" "}
              profile{filteredApps.length === 1 ? "" : "s"}
              {activeIndustry !== "all" ? " in this category" : ""}
            </span>
          </p>
        </div>

        <div
          className="mt-4 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Filter by industry"
        >
          {directoryIndustries.map((industry) => {
            const count = industryCounts[industry.id] ?? 0;
            if (industry.id !== "all" && count === 0) return null;
            const active = activeIndustry === industry.id;
            return (
              <button
                key={industry.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveIndustry(industry.id)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition",
                  active
                    ? "border-[#D4A943] bg-[#0B0F17] text-[#F8F4EA]"
                    : "border-[#E7E0D2] bg-[#F5F1E8] text-[#374151] hover:border-[#D4A943]/50",
                )}
              >
                {industry.label}
                <span className="ml-1.5 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {visibleSections.length === 0 ? (
        <div className="rounded-[var(--radius-panel)] border border-dashed border-[#E7E0D2] bg-white p-12 text-center">
          <p className="text-lg font-semibold text-[#111827]">No profiles found</p>
          <p className="mt-2 text-sm text-[#6B7280]">
            Try a different search term or category filter.
          </p>
        </div>
      ) : (
        visibleSections.map((section) => (
          <IndustrySection
            key={section.industry.id}
            section={section}
            showHeader={activeIndustry === "all" && !query.trim()}
          />
        ))
      )}
    </div>
  );
}

function profileCardAnchorId(app: DirectoryApp) {
  const hash = app.profileHref.split("#")[1];
  return hash || undefined;
}

function IndustrySection({
  section,
  showHeader,
}: {
  section: DirectorySection;
  showHeader: boolean;
}) {
  return (
    <section
      id={`industry-${section.industry.id}`}
      className="scroll-mt-32 rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white p-5 md:p-8"
    >
      {showHeader ? (
        <header className="mb-8 max-w-2xl border-b border-[#E7E0D2] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A943]">
            {section.industry.label}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#111827] md:text-3xl">
            {section.apps.length} reviewed{" "}
            {section.apps.length === 1 ? "product" : "products"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#6B7280]">
            {section.industry.description}
          </p>
        </header>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {section.apps.map((app) => (
          <AppDirectoryCard
            key={app.name}
            app={app}
            variant="compact"
            id={profileCardAnchorId(app)}
          />
        ))}
      </div>
    </section>
  );
}
