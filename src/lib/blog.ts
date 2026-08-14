import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// Wrap tables so wide content scrolls inside the article instead of
// forcing the page body to scroll horizontally on mobile.
marked.use({
  gfm: true,
  hooks: {
    postprocess(html: string) {
      return html.replace(
        /<table>[\s\S]*?<\/table>/g,
        (table) => `<div class="markdown-table">${table}</div>`,
      );
    },
  },
});

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogFaq {
  question: string;
  /** Plain text, used for FAQPage structured data. */
  answer: string;
  /** Inline-rendered markdown, used for display so answers can link. */
  answerHtml: string;
}

interface RawBlogFaq {
  question?: string;
  answer?: string;
}

function parseFaqs(raw: unknown): BlogFaq[] {
  if (!Array.isArray(raw)) return [];
  return (raw as RawBlogFaq[])
    .filter((faq) => faq.question && faq.answer)
    .map((faq) => ({
      question: faq.question as string,
      // Strip markdown link syntax so structured data carries clean text.
      answer: (faq.answer as string).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      answerHtml: marked.parseInline(faq.answer as string, { async: false }) as string,
    }));
}

export interface BlogPostMeta {
  slug: string;
  /** On-page H1 and card heading. */
  title: string;
  /** Short <title> tag text. Falls back to `title` when absent. */
  metaTitle?: string;
  date: string;
  /** Last content update. Falls back to `date` when absent. */
  updated?: string;
  excerpt: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  /** Rendered as an FAQ block and emitted as FAQPage structured data. */
  faqs?: BlogFaq[];
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  return readSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        metaTitle: data.metaTitle,
        date: data.date ?? "",
        updated: data.updated,
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        image: data.image,
        imageAlt: data.imageAlt,
        faqs: parseFaqs(data.faqs),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    metaTitle: data.metaTitle,
    date: data.date ?? "",
    updated: data.updated,
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    image: data.image,
    imageAlt: data.imageAlt,
    faqs: parseFaqs(data.faqs),
    html: marked.parse(content, { async: false }) as string,
  };
}
