"use client";

import { useRef, useState } from "react";
import type { BookingPageContent, DemoLocale } from "../types";
import FormField from "./FormField";
import FormStatus from "./FormStatus";
import ChoiceGroup from "./ChoiceGroup";
import LumaButton from "./LumaButton";
import formStyles from "../styles/luma-form.module.css";

type FieldErrors = Partial<Record<"fullName" | "contact", string>>;

export default function BookingForm({ locale, content }: { locale: DemoLocale; content: BookingPageContent }) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const firstErrorRef = useRef<HTMLInputElement>(null);
  const { fields } = content.form;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!fullName) nextErrors.fullName = content.form.validation.required;
    if (!email && !whatsapp) nextErrors.contact = content.form.validation.required;
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.contact = content.form.validation.email;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      window.setTimeout(() => firstErrorRef.current?.focus(), 0);
      return;
    }

    setErrors({});
    setStatus("pending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: `therapist-demo-booking-${locale}`,
          locale,
          fullName,
          email,
          whatsapp,
          serviceInterest: data.get("serviceInterest"),
          sessionPreference: data.get("sessionPreference"),
          preferredDateRange: data.get("preferredDateRange"),
          preferredTimeOfDay: data.get("preferredTimeOfDay"),
          note: data.get("note"),
          companyWebsite: data.get("companyWebsite"),
        }),
      });

      if (!response.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={formStyles.formGrid}>
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className={formStyles.honeypot}
        aria-hidden="true"
      />

      <div className={formStyles.formNotice}>{content.form.formNotice}</div>

      <FormField id="booking-fullName" label={fields.fullName} required error={errors.fullName}>
        <input
          id="booking-fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder={fields.fullNamePlaceholder}
          className={`${formStyles.input} ${errors.fullName ? formStyles.inputError : ""}`}
          ref={errors.fullName ? firstErrorRef : undefined}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "booking-fullName-error" : undefined}
        />
      </FormField>

      <div className={formStyles.formRow2}>
        <FormField id="booking-email" label={fields.email} optionalLabel={content.form.optionalLabel} error={errors.contact}>
          <input
            id="booking-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={fields.emailPlaceholder}
            className={`${formStyles.input} ${errors.contact ? formStyles.inputError : ""}`}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? "booking-email-error" : undefined}
          />
        </FormField>

        <FormField id="booking-whatsapp" label={fields.whatsapp} optionalLabel={content.form.optionalLabel}>
          <input
            id="booking-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={fields.whatsappPlaceholder}
            className={formStyles.input}
          />
        </FormField>
      </div>

      <FormField id="booking-serviceInterest" label={fields.serviceInterest}>
        <select id="booking-serviceInterest" name="serviceInterest" className={formStyles.select} defaultValue={fields.serviceInterestOptions[0]?.value}>
          {fields.serviceInterestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="booking-sessionPreference" label={fields.sessionPreference}>
        <ChoiceGroup name="sessionPreference" options={fields.sessionPreferenceOptions} legend={fields.sessionPreference} />
      </FormField>

      <div className={formStyles.formRow2}>
        <FormField id="booking-preferredDateRange" label={fields.preferredDateRange} optionalLabel={content.form.optionalLabel}>
          <input
            id="booking-preferredDateRange"
            name="preferredDateRange"
            type="text"
            placeholder={fields.preferredDateRangePlaceholder}
            className={formStyles.input}
          />
        </FormField>

        <FormField id="booking-preferredTimeOfDay" label={fields.preferredTimeOfDay}>
          <select id="booking-preferredTimeOfDay" name="preferredTimeOfDay" className={formStyles.select} defaultValue={fields.preferredTimeOfDayOptions[0]?.value}>
            {fields.preferredTimeOfDayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField id="booking-note" label={fields.note} optionalLabel={content.form.optionalLabel}>
        <textarea id="booking-note" name="note" placeholder={fields.notePlaceholder} className={formStyles.textarea} />
      </FormField>

      <div className={formStyles.submitRow}>
        <LumaButton as="button" variant="sage" buttonProps={{ type: "submit", disabled: status === "pending" }}>
          {status === "pending" ? content.form.submittingLabel : content.form.submitLabel}
        </LumaButton>
      </div>

      {status === "success" && (
        <FormStatus
          status="success"
          successTitle={content.form.successTitle}
          successBody={content.form.successBody}
          errorTitle={content.form.errorTitle}
          errorBody={content.form.errorBody}
        />
      )}
      {status === "error" && (
        <FormStatus
          status="error"
          successTitle={content.form.successTitle}
          successBody={content.form.successBody}
          errorTitle={content.form.errorTitle}
          errorBody={content.form.errorBody}
        />
      )}
    </form>
  );
}
