import { createClient } from "@supabase/supabase-js";
import { getMissingEnv } from "@/lib/env";

export function getSupabaseAdmin() {
  const missing = getMissingEnv([
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
  ]);

  if (missing.length > 0) {
    return {
      client: null,
      error: `Missing Supabase environment variables: ${missing.join(", ")}`,
    };
  }

  return {
    client: createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    ),
    error: null,
  };
}
