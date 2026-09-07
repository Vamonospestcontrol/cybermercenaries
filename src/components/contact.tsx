"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type FormStatus = "idle" | "pending" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

/* -------------------------------------------------------------------------- */
/*  Validation                                                                */
/* -------------------------------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  // phone is optional — only validate format if provided
  if (values.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/*  Input helpers                                                             */
/* -------------------------------------------------------------------------- */

const INPUT_CLASS = cn(
  "w-full border bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint",
  "border-line transition-colors duration-200",
  "focus:border-signal"
);

const ERROR_INPUT_CLASS = "border-danger";

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 text-sm font-medium text-ink">
      {label}
      {required ? (
        <span className="text-signal" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" aria-live="polite" className="mt-1 text-xs text-danger">
      {message}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState("");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const formspreeUrl = formspreeId
    ? `https://formspree.io/f/${formspreeId}`
    : null;

  /* ---- helpers ---------------------------------------------------------- */

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // clear field error on edit so it doesn't feel stuck
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof FormValues;
    // validate just this field
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // validate all fields
    const fieldErrors = validate(values);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) return;

    // guard: no formspree configured
    if (!formspreeUrl) {
      setStatus("error");
      setServerError(
        "Submissions are not configured yet. Please reach out via email or WhatsApp."
      );
      return;
    }

    setStatus("pending");
    setServerError("");

    try {
      const res = await fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || undefined,
          message: values.message,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      setStatus("success");
      setValues({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch {
      setStatus("error");
      setServerError(
        "Something went wrong sending your message. Please try again or contact us directly."
      );
    }
  }

  const isPending = status === "pending";

  /* ---- render ----------------------------------------------------------- */

  const { city, state, lat, lng } = site.location;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
      {/* ---- Form -------------------------------------------------------- */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
        aria-label="Contact form"
      >
        {/* name */}
        <div>
          <FieldLabel htmlFor="contact-name" label="Name" required />
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={cn(INPUT_CLASS, errors.name && ERROR_INPUT_CLASS)}
            placeholder="Your name"
          />
          <FieldError id="error-name" message={errors.name} />
        </div>

        {/* email */}
        <div>
          <FieldLabel htmlFor="contact-email" label="Email" required />
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={cn(INPUT_CLASS, errors.email && ERROR_INPUT_CLASS)}
            placeholder="you@example.com"
          />
          <FieldError id="error-email" message={errors.email} />
        </div>

        {/* phone (optional) */}
        <div>
          <FieldLabel htmlFor="contact-phone" label="Phone" />
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            className={cn(INPUT_CLASS, errors.phone && ERROR_INPUT_CLASS)}
            placeholder="+91 …"
          />
          <FieldError id="error-phone" message={errors.phone} />
        </div>

        {/* message */}
        <div>
          <FieldLabel htmlFor="contact-message" label="Message" required />
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
            className={cn(
              INPUT_CLASS,
              "resize-y",
              errors.message && ERROR_INPUT_CLASS
            )}
            placeholder="Tell us about your project or question…"
          />
          <FieldError id="error-message" message={errors.message} />
        </div>

        {/* env-var notice */}
        {!formspreeUrl && (
          <p className="rounded border border-line bg-surface px-4 py-3 text-xs text-ink-dim">
            Form submissions are not connected yet — set{" "}
            <code className="font-mono text-signal">NEXT_PUBLIC_FORMSPREE_ID</code>{" "}
            to enable sending.
          </p>
        )}

        {/* submit */}
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "w-full border border-signal bg-signal px-6 py-3 text-sm font-medium text-signal-ink",
            "transition-colors duration-200 hover:bg-signal-dim",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {isPending ? "Sending…" : "Send Message"}
        </button>

        {/* status feedback */}
        {status === "success" && (
          <p
            role="status"
            aria-live="polite"
            className="rounded border border-ok/30 bg-ok/10 px-4 py-3 text-sm text-ok"
          >
            Message sent — we&apos;ll get back to you soon.
          </p>
        )}

        {status === "error" && serverError && (
          <p
            role="status"
            aria-live="polite"
            className="rounded border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
          >
            {serverError}
          </p>
        )}
      </form>

      {/* ---- Contact info sidebar ---------------------------------------- */}
      <aside className="space-y-8 lg:pt-1">
        <div>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-faint">
            Get in touch
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
              <Link
                href={`mailto:${site.contact.email}`}
                className="text-sm text-ink-dim transition-colors hover:text-ink"
              >
                {site.contact.email}
              </Link>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
              <Link
                href={`https://wa.me/${site.contact.whatsapp}`}
                className="text-sm text-ink-dim transition-colors hover:text-ink"
              >
                WhatsApp{" "}
                <span className="text-ink-faint">
                  {site.contact.whatsappDisplay}
                </span>
              </Link>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden="true" />
              <span className="text-sm text-ink-dim">
                {city}, {state} · {lat}, {lng}
              </span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
