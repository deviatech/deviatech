import type { Metadata } from "next";
import Link from "next/link";
import { ur } from "@/features/therapist-landing/content/ur";
import { therapistThankYouMetadata } from "@/features/therapist-landing/lib/seo";

export const metadata: Metadata = therapistThankYouMetadata(ur);

export default function TherapistThankYouUrPage() {
  return (
    <div data-therapist-landing lang="ur" dir="rtl" className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-medium text-[var(--tl-text,#211f1c)]">{ur.form.successTitle}</h1>
      <p className="mt-4 text-base leading-7 text-[var(--tl-text-body,#4b4741)]">{ur.form.successBody}</p>
      <Link
        href="/ur/therapist-website-design"
        className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[8px] bg-[#3d5c47] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2c4534]"
      >
        واپس مرکزی صفحے پر جائیں
      </Link>
    </div>
  );
}
