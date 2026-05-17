import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "../auth-actions";
import { AdminStatusBadge, statusTone } from "@/components/admin-status-badge";
import { getCurrentUser } from "@/lib/supabase-auth-server";
import {
  customerNextStep,
  formatDate,
  getCustomerSubmissions,
} from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Account | Review Signal",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { user } = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const { submissions, error } = await getCustomerSubmissions(user.id);
  const primary = submissions[0];

  return (
    <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[8px] bg-[#0B1220] p-6 text-[#FFFDF7] md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E6D3A3]">
                Customer portal
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
                Your Review Signal account
              </h1>
              <p className="text-on-dark-muted mt-4 max-w-2xl text-sm leading-7">
                Manage your app submission, upload listing assets and access
                your review badge once approved.
              </p>
            </div>
            <form action={signOutAction}>
              <button className="h-10 rounded-[6px] border border-white/20 px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-white/5">
                Sign out
              </button>
            </form>
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm text-[#A66A2C]">
            {error}
          </div>
        ) : null}

        <div className="mt-8 rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_24px_70px_rgba(17,24,39,0.06)]">
          {primary ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
                  Latest submission
                </p>
                <h2 className="mt-2 font-serif text-3xl text-[#111827]">
                  {primary.app_name}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <AdminStatusBadge
                    value={primary.payment_status}
                    tone={statusTone(primary.payment_status)}
                  />
                  <AdminStatusBadge
                    value={primary.review_status}
                    tone={statusTone(primary.review_status)}
                  />
                  <AdminStatusBadge value={primary.package} tone="gold" />
                </div>
                <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                  {customerNextStep(primary)}
                </p>
                <p className="mt-2 text-xs text-[#6B7280]">
                  Submitted {formatDate(primary.created_at)}
                </p>
              </div>
              <Link
                href={`/account/submissions/${primary.id}`}
                className="inline-flex h-11 items-center justify-center rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-[#111827]"
              >
                View Submission
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="font-serif text-3xl text-[#111827]">
                No submissions yet.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
                Start by applying for manual review. Your submission
                and payment status will appear here once created.
              </p>
              <Link
                href="/submit"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-[#111827]"
              >
                Apply For Review
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            href="/account/submissions"
            className="text-sm font-semibold text-[#0B1220] underline decoration-[#B8944E]/50 underline-offset-4"
          >
            View all submissions
          </Link>
        </div>
      </div>
    </section>
  );
}
