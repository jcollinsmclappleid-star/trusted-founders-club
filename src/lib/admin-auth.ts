import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const adminCookieName = "tfc_admin_session";
const adminCookieValue = "trusted-founders-admin";

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", getAdminSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(password, expected);
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(adminCookieName)?.value;
  if (!session) return false;

  const expected = sign(adminCookieValue);
  return safeEqual(session, expected);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, sign(adminCookieValue), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}
