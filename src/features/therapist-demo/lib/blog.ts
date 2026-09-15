import type { Article, ArticleCategory, DemoLocale } from "../types";
import { articlesEn } from "../content/articles.en";
import { articlesFa } from "../content/articles.fa";

export function getArticles(locale: DemoLocale): Article[] {
  return locale === "fa" ? articlesFa : articlesEn;
}

export function getArticleBySlug(locale: DemoLocale, slug: string): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}

export function getAlternateLocaleSlug(article: Article): string {
  return article.alternateSlug;
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
