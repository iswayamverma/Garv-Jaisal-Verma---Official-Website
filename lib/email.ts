/**
 * Sends contact-form submissions through a transactional email API.
 *
 * PDD §27a intentionally leaves the provider swappable ("Resend or an
 * equivalent provider — final choice may be substituted by the owner").
 * Calling Resend's plain HTTP API (rather than installing its SDK) keeps
 * that swap to editing this one function — no new dependency, no change
 * anywhere else in the app.
 */

export interface ContactEmailPayload {
  name: string;
  email: string;
  inquiryType: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "[BOOKING_EMAIL]";
  const from = process.env.CONTACT_FROM_EMAIL || "Garv Jaisal Verma Site <onboarding@resend.dev>";

  if (!apiKey) {
    // No credential configured (e.g. local dev without .env.local). The
    // route must still exist and fail gracefully rather than silently
    // no-op — see PDD §27a — so we throw and let the caller respond 502.
    throw new Error("EMAIL_PROVIDER_API_KEY is not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `New ${payload.inquiryType} inquiry — ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.phone ? `Phone: ${payload.phone}` : undefined,
        `Inquiry type: ${payload.inquiryType}`,
        "",
        payload.message,
      ]
        .filter((line): line is string => Boolean(line))
        .join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider responded with HTTP ${response.status}`);
  }
}
