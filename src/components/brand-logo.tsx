import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  variant?: "header" | "footer";
};

/** Wordmark aligned to the Review Signal lockup: shield mark + serif title + gold tagline. */
export function BrandLogo({ className, variant = "header" }: BrandLogoProps) {
  const compact = variant === "header";
  const gradId = compact
    ? "brand-logo-gradient-header"
    : "brand-logo-gradient-footer";

  return (
    <span
      className={cn(
        "inline-flex min-w-0 select-none items-center gap-2.5 sm:gap-3",
        className,
      )}
    >
      <svg
        className={cn(
          "shrink-0",
          compact ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11",
        )}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="8"
            y1="6"
            x2="42"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F5ECD4" />
            <stop offset="0.45" stopColor="#D4B678" />
            <stop offset="1" stopColor="#9A7840" />
          </linearGradient>
        </defs>
        <path
          d="M24 5.5L38 11.2V29.4C38 35.2 33.1 40.8 24 42.5C14.9 40.8 10 35.2 10 29.4V11.2L24 5.5Z"
          stroke={`url(#${gradId})`}
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 23.5L21.8 28.3L31.2 17.8"
          stroke="#FFFDF7"
          strokeWidth="2.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 33.5C19.2 31.7 21.6 30.6 24 30.6C26.4 30.6 28.8 31.7 31 33.5"
          stroke={`url(#${gradId})`}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M15 36.5C17.8 33.9 20.9 32.4 24 32.4C27.1 32.4 30.2 33.9 33 36.5"
          stroke={`url(#${gradId})`}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate font-serif font-semibold leading-[1.05] tracking-[0.01em] text-[#FFFDF7]",
            compact ? "text-[15px] sm:text-[17px]" : "text-xl sm:text-[22px]",
          )}
        >
          Review Signal
        </span>
        <span
          className={cn(
            "mt-0.5 block font-sans text-[#E6D3A3]",
            compact
              ? "hidden text-[8px] uppercase tracking-[0.15em] text-[#E6D3A3]/90 sm:block"
              : "text-[9px] uppercase tracking-[0.16em]",
          )}
        >
          Build credibility · Support conversion
        </span>
      </span>
    </span>
  );
}
