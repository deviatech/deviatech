import type { TherapyDetailContent } from "../types";
import { demoImages } from "./images";

export const couplesTherapyEn: TherapyDetailContent = {
  meta: {
    title: "Couples Therapy — Luma Therapy",
    description: "A steady space for two people to understand each other more clearly and navigate conflict differently.",
  },
  breadcrumbLabel: "Couples Therapy",
  hero: {
    eyebrow: "Couples Therapy",
    heading: "A steady space for two people",
    body: "Couples therapy offers a structured space to be heard together — not to decide who's right, but to understand each other more clearly.",
    image: demoImages.couplesHero,
  },
  concerns: {
    heading: "Common challenges couples bring",
    items: [
      "The same argument repeating without resolution",
      "Feeling unheard or misunderstood",
      "Drifting apart after a big life change",
      "Difficulty rebuilding trust",
      "Different expectations about the relationship",
      "Wanting to communicate more openly",
    ],
  },
  outcomes: {
    heading: "What this work may support",
    body: "Every relationship is different, and outcomes vary — this work isn't about deciding whether to stay together. It may help you both:",
    items: [
      "Understand the pattern underneath recurring conflicts",
      "Communicate needs more directly, with less defensiveness",
      "Rebuild a sense of being on the same team",
      "Make clearer decisions about the relationship's future, together",
    ],
    imageA: demoImages.couplesOutcomeA,
    imageB: demoImages.couplesOutcomeB,
  },
  sessionInfo: {
    heading: "Practical details",
    items: [
      { title: "Duration", description: "Sessions are typically 60 minutes for two people." },
      { title: "Frequency", description: "Usually weekly or fortnightly, adjusted as the work progresses." },
      { title: "Format", description: "Available online or in person, together or with occasional individual sessions." },
      { title: "Confidentiality", description: "Boundaries around what's shared individually versus together are discussed upfront." },
    ],
  },
  cta: {
    heading: "Considering couples therapy together?",
    body: "A first conversation can help both of you see what the process might look like — no pressure, no obligation.",
    buttonLabel: "Book a Consultation",
  },
};
