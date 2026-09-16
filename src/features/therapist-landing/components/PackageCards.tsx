import { LuCheck } from "react-icons/lu";
import type { TherapistLandingContent } from "../content/types";
import SectionHeading from "./SectionHeading";
import { TlLinkButton } from "./TlButton";
import styles from "../therapistLanding.module.css";

export default function PackageCards({ content }: { content: TherapistLandingContent }) {
  const { packages } = content;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading heading={packages.heading} body={packages.body} align="center" />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {packages.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex min-w-0 flex-col rounded-[16px] border bg-[var(--tl-surface)] p-6 md:p-7 ${
                pkg.recommended ? "border-2 border-[var(--tl-primary)]" : "border-[var(--tl-border)]"
              }`}
              style={{ boxShadow: "var(--tl-shadow-sm)" }}
            >
              {pkg.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--tl-primary)] px-3 py-1 text-xs font-semibold text-white rtl:translate-x-1/2">
                  {packages.recommendedLabel}
                </span>
              )}
              <h3 className="text-lg font-semibold text-[var(--tl-text)]">{pkg.name}</h3>
              <p className="mt-1 text-sm font-medium text-[var(--tl-primary)]">{pkg.timeline}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--tl-text-body)]">{pkg.description}</p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[var(--tl-text-body)]">
                    <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <TlLinkButton
                href="#preview-request-form"
                variant={pkg.recommended ? "primary" : "secondary"}
                data-ga-event="package_cta_click"
                data-ga-label={pkg.id}
                className="mt-7 w-full"
              >
                {packages.cta}
              </TlLinkButton>
            </div>
          ))}
        </div>

        <p className={`${styles.pretty} mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-[var(--tl-text-muted)]`}>
          {packages.note}
        </p>
      </div>
    </section>
  );
}
