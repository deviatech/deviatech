import localFont from "next/font/local";
import type { ReactNode } from "react";
import type { DemoLocale } from "../types";
import { getDictionary } from "../content/dictionary";
import LumaHeader from "./LumaHeader";
import LumaFooter from "./LumaFooter";
import styles from "../styles/luma.module.css";

const dmSans = localFont({
  src: "../fonts/dmsans.ttf",
  variable: "--font-luma-display",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-luma-body",
  weight: "100 900",
  display: "swap",
});

const vazirmatn = localFont({
  src: "../fonts/vazirmatn.ttf",
  variable: "--font-luma-fa",
  weight: "100 900",
  display: "swap",
});

const notoSansArabic = localFont({
  src: "../fonts/notosansarabic.ttf",
  variable: "--font-luma-ur",
  weight: "100 900",
  display: "swap",
});

export default function LumaSiteShell({
  locale,
  children,
}: {
  locale: DemoLocale;
  children: ReactNode;
}) {
  const dictionary = getDictionary(locale);

  return (
    <div
      data-luma-site
      data-locale={locale}
      lang={locale}
      dir={dictionary.dir}
      className={`${styles.root} ${dmSans.variable} ${inter.variable} ${vazirmatn.variable} ${notoSansArabic.variable}`}
    >
      <a href="#luma-main-content" className={styles.skipLink}>
        {dictionary.skipLinkLabel}
      </a>
      <LumaHeader dictionary={dictionary} />
      <main id="luma-main-content">{children}</main>
      <LumaFooter dictionary={dictionary} />
    </div>
  );
}
