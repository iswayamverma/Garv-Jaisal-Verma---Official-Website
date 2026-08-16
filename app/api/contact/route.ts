import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contactFormSchema, fieldErrorsFromZod } from "@/lib/validations/contact";
import { isRateLimited } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/email";
import type { ContactApiResponse } from "@/types";

/**
 * Response shapes match PDD §41a exactly:
 *   success            → { ok: true }                                    200
 *   validation failure  → { ok: false, error: "validation", fields }      400
 *   rate-limited         → { ok: false, error: "rate_limited" }            429
 *   email provider fails → { ok: false, error: "delivery_failed" }         502
 *
 * No database — this route validates and forwards to the email provider
 * only (§5, §27a).
 */
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    const body: ContactApiResponse = { ok: false, error: "rate_limited" };
    return NextResponse.json(body, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    const body: ContactApiResponse = {
      ok: false,
      error: "validation",
      fields: { form: "We couldn't read that submission. Please try again." },
    };
    return NextResponse.json(body, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    const body: ContactApiResponse = {
      ok: false,
      error: "validation",
      fields: fieldErrorsFromZod(parsed.error),
    };
    return NextResponse.json(body, { status: 400 });
  }

  // Honeypot tripped: respond as if it succeeded so bots don't learn to
  // route around the check, but skip sending an actual email (§28).
  if (parsed.data.company) {
    const body: ContactApiResponse = { ok: true };
    return NextResponse.json(body, { status: 200 });
  }

  try {
    await sendContactEmail(parsed.data);
  } catch (error) {
    console.error("[api/contact] delivery failed:", error);
    const body: ContactApiResponse = { ok: false, error: "delivery_failed" };
    return NextResponse.json(body, { status: 502 });
  }

  const body: ContactApiResponse = { ok: true };
  return NextResponse.json(body, { status: 200 });
}
