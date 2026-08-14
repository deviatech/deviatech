import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlueprintGrid from "@/components/layout/BlueprintGrid";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";
import { site } from "@/content/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Software Development Agency in Lahore | DeviaTech";
const description =
  "DeviaTech builds Shopify stores, MVPs and custom web applications for businesses and startups in Pakistan, with fixed scope, weekly updates and post-launch support.";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-15GFH194BP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-15GFH194BP');
          `}
        </Script>
        <AnalyticsEvents />
        <BlueprintGrid />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
