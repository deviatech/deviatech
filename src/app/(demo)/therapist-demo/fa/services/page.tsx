import type { Metadata } from "next";
import ServicesPage from "@/features/therapist-demo/components/ServicesPage";
import { servicesFa } from "@/features/therapist-demo/content/services.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: servicesFa.meta.title,
  description: servicesFa.meta.description,
  paths: demoRoutes.services,
  locale: "fa",
});

export default function TherapistDemoServicesFaPage() {
  return <ServicesPage locale="fa" content={servicesFa} />;
}
