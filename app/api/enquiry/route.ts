import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";
import { validateEnquiry, type EnquiryInput } from "@/lib/enquiry";
import { siteConfig } from "@/lib/site";

const hits = new Map<string, { count: number; reset: number }>();

function limited(ip: string) {
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || now > current.reset) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

function asText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Please wait a little while before sending another message." },
      { status: 429 },
    );
  }

  let payload: Partial<EnquiryInput>;
  try {
    payload = (await request.json()) as Partial<EnquiryInput>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "The message could not be read. Please try again." },
      { status: 400 },
    );
  }

  const result = validateEnquiry({
    name: asText(payload.name),
    email: asText(payload.email),
    phone: asText(payload.phone),
    message: asText(payload.message),
    kind: asText(payload.kind),
    company: asText(payload.company),
  });

  if (result.honeypot) {
    console.info("Enquiry dropped: honeypot");
    return NextResponse.json({ ok: true });
  }

  if (Object.keys(result.errors).length > 0) {
    console.info("Enquiry rejected: validation");
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fields: result.errors },
      { status: 400 },
    );
  }

  const sent = await sendEnquiryEmail(result.clean);
  if (sent.ok) return NextResponse.json({ ok: true });

  if (sent.reason === "not_configured") {
    return NextResponse.json(
      {
        ok: false,
        error: `This preview cannot send email yet. Please call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      ok: false,
      error: `The message could not be sent. Please call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
    },
    { status: 502 },
  );
}
