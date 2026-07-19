export interface Track {
  eyebrow?: string;
  name: string;
  headline: string;
  copy: string;
  startingPrice: string;
  cta: string;
}

export const sectionEyebrow = "WHAT WE BUILD";

export const tracks: Track[] = [
  {
    name: "Launch Track",
    headline: "Get your business online.",
    copy: "Shopify stores for boutiques, bakeries, and D2C brands — live in 7-10 days, with payments, COD, and Meta Pixel set up from day one.",
    startingPrice: "Starting from PKR 40,000",
    cta: "Ask about your store",
  },
  {
    name: "Build Track",
    headline: "Turn your idea into a product.",
    copy: "MVPs for founders — a working product you can put in front of users or investors, not just a pitch deck.",
    startingPrice: "Starting from PKR 150,000",
    cta: "Talk about your idea",
  },
];

export const howItWorks = [
  {
    step: "Discovery",
    copy: "A short call to understand what you're building and why.",
  },
  {
    step: "Draft",
    copy: "We map the scope, timeline, and a fixed price before any code is written.",
  },
  {
    step: "Build",
    copy: "You see progress every week — no black-box development.",
  },
  {
    step: "Launch",
    copy: "Live, tested, and handed off with support.",
  },
];
