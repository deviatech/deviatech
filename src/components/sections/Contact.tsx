"use client";

import { useState } from "react";
import SheetFrame from "@/components/ui/SheetFrame";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const formStarted = useRef(false);
  const router = useRouter();

  function handleFormStart() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("form_start", { location: window.location.pathname });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      contact: (form.elements.namedItem("contact") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      preferredContact: (form.elements.namedItem("preferredContact") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("form_submit", { location: window.location.pathname });
      trackEvent("consultation_booked", { location: window.location.pathname });
      form.reset();
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SheetFrame number="08" label="CONTACT" id="contact">
      <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
        Let&apos;s build something.
      </h2>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <Button
            href={buildWhatsAppLink(site.whatsappDefaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-ga-event="whatsapp_click"
            data-ga-label="contact"
            className="w-full text-base"
          >
            Chat on WhatsApp
          </Button>
        </div>
        <form onSubmit={handleSubmit} onFocus={handleFormStart} className="flex flex-col gap-4">
          <input
            required
            name="name"
            placeholder="Name"
            className="rounded-sm border border-line-grid bg-surface px-4 py-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
          />
          <select
            required
            name="projectType"
            defaultValue=""
            className="rounded-sm border border-line-grid bg-surface px-4 py-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
          >
            <option value="" disabled>Project type</option>
            <option value="Shopify store">Shopify store</option>
            <option value="Custom software">Custom software</option>
            <option value="MVP">MVP</option>
            <option value="Business website">Business website</option>
            <option value="Maintenance and support">Maintenance and support</option>
            <option value="Dedicated development team">Dedicated development team</option>
            <option value="White-label partnership">White-label partnership</option>
          </select>
          <select
            required
            name="budget"
            defaultValue=""
            className="rounded-sm border border-line-grid bg-surface px-4 py-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
          >
            <option value="" disabled>Approximate budget</option>
            <option value="Under PKR 40,000">Under PKR 40,000</option>
            <option value="PKR 40,000-150,000">PKR 40,000-150,000</option>
            <option value="PKR 150,000-300,000">PKR 150,000-300,000</option>
            <option value="PKR 300,000+">PKR 300,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
          <select
            required
            name="preferredContact"
            defaultValue=""
            className="rounded-sm border border-line-grid bg-surface px-4 py-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
          >
            <option value="" disabled>Preferred contact method</option>
            <option value="Email">Email</option>
            <option value="Phone call">Phone call</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          <input
            required
            name="contact"
            placeholder="Email or phone"
            className="rounded-sm border border-line-grid bg-surface px-4 py-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
          />
          <textarea
            required
            name="message"
            placeholder="What are you building?"
            rows={4}
            className="rounded-sm border border-line-grid bg-surface px-4 py-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-fit rounded-sm bg-accent-amber px-6 py-3 font-body text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
          >
            {status === "submitting" ? "Sending..." : "Request a project consultation"}
          </button>
          {status === "error" && (
            <p className="font-mono text-xs text-accent-rust">Something went wrong. Try WhatsApp instead.</p>
          )}
          <p className="font-mono text-xs text-ink-soft">We normally reply within one business day.</p>
        </form>
      </div>
    </SheetFrame>
  );
}
