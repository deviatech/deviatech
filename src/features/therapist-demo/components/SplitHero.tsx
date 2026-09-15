import type { ReactNode } from "react";
import type { DemoLocale, ImageDescriptor } from "../types";
import PlaceholderImage from "./PlaceholderImage";
import styles from "../styles/luma-content.module.css";

export default function SplitHero({
  locale,
  eyebrow,
  heading,
  body,
  image,
  mediaPosition = "end",
  headingLevel = "h1",
  reassurance,
  children,
}: {
  locale: DemoLocale;
  eyebrow: string;
  heading: string;
  body: string;
  image: ImageDescriptor;
  mediaPosition?: "start" | "end";
  headingLevel?: "h1" | "h2";
  reassurance?: string;
  children?: ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <div className={`${styles.hero} ${mediaPosition === "start" ? styles.heroReverse : ""}`}>
      <div>
        <p className={styles.heroEyebrow}>{eyebrow}</p>
        <Heading className={headingLevel === "h1" ? styles.heroHeading : styles.innerHeroHeading}>
          {heading}
        </Heading>
        <p className={styles.heroBody}>{body}</p>
        {children && <div className={styles.heroActions}>{children}</div>}
        {reassurance && <p className={styles.heroReassurance}>{reassurance}</p>}
      </div>
      <div className={styles.heroMedia}>
        <PlaceholderImage image={image} locale={locale} />
      </div>
    </div>
  );
}
