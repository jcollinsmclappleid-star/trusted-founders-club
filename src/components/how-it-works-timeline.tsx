import { CheckCircle2, FileText, Send, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Submit your app",
    copy: "Share your app, founder context and selected package.",
    Icon: Send,
  },
  {
    title: "We review it manually",
    copy: "A real person checks the product and listing suitability.",
    Icon: ShieldCheck,
  },
  {
    title: "Approved listings go live",
    copy: "Your profile is published if the app meets the standards.",
    Icon: FileText,
  },
  {
    title: "Add your badge and quote",
    copy: "Use the review assets on your own landing page.",
    Icon: CheckCircle2,
  },
];

export function HowItWorksTimeline() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {steps.map(({ title, copy, Icon }, index) => (
        <article
          key={title}
          className="relative rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] p-5"
        >
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute -right-2 top-8 hidden h-px w-4 bg-[#E7E0D2] md:block"
            />
          ) : null}
          <div className="flex items-center justify-between gap-4">
            <span className="flex size-10 items-center justify-center rounded-[8px] border border-[#B8944E]/30 bg-[#B8944E]/10 text-[#B8944E]">
              <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
            </span>
            <span className="font-serif text-3xl text-[#E7E0D2]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-5 text-base font-semibold text-[#111827]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">{copy}</p>
        </article>
      ))}
    </div>
  );
}
