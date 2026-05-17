import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoLayout = "equal3" | "featureLeft" | "featureRight" | "twoCol";

export function BentoGrid({
  children,
  layout = "equal3",
  className,
}: {
  children: ReactNode;
  layout?: BentoLayout;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 md:gap-5",
        layout === "equal3" && "md:grid-cols-3",
        layout === "featureLeft" &&
          "md:grid-cols-2 md:grid-rows-2 lg:grid-cols-[1.2fr_1fr]",
        layout === "featureRight" &&
          "md:grid-cols-2 md:grid-rows-2 lg:grid-cols-[1fr_1.2fr]",
        layout === "twoCol" && "md:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCell({
  children,
  className,
  span = "default",
}: {
  children: ReactNode;
  className?: string;
  span?: "default" | "tall" | "wide";
}) {
  return (
    <div
      className={cn(
        "min-h-0",
        span === "tall" && "md:row-span-2",
        span === "wide" && "md:col-span-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
