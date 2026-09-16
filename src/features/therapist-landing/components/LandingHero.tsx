import { LuLeaf } from "react-icons/lu";
import type { TherapistLandingContent } from "../content/types";
import { therapistLandingConfig } from "../config";
import { TlLinkButton } from "./TlButton";
import LocaleSwitch from "./LocaleSwitch";
import styles from "../therapistLanding.module.css";

export default function LandingHero({ content }: { content: TherapistLandingContent }) {
  const { hero } = content;
  const { liveDemoUrl } = therapistLandingConfig;

  return (
    <section className={`${styles.section} pt-8 md:pt-10`}>
      <div className={`${styles.container} flex justify-end`}>
        <LocaleSwitch content={content} />
      </div>

      <div className={`${styles.container} mt-6 grid items-center gap-14 lg:grid-cols-2 lg:gap-16`}>
        <div className="max-w-[560px]">
          <span className="inline-flex items-center rounded-full bg-[var(--tl-primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--tl-primary)] rtl:normal-case">
            {hero.eyebrow}
          </span>
          <h1 className={`${styles.balance} mt-5 text-[clamp(2.5rem,4vw,3.25rem)] font-medium leading-[1.06] text-[var(--tl-text)]`}>
            {hero.heading}
          </h1>
          <p className={`${styles.pretty} mt-5 max-w-[60ch] text-lg leading-[1.65] text-[var(--tl-text-body)]`}>
            {hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TlLinkButton
              href="#preview-request-form"
              data-ga-event="free_preview_cta_click"
              data-ga-label="hero"
              className="w-full sm:w-auto"
            >
              {hero.primaryCta}
            </TlLinkButton>
            {liveDemoUrl && (
              <TlLinkButton
                href={liveDemoUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                data-ga-event="concept_demo_click"
                data-ga-label="hero"
                className="w-full sm:w-auto"
              >
                {hero.secondaryCta}
              </TlLinkButton>
            )}
          </div>

          <p className="mt-5 flex items-center gap-2 text-sm text-[var(--tl-text-muted)]">
            <LuLeaf aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
            {hero.reassurance}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[600px]">
          <HeroMockup content={content} />
        </div>
      </div>
    </section>
  );
}

function HeroMockup({ content }: { content: TherapistLandingContent }) {
  const { mockup } = content.hero;

  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-[16px] border border-[var(--tl-border)] bg-[var(--tl-surface)]"
        style={{ boxShadow: "var(--tl-shadow-md)" }}
      >
        <div className="flex h-11 items-center gap-1.5 border-b border-[var(--tl-border)] px-4">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
          <span className="mx-auto text-xs text-[var(--tl-text-muted)]" dir="ltr">
            {mockup.browserLabel}
          </span>
        </div>
        <div className="aspect-[16/10] bg-[var(--tl-primary-soft)] p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-[var(--tl-primary)]/15 pb-4">
            <div>
              <p className="text-sm font-semibold text-[var(--tl-text)]">{mockup.practiceName}</p>
              <p className="text-xs text-[var(--tl-text-muted)]">{mockup.practiceTagline}</p>
            </div>
            <div className="hidden gap-3 text-xs text-[var(--tl-text-muted)] sm:flex">
              {mockup.navItems.slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="mt-6 max-w-[85%]">
            <p className={`${styles.balance} text-xl font-medium leading-tight text-[var(--tl-text)] sm:text-2xl`}>
              {mockup.heroTitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--tl-text-body)]">{mockup.heroBody}</p>
            <span className="mt-5 inline-flex items-center rounded-[8px] bg-[var(--tl-primary)] px-4 py-2 text-xs font-semibold text-white">
              {mockup.ctaLabel}
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-4 w-[26%] max-w-[104px] overflow-hidden rounded-[16px] border border-[var(--tl-border)] bg-[var(--tl-surface)] ltr:-left-8 rtl:-right-8 sm:ltr:-left-12 sm:rtl:-right-12"
        style={{ boxShadow: "var(--tl-shadow-md)" }}
      >
        <div className="border-b border-[var(--tl-border)] px-2 py-1.5">
          <p className="truncate text-[8px] font-semibold text-[var(--tl-text)]">{mockup.practiceName}</p>
        </div>
        <div className="flex h-[150px] flex-col overflow-hidden bg-[var(--tl-primary-soft)] p-2">
          <p className="line-clamp-3 text-[9px] font-medium leading-snug text-[var(--tl-text)]">{mockup.heroTitle}</p>
          <span className="mt-auto block w-full rounded-[6px] bg-[var(--tl-primary)] px-1.5 py-1 text-center text-[7px] font-semibold text-white">
            {mockup.phoneLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
