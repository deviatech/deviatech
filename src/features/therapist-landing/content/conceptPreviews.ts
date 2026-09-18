import type { Locale } from "@/lib/locales";
import { DEMO_CANONICAL_HOST } from "@/features/therapist-demo/lib/seo";
import { route, type DemoRouteKey } from "@/features/therapist-demo/lib/routes";
import type { ConceptTabId } from "./types";

/**
 * Static registry pairing each landing-page concept tab with the real
 * therapist-demo route it previews and the screenshot assets captured
 * from that route (see scripts/capture-therapist-previews.mjs). Kept
 * separate from the localized `concept.tabs` copy in en/fa/ur.ts because
 * asset paths and route keys are locale-independent.
 *
 * `demoRouteKey` deliberately differs from the tab id for "booking": the
 * demo's real route is /therapist-demo/book, not /booking.
 */
export interface ConceptPreviewEntry {
  key: ConceptTabId;
  label: string;
  demoRouteKey: DemoRouteKey;
  desktopImage: string;
  mobileImage: string;
  alt: string;
}

export const conceptPreviews: Record<ConceptTabId, ConceptPreviewEntry> = {
  home: {
    key: "home",
    label: "Home",
    demoRouteKey: "home",
    desktopImage: "/therapist-concept-previews/home-desktop.webp",
    mobileImage: "/therapist-concept-previews/home-mobile.webp",
    alt: "Screenshot of the Fieldstone Practice concept homepage, showing the hero introduction and appointment call-to-action.",
  },
  about: {
    key: "about",
    label: "About",
    demoRouteKey: "about",
    desktopImage: "/therapist-concept-previews/about-desktop.webp",
    mobileImage: "/therapist-concept-previews/about-mobile.webp",
    alt: "Screenshot of the Fieldstone Practice concept About page, introducing the practice's approach and training.",
  },
  services: {
    key: "services",
    label: "Services",
    demoRouteKey: "services",
    desktopImage: "/therapist-concept-previews/services-desktop.webp",
    mobileImage: "/therapist-concept-previews/services-mobile.webp",
    alt: "Screenshot of the Fieldstone Practice concept Services page, listing individual, couples, and group sessions.",
  },
  blog: {
    key: "blog",
    label: "Blog",
    demoRouteKey: "blog",
    desktopImage: "/therapist-concept-previews/blog-desktop.webp",
    mobileImage: "/therapist-concept-previews/blog-mobile.webp",
    alt: "Screenshot of the Fieldstone Practice concept Blog page, listing articles on coping strategies and practice updates.",
  },
  contact: {
    key: "contact",
    label: "Contact",
    demoRouteKey: "contact",
    desktopImage: "/therapist-concept-previews/contact-desktop.webp",
    mobileImage: "/therapist-concept-previews/contact-mobile.webp",
    alt: "Screenshot of the Fieldstone Practice concept Contact page, showing a simple contact form and direct details.",
  },
  booking: {
    key: "booking",
    label: "Booking",
    demoRouteKey: "book",
    desktopImage: "/therapist-concept-previews/booking-desktop.webp",
    mobileImage: "/therapist-concept-previews/booking-mobile.webp",
    alt: "Screenshot of the Fieldstone Practice concept Booking page, showing an online appointment request flow.",
  },
};

export function getConceptPreview(tabId: ConceptTabId): ConceptPreviewEntry {
  return conceptPreviews[tabId];
}

/** Local (relative) demo route for a concept tab, e.g. "/therapist-demo/book". */
export function getDemoTabRoute(tabId: ConceptTabId, locale: Locale): string {
  return route(conceptPreviews[tabId].demoRouteKey, locale);
}

/** Fully-qualified live demo URL for a concept tab on the canonical public demo host. */
export function getLiveDemoTabUrl(locale: Locale, tabId: ConceptTabId = "home"): string {
  return `${DEMO_CANONICAL_HOST}${getDemoTabRoute(tabId, locale)}`;
}
