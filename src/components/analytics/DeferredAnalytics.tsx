"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  configureAnalytics,
  isAnalyticsHost,
  isAnalyticsPreferenceChange,
  pauseAnalyticsOutsideSite,
  readAnalyticsPreference,
  readAnalyticsReadiness,
  setAnalyticsPreference,
  updateAnalyticsPath,
  type AnalyticsPreference,
} from "@/lib/analytics";

const copy = {
  en: {
    settings: "Cookie settings",
    heading: "Optional cookies",
    message: "With your permission, Google Analytics uses cookies to help us understand how people use this site. You can change your choice in Cookie settings.",
    accept: "Accept optional cookies", decline: "Reject optional cookies", close: "Close cookie settings",
    active: "Analytics allowed", inactive: "Analytics declined",
    unavailable: "Analytics is currently off for this site. You can still change a saved permission.",
  },
  fa: {
    settings: "تنظیمات کوکی",
    heading: "کوکی‌های اختیاری",
    message: "با اجازهٔ شما، گوگل آنالیتیکس از کوکی برای بررسی نحوهٔ استفاده از سایت کمک می‌گیرد. می‌توانید انتخابتان را در تنظیمات کوکی تغییر دهید.",
    accept: "پذیرش کوکی‌های اختیاری", decline: "رد کوکی‌های اختیاری", close: "بستن تنظیمات کوکی",
    active: "آمار بازدید مجاز است", inactive: "آمار بازدید رد شده است",
    unavailable: "آمار بازدید در این سایت فعلاً خاموش است. همچنان می‌توانید اجازهٔ ذخیره‌شده را تغییر دهید.",
  },
  ur: {
    settings: "کوکی کی ترتیبات",
    heading: "اختیاری کوکیاں",
    message: "آپ کی اجازت سے گوگل اینالیٹکس کوکیاں استعمال کرتا ہے تاکہ ہم سمجھ سکیں کہ لوگ اس ویب سائٹ کو کیسے استعمال کرتے ہیں۔ آپ کوکی کی ترتیبات میں اپنا انتخاب بدل سکتے ہیں۔",
    accept: "اختیاری کوکیاں قبول کریں", decline: "اختیاری کوکیاں مسترد کریں", close: "کوکی کی ترتیبات بند کریں",
    active: "تجزیات کی اجازت ہے", inactive: "تجزیات مسترد ہیں",
    unavailable: "اس وقت اس ویب سائٹ کے تجزیات بند ہیں۔ آپ محفوظ اجازت اب بھی بدل سکتے ہیں۔",
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
  const [ready, setReady] = useState(false);
  const onKnownPath = pathname !== null && paths.includes(pathname);
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
    if (!onKnownPath || !isAnalyticsHost()) return;
    let observing = true;
    void readAnalyticsReadiness().then((enabled) => {
      if (observing) setReady(enabled);
    });
    return () => { observing = false; };
  }, [onKnownPath]);

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

  const canGrant = ready && onKnownPath;
  if (!available || (!canGrant && preference === null)) return null;

  const visible = editing || (canGrant && preference === null);
  const closeEditor = () => {
    setEditing(false);
    toggleRef.current?.focus();
  };

  const choose = (value: AnalyticsPreference, keyboard: boolean) => {
    if (value === "accepted" && !canGrant) return;
    void setAnalyticsPreference(value, { persist: true });
    setPreference(value);
    if (editing) closeEditor();
    else if (keyboard) document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
  };

  const buttonClass = "min-h-11 rounded-md border border-ink/60 bg-white px-3 py-2 font-body text-sm font-semibold leading-tight text-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

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
          className="fixed inset-x-3 bottom-[max(5.25rem,calc(4.75rem_+_env(safe-area-inset-bottom,0px)))] z-[80] mx-auto grid max-w-5xl gap-3 rounded-xl border border-ink/20 bg-white p-3 text-ink shadow-lg sm:p-4 md:bottom-[max(1rem,env(safe-area-inset-bottom,0px))] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-x-6"
          onKeyDown={(event) => {
            if (editing && event.key === "Escape") closeEditor();
          }}
        >
          <div className="flex items-start gap-2.5">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-amber-800">
              <path d="M21 12.5A9.5 9.5 0 1 1 11.5 3 4 4 0 0 0 15 7a5.5 5.5 0 0 0 6 5.5Z" fill="#fde7bd" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8.5 8.7h.02m-1.6 5.1h.02m4.8 3.2h.02m3.6-3.1h.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="min-w-0">
              <h2 ref={headingRef} tabIndex={-1} id="analytics-preferences-title" className="font-display text-base font-semibold">
                {editing ? text.settings : text.heading}
              </h2>
              <p className="mt-0.5 font-body text-sm leading-5 text-ink/80">{canGrant ? text.message : text.unavailable}</p>
            </div>
          </div>
          <div className={canGrant ? "grid grid-cols-2 items-stretch gap-2" : "flex flex-wrap items-center gap-2"}>
            {canGrant && (
              <button className={buttonClass} type="button" onClick={(event) => choose("accepted", event.detail === 0)}>{text.accept}</button>
            )}
            {(canGrant || preference === "accepted") && (
              <button className={buttonClass} type="button" onClick={(event) => choose("declined", event.detail === 0)}>{text.decline}</button>
            )}
            {editing && preference !== null && (
              <button className={canGrant ? "col-span-2 min-h-11 justify-self-center px-3 py-2 font-body text-sm text-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" : buttonClass} type="button" onClick={closeEditor}>{text.close}</button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
