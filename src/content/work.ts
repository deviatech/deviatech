export interface WorkItem {
  name: string;
  description: string;
  tags: string[];
  url?: string;
}

export const workEyebrow = "PRODUCTS WE'VE BUILT";

export const work: WorkItem[] = [
  {
    name: "Cvilo",
    description: "An AI-powered resume builder — cvilo.com",
    tags: ["Next.js", "React", "Golang", "AI"],
    url: "https://cvilo.com",
  },
  {
    name: "Ala Gallery",
    description: "A gift shop built for an Instagram-based business in the Lahore market",
    tags: ["E-commerce"],
  },
  {
    name: "Nabtahvie",
    description: "A corporate website with a custom Laravel CMS admin panel — nabtahvie.ir",
    tags: ["Next.js", "Tailwind CSS", "Laravel"],
    url: "https://nabtahvie.ir",
  },
  {
    name: "EasyfyTag",
    description: "An NFC read/write platform — a desktop app for writing tags plus the web dashboard behind it — easyfytag.com",
    tags: ["Electron.js", "React", "Go", "Docker"],
    url: "https://easyfytag.com",
  },
  {
    name: "Breezr",
    description: "A single-product landing page with a cash-on-delivery order form",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://breezr-neck-fan.vercel.app",
  },
  {
    name: "ElitePulse",
    description: "A custom e-commerce platform built end-to-end for a growing store",
    tags: ["Next.js", "Express", "MongoDB", "Docker"],
    url: "https://elitepulse.vercel.app",
  },
];
