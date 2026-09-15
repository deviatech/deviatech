"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LocaleDictionary } from "../types";
import { equivalentLocalePath } from "../lib/routes";
import navStyles from "../styles/luma-nav.module.css";

export default function LocaleSwitch({
  dictionary,
  className,
}: {
  dictionary: LocaleDictionary;
  className?: string;
}) {
  const pathname = usePathname();
  const targetLocale = dictionary.locale === "fa" ? "en" : "fa";
  const targetHref = equivalentLocalePath(pathname, targetLocale);

  return (
    <Link href={targetHref} className={`${navStyles.localeSwitch} ${className ?? ""}`} hrefLang={targetLocale}>
      {dictionary.nav.localeSwitchLabel}
    </Link>
  );
}
