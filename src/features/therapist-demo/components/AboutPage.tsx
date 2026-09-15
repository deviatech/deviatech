import type { AboutContent, DemoLocale } from "../types";
import { homeBreadcrumb } from "../lib/routes";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Breadcrumbs from "./Breadcrumbs";
import SplitHero from "./SplitHero";
import InfoCard from "./InfoCard";
import ConsultationCta from "./ConsultationCta";
import styles from "../styles/luma-content.module.css";

export default function AboutPage({ locale, content }: { locale: DemoLocale; content: AboutContent }) {
  return (
    <>
      <Section tone="cream" padding="compact">
        <Breadcrumbs items={[homeBreadcrumb(locale), { label: content.hero.eyebrow }]} />
        <SplitHero
          locale={locale}
          eyebrow={content.hero.eyebrow}
          heading={content.hero.heading}
          body={content.hero.body}
          image={content.hero.image}
        />
      </Section>

      <Section tone="white" padding="standard" containerSize="article">
        <SectionHeading heading={content.story.heading} />
        {content.story.paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.sectionHeadingBody} style={{ marginBottom: 16 }}>
            {paragraph}
          </p>
        ))}
      </Section>

      <Section tone="cream" padding="standard">
        <SectionHeading heading={content.howWeWork.heading} align="center" />
        <div className={styles.cardGrid3}>
          {content.howWeWork.items.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>
      </Section>

      <Section tone="white" padding="standard" containerSize="article">
        <blockquote className={styles.articleBody}>
          <p style={{ fontSize: "1.25rem", fontStyle: "italic", color: "var(--luma-text, #2d3436)" }}>
            &ldquo;{content.quote}&rdquo;
          </p>
        </blockquote>
      </Section>

      <Section tone="cream" padding="standard">
        <SectionHeading heading={content.principles.heading} body={content.principles.body} align="center" />
        <div className={styles.cardGrid3}>
          {content.principles.items.map((item) => (
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
