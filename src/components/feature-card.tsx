import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { HoverLift } from "@/components/hover-lift";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  copy: string;
  Icon?: LucideIcon;
  variant?: "default" | "emphasis" | "compact";
  footer?: ReactNode;
  step?: string | number;
  className?: string;
  lift?: boolean;
};

export function FeatureCard({
  title,
  copy,
  Icon,
  variant = "default",
  footer,
  step,
  className,
  lift = true,
}: FeatureCardProps) {
  const body = (
    <article
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-card)] border p-5 md:p-6",
        variant === "default" && "panel-elevated border-[#E7E0D2]",
        variant === "emphasis" &&
          "border-[#B8944E]/35 bg-gradient-to-br from-[#FFFDF7] via-[#FFFDF7] to-[#F7F3EA] shadow-[var(--shadow-soft)] accent-edge",
        variant === "compact" && "panel-elevated border-[#E7E0D2] p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {Icon ? (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-[#B8944E]/30 bg-[#B8944E]/10 text-[#8A6B2E]">
            <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
          </span>
        ) : null}
        {step !== undefined ? (
          <span className="font-serif text-2xl text-[#E7E0D2]">
            {String(step).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3
        className={cn(
          "font-semibold text-[#111827]",
          variant === "compact" ? "mt-3 text-sm" : "mt-5 text-base md:text-lg",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-muted mt-2 flex-1 leading-7",
          variant === "compact" ? "text-xs" : "text-sm",
        )}
      >
        {copy}
      </p>
      {footer ? <div className="mt-4 border-t border-[#E7E0D2]/80 pt-4">{footer}</div> : null}
    </article>
  );

  if (!lift) return body;
  return <HoverLift>{body}</HoverLift>;
}
