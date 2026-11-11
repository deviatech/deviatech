import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import { LOCALE_HEADER, LOCALE_META, isSupportedLocale } from "@/lib/locales";

const spaceGrotesk = localFont({
  src: "../fonts/spacegrotesk.woff2",
  weight: "300 700",
  variable: "--font-space-grotesk",
});

const inter = localFont({
  src: "../fonts/inter.woff2",
  weight: "100 900",
  variable: "--font-inter",
});

const ibmPlexMono = localFont({
  src: [
    { path: "../fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
});

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
