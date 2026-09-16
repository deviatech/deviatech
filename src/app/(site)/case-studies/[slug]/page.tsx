import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import CaseStudyViewTracker from "@/components/analytics/CaseStudyViewTracker";

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.title} | DeviaTech Case Study`,
    description: caseStudy.summary,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      url: `/case-studies/${caseStudy.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.summary,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/case-studies/${caseStudy.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Case studies", item: `${site.url}/case-studies` },
      { "@type": "ListItem", position: 3, name: caseStudy.title, item: `${site.url}/case-studies/${caseStudy.slug}` },
    ],
  };

  return (
    <SheetFrame number="C2" label="CASE STUDY">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CaseStudyViewTracker slug={caseStudy.slug} />
      <Link href="/case-studies" className="font-mono text-xs text-ink-soft hover:text-ink">
        Back to case studies
      </Link>
      <p className="mt-8 font-mono text-xs tracking-wide text-accent-rust">{caseStudy.name}</p>
      <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
        {caseStudy.title}
      </h1>
      <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-ink-soft">{caseStudy.summary}</p>
      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Client problem</h2>
          <p className="mt-4 font-body leading-8 text-ink-soft">{caseStudy.clientProblem}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Proposed solution</h2>
          <p className="mt-4 font-body leading-8 text-ink-soft">{caseStudy.proposedSolution}</p>
        </div>
      </div>
      <div className="mt-14 grid gap-12 border-t border-line-grid pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Scope</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 font-body leading-7 text-ink-soft">
            {caseStudy.scope.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Process and timeline</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 font-body leading-7 text-ink-soft">
            {caseStudy.process.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-5 font-body leading-7 text-ink-soft">{caseStudy.timeline}</p>
        </div>
      </div>
      <div className="mt-14 grid gap-12 border-t border-line-grid pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Result</h2>
          <p className="mt-4 font-body leading-8 text-ink-soft">{caseStudy.result}</p>
        </div>
        <figure className="border-l-2 border-accent-amber pl-6">
          <blockquote className="font-body text-lg leading-8 text-ink">&ldquo;{caseStudy.testimonial}&rdquo;</blockquote>
          <figcaption className="mt-4 font-mono text-xs text-ink-soft">{caseStudy.testimonialAttribution}</figcaption>
        </figure>
      </div>
      <div className="mt-14 border-t border-line-grid pt-8">
        <p className="font-mono text-xs tracking-wide text-ink-soft">TECHNOLOGY</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {caseStudy.stack.map((item) => <span key={item} className="font-mono text-sm text-accent-rust">{item}</span>)}
        </div>
        {caseStudy.link && (
          <a href={caseStudy.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-body text-sm text-accent-rust underline">
            Visit {caseStudy.name}
          </a>
        )}
      </div>
      <div className="mt-14 border-t border-line-grid pt-8">
        <h2 className="font-display text-2xl font-semibold text-ink">Working on something similar?</h2>
        <p className="mt-3 max-w-2xl font-body leading-7 text-ink-soft">Tell us what you are trying to launch and we will help define the next useful step.</p>
        <Button
          href={buildWhatsAppLink(`Hi DeviaTech, I want to discuss a project similar to ${caseStudy.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-event="service_cta_click"
          data-ga-label={`case-study-${caseStudy.slug}`}
          className="mt-6"
        >
          {caseStudy.cta}
        </Button>
      </div>
    </SheetFrame>
  );
}
