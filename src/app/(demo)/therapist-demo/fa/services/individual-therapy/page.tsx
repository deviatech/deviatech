import type { Metadata } from "next";
import TherapyDetailPage from "@/features/therapist-demo/components/TherapyDetailPage";
import { individualTherapyFa } from "@/features/therapist-demo/content/individual-therapy.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: individualTherapyFa.meta.title,
  description: individualTherapyFa.meta.description,
  enPath: demoRoutes.individualTherapy.en,
  faPath: demoRoutes.individualTherapy.fa,
  currentIsFa: true,
});

export default function IndividualTherapyFaPage() {
  return <TherapyDetailPage locale="fa" content={individualTherapyFa} servicesLabel="خدمات" />;
}
