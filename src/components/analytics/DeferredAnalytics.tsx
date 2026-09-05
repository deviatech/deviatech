"use client";

import { useEffect } from "react";

const GA_ID = "G-15GFH194BP";

export default function DeferredAnalytics() {
  useEffect(() => {
    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag?.("js", new Date());
      window.gtag?.("config", GA_ID);

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
      removeListeners();
    };

    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll"];
    const removeListeners = () => {
      events.forEach((event) => window.removeEventListener(event, loadAnalytics));
    };

    events.forEach((event) =>
      window.addEventListener(event, loadAnalytics, { passive: true, once: true })
    );

    return removeListeners;
  }, []);

  return null;
}
