import Link from "next/link";
import { Fraunces, Inter, Vazirmatn, Noto_Sans_Arabic } from "next/font/google";
import type { TherapistLandingContent } from "../content/types";
import LandingHero from "./LandingHero";
import TrustBar from "./TrustBar";
import ConceptShowcase from "./ConceptShowcase";
import BenefitsGrid from "./BenefitsGrid";
import DeviaTechBrandSection from "./DeviaTechBrandSection";
import ProcessSteps from "./ProcessSteps";
import PackageCards from "./PackageCards";
import LandingFaq from "./LandingFaq";
import PreviewRequestForm from "./PreviewRequestForm";
import styles from "../therapistLanding.module.css";

const fraunces = Fraunces({
  variable: "--font-tl-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-tl-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-tl-persian",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-tl-urdu",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function TherapistLanding({ content }: { content: TherapistLandingContent }) {
  return (
    <div
      data-therapist-landing
      data-locale={content.locale}
      lang={content.locale}
      dir={content.dir}
      className={`${styles.root} ${fraunces.variable} ${inter.variable} ${vazirmatn.variable} ${notoSansArabic.variable}`}
    >
      <LandingHero content={content} />
      <TrustBar content={content} />
      <ConceptShowcase content={content} />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link href="/templates" className="underline underline-offset-4">
          {content.locale === "fa" ? "مشاهدهٔ قالب‌های Morrow و Luma" : content.locale === "ur" ? "Morrow اور Luma کے ڈیزائن دیکھیں" : "Explore Morrow and Luma website templates"}
        </Link>
      </div>
      <BenefitsGrid content={content} />
      <DeviaTechBrandSection content={content} />
      <ProcessSteps content={content} />
      <PackageCards content={content} />
      <LandingFaq content={content} />
      <PreviewRequestForm content={content} />
    </div>
  );
}
