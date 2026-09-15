import type { Metadata } from "next";
import { DEMO_CANONICAL_HOST } from "./seo";
import type { DemoLocale } from "../types";
import { SUPPORTED_LOCALES } from "@/lib/locales";

/**
 * Builds noindex/follow metadata with reciprocal en/fa/ur canonical +
 * hreflang alternates, plus demo-specific OG/Twitter data — every demo
 * page uses this. DeviaTech's own fallback metadata (title/description/OG/
 * geo tags) lives in (site)/layout.tsx rather than the root layout
 * specifically so it never reaches (demo) pages at all — Next.js merges
 * `other` fields (geo.region etc.) down the tree rather than letting a
 * child replace them, so the only reliable way to keep them off demo
 * pages was to never put them in a shared ancestor. See lib/seo.ts for
 * why noindex and this host were chosen.
 */
export function demoPageMetadata({
  title,
  description,
  paths,
  locale,
}: {
  title: string;
  description: string;
  paths: Record<DemoLocale, string>;
  locale: DemoLocale;
}): Metadata {
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((loc) => [loc, `${DEMO_CANONICAL_HOST}${paths[loc]}`]),
  );

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${DEMO_CANONICAL_HOST}${paths[locale]}`,
      languages: {
        ...languages,
        "x-default": `${DEMO_CANONICAL_HOST}${paths.en}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${DEMO_CANONICAL_HOST}${paths[locale]}`,
      siteName: "Luma Therapy",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
