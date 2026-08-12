import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import Button from "@/components/ui/Button";
import { commercialPages, getCommercialPageBySlug } from "@/content/commercial-pages";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";

export function generateStaticParams() {
  return commercialPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getCommercialPageBySlug(slug);
  if (!page) return {};

  return {
    title: `${page.title} | DeviaTech`,
    description: page.description,
    alternates: { canonical: `${site.url}/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${site.url}/${page.slug}`,
      type: "website",
      images: [{ url: `${site.url}/logo/icon-512.png`, width: 512, height: 512, alt: page.title }],
    },
  };
}

export default async function CommercialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getCommercialPageBySlug(slug);
  if (!page) notFound();
  const portfolio = getCaseStudyBySlug(page.portfolioSlug);

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.name,
    description: page.description,
    url: `${site.url}/${page.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      areaServed: ["Lahore, Pakistan", "Pakistan"],
    },
    serviceType: page.name,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <SheetFrame number="S1" label="SERVICE">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <p className="font-mono text-xs tracking-wide text-ink-soft">DEVIATECH SERVICES</p>
      <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">
        {page.title}
      </h1>
      <p className="mt-6 max-w-3xl font-body text-lg leading-8 text-ink-soft">{page.intro}</p>
      <Button
        href={buildWhatsAppLink(`Hi DeviaTech, I want to talk about ${page.name}.`)}
        target="_blank"
        rel="noopener noreferrer"
        data-ga-event="service_cta_click"
        data-ga-label={page.slug}
        className="mt-8"
      >
        {page.cta}
      </Button>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">The customer problem</h2>
          <p className="mt-4 font-body leading-8 text-ink-soft">{page.problem}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Our solution</h2>
          <p className="mt-4 font-body leading-8 text-ink-soft">{page.solution}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-12 border-t border-line-grid pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Deliverables</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 font-body leading-7 text-ink-soft">
            {page.deliverables.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Who this is for</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 font-body leading-7 text-ink-soft">
            {page.suitableFor.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <h3 className="mt-8 font-display text-lg font-semibold text-ink">Who it is not for</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 font-body leading-7 text-ink-soft">
            {page.notSuitableFor.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-16 grid gap-12 border-t border-line-grid pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Process and timeline</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 font-body leading-7 text-ink-soft">
            {page.process.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-5 font-body leading-7 text-ink-soft">{page.timeline}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Pricing</h2>
          <p className="mt-5 font-body leading-7 text-ink-soft">{page.pricing}</p>
        </div>
      </div>

      {portfolio && (
        <div className="mt-16 border-t border-line-grid pt-12">
          <p className="font-mono text-xs tracking-wide text-ink-soft">RELEVANT PORTFOLIO</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{portfolio.title}</h2>
          <p className="mt-4 max-w-2xl font-body leading-7 text-ink-soft">{page.proof}</p>
          <Link href={`/case-studies/${portfolio.slug}`} className="mt-5 inline-block font-body text-sm text-accent-rust underline">
            Read the case study
          </Link>
        </div>
      )}

      <div className="mt-16 border-t border-line-grid pt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-line-grid border-y border-line-grid">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="cursor-pointer font-body font-medium text-ink">{faq.question}</summary>
              <p className="mt-3 font-body leading-7 text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-line-grid pt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Ready to discuss your project?</h2>
        <p className="mt-3 max-w-2xl font-body leading-7 text-ink-soft">Share what you are trying to launch, improve, or support. We will respond with the next useful step.</p>
        <Button
          href={buildWhatsAppLink(`Hi DeviaTech, I want to talk about ${page.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-event="service_cta_click"
          data-ga-label={`${page.slug}-footer`}
          className="mt-6"
        >
          {page.cta}
        </Button>
      </div>
    </SheetFrame>
  );
}
