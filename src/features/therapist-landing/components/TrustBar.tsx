import { LuUsers, LuClipboardCheck, LuKey, LuLifeBuoy } from "react-icons/lu";
import type { TherapistLandingContent } from "../content/types";
import FeatureIcon from "./FeatureIcon";
import styles from "../therapistLanding.module.css";

const icons = [LuUsers, LuClipboardCheck, LuKey, LuLifeBuoy];

export default function TrustBar({ content }: { content: TherapistLandingContent }) {
  return (
    <section className={`${styles.section} ${styles.sectionSurface} py-10 md:py-12`}>
      <h2 className={styles.visuallyHidden}>{content.trustBar.heading}</h2>
      <div className={`${styles.container} grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6`}>
        {content.trustBar.items.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={item.title} className="flex items-start gap-3">
              <FeatureIcon icon={Icon} />
              <div>
                <p className="text-sm font-semibold text-[var(--tl-text)]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--tl-text-body)]">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
