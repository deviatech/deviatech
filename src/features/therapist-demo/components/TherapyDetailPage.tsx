import type { DemoLocale, TherapyDetailContent } from "../types";
import { homeBreadcrumb, route } from "../lib/routes";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Breadcrumbs from "./Breadcrumbs";
import SplitHero from "./SplitHero";
import SplitEditorialSection from "./SplitEditorialSection";
import InfoCard from "./InfoCard";
import ConsultationCta from "./ConsultationCta";
import LumaButton from "./LumaButton";
import styles from "../styles/luma-content.module.css";

export default function TherapyDetailPage({
  locale,
  content,
  servicesLabel,
}: {
  locale: DemoLocale;
  content: TherapyDetailContent;
  servicesLabel: string;
}) {
  return (
    <>
      <Section tone="cream" padding="spacious">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale),
            { label: servicesLabel, href: route("services", locale) },
            { label: content.breadcrumbLabel },
          ]}
        />
        <SplitHero
          locale={locale}
          eyebrow={content.hero.eyebrow}
          heading={content.hero.heading}
          body={content.hero.body}
          image={content.hero.image}
        >
          <LumaButton href={route("book", locale)} variant="sage">
            {content.cta.buttonLabel}
          </LumaButton>
        </SplitHero>
      </Section>

      <Section tone="white" padding="standard">
        <SectionHeading heading={content.concerns.heading} align="center" />
        <div className={styles.concernGrid}>
          {content.concerns.items.map((item) => (
            <div key={item} className={styles.infoTile}>
              <p className={styles.infoTileDescription}>{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" padding="standard">
        <SplitEditorialSection
          locale={locale}
          heading={content.outcomes.heading}
          body={content.outcomes.body}
          image={content.outcomes.imageA}
          secondaryImage={content.outcomes.imageB}
          mediaPosition="start"
        >
          <ul className={styles.checklist}>
            {content.outcomes.items.map((item) => (
              <li key={item} className={styles.checklistItem}>
                <span className={styles.checklistIcon} aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </SplitEditorialSection>
      </Section>

      <Section tone="white" padding="standard">
        <SectionHeading heading={content.sessionInfo.heading} align="center" />
        <div className={styles.cardGrid2}>
          {content.sessionInfo.items.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>
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
