"use client";

import { useEffect } from "react";
import type { TherapistLocale } from "../config";

const SITE_DEFAULT_LANG = "en";

/**
 * Sets document.documentElement.lang for screen readers, spellcheck, and
 * SEO. Intentionally does not touch document.dir: the shared Header/Footer
 * use physical Tailwind utilities (ml-*, justify-between, etc.), not
 * logical properties, so a global dir="rtl" would visually flip them. RTL
 * layout stays scoped to `dir` on the feature wrapper itself.
 *
 * The inline script sets lang synchronously before first paint (avoids a
 * flash of the wrong lang for screen readers / crawlers); the effect's
 * cleanup restores the previous value on client-side navigation away from
 * this route, since Next's router does not remount the shared root layout.
 */
export default function DocumentLocale({ locale }: { locale: TherapistLocale }) {
  useEffect(() => {
    // Not root.lang: the inline script below already overwrote it by the
    // time this effect runs, so capturing "previous" here would just
    // capture our own change. The site's only other lang value is the
    // root layout's static "en", so restore that directly on cleanup.
    document.documentElement.lang = locale;

    return () => {
      document.documentElement.lang = SITE_DEFAULT_LANG;
    };
  }, [locale]);

  const script = `document.documentElement.lang=${JSON.stringify(locale)};`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
