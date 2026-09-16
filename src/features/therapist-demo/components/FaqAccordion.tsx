import type { FaqItem } from "../types";
import styles from "../styles/luma-content.module.css";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className={styles.faqList}>
      {items.map((item) => (
        <details key={item.question} className={styles.faqItem}>
          <summary className={styles.faqSummary}>
            <span>{item.question}</span>
            <span className={styles.faqIcon} aria-hidden="true">
              +
            </span>
          </summary>
          <p className={styles.faqAnswer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
