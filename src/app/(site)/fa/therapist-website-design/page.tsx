import type { Metadata } from "next";
import TherapistLanding from "@/features/therapist-landing/components/TherapistLanding";
import { fa } from "@/features/therapist-landing/content/fa";
import { therapistLandingJsonLd, therapistLandingMetadata } from "@/features/therapist-landing/lib/seo";

export const metadata: Metadata = therapistLandingMetadata(fa);

export default function TherapistWebsiteDesignFaPage() {
  return (
    <>
      {therapistLandingJsonLd(fa).map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TherapistLanding content={fa} />
    </>
  );
}
