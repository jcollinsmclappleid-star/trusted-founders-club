import { Quote } from "lucide-react";

type ReviewQuoteCardProps = {
  quote: string;
  meta?: string;
};

export function ReviewQuoteCard({ quote, meta }: ReviewQuoteCardProps) {
  return (
    <figure className="rounded-[10px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_24px_70px_rgba(17,24,39,0.06)]">
      <Quote aria-hidden="true" className="text-[#B8944E]" size={25} />
      <blockquote className="mt-5 font-serif text-xl leading-8 text-[#111827] md:text-[1.45rem]">
        &quot;{quote}&quot;
      </blockquote>
      {meta ? (
        <figcaption className="mt-5 border-t border-[#E7E0D2] pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
          {meta}
        </figcaption>
      ) : null}
    </figure>
  );
}
