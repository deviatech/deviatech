/** Approved English DeviaTech website privacy notice. */
export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PrivacyPolicy = {
  title: string;
  status: "draft" | "approved";
  effectiveDate: string | null;
  sections: PrivacySection[];
};

export const privacyPolicy: PrivacyPolicy = {
  title: "DeviaTech Website Privacy Notice",
  status: "approved",
  effectiveDate: "2026-11-21",
  sections: [
    {
      "id": "responsible",
      "title": "Who is responsible",
      "paragraphs": [
        "DeviaTech is an independent software development team based in Lahore, Pakistan. Syed Mohammad Hussain Naqvi is responsible for the personal information covered by this notice. Contact us at hello@deviatech.com."
      ]
    },
    {
      "id": "collection",
      "title": "What we collect and why",
      "paragraphs": [
        "When you send an enquiry or request a website preview, we receive the details you choose to provide, such as your name, contact details, and information about your request. Depending on the form, this can include your business role, country, project type, or approximate budget. We use these details to answer your enquiry, prepare the preview or proposal you asked for, and follow up on that request. Our form service uses IP address information to limit repeated submissions and protect the site from abuse. Please do not send patient records or other sensitive information through these forms."
      ]
    },
    {
      "id": "services",
      "title": "Services we use",
      "paragraphs": [
        "Our website, email and hosting providers help us operate the site and receive enquiries. We use Resend to deliver form enquiries by email. If you choose to contact us through WhatsApp, your use of WhatsApp is also subject to its own privacy policy. We may disclose information where required by law."
      ]
    },
    {
      "id": "cookies-and-analytics",
      "title": "Cookies and analytics",
      "paragraphs": [
        "Google Analytics is currently off on this website. If we enable optional analytics, we will explain what it measures and ask before loading it. You will be able to reject optional cookies or change your choice in Cookie settings. Rejecting optional cookies will not prevent you from using the website or contacting us."
      ]
    },
    {
      "id": "retention",
      "title": "How long we keep enquiries",
      "paragraphs": [
        "If an enquiry does not lead to a project, we keep the form details and related correspondence for up to 12 months after our last contact about that enquiry, unless we need to retain specific information for a legal obligation or dispute. We keep project and financial records separately for as long as needed to deliver and administer the work, meet applicable obligations, or handle disputes."
      ]
    },
    {
      "id": "privacy-requests",
      "title": "Your privacy requests",
      "paragraphs": [
        "Email hello@deviatech.com to ask about the information we hold, request a correction, or ask us to delete it. We may ask for enough information to verify that the request is yours. We will tell you the outcome and explain if we need to keep any information."
      ]
    }
  ],
};

export function canPublishPrivacyPolicy(policy: PrivacyPolicy): boolean {
  if (policy.status !== "approved" || !policy.effectiveDate || !/^\d{4}-\d{2}-\d{2}$/.test(policy.effectiveDate)) return false;
  const date = new Date(policy.effectiveDate + "T00:00:00.000Z");
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === policy.effectiveDate &&
    policy.sections.length === 6 &&
    policy.sections.every((section) => section.title.trim() && section.paragraphs.length > 0 &&
      section.paragraphs.every((paragraph) => paragraph.trim()))
  );
}
