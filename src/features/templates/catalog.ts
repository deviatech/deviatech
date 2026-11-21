const showcaseBaseUrl =
  process.env.SHOWCASE_BASE_URL || "https://preview.deviatech.com";

export type TemplateVariant = {
  slug: string;
  name: string;
  description: string;
  image: string;
  demoUrl: string;
  featured?: boolean;
};

export type WebsiteTemplate = {
  slug: string;
  name: string;
  seoTitle: string;
  summary: string;
  description: string;
  audience: string;
  previewLayout?: "mobile";
  features: string[];
  demoJourney: string;
  fit: string;
  variants: TemplateVariant[];
};

export const templates: WebsiteTemplate[] = [
  {
    slug: "morrow",
    previewLayout: "mobile",
    name: "Morrow",
    seoTitle: "Morrow Website Template for Solo Therapists",
    summary: "A personal introduction to your therapy practice.",
    description:
      "Help visitors get to know you, explore your approach and understand how to take the first step. Compare three mobile website designs for an individual therapist.",
    audience: "Independent therapists",
    fit: "For a solo therapist who wants a personal, mobile-first introduction and a straightforward enquiry page.",
    demoJourney: "Compare three homepage designs, open the approach tabs, and try a sample enquiry. Each version introduces a single fictional therapist.",
    features: [
      "Therapist introduction",
      "Interactive approach tabs",
      "Service details and FAQs",
      "Demonstration enquiry form",
    ],
    variants: [
      {
        slug: "first-conversation",
        name: "First Conversation",
        description:
          "The original Morrow design, with bright colours and a mobile-first introduction.",
        image: "/images/templates/morrow/first-conversation.webp",
        demoUrl: `${showcaseBaseUrl}/morrow/first-conversation/`,
        featured: true,
      },
      {
        slug: "space-to-think",
        name: "Space to Think",
        description:
          "An alternative layout built around space for what is on your mind.",
        image: "/images/templates/morrow/space-to-think.webp",
        demoUrl: `${showcaseBaseUrl}/morrow/space-to-think/`,
      },
      {
        slug: "space-to-speak",
        name: "Space to Speak",
        description:
          "An alternative introduction centred on speaking openly and exploring individual therapy.",
        image: "/images/templates/morrow/space-to-speak.webp",
        demoUrl: `${showcaseBaseUrl}/morrow/space-to-speak/`,
      },
    ],
  },
  {
    slug: "luma",
    name: "Luma",
    seoTitle: "Luma Multilingual Therapist Website Template",
    summary: "Room for your practice, services and writing.",
    description:
      "A multi-page therapy website with dedicated spaces for your practice, services, articles and contact details. Explore the demonstration in English, Persian and Urdu.",
    audience: "Therapists and therapy practices",
    fit: "For a practice that needs separate service pages, an article library, or a website in multiple languages.",
    demoJourney: "Switch between English, Persian and Urdu, browse therapy service pages and articles, and try the sample contact or booking form.",
    features: [
      "Home, about and service pages",
      "Articles and topic browsing",
      "English, Persian and Urdu demos",
      "Demonstration contact and booking forms",
    ],
    variants: [
      {
        slug: "original",
        name: "Luma Original",
        description:
          "A multi-page design with practice photography, service pages and an article library.",
        image: "/images/templates/luma/original.webp",
        demoUrl: `${showcaseBaseUrl}/luma/`,
        featured: true,
      },
    ],
  },
  {
    slug: "alder",
    name: "Alder",
    seoTitle: "Alder Website Template for Therapy Centres",
    previewLayout: "mobile",
    summary: "Help people find a therapist they feel at ease with.",
    description:
      "A mobile-first website template for therapy centres and group practices, with therapist profiles, individual and couples sessions, sample fees and a guided request preview.",
    audience: "Therapy centres and group practices",
    fit: "For a therapy centre with several practitioners, where visitors need to compare session types and choose who they would like to meet.",
    demoJourney: "Compare individual and couples sessions, explore fictional therapist profiles, and preview a request by choosing a session, a therapist and an online or in-person meeting. The demo shows a summary with sample fees.",
    features: [
      "Therapist profiles",
      "Individual and couples therapy",
      "Session fees and FAQs",
      "Guided request preview with editable choices and a summary",
    ],
    variants: [
      {
        slug: "refined",
        name: "Alder Refined",
        description: "A mobile homepage with therapist portraits, session details and a guide for new visitors.",
        image: "/images/templates/alder/refined.webp",
        demoUrl: `${showcaseBaseUrl}/alder/`,
        featured: true,
      },
    ],
  },
  {
    slug: "little-fieldnotes",
    name: "Little Fieldnotes",
    seoTitle: "Little Fieldnotes Website Template for Child Psychologists",
    previewLayout: "mobile",
    summary: "One ordinary morning, seen from two perspectives.",
    description:
      "An illustrated, mobile-first landing page for an independent child psychologist. A small moment with a ladybug introduces the practitioner and gives caregivers a feel for a first conversation.",
    audience: "Independent child psychologists",
    fit: "For a solo child psychologist who wants to introduce their approach to caregivers through a short, interactive story.",
    demoJourney:
      "Switch between the adult’s and child’s perspectives, look through three illustrated details, and open a fictional first conversation.",
    features: [
      "Interactive perspective switch",
      "Illustrated observation cards",
      "Practitioner introduction and first-chat FAQs",
      "Sample conversation preview",
    ],
    variants: [
      {
        slug: "original",
        name: "Little Fieldnotes",
        description:
          "An illustrated story that follows a caregiver and child through the same moment.",
        image: "/images/templates/little-fieldnotes/original.webp",
        demoUrl: `${showcaseBaseUrl}/little-fieldnotes/`,
        featured: true,
      },
    ],
  },
];

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug);
}

export function templateEnquiryUrl(
  template: WebsiteTemplate,
  variant: TemplateVariant,
) {
  return `/contact?template=${template.slug}&variant=${variant.slug}`;
}
