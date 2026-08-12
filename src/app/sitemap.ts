import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { commercialPages } from "@/content/commercial-pages";
import { caseStudies } from "@/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.url}/case-studies`,
      lastModified: new Date("2026-08-13"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/about`,
      lastModified: new Date("2026-08-13"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.url}/contact`,
      lastModified: new Date("2026-08-13"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  return [
    ...staticRoutes,
    ...commercialPages.map((page) => ({
      url: `${site.url}/${page.slug}`,
      lastModified: new Date("2026-08-13"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((caseStudy) => ({
      url: `${site.url}/case-studies/${caseStudy.slug}`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
