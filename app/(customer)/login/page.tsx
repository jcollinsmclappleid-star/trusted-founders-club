import type { Metadata } from "next";
import Link from "next/link";
import { signInAction } from "../auth-actions";

export const metadata: Metadata = {
  title: "Log In | Review Signal",
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = params.next ?? "/account";

  return (
    <AuthShell
      eyebrow="Customer account"
      title="Log in to your Review Signal account."
      copy="Manage your submission, upload listing assets and access your review badge once approved."
    >
      {params.error ? <AuthError message={params.error} /> : null}
      <form action={signInAction} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={next} />
        <AuthField label="Email" name="email" type="email" />
        <AuthField label="Password" name="password" type="password" />
        <button className="h-12 w-full rounded-[6px] bg-[#0B1220] px-5 text-sm font-semibold text-[#FFFDF7] transition hover:bg-[#111827]">
          Log in
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-[#6B7280]">
        Need an account?{" "}
        <Link
          href={`/signup?next=${encodeURIComponent(next)}`}
          className="font-semibold text-[#0B1220] underline decoration-[#B8944E]/50 underline-offset-4"
        >
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}

function AuthShell({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#F7F3EA] px-5 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-md rounded-[8px] border border-[#E7E0D2] bg-[#FFFDF7] p-6 shadow-[0_28px_90px_rgba(7,10,15,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8944E]">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-[#111827]">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#6B7280]">{copy}</p>
        {children}
      </div>
    </section>
  );
}

function AuthField({
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
        className="h-12 w-full rounded-[6px] border border-[#E7E0D2] bg-[#FFFDF7] px-3 text-sm text-[#111827] outline-none focus:border-[#B8944E] focus:ring-2 focus:ring-[#B8944E]/20"
      />
    </div>
  );
}

function AuthError({ message }: { message: string }) {
  return (
    <div className="mt-5 rounded-[8px] border border-[#A66A2C]/30 bg-[#A66A2C]/10 p-4 text-sm leading-6 text-[#A66A2C]">
      {message}
    </div>
  );
}
