import type { ArticleCategory, BlogListingContent, DemoLocale } from "../types";
import { getArticles, getCategories } from "../lib/blog";
import { homeBreadcrumb } from "../lib/routes";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Breadcrumbs from "./Breadcrumbs";
import BlogFilter from "./BlogFilter";
import ArticleCard from "./ArticleCard";
import PlaceholderImage from "./PlaceholderImage";
import Link from "next/link";
import { blogPostRoute } from "../lib/routes";
import contentStyles from "../styles/luma-content.module.css";
import blogStyles from "../styles/luma-blog.module.css";

export default function BlogListingPage({
  locale,
  content,
  activeCategory,
}: {
  locale: DemoLocale;
  content: BlogListingContent;
  activeCategory?: ArticleCategory;
}) {
  const allArticles = getArticles(locale);
  const categories = getCategories(locale);
  const filtered = activeCategory ? allArticles.filter((a) => a.category === activeCategory) : allArticles;
  const [featured, ...rest] = filtered;
  const readingLabel = (minutes: number) => `${minutes} ${content.readingLabelSuffix}`;

  return (
    <>
      <Section tone="cream" padding="standard">
        <Breadcrumbs items={[homeBreadcrumb(locale), { label: content.hero.eyebrow }]} />
        <SectionHeading
          eyebrow={content.hero.eyebrow}
          heading={content.hero.heading}
          body={content.hero.body}
          as="h1"
        />
      </Section>

      <Section tone="white" padding="standard">
        <BlogFilter locale={locale} categories={categories} activeCategory={activeCategory} allLabel={content.allCategoriesLabel} />

        {filtered.length === 0 ? (
          <p className={blogStyles.emptyState}>{content.emptyStateLabel}</p>
        ) : (
          <>
            {featured && (
              <Link href={blogPostRoute(featured.slug, locale)} className={blogStyles.featuredCard}>
                <div className={blogStyles.featuredMedia}>
                  <PlaceholderImage image={featured.image} locale={locale} />
                </div>
                <div className={blogStyles.featuredBody}>
                  <p className={blogStyles.featuredCategory}>{featured.categoryLabel}</p>
                  <h2 className={blogStyles.featuredTitle}>{featured.title}</h2>
                  <p className={blogStyles.featuredExcerpt}>{featured.excerpt}</p>
                  <p className={contentStyles.articleCardMeta}>{readingLabel(featured.readingMinutes)}</p>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className={contentStyles.cardGrid3}>
                {rest.map((article) => (
                  <ArticleCard key={article.id} article={article} locale={locale} readingLabel={readingLabel} />
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
}
