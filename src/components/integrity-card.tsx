import { CheckCircle2, XCircle } from "lucide-react";
import { integrityDoItems, integrityDontItems } from "@/lib/site";

export function IntegrityCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card-elevated rounded-[var(--radius-panel)] bg-[#1B202B] p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A943]">
          What Review Signal does
        </p>
        <ul className="mt-4 space-y-3">
          {integrityDoItems.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-7 text-[#F8F4EA]">
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#22C55E]"
                size={16}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[var(--radius-panel)] border border-[#E7E0D2] bg-white p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7324]">
          What Review Signal does not do
        </p>
        <ul className="mt-4 space-y-3">
          {integrityDontItems.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-7 text-[#374151]">
              <XCircle
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#6B7280]"
                size={16}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
