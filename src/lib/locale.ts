/**
 * Header middleware sets on every request with the server-computed
 * document locale ("en" or "fa"). The root layout reads it via
 * next/headers to render <html lang/dir> correctly for both the
 * therapist-landing and therapist-demo Persian routes. Shared here
 * (rather than importing from src/middleware.ts directly) so the root
 * layout doesn't pull in Edge-middleware-only code.
 */
export const LOCALE_HEADER = "x-app-locale";
