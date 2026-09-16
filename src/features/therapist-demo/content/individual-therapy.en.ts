import type { TherapyDetailContent } from "../types";
import { demoImages } from "./images";

export const individualTherapyEn: TherapyDetailContent = {
  meta: {
    title: "Individual Therapy — Luma Therapy",
    description: "One-to-one sessions for anxiety, stress, self-doubt, and life transitions.",
  },
  breadcrumbLabel: "Individual Therapy",
  hero: {
    eyebrow: "Individual Therapy",
    heading: "A space shaped entirely around you",
    body: "One-to-one sessions for anxiety, stress, self-doubt, and the kind of life transitions that are hard to navigate alone.",
    image: demoImages.individualHero,
  },
  concerns: {
    heading: "Does this feel familiar?",
    items: [
      "Persistent anxiety or racing thoughts",
      "Stress that feels hard to switch off",
      "Self-doubt affecting decisions",
      "Big life transitions or uncertainty",
      "Low mood or motivation",
      "Wanting to understand recurring patterns",
    ],
  },
  outcomes: {
    heading: "What this work may support",
    body: "Individual sessions can't promise a fixed outcome, but many people find they gradually feel more able to:",
    items: [
      "Notice and interrupt anxious or self-critical thought patterns",
      "Make decisions with more clarity and less second-guessing",
      "Build a small, practical toolkit for difficult moments",
      "Feel more settled in day-to-day life",
    ],
    imageA: demoImages.individualOutcomeA,
    imageB: demoImages.individualOutcomeB,
  },
  sessionInfo: {
    heading: "Practical details",
    items: [
      { title: "Duration", description: "Sessions are typically 50 minutes." },
      { title: "Frequency", description: "Usually weekly or fortnightly, adjusted over time as needed." },
      { title: "Format", description: "Available online or in person, whichever fits your situation." },
      { title: "Confidentiality", description: "What's shared stays private, explained clearly before any real engagement." },
    ],
  },
  cta: {
    heading: "Ready to start with a first conversation?",
    body: "There's no obligation to continue after a first session — it's a chance to see if it feels right.",
    buttonLabel: "Book a Consultation",
  },
};
