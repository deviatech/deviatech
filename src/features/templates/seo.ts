import type { Metadata } from "next";
import { site } from "@/content/site";
import { organizationId, websiteId } from "@/lib/site-entities";
import { templates, type WebsiteTemplate } from "./catalog";

export const catalogPath = "/templates";
export const catalogTitle = "Therapist Website Templates";
export const catalogDescription =
  "Compare Alder, Morrow and Luma therapist website templates from DeviaTech. Explore live demos for solo therapists, group practices and multilingual websites.";

export function templatePath(template: WebsiteTemplate) {
  return `${catalogPath}/${template.slug}`;
}

export function templateMetadata(template?: WebsiteTemplate): Metadata {
  const title = `${template?.seoTitle ?? catalogTitle} | DeviaTech`;
  const description = template?.description ?? catalogDescription;
  const url = `${site.url}${template ? templatePath(template) : catalogPath}`;
  const image = template?.variants[0].image ?? "/images/templates/luma/original.webp";

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { "max-image-preview": "large" },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: site.name,
      images: [{ url: image, alt: `${template?.name ?? "Luma"} website design preview` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function catalogJsonLd() {
  const url = `${site.url}${catalogPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: catalogTitle,
    description: catalogDescription,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: templates.map((template, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: template.name,
        url: `${site.url}${templatePath(template)}`,
      })),
    },
  };
}

export function templateJsonLd(template: WebsiteTemplate) {
  const catalogUrl = `${site.url}${catalogPath}`;
  const url = `${site.url}${templatePath(template)}`;
  const breadcrumbId = `${url}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: template.seoTitle,
        description: template.description,
        url,
        isPartOf: { "@id": websiteId },
        breadcrumb: { "@id": breadcrumbId },
        relatedLink: template.variants.map(({ demoUrl }) => demoUrl),
        mainEntity: {
          "@type": "CreativeWork",
          "@id": `${url}#template`,
          name: template.name,
          description: template.description,
          url,
          image: `${site.url}${template.variants[0].image}`,
          creator: { "@id": organizationId },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Templates", item: catalogUrl },
          { "@type": "ListItem", position: 2, name: template.name, item: url },
        ],
      },
    ],
  };
}
