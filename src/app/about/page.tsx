import type { Metadata } from "next";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import { founder } from "@/content/founder";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About DeviaTech | Software Development in Lahore",
  description: "Meet DeviaTech, a Lahore software development agency building Shopify stores, MVPs, and custom web applications for businesses and startups.",
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    title: "About DeviaTech",
    description: "Meet the Lahore software development agency behind DeviaTech.",
    url: `${site.url}/about`,
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <SheetFrame number="A1" label="ABOUT">
      <p className="font-mono text-xs tracking-wide text-ink-soft">THE STUDIO</p>
      <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
        Software built with clarity, from Lahore.
      </h1>
      <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-ink-soft">
        DeviaTech helps Pakistani businesses and startup founders move from a rough idea or a manual workflow to a useful store, website, or product.
      </p>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">How we work</h2>
          <p className="mt-4 font-body leading-8 text-ink-soft">
            Every engagement starts with a clear problem, a written scope, and a fixed price before development begins. You see progress weekly, receive the agreed code and assets, and get a support window after launch.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">What we value</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 font-body leading-7 text-ink-soft">
            <li>Useful first releases over oversized roadmaps.</li>
            <li>Plain-language communication over black-box delivery.</li>
            <li>Direct ownership and a practical handoff after launch.</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 border-t border-line-grid pt-12">
        <p className="font-mono text-xs tracking-wide text-ink-soft">FOUNDER</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{founder.name}</h2>
        <p className="mt-1 font-mono text-xs text-accent-rust">{founder.role}</p>
        <div className="mt-5 max-w-2xl space-y-4 font-body leading-8 text-ink-soft">
          {founder.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>

      <Link href="/contact" className="mt-10 inline-block font-body text-sm text-accent-rust underline">
        Talk to DeviaTech about a project
      </Link>
    </SheetFrame>
  );
}
