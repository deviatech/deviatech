import type { Metadata } from "next";
import HomePage from "@/features/therapist-demo/components/HomePage";
import { homeEn } from "@/features/therapist-demo/content/home.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: homeEn.meta.title,
  description: homeEn.meta.description,
  enPath: demoRoutes.home.en,
  faPath: demoRoutes.home.fa,
  currentIsFa: false,
});

export default function TherapistDemoHomePage() {
  return <HomePage locale="en" content={homeEn} />;
}
