export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How long does a project actually take?",
    answer:
      "A Shopify store is typically 7-10 days once we've agreed the scope. An MVP runs 3-10 weeks depending on complexity. You'll get a specific timeline in writing before we start, not just a range.",
  },
  {
    question: "Do I need to pay everything up front?",
    answer:
      "No. We work on a deposit plus milestone payments tied to progress you can see — not a single lump sum before anything is built.",
  },
  {
    question: "Who owns the code and the store after launch?",
    answer:
      "You do. Once the final payment clears, you get full ownership — the repository, the Shopify store, all of it. No lock-in.",
  },
  {
    question: "What happens if something breaks after launch?",
    answer:
      "Every project includes a support window after handoff for fixing bugs. Ongoing work beyond that is available separately if you want it.",
  },
  {
    question: "I'm not technical — can I still work with you?",
    answer:
      "Yes, most of our clients aren't. That's exactly why we quote a fixed price up front and explain things in plain language on the discovery call, not engineering jargon.",
  },
];
