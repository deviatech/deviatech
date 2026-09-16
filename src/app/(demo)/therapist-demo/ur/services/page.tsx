import type { Metadata } from "next";
import ServicesPage from "@/features/therapist-demo/components/ServicesPage";
import { servicesUr } from "@/features/therapist-demo/content/services.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: servicesUr.meta.title,
  description: servicesUr.meta.description,
  paths: demoRoutes.services,
  locale: "ur",
});

export default function TherapistDemoServicesUrPage() {
  return <ServicesPage locale="ur" content={servicesUr} />;
}
