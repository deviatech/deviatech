import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetailPage from "@/features/therapist-demo/components/ArticleDetailPage";
import { articleDetailFa } from "@/features/therapist-demo/content/article-detail.fa";
import { getArticleBySlug, getArticles } from "@/features/therapist-demo/lib/blog";
import { blogPostRoute } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

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

  return demoPageMetadata({
    title: `${article.title} — لوما تراپی`,
    description: article.excerpt,
    enPath: blogPostRoute(article.alternateSlug, "en"),
    faPath: blogPostRoute(article.slug, "fa"),
    currentIsFa: true,
  });
}

export default async function ArticleFaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug("fa", slug);
  if (!article) notFound();

  return <ArticleDetailPage locale="fa" article={article} content={articleDetailFa} />;
}
