import type { ServicesPageContent } from "../types";
import { demoImages } from "./images";
import { route } from "../lib/routes";

export const servicesUr: ServicesPageContent = {
  meta: {
    title: "خدمات — لوما تھراپی",
    description: "انفرادی معالجت، زوجین کی معالجت، آن لائن سیشنز اور گروپ سیشنز — ساتھ کام کرنے کے چار طریقے۔",
  },
  hero: {
    eyebrow: "خدمات",
    heading: "ساتھ کام کرنے کے طریقے",
    body: "ہر راستہ آپ کی ضرورت کے بارے میں گفتگو سے شروع ہوتا ہے — یہ محض نقاطِ آغاز ہیں، مقررہ نسخے نہیں۔",
  },
  services: [
    {
      id: "individual-therapy",
      title: "انفرادی معالجت",
      description: "اضطراب، تناؤ، خود پر تردید اور زندگی کی تبدیلیوں کے لیے انفرادی سیشنز — ایک جگہ جو مکمل طور پر آپ کے مطابق ہے۔",
      href: route("individualTherapy", "ur"),
      image: demoImages.serviceIndividual,
    },
    {
      id: "couples-therapy",
      title: "زوجین کی معالجت",
      description: "دو افراد کے لیے ایک مستحکم، منظم جگہ تاکہ وہ ایک دوسرے کو زیادہ واضح طور پر سمجھیں اور تنازع کو مختلف انداز میں سنبھالیں۔",
      href: route("couplesTherapy", "ur"),
      image: demoImages.serviceCouples,
    },
    {
      id: "online-sessions",
      title: "آن لائن سیشنز",
      description: "وہی سوچی سمجھی نگہداشت، جہاں بھی آپ کو زیادہ راحت محسوس ہو محفوظ طریقے سے فراہم کی جاتی ہے — معیار میں کوئی سمجھوتہ نہیں۔",
      href: route("contact", "ur"),
      image: demoImages.serviceOnline,
    },
    {
      id: "group-sessions",
      title: "گروپ سیشنز",
      description: "ملتے جلتے تجربات سے گزرنے والے افراد کے لیے مشترکہ، رہنمائی شدہ گفتگو، ایک چھوٹے اور احتیاط سے منظم گروپ میں۔",
      href: route("contact", "ur"),
      image: demoImages.serviceGroup,
    },
  ],
  process: {
    heading: "یہ عمل عام طور پر کیسے کام کرتا ہے",
    body: "ایک سادہ، چار مرحلوں کا سفر — کبھی جلدبازی نہیں، کبھی سب کے لیے ایک جیسا نہیں۔",
    steps: [
      { title: "رابطہ کریں", description: "ابھی آپ کو معالجت کی طرف لانے والی وجہ کے بارے میں ایک مختصر پیغام بھیجیں۔" },
      { title: "پہلی گفتگو", description: "یہ دیکھنے کے لیے ایک پرسکون تعارفی سیشن کہ آیا موزونیت درست محسوس ہوتی ہے — کسی بھی طرف سے کوئی پابندی نہیں۔" },
      { title: "ایک ردھم تلاش کریں", description: "ایک ایسی تعدد اور شکل پر اتفاق کریں جو حقیقت میں آپ کی زندگی کے مطابق ہو۔" },
      { title: "مسلسل ایڈجسٹ کرتے رہیں", description: "سیشنز آپ کی ضروریات کے ساتھ تبدیل ہوتے ہیں — یہاں کچھ بھی مقرر نہیں ہے۔" },
    ],
  },
  cta: {
    heading: "یقین نہیں کہ کون سا راستہ موزوں ہے؟",
    body: "ایک مختصر گفتگو یہ واضح کرنے میں مدد دے سکتی ہے کہ ابھی کس قسم کی مدد سب سے زیادہ سمجھ میں آتی ہے۔",
    buttonLabel: "مشاورے کی درخواست کریں",
  },
};
