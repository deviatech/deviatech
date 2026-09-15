import type { Metadata } from "next";
import ContactPage from "@/features/therapist-demo/components/ContactPage";
import { contactFa } from "@/features/therapist-demo/content/contact.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: contactFa.meta.title,
  description: contactFa.meta.description,
  enPath: demoRoutes.contact.en,
  faPath: demoRoutes.contact.fa,
  currentIsFa: true,
});

export default function TherapistDemoContactFaPage() {
  return <ContactPage locale="fa" content={contactFa} />;
}
