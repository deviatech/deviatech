import type { Metadata } from "next";
import HomePage from "@/features/therapist-demo/components/HomePage";
import { homeFa } from "@/features/therapist-demo/content/home.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: homeFa.meta.title,
  description: homeFa.meta.description,
  enPath: demoRoutes.home.en,
  faPath: demoRoutes.home.fa,
  currentIsFa: true,
});

export default function TherapistDemoHomeFaPage() {
  return <HomePage locale="fa" content={homeFa} />;
}
