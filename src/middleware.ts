import { NextRequest, NextResponse } from "next/server";
import { DEMO_CANONICAL_HOSTNAME } from "@/features/therapist-demo/lib/seo";
import { LOCALE_HEADER, type Locale } from "@/lib/locales";

/**
 * Maps an already-resolved pathname (post-rewrite for the demo subdomain)
 * to a document locale, for both the therapist-landing and therapist-demo
 * features. This is the single place that does this mapping — the root
 * layout reads the header set below (never the pathname itself) to render
 * <html lang/dir>, so every locale recognized here gets it right.
 */
function resolvePathnameLocale(pathname: string): Locale {
  if (pathname.startsWith("/fa/therapist-website-design") || pathname.startsWith("/therapist-demo/fa")) {
    return "fa";
  }
  if (pathname.startsWith("/ur/therapist-website-design") || pathname.startsWith("/therapist-demo/ur")) {
    return "ur";
  }
  return "en";
}

export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost?.split(",")[0].trim() ?? request.nextUrl.hostname)
    .split(":")[0]
    .toLowerCase();

  if (host === "www.deviatech.com") {
    const url = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      "https://deviatech.com",
    );
    return NextResponse.redirect(url, 301);
  }

  // The pathname Next.js will actually route on: the request's own
  // pathname normally, or the rewritten /therapist-demo/... target once
  // the demo-subdomain branch below decides to rewrite. Computed once so
  // the locale header (set at the very end) always matches reality.
  let effectivePathname = request.nextUrl.pathname;

  if (host === DEMO_CANONICAL_HOSTNAME) {
    const { pathname } = request.nextUrl;

    // Every internal link in the demo feature emits apex-style
    // /therapist-demo/... hrefs (they're baked into static content at
    // module-load time and can't know the request host). On this
    // subdomain that prefix is redundant — canonicalize it away with a
    // redirect so those same links resolve here too, instead of 404ing.
    if (pathname === "/therapist-demo" || pathname.startsWith("/therapist-demo/")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.slice("/therapist-demo".length) || "/";
      return NextResponse.redirect(url, 307);
    }

    const isBypassed =
      pathname.startsWith("/api/") ||
      pathname.startsWith("/images/") ||
      pathname.startsWith("/logo/") ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml" ||
      pathname === "/manifest.webmanifest";

    if (!isBypassed) {
      const url = request.nextUrl.clone();
      url.pathname = `/therapist-demo${pathname === "/" ? "" : pathname}`;
      effectivePathname = url.pathname;
      return NextResponse.rewrite(url, {
        request: { headers: withLocaleHeader(request.headers, effectivePathname) },
      });
    }
  }

  const response = NextResponse.next({
    request: { headers: withLocaleHeader(request.headers, effectivePathname) },
  });
  return response;
}

/**
 * Clones the incoming request headers and overwrites LOCALE_HEADER with a
 * server-computed "en" or "fa" — never trusting whatever value (if any) a
 * client sent in that header name, since the root layout treats this as
 * an authoritative signal for which <html lang/dir> to render.
 */
function withLocaleHeader(headers: Headers, pathname: string): Headers {
  const next = new Headers(headers);
  next.set(LOCALE_HEADER, resolvePathnameLocale(pathname));
  return next;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
