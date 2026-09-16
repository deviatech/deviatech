import type { Metadata } from "next";
import TherapistLanding from "@/features/therapist-landing/components/TherapistLanding";
import { ur } from "@/features/therapist-landing/content/ur";
import { site } from "@/content/site";

const canonicalPath = "/ur/therapist-website-design";

export const metadata: Metadata = {
  title: ur.meta.title,
  description: ur.meta.description,
  alternates: {
    canonical: canonicalPath,
    languages: {
      en: "/therapist-website-design",
      fa: "/fa/therapist-website-design",
      ur: canonicalPath,
      "x-default": "/therapist-website-design",
    },
  },
  openGraph: {
    title: ur.meta.title,
    description: ur.meta.description,
    url: canonicalPath,
    locale: "ur",
    type: "website",
    images: [{ url: "/logo/icon-512.png", width: 512, height: 512, alt: ur.meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: ur.meta.title,
    description: ur.meta.description,
    images: ["/logo/icon-512.png"],
  },
};

export default function TherapistWebsiteDesignUrPage() {
  const url = `${site.url}${canonicalPath}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "معالجین کے لیے ویب سائٹ ڈیزائن",
    description: ur.meta.description,
    url,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    serviceType: "ماہرینِ نفسیات، معالجین اور مشیروں کے لیے ویب سائٹ ڈیزائن",
    areaServed: "Worldwide",
    inLanguage: "ur",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ہوم", item: site.url },
      { "@type": "ListItem", position: 2, name: "معالجین کے لیے ویب سائٹ ڈیزائن", item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ur.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <TherapistLanding content={ur} />
    </>
  );
}
