import type { ReactNode } from "react";
import styles from "../therapistLanding.module.css";

export default function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "start",
  headingId,
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "start" | "center";
  headingId?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--tl-primary)] rtl:normal-case rtl:tracking-normal">
          {eyebrow}
        </p>
      )}
      <h2
        id={headingId}
        className={`${styles.balance} mt-3 text-[clamp(1.875rem,3vw,2.25rem)] font-medium leading-[1.15] text-[var(--tl-text)]`}
      >
        {heading}
      </h2>
      {body && (
        <p className={`${styles.pretty} ${styles.measure} mt-4 text-base leading-[1.65] text-[var(--tl-text-body)] ${align === "center" ? "mx-auto" : ""}`}>
          {body}
        </p>
      )}
    </div>
  );
}
