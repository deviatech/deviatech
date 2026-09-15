import { LuPlus } from "react-icons/lu";
import type { TherapistLandingContent } from "../content/types";
import styles from "../therapistLanding.module.css";

export default function LandingFaq({ content }: { content: TherapistLandingContent }) {
  return (
    <section className={`${styles.section} ${styles.sectionSurface}`}>
      <div className={`${styles.container} mx-auto max-w-[800px]`}>
        <h2 className={`${styles.balance} text-center text-[clamp(1.875rem,3vw,2.25rem)] font-medium leading-[1.15] text-[var(--tl-text)]`}>
          {content.faq.heading}
        </h2>

        <div className="mt-8 divide-y divide-[var(--tl-border)] border-y border-[var(--tl-border)]">
          {content.faq.items.map((item) => (
            <details key={item.question} className="group min-h-[60px] py-5">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--tl-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)]">
                <span>{item.question}</span>
                <LuPlus aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--tl-primary)] transition-transform duration-150 group-open:rotate-45" />
              </summary>
              <p className="mt-3 pb-1 text-sm leading-7 text-[var(--tl-text-body)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
