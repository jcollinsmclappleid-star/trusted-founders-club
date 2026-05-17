import { faqItems } from "@/lib/site";

type FAQAccordionProps = {
  items?: typeof faqItems;
};

export function FAQAccordion({ items = faqItems }: FAQAccordionProps) {
  return (
    <div className="divide-y divide-[#E7E0D2] rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7]">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-semibold text-[#111827]">
            {item.question}
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[4px] border border-[#E7E0D2] text-[#B8944E] transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6B7280]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
