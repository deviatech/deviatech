import type { ContactPageContent } from "../types";

export const contactFa: ContactPageContent = {
  meta: {
    title: "تماس با ما — لوما تراپی",
    description: "با مجموعه نمایشی لوما تراپی از طریق DeviaTech در تماس باشید.",
  },
  hero: {
    eyebrow: "تماس با ما",
    heading: "در تماس باشید",
    body: "سؤالی درباره نحوه کار این وب‌سایت دارید؟ پیامی ارسال کنید تا تیم DeviaTech با شما تماس بگیرد.",
  },
  channelsHeading: "راه‌های دیگر تماس با DeviaTech",
  channels: [
    {
      label: "مشاهده خدمات طراحی سایت برای درمانگران در DeviaTech",
      description: "بدانید DeviaTech چگونه وب‌سایت‌هایی مانند این را برای مجموعه‌های واقعی می‌سازد.",
      href: "/fa/therapist-website-design",
    },
    {
      label: "تماس واتس‌اپ با DeviaTech",
      description: "مستقیماً با تیم DeviaTech درباره این نمونه‌کار پیام بدهید.",
      href: "/contact",
    },
  ],
  form: {
    heading: "ارسال پیام",
    fields: {
      fullName: "نام کامل",
      fullNamePlaceholder: "نام شما",
      email: "ایمیل",
      emailPlaceholder: "you@example.com",
      subject: "موضوع",
      subjectPlaceholder: "پیام شما درباره چیست؟",
      message: "پیام",
      messagePlaceholder: "پیام خود را اینجا بنویسید",
    },
    submitLabel: "ارسال پیام",
    submittingLabel: "در حال ارسال…",
    successTitle: "پیام ارسال شد",
    successBody: "از تماس شما سپاسگزاریم — تیم DeviaTech به‌زودی پاسخ خواهد داد.",
    errorTitle: "مشکلی پیش آمد",
    errorBody: "لطفاً کمی بعد دوباره تلاش کنید، یا از طریق واتس‌اپ پیام دهید.",
    requiredLabel: "الزامی",
    validation: {
      required: "این فیلد الزامی است.",
      email: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
    },
  },
  faq: {
    heading: "پرسش‌های متداول",
    items: [
      {
        question: "آیا این یک مجموعه درمانی واقعی است؟",
        answer: "خیر — لوما تراپی یک وب‌سایت مفهومی و نمایشی است که توسط DeviaTech طراحی شده تا نمونه‌ای از یک وب‌سایت حرفه‌ای برای درمانگران را نشان دهد.",
      },
      {
        question: "می‌توانم وب‌سایتی مانند این درخواست دهم؟",
        answer: "بله — همین فرم تماس و لینک صفحه DeviaTech شما را به تیمی که وب‌سایت‌های واقعی برای مجموعه‌ها می‌سازد متصل می‌کند.",
      },
      {
        question: "پاسخ را چقدر سریع دریافت می‌کنم؟",
        answer: "تیم DeviaTech معمولاً ظرف یک تا دو روز کاری پاسخ می‌دهد.",
      },
    ],
  },
  cta: {
    heading: "ترجیح می‌دهید نمونه زنده‌ای ببینید؟",
    body: "بقیه این نمونه‌کار را به زبان‌های انگلیسی، فارسی و اردو مرور کنید.",
    buttonLabel: "درخواست جلسه مشاوره",
  },
};
