import Link from "next/link";
import type { DemoLocale, ServiceSummary } from "../types";
import PlaceholderImage from "./PlaceholderImage";
import styles from "../styles/luma-content.module.css";

export default function ServiceCard({
  service,
  locale,
  learnMoreLabel,
}: {
  service: ServiceSummary;
  locale: DemoLocale;
  learnMoreLabel: string;
}) {
  return (
    <article className={styles.serviceCard}>
      <div className={styles.serviceCardMedia}>
        <PlaceholderImage image={service.image} locale={locale} />
      </div>
      <div className={styles.serviceCardBody}>
        <h3 className={styles.serviceCardTitle}>{service.title}</h3>
        <p className={styles.serviceCardDescription}>{service.description}</p>
        {service.href && (
          <Link href={service.href} className={styles.serviceCardLink}>
            {learnMoreLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
