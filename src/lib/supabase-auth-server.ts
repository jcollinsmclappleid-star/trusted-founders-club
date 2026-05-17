import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getMissingEnv } from "@/lib/env";

export async function createSupabaseUserServerClient() {
  const missing = getMissingEnv([
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ]);

  if (missing.length > 0) {
    return {
      client: null,
      error: `Missing Supabase auth environment variables: ${missing.join(", ")}`,
    };
  }

  const cookieStore = await cookies();

  return {
    client: createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // Server Components cannot set cookies. Server Actions and Route
              // Handlers can, and those are the only places that need mutation.
            }
          },
        },
      },
    ),
    error: null,
  };
}

export async function getCurrentUser() {
  const { client, error } = await createSupabaseUserServerClient();
  if (!client) return { user: null, error };

  const {
    data: { user },
    error: userError,
  } = await client.auth.getUser();

  return { user, error: userError?.message ?? null };
}
