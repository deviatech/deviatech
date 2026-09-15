import type { ServicesPageContent } from "../types";
import { demoImages } from "./images";
import { route } from "../lib/routes";

export const servicesEn: ServicesPageContent = {
  meta: {
    title: "Services — Luma Therapy",
    description: "Individual therapy, couples therapy, online sessions, and group sessions — four ways to work together.",
  },
  hero: {
    eyebrow: "Services",
    heading: "Ways to work together",
    body: "Every path starts with a conversation about what you need — these are simply starting points, not fixed prescriptions.",
  },
  services: [
    {
      id: "individual-therapy",
      title: "Individual Therapy",
      description: "One-to-one sessions for anxiety, stress, self-doubt, and life transitions — a space entirely shaped around you.",
      href: route("individualTherapy", "en"),
      image: demoImages.serviceIndividual,
    },
    {
      id: "couples-therapy",
      title: "Couples Therapy",
      description: "A steady, structured space for two people to understand each other more clearly and navigate conflict differently.",
      href: route("couplesTherapy", "en"),
      image: demoImages.serviceCouples,
    },
    {
      id: "online-sessions",
      title: "Online Sessions",
      description: "The same considered care, delivered securely wherever you feel most comfortable — no compromise on quality.",
      href: route("contact", "en"),
      image: demoImages.serviceOnline,
    },
    {
      id: "group-sessions",
      title: "Group Sessions",
      description: "Shared, guided conversations for people navigating similar experiences, in a small and carefully facilitated group.",
      href: route("contact", "en"),
      image: demoImages.serviceGroup,
    },
  ],
  process: {
    heading: "How the process usually works",
    body: "A simple, four-step journey — never rushed, never one-size-fits-all.",
    steps: [
      { title: "Reach out", description: "Send a short message about what's bringing you to therapy right now." },
      { title: "First conversation", description: "A relaxed introductory session to see if the fit feels right — no obligation either way." },
      { title: "Find a rhythm", description: "Agree on a frequency and format that realistically fits your life." },
      { title: "Keep adjusting", description: "Sessions evolve as your needs do — nothing here is locked in place." },
    ],
  },
  cta: {
    heading: "Not sure which path fits?",
    body: "A short conversation can help clarify what kind of support makes the most sense right now.",
    buttonLabel: "Book a Consultation",
  },
};
