import Link from "next/link";
import type { Breadcrumb } from "../types";
import styles from "../styles/luma-content.module.css";

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {index > 0 && <span className={styles.breadcrumbSep} aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href} className={styles.breadcrumbLink}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.breadcrumbCurrent} aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
