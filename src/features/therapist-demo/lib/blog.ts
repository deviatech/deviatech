import type { Article, ArticleCategory, DemoLocale } from "../types";
import { articlesEn } from "../content/articles.en";
import { articlesFa } from "../content/articles.fa";
import { articlesUr } from "../content/articles.ur";

const ARTICLES_BY_LOCALE: Record<DemoLocale, Article[]> = {
  en: articlesEn,
  fa: articlesFa,
  ur: articlesUr,
};

export function getArticles(locale: DemoLocale): Article[] {
  return ARTICLES_BY_LOCALE[locale];
}

export function getArticleBySlug(locale: DemoLocale, slug: string): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}

/**
 * Finds the same article (by stable id) in a different locale's article
 * list. Deliberately id-based rather than a stored slug-to-slug pointer:
 * a chained mapping (en points at fa, fa points at ur, ...) breaks the
 * moment one link is wrong or a locale is added, whereas every article
 * already carries the same id across all three locale files, so looking
 * it up directly here can never drift out of sync with the content.
 */
export function getArticleInLocale(article: Article, targetLocale: DemoLocale): Article | undefined {
  if (article.locale === targetLocale) return article;
  return getArticles(targetLocale).find((candidate) => candidate.id === article.id);
}

export function getRelatedArticles(locale: DemoLocale, current: Article, limit = 3): Article[] {
  const all = getArticles(locale).filter((a) => a.id !== current.id);
  const sameCategory = all.filter((a) => a.category === current.category);
  const rest = all.filter((a) => a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategories(locale: DemoLocale): { id: ArticleCategory; label: string }[] {
  const seen = new Map<ArticleCategory, string>();
  for (const article of getArticles(locale)) {
    if (!seen.has(article.category)) seen.set(article.category, article.categoryLabel);
  }
  return Array.from(seen.entries()).map(([id, label]) => ({ id, label }));
}
