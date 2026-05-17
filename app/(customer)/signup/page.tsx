import type { Metadata } from "next";
import Link from "next/link";
import { signUpAction } from "../auth-actions";

export const metadata: Metadata = {
  title: "Sign Up | Review Signal",
};

type SignupPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const next = params.next ?? "/account";

  return (
    <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-md rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_28px_90px_rgba(7,10,15,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
          Customer account
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-[#111827]">
          Create your Review Signal account.
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#6B7280]">
          Use your account to manage submissions, upload listing assets and
          access approved review materials.
        </p>
        {params.error ? (
          <div className="mt-5 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#A66A2C]">
            {params.error}
          </div>
        ) : null}
        <form action={signUpAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next} />
          <Field label="Email" name="email" type="email" />
          <Field label="Password" name="password" type="password" />
          <button className="h-12 w-full rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:bg-[#111827]">
            Create account
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link
            href={`/login?next=${encodeURIComponent(next)}`}
            className="font-semibold text-[#0B1220] underline decoration-[#B8944E]/50 underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        minLength={type === "password" ? 8 : undefined}
        className="h-12 w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20"
      />
    </div>
  );
}
