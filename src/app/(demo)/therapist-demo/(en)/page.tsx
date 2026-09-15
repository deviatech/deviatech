import type { Metadata } from "next";
import HomePage from "@/features/therapist-demo/components/HomePage";
import { homeEn } from "@/features/therapist-demo/content/home.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { DEMO_CANONICAL_HOST } from "@/features/therapist-demo/lib/seo";

export const metadata: Metadata = {
  title: homeEn.meta.title,
  description: homeEn.meta.description,
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${DEMO_CANONICAL_HOST}${demoRoutes.home.en}`,
    languages: {
      en: `${DEMO_CANONICAL_HOST}${demoRoutes.home.en}`,
      fa: `${DEMO_CANONICAL_HOST}${demoRoutes.home.fa}`,
      "x-default": `${DEMO_CANONICAL_HOST}${demoRoutes.home.en}`,
    },
  },
};

export default function TherapistDemoHomePage() {
  return <HomePage locale="en" content={homeEn} />;
}
