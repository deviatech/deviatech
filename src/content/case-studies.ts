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
    clientProblem: "Cvilo needed an actual product for creating resumes, not just a marketing website.",
    proposedSolution: "DeviaTech built the resume-creation flow into a working web product, with AI assisting at each step.",
    scope: ["Product interface for resume creation", "AI-assisted content workflow", "Responsive web experience", "Supporting application experience"],
    process: ["Defined the core resume workflow", "Built and reviewed the product in weekly increments", "Connected the interface to the product services", "Prepared the application for real users"],
    timeline: "Built in weekly increments, with reviews along the way instead of one long build-and-reveal.",
    result: "Cvilo is live: an AI-powered resume builder people use to create and refine their resumes.",
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
    clientProblem: "EasyfyTag needed more than a brochure site. Users needed a desktop tool for writing tags and a web dashboard for managing the platform.",
    proposedSolution: "DeviaTech connected a desktop tag-writing tool with a web dashboard, covering both sides of the read-and-write workflow.",
    scope: ["Electron desktop app", "React web dashboard", "Go services", "Docker-based deployment workflow"],
    process: ["Mapped the desktop-to-dashboard workflow", "Built the tag-writing and management surfaces", "Integrated the product services", "Tested the connected workflow across environments"],
    timeline: "Built in stages, with integration reviews as the desktop app and web dashboard came together.",
    result: "EasyfyTag is a working platform now, covering tag writing, web management, and the services that connect the two.",
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
    proposedSolution: "DeviaTech built the store around product discovery, so Instagram followers had a clear path from browsing to placing an order.",
    scope: ["Ecommerce storefront", "Product discovery and catalogue structure", "Mobile-first buying journey", "Path from social audience to order"],
    process: ["Reviewed the product catalogue and Instagram-led customer journey", "Planned the store structure", "Built the shopping experience", "Reviewed the path from product discovery to order"],
    timeline: "The store launched as a focused ecommerce site for a local gift business in Lahore.",
    result: "Ala Gallery now has an online store, giving its Instagram audience a direct way to browse products and place orders.",
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
    clientProblem: "Nabtahvie needed a public corporate website, plus a way for its team to manage content themselves.",
    proposedSolution: "DeviaTech built the website and connected it to a custom Laravel CMS so the team could keep content updated.",
    scope: ["Corporate website", "Content structure and presentation", "Custom Laravel CMS admin panel", "Ongoing content update workflow"],
    process: ["Planned the public website and content needs", "Built the frontend experience", "Connected the custom CMS", "Tested the content management workflow"],
    timeline: "The website and CMS were built and reviewed in stages, covering both the public frontend and the admin panel.",
    result: "Nabtahvie now has a public corporate website backed by a CMS its team can use to manage content.",
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
