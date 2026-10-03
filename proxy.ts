import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const redirects: Record<string, string> = {
  "/home": "/",
  "/welcome": "/#top",
  "/dermot-cox-counselling": "/#top",
  "/about": "/#about",
  "/working-together": "/#approach",
  "/pricing": "/#fees",
  "/contact": "/#contact",
  "/logo": "/#top",
};

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const target = redirects[path];
  if (!target) return NextResponse.next();

  const location = new URL(target, request.url);
  return new NextResponse(null, {
    status: 301,
    headers: { Location: location.toString() },
  });
}

export const config = {
  matcher: [
    "/home",
    "/welcome",
    "/dermot-cox-counselling",
    "/about",
    "/working-together",
    "/pricing",
    "/contact",
    "/logo",
  ],
};
