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
    tags: ["Next.js", "AI"],
    url: "https://cvilo.com",
  },
  {
    name: "Variareel",
    description: "YouTube-to-Shorts clipping pipeline with async job queues",
    tags: ["Next.js", "BullMQ", "ffmpeg"],
  },
  {
    name: "Ala Gallery",
    description: "A personalized gift shop built for the Lahore market",
    tags: ["E-commerce"],
  },
  {
    name: "Buraq Clone",
    description: "A full MERN e-commerce platform with Stripe payments",
    tags: ["MongoDB", "Express", "Next.js"],
  },
];
