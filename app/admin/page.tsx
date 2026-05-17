import Link from "next/link";
import { AlertCircle, FileText, ShieldCheck } from "lucide-react";
import { loginAdminAction, logoutAdminAction } from "./actions";
import { AdminStatusBadge } from "@/components/admin-status-badge";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { getAdminOverview } from "@/lib/submissions";

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const configured = isAdminConfigured();
  const authenticated = await isAdminAuthenticated();

  if (!configured) {
    return (
      <AdminShell>
        <ConfigWarning message="Admin is not configured. Add ADMIN_PASSWORD to the environment before using the admin area." />
      </AdminShell>
    );
  }

  if (!authenticated) {
    return (
      <AdminShell narrow>
        <div className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_24px_70px_rgba(17,24,39,0.06)]">
          <div className="flex size-11 items-center justify-center rounded-[6px] border border-[#B8944E]/30 bg-[#B8944E]/10 text-[#B8944E]">
            <ShieldCheck aria-hidden="true" size={21} />
          </div>
          <h1 className="mt-6 font-serif text-4xl text-[#111827]">
            Admin access
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#6B7280]">
            Enter the temporary MVP admin password to review paid submissions.
          </p>
          {params.error ? (
            <div className="mt-5 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm text-[#A66A2C]">
              {params.error}
            </div>
          ) : null}
          <form action={loginAdminAction} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#111827]"
              >
                Admin password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="h-12 w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 text-sm outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20"
              />
            </div>
            <button className="inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:bg-[#111827]">
              Continue
            </button>
          </form>
        </div>
      </AdminShell>
    );
  }

  const { counts, error } = await getAdminOverview();

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
            Admin dashboard
          </p>
          <h1 className="mt-2 font-serif text-4xl text-[#111827]">
            Review queue overview
          </h1>
        </div>
        <form action={logoutAdminAction}>
          <button className="h-10 rounded-[6px] border border-[#0B1220]/20 px-4 text-sm font-semibold text-[#0B1220] transition hover:bg-[#0B1220]/5">
            Sign out
          </button>
        </form>
      </div>

      {error ? <ConfigWarning message={error} /> : null}

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Pending review" value={counts?.pending ?? 0} tone="warning" />
        <StatCard label="Approved public" value={counts?.approved ?? 0} tone="success" />
        <StatCard label="Needs changes" value={counts?.needsChanges ?? 0} tone="gold" />
        <StatCard label="Rejected/refunded" value={counts?.rejected ?? 0} tone="danger" />
      </div>

      <div className="mt-8 rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-[6px] border border-[#B8944E]/30 bg-[#B8944E]/10 text-[#B8944E]">
            <FileText aria-hidden="true" size={21} />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-[#111827]">
              Submission review workflow
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
              Review paid submissions, add public credibility quotes, approve
              noindex or indexable profiles, request changes, or reject unsuitable
              apps. Public publishing is controlled manually.
            </p>
            <Link
              href="/admin/submissions"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-[6px] bg-[#0B1220] px-4 text-sm font-semibold text-[#FFFDF7] transition hover:bg-[#111827]"
            >
              View submissions
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function AdminShell({
  children,
  narrow,
}: {
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <section className="min-h-[70vh] bg-[#F7F3EA] px-5 py-12 sm:px-6 lg:px-8">
      <div className={narrow ? "mx-auto max-w-md" : "mx-auto max-w-7xl"}>
        {children}
      </div>
    </section>
  );
}

function ConfigWarning({ message }: { message: string }) {
  return (
    <div className="mt-6 flex gap-3 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#A66A2C]">
      <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
      {message}
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "warning" | "danger" | "gold";
}) {
  return (
    <article className="rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-5">
      <AdminStatusBadge value={label} tone={tone} />
      <p className="mt-5 font-serif text-5xl text-[#111827]">{value}</p>
    </article>
  );
}
