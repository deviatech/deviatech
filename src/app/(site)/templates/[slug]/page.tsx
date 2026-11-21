import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  getTemplate,
  templates,
  templateEnquiryUrl,
} from "@/features/templates/catalog";
import TemplatePreview from "@/features/templates/TemplatePreview";
import styles from "@/features/templates/templates.module.css";
import JsonLd from "@/components/JsonLd";
import { templateJsonLd, templateMetadata, templatePath } from "@/features/templates/seo";

export function generateStaticParams() {
  return templates.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();
  return templateMetadata(template);
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();
  return (
    <div className={styles.page}>
      <JsonLd data={templateJsonLd(template)} />
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/templates">Templates</Link>
        <span aria-hidden="true">/</span>
        <span>{template.name}</span>
      </nav>
      <header className={styles.productHero}>
        <div>
          <p className={styles.eyebrow}>{template.audience}</p>
          <h1>{template.seoTitle}</h1>
          <h2>{template.summary}</h2>
          <p>{template.description}</p>
          <Button href="#designs">
            {template.variants.length > 1
              ? "Compare the three designs"
              : "Explore the design"}
          </Button>
        </div>
        <TemplatePreview
          image={template.variants[0].image}
          name={template.name}
          mobile={template.previewLayout === "mobile"}
          priority
        />
      </header>
      <section id="designs" className={styles.designSection}>
        <h2>
          {template.variants.length > 1
            ? `Compare the ${template.name} designs`
            : `Explore the ${template.name} demo`}
        </h2>
        <p className={styles.demoJourney}>{template.demoJourney}</p>
        <div
          className={`${styles.variants} ${template.variants.length === 1 ? styles.singleVariant : ""}`}
        >
          {template.variants.map((variant) => (
            <article className={styles.variant} key={variant.slug}>
              <TemplatePreview
                image={variant.image}
                name={variant.name.startsWith(template.name) ? variant.name : `${template.name} ${variant.name}`}
                mobile={template.previewLayout === "mobile"}
              />
              <div className={styles.cardContent}>
                <h3>{variant.name}</h3>
                {variant.featured && template.variants.length > 1 && (
                  <span className={styles.original}>Original design</span>
                )}
                <p>{variant.description}</p>
                <div className={styles.actions}>
                  <Button
                    href={variant.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open live demo <span aria-hidden="true">↗</span>
                    <span className="sr-only"> for {variant.name} (opens a new tab)</span>
                  </Button>
                  <Button
                    href={templateEnquiryUrl(template, variant)}
                    variant="secondary"
                  >
                    Enquire about this design
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.demoNote}>
          Demonstration content describes fictional practices. Demo forms
          preview interactions without sending or storing your information.
        </p>
      </section>
      <section className={styles.details}>
        <div>
          <h2>Inside the design</h2>
          <ul>
            {template.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Make it your own</h2>
          <p>
            Tell us about your practice, preferred design and the changes you
            need. We’ll confirm the scope, price and delivery schedule before
            work begins.
          </p>
          <Link href="/therapist-website-design">
            Explore our therapist website service →
          </Link>
        </div>
      </section>
      <section className={styles.serviceLink} aria-labelledby="related-templates">
        <h2 id="related-templates">Compare other therapist website templates</h2>
        <ul className={styles.comparison}>
          {templates.filter((other) => other.slug !== slug).map((other) => (
            <li key={other.slug}>
              <Link href={templatePath(other)}>{other.name}</Link>
              <p>{other.fit}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.closing}>
        <h2>
          Start with the design.
          <br />
          Build around your practice.
        </h2>
        <Button href={templateEnquiryUrl(template, template.variants[0])}>
          Discuss your {template.name} website
        </Button>
      </section>
    </div>
  );
}
