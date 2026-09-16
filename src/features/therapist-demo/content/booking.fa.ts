import type { BookingPageContent } from "../types";

export const bookingFa: BookingPageContent = {
  meta: {
    title: "درخواست جلسه مشاوره — لوما تراپی",
    description: "ارسال درخواست زمان‌بندی برای مجموعه نمایشی لوما تراپی، از طریق DeviaTech.",
  },
  hero: {
    eyebrow: "درخواست جلسه مشاوره",
    heading: "با یک گفتگوی اولیه شروع کنید",
    body: "این فرم یک درخواست زمان‌بندی ارسال می‌کند، نه یک نوبت قطعی — لوما تراپی یک مجموعه مفهومی نمایشی است.",
    demoNotice:
      "این فرم نمایشی صرفاً برای درخواست‌های وب‌سایت و زمان‌بندی است. لطفاً اطلاعات محرمانه یا بالینی وارد نکنید. ارسال این فرم به‌معنای رزرو یک نوبت درمانی واقعی نیست.",
  },
  reassurance: [
    "بدون الزام برای ادامه پس از اولین گفتگو",
    "امکان جلسات آنلاین و حضوری",
    "محرمانه از طراحی تا اجرا",
  ],
  whatsappCta: "در عوض از طریق واتس‌اپ با DeviaTech پیام دهید",
  form: {
    heading: "درخواست جلسه مشاوره",
    fields: {
      fullName: "نام کامل",
      fullNamePlaceholder: "نام شما",
      email: "ایمیل",
      emailPlaceholder: "you@example.com",
      whatsapp: "واتس‌اپ",
      whatsappPlaceholder: "+98 912 000 0000",
      subject: "موضوع",
      subjectPlaceholder: "",
      message: "پیام",
      messagePlaceholder: "",
      serviceInterest: "خدمت مورد نظر",
      serviceInterestOptions: [
        { value: "individual-therapy", label: "درمان فردی" },
        { value: "couples-therapy", label: "زوج‌درمانی" },
        { value: "online-sessions", label: "جلسات آنلاین" },
        { value: "group-sessions", label: "جلسات گروهی" },
        { value: "not-sure", label: "هنوز مطمئن نیستم" },
      ],
      sessionPreference: "آنلاین یا حضوری",
      sessionPreferenceOptions: [
        { value: "online", label: "آنلاین" },
        { value: "in-person", label: "حضوری" },
        { value: "either", label: "هرکدام" },
      ],
      preferredDateRange: "بازه زمانی مورد نظر",
      preferredDateRangePlaceholder: "مثلاً دو هفته آینده",
      preferredTimeOfDay: "زمان ترجیحی روز",
      preferredTimeOfDayOptions: [
        { value: "morning", label: "صبح" },
        { value: "afternoon", label: "بعدازظهر" },
        { value: "evening", label: "عصر" },
        { value: "no-preference", label: "بدون ترجیح خاص" },
      ],
      note: "یادداشت زمان‌بندی",
      notePlaceholder: "هر نکته دیگری که به زمان‌بندی کمک می‌کند (صرفاً غیربالینی)",
    },
    submitLabel: "ارسال درخواست",
    submittingLabel: "در حال ارسال…",
    successTitle: "درخواست ارسال شد",
    successBody: "سپاسگزاریم — تیم DeviaTech برای زمان‌بندی پیگیری خواهد کرد. این یک نوبت واقعی را تأیید نمی‌کند.",
    errorTitle: "مشکلی پیش آمد",
    errorBody: "لطفاً کمی بعد دوباره تلاش کنید، یا از طریق واتس‌اپ پیام دهید.",
    requiredLabel: "الزامی",
    optionalLabel: "اختیاری",
    validation: {
      required: "این فیلد الزامی است.",
      email: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
    },
    formNotice:
      "این فرم نمایشی صرفاً برای درخواست‌های وب‌سایت و زمان‌بندی است. لطفاً اطلاعات محرمانه یا بالینی وارد نکنید. ارسال این فرم به‌معنای رزرو یک نوبت درمانی واقعی نیست.",
  },
};
