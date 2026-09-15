import type { LocaleDictionary } from "../types";
import { demoRoutes } from "../lib/routes";

export const en: LocaleDictionary = {
  locale: "en",
  dir: "ltr",
  meta: { titleSuffix: "Luma Therapy — DeviaTech Demo" },
  nav: {
    links: [
      { label: "Home", href: demoRoutes.home.en },
      { label: "About", href: demoRoutes.about.en },
      { label: "Services", href: demoRoutes.services.en },
      { label: "Blog", href: demoRoutes.blog.en },
      { label: "Contact", href: demoRoutes.contact.en },
    ],
    cta: "Book a Consultation",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    localeSwitchLabel: "فارسی",
  },
  footer: {
    brandBlurb:
      "Luma Therapy is a fictional psychology and relationship-therapy practice, created by DeviaTech to demonstrate what a considered therapist website can look like.",
    linksHeading: "Explore",
    links: [
      { label: "About", href: demoRoutes.about.en },
      { label: "Services", href: demoRoutes.services.en },
      { label: "Blog", href: demoRoutes.blog.en },
      { label: "Contact", href: demoRoutes.contact.en },
      { label: "Book a Consultation", href: demoRoutes.book.en },
    ],
    contactHeading: "DeviaTech",
    contactCta: "Want a website like this for your own practice?",
    conceptNotice:
      "Concept website by DeviaTech. Luma Therapy is a fictional practice created for demonstration purposes.",
    deviatechLinkLabel: "See the DeviaTech therapist website design service",
    deviatechLinkHref: "/therapist-website-design",
  },
  conceptNotice:
    "Concept website by DeviaTech. Luma Therapy is a fictional practice created for demonstration purposes.",
  skipLinkLabel: "Skip to main content",
  breadcrumbHomeLabel: "Home",
};

export const fa: LocaleDictionary = {
  locale: "fa",
  dir: "rtl",
  meta: { titleSuffix: "لوما تراپی — نمونه‌کار DeviaTech" },
  nav: {
    links: [
      { label: "خانه", href: demoRoutes.home.fa },
      { label: "درباره ما", href: demoRoutes.about.fa },
      { label: "خدمات", href: demoRoutes.services.fa },
      { label: "مقالات", href: demoRoutes.blog.fa },
      { label: "تماس با ما", href: demoRoutes.contact.fa },
    ],
    cta: "درخواست جلسه مشاوره",
    menuOpenLabel: "باز کردن منو",
    menuCloseLabel: "بستن منو",
    localeSwitchLabel: "English",
  },
  footer: {
    brandBlurb:
      "لوما تراپی یک مجموعه نمایشی روان‌شناسی و زوج‌درمانی است که توسط DeviaTech طراحی شده تا نمونه‌ای از یک وب‌سایت حرفه‌ای برای درمانگران را نشان دهد.",
    linksHeading: "دسترسی سریع",
    links: [
      { label: "درباره ما", href: demoRoutes.about.fa },
      { label: "خدمات", href: demoRoutes.services.fa },
      { label: "مقالات", href: demoRoutes.blog.fa },
      { label: "تماس با ما", href: demoRoutes.contact.fa },
      { label: "درخواست جلسه مشاوره", href: demoRoutes.book.fa },
    ],
    contactHeading: "DeviaTech",
    contactCta: "می‌خواهید چنین وب‌سایتی برای مجموعه خودتان داشته باشید؟",
    conceptNotice:
      "وب‌سایت مفهومی طراحی‌شده توسط DeviaTech؛ لوما تراپی یک مجموعه نمایشی است و فعالیت درمانی واقعی ندارد.",
    deviatechLinkLabel: "مشاهده خدمات طراحی سایت برای درمانگران در DeviaTech",
    deviatechLinkHref: "/fa/therapist-website-design",
  },
  conceptNotice:
    "وب‌سایت مفهومی طراحی‌شده توسط DeviaTech؛ لوما تراپی یک مجموعه نمایشی است و فعالیت درمانی واقعی ندارد.",
  skipLinkLabel: "رفتن به محتوای اصلی",
  breadcrumbHomeLabel: "خانه",
};

export function getDictionary(locale: "en" | "fa"): LocaleDictionary {
  return locale === "fa" ? fa : en;
}
