import type { ReactNode } from "react";
import styles from "../styles/luma-content.module.css";

export default function SectionHeading({
  eyebrow,
  heading,
  body,
  id,
  align = "start",
  as: HeadingTag = "h2",
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  id?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={`${styles.sectionHeading} ${align === "center" ? styles.sectionHeadingCenter : ""}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <HeadingTag id={id} className={styles.sectionHeadingTitle}>
        {heading}
      </HeadingTag>
      {body && <p className={styles.sectionHeadingBody}>{body}</p>}
    </div>
  );
}
