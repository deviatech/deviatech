import type { Metadata } from "next";
import TherapyDetailPage from "@/features/therapist-demo/components/TherapyDetailPage";
import { individualTherapyEn } from "@/features/therapist-demo/content/individual-therapy.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: individualTherapyEn.meta.title,
  description: individualTherapyEn.meta.description,
  paths: demoRoutes.individualTherapy,
  locale: "en",
});

export default function IndividualTherapyPage() {
  return <TherapyDetailPage locale="en" content={individualTherapyEn} servicesLabel="Services" />;
}
