import type { BookingPageContent, DemoLocale } from "../types";
import { homeBreadcrumb } from "../lib/routes";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Breadcrumbs from "./Breadcrumbs";
import BookingForm from "./BookingForm";
import styles from "../styles/luma-content.module.css";
import formStyles from "../styles/luma-form.module.css";

export default function BookingPage({ locale, content }: { locale: DemoLocale; content: BookingPageContent }) {
  return (
    <>
      <Section tone="cream" padding="standard">
        <Breadcrumbs items={[homeBreadcrumb(locale), { label: content.hero.eyebrow }]} />
      </Section>

      <Section tone="cream" padding="compact">
        <div className={formStyles.contactGrid}>
          <div>
            <SectionHeading eyebrow={content.hero.eyebrow} heading={content.hero.heading} body={content.hero.body} as="h1" />
            <div className={formStyles.formNotice} style={{ marginBottom: 24 }}>
              {content.hero.demoNotice}
            </div>
            <ul className={styles.checklist}>
              {content.reassurance.map((item) => (
                <li key={item} className={styles.checklistItem}>
                  <span className={styles.checklistIcon} aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card} style={{ padding: 32 }}>
            <h2 style={{ marginBottom: 24 }}>{content.form.heading}</h2>
            <BookingForm locale={locale} content={content} />
          </div>
        </div>
      </Section>
    </>
  );
}
