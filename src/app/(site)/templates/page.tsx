import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { templates } from "@/features/templates/catalog";
import TemplatePreview from "@/features/templates/TemplatePreview";
import styles from "@/features/templates/templates.module.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Website Templates & Live Demos | DeviaTech",
  description: "Explore Morrow and Luma website designs for therapists. Try live demos, compare layouts and discuss a website tailored to your practice.",
  alternates: { canonical: `${site.url}/templates` },
  openGraph: { title: "Website templates by DeviaTech", url: `${site.url}/templates`, images: ["/images/templates/luma/original.webp"] },
};

export default function TemplatesPage() {
  return <div className={styles.page}>
    <header className={styles.intro}>
      <p className={styles.eyebrow}>Website templates</p>
      <h1>A starting point<br />for your next website.</h1>
      <p>Explore the designs. Try the details. Choose a direction we can adapt to your practice.</p>
    </header>
    <div className={styles.catalog}>
      {templates.map((template, index) => <article className={styles.catalogCard} key={template.slug}>
        <Link href={`/templates/${template.slug}`} aria-label={`Explore ${template.name}`}>
          <TemplatePreview image={template.variants[0].image} name={template.name} mobile={template.slug === "morrow"} priority={index === 0} />
        </Link>
        <div className={styles.cardContent}>
          <div className={styles.cardHeading}><h2>{template.name}</h2><span>{template.variants.length === 1 ? "1 design" : `${template.variants.length} designs`}</span></div>
          <p>{template.summary}</p>
          <Button href={`/templates/${template.slug}`}>Explore {template.name} <span aria-hidden="true">↗</span></Button>
        </div>
      </article>)}
    </div>
    <aside className={styles.serviceLink}><h2>Building a therapy practice online?</h2><p>Explore our approach to content, personalisation and launching your website.</p><Link href="/therapist-website-design">Therapist website design <span aria-hidden="true">→</span></Link></aside>
  </div>;
}
