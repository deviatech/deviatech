import type { Metadata } from "next";
import BookingPage from "@/features/therapist-demo/components/BookingPage";
import { bookingEn } from "@/features/therapist-demo/content/booking.en";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: bookingEn.meta.title,
  description: bookingEn.meta.description,
  enPath: demoRoutes.book.en,
  faPath: demoRoutes.book.fa,
  currentIsFa: false,
});

export default function TherapistDemoBookPage() {
  return <BookingPage locale="en" content={bookingEn} />;
}
