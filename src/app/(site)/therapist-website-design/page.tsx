import type { Metadata } from "next";
import TherapistLanding from "@/features/therapist-landing/components/TherapistLanding";
import { en } from "@/features/therapist-landing/content/en";
import { therapistLandingJsonLd, therapistLandingMetadata } from "@/features/therapist-landing/lib/seo";

export const metadata: Metadata = therapistLandingMetadata(en);

export default function TherapistWebsiteDesignPage() {
  return (
    <>
      {therapistLandingJsonLd(en).map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TherapistLanding content={en} />
    </>
  );
}
