import "server-only";

import { caseStudies } from "@/content/case-studies";
import { commercialPages } from "@/content/commercial-pages";
import { tracks } from "@/content/tracks";
import { templates } from "@/features/templates/catalog";
import { getAllPosts } from "@/lib/blog";

export const analyticsSiteData = {
  paths: [
    "/", "/about", "/blog", "/case-studies", "/contact", "/templates", "/thank-you",
    ...["", "/fa", "/ur"].flatMap((prefix) => [
      prefix + "/therapist-website-design",
      prefix + "/therapist-website-design/thank-you",
    ]),
    ...caseStudies.map(({ slug }) => "/case-studies/" + slug),
    ...commercialPages.map(({ slug }) => "/" + slug),
    ...templates.map(({ slug }) => "/templates/" + slug),
    ...getAllPosts().map(({ slug }) => "/blog/" + slug),
  ],
  labels: [
    "footer", "header", "sticky", "home_rail", "contact", "contact-intro", "hero",
    "showcase", "brand-section", "en", "fa", "ur", "essential", "practice", "international",
    ...tracks.map(({ name }) => name),
    ...caseStudies.map(({ slug }) => "case-study-" + slug),
    ...commercialPages.flatMap(({ slug }) => [slug, slug + "-footer"]),
  ],
};
