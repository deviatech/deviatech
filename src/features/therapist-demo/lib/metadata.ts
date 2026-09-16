import type { Metadata } from "next";
import { DEMO_CANONICAL_HOST } from "./seo";
import { DEMO_BASE } from "./routes";
import type { DemoLocale } from "../types";
import { SUPPORTED_LOCALES } from "@/lib/locales";

/**
 * Converts an apex-style demo path (/therapist-demo/fa/about) into its
 * public URL on the demo host (https://preview.deviatech.com/fa/about).
 * Middleware on that host redirects any /therapist-demo/... path away, so
 * canonical and hreflang URLs must never keep the prefix — otherwise they
 * point at a redirect instead of resolving directly with a 200.
 */
export function demoCanonicalUrl(path: string): string {
  const withoutBase = path.startsWith(DEMO_BASE) ? path.slice(DEMO_BASE.length) : path;
  return `${DEMO_CANONICAL_HOST}${withoutBase || "/"}`;
}

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
    SUPPORTED_LOCALES.map((loc) => [loc, demoCanonicalUrl(paths[loc])]),
  );

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: demoCanonicalUrl(paths[locale]),
      languages: {
        ...languages,
        "x-default": demoCanonicalUrl(paths.en),
      },
    },
    openGraph: {
      title,
      description,
      url: demoCanonicalUrl(paths[locale]),
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
