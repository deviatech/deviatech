import type { Metadata } from "next";
import ContactPage from "@/features/therapist-demo/components/ContactPage";
import { contactEn } from "@/features/therapist-demo/content/contact.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: contactEn.meta.title,
  description: contactEn.meta.description,
  paths: demoRoutes.contact,
  locale: "en",
});

export default function TherapistDemoContactPage() {
  return <ContactPage locale="en" content={contactEn} />;
}
