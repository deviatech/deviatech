import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlueprintGrid from "@/components/layout/BlueprintGrid";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";
import DeferredAnalytics from "@/components/analytics/DeferredAnalytics";
import { analyticsSiteData } from "@/lib/analytics-site";
import JsonLd from "@/components/JsonLd";
import { organizationId, websiteId } from "@/lib/site-entities";
import { site } from "@/content/site";

const title = "Software Development Agency in Lahore | DeviaTech";
const description =
  "DeviaTech builds Shopify stores, MVPs and custom web applications for businesses and startups in Pakistan, with fixed scope, weekly updates and post-launch support.";

/**
 * DeviaTech's own fallback metadata, scoped to (site) rather than the root
 * layout. It used to live in src/app/layout.tsx, but Next.js merges
 * `other` (geo.region/geo.placename/geo.position here) into every child
 * page's metadata rather than letting children replace it, which leaked
 * these DeviaTech-specific tags onto (demo) pages regardless of what they
 * declared themselves. Scoping it to (site) means (demo) simply never
 * inherits it, since (demo) is a sibling route group, not a descendant of
 * this layout.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    images: [site.shareImage],
  },
  twitter: {
    card: "summary",
  },
  other: {
    "geo.region": site.geo.region,
    "geo.placename": site.geo.placename,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
  },
};

const organization = {
  "@type": "LocalBusiness",
  "@id": organizationId,
  name: site.name,
  description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  sameAs: [
    site.socials.linkedin,
    site.socials.github,
    site.socials.facebook,
    site.socials.instagram,
  ],
};

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          organization,
          { "@type": "WebSite", "@id": websiteId, name: site.name, url: site.url, publisher: { "@id": organizationId } },
        ],
      }} />
      <AnalyticsEvents />
      <BlueprintGrid />
      {/*
        Explicit dir="ltr" scoped to only Header/Footer (physical layout
        utilities, not logical properties — they'd visually mirror under
        an RTL ancestor). Deliberately does NOT wrap <main>: the fa/ur
        therapist-landing routes render inside this same (site) group
        (they reuse this real DeviaTech chrome by original design) and
        must stay free to set their own dir="rtl" without an LTR
        ancestor above them — TherapistLanding.tsx already does this on
        its own root element.
      */}
      <div data-site-shell dir="ltr">
        <Header />
      </div>
      <main tabIndex={-1}>{children}</main>
      <div data-site-shell dir="ltr">
        <Footer analyticsControls={<DeferredAnalytics {...analyticsSiteData} />} />
      </div>
      <StickyWhatsApp />
    </>
  );
}
