export type TherapistLocale = "en" | "fa";

export const therapistLandingConfig = {
  liveDemoUrl: null as string | null,
  routes: {
    en: "/therapist-website-design",
    fa: "/fa/therapist-website-design",
  },
  thankYouRoutes: {
    en: "/therapist-website-design/thank-you",
    fa: "/fa/therapist-website-design/thank-you",
  },
} as const;

export function getLocalizedRoute(locale: TherapistLocale): string {
  return therapistLandingConfig.routes[locale];
}
