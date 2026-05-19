import type { LucideIcon } from "lucide-react";
import { Bot, Building2, Layers, Rocket } from "lucide-react";
import { audienceCards } from "@/lib/site";

const icons: LucideIcon[] = [Rocket, Bot, Building2, Layers];

export function AudienceGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {audienceCards.map((card, index) => {
        const Icon = icons[index] ?? Rocket;
        return (
          <article
            key={card.title}
            className="rounded-[var(--radius-card)] border border-[#E7E0D2] bg-white p-5 shadow-[var(--shadow-soft)]"
          >
            <Icon
              aria-hidden="true"
              className="text-[#D4A943]"
              size={22}
              strokeWidth={1.6}
            />
            <h3 className="mt-4 text-lg font-semibold text-[#111827]">{card.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#6B7280]">{card.copy}</p>
          </article>
        );
      })}
    </div>
  );
}
