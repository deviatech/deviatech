import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { canPublishPrivacyPolicy, privacyPolicy } from "@/content/privacy-policy";
import { site } from "@/content/site";

// A separate route group avoids inheriting the marketing site's analytics.
// This local draft intentionally does not create an accessible policy page.
export const metadata: Metadata = {
  title: "Privacy Policy | DeviaTech",
  description: "DeviaTech privacy policy and privacy contact information.",
  alternates: { canonical: `${site.url}/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  if (!canPublishPrivacyPolicy(privacyPolicy)) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 text-ink sm:py-20">
      <Link href="/" className="font-display text-xl font-semibold underline-offset-4 hover:underline">
        DeviaTech
      </Link>
      <h1 className="mt-10 font-display text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 font-body text-sm text-ink-soft">
        Effective date: <time dateTime={privacyPolicy.effectiveDate ?? undefined}>{privacyPolicy.effectiveDate}</time>
      </p>
      <nav aria-label="Privacy policy sections" className="my-10 border-y border-line-grid py-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {privacyPolicy.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-accent-rust underline underline-offset-4">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {privacyPolicy.sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-10 scroll-mt-8">
          <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 font-body leading-8 text-ink-soft">{paragraph}</p>
          ))}
        </section>
      ))}
      <footer className="border-t border-line-grid pt-6 text-sm text-ink-soft">
        <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
      </footer>
    </main>
  );
}
