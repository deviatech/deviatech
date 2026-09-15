import type { AboutContent } from "../types";
import { demoImages } from "./images";

export const aboutEn: AboutContent = {
  meta: {
    title: "About Luma Therapy — Our Approach",
    description: "A considered approach to psychology and relationship therapy, built around listening first.",
  },
  hero: {
    eyebrow: "About Luma Therapy",
    heading: "A thoughtful approach to feeling understood",
    body: "Luma Therapy exists to offer a calm, honest space — one where the pace and focus of the work stay with you, not a fixed program.",
    image: demoImages.aboutHero,
  },
  story: {
    heading: "Our story",
    paragraphs: [
      "Luma Therapy began as a simple idea: that good therapy starts with being genuinely heard, not diagnosed on arrival.",
      "The practice is built around a small set of principles rather than a rigid method — evidence-informed, but never mechanical; structured, but never cold.",
      "Every part of the experience, from the first message to the last session, is designed around one question: does this feel like a space where you can be honest?",
    ],
  },
  howWeWork: {
    heading: "How we work",
    items: [
      { title: "Listening without judgment", description: "Sessions start with your words, not a checklist — understanding comes before any plan." },
      { title: "Evidence-informed practice", description: "Approaches are grounded in established practice, adapted to what actually fits your situation." },
      { title: "Sustainable change", description: "The goal is change that holds up in daily life, not just insight that fades after the session ends." },
    ],
  },
  principles: {
    heading: "Principles that guide the work",
    body: "A few commitments that shape every session, regardless of what brought you in.",
    items: [
      { title: "Confidentiality first", description: "What's shared in a session stays there — clearly explained before any real engagement begins." },
      { title: "Your pace, not a program", description: "Sessions adapt to where you are, rather than following a fixed number of steps." },
      { title: "Clear, plain language", description: "No unnecessary jargon — just a straightforward conversation about what's happening and why." },
    ],
  },
  quote: "Good therapy doesn't start with answers — it starts with being willing to listen first.",
  cta: {
    heading: "Curious if this could work for you?",
    body: "A first conversation is low-pressure and carries no obligation to continue.",
    buttonLabel: "Book a Consultation",
  },
};
