import type { Metadata } from "next";
import BlogListingPage from "@/features/therapist-demo/components/BlogListingPage";
import { blogEn } from "@/features/therapist-demo/content/blog.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";
import type { ArticleCategory } from "@/features/therapist-demo/types";

export const metadata: Metadata = demoPageMetadata({
  title: blogEn.meta.title,
  description: blogEn.meta.description,
  enPath: demoRoutes.blog.en,
  faPath: demoRoutes.blog.fa,
  currentIsFa: false,
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return <BlogListingPage locale="en" content={blogEn} activeCategory={params.category as ArticleCategory | undefined} />;
}
