import type { Metadata } from "next";
import AboutPage from "@/features/therapist-demo/components/AboutPage";
import { aboutUr } from "@/features/therapist-demo/content/about.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: aboutUr.meta.title,
  description: aboutUr.meta.description,
  paths: demoRoutes.about,
  locale: "ur",
});

export default function TherapistDemoAboutUrPage() {
  return <AboutPage locale="ur" content={aboutUr} />;
}
