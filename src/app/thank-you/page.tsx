import type { Metadata } from "next";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Thank You | DeviaTech",
  description: "Your DeviaTech project consultation request has been received.",
  alternates: { canonical: `${site.url}/thank-you` },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <SheetFrame number="C2" label="RECEIVED">
      <p className="font-mono text-xs tracking-wide text-accent-rust">REQUEST RECEIVED</p>
      <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
        Thanks. We have your project details.
      </h1>
      <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-ink-soft">
        We normally reply within one business day. We will review your project type, budget, and goals before getting back to you with the next useful step.
      </p>
      <div className="mt-8 flex flex-wrap gap-5 font-body text-sm">
        <Link href="/" className="text-accent-rust underline">Back to homepage</Link>
        <Link href="/case-studies" className="text-accent-rust underline">View case studies</Link>
      </div>
    </SheetFrame>
  );
}
