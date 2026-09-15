import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlueprintGrid from "@/components/layout/BlueprintGrid";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";
import DeferredAnalytics from "@/components/analytics/DeferredAnalytics";
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
    images: [{ url: "/logo/icon-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo/icon-512.png"],
  },
  other: {
    "geo.region": site.geo.region,
    "geo.placename": site.geo.placename,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
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
    // Explicit dir="ltr": DeviaTech's Header/Footer use physical layout
    // utilities, not logical properties. The root <html> is always en/ltr
    // for every (site) route already (middleware never sets fa/ur for
    // these paths), so this is defense-in-depth, not the source of truth.
    <div dir="ltr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DeferredAnalytics />
      <AnalyticsEvents />
      <BlueprintGrid />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
