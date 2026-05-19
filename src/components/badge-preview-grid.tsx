import { badgeAssets } from "@/lib/site";

const badgeVariants = [
  { label: "Standard badge", variant: "dark" as const, compact: false },
  { label: "Compact badge", variant: "dark" as const, compact: true },
  { label: "Light badge", variant: "light" as const, compact: false },
  { label: "Dark badge", variant: "dark" as const, compact: false },
];

export function BadgePreviewGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {badgeVariants.map((item, index) => (
        <figure
          key={`${item.label}-${index}`}
          className="rounded-[var(--radius-card)] border border-[#E7E0D2] bg-white p-4"
        >
          <figcaption className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A7324]">
            {item.label}
          </figcaption>
          <div className="mt-3 flex min-h-[72px] items-center justify-center rounded-[8px] bg-[#F5F1E8] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.variant === "dark" ? badgeAssets.dark : badgeAssets.light}
              alt={`${item.label} preview`}
              className={
                item.compact
                  ? "max-h-12 w-auto object-contain"
                  : "max-h-16 w-auto object-contain"
              }
            />
          </div>
          <p className="mt-2 text-xs text-[#6B7280]">Click to view profile</p>
        </figure>
      ))}
      <figure className="rounded-[var(--radius-card)] border border-[#E7E0D2] bg-[#0B0F17] p-4">
        <figcaption className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A943]">
          Icon-only mark
        </figcaption>
        <div className="mt-3 flex min-h-[72px] items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full border border-[#D4A943]/40 bg-[#151922] text-xs font-bold text-[#E7C76B]">
            RS
          </span>
        </div>
        <p className="mt-2 text-xs text-[#A8ADB7]">Links to review profile</p>
      </figure>
    </div>
  );
}
