"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { contactFormSchema } from "@/lib/validations/contact";
import { INQUIRY_TYPES, type ContactApiResponse } from "@/types";
import { CtaLink } from "@/components/ui/CtaLink";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/contact/CustomSelect";

type FormValues = {
  name: string;
  email: string;
  inquiryType: (typeof INQUIRY_TYPES)[number] | "";
  phone: string;
  message: string;
  company: string; // honeypot
};

const initialValues: FormValues = {
  name: "",
  email: "",
  inquiryType: "",
  phone: "",
  message: "",
  company: "",
};

type Status = "idle" | "sending" | "success" | "error";

const MESSAGE_MIN = 10;
const MESSAGE_MAX = 3000;

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const firstErrorRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] !== undefined ? String(issue.path[0]) : "form";
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      requestAnimationFrame(() => firstErrorRef.current?.focus());
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = (await response.json()) as ContactApiResponse;

      if (body.ok) {
        setStatus("success");
        setStatusMessage("Thanks — your message has been sent. Expect a reply soon.");
        setValues(initialValues);
        return;
      }

      if (body.error === "validation") {
        setFieldErrors(body.fields);
        setStatus("error");
        setStatusMessage("Please fix the highlighted fields and try again.");
      } else if (body.error === "rate_limited") {
        setStatus("error");
        setStatusMessage(
          "You've sent a few messages in a short time. Please wait a minute and try again."
        );
      } else {
        setStatus("error");
        setStatusMessage(
          "Something went wrong sending your message. Please try again, or email [BOOKING_EMAIL] directly."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage("A network error stopped this from sending. Please try again.");
    }
  }

  const disabled = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div role="status" aria-live="polite" className={cn(status !== "success" && "sr-only")}>
        {status === "success" ? statusMessage : ""}
      </div>
      <div
        role="alert"
        ref={firstErrorRef}
        tabIndex={-1}
        className={cn(
          "border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember",
          status === "error" && statusMessage ? "block" : "hidden"
        )}
      >
        {status === "error" ? statusMessage : ""}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" error={fieldErrors.name}>
          {(id, describedBy) => (
            <input
              id={id}
              name="name"
              type="text"
              autoComplete="name"
              required
              disabled={disabled}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>

        <Field label="Email" error={fieldErrors.email}>
          {(id, describedBy) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={disabled}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>

        <Field label="Inquiry Type" error={fieldErrors.inquiryType}>
          {(id, describedBy) => (
            <CustomSelect
              id={id}
              name="inquiryType"
              value={values.inquiryType}
              onChange={(val) => update("inquiryType", val as FormValues["inquiryType"])}
              options={INQUIRY_TYPES}
              disabled={disabled}
              invalid={Boolean(fieldErrors.inquiryType)}
              describedBy={describedBy}
            />
          )}
        </Field>

        <Field label="Phone (optional)" error={fieldErrors.phone}>
          {(id, describedBy) => (
            <input
              id={id}
              name="phone"
              type="tel"
              autoComplete="tel"
              disabled={disabled}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={describedBy}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <Field label="Message" error={fieldErrors.message} hint={`${values.message.length}/${MESSAGE_MAX}`}>
        {(id, describedBy) => (
          <textarea
            id={id}
            name="message"
            rows={6}
            required
            minLength={MESSAGE_MIN}
            maxLength={MESSAGE_MAX}
            disabled={disabled}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={describedBy}
            className={cn(inputClass, "resize-y")}
          />
        )}
      </Field>

      {/* Honeypot — hidden from sighted and AT users, left empty by real visitors. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <div>
        <CtaLink type="submit" disabled={disabled}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </CtaLink>
      </div>
    </form>
  );
}

const inputClass =
  "w-full border border-ash/30 bg-transparent px-4 py-3 text-sm text-paper placeholder:text-ash/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember aria-[invalid=true]:border-ember disabled:opacity-50";

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.16em] text-ash">
          {label}
        </label>
        {hint ? (
          <span id={hintId} className="font-mono text-[0.65rem] text-ash/70">
            {hint}
          </span>
        ) : null}
      </div>
      {children(id, describedBy)}
      {error ? (
        <p id={errorId} className="text-xs text-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
}
