"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  configureAnalytics,
  isAnalyticsHost,
  isAnalyticsPreferenceChange,
  pauseAnalyticsOutsideSite,
  readAnalyticsPreference,
  setAnalyticsPreference,
  updateAnalyticsPath,
  type AnalyticsPreference,
} from "@/lib/analytics";

const copy = {
  en: {
    settings: "Analytics preferences",
    message: "With your permission, Google Analytics helps us understand which pages people use. It is optional and never used for advertising.",
    accept: "Allow analytics", decline: "Decline analytics", close: "Close preferences",
    active: "Analytics allowed", inactive: "Analytics declined",
  },
  fa: {
    settings: "تنظیمات آمار بازدید",
    message: "با اجازهٔ شما، از گوگل آنالیتیکس برای شناخت صفحه‌های پربازدید استفاده می‌کنیم. این گزینه اختیاری است و برای تبلیغات استفاده نمی‌شود.",
    accept: "اجازه به آمار بازدید", decline: "رد آمار بازدید", close: "بستن تنظیمات",
    active: "آمار بازدید مجاز است", inactive: "آمار بازدید رد شده است",
  },
  ur: {
    settings: "تجزیاتی ترجیحات",
    message: "آپ کی اجازت سے گوگل اینالیٹکس یہ سمجھنے میں مدد دیتا ہے کہ کون سے صفحات دیکھے جاتے ہیں۔ یہ اختیاری ہے اور اشتہارات کے لیے استعمال نہیں ہوتا۔",
    accept: "تجزیات کی اجازت دیں", decline: "تجزیات مسترد کریں", close: "ترجیحات بند کریں",
    active: "تجزیات کی اجازت ہے", inactive: "تجزیات مسترد ہیں",
  },
};

export default function DeferredAnalytics({
  paths,
  labels,
}: {
  paths: readonly string[];
  labels: readonly string[];
}) {
  const pathname = usePathname();
  const [available, setAvailable] = useState(false);
  const [preference, setPreference] = useState<AnalyticsPreference>(null);
  const [editing, setEditing] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const locale = pathname?.startsWith("/fa/") ? "fa" : pathname?.startsWith("/ur/") ? "ur" : "en";
  const text = copy[locale];

  useEffect(() => {
    if (!isAnalyticsHost()) return;
    configureAnalytics(paths, labels);
    updateAnalyticsPath(pathname);
  }, [paths, labels, pathname]);

  useEffect(() => {
    if (!isAnalyticsHost()) return;
    const sync = () => {
      const value = readAnalyticsPreference();
      setPreference(value);
      void setAnalyticsPreference(value);
    };
    const onStorage = (event: StorageEvent) => {
      if (isAnalyticsPreferenceChange(event)) sync();
    };
    setAvailable(true);
    sync();
    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", sync);
      pauseAnalyticsOutsideSite();
    };
  }, []);

  useEffect(() => {
    if (editing) headingRef.current?.focus();
  }, [editing]);

  if (!available) return null;

  const visible = editing || preference === null;
  const closeEditor = () => {
    setEditing(false);
    toggleRef.current?.focus();
  };

  const choose = (value: AnalyticsPreference, keyboard: boolean) => {
    void setAnalyticsPreference(value, { persist: true });
    setPreference(value);
    if (editing) closeEditor();
    else if (keyboard) document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
  };

  const buttonClass = "min-h-11 flex-1 rounded-md border border-ink px-3 py-2 font-body text-sm font-semibold text-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <div lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <button
        ref={toggleRef}
        type="button"
        className="cursor-pointer underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
        aria-expanded={visible}
        aria-controls={visible ? "analytics-preferences" : undefined}
        onClick={() => visible && editing ? closeEditor() : setEditing(true)}
      >
        {text.settings}
      </button>
      <span className="sr-only" role="status">
        {preference === "accepted" ? text.active : preference === "declined" ? text.inactive : ""}
      </span>
      {visible && (
        <section
          id="analytics-preferences"
          aria-labelledby="analytics-preferences-title"
          className="fixed bottom-20 left-3 right-3 z-[80] max-w-sm rounded-lg border border-ink/20 bg-white p-4 text-ink shadow-lg sm:right-auto sm:left-6 sm:bottom-6"
          onKeyDown={(event) => {
            if (editing && event.key === "Escape") closeEditor();
          }}
        >
          <h2 ref={headingRef} tabIndex={-1} id="analytics-preferences-title" className="font-display text-base font-semibold">
            {text.settings}
          </h2>
          <p className="mt-1 font-body text-sm leading-5">{text.message}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={(event) => choose("accepted", event.detail === 0)}>{text.accept}</button>
            <button className={buttonClass} type="button" onClick={(event) => choose("declined", event.detail === 0)}>{text.decline}</button>
            {editing && preference !== null && (
              <button className={buttonClass} type="button" onClick={closeEditor}>{text.close}</button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
