"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { TherapistLandingContent } from "../content/types";
import { therapistLandingConfig } from "../config";
import { trackEvent } from "@/lib/analytics";
import styles from "../therapistLanding.module.css";

type FieldName = "fullName" | "role" | "country" | "website" | "email" | "whatsapp" | "note";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "min-h-[48px] w-full rounded-[8px] border border-[var(--tl-border)] bg-[var(--tl-surface)] px-4 py-3 text-base text-[var(--tl-text)] placeholder:text-[var(--tl-text-muted)] transition-colors duration-150 focus:border-[var(--tl-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)]";

const labelClass = "mb-1.5 block text-sm font-medium text-[var(--tl-text)]";

export default function PreviewRequestForm({ content }: { content: TherapistLandingContent }) {
  const { form } = content;
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const startTracked = useRef(false);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement>>>({});

  function trackStart() {
    if (!startTracked.current) {
      startTracked.current = true;
      trackEvent("lead_form_start", { locale: content.locale });
    }
  }

  function validate(data: FormData): Partial<Record<FieldName, string>> {
    const nextErrors: Partial<Record<FieldName, string>> = {};
    const fullName = String(data.get("fullName") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!fullName) nextErrors.fullName = form.validation.required;
    if (!role) nextErrors.role = form.validation.required;
    if (!country) nextErrors.country = form.validation.required;
    if (!email) {
      nextErrors.email = form.validation.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = form.validation.email;
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");

    const payload = {
      source: `therapist-website-design-${content.locale}`,
      locale: content.locale,
      fullName: String(data.get("fullName") ?? ""),
      role: String(data.get("role") ?? ""),
      country: String(data.get("country") ?? ""),
      website: String(data.get("website") ?? ""),
      email: String(data.get("email") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      note: String(data.get("note") ?? ""),
      companyWebsite: String(data.get("companyWebsite") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      trackEvent("lead_form_submit", { locale: content.locale });
      setStatus("success");
      router.push(therapistLandingConfig.thankYouRoutes[content.locale]);
    } catch {
      trackEvent("lead_form_error", { locale: content.locale });
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="preview-request-form" className={`${styles.section} scroll-mt-24`}>
      <div className={styles.container}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={`${styles.balance} text-[clamp(1.875rem,3vw,2.25rem)] font-medium leading-[1.15] text-[var(--tl-text)]`}>
            {form.heading}
          </h2>
          <p className={`${styles.pretty} mt-3 text-base leading-[1.65] text-[var(--tl-text-body)]`}>{form.body}</p>
        </div>

        <div
          className="mx-auto mt-10 max-w-[640px] rounded-[16px] border border-[var(--tl-border)] bg-[var(--tl-surface)] p-5 sm:p-8"
          style={{ boxShadow: "var(--tl-shadow-sm)" }}
        >
          <form onSubmit={handleSubmit} onChange={trackStart} noValidate>
            <div aria-hidden="true" className={styles.visuallyHidden}>
              <label htmlFor="companyWebsite">Leave this field empty</label>
              <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                id="fullName"
                name="fullName"
                type="text"
                label={form.fields.fullName}
                placeholder={form.fields.fullNamePlaceholder}
                autoComplete="name"
                required
                error={errors.fullName}
                fieldRefs={fieldRefs}
                requiredLabel={form.requiredLabel}
              />
              <Field
                id="role"
                name="role"
                type="text"
                label={form.fields.role}
                placeholder={form.fields.rolePlaceholder}
                autoComplete="organization-title"
                required
                error={errors.role}
                fieldRefs={fieldRefs}
                requiredLabel={form.requiredLabel}
              />
              <Field
                id="country"
                name="country"
                type="text"
                label={form.fields.country}
                placeholder={form.fields.countryPlaceholder}
                autoComplete="country-name"
                required
                error={errors.country}
                fieldRefs={fieldRefs}
                requiredLabel={form.requiredLabel}
              />
              <Field
                id="website"
                name="website"
                type="text"
                label={form.fields.website}
                placeholder={form.fields.websitePlaceholder}
                autoComplete="url"
                fieldRefs={fieldRefs}
                optionalLabel={form.optionalLabel}
              />
              <Field
                id="email"
                name="email"
                type="email"
                inputMode="email"
                label={form.fields.email}
                placeholder={form.fields.emailPlaceholder}
                autoComplete="email"
                required
                error={errors.email}
                fieldRefs={fieldRefs}
                requiredLabel={form.requiredLabel}
              />
              <Field
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                label={form.fields.whatsapp}
                placeholder={form.fields.whatsappPlaceholder}
                autoComplete="tel"
                fieldRefs={fieldRefs}
                optionalLabel={form.optionalLabel}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="note" className={labelClass}>
                {form.fields.note}{" "}
                <span className="font-normal text-[var(--tl-text-muted)]">({form.optionalLabel})</span>
              </label>
              <textarea
                id="note"
                name="note"
                placeholder={form.fields.notePlaceholder}
                rows={4}
                maxLength={2000}
                className={`${inputClass} min-h-[120px] resize-y`}
                ref={(el) => {
                  if (el) fieldRefs.current.note = el;
                }}
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-[var(--tl-text-muted)]">{form.confidentialityNotice}</p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-[var(--tl-primary)] text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[var(--tl-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
              )}
              {isSubmitting ? form.submitting : form.submit}
            </button>

            <p aria-live="polite" className="mt-4 text-sm">
              {status === "success" && <span className="text-[var(--tl-success)]">{form.successTitle}</span>}
              {status === "error" && (
                <span className="text-[var(--tl-danger)]">
                  {form.errorTitle} {form.errorBody}
                </span>
              )}
            </p>

            <p className="mt-4 text-xs leading-5 text-[var(--tl-text-muted)]">{form.privacyNotice}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  type,
  label,
  placeholder,
  autoComplete,
  inputMode,
  required,
  error,
  fieldRefs,
  requiredLabel,
  optionalLabel,
}: {
  id: FieldName;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: "email" | "tel" | "text";
  required?: boolean;
  error?: string;
  fieldRefs: React.MutableRefObject<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement>>>;
  requiredLabel?: string;
  optionalLabel?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        <span className="font-normal text-[var(--tl-text-muted)]">
          ({required ? requiredLabel : optionalLabel})
        </span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        maxLength={320}
        className={inputClass}
        ref={(el) => {
          if (el) fieldRefs.current[id] = el;
        }}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-[var(--tl-danger)]">
          {error}
        </p>
      )}
    </div>
  );
}
