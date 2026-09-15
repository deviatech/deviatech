import type { Metadata } from "next";
import BookingPage from "@/features/therapist-demo/components/BookingPage";
import { bookingEn } from "@/features/therapist-demo/content/booking.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: bookingEn.meta.title,
  description: bookingEn.meta.description,
  paths: demoRoutes.book,
  locale: "en",
});

export default function TherapistDemoBookPage() {
  return <BookingPage locale="en" content={bookingEn} />;
}
