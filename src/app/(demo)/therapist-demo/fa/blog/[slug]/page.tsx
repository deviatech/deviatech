import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailPage from "@/features/therapist-demo/components/ArticleDetailPage";
import { articleDetailFa } from "@/features/therapist-demo/content/article-detail.fa";
import { getArticleBySlug, getArticleInLocale, getArticles } from "@/features/therapist-demo/lib/blog";
import { blogPostRoute } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";
import { SUPPORTED_LOCALES } from "@/lib/locales";

export function generateStaticParams() {
  return getArticles("fa").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("fa", slug);
  if (!article) return {};

  const paths = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => {
      const localized = getArticleInLocale(article, locale);
      if (!localized) throw new Error(`Article "${article.id}" is missing a ${locale} translation`);
      return [locale, blogPostRoute(localized.slug, locale)];
    }),
  ) as Record<(typeof SUPPORTED_LOCALES)[number], string>;

  return demoPageMetadata({
    title: `${article.title} — لوما تراپی`,
    description: article.excerpt,
    paths,
    locale: "fa",
  });
}

export default async function ArticleFaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("fa", slug);
  if (!article) notFound();

  return <ArticleDetailPage locale="fa" article={article} content={articleDetailFa} />;
}
