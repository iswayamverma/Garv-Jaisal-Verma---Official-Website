import { z } from "zod";
import { INQUIRY_TYPES } from "@/types";

/**
 * Zod v4 syntax only, per PDD §4.1: top-level `z.email()` (not
 * `z.string().email()`) and the unified `error` param (not `message` /
 * `required_error` / `invalid_type_error`).
 */
export const contactFormSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(100, { error: "Name must be under 100 characters." }),

  email: z.email({ error: "Please enter a valid email address." }),

  inquiryType: z.enum(INQUIRY_TYPES, {
    error: "Please select an inquiry type.",
  }),

  // Optional (§27).
  phone: z
    .string()
    .trim()
    .max(30, { error: "Phone number is too long." })
    .optional()
    .or(z.literal("")),

  // §28: 10–3000 characters.
  message: z
    .string({ error: "Please enter a message." })
    .trim()
    .min(10, { error: "Message must be at least 10 characters." })
    .max(3000, { error: "Message must be under 3000 characters." }),

  // Honeypot (§28). Real visitors never see this field; if it's filled,
  // the submission is treated as spam. Kept in the schema (rather than
  // stripped before validation) so a single parse covers both jobs.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function fieldErrorsFromZod(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] !== undefined ? String(issue.path[0]) : "form";
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}
