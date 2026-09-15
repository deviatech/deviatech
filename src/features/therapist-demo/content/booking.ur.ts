import type { BookingPageContent } from "../types";

export const bookingUr: BookingPageContent = {
  meta: {
    title: "مشاورے کی درخواست — لوما تھراپی",
    description: "لوما تھراپی نمونہ تصور کے لیے DeviaTech کے ذریعے شیڈولنگ کی درخواست بھیجیں۔",
  },
  hero: {
    eyebrow: "مشاورے کی درخواست کریں",
    heading: "پہلی گفتگو کے ساتھ شروع کریں",
    body: "یہ فارم ایک شیڈولنگ درخواست بھیجتا ہے، کوئی تصدیق شدہ ملاقات نہیں — لوما تھراپی ایک فرضی نمونہ تصور ہے۔",
    demoNotice:
      "یہ فرض نمائشی فارم صرف ویب سائٹ اور شیڈولنگ کی درخواستوں کے لیے ہے۔ براہِ کرم محرمانہ یا بالینی معلومات شامل نہ کریں۔ یہ فارم جمع کرانے سے کوئی حقیقی معالجاتی ملاقات بک نہیں ہوتی۔",
  },
  reassurance: [
    "پہلی گفتگو کے بعد جاری رکھنے کی کوئی پابندی نہیں",
    "آن لائن اور حضوری اختیارات دستیاب ہیں",
    "محرمیت ڈیزائن کا حصہ ہے",
  ],
  whatsappCta: "اس کے بجائے DeviaTech کو واٹس ایپ پر پیغام دیں",
  form: {
    heading: "مشاورے کی درخواست کریں",
    fields: {
      fullName: "پورا نام",
      fullNamePlaceholder: "آپ کا نام",
      email: "ای میل",
      emailPlaceholder: "you@example.com",
      whatsapp: "واٹس ایپ",
      whatsappPlaceholder: "+1 555 000 0000",
      subject: "موضوع",
      subjectPlaceholder: "",
      message: "پیغام",
      messagePlaceholder: "",
      serviceInterest: "دلچسپی کی خدمت",
      serviceInterestOptions: [
        { value: "individual-therapy", label: "انفرادی معالجت" },
        { value: "couples-therapy", label: "زوجین کی معالجت" },
        { value: "online-sessions", label: "آن لائن سیشنز" },
        { value: "group-sessions", label: "گروپ سیشنز" },
        { value: "not-sure", label: "ابھی یقین نہیں" },
      ],
      sessionPreference: "آن لائن یا حضوری",
      sessionPreferenceOptions: [
        { value: "online", label: "آن لائن" },
        { value: "in-person", label: "حضوری" },
        { value: "either", label: "کوئی بھی" },
      ],
      preferredDateRange: "ترجیحی تاریخ کی حد",
      preferredDateRangePlaceholder: "مثلاً اگلے دو ہفتے",
      preferredTimeOfDay: "دن کا ترجیحی وقت",
      preferredTimeOfDayOptions: [
        { value: "morning", label: "صبح" },
        { value: "afternoon", label: "دوپہر" },
        { value: "evening", label: "شام" },
        { value: "no-preference", label: "کوئی ترجیح نہیں" },
      ],
      note: "شیڈولنگ نوٹ",
      notePlaceholder: "کوئی اور بات جو شیڈولنگ میں مدد دے (صرف غیربالینی)",
    },
    submitLabel: "درخواست بھیجیں",
    submittingLabel: "بھیجا جا رہا ہے…",
    successTitle: "درخواست بھیج دی گئی",
    successBody: "شکریہ — DeviaTech شیڈولنگ کے بارے میں پیروی کرے گا۔ یہ کسی حقیقی ملاقات کی تصدیق نہیں کرتا۔",
    errorTitle: "کچھ غلط ہو گیا",
    errorBody: "براہِ کرم کچھ دیر بعد دوبارہ کوشش کریں، یا اس کے بجائے واٹس ایپ پر رابطہ کریں۔",
    requiredLabel: "لازمی",
    optionalLabel: "اختیاری",
    validation: {
      required: "یہ خانہ لازمی ہے۔",
      email: "براہِ کرم ایک درست ای میل ایڈریس درج کریں۔",
    },
    formNotice:
      "یہ فرض نمائشی فارم صرف ویب سائٹ اور شیڈولنگ کی درخواستوں کے لیے ہے۔ براہِ کرم محرمانہ یا بالینی معلومات شامل نہ کریں۔ یہ فارم جمع کرانے سے کوئی حقیقی معالجاتی ملاقات بک نہیں ہوتی۔",
  },
};
