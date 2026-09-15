import type { Metadata } from "next";
import AboutPage from "@/features/therapist-demo/components/AboutPage";
import { aboutEn } from "@/features/therapist-demo/content/about.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: aboutEn.meta.title,
  description: aboutEn.meta.description,
  enPath: demoRoutes.about.en,
  faPath: demoRoutes.about.fa,
  currentIsFa: false,
});

export default function TherapistDemoAboutPage() {
  return <AboutPage locale="en" content={aboutEn} />;
}
