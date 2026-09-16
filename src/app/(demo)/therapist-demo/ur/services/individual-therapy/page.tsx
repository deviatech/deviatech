import type { Metadata } from "next";
import TherapyDetailPage from "@/features/therapist-demo/components/TherapyDetailPage";
import { individualTherapyUr } from "@/features/therapist-demo/content/individual-therapy.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: individualTherapyUr.meta.title,
  description: individualTherapyUr.meta.description,
  paths: demoRoutes.individualTherapy,
  locale: "ur",
});

export default function IndividualTherapyUrPage() {
  return <TherapyDetailPage locale="ur" content={individualTherapyUr} servicesLabel="خدمات" />;
}
