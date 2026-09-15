import type { ProcessStep } from "../types";
import styles from "../styles/luma-content.module.css";

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className={styles.processGrid}>
      {steps.map((step, index) => (
        <div key={step.title} className={styles.processStep}>
          <span className={styles.processStepNumber} aria-hidden="true">
            {index + 1}
          </span>
          <p className={styles.processStepTitle}>{step.title}</p>
          <p className={styles.processStepDescription}>{step.description}</p>
        </div>
      ))}
    </div>
  );
}
