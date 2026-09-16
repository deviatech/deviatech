import type { ContactPageContent } from "../types";

export const contactEn: ContactPageContent = {
  meta: {
    title: "Contact — Luma Therapy",
    description: "Get in touch with the Luma Therapy demo concept, via DeviaTech.",
  },
  hero: {
    eyebrow: "Contact",
    heading: "Get in touch",
    body: "Have a question about how this works? Send a message and DeviaTech will get back to you.",
  },
  channelsHeading: "Other ways to reach DeviaTech",
  channels: [
    {
      label: "See the DeviaTech therapist website service",
      description: "Learn how DeviaTech builds websites like this one for real practices.",
      href: "/therapist-website-design",
    },
    {
      label: "WhatsApp DeviaTech",
      description: "Message the DeviaTech team directly about this demo.",
      href: "/contact",
    },
  ],
  form: {
    heading: "Send a message",
    fields: {
      fullName: "Full name",
      fullNamePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "What's this about?",
      message: "Message",
      messagePlaceholder: "Write your message here",
    },
    submitLabel: "Send message",
    submittingLabel: "Sending…",
    successTitle: "Message sent",
    successBody: "Thanks for reaching out — DeviaTech will get back to you soon.",
    errorTitle: "Something went wrong",
    errorBody: "Please try again in a moment, or reach out via WhatsApp instead.",
    requiredLabel: "Required",
    validation: {
      required: "This field is required.",
      email: "Please enter a valid email address.",
    },
  },
  faq: {
    heading: "Common questions",
    items: [
      {
        question: "Is this a real therapy practice?",
        answer: "No — Luma Therapy is a fictional concept website built by DeviaTech to demonstrate what a considered therapist website can look like.",
      },
      {
        question: "Can I request a website like this?",
        answer: "Yes — this contact form and the linked DeviaTech page will connect you with the team that builds real practice websites.",
      },
      {
        question: "How quickly will I hear back?",
        answer: "DeviaTech typically responds within one to two business days.",
      },
    ],
  },
  cta: {
    heading: "Prefer to see a live example?",
    body: "Browse the rest of this demo to see the full site in English, Persian, and Urdu.",
    buttonLabel: "Book a Consultation",
  },
};
