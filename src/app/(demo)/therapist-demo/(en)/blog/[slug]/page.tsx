import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailPage from "@/features/therapist-demo/components/ArticleDetailPage";
import { articleDetailEn } from "@/features/therapist-demo/content/article-detail.en";
import { getArticleBySlug, getArticles } from "@/features/therapist-demo/lib/blog";
import { blogPostRoute } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export function generateStaticParams() {
  return getArticles("en").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("en", slug);
  if (!article) return {};

  return demoPageMetadata({
    title: `${article.title} — Luma Therapy`,
    description: article.excerpt,
    enPath: blogPostRoute(article.slug, "en"),
    faPath: blogPostRoute(article.alternateSlug, "fa"),
    currentIsFa: false,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("en", slug);
  if (!article) notFound();

  return <ArticleDetailPage locale="en" article={article} content={articleDetailEn} />;
}
