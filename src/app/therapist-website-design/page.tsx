import type { Metadata } from "next";
import TherapistLanding from "@/features/therapist-landing/components/TherapistLanding";
import { en } from "@/features/therapist-landing/content/en";
import { site } from "@/content/site";

const canonicalPath = "/therapist-website-design";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    canonical: canonicalPath,
    languages: {
      en: canonicalPath,
      fa: "/fa/therapist-website-design",
      "x-default": canonicalPath,
    },
  },
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    url: canonicalPath,
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo/icon-512.png", width: 512, height: 512, alt: en.meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
    images: ["/logo/icon-512.png"],
  },
};

export default function TherapistWebsiteDesignPage() {
  const url = `${site.url}${canonicalPath}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Therapist Website Design",
    description: en.meta.description,
    url,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    serviceType: "Website design for therapists, psychologists, and counselors",
    areaServed: "Worldwide",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Therapist Website Design", item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: en.faq.items.map((item) => ({
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
      <TherapistLanding content={en} />
    </>
  );
}
