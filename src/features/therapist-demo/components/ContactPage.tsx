import type { ContactPageContent, DemoLocale } from "../types";
import { homeBreadcrumb } from "../lib/routes";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Breadcrumbs from "./Breadcrumbs";
import ContactForm from "./ContactForm";
import FaqAccordion from "./FaqAccordion";
import ConsultationCta from "./ConsultationCta";
import formStyles from "../styles/luma-form.module.css";

export default function ContactPage({ locale, content }: { locale: DemoLocale; content: ContactPageContent }) {
  return (
    <>
      <Section tone="cream" padding="standard">
        <Breadcrumbs items={[homeBreadcrumb(locale), { label: content.hero.eyebrow }]} />
        <SectionHeading eyebrow={content.hero.eyebrow} heading={content.hero.heading} body={content.hero.body} as="h1" />
      </Section>

      <Section tone="white" padding="standard">
        <div className={formStyles.contactGrid}>
          <div>
            <h2 style={{ marginBottom: 24 }}>{content.form.heading}</h2>
            <ContactForm locale={locale} content={content} />
          </div>
          <div>
            <h2 style={{ marginBottom: 8 }}>{content.channelsHeading}</h2>
            <div className={formStyles.contactChannels}>
              {content.channels.map((channel) => (
                <a key={channel.href} href={channel.href} className={formStyles.channelCard}>
                  <p className={formStyles.channelLabel}>{channel.label}</p>
                  <p className={formStyles.channelDescription}>{channel.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream" padding="standard" containerSize="article">
        <SectionHeading heading={content.faq.heading} align="center" />
        <FaqAccordion items={content.faq.items} />
      </Section>

      <Section tone="cream" padding="standard">
        <ConsultationCta locale={locale} heading={content.cta.heading} body={content.cta.body} buttonLabel={content.cta.buttonLabel} />
      </Section>
    </>
  );
}
