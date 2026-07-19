import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlueprintGrid from "@/components/layout/BlueprintGrid";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";
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

const title = "DeviaTech Agency - Custom Software Development & Web Solutions | Lahore, Pakistan";
const description =
  "DeviaTech is a leading software development agency in Lahore, Pakistan. We specialize in custom web applications, mobile apps, SaaS solutions, and digital transformation for startups and businesses. Get your project started today!";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  icons: {
    icon: ["/logo/icon-192.png", "/logo/icon-512.png"],
    apple: "/logo/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/logo/safari-pinned-tab.svg" }],
  },
  openGraph: {
    title: "DeviaTech Agency - Custom Software Development & Web Solutions",
    description:
      "Leading software development agency in Lahore, Pakistan. We build custom web applications, mobile apps, and SaaS solutions for startups and businesses. Transform your vision into reality.",
    url: site.url,
    images: [{ url: "/logo/icon-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeviaTech Agency - Custom Software Development & Web Solutions",
    description:
      "Leading software development agency in Lahore, Pakistan. We build custom web applications, mobile apps, and SaaS solutions for startups and businesses.",
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
  sameAs: [site.socials.linkedin, site.socials.github],
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
        <BlueprintGrid />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
