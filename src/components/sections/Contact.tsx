"use client";

import { useState } from "react";
import SheetFrame from "@/components/ui/SheetFrame";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      contact: (form.elements.namedItem("contact") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
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
            className="w-full text-base"
          >
            Chat on WhatsApp
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            name="name"
            placeholder="Name"
            className="rounded-sm border border-line-grid bg-surface px-4 py-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-amber"
          />
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
            {status === "submitting" ? "Sending..." : "Submit"}
          </button>
          {status === "success" && (
            <p className="font-mono text-xs text-ink-soft">Thanks — we&apos;ll be in touch soon.</p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs text-accent-rust">Something went wrong. Try WhatsApp instead.</p>
          )}
        </form>
      </div>
    </SheetFrame>
  );
}
