export const SUPPORTED_LOCALES = ["en", "fa", "ur"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type Direction = "ltr" | "rtl";

export const LOCALE_META: Record<Locale, { lang: Locale; dir: Direction; label: string }> = {
  en: { lang: "en", dir: "ltr", label: "English" },
  fa: { lang: "fa", dir: "rtl", label: "فارسی" },
  ur: { lang: "ur", dir: "rtl", label: "اردو" },
};

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/**
 * Header middleware sets on every request with the server-computed
 * document locale. The root layout reads it via next/headers to render
 * <html lang/dir> correctly for the therapist-landing and therapist-demo
 * fa/ur routes. Shared here (rather than importing from src/middleware.ts
 * directly) so the root layout doesn't pull in Edge-middleware-only code.
 */
export const LOCALE_HEADER = "x-app-locale";
