import { CheckCircle2, Minus } from "lucide-react";
import { comparisonRows } from "@/lib/site";

const planNames = ["Launch Listing", "Founder Review"];

export function ComparisonTable() {
  return (
    <section className="panel-elevated overflow-hidden rounded-[var(--radius-panel)]">
      <div className="border-b border-[#E7E0D2] px-6 py-5">
        <p className="text-eyebrow text-xs font-semibold uppercase tracking-[0.18em]">
          Compare review outputs
        </p>
        <h2 className="mt-2 font-serif text-3xl text-[#111827]">
          What each accepted profile can include
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#E7E0D2] text-[#111827]">
              <th className="px-6 py-4 font-semibold">Feature</th>
              {planNames.map((plan, index) => (
                <th
                  key={plan}
                  className={`px-6 py-4 font-semibold ${index === 1 ? "bg-[#B8944E]/10" : ""}`}
                >
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(([feature, launch, founder]) => (
              <tr
                key={feature}
                className="border-b border-[#E7E0D2]/70 transition-colors last:border-0 hover:bg-[#F7F3EA]/60"
              >
                <td className="px-6 py-4 font-medium text-[#374151]">
                  {feature}
                </td>
                {[launch, founder].map((included, index) => (
                  <td
                    key={`${feature}-${index}`}
                    className={`px-6 py-4 ${index === 1 ? "bg-[#B8944E]/5" : ""}`}
                  >
                    {included ? (
                      <CheckCircle2
                        aria-label="Included"
                        className="text-[#B8944E]"
                        size={19}
                      />
                    ) : (
                      <Minus
                        aria-label="Not included"
                        className="text-[#6B7280]/55"
                        size={19}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
