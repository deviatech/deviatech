import Link from "next/link";
import Button from "@/components/ui/Button";
import { templates } from "@/features/templates/catalog";
import TemplatePreview from "@/features/templates/TemplatePreview";
import styles from "@/features/templates/templates.module.css";
import JsonLd from "@/components/JsonLd";
import { catalogDescription, catalogJsonLd, catalogTitle, templateMetadata, templatePath } from "@/features/templates/seo";

export const metadata = templateMetadata();

export default function TemplatesPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={catalogJsonLd()} />
      <header className={styles.intro}>
        <p className={styles.eyebrow}>DeviaTech design collection</p>
        <h1>{catalogTitle}</h1>
        <p>{catalogDescription}</p>
      </header>
      <div className={styles.catalog}>
        {templates.map((template, index) => (
          <article className={styles.catalogCard} key={template.slug}>
            <Link
              href={templatePath(template)}
              aria-label={`Explore ${template.name}`}
            >
              <TemplatePreview
                image={template.variants[0].image}
                name={template.name}
                mobile={template.previewLayout === "mobile"}
                priority={index === 0}
              />
            </Link>
            <div className={styles.cardContent}>
              <div className={styles.cardHeading}>
                <h2>{template.name}</h2>
                <span>
                  {template.variants.length === 1
                    ? "1 design"
                    : `${template.variants.length} designs`}
                </span>
              </div>
              <p>{template.summary}</p>
              <Button href={templatePath(template)}>
                Explore {template.name} <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </article>
        ))}
      </div>
      <section className={styles.serviceLink} aria-labelledby="compare-templates">
        <h2 id="compare-templates">Which template fits your practice?</h2>
        <ul className={styles.comparison}>
          {templates.map((template) => (
            <li key={template.slug}>
              <Link href={templatePath(template)}>{template.name}</Link>
              <p>{template.fit}</p>
            </li>
          ))}
        </ul>
        <p>Each demo shows a fictional practice. Request previews and sample forms do not send information or make bookings.</p>
      </section>
      <aside className={styles.serviceLink}>
        <h2>Building a therapy practice online?</h2>
        <p>
          Explore our approach to content, personalisation and launching your
          website.
        </p>
        <Link href="/therapist-website-design">
          Therapist website design <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </div>
  );
}
