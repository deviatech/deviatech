import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Locale } from "@/lib/locales";
import type { TherapistLandingContent } from "../content/types";
import { therapistLandingConfig } from "../config";

const OG_IMAGE = { url: "/logo/icon-512.png", width: 512, height: 512 };

/**
 * Open Graph locales must be language_TERRITORY. Urdu has no approved
 * territory strategy, so og:locale is omitted for it rather than implying
 * country targeting with a code like ur_PK. hreflang stays plain "ur".
 */
const OG_LOCALE: Record<Locale, string | undefined> = {
  en: "en_US",
  fa: "fa_IR",
  ur: undefined,
};

/** Brand as written in standalone titles; Persian introduces the transliteration. */
const BRAND_TITLE: Record<Locale, string> = {
  en: "DeviaTech",
  fa: "DeviaTech (دویاتک)",
  ur: "DeviaTech",
};

/**
 * Stable identifier for DeviaTech as the service provider. Only name and url
 * are asserted here; business facts (address, phone, geo) stay solely in the
 * sitewide LocalBusiness schema in (site)/layout.tsx, which is unchanged.
 */
const ORGANIZATION_ID = `${site.url}/#organization`;

function openGraphLocale(locale: Locale) {
  const ogLocale = OG_LOCALE[locale];
  return ogLocale ? { locale: ogLocale } : {};
}

export function therapistLandingMetadata(content: TherapistLandingContent): Metadata {
  const { routes } = therapistLandingConfig;
  const path = routes[content.locale];
  const { title, description, ogAlt } = content.meta;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: routes.en,
        fa: routes.fa,
        ur: routes.ur,
        "x-default": routes.en,
      },
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      title,
      description,
      url: path,
      ...openGraphLocale(content.locale),
      type: "website",
      images: [{ ...OG_IMAGE, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Service, BreadcrumbList and FAQPage — each backed by visible page content. */
export function therapistLandingJsonLd(content: TherapistLandingContent) {
  const url = `${site.url}${therapistLandingConfig.routes[content.locale]}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: content.meta.serviceName,
    description: content.meta.description,
    url,
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: site.name,
      url: site.url,
    },
    serviceType: content.meta.serviceType,
    areaServed: "Worldwide",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.meta.breadcrumbHome, item: site.url },
      { "@type": "ListItem", position: 2, name: content.meta.serviceName, item: url },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return [service, breadcrumb, faq];
}

/** Thank-you pages stay noindex; this only stops them inheriting DeviaTech's homepage metadata. */
export function therapistThankYouMetadata(content: TherapistLandingContent): Metadata {
  const path = therapistLandingConfig.thankYouRoutes[content.locale];
  const title = `${content.form.successTitle} | ${BRAND_TITLE[content.locale]}`;
  const description = content.form.successBody;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      ...openGraphLocale(content.locale),
      type: "website",
      images: [{ ...OG_IMAGE, alt: content.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
