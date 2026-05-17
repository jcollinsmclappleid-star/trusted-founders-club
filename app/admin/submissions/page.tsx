import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAdminAction } from "../actions";
import {
  AdminStatusBadge,
  statusTone,
} from "@/components/admin-status-badge";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  formatDate,
  formatPounds,
  getAdminSubmissions,
  type AdminFilter,
} from "@/lib/submissions";

type SubmissionsPageProps = {
  searchParams: Promise<{
    filter?: AdminFilter;
  }>;
};

const filters: Array<{ key: AdminFilter; label: string }> = [
  { key: "paid_pending_review", label: "Paid pending review" },
  { key: "needs_changes", label: "Needs changes" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
];

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage({
  searchParams,
}: SubmissionsPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin?error=Admin%20login%20required");
  }

  const params = await searchParams;
  const filter = filters.some((item) => item.key === params.filter)
    ? params.filter!
    : "paid_pending_review";
  const { submissions, error } = await getAdminSubmissions(filter);

  return (
    <section className="min-h-[70vh] bg-[#F7F3EA] px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[#111827]">
              Submissions
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="inline-flex h-10 items-center rounded-[6px] border border-[#0B1220]/20 px-4 text-sm font-semibold text-[#0B1220] hover:bg-[#0B1220]/5"
            >
              Overview
            </Link>
            <form action={logoutAdminAction}>
              <button className="h-10 rounded-[6px] border border-[#0B1220]/20 px-4 text-sm font-semibold text-[#0B1220] hover:bg-[#0B1220]/5">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <Link
              key={item.key}
              href={`/admin/submissions?filter=${item.key}`}
              className={`rounded-[6px] border px-3 py-2 text-sm font-semibold transition ${
                filter === item.key
                  ? "border-[#B8944E] bg-[#B8944E]/10 text-[#111827]"
                  : "border-[#E7E0D2] bg-[#FFFDF7] text-[#6B7280] hover:border-[#B8944E]/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {error ? (
          <div className="mt-6 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm text-[#A66A2C]">
            {error}
          </div>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] shadow-[0_24px_70px_rgba(17,24,39,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-[#E7E0D2] bg-[#F7F3EA] text-xs uppercase tracking-[0.12em] text-[#6B7280]">
                <tr>
                  <th className="px-4 py-4">App</th>
                  <th className="px-4 py-4">Founder</th>
                  <th className="px-4 py-4">Package</th>
                  <th className="px-4 py-4">Payment</th>
                  <th className="px-4 py-4">Review</th>
                  <th className="px-4 py-4">Submitted</th>
                  <th className="px-4 py-4">App URL</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E0D2]">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#111827]">
                        {submission.app_name}
                      </p>
                      <p className="mt-1 text-xs text-[#6B7280]">
                        {submission.category}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[#111827]">
                        {submission.founder_name}
                      </p>
                      <p className="mt-1 text-xs text-[#6B7280]">
                        {submission.founder_email}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[#111827]">
                        {submission.package.replaceAll("_", " ")}
                      </p>
                      <p className="mt-1 text-xs text-[#6B7280]">
                        {formatPounds(submission.package_price)}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <AdminStatusBadge
                        value={submission.payment_status}
                        tone={statusTone(submission.payment_status)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <AdminStatusBadge
                        value={submission.review_status}
                        tone={statusTone(submission.review_status)}
                      />
                    </td>
                    <td className="px-4 py-4 text-[#6B7280]">
                      {formatDate(submission.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href={submission.app_url}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        className="text-[#0B1220] underline decoration-[#B8944E]/50 underline-offset-4"
                      >
                        Visit
                      </a>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/admin/submissions/${submission.id}`}
                        className="inline-flex h-9 items-center rounded-[6px] bg-[#0B1220] px-3 text-xs font-semibold text-[#FFFDF7] hover:bg-[#111827]"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-[#6B7280]">
                      No submissions found for this filter.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
