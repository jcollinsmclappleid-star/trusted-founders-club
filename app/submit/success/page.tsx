import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { SecondaryButton } from "@/components/buttons";
import { siteConfig } from "@/lib/site";
import { getPaymentIntentId, markSubmissionPaid } from "@/lib/submission-status";
import { getStripeClient } from "@/lib/stripe-server";

export const metadata: Metadata = {
  title: "Submission Received | Review Signal",
  description: "Payment confirmation for a Review Signal submission.",
  robots: {
    index: false,
    follow: false,
  },
};

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function SubmitSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const result = await verifyCheckoutSession(sessionId);

  return (
    <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_28px_90px_rgba(7,10,15,0.1)] md:p-8">
        {result.paid ? (
          <div>
            <div className="flex size-12 items-center justify-center rounded-[6px] border border-[#4F7F63]/25 bg-[#4F7F63]/10 text-[#4F7F63]">
              <CheckCircle2 aria-hidden="true" size={24} />
            </div>
            <h1 className="mt-6 font-serif text-4xl leading-tight text-[#111827] md:text-5xl">
              Your app has been submitted for review.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#4B5563]">
              Payment has been received and your app is now in the manual review
              queue.
            </p>
            <p className="mt-5 text-sm leading-7 text-[#6B7280]">
              Approved submissions are usually reviewed and published within 24
              hours. If we need more information, we will contact you using the
              email provided.
            </p>
            <div className="mt-6 rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-4 text-sm leading-6 text-[#6B7280]">
              Not every app is accepted. We do not guarantee rankings, indexing,
              traffic or sales.
            </div>
          </div>
        ) : (
          <div>
            <div className="flex size-12 items-center justify-center rounded-[6px] border border-[#A66A2C]/25 bg-[#A66A2C]/10 text-[#A66A2C]">
              <AlertCircle aria-hidden="true" size={24} />
            </div>
            <h1 className="mt-6 font-serif text-4xl leading-tight text-[#111827] md:text-5xl">
              Payment could not be verified.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#4B5563]">
              We could not confirm a paid Stripe Checkout session for this
              request.
            </p>
            <p className="mt-5 text-sm leading-7 text-[#6B7280]">
              {result.message}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:-translate-y-0.5 hover:bg-[#111827]"
          >
            Return Home
          </Link>
          <SecondaryButton href="/example-review">View Example Review</SecondaryButton>
        </div>
      </div>
    </section>
  );
}

async function verifyCheckoutSession(sessionId?: string) {
  if (!sessionId) {
    return {
      paid: false,
      message: "The success URL is missing a Stripe session ID.",
    };
  }

  const { stripe, error } = getStripeClient();
  if (!stripe) {
    return {
      paid: false,
      message: error ?? "Stripe is not configured.",
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return {
        paid: false,
        message:
          "Stripe returned the session, but the payment is not marked as paid.",
      };
    }

    const update = await markSubmissionPaid({
      submissionId: session.metadata?.submission_id,
      checkoutSessionId: session.id,
      paymentIntentId: getPaymentIntentId(session.payment_intent),
    });

    if (!update.ok) {
      return {
        paid: false,
        message:
          `Stripe verified the payment, but the submission status could not be updated. Please contact ${siteConfig.supportEmail} before resubmitting.`,
      };
    }

    return { paid: true, message: "" };
  } catch {
    return {
      paid: false,
      message:
        "Stripe could not verify this session. Please check the session ID or Stripe configuration.",
    };
  }
}
