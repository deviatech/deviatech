import type { Metadata } from "next";
import BookingPage from "@/features/therapist-demo/components/BookingPage";
import { bookingFa } from "@/features/therapist-demo/content/booking.fa";
import { demoRoutes } from "@/features/therapist-demo/lib/routes";
import { demoPageMetadata } from "@/features/therapist-demo/lib/metadata";

export const metadata: Metadata = demoPageMetadata({
  title: bookingFa.meta.title,
  description: bookingFa.meta.description,
  enPath: demoRoutes.book.en,
  faPath: demoRoutes.book.fa,
  currentIsFa: true,
});

export default function TherapistDemoBookFaPage() {
  return <BookingPage locale="fa" content={bookingFa} />;
}
