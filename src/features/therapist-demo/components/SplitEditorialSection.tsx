import type { ReactNode } from "react";
import type { DemoLocale, ImageDescriptor } from "../types";
import DemoImage from "./DemoImage";
import styles from "../styles/luma-content.module.css";

export default function SplitEditorialSection({
  locale,
  eyebrow,
  heading,
  body,
  image,
  secondaryImage,
  mediaPosition = "end",
  children,
}: {
  locale: DemoLocale;
  eyebrow?: string;
  heading: string;
  body: string;
  image: ImageDescriptor;
  secondaryImage?: ImageDescriptor;
  mediaPosition?: "start" | "end";
  children?: ReactNode;
}) {
  return (
    <div className={`${styles.splitSection} ${mediaPosition === "start" ? styles.splitReverse : ""}`}>
      <div>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 className={styles.sectionHeadingTitle}>{heading}</h2>
        <p className={styles.sectionHeadingBody} style={{ marginBottom: 8 }}>
          {body}
        </p>
        {children}
      </div>
      <div className={styles.splitMedia}>
        {secondaryImage ? (
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 16 }}>
            <DemoImage image={image} locale={locale} sizes="(min-width: 1024px) 28vw, 55vw" />
            <div style={{ alignSelf: "end" }}>
              <DemoImage image={secondaryImage} locale={locale} sizes="(min-width: 1024px) 23vw, 45vw" />
            </div>
          </div>
        ) : (
          <DemoImage image={image} locale={locale} sizes="(min-width: 1024px) 50vw, 100vw" />
        )}
      </div>
    </div>
  );
}
