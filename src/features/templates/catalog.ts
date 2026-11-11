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
  summary: string;
  description: string;
  audience: string;
  features: string[];
  variants: TemplateVariant[];
};

export const templates: WebsiteTemplate[] = [
  {
    slug: "morrow",
    name: "Morrow",
    summary: "A personal introduction to your therapy practice.",
    description:
      "Help visitors get to know you, explore your approach and understand how to take the first step. Compare three mobile website designs for an individual therapist.",
    audience: "Independent therapists",
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
    summary: "Room for your practice, services and writing.",
    description:
      "A multi-page therapy website with dedicated spaces for your practice, services, articles and contact details. Explore the demonstration in English, Persian and Urdu.",
    audience: "Therapists and therapy practices",
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
