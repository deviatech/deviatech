import type { Metadata } from "next";
import ContactPage from "@/features/therapist-demo/components/ContactPage";
import { contactUr } from "@/features/therapist-demo/content/contact.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: contactUr.meta.title,
  description: contactUr.meta.description,
  paths: demoRoutes.contact,
  locale: "ur",
});

export default function TherapistDemoContactUrPage() {
  return <ContactPage locale="ur" content={contactUr} />;
}
