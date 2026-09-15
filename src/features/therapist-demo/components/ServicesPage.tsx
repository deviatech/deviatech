import type { DemoLocale, ServicesPageContent } from "../types";
import { homeBreadcrumb } from "../lib/routes";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Breadcrumbs from "./Breadcrumbs";
import ServiceCard from "./ServiceCard";
import ProcessSteps from "./ProcessSteps";
import ConsultationCta from "./ConsultationCta";
import styles from "../styles/luma-content.module.css";

export default function ServicesPage({ locale, content }: { locale: DemoLocale; content: ServicesPageContent }) {
  const learnMoreLabel = locale === "fa" ? "بیشتر بدانید" : "Learn more";

  return (
    <>
      <Section tone="cream" padding="standard">
        <Breadcrumbs items={[homeBreadcrumb(locale), { label: content.hero.eyebrow }]} />
        <SectionHeading
          eyebrow={content.hero.eyebrow}
          heading={content.hero.heading}
          body={content.hero.body}
          align="center"
          as="h1"
        />
      </Section>

      <Section tone="white" padding="standard">
        <div className={styles.cardGrid2}>
          {content.services.map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale} learnMoreLabel={learnMoreLabel} />
          ))}
        </div>
      </Section>

      <Section tone="cream" padding="standard">
        <SectionHeading heading={content.process.heading} body={content.process.body} align="center" />
        <ProcessSteps steps={content.process.steps} />
      </Section>

      <Section tone="cream" padding="standard">
        <ConsultationCta
          locale={locale}
          heading={content.cta.heading}
          body={content.cta.body}
          buttonLabel={content.cta.buttonLabel}
        />
      </Section>
    </>
  );
}
