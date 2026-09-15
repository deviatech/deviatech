import Link from "next/link";
import type { Article, DemoLocale } from "../types";
import { blogPostRoute } from "../lib/routes";
import PlaceholderImage from "./PlaceholderImage";
import styles from "../styles/luma-content.module.css";

export default function ArticleCard({
  article,
  locale,
  readingLabel,
}: {
  article: Article;
  locale: DemoLocale;
  readingLabel: (minutes: number) => string;
}) {
  return (
    <Link href={blogPostRoute(article.slug, locale)} className={styles.articleCard}>
      <div className={styles.articleCardMedia}>
        <PlaceholderImage image={article.image} locale={locale} />
      </div>
      <p className={styles.articleCardCategory}>{article.categoryLabel}</p>
      <h3 className={styles.articleCardTitle}>{article.title}</h3>
      <p className={styles.articleCardExcerpt}>{article.excerpt}</p>
      <p className={styles.articleCardMeta}>{readingLabel(article.readingMinutes)}</p>
    </Link>
  );
}
