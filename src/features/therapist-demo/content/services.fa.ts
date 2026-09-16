import type { ServicesPageContent } from "../types";
import { demoImages } from "./images";
import { route } from "../lib/routes";

export const servicesFa: ServicesPageContent = {
  meta: {
    title: "خدمات — لوما تراپی",
    description: "درمان فردی، زوج‌درمانی، جلسات آنلاین و جلسات گروهی — چهار راه برای همکاری با ما.",
  },
  hero: {
    eyebrow: "خدمات",
    heading: "راه‌های همکاری با ما",
    body: "هر مسیر با گفتگویی درباره نیاز شما شروع می‌شود — این‌ها صرفاً نقاط شروع هستند، نه نسخه‌های ثابت.",
  },
  services: [
    {
      id: "individual-therapy",
      title: "درمان فردی",
      description: "جلسات فردی برای اضطراب، استرس، تردید نسبت به خود و گذارهای زندگی — فضایی کاملاً متناسب با شما.",
      href: route("individualTherapy", "fa"),
      image: demoImages.serviceIndividual,
    },
    {
      id: "couples-therapy",
      title: "زوج‌درمانی",
      description: "فضایی پایدار و ساختارمند برای دو نفر تا یکدیگر را روشن‌تر درک کنند و تعارض را متفاوت مدیریت کنند.",
      href: route("couplesTherapy", "fa"),
      image: demoImages.serviceCouples,
    },
    {
      id: "online-sessions",
      title: "جلسات آنلاین",
      description: "همان مراقبت سنجیده، به‌صورت امن از هر جایی که برایتان راحت‌تر است — بدون کاهش کیفیت.",
      href: route("contact", "fa"),
      image: demoImages.serviceOnline,
    },
    {
      id: "group-sessions",
      title: "جلسات گروهی",
      description: "گفتگوهای هدایت‌شده و مشترک برای افرادی با تجربه‌های مشابه، در گروهی کوچک و به‌دقت مدیریت‌شده.",
      href: route("contact", "fa"),
      image: demoImages.serviceGroup,
    },
  ],
  process: {
    heading: "روند کار معمولاً چگونه است",
    body: "یک مسیر ساده و چهارمرحله‌ای — بدون شتاب، بدون نسخه یکسان برای همه.",
    steps: [
      { title: "تماس اولیه", description: "پیامی کوتاه درباره دلیل مراجعه فعلی‌تان ارسال کنید." },
      { title: "اولین گفتگو", description: "یک جلسه معرفی آرام برای بررسی تناسب — بدون هیچ الزامی از هیچ طرف." },
      { title: "یافتن ریتم مناسب", description: "درباره تعداد و شکل جلسات متناسب با زندگی واقعی‌تان توافق کنید." },
      { title: "تنظیم مستمر", description: "جلسات همراه با نیازهای شما تغییر می‌کنند — هیچ‌چیز اینجا ثابت نیست." },
    ],
  },
  cta: {
    heading: "مطمئن نیستید کدام مسیر مناسب است؟",
    body: "یک گفتگوی کوتاه می‌تواند کمک کند نوع مناسب حمایت را روشن‌تر ببینید.",
    buttonLabel: "درخواست جلسه مشاوره",
  },
};
