import type { DemoLocale, HomeContent } from "../types";
import { getArticles } from "../lib/blog";
import { route } from "../lib/routes";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import SplitHero from "./SplitHero";
import SplitEditorialSection from "./SplitEditorialSection";
import ServiceCard from "./ServiceCard";
import ArticleCard from "./ArticleCard";
import InfoCard from "./InfoCard";
import FaqAccordion from "./FaqAccordion";
import ConsultationCta from "./ConsultationCta";
import LumaButton from "./LumaButton";
import { readingMinutesLabel, learnMoreLabel as getLearnMoreLabel } from "../lib/ui-strings";
import styles from "../styles/luma-content.module.css";

export default function HomePage({ locale, content }: { locale: DemoLocale; content: HomeContent }) {
  const articles = getArticles(locale).slice(0, 3);
  const readingLabel = (minutes: number) => readingMinutesLabel(minutes, locale);
  const learnMoreLabelText = getLearnMoreLabel(locale);

  return (
    <>
      <Section tone="cream" padding="spacious">
        <SplitHero
          locale={locale}
          eyebrow={content.hero.eyebrow}
          heading={content.hero.heading}
          body={content.hero.body}
          image={content.hero.image}
          reassurance={content.hero.reassurance}
        >
          <LumaButton href={route("book", locale)} variant="sage">
            {content.hero.primaryCta}
          </LumaButton>
          <LumaButton href={route("about", locale)} variant="outline">
            {content.hero.secondaryCta}
          </LumaButton>
        </SplitHero>
      </Section>

      <Section tone="white" padding="compact">
        <div className={styles.chipRow} style={{ justifyContent: "center" }}>
          {content.principles.items.map((item) => (
            <span key={item} className={styles.chip}>
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="cream" padding="standard">
        <SplitEditorialSection
          locale={locale}
          eyebrow={content.listening.eyebrow}
          heading={content.listening.heading}
          body={content.listening.body}
          image={content.listening.image}
          mediaPosition="start"
        >
          <div className={styles.cardGrid2}>
            {content.listening.items.map((item) => (
              <InfoCard key={item.title} item={item} />
            ))}
          </div>
        </SplitEditorialSection>
      </Section>

      <Section tone="white" padding="standard">
        <SectionHeading heading={content.services.heading} body={content.services.body} align="center" />
        <div className={styles.cardGrid3}>
          {content.services.items.map((service) => (
            <ServiceCard key={service.id} service={service} locale={locale} learnMoreLabel={learnMoreLabelText} />
          ))}
        </div>
      </Section>

      <Section tone="charcoal" padding="standard">
        <SectionHeading heading={content.challenges.heading} body={content.challenges.body} align="center" />
        <div className={styles.concernGrid}>
          {content.challenges.items.map((item) => (
            <div key={item} className={styles.infoTile} style={{ background: "rgba(255,255,255,0.06)" }}>
              <p className={styles.infoTileDescription} style={{ color: "rgba(255,255,255,0.85)" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" padding="standard">
        <SplitEditorialSection
          locale={locale}
          heading={content.approach.heading}
          body={content.approach.body}
          image={content.approach.imageA}
          secondaryImage={content.approach.imageB}
        >
          <ul className={styles.checklist}>
            {content.approach.checklist.map((item) => (
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
        <SectionHeading heading={content.articlesPreview.heading} body={content.articlesPreview.body} align="center" />
        <div className={styles.cardGrid3}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} locale={locale} readingLabel={readingLabel} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <LumaButton href={route("blog", locale)} variant="outline">
            {content.articlesPreview.viewAllLabel}
          </LumaButton>
        </div>
      </Section>

      <Section tone="cream" padding="standard" containerSize="article">
        <SectionHeading heading={content.faq.heading} align="center" />
        <FaqAccordion items={content.faq.items} />
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
