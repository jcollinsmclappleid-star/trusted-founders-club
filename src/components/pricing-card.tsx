import { CheckCircle2 } from "lucide-react";
import { HoverLift } from "@/components/hover-lift";
import { PillChip } from "@/components/pill-chip";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  plan: {
    name: string;
    price: string;
    badge?: string;
    recommendedLabel?: string;
    tierHint?: string;
    description: string;
    cta: string;
    featured: boolean;
    includes: string[];
  };
};

export function PricingCard({ plan }: PricingCardProps) {
  const Button = plan.featured ? PrimaryButton : SecondaryButton;

  return (
    <HoverLift
      as="article"
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-panel)] border bg-[#FFFDF7] p-6 md:p-7",
        plan.featured
          ? "z-[1] scale-[1.01] border-[#B8944E] shadow-[var(--shadow-glow-gold)] ring-1 ring-[#B8944E]/40 md:-mt-1 md:mb-1"
          : "border-[#E7E0D2] shadow-[var(--shadow-soft)]",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        {plan.tierHint ? (
          <PillChip variant={plan.featured ? "gold" : "outline"}>
            {plan.tierHint}
          </PillChip>
        ) : (
          <span />
        )}
        {plan.featured && plan.recommendedLabel ? (
          <PillChip variant="gold">{plan.recommendedLabel}</PillChip>
        ) : plan.badge ? (
          <PillChip variant="gold">{plan.badge}</PillChip>
        ) : null}
      </div>

      <div className="mt-5">
        <h3 className="font-serif text-2xl text-[#111827] md:text-3xl">
          {plan.name}
        </h3>
        <p className="text-muted mt-3 max-w-sm text-sm leading-6">
          {plan.description}
        </p>
      </div>

      <div className="mt-8 flex items-end gap-2 border-b border-[#E7E0D2] pb-6">
        <span className="font-serif text-5xl leading-none text-[#111827]">
          {plan.price}
        </span>
        <span className="text-muted pb-1 text-sm font-medium">one-off</span>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-2.5">
        {plan.includes.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-b border-[#E7E0D2]/60 py-2.5 text-sm leading-6 text-[#374151] last:border-0"
          >
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[#8A6B2E]"
              size={17}
              strokeWidth={1.8}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {plan.featured ? (
        <p className="text-eyebrow mt-5 text-xs uppercase tracking-[0.14em]">
          Badge, quote, and full verification metadata
        </p>
      ) : null}

      <Button
        href={siteConfig.submitHref}
        className={cn("mt-8", plan.featured && "cta-glow")}
        fullMobile
      >
        {plan.cta}
      </Button>
    </HoverLift>
  );
}
