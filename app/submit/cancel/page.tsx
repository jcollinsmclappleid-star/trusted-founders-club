import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Not Completed | Review Signal",
  description: "Cancelled Review Signal checkout.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubmitCancelPage() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_28px_90px_rgba(7,10,15,0.1)] md:p-8">
        <div className="flex size-12 items-center justify-center rounded-[6px] border border-[#A66A2C]/25 bg-[#A66A2C]/10 text-[#A66A2C]">
          <AlertCircle aria-hidden="true" size={24} />
        </div>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-[#111827] md:text-5xl">
          Payment was not completed.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#4B5563]">
          Your app has not entered the review queue yet.
        </p>
        <p className="mt-5 text-sm leading-7 text-[#6B7280]">
          You can return to the submit page and complete payment when ready.
        </p>
        <div className="mt-8">
          <Link
            href="/submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:-translate-y-0.5 hover:bg-[#111827] sm:w-auto"
          >
            Return to Submit App
          </Link>
        </div>
      </div>
    </section>
  );
}
