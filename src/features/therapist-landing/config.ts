import type { Locale } from "@/lib/locales";

export type TherapistLocale = Locale;

export const therapistLandingConfig = {
  /**
   * "View Live Concept" buttons (hero + concept showcase) open the
   * fully populated Luma demo in the matching language.
   */
  liveDemo: {
    enabled: true,
    urls: {
      en: "https://preview.deviatech.com/",
      fa: "https://preview.deviatech.com/fa",
      ur: "https://preview.deviatech.com/ur",
    },
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

/** The live demo URL for this locale, or null while the demo link is disabled. */
export function getLiveDemoUrl(locale: TherapistLocale): string | null {
  const { liveDemo } = therapistLandingConfig;
  return liveDemo.enabled ? liveDemo.urls[locale] : null;
}
