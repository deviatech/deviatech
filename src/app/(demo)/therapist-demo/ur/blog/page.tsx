import type { Metadata } from "next";
import BlogListingPage from "@/features/therapist-demo/components/BlogListingPage";
import { blogUr } from "@/features/therapist-demo/content/blog.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";
import type { ArticleCategory } from "@/features/therapist-demo/types";

export const metadata: Metadata = demoPageMetadata({
  title: blogUr.meta.title,
  description: blogUr.meta.description,
  paths: demoRoutes.blog,
  locale: "ur",
});

export default async function BlogUrPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return <BlogListingPage locale="ur" content={blogUr} activeCategory={params.category as ArticleCategory | undefined} />;
}
