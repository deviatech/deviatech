import type { Metadata } from "next";
import { DEMO_CANONICAL_HOST } from "./seo";

/**
 * Builds noindex/follow metadata with reciprocal EN/FA canonical + hreflang
 * alternates. Every demo page uses this — see lib/seo.ts for why noindex
 * and this host were chosen.
 */
export function demoPageMetadata({
  title,
  description,
  enPath,
  faPath,
  currentIsFa,
}: {
  title: string;
  description: string;
  enPath: string;
  faPath: string;
  currentIsFa: boolean;
}): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${DEMO_CANONICAL_HOST}${currentIsFa ? faPath : enPath}`,
      languages: {
        en: `${DEMO_CANONICAL_HOST}${enPath}`,
        fa: `${DEMO_CANONICAL_HOST}${faPath}`,
        "x-default": `${DEMO_CANONICAL_HOST}${enPath}`,
      },
    },
  };
}
