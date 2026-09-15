import type { DemoLocale } from "../types";

export const DEMO_BASE = "/therapist-demo";

export const demoRoutes = {
  home: { en: `${DEMO_BASE}`, fa: `${DEMO_BASE}/fa` },
  about: { en: `${DEMO_BASE}/about`, fa: `${DEMO_BASE}/fa/about` },
  services: { en: `${DEMO_BASE}/services`, fa: `${DEMO_BASE}/fa/services` },
  individualTherapy: {
    en: `${DEMO_BASE}/services/individual-therapy`,
    fa: `${DEMO_BASE}/fa/services/individual-therapy`,
  },
  couplesTherapy: {
    en: `${DEMO_BASE}/services/couples-therapy`,
    fa: `${DEMO_BASE}/fa/services/couples-therapy`,
  },
  blog: { en: `${DEMO_BASE}/blog`, fa: `${DEMO_BASE}/fa/blog` },
  contact: { en: `${DEMO_BASE}/contact`, fa: `${DEMO_BASE}/fa/contact` },
  book: { en: `${DEMO_BASE}/book`, fa: `${DEMO_BASE}/fa/book` },
} as const;

export type DemoRouteKey = keyof typeof demoRoutes;

export function route(key: DemoRouteKey, locale: DemoLocale): string {
  return demoRoutes[key][locale];
}

export function blogPostRoute(slug: string, locale: DemoLocale): string {
  return locale === "en" ? `${DEMO_BASE}/blog/${slug}` : `${DEMO_BASE}/fa/blog/${slug}`;
}

export function homeBreadcrumb(locale: DemoLocale) {
  return { label: locale === "fa" ? "خانه" : "Home", href: route("home", locale) };
}

/**
 * Maps a current demo pathname to its equivalent route in the other locale,
 * preserving the specific page (not just Home). Falls back to that locale's
 * home when no structural match is found (e.g. unknown/removed slug).
 *
 * Every internal link in this feature (including hrefs baked into static
 * content at module-load time) emits the apex /therapist-demo/... shape,
 * because content can't know the request host. This function does the
 * same, on purpose: middleware on demo.deviatech.com redirects that prefix
 * away, so an apex-style link resolves correctly on both hosts. Branching
 * here on window.location instead would make this the one place in the
 * app producing host-relative links while everything else stays apex-style
 * — a worse inconsistency than the extra redirect.
 */
export function equivalentLocalePath(pathname: string, targetLocale: DemoLocale): string {
  const withoutBase = pathname.startsWith(`${DEMO_BASE}/fa`)
    ? pathname.slice(`${DEMO_BASE}/fa`.length)
    : pathname.startsWith(DEMO_BASE)
      ? pathname.slice(DEMO_BASE.length)
      : pathname.startsWith("/fa")
        ? pathname.slice(3)
        : pathname;

  const suffix = withoutBase === "" || withoutBase === "/" ? "" : withoutBase;
  return targetLocale === "fa" ? `${DEMO_BASE}/fa${suffix}` : `${DEMO_BASE}${suffix}`;
}
