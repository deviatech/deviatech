import type { Metadata } from "next";
import HomePage from "@/features/therapist-demo/components/HomePage";
import { homeUr } from "@/features/therapist-demo/content/home.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: homeUr.meta.title,
  description: homeUr.meta.description,
  paths: demoRoutes.home,
  locale: "ur",
});

export default function TherapistDemoHomeUrPage() {
  return <HomePage locale="ur" content={homeUr} />;
}
