import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminStatusBadge, statusTone } from "@/components/admin-status-badge";
import { getCurrentUser } from "@/lib/supabase-auth-server";
import {
  customerNextStep,
  formatDate,
  formatPounds,
  getCustomerSubmissions,
} from "@/lib/submissions";

export const metadata: Metadata = {
  title: "My Submissions | Review Signal",
};

export const dynamic = "force-dynamic";

export default async function AccountSubmissionsPage() {
  const { user } = await getCurrentUser();
  if (!user) redirect("/login?next=/account/submissions");

  const { submissions, error } = await getCustomerSubmissions(user.id);

  return (
    <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
              Customer portal
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[#111827]">
              Your submissions
            </h1>
          </div>
          <Link
            href="/submit"
            className="inline-flex h-11 items-center justify-center rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-[#111827]"
          >
            Submit another app
          </Link>
        </div>

        {error ? (
          <div className="mt-6 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm text-[#A66A2C]">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-5">
          {submissions.map((submission) => (
            <article
              key={submission.id}
              className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-5 shadow-[0_24px_70px_rgba(17,24,39,0.05)]"
            >
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <AdminStatusBadge
                      value={submission.payment_status}
                      tone={statusTone(submission.payment_status)}
                    />
                    <AdminStatusBadge
                      value={submission.review_status}
                      tone={statusTone(submission.review_status)}
                    />
                    <AdminStatusBadge
                      value={formatPounds(submission.package_price)}
                      tone="gold"
                    />
                  </div>
                  <h2 className="mt-4 font-serif text-3xl text-[#111827]">
                    {submission.app_name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                    {customerNextStep(submission)}
                  </p>
                  <p className="mt-2 text-xs text-[#6B7280]">
                    Submitted {formatDate(submission.created_at)}
                  </p>
                  {submission.is_public && submission.slug ? (
                    <Link
                      href={`/apps/${submission.slug}`}
                      className="mt-4 inline-flex text-sm font-semibold text-[#0B1220] underline decoration-[#B8944E]/50 underline-offset-4"
                    >
                      View public profile
                    </Link>
                  ) : null}
                </div>
                <Link
                  href={`/account/submissions/${submission.id}`}
                  className="inline-flex h-11 items-center justify-center rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] hover:bg-[#111827]"
                >
                  Manage
                </Link>
              </div>
            </article>
          ))}
          {submissions.length === 0 ? (
            <div className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-8 text-center">
              <h2 className="font-serif text-3xl text-[#111827]">
                No submissions yet.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
                Submit your app to create your first review record.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
