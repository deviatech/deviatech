import type { Metadata } from "next";
import TherapistLanding from "@/features/therapist-landing/components/TherapistLanding";
import { fa } from "@/features/therapist-landing/content/fa";
import { site } from "@/content/site";

const canonicalPath = "/fa/therapist-website-design";

export const metadata: Metadata = {
  title: fa.meta.title,
  description: fa.meta.description,
  alternates: {
    canonical: canonicalPath,
    languages: {
      en: "/therapist-website-design",
      fa: canonicalPath,
      ur: "/ur/therapist-website-design",
      "x-default": "/therapist-website-design",
    },
  },
  openGraph: {
    title: fa.meta.title,
    description: fa.meta.description,
    url: canonicalPath,
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/logo/icon-512.png", width: 512, height: 512, alt: fa.meta.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: fa.meta.title,
    description: fa.meta.description,
    images: ["/logo/icon-512.png"],
  },
};

export default function TherapistWebsiteDesignFaPage() {
  const url = `${site.url}${canonicalPath}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "طراحی سایت برای درمانگران",
    description: fa.meta.description,
    url,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    serviceType: "طراحی وب‌سایت برای روان‌شناسان، درمانگران و مشاوران",
    areaServed: "Worldwide",
    inLanguage: "fa",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: site.url },
      { "@type": "ListItem", position: 2, name: "طراحی سایت برای درمانگران", item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fa.faq.items.map((item) => ({
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
      <TherapistLanding content={fa} />
    </>
  );
}
