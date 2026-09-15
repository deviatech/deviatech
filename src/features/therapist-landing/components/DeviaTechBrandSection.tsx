import type { IconType } from "react-icons";
import { LuPenTool, LuCode2, LuRocket } from "react-icons/lu";
import type { TherapistLandingContent } from "../content/types";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import styles from "../therapistLanding.module.css";

export default function DeviaTechBrandSection({ content }: { content: TherapistLandingContent }) {
  const { brand } = content;

  return (
    <section className={styles.section}>
      <div className={`${styles.container} grid items-center gap-12 lg:grid-cols-[42%_1fr] lg:gap-20`}>
        <div
          className="order-1 aspect-square w-full overflow-hidden rounded-[16px] border border-[var(--tl-border)] bg-[var(--tl-surface)] p-8"
          style={{ boxShadow: "var(--tl-shadow-sm)" }}
        >
          <div className="flex h-full flex-col justify-between">
            <p className="text-lg font-semibold text-[var(--tl-primary)]">DeviaTech</p>
            <ul className="flex flex-col gap-6">
              <BrandStep icon={LuPenTool} label={brand.steps.design} />
              <BrandStep icon={LuCode2} label={brand.steps.development} />
              <BrandStep icon={LuRocket} label={brand.steps.launch} />
            </ul>
          </div>
        </div>

        <div className="order-2 max-w-xl">
          <h2 className={`${styles.balance} text-[clamp(1.875rem,3vw,2.25rem)] font-medium leading-[1.15] text-[var(--tl-text)]`}>
            {brand.heading}
          </h2>
          <p className={`${styles.pretty} mt-4 text-base leading-[1.65] text-[var(--tl-text-body)]`}>{brand.body}</p>
          <p className={`${styles.pretty} mt-4 text-base leading-[1.65] text-[var(--tl-text-body)]`}>{brand.supporting}</p>
          <a
            href={buildWhatsAppLink(content.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-ga-event="therapist_whatsapp_click"
            data-ga-label="brand-section"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[var(--tl-primary)] hover:text-[var(--tl-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)]"
          >
            <WhatsAppIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
            {brand.whatsappCta}
          </a>
        </div>
      </div>
    </section>
  );
}

function BrandStep({ icon: Icon, label }: { icon: IconType; label: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[var(--tl-primary-soft)] text-[var(--tl-primary)]">
        <Icon aria-hidden="true" size={18} />
      </span>
      <span className="text-sm font-medium text-[var(--tl-text)]">{label}</span>
    </li>
  );
}
