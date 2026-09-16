import type { Locale } from "@/lib/locales";

export type TherapistLocale = Locale;

export const therapistLandingConfig = {
  liveDemoUrl: null as string | null,
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
