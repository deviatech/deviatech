import type { Article, ArticleDetailContent, DemoLocale } from "../types";
import { getRelatedArticles } from "../lib/blog";
import { homeBreadcrumb, route } from "../lib/routes";
import Section from "./Section";
import Breadcrumbs from "./Breadcrumbs";
import PlaceholderImage from "./PlaceholderImage";
import ArticleBody from "./ArticleBody";
import ShareControls from "./ShareControls";
import ArticleCard from "./ArticleCard";
import ArticleLocaleLinks from "./ArticleLocaleLinks";
import ConsultationCta from "./ConsultationCta";
import contentStyles from "../styles/luma-content.module.css";
import blogStyles from "../styles/luma-blog.module.css";

export default function ArticleDetailPage({
  locale,
  article,
  content,
}: {
  locale: DemoLocale;
  article: Article;
  content: ArticleDetailContent;
}) {
  const related = getRelatedArticles(locale, article);
  const readingLabel = (minutes: number) => `${minutes} ${content.readingLabelSuffix}`;
  const initials = content.editorialAttribution
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <>
      <Section tone="cream" padding="standard" containerSize="article">
        <Breadcrumbs
          items={[
            homeBreadcrumb(locale),
            { label: content.breadcrumbLabel, href: route("blog", locale) },
            { label: article.title },
          ]}
        />
        <p className={blogStyles.articleCategoryChip}>{article.categoryLabel}</p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1.15, margin: "16px 0" }}>{article.title}</h1>
        <div className={blogStyles.articleMeta}>
          <span>{content.editorialAttribution}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{readingLabel(article.readingMinutes)}</span>
        </div>
        <ArticleLocaleLinks article={article} groupLabel={content.languageSwitchLabel} />
      </Section>

      <Section tone="cream" padding="compact" containerSize="article">
        <div className={blogStyles.articleHeroMedia}>
          <PlaceholderImage image={article.image} locale={locale} />
        </div>

        <ArticleBody sections={article.body} />

        <ShareControls
          title={article.title}
          shareLabel={content.shareLabel}
          copyLinkLabel={content.copyLinkLabel}
          copiedLabel={content.copiedLabel}
        />

        <div className={blogStyles.disclaimer}>{content.disclaimer}</div>

        <div className={blogStyles.editorialCard}>
          <span className={blogStyles.editorialAvatar} aria-hidden="true">
            {initials}
          </span>
          <p className={blogStyles.editorialName}>{content.editorialAttribution}</p>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="white" padding="standard">
          <h2 style={{ marginBottom: 32 }}>{content.relatedHeading}</h2>
          <div className={contentStyles.cardGrid3}>
            {related.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} locale={locale} readingLabel={readingLabel} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="cream" padding="standard">
        <ConsultationCta
          locale={locale}
          heading={content.cta.heading}
          body={content.cta.body}
          buttonLabel={content.cta.buttonLabel}
        />
      </Section>
    </>
  );
}
