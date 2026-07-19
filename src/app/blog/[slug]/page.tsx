import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | DeviaTech Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <SheetFrame number="B2" label="ARTICLE">
      <Link
        href="/blog"
        className="font-mono text-xs text-ink-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
      >
        ← Back to blog
      </Link>
      <p className="mt-6 font-mono text-xs text-accent-rust">{post.date}</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
        {post.title}
      </h1>
      <div
        className="markdown-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </SheetFrame>
  );
}
