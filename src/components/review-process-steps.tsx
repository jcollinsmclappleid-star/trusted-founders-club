import { reviewProcessSteps } from "@/lib/site";

export function ReviewProcessSteps() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {reviewProcessSteps.map((step) => (
        <li
          key={step.step}
          className="process-connector rounded-[var(--radius-card)] border border-[#E7E0D2] bg-white p-5"
        >
          <p className="font-mono-label text-[#D4A943]">{step.step}</p>
          <h3 className="mt-3 text-lg font-semibold text-[#111827]">{step.title}</h3>
          <p className="mt-2 text-sm leading-7 text-[#6B7280]">{step.copy}</p>
        </li>
      ))}
    </ol>
  );
}
