import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isIndexableHost } from "@/lib/site";

const previewRobotsHeader = "noindex, nofollow, noarchive, nosnippet, noimageindex";

function hostName(request: NextRequest) {
  const raw = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  return raw.split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");
}

function withPreviewRobots(response: NextResponse, request: NextRequest) {
  if (!isIndexableHost(hostName(request))) {
    response.headers.set("X-Robots-Tag", previewRobotsHeader);
  }
  return response;
}

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
  if (!target) return withPreviewRobots(NextResponse.next(), request);

  const location = new URL(target, request.url);
  return withPreviewRobots(
    new NextResponse(null, {
      status: 301,
      headers: { Location: location.toString() },
    }),
    request,
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
