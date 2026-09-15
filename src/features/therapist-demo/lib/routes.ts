import type { DemoLocale } from "../types";
import { SUPPORTED_LOCALES } from "@/lib/locales";

export const DEMO_BASE = "/therapist-demo";

/** en has no path prefix; fa/ur (and any future locale) use /<locale>. */
function localePrefix(locale: DemoLocale): string {
  return locale === "en" ? "" : `/${locale}`;
}

function localizedPaths(suffix: string): Record<DemoLocale, string> {
  return Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, `${DEMO_BASE}${localePrefix(locale)}${suffix}`]),
  ) as Record<DemoLocale, string>;
}

export const demoRoutes = {
  home: localizedPaths(""),
  about: localizedPaths("/about"),
  services: localizedPaths("/services"),
  individualTherapy: localizedPaths("/services/individual-therapy"),
  couplesTherapy: localizedPaths("/services/couples-therapy"),
  blog: localizedPaths("/blog"),
  contact: localizedPaths("/contact"),
  book: localizedPaths("/book"),
} as const;

export type DemoRouteKey = keyof typeof demoRoutes;

export function route(key: DemoRouteKey, locale: DemoLocale): string {
  return demoRoutes[key][locale];
}

export function blogPostRoute(slug: string, locale: DemoLocale): string {
  return `${DEMO_BASE}${localePrefix(locale)}/blog/${slug}`;
}

const HOME_LABEL: Record<DemoLocale, string> = { en: "Home", fa: "خانه", ur: "ہوم" };

export function homeBreadcrumb(locale: DemoLocale) {
  return { label: HOME_LABEL[locale], href: route("home", locale) };
}

/**
 * Maps a current demo pathname to its equivalent route in the other locale,
 * preserving the specific page (not just Home). Falls back to that locale's
 * home when no structural match is found (e.g. unknown/removed slug).
 *
 * Every internal link in this feature (including hrefs baked into static
 * content at module-load time) emits the apex /therapist-demo/... shape,
 * because content can't know the request host. This function does the
 * same, on purpose: middleware on the demo host redirects that prefix
 * away, so an apex-style link resolves correctly on both hosts. Branching
 * here on window.location instead would make this the one place in the
 * app producing host-relative links while everything else stays apex-style
 * — a worse inconsistency than the extra redirect.
 *
 * Deliberately falls back to the blog LISTING page (never 404s) for any
 * article detail path (/blog/<slug>): each locale's article has its own
 * slug, and this function has no access to the article data needed to
 * resolve the correct one (that data lives in content/articles.*.ts,
 * which must not be pulled into this shared, client-bundled routing
 * helper — see ArticleLocaleLinks.tsx, a Server Component rendered on
 * the article page itself, for the actual per-article correct switch).
 */
export function equivalentLocalePath(pathname: string, targetLocale: DemoLocale): string {
  let withoutBase = pathname;
  if (pathname.startsWith(DEMO_BASE)) {
    withoutBase = pathname.slice(DEMO_BASE.length);
  }

  // Strip whichever locale prefix (if any) leads the remaining path.
  for (const locale of SUPPORTED_LOCALES) {
    const prefix = localePrefix(locale);
    if (prefix && (withoutBase === prefix || withoutBase.startsWith(`${prefix}/`))) {
      withoutBase = withoutBase.slice(prefix.length);
      break;
    }
  }

  const isArticleDetail = /^\/blog\/.+/.test(withoutBase);
  if (isArticleDetail) {
    return route("blog", targetLocale);
  }

  const suffix = withoutBase === "" || withoutBase === "/" ? "" : withoutBase;
  return `${DEMO_BASE}${localePrefix(targetLocale)}${suffix}`;
}
