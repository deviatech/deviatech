import type { Locale } from "@/lib/locales";
import { getLiveDemoTabUrl } from "./content/conceptPreviews";
import type { ConceptTabId } from "./content/types";

export type TherapistLocale = Locale;

export const therapistLandingConfig = {
  /**
   * "View Live Concept" buttons (hero + concept showcase) open the
   * fully populated Luma demo in the matching language, on the page
   * that corresponds to the active concept tab.
   */
  liveDemo: {
    enabled: true,
  },
  routes: {
    en: "/therapist-website-design",
    fa: "/fa/therapist-website-design",
    ur: "/ur/therapist-website-design",
  },
  thankYouRoutes: {
    en: "/therapist-website-design/thank-you",
    fa: "/fa/therapist-website-design/thank-you",
    ur: "/ur/therapist-website-design/thank-you",
  },
} as const;

export function getLocalizedRoute(locale: TherapistLocale): string {
  return therapistLandingConfig.routes[locale];
}

/**
 * The live demo URL for this locale and concept tab (defaults to the
 * home page), or null while the demo link is disabled.
 */
export function getLiveDemoUrl(locale: TherapistLocale, tabId?: ConceptTabId): string | null {
  const { liveDemo } = therapistLandingConfig;
  return liveDemo.enabled ? getLiveDemoTabUrl(locale, tabId) : null;
}
