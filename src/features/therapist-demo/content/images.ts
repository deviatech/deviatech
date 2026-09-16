import type { ImageDescriptor } from "../types";

/**
 * Centralized image descriptors for the Luma Therapy demo. `placeholder: true`
 * marks entries with no real asset yet (see individualHero below); every
 * other entry points at an optimized WebP in public/images/therapist-demo/.
 * No layout code needs to change when swapping `src` here since every
 * consumer reads from this registry via DemoImage.
 */
export const demoImages = {
  homeHero: {
    src: "/images/therapist-demo/home-hero-practice.webp",
    width: 4,
    height: 5,
    alt: {
      en: "A professional woman seated in a softly lit office.",
      fa: "زنی با پوشش حرفه‌ای در دفتری با نور ملایم نشسته است.",
      ur: "پیشہ ورانہ لباس میں ایک خاتون نرم روشنی والے دفتر میں بیٹھی ہیں۔",
    },
    placeholder: false,
  },
  homeListening: {
    src: "/images/therapist-demo/home-listening-room.webp",
    width: 5,
    height: 6,
    alt: {
      en: "A cozy therapy room with a comfortable chair, soft lighting, and a green plant.",
      fa: "اتاقی دنج برای درمان با صندلی راحت، نور ملایم و یک گیاه سبز.",
      ur: "ایک آرام دہ کرسی، نرم روشنی اور ایک سبز پودے کے ساتھ ایک آرام دہ تھراپی کمرہ۔",
    },
    placeholder: false,
  },
  homeApproachA: {
    src: "/images/therapist-demo/home-approach-a.webp",
    width: 4,
    height: 5,
    alt: {
      en: "Close-up of green leaves with morning dew.",
      fa: "نمای نزدیک از برگ‌های سبز با شبنم صبحگاهی.",
      ur: "صبح کی شبنم کے ساتھ سبز پتوں کا قریبی منظر۔",
    },
    placeholder: false,
  },
  homeApproachB: {
    src: "/images/therapist-demo/home-approach-b.webp",
    width: 4,
    height: 3,
    alt: {
      en: "Hands holding a warm cup of tea.",
      fa: "دست‌هایی در حال نگه داشتن یک فنجان چای گرم.",
      ur: "چائے کا گرم کپ تھامے ہوئے ہاتھ۔",
    },
    placeholder: false,
  },
  serviceIndividual: {
    src: "/images/therapist-demo/service-individual.webp",
    width: 4,
    height: 3,
    alt: {
      en: "A woman seated comfortably in a warm, softly lit office during a one-to-one session.",
      fa: "زنی در دفتری گرم و با نور ملایم در حال نشستن راحت طی یک جلسه فردی.",
      ur: "ایک انفرادی سیشن کے دوران گرم، نرم روشنی والے دفتر میں آرام سے بیٹھی ایک خاتون۔",
    },
    placeholder: false,
  },
  serviceCouples: {
    src: "/images/therapist-demo/service-couples.webp",
    width: 4,
    height: 3,
    alt: {
      en: "Two adults sitting together on a sofa in a bright, calm room.",
      fa: "دو بزرگسال کنار هم روی مبل در اتاقی روشن و آرام نشسته‌اند.",
      ur: "دو بالغ افراد ایک روشن، پرسکون کمرے میں صوفے پر ایک ساتھ بیٹھے ہیں۔",
    },
    placeholder: false,
  },
  serviceOnline: {
    src: "/images/therapist-demo/service-online.webp",
    width: 4,
    height: 3,
    alt: {
      en: "A woman having an online video session on a laptop in a cozy home setting.",
      fa: "زنی در حال جلسه ویدیویی آنلاین با لپ‌تاپ در فضایی خانگی و دنج.",
      ur: "ایک خاتون آرام دہ گھریلو ماحول میں لیپ ٹاپ پر آن لائن ویڈیو سیشن کر رہی ہیں۔",
    },
    placeholder: false,
  },
  serviceGroup: {
    src: "/images/therapist-demo/service-group.webp",
    width: 4,
    height: 3,
    alt: {
      en: "A small group sitting in a circle in a warm, minimalist room.",
      fa: "گروهی کوچک در چیدمانی دایره‌ای در اتاقی گرم و مینیمال نشسته‌اند.",
      ur: "ایک گرم، سادہ کمرے میں دائرے کی شکل میں بیٹھا ایک چھوٹا گروہ۔",
    },
    placeholder: false,
  },
  aboutHero: {
    src: "/images/therapist-demo/about-hero.webp",
    width: 4,
    height: 5,
    alt: {
      en: "A professional woman seated in a softly lit office.",
      fa: "زنی با پوشش حرفه‌ای در دفتری با نور ملایم نشسته است.",
      ur: "پیشہ ورانہ لباس میں ایک خاتون نرم روشنی والے دفتر میں بیٹھی ہیں۔",
    },
    placeholder: false,
  },
  individualHero: {
    src: "/images/therapist-demo/individual-hero.webp",
    width: 4,
    height: 5,
    alt: {
      en: "A person seated in a calm, softly lit consultation room.",
      fa: "فردی در اتاق مشاوره‌ای آرام با نور ملایم نشسته است.",
      ur: "ایک شخص نرم روشنی والے پُرسکون مشاورتی کمرے میں بیٹھا ہے۔",
    },
    placeholder: true,
  },
  individualOutcomeA: {
    src: "/images/therapist-demo/individual-outcome-a.webp",
    width: 4,
    height: 5,
    alt: {
      en: "Notebook and pen resting beside a cup of tea.",
      fa: "دفترچه و خودکار کنار یک فنجان چای.",
      ur: "چائے کے کپ کے ساتھ رکھی نوٹ بک اور قلم۔",
    },
    placeholder: false,
  },
  individualOutcomeB: {
    src: "/images/therapist-demo/individual-outcome-b.webp",
    width: 4,
    height: 3,
    alt: {
      en: "Two chairs facing each other in a warm, minimalist room.",
      fa: "دو صندلی رو به هم در اتاقی گرم و مینیمال.",
      ur: "ایک گرم، سادہ کمرے میں ایک دوسرے کے سامنے دو کرسیاں۔",
    },
    placeholder: false,
  },
  couplesHero: {
    src: "/images/therapist-demo/couples-hero.webp",
    width: 4,
    height: 5,
    alt: {
      en: "Two adults sitting together on a sofa, warm and relaxed.",
      fa: "دو بزرگسال کنار هم روی مبل، گرم و آرام.",
      ur: "دو بالغ افراد صوفے پر ایک ساتھ، پرسکون اور آرام دہ انداز میں بیٹھے ہیں۔",
    },
    placeholder: false,
  },
  couplesOutcomeA: {
    src: "/images/therapist-demo/couples-outcome-a.webp",
    width: 4,
    height: 5,
    alt: {
      en: "Two people's hands gently touching on a table.",
      fa: "دست‌های دو نفر که به آرامی روی میز به هم می‌رسند.",
      ur: "میز پر آہستگی سے چھوتے ہوئے دو افراد کے ہاتھ۔",
    },
    placeholder: false,
  },
  couplesOutcomeB: {
    src: "/images/therapist-demo/couples-outcome-b.webp",
    width: 4,
    height: 3,
    alt: {
      en: "Two chairs facing each other in a warm, minimalist room.",
      fa: "دو صندلی رو به هم در اتاقی گرم و مینیمال.",
      ur: "ایک گرم، سادہ کمرے میں ایک دوسرے کے سامنے دو کرسیاں۔",
    },
    placeholder: false,
  },
  blogHero: {
    src: "/images/therapist-demo/blog-featured.webp",
    width: 16,
    height: 9,
    alt: {
      en: "Calm ocean waves at sunset, peaceful horizon.",
      fa: "امواج آرام دریا در غروب، افقی آرامش‌بخش.",
      ur: "غروب آفتاب کے وقت پرسکون سمندری لہریں، پرامن افق۔",
    },
    placeholder: false,
  },
} as const satisfies Record<string, ImageDescriptor>;
