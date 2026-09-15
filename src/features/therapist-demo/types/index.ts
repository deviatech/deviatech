export type DemoLocale = "en" | "fa";
export type Direction = "ltr" | "rtl";

export interface ImageDescriptor {
  src: string;
  width: number;
  height: number;
  alt: Record<DemoLocale, string>;
  focalPoint?: `${number}% ${number}%`;
  decorative?: boolean;
  placeholder?: boolean;
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
  alternateSlug: string;
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

export interface LocaleDictionary {
  locale: DemoLocale;
  dir: Direction;
  meta: {
    titleSuffix: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
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
