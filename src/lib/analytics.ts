export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void;
  }
}
