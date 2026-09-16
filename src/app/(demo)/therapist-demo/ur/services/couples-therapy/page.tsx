import type { Metadata } from "next";
import TherapyDetailPage from "@/features/therapist-demo/components/TherapyDetailPage";
import { couplesTherapyUr } from "@/features/therapist-demo/content/couples-therapy.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: couplesTherapyUr.meta.title,
  description: couplesTherapyUr.meta.description,
  paths: demoRoutes.couplesTherapy,
  locale: "ur",
});

export default function CouplesTherapyUrPage() {
  return <TherapyDetailPage locale="ur" content={couplesTherapyUr} servicesLabel="خدمات" />;
}
