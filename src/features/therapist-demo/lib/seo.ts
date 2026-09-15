/**
 * Canonical public host for the Luma Therapy demo. No DNS/hosting config
 * for either candidate host exists in this repo yet (checked src/content/site.ts,
 * Dockerfile, .env.example) — using the literal example URL from the demo's
 * own UI spec. Demo pages are noindex, so this choice carries no SEO risk;
 * update here once real DNS is confirmed, every canonical/OG URL reads from
 * this single constant.
 */
export const DEMO_CANONICAL_HOST = "https://preview.deviatech.com";
