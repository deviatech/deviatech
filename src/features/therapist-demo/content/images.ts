import type { ImageDescriptor } from "../types";

/**
 * Centralized image descriptors for the Luma Therapy demo. Every entry is
 * currently a tracked placeholder (placeholder: true) — no licensed
 * photography has been supplied yet. Swap `src`/`placeholder` here once real
 * assets land in public/images/therapist-demo/; no layout code needs to
 * change since every consumer reads from this registry.
 *
 * TODO(licensed-images): source or commission photography matching each
 * description below (sunlit rooms, calm editorial tone, no gradients).
 */
export const demoImages = {
  homeHero: {
    src: "/images/therapist-demo/home-hero-practice.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "A sunlit, softly furnished therapy room with two chairs and a small plant.",
      fa: "اتاقی آفتاب‌گیر و آرام با دو صندلی و یک گیاه کوچک.",
      ur: "دو کرسیوں اور ایک چھوٹے پودے کے ساتھ ایک دھوپ سے بھرا، نرم انداز میں سجا ہوا معالجاتی کمرہ۔",
    },
    placeholder: true,
  },
  homeListening: {
    src: "/images/therapist-demo/home-listening-room.jpg",
    width: 5,
    height: 6,
    alt: {
      en: "An empty armchair beside a window, warm natural light.",
      fa: "صندلی راحتی کنار پنجره با نور طبیعی گرم.",
      ur: "کھڑکی کے پاس ایک خالی آرام دہ کرسی، گرم قدرتی روشنی۔",
    },
    placeholder: true,
  },
  homeApproachA: {
    src: "/images/therapist-demo/home-approach-a.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "Linen textured cushions on a reading chair.",
      fa: "بالش‌های پارچه‌ای روی یک صندلی مطالعه.",
      ur: "مطالعے کی کرسی پر لینن کے بنے ہوئے کشن۔",
    },
    placeholder: true,
  },
  homeApproachB: {
    src: "/images/therapist-demo/home-approach-b.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "A cup of tea resting on a wooden side table.",
      fa: "یک فنجان چای روی میز چوبی کوچک.",
      ur: "لکڑی کی چھوٹی میز پر چائے کا ایک کپ۔",
    },
    placeholder: true,
  },
  serviceIndividual: {
    src: "/images/therapist-demo/service-individual.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "A single calm chair facing a bright window.",
      fa: "یک صندلی آرام رو به پنجره‌ای روشن.",
      ur: "ایک روشن کھڑکی کے سامنے ایک پرسکون کرسی۔",
    },
    placeholder: true,
  },
  serviceCouples: {
    src: "/images/therapist-demo/service-couples.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "Two chairs angled toward each other in a quiet room.",
      fa: "دو صندلی رو به هم در فضایی آرام.",
      ur: "ایک پرسکون کمرے میں ایک دوسرے کی طرف رخ کیے دو کرسیاں۔",
    },
    placeholder: true,
  },
  serviceOnline: {
    src: "/images/therapist-demo/service-online.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "A laptop open on a desk beside a small plant.",
      fa: "لپ‌تاپ باز روی میز کنار یک گیاه کوچک.",
      ur: "ایک چھوٹے پودے کے ساتھ میز پر کھلا ہوا لیپ ٹاپ۔",
    },
    placeholder: true,
  },
  serviceGroup: {
    src: "/images/therapist-demo/service-group.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "A circle of chairs arranged in a bright room.",
      fa: "چیدمان دایره‌ای صندلی‌ها در اتاقی روشن.",
      ur: "ایک روشن کمرے میں دائرے کی شکل میں ترتیب دی گئی کرسیاں۔",
    },
    placeholder: true,
  },
  aboutHero: {
    src: "/images/therapist-demo/about-hero.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "A calm consulting room with soft daylight.",
      fa: "اتاق مشاوره‌ای آرام با نور روز ملایم.",
      ur: "نرم دن کی روشنی کے ساتھ ایک پرسکون مشاورتی کمرہ۔",
    },
    placeholder: true,
  },
  individualHero: {
    src: "/images/therapist-demo/individual-hero.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "A sunlit room prepared for a one-to-one session.",
      fa: "اتاقی آفتاب‌گیر آماده برای جلسه فردی.",
      ur: "انفرادی سیشن کے لیے تیار ایک دھوپ سے بھرا کمرہ۔",
    },
    placeholder: true,
  },
  individualOutcomeA: {
    src: "/images/therapist-demo/individual-outcome-a.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "Notebook and pen resting on a linen chair.",
      fa: "دفترچه و خودکار روی صندلی پارچه‌ای.",
      ur: "لینن کرسی پر رکھی نوٹ بک اور قلم۔",
    },
    placeholder: true,
  },
  individualOutcomeB: {
    src: "/images/therapist-demo/individual-outcome-b.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "Soft daylight through a linen curtain.",
      fa: "نور ملایم روز از پشت پرده‌ای کتانی.",
      ur: "لینن کے پردے سے چھنتی نرم دن کی روشنی۔",
    },
    placeholder: true,
  },
  couplesHero: {
    src: "/images/therapist-demo/couples-hero.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "Two chairs facing each other in a warm-lit room.",
      fa: "دو صندلی رو به هم در اتاقی با نور گرم.",
      ur: "گرم روشنی والے کمرے میں ایک دوسرے کے سامنے دو کرسیاں۔",
    },
    placeholder: true,
  },
  couplesOutcomeA: {
    src: "/images/therapist-demo/couples-outcome-a.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "Two cups of tea on a shared table.",
      fa: "دو فنجان چای روی میزی مشترک.",
      ur: "مشترکہ میز پر چائے کے دو کپ۔",
    },
    placeholder: true,
  },
  couplesOutcomeB: {
    src: "/images/therapist-demo/couples-outcome-b.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "A quiet corner with two seats and soft light.",
      fa: "گوشه‌ای آرام با دو صندلی و نور ملایم.",
      ur: "دو نشستوں اور نرم روشنی کے ساتھ ایک پرسکون کونا۔",
    },
    placeholder: true,
  },
  blogHero: {
    src: "/images/therapist-demo/blog-featured.jpg",
    width: 16,
    height: 9,
    alt: {
      en: "An open notebook beside a warm cup of tea.",
      fa: "دفترچه‌ای باز کنار فنجان چای گرم.",
      ur: "چائے کے گرم کپ کے ساتھ ایک کھلی نوٹ بک۔",
    },
    placeholder: true,
  },
  contactHero: {
    src: "/images/therapist-demo/contact-room.jpg",
    width: 4,
    height: 3,
    alt: {
      en: "A welcoming waiting area with natural light.",
      fa: "فضای انتظاری دلنشین با نور طبیعی.",
      ur: "قدرتی روشنی کے ساتھ ایک خوش آئند انتظار گاہ۔",
    },
    placeholder: true,
  },
  bookingHero: {
    src: "/images/therapist-demo/booking-room.jpg",
    width: 4,
    height: 5,
    alt: {
      en: "A calm room prepared for a first conversation.",
      fa: "اتاقی آرام آماده برای اولین گفتگو.",
      ur: "پہلی گفتگو کے لیے تیار ایک پرسکون کمرہ۔",
    },
    placeholder: true,
  },
} as const satisfies Record<string, ImageDescriptor>;
