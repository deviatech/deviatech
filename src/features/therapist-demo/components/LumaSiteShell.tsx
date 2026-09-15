import { DM_Sans, Inter, Vazirmatn } from "next/font/google";
import type { ReactNode } from "react";
import type { DemoLocale } from "../types";
import { getDictionary } from "../content/dictionary";
import LumaHeader from "./LumaHeader";
import LumaFooter from "./LumaFooter";
import styles from "../styles/luma.module.css";

const dmSans = DM_Sans({
  variable: "--font-luma-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-luma-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-luma-fa",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
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
      className={`${styles.root} ${dmSans.variable} ${inter.variable} ${vazirmatn.variable}`}
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
