import { LuPalette, LuFileText, LuCalendarClock, LuSmartphone, LuSearch, LuGlobe } from "react-icons/lu";
import type { TherapistLandingContent } from "../content/types";
import SectionHeading from "./SectionHeading";
import FeatureIcon from "./FeatureIcon";
import styles from "../therapistLanding.module.css";

const icons = [LuPalette, LuFileText, LuCalendarClock, LuSmartphone, LuSearch, LuGlobe];

export default function BenefitsGrid({ content }: { content: TherapistLandingContent }) {
  return (
    <section className={`${styles.section} ${styles.sectionSurface}`}>
      <div className={styles.container}>
        <SectionHeading eyebrow={undefined} heading={content.benefits.heading} body={content.benefits.body} />
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {content.benefits.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title} className="min-w-0 border-b border-[var(--tl-border)] pb-6 sm:border-none sm:pb-0">
                <FeatureIcon icon={Icon} />
                <h3 className="mt-4 text-base font-semibold text-[var(--tl-text)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--tl-text-body)]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
