import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlueprintGrid from "@/components/layout/BlueprintGrid";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";
import DeferredAnalytics from "@/components/analytics/DeferredAnalytics";
import { site } from "@/content/site";

const description =
  "DeviaTech builds Shopify stores, MVPs and custom web applications for businesses and startups in Pakistan, with fixed scope, weekly updates and post-launch support.";

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
    <>
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
    </>
  );
}
