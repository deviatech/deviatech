import type { DemoLocale } from "../types";

/**
 * Small, locale-keyed UI microcopy shared across multiple page components
 * (reading time, "learn more" links). Kept out of the per-page content
 * types since it's identical everywhere it appears and isn't specific to
 * any one page's content model — a dedicated map avoids either repeating
 * a two-way ternary per component (which silently misses new locales, as
 * happened here when ur was added) or bloating every content object with
 * fields that never vary by page.
 */
const READING_MINUTES_SUFFIX: Record<DemoLocale, string> = {
  en: "min read",
  fa: "دقیقه مطالعه",
  ur: "منٹ کا مطالعہ",
};

export function readingMinutesLabel(minutes: number, locale: DemoLocale): string {
  return locale === "en" ? `${minutes} ${READING_MINUTES_SUFFIX.en}` : `${minutes} ${READING_MINUTES_SUFFIX[locale]}`;
}

const LEARN_MORE: Record<DemoLocale, string> = {
  en: "Learn more",
  fa: "بیشتر بدانید",
  ur: "مزید جانیں",
};

export function learnMoreLabel(locale: DemoLocale): string {
  return LEARN_MORE[locale];
}

const FILTER_CATEGORY_ARIA: Record<DemoLocale, string> = {
  en: "Filter articles by category",
  fa: "فیلتر دسته‌بندی مقالات",
  ur: "زمرہ کے لحاظ سے مضامین کو فلٹر کریں",
};

export function filterCategoryAriaLabel(locale: DemoLocale): string {
  return FILTER_CATEGORY_ARIA[locale];
}
