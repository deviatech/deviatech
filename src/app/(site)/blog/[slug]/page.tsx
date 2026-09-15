import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SheetFrame from "@/components/ui/SheetFrame";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { site } from "@/content/site";

function articleImage(post: { slug: string; title: string; image?: string; imageAlt?: string }) {
  return {
    url: post.image ? `${site.url}${post.image}` : `${site.url}/blog/${post.slug}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: post.imageAlt ?? `${post.title} | DeviaTech`,
  };
}

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
    title: `${post.metaTitle ?? post.title} | DeviaTech`,
    description: post.excerpt,
    alternates: {
      canonical: `${site.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      tags: post.tags,
      images: [articleImage(post)],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/logo/icon-512.png`,
      },
    },
    image: articleImage(post),
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    url: `${site.url}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
    ],
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <SheetFrame number="B2" label="ARTICLE">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Link
        href="/blog"
        className="font-mono text-xs text-ink-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
      >
        ← Back to blog
      </Link>
      <p className="mt-6 font-mono text-xs text-accent-rust">
        <time dateTime={post.date}>{post.date}</time>
        {post.updated && post.updated !== post.date && (
          <span className="text-ink-soft"> · updated <time dateTime={post.updated}>{post.updated}</time></span>
        )}
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
        {post.title}
      </h1>
      <div
        className="markdown-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <section className="mt-12 border-t border-line-grid pt-8">
          <h2 className="font-display text-xl font-semibold text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-4 divide-y divide-line-grid border-y border-line-grid">
            {post.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer font-body font-medium text-ink">
                  {faq.question}
                </summary>
                <p
                  className="mt-3 font-body leading-7 text-ink-soft [&_a]:text-accent-rust [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                />
              </details>
            ))}
          </div>
        </section>
      )}
      <aside className="mt-12 border-t border-line-grid pt-8">
        <p className="font-mono text-xs tracking-wide text-ink-soft">NEXT STEP</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          Have a store or product to launch?
        </h2>
        <p className="mt-2 max-w-xl font-body text-ink-soft">
          See how DeviaTech can help with a Shopify store or a focused MVP in Lahore.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 font-body text-sm">
          <Link className="text-accent-rust underline" href="/shopify-development-lahore">
            Shopify development
          </Link>
          <Link className="text-accent-rust underline" href="/mvp-development">
            MVP development
          </Link>
          <Link className="text-accent-rust underline" href="/contact">
            Start a conversation
          </Link>
        </div>
      </aside>
    </SheetFrame>
  );
}
