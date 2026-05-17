import { badgeAssets, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type TrustBadgeProps = {
  href?: string;
  compact?: boolean;
  /** Dark is the primary badge. Light remains available for very pale embeds. */
  variant?: "light" | "dark";
  className?: string;
};

export function TrustBadge({
  href,
  compact,
  variant = "dark",
  className,
}: TrustBadgeProps) {
  const src = variant === "dark" ? badgeAssets.dark : badgeAssets.light;
  const label = `${siteConfig.name} verification badge - click to verify listing`;

  const badge = (
    <span className={cn("inline-block leading-none", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- raster brand artwork with fluid sizing */}
      <img
        src={src}
        alt={label}
        className={cn(
          "h-auto w-auto max-w-full object-contain object-left drop-shadow-[0_16px_38px_rgba(7,10,15,0.18)]",
          variant === "dark"
            ? compact
              ? "max-h-20 sm:max-h-24"
              : "max-h-32 sm:max-h-40"
            : compact
              ? "max-h-12 sm:max-h-14"
              : "max-h-16 sm:max-h-20",
        )}
        loading="lazy"
        decoding="async"
      />
    </span>
  );

  if (!href) {
    return badge;
  }

  return (
    <a
      href={href}
      className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8944E]/80"
      aria-label={`Verify on ${siteConfig.name}`}
    >
      {badge}
    </a>
  );
}
