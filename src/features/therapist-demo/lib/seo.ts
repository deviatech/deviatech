/**
 * Canonical public host for the Luma Therapy demo. No DNS/hosting config
 * for either candidate host exists in this repo yet (checked src/content/site.ts,
 * Dockerfile, .env.example) — using the literal example URL from the demo's
 * own UI spec. Demo pages are noindex, so this choice carries no SEO risk;
 * update here once real DNS is confirmed.
 *
 * This is the single source of truth for the demo's public host: canonical
 * URLs, hreflang alternates, and the middleware subdomain rewrite
 * (src/middleware.ts) all derive from it, so they can never point at
 * different hosts.
 */
export const DEMO_CANONICAL_HOST = "https://preview.deviatech.com";
export const DEMO_CANONICAL_HOSTNAME = new URL(DEMO_CANONICAL_HOST).hostname;
