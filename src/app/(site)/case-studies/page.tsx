import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import SheetFrame from "@/components/ui/SheetFrame";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | DeviaTech",
  description: "Selected ecommerce, web product, and software projects built by DeviaTech.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "DeviaTech case studies",
    description: "Selected ecommerce, web product, and software projects built by DeviaTech.",
    url: "/case-studies",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return (
    <SheetFrame number="C1" label="CASE STUDIES">
      <p className="font-mono text-xs tracking-wide text-ink-soft">SELECTED WORK</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Built for real launch conditions.</h1>
      <p className="mt-5 max-w-2xl font-body text-lg leading-8 text-ink-soft">
        A look at the stores, products, and connected software experiences DeviaTech has worked on.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {caseStudies.map((caseStudy) => (
          <Card key={caseStudy.slug}>
            <p className="font-mono text-xs text-accent-rust">{caseStudy.name}</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">
              <Link href={`/case-studies/${caseStudy.slug}`} className="hover:text-accent-rust">
                {caseStudy.title}
              </Link>
            </h2>
            <p className="mt-3 font-body text-ink-soft">{caseStudy.summary}</p>
          </Card>
        ))}
      </div>
    </SheetFrame>
  );
}
