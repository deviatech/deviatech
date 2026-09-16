import Link from "next/link";
import type { TherapistLocale } from "../config";
import { therapistLandingConfig } from "../config";
import type { TherapistLandingContent } from "../content/types";

export default function LocaleSwitch({ content }: { content: TherapistLandingContent }) {
  const locales: { id: TherapistLocale; label: string }[] = [
    { id: "en", label: content.localeSwitch.en },
    { id: "fa", label: content.localeSwitch.fa },
    { id: "ur", label: content.localeSwitch.ur },
  ];

  return (
    <nav aria-label={content.localeSwitch.ariaLabel} className="flex items-center gap-1 text-sm">
      {locales.map((locale) => {
        const isCurrent = locale.id === content.locale;
        return (
          <Link
            key={locale.id}
            href={therapistLandingConfig.routes[locale.id]}
            hrefLang={locale.id}
            lang={locale.id}
            aria-current={isCurrent ? "page" : undefined}
            data-ga-event="language_switch_click"
            data-ga-label={locale.id}
            className={`flex min-h-[40px] min-w-[44px] items-center justify-center rounded-[8px] px-3 font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)] ${
              isCurrent
                ? "bg-[var(--tl-primary-soft)] text-[var(--tl-primary)]"
                : "text-[var(--tl-text-muted)] hover:text-[var(--tl-text)]"
            }`}
          >
            {locale.label}
          </Link>
        );
      })}
    </nav>
  );
}
