import type { TherapistLandingContent } from "../content/types";
import SectionHeading from "./SectionHeading";
import styles from "../therapistLanding.module.css";

export default function ProcessSteps({ content }: { content: TherapistLandingContent }) {
  const { process } = content;

  return (
    <section className={`${styles.section} ${styles.sectionSurface}`}>
      <div className={styles.container}>
        <SectionHeading heading={process.heading} body={process.body} align="center" />

        <ol className="mt-12 hidden grid-cols-4 gap-6 md:grid">
          {process.steps.map((step, index) => (
            <li key={step.title} className="relative min-w-0 text-center">
              {index < process.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-5 h-px w-full bg-[var(--tl-border)] ltr:left-1/2 rtl:right-1/2"
                  style={{ zIndex: 0 }}
                />
              )}
              <span
                className="relative z-[1] mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--tl-primary)] bg-[var(--tl-surface)] text-sm font-semibold text-[var(--tl-primary)]"
              >
                {index + 1}
              </span>
              <p className="mt-4 text-sm font-semibold text-[var(--tl-text)]">{step.title}</p>
              <p className="mx-auto mt-2 max-w-[22ch] text-sm leading-6 text-[var(--tl-text-body)]">{step.description}</p>
            </li>
          ))}
        </ol>

        <ol className="mt-10 flex flex-col gap-8 md:hidden">
          {process.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--tl-primary)] bg-[var(--tl-surface)] text-sm font-semibold text-[var(--tl-primary)]">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--tl-text)]">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--tl-text-body)]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
