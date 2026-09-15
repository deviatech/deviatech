import type { Metadata } from "next";
import TherapyDetailPage from "@/features/therapist-demo/components/TherapyDetailPage";
import { couplesTherapyEn } from "@/features/therapist-demo/content/couples-therapy.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: couplesTherapyEn.meta.title,
  description: couplesTherapyEn.meta.description,
  enPath: demoRoutes.couplesTherapy.en,
  faPath: demoRoutes.couplesTherapy.fa,
  currentIsFa: false,
});

export default function CouplesTherapyPage() {
  return <TherapyDetailPage locale="en" content={couplesTherapyEn} servicesLabel="Services" />;
}
