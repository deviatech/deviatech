import type { Metadata } from "next";
import AboutPage from "@/features/therapist-demo/components/AboutPage";
import { aboutFa } from "@/features/therapist-demo/content/about.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: aboutFa.meta.title,
  description: aboutFa.meta.description,
  enPath: demoRoutes.about.en,
  faPath: demoRoutes.about.fa,
  currentIsFa: true,
});

export default function TherapistDemoAboutFaPage() {
  return <AboutPage locale="fa" content={aboutFa} />;
}
