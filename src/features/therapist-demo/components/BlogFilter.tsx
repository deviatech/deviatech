import Link from "next/link";
import type { ArticleCategory, DemoLocale } from "../types";
import { route } from "../lib/routes";
import styles from "../styles/luma-blog.module.css";

export default function BlogFilter({
  locale,
  categories,
  activeCategory,
  allLabel,
}: {
  locale: DemoLocale;
  categories: { id: ArticleCategory; label: string }[];
  activeCategory?: ArticleCategory;
  allLabel: string;
}) {
  const base = route("blog", locale);

  return (
    <nav aria-label={locale === "fa" ? "فیلتر دسته‌بندی مقالات" : "Filter articles by category"} className={styles.filterRow}>
      <Link
        href={base}
        className={`${styles.filterChip} ${!activeCategory ? styles.filterChipActive : ""}`}
        aria-current={!activeCategory ? "true" : undefined}
      >
        {allLabel}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`${base}?category=${category.id}`}
          className={`${styles.filterChip} ${activeCategory === category.id ? styles.filterChipActive : ""}`}
          aria-current={activeCategory === category.id ? "true" : undefined}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  );
}
