"use client";

import { useRef, useState } from "react";
import type { ContactPageContent, DemoLocale } from "../types";
import FormField from "./FormField";
import FormStatus from "./FormStatus";
import LumaButton from "./LumaButton";
import formStyles from "../styles/luma-form.module.css";

type FieldErrors = Partial<Record<"fullName" | "email" | "subject" | "message", string>>;

export default function ContactForm({ locale, content }: { locale: DemoLocale; content: ContactPageContent }) {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!fullName) nextErrors.fullName = content.form.validation.required;
    if (!email) nextErrors.email = content.form.validation.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = content.form.validation.email;
    if (!subject) nextErrors.subject = content.form.validation.required;
    if (!message) nextErrors.message = content.form.validation.required;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      window.setTimeout(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }, 0);
      return;
    }

    setErrors({});
    setStatus("pending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: `therapist-demo-contact-${locale}`,
          locale,
          fullName,
          email,
          subject,
          message,
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
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={formStyles.formGrid}>
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className={formStyles.honeypot}
        aria-hidden="true"
      />

      <FormField id="contact-fullName" label={content.form.fields.fullName} required error={errors.fullName}>
        <input
          id="contact-fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder={content.form.fields.fullNamePlaceholder}
          className={`${formStyles.input} ${errors.fullName ? formStyles.inputError : ""}`}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
        />
      </FormField>

      <FormField id="contact-email" label={content.form.fields.email} required error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={content.form.fields.emailPlaceholder}
          className={`${formStyles.input} ${errors.email ? formStyles.inputError : ""}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
      </FormField>

      <FormField id="contact-subject" label={content.form.fields.subject} required error={errors.subject}>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={content.form.fields.subjectPlaceholder}
          className={`${formStyles.input} ${errors.subject ? formStyles.inputError : ""}`}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />
      </FormField>

      <FormField id="contact-message" label={content.form.fields.message} required error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          placeholder={content.form.fields.messagePlaceholder}
          className={`${formStyles.textarea} ${errors.message ? formStyles.inputError : ""}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
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
