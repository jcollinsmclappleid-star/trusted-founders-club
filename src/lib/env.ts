export const requiredEnvVars = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "FROM_EMAIL",
  "ADMIN_NOTIFICATION_EMAIL",
] as const;

export type RequiredEnvVar = (typeof requiredEnvVars)[number];

export function getMissingEnv(keys: readonly RequiredEnvVar[]) {
  return keys.filter((key) => !process.env[key]);
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
