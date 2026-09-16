import type { Locale, Direction } from "@/lib/locales";

export type DemoLocale = Locale;
export type { Direction };

export interface ImageDescriptor {
  src: string;
  width: number;
  height: number;
  alt: Record<DemoLocale, string>;
  focalPoint?: `${number}% ${number}%`;
  decorative?: boolean;
}

export type ServiceId = "individual-therapy" | "couples-therapy" | "online-sessions" | "group-sessions";

export interface ServiceSummary {
  id: ServiceId;
  title: string;
  description: string;
  href?: string;
  image: ImageDescriptor;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface InfoCardItem {
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export type ArticleCategory =
  | "anxiety"
  | "relationships"
  | "getting-started"
  | "boundaries"
  | "burnout"
  | "self-compassion"
  | "coping-tools";

export interface ArticleSection {
  type: "heading" | "paragraph" | "list" | "quote";
  level?: 2 | 3;
  text?: string;
  items?: string[];
}

export interface Article {
  id: string;
  locale: DemoLocale;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  categoryLabel: string;
  image: ImageDescriptor;
  readingMinutes: number;
  body: ArticleSection[];
}

export interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    reassurance: string;
    image: ImageDescriptor;
  };
  principles: { heading: string; items: string[] };
  listening: {
    eyebrow: string;
    heading: string;
    body: string;
    items: InfoCardItem[];
    image: ImageDescriptor;
  };
  services: {
    heading: string;
    body: string;
    items: ServiceSummary[];
  };
  challenges: {
    heading: string;
    body: string;
    items: string[];
  };
  approach: {
    heading: string;
    body: string;
    checklist: string[];
    imageA: ImageDescriptor;
    imageB: ImageDescriptor;
  };
  articlesPreview: {
    heading: string;
    body: string;
    viewAllLabel: string;
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export interface AboutContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    image: ImageDescriptor;
  };
  story: {
    heading: string;
    paragraphs: string[];
  };
  howWeWork: {
    heading: string;
    items: InfoCardItem[];
  };
  principles: {
    heading: string;
    body: string;
    items: ProcessStep[];
  };
  quote: string;
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export interface ServicesPageContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  services: ServiceSummary[];
  process: {
    heading: string;
    body: string;
    steps: ProcessStep[];
  };
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export interface TherapyDetailContent {
  meta: { title: string; description: string };
  breadcrumbLabel: string;
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    image: ImageDescriptor;
  };
  concerns: {
    heading: string;
    items: string[];
  };
  outcomes: {
    heading: string;
    body: string;
    items: string[];
    imageA: ImageDescriptor;
    imageB: ImageDescriptor;
  };
  sessionInfo: {
    heading: string;
    items: InfoCardItem[];
  };
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export interface BlogListingContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  allCategoriesLabel: string;
  viewMoreLabel: string;
  emptyStateLabel: string;
  readingLabelSuffix: string;
}

export interface ArticleDetailContent {
  breadcrumbLabel: string;
  editorialAttribution: string;
  disclaimer: string;
  relatedHeading: string;
  shareLabel: string;
  copyLinkLabel: string;
  copiedLabel: string;
  readingLabelSuffix: string;
  languageSwitchLabel: string;
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export interface FormFieldLabels {
  fullName: string;
  fullNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  whatsapp: string;
  whatsappPlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  serviceInterest: string;
  serviceInterestOptions: { value: string; label: string }[];
  sessionPreference: string;
  sessionPreferenceOptions: { value: string; label: string }[];
  preferredDateRange: string;
  preferredDateRangePlaceholder: string;
  preferredTimeOfDay: string;
  preferredTimeOfDayOptions: { value: string; label: string }[];
  note: string;
  notePlaceholder: string;
}

export interface ContactPageContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  channelsHeading: string;
  channels: { label: string; description: string; href: string }[];
  form: {
    heading: string;
    fields: Pick<FormFieldLabels, "fullName" | "fullNamePlaceholder" | "email" | "emailPlaceholder" | "subject" | "subjectPlaceholder" | "message" | "messagePlaceholder">;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    requiredLabel: string;
    validation: { required: string; email: string };
  };
  faq: { heading: string; items: FaqItem[] };
  cta: { heading: string; body: string; buttonLabel: string };
}

export interface BookingPageContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    heading: string;
    body: string;
    demoNotice: string;
  };
  reassurance: string[];
  whatsappCta: string;
  form: {
    heading: string;
    fields: FormFieldLabels;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    requiredLabel: string;
    optionalLabel: string;
    validation: { required: string; email: string };
    formNotice: string;
  };
}

export interface LocaleDictionary {
  locale: DemoLocale;
  dir: Direction;
  brandName: string;
  brandTagline: string;
  meta: {
    titleSuffix: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
    menuLabel: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
    localeSwitchLabel: string;
  };
  footer: {
    brandBlurb: string;
    linksHeading: string;
    links: NavLink[];
    contactHeading: string;
    contactCta: string;
    conceptNotice: string;
    deviatechLinkLabel: string;
    deviatechLinkHref: string;
  };
  conceptNotice: string;
  skipLinkLabel: string;
  breadcrumbHomeLabel: string;
}
