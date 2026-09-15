import { NextRequest, NextResponse } from "next/server";
import { DEMO_CANONICAL_HOSTNAME } from "@/features/therapist-demo/lib/seo";
import { LOCALE_HEADER } from "@/lib/locale";

/**
 * True if the given (already-resolved) pathname is a Persian route, on
 * either the therapist-landing feature or the therapist-demo feature.
 * This is the single place that maps a pathname to a document locale —
 * the root layout reads its result (via the header set below) to render
 * <html lang/dir>, so every fa route recognized here gets it right.
 */
function isPersianPathname(pathname: string): boolean {
  return pathname.startsWith("/fa/therapist-website-design") || pathname.startsWith("/therapist-demo/fa");
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
  next.set(LOCALE_HEADER, isPersianPathname(pathname) ? "fa" : "en");
  return next;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
