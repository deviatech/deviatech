import type { Metadata } from "next";
import BookingPage from "@/features/therapist-demo/components/BookingPage";
import { bookingUr } from "@/features/therapist-demo/content/booking.ur";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: bookingUr.meta.title,
  description: bookingUr.meta.description,
  paths: demoRoutes.book,
  locale: "ur",
});

export default function TherapistDemoBookUrPage() {
  return <BookingPage locale="ur" content={bookingUr} />;
}
