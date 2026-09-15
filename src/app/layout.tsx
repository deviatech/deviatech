import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/content/site";
import { LOCALE_HEADER, LOCALE_META, isSupportedLocale } from "@/lib/locales";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const headerValue = requestHeaders.get(LOCALE_HEADER);
  const locale = headerValue && isSupportedLocale(headerValue) ? headerValue : "en";
  const { lang, dir } = LOCALE_META[locale];

  return (
    <html lang={lang} dir={dir}>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
