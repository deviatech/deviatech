import type { Metadata } from "next";
import BlogListingPage from "@/features/therapist-demo/components/BlogListingPage";
import { blogFa } from "@/features/therapist-demo/content/blog.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";
import type { ArticleCategory } from "@/features/therapist-demo/types";

export const metadata: Metadata = demoPageMetadata({
  title: blogFa.meta.title,
  description: blogFa.meta.description,
  enPath: demoRoutes.blog.en,
  faPath: demoRoutes.blog.fa,
  currentIsFa: true,
});

export default async function BlogFaPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return <BlogListingPage locale="fa" content={blogFa} activeCategory={params.category as ArticleCategory | undefined} />;
}
