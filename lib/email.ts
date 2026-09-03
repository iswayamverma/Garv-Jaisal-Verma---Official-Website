/**
 * Sends contact-form submissions through a transactional email API.
 *
 * PDD §27a intentionally leaves the provider swappable ("Resend or an
 * equivalent provider — final choice may be substituted by the owner").
 * Calling Brevo's plain HTTP API (rather than installing its SDK) keeps
 * that swap to editing this one function — no new dependency, no change
 * anywhere else in the app.
 *
 * Provider: Brevo (https://app.brevo.com) — SMTP & API → API Keys.
 * EMAIL_PROVIDER_API_KEY now holds a Brevo API key.
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
  const fromHeader = process.env.CONTACT_FROM_EMAIL || "GJ Verman Site <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("EMAIL_PROVIDER_API_KEY is not configured");
  }

  console.log("DEBUG key length:", apiKey.length, "starts with:", apiKey.slice(0, 8), "ends with:", apiKey.slice(-4));

  // CONTACT_FROM_EMAIL is stored as a combined "Name <email>" string;
  // Brevo wants name/email split into separate fields, so parse it here.
  const fromMatch = fromHeader.match(/^(.*)<(.+)>$/);
  const senderName = (fromMatch?.[1] ?? "GJ Verman Site").trim().replace(/^"|"$/g, "");
  const senderEmail = (fromMatch?.[2] ?? fromHeader).trim();

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      replyTo: { email: payload.email, name: payload.name },
      subject: `New ${payload.inquiryType} inquiry — ${payload.name}`,
      textContent: [
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