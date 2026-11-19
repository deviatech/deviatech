/**
 * LOCAL REVIEW DRAFT. Not approved for publication or use in Meta settings.
 * Every reviewNote must be resolved, and the effective date approved, before
 * status changes to "approved". Do not infer practices from planned OTP code.
 */
export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
  reviewNote?: string;
};

export type PrivacyPolicy = {
  status: "draft" | "approved";
  effectiveDate: string | null;
  sections: PrivacySection[];
};

export const privacyPolicy: PrivacyPolicy = {
  status: "draft",
  effectiveDate: null,
  sections: [
    {
      id: "scope",
      title: "About this notice",
      paragraphs: [
        "DeviaTech is a software development business based in Lahore, Pakistan. This notice explains how information is handled when you visit our website or contact us about our services.",
      ],
      reviewNote: "Confirm the legal operator and address, and approve the exact services covered. This is a general customer-facing policy, not a statement about why a platform requires the page.",
    },
    {
      id: "information",
      title: "Information provided through the website",
      paragraphs: [
        "The website's project enquiry form asks for your name, contact details, project type, approximate budget, preferred contact method, and message.",
        "The therapist website preview form asks for your name, professional role, country, and email. You can also provide a website or social profile, WhatsApp number, and note. The demo enquiry forms can collect contact details and the enquiry or booking-preference fields you choose to submit.",
      ],
      reviewNote: "Confirm these routes are active, the actual purposes and recipients of submissions, and whether other collection methods need to be covered. Form fields alone do not establish every business use.",
    },
    {
      id: "website-services",
      title: "Website services and technical information",
      paragraphs: [
        "The website's contact service is configured to send submitted enquiries by email through Resend. It also reads a client IP address to limit repeated submissions.",
        "The main website includes Google Analytics, which loads after an interaction such as scrolling, typing, or a pointer action. The implementation records website interactions, including selected link clicks and form events.",
        "The website also provides links to contact DeviaTech through WhatsApp.",
      ],
      reviewNote: "Verify the live Resend/mailbox and hosting configuration, actual processing locations and recipients, GA settings/cookies/consent, and any additional processors. The proposed legal route does not inherit the site's analytics components.",
    },
    {
      id: "sharing",
      title: "How information is shared",
      paragraphs: [
        "We do not publish the contact information or message content you submit. Service providers that support the website or deliver your enquiry may process that information as part of their services. This does not prevent disclosures required by applicable law.",
      ],
      reviewNote: "Confirm this wording, the actual recipients, and all uses of customer information. It must not become a claim that data is never shared. There is no DeviaTech OTP backend yet. If OTP is introduced, add only verified processing and provider details; confirm whether any current manual testing already requires disclosure.",
    },
    {
      id: "retention",
      title: "Retention and deletion",
      paragraphs: [],
      reviewNote: "Supply actual retention periods or criteria and deletion procedures for website enquiries, email copies, analytics, logs/backups, and any manual Meta test data. No period has been verified. A code's expiry or a rate-limit interval is not a retention policy.",
    },
    {
      id: "contact",
      title: "Privacy questions and requests",
      paragraphs: [
        "DeviaTech's public business contact email is hello@deviatech.com.",
      ],
      reviewNote: "Approve whether this mailbox will receive privacy, correction, and deletion requests; identify the owner and real handling process. Add rights, verification, exception, and timing language only when applicable and supportable.",
    },
  ],
};

export function canPublishPrivacyPolicy(policy: PrivacyPolicy): boolean {
  return (
    policy.status === "approved" &&
    policy.effectiveDate !== null &&
    /^\d{4}-\d{2}-\d{2}$/.test(policy.effectiveDate) &&
    policy.sections.length > 0 &&
    policy.sections.every(
      (section) => !section.reviewNote && section.paragraphs.length > 0,
    )
  );
}
