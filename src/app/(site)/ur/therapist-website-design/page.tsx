import type { Metadata } from "next";
import TherapistLanding from "@/features/therapist-landing/components/TherapistLanding";
import { ur } from "@/features/therapist-landing/content/ur";
import { therapistLandingJsonLd, therapistLandingMetadata } from "@/features/therapist-landing/lib/seo";

export const metadata: Metadata = therapistLandingMetadata(ur);

export default function TherapistWebsiteDesignUrPage() {
  return (
    <>
      {therapistLandingJsonLd(ur).map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TherapistLanding content={ur} />
    </>
  );
}
