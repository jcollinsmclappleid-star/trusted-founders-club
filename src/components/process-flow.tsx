import type { LucideIcon } from "lucide-react";
import { HoverLift } from "@/components/hover-lift";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  copy: string;
  focus?: string;
  Icon?: LucideIcon;
};

export function ProcessFlow({
  steps,
  compact = false,
  className,
}: {
  steps: ProcessStep[];
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4",
        compact ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-none",
        !compact &&
          steps.length === 3 &&
          "lg:grid-cols-3",
        !compact &&
          steps.length === 4 &&
          "lg:grid-cols-4",
        className,
      )}
    >
      {steps.map((step, index) => (
        <HoverLift
          key={step.title}
          as="article"
          className={cn(
            "process-connector panel-elevated flex h-full flex-col rounded-[var(--radius-card)] border border-[#E7E0D2] p-5",
            !compact && "lg:min-w-0",
          )}
        >
            <div className="flex items-center justify-between gap-3">
              {step.Icon ? (
                <span className="flex size-10 items-center justify-center rounded-[8px] border border-[#B8944E]/30 bg-[#B8944E]/10 text-[#8A6B2E]">
                  <step.Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
              ) : (
                <span className="flex size-10 items-center justify-center rounded-[8px] border border-[#B8944E]/30 bg-[#B8944E]/10 text-sm font-semibold text-[#8A6B2E]">
                  {index + 1}
                </span>
              )}
              <span className="text-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em]">
                Step {index + 1}
              </span>
            </div>
            <h3
              className={cn(
                "mt-4 font-semibold text-[#111827]",
                compact ? "text-sm" : "text-base",
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                "text-muted mt-2 leading-7",
                compact ? "text-xs" : "text-sm",
              )}
            >
              {step.copy}
            </p>
            {step.focus ? (
              <p
                className={cn(
                  "mt-4 rounded-[8px] bg-[#F7F3EA]/90 px-3 py-2.5 text-[#374151]",
                  compact ? "text-xs leading-5" : "text-xs leading-6",
                )}
              >
                {step.focus}
              </p>
            ) : null}
        </HoverLift>
      ))}
    </div>
  );
}
