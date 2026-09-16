import type { ContactPageContent } from "../types";
import { site } from "@/content/site";

export const contactUr: ContactPageContent = {
  meta: {
    title: "رابطہ — لوما تھراپی",
    description: "لوما تھراپی نمونہ تصور سے DeviaTech کے ذریعے رابطہ کریں۔",
  },
  hero: {
    eyebrow: "رابطہ",
    heading: "رابطے میں رہیں",
    body: "اس کے کام کرنے کے طریقے کے بارے میں کوئی سوال ہے؟ ایک پیغام بھیجیں اور DeviaTech آپ سے رابطہ کرے گا۔",
  },
  channelsHeading: "DeviaTech تک پہنچنے کے دوسرے طریقے",
  channels: [
    {
      label: "DeviaTech کی معالج ویب سائٹ سروس دیکھیں",
      description: "جانیں کہ DeviaTech حقیقی پریکٹسز کے لیے اس جیسی ویب سائٹس کیسے بناتا ہے۔",
      href: `${site.url}/ur/therapist-website-design`,
    },
    {
      label: "DeviaTech کو واٹس ایپ کریں",
      description: "اس نمونے کے بارے میں براہِ راست DeviaTech ٹیم کو پیغام دیں۔",
      href: "/contact",
    },
  ],
  form: {
    heading: "پیغام بھیجیں",
    fields: {
      fullName: "پورا نام",
      fullNamePlaceholder: "آپ کا نام",
      email: "ای میل",
      emailPlaceholder: "you@example.com",
      subject: "موضوع",
      subjectPlaceholder: "یہ کس بارے میں ہے؟",
      message: "پیغام",
      messagePlaceholder: "اپنا پیغام یہاں لکھیں",
    },
    submitLabel: "پیغام بھیجیں",
    submittingLabel: "بھیجا جا رہا ہے…",
    successTitle: "پیغام بھیج دیا گیا",
    successBody: "رابطہ کرنے کا شکریہ — DeviaTech جلد آپ سے رابطہ کرے گا۔",
    errorTitle: "کچھ غلط ہو گیا",
    errorBody: "براہِ کرم کچھ دیر بعد دوبارہ کوشش کریں، یا اس کے بجائے واٹس ایپ پر رابطہ کریں۔",
    requiredLabel: "لازمی",
    validation: {
      required: "یہ خانہ لازمی ہے۔",
      email: "براہِ کرم ایک درست ای میل ایڈریس درج کریں۔",
    },
  },
  faq: {
    heading: "عمومی سوالات",
    items: [
      {
        question: "کیا یہ ایک حقیقی معالجاتی پریکٹس ہے؟",
        answer: "نہیں — لوما تھراپی ایک فرضی تصوراتی ویب سائٹ ہے جسے DeviaTech نے یہ دکھانے کے لیے بنایا ہے کہ ایک سوچی سمجھی معالج کی ویب سائٹ کیسی نظر آ سکتی ہے۔",
      },
      {
        question: "کیا میں اس جیسی ویب سائٹ کی درخواست کر سکتا ہوں؟",
        answer: "جی ہاں — یہ رابطہ فارم اور منسلک DeviaTech صفحہ آپ کو اس ٹیم سے جوڑ دے گا جو حقیقی پریکٹس ویب سائٹس بناتی ہے۔",
      },
      {
        question: "مجھے کتنی جلدی جواب ملے گا؟",
        answer: "DeviaTech عام طور پر ایک سے دو کاروباری دنوں کے اندر جواب دیتا ہے۔",
      },
    ],
  },
  cta: {
    heading: "ایک زندہ مثال دیکھنا پسند کریں گے؟",
    body: "مکمل سائٹ کو انگریزی، فارسی اور اردو میں دیکھنے کے لیے اس نمونے کا بقیہ حصہ دیکھیں۔",
    buttonLabel: "مشاورے کی درخواست کریں",
  },
};
