import { Fraunces, Inter, Vazirmatn } from "next/font/google";
import type { TherapistLandingContent } from "../content/types";
import DocumentLocale from "./DocumentLocale";
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

export default function TherapistLanding({ content }: { content: TherapistLandingContent }) {
  return (
    <div
      data-therapist-landing
      data-locale={content.locale}
      lang={content.locale}
      dir={content.dir}
      className={`${styles.root} ${fraunces.variable} ${inter.variable} ${vazirmatn.variable}`}
    >
      <DocumentLocale locale={content.locale} />
      <LandingHero content={content} />
      <TrustBar content={content} />
      <ConceptShowcase content={content} />
      <BenefitsGrid content={content} />
      <DeviaTechBrandSection content={content} />
      <ProcessSteps content={content} />
      <PackageCards content={content} />
      <LandingFaq content={content} />
      <PreviewRequestForm content={content} />
    </div>
  );
}
