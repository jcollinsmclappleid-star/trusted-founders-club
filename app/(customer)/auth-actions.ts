"use server";

import { redirect } from "next/navigation";
import { createSupabaseUserServerClient } from "@/lib/supabase-auth-server";

function nextPath(formData: FormData) {
  const next = String(formData.get("next") ?? "/account");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = nextPath(formData);

  const { client, error } = await createSupabaseUserServerClient();
  if (!client) {
    redirect(`/login?error=${encodeURIComponent(error ?? "Auth is not configured")}`);
  }

  const { error: signInError } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    redirect(`/login?error=${encodeURIComponent(signInError.message)}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = nextPath(formData);

  const { client, error } = await createSupabaseUserServerClient();
  if (!client) {
    redirect(`/signup?error=${encodeURIComponent(error ?? "Auth is not configured")}`);
  }

  const { error: signUpError } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}${next}`,
    },
  });

  if (signUpError) {
    redirect(`/signup?error=${encodeURIComponent(signUpError.message)}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signOutAction() {
  const { client } = await createSupabaseUserServerClient();
  if (client) {
    await client.auth.signOut();
  }
  redirect("/login");
}
