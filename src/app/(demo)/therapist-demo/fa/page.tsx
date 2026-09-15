import type { Metadata } from "next";
import HomePage from "@/features/therapist-demo/components/HomePage";
import { homeFa } from "@/features/therapist-demo/content/home.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { DEMO_CANONICAL_HOST } from "@/features/therapist-demo/lib/seo";

export const metadata: Metadata = {
  title: homeFa.meta.title,
  description: homeFa.meta.description,
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${DEMO_CANONICAL_HOST}${demoRoutes.home.fa}`,
    languages: {
      en: `${DEMO_CANONICAL_HOST}${demoRoutes.home.en}`,
      fa: `${DEMO_CANONICAL_HOST}${demoRoutes.home.fa}`,
      "x-default": `${DEMO_CANONICAL_HOST}${demoRoutes.home.en}`,
    },
  },
};

export default function TherapistDemoHomeFaPage() {
  return <HomePage locale="fa" content={homeFa} />;
}
