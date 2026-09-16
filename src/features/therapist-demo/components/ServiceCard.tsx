import Link from "next/link";
import type { DemoLocale, ServiceSummary } from "../types";
import DemoImage from "./DemoImage";
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
        <DemoImage
          image={service.image}
          locale={locale}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
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
