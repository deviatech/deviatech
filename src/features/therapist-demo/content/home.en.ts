import type { HomeContent } from "../types";
import { demoImages } from "./images";
import { route } from "../lib/routes";

export const homeEn: HomeContent = {
  meta: {
    title: "Luma Therapy — Psychology & Relationship Therapy",
    description:
      "A calm, considered website concept for a psychology and relationship therapy practice — a DeviaTech demo.",
  },
  hero: {
    eyebrow: "Psychology & Relationship Therapy",
    heading: "A calmer path forward can begin here.",
    body: "Luma Therapy is a concept practice for people who want to feel heard, supported, and understood — without judgment, and at a pace that works for them.",
    primaryCta: "Book a Consultation",
    secondaryCta: "Our approach",
    reassurance: "Online and in-person sessions. Confidential by design.",
    image: demoImages.homeHero,
  },
  principles: {
    heading: "What guides this practice",
    items: ["Evidence-informed", "Confidential by design", "Online-friendly", "Inclusive care"],
  },
  listening: {
    eyebrow: "Being heard",
    heading: "A space to be heard without judgment",
    body: "Every conversation starts with listening. Sessions are shaped around what matters to you, not a fixed script — so the pace and focus stay yours to set.",
    items: [
      { title: "Your pace", description: "Sessions move at a pace that feels manageable, not rushed." },
      { title: "Your words", description: "No jargon, no assumptions — just a clear, honest conversation." },
    ],
    image: demoImages.homeListening,
  },
  services: {
    heading: "Ways to work together",
    body: "Four starting points, each shaped around what you need right now.",
    items: [
      {
        id: "individual-therapy",
        title: "Individual Therapy",
        description: "One-to-one sessions for anxiety, stress, self-doubt, and life transitions.",
        href: route("individualTherapy", "en"),
        image: demoImages.serviceIndividual,
      },
      {
        id: "couples-therapy",
        title: "Couples Therapy",
        description: "A steady space for two people to understand each other more clearly.",
        href: route("couplesTherapy", "en"),
        image: demoImages.serviceCouples,
      },
      {
        id: "online-sessions",
        title: "Online Sessions",
        description: "The same considered care, from wherever you feel most comfortable.",
        href: route("contact", "en"),
        image: demoImages.serviceOnline,
      },
      {
        id: "group-sessions",
        title: "Group Sessions",
        description: "Shared, guided conversations for people navigating similar experiences.",
        href: route("contact", "en"),
        image: demoImages.serviceGroup,
      },
    ],
  },
  challenges: {
    heading: "You don't need a crisis to start",
    body: "People come to therapy for all kinds of reasons — big and small.",
    items: [
      "Feeling overwhelmed or stretched thin",
      "Repeating patterns in relationships",
      "Big life changes and decisions",
      "Wanting to understand yourself better",
    ],
  },
  approach: {
    heading: "A human, considered approach",
    body: "Care that's structured without feeling clinical — grounded in listening first.",
    checklist: [
      "Sessions shaped around your goals, not a fixed program",
      "Clear, judgment-free conversation",
      "Practical steps you can carry into daily life",
    ],
    imageA: demoImages.homeApproachA,
    imageB: demoImages.homeApproachB,
  },
  articlesPreview: {
    heading: "From the journal",
    body: "Short, considered reading on therapy, relationships, and everyday emotional wellbeing.",
    viewAllLabel: "View all articles",
  },
  faq: {
    heading: "Common questions",
    items: [
      {
        question: "Is Luma Therapy a real practice?",
        answer:
          "No. Luma Therapy is a fictional concept practice created by DeviaTech to demonstrate what a considered therapist website can look like.",
      },
      {
        question: "What happens in a first session?",
        answer:
          "A first session is usually a relaxed conversation about what brought you to therapy and what you'd like support with — there's no obligation to continue.",
      },
      {
        question: "Are online sessions available?",
        answer: "Yes — sessions can be arranged online or in person, whichever feels more comfortable.",
      },
      {
        question: "Is what I share confidential?",
        answer: "Confidentiality is treated as a foundation of the work, discussed clearly at the outset of any real engagement.",
      },
    ],
  },
  cta: {
    heading: "Ready to take the first step?",
    body: "Book a no-pressure introductory consultation and see if it feels like a good fit.",
    buttonLabel: "Book a Consultation",
  },
};
