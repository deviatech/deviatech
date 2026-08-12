export interface CaseStudy {
  slug: string;
  name: string;
  title: string;
  summary: string;
  clientProblem: string;
  proposedSolution: string;
  scope: string[];
  process: string[];
  timeline: string;
  result: string;
  testimonial: string;
  testimonialAttribution: string;
  stack: string[];
  link?: string;
  cta: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "cvilo-ai-resume-builder",
    name: "Cvilo",
    title: "Cvilo: an AI-powered resume builder",
    summary: "A product experience for creating resumes with AI assistance.",
    clientProblem: "Cvilo needed a focused product experience around resume creation rather than a marketing-only website.",
    proposedSolution: "DeviaTech shaped the core resume creation journey into a usable web product with AI-assisted workflows.",
    scope: ["Product interface for resume creation", "AI-assisted content workflow", "Responsive web experience", "Supporting application experience"],
    process: ["Defined the core resume workflow", "Built and reviewed the product in weekly increments", "Connected the interface to the product services", "Prepared the application for real users"],
    timeline: "Delivered as a focused product build with weekly reviews and incremental releases.",
    result: "Cvilo launched as a working AI-powered resume builder that users can use to create and refine resumes.",
    testimonial: "Client testimonial pending approval.",
    testimonialAttribution: "Cvilo team, pending approval",
    stack: ["Next.js", "React", "Golang", "AI"],
    link: "https://cvilo.com",
    cta: "Discuss your product MVP",
  },
  {
    slug: "easyfytag-nfc-platform",
    name: "EasyfyTag",
    title: "EasyfyTag: an NFC read and write platform",
    summary: "A connected desktop and web experience for working with NFC tags.",
    clientProblem: "EasyfyTag required more than a brochure site: users needed a desktop tool for writing tags and a dashboard for managing the web side of the platform.",
    proposedSolution: "DeviaTech connected a desktop writing tool with a web dashboard so the product could support the full read and write workflow.",
    scope: ["Electron desktop app", "React web dashboard", "Go services", "Docker-based deployment workflow"],
    process: ["Mapped the desktop-to-dashboard workflow", "Built the tag-writing and management surfaces", "Integrated the product services", "Tested the connected workflow across environments"],
    timeline: "Delivered as a connected desktop and web platform with staged implementation and integration reviews.",
    result: "EasyfyTag became a working platform spanning tag writing, web management, and the services connecting both experiences.",
    testimonial: "Client testimonial pending approval.",
    testimonialAttribution: "EasyfyTag team, pending approval",
    stack: ["Electron.js", "React", "Go", "Docker"],
    link: "https://easyfytag.com",
    cta: "Discuss your connected product",
  },
  {
    slug: "ala-gallery-ecommerce",
    name: "Ala Gallery",
    title: "Ala Gallery: an ecommerce store for a Lahore gift shop",
    summary: "An online gift shop experience for an Instagram-led local business.",
    clientProblem: "Ala Gallery needed a simple ecommerce presence that matched how its Lahore customers already discovered products through Instagram.",
    proposedSolution: "DeviaTech shaped the store around product discovery and a practical path from social audience to order.",
    scope: ["Ecommerce storefront", "Product discovery and catalogue structure", "Mobile-first buying journey", "Path from social audience to order"],
    process: ["Reviewed the product catalogue and Instagram-led customer journey", "Planned the store structure", "Built the shopping experience", "Reviewed the path from product discovery to order"],
    timeline: "Delivered as a focused ecommerce launch for a local gift business.",
    result: "Ala Gallery gained an online gift shop experience that gave its social audience a dedicated path to browse products and place orders.",
    testimonial: "Client testimonial pending approval.",
    testimonialAttribution: "Ala Gallery team, pending approval",
    stack: ["E-commerce"],
    cta: "Plan your ecommerce store",
  },
  {
    slug: "nabtahvie-corporate-website",
    name: "Nabtahvie",
    title: "Nabtahvie: a corporate website with a custom CMS",
    summary: "A corporate website backed by a custom Laravel CMS admin panel.",
    clientProblem: "Nabtahvie needed a public-facing corporate website and a practical way for its team to manage content.",
    proposedSolution: "DeviaTech built the website experience and connected it to a custom Laravel CMS for ongoing content updates.",
    scope: ["Corporate website", "Content structure and presentation", "Custom Laravel CMS admin panel", "Ongoing content update workflow"],
    process: ["Planned the public website and content needs", "Built the frontend experience", "Connected the custom CMS", "Tested the content management workflow"],
    timeline: "Delivered as a corporate website and CMS implementation with staged frontend and admin work.",
    result: "Nabtahvie received a public corporate website backed by a CMS its team could use for content management.",
    testimonial: "Client testimonial pending approval.",
    testimonialAttribution: "Nabtahvie team, pending approval",
    stack: ["Next.js", "Tailwind CSS", "Laravel"],
    link: "https://nabtahvie.ir",
    cta: "Discuss your business website",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null;
}
