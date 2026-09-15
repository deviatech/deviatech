"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DemoLocale, LocaleDictionary } from "../types";
import { equivalentLocalePath } from "../lib/routes";
import { SUPPORTED_LOCALES, LOCALE_META } from "@/lib/locales";
import navStyles from "../styles/luma-nav.module.css";

export default function LocaleSwitch({
  dictionary,
  className,
  /**
   * Explicit target paths per locale, for pages where the current
   * article/entity has a different slug in each locale — pathname-based
   * mapping can't know that. Falls back to equivalentLocalePath()
   * otherwise.
   */
  overridePaths,
}: {
  dictionary: LocaleDictionary;
  className?: string;
  overridePaths?: Partial<Record<DemoLocale, string>>;
}) {
  const pathname = usePathname();
  const otherLocales = SUPPORTED_LOCALES.filter((locale) => locale !== dictionary.locale);

  return (
    <nav aria-label={dictionary.nav.localeSwitchLabel} className={`${navStyles.localeSwitchGroup} ${className ?? ""}`}>
      {otherLocales.map((locale) => (
        <Link
          key={locale}
          href={overridePaths?.[locale] ?? equivalentLocalePath(pathname, locale)}
          className={navStyles.localeSwitch}
          hrefLang={locale}
        >
          {LOCALE_META[locale].label}
        </Link>
      ))}
    </nav>
  );
}
