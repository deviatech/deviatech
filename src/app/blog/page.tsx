import type { Metadata } from "next";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | DeviaTech",
  description: "Notes on building software and stores for local businesses and startup founders in Lahore.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <SheetFrame number="B1" label="BLOG">
      <p className="font-mono text-xs tracking-wide text-ink-soft">NOTES</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
        From the studio.
      </h1>
      {posts.length === 0 ? (
        <p className="mt-8 font-body text-ink-soft">No posts yet — check back soon.</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
              >
                <p className="font-mono text-xs text-accent-rust">{post.date}</p>
                <h2 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-accent-rust">
                  {post.title}
                </h2>
                <p className="mt-2 font-body text-sm text-ink-soft">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-ink-soft">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </SheetFrame>
  );
}
