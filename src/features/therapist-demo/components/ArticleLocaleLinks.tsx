import Link from "next/link";
import type { Article, DemoLocale } from "../types";
import { getArticleInLocale } from "../lib/blog";
import { blogPostRoute } from "../lib/routes";
import { SUPPORTED_LOCALES, LOCALE_META } from "@/lib/locales";
import navStyles from "../styles/luma-nav.module.css";

/**
 * Server-rendered, article-aware locale switch. The header's LocaleSwitch
 * is pathname-only and would keep the same slug across locales, which is
 * wrong here since each locale's article has its own slug. This looks up
 * the actual sibling article by id (via getArticleInLocale) so the link
 * always lands on the equivalent article, never a 404 or the wrong piece.
 */
export default function ArticleLocaleLinks({ article, groupLabel }: { article: Article; groupLabel: string }) {
  const otherLocales = SUPPORTED_LOCALES.filter((locale) => locale !== article.locale);

  return (
    <nav aria-label={groupLabel} className={navStyles.localeSwitchGroup}>
      {otherLocales.map((locale: DemoLocale) => {
        const localized = getArticleInLocale(article, locale);
        if (!localized) return null;
        return (
          <Link key={locale} href={blogPostRoute(localized.slug, locale)} className={navStyles.localeSwitch} hrefLang={locale}>
            {LOCALE_META[locale].label}
          </Link>
        );
      })}
    </nav>
  );
}
