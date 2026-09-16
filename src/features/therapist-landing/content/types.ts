import type { Locale, Direction } from "@/lib/locales";

export type ConceptTabId = "home" | "about" | "services" | "blog" | "contact" | "booking";

export interface ConceptTabContent {
  id: ConceptTabId;
  navLabel: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
}

export interface TrustItem {
  title: string;
  description: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface PackageFeatureList {
  id: "essential" | "practice" | "international";
  name: string;
  timeline: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TherapistLandingContent {
  locale: Locale;
  dir: Direction;
  meta: {
    title: string;
    description: string;
    ogAlt: string;
    serviceName: string;
    serviceType: string;
    breadcrumbHome: string;
  };
  localeSwitch: {
    ariaLabel: string;
    en: string;
    fa: string;
    ur: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    reassurance: string;
    mockup: {
      browserLabel: string;
      practiceName: string;
      practiceTagline: string;
      navItems: string[];
      heroTitle: string;
      heroBody: string;
      ctaLabel: string;
      phoneLabel: string;
    };
  };
  trustBar: {
    heading: string;
    items: TrustItem[];
  };
  concept: {
    disclosure: string;
    heading: string;
    body: string;
    liveDemoCta: string;
    deviceToggle: {
      desktop: string;
      mobile: string;
    };
    tabs: ConceptTabContent[];
  };
  benefits: {
    heading: string;
    body: string;
    items: BenefitItem[];
  };
  brand: {
    heading: string;
    body: string;
    supporting: string;
    steps: { design: string; development: string; launch: string };
    whatsappCta: string;
  };
  process: {
    heading: string;
    body: string;
    steps: ProcessStep[];
  };
  packages: {
    heading: string;
    body: string;
    note: string;
    cta: string;
    recommendedLabel: string;
    packages: PackageFeatureList[];
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  form: {
    heading: string;
    body: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      role: string;
      rolePlaceholder: string;
      country: string;
      countryPlaceholder: string;
      website: string;
      websitePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      whatsapp: string;
      whatsappPlaceholder: string;
      note: string;
      notePlaceholder: string;
    };
    optionalLabel: string;
    requiredLabel: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    privacyNotice: string;
    confidentialityNotice: string;
    validation: {
      required: string;
      email: string;
    };
  };
  whatsappMessage: string;
}
