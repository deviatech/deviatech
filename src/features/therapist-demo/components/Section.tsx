import type { ReactNode } from "react";
import Container from "./Container";
import styles from "../styles/luma.module.css";

const paddingClass = {
  standard: styles.sectionStandard,
  spacious: styles.sectionSpacious,
  compact: styles.sectionCompact,
} as const;

const toneClass = {
  cream: styles.toneCream,
  white: styles.toneWhite,
  charcoal: styles.toneCharcoal,
} as const;

export default function Section({
  tone = "cream",
  padding = "standard",
  containerSize = "content",
  children,
  className,
  ariaLabelledby,
}: {
  tone?: "cream" | "white" | "charcoal";
  padding?: "standard" | "spacious" | "compact";
  containerSize?: "content" | "wide" | "article";
  children: ReactNode;
  className?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      className={`${toneClass[tone]} ${paddingClass[padding]} ${className ?? ""}`}
      aria-labelledby={ariaLabelledby}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
