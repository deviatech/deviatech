import type { Metadata } from "next";
import TherapyDetailPage from "@/features/therapist-demo/components/TherapyDetailPage";
import { couplesTherapyFa } from "@/features/therapist-demo/content/couples-therapy.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: couplesTherapyFa.meta.title,
  description: couplesTherapyFa.meta.description,
  enPath: demoRoutes.couplesTherapy.en,
  faPath: demoRoutes.couplesTherapy.fa,
  currentIsFa: true,
});

export default function CouplesTherapyFaPage() {
  return <TherapyDetailPage locale="fa" content={couplesTherapyFa} servicesLabel="خدمات" />;
}
