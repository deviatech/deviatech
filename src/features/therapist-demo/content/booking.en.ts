import type { BookingPageContent } from "../types";

export const bookingEn: BookingPageContent = {
  meta: {
    title: "Book a Consultation — Luma Therapy",
    description: "Send a scheduling enquiry for the Luma Therapy demo concept, via DeviaTech.",
  },
  hero: {
    eyebrow: "Book a Consultation",
    heading: "Start with a first conversation",
    body: "This form sends a scheduling enquiry, not a confirmed appointment — Luma Therapy is a fictional demo concept.",
    demoNotice:
      "This demonstration form is for website and scheduling enquiries only. Do not include confidential or clinical information. Submitting this form does not book a real therapy appointment.",
  },
  reassurance: [
    "No obligation to continue after a first conversation",
    "Online and in-person options available",
    "Confidential by design",
  ],
  whatsappCta: "Message DeviaTech on WhatsApp instead",
  form: {
    heading: "Request a consultation",
    fields: {
      fullName: "Full name",
      fullNamePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+1 555 000 0000",
      subject: "Subject",
      subjectPlaceholder: "",
      message: "Message",
      messagePlaceholder: "",
      serviceInterest: "Service of interest",
      serviceInterestOptions: [
        { value: "individual-therapy", label: "Individual Therapy" },
        { value: "couples-therapy", label: "Couples Therapy" },
        { value: "online-sessions", label: "Online Sessions" },
        { value: "group-sessions", label: "Group Sessions" },
        { value: "not-sure", label: "Not sure yet" },
      ],
      sessionPreference: "Online or in person",
      sessionPreferenceOptions: [
        { value: "online", label: "Online" },
        { value: "in-person", label: "In person" },
        { value: "either", label: "Either" },
      ],
      preferredDateRange: "Preferred date range",
      preferredDateRangePlaceholder: "e.g. Next two weeks",
      preferredTimeOfDay: "Preferred time of day",
      preferredTimeOfDayOptions: [
        { value: "morning", label: "Morning" },
        { value: "afternoon", label: "Afternoon" },
        { value: "evening", label: "Evening" },
        { value: "no-preference", label: "No preference" },
      ],
      note: "Scheduling note",
      notePlaceholder: "Anything else that would help with scheduling (non-clinical only)",
    },
    submitLabel: "Send enquiry",
    submittingLabel: "Sending…",
    successTitle: "Enquiry sent",
    successBody: "Thanks — DeviaTech will follow up about scheduling. This does not confirm a real appointment.",
    errorTitle: "Something went wrong",
    errorBody: "Please try again in a moment, or reach out via WhatsApp instead.",
    requiredLabel: "Required",
    optionalLabel: "optional",
    validation: {
      required: "This field is required.",
      email: "Please enter a valid email address.",
    },
    formNotice:
      "This demonstration form is for website and scheduling enquiries only. Do not include confidential or clinical information. Submitting this form does not book a real therapy appointment.",
  },
};
