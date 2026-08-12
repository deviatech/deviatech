import type { Metadata } from "next";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import Contact from "@/components/sections/Contact";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact DeviaTech | Start a Software Project in Lahore",
  description: "Contact DeviaTech about Shopify development, custom software, MVP development, web development, or ongoing support in Lahore and Pakistan.",
  alternates: { canonical: `${site.url}/contact` },
  openGraph: {
    title: "Contact DeviaTech",
    description: "Start a software, ecommerce, or web project with DeviaTech in Lahore.",
    url: `${site.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <SheetFrame number="C1" label="CONTACT">
        <p className="font-mono text-xs tracking-wide text-ink-soft">START HERE</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
          Tell us what you are trying to launch.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-ink-soft">
          Share the business problem, product idea, or website you need help with. We will suggest the most useful next step, even if that means a smaller scope.
        </p>
        <Link
          href={buildWhatsAppLink(site.whatsappDefaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-event="whatsapp_click"
          data-ga-label="contact-intro"
          className="mt-8 inline-flex rounded-sm bg-accent-amber px-6 py-3 font-body text-sm font-medium text-ink"
        >
          Chat on WhatsApp
        </Link>
      </SheetFrame>
      <Contact />
    </>
  );
}
