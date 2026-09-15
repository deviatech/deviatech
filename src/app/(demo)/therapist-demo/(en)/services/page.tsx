import type { Metadata } from "next";
import ServicesPage from "@/features/therapist-demo/components/ServicesPage";
import { servicesEn } from "@/features/therapist-demo/content/services.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: servicesEn.meta.title,
  description: servicesEn.meta.description,
  enPath: demoRoutes.services.en,
  faPath: demoRoutes.services.fa,
  currentIsFa: false,
});

export default function TherapistDemoServicesPage() {
  return <ServicesPage locale="en" content={servicesEn} />;
}
