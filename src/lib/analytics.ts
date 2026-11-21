const GA_ID = "G-15GFH194BP";
const ORIGIN = "https://deviatech.com";
const PREFERENCE_KEY = "deviatech.analytics-consent.v1";
const SCRIPT_ID = "deviatech-ga4";
const ADS_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export type AnalyticsPreference = "accepted" | "declined" | null;
type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    "ga-disable-G-15GFH194BP"?: boolean;
  }
}

let preference: AnalyticsPreference = null;
let active = false;
let inSite = false;
let initialized = false;
let readinessRequest: Promise<boolean> | undefined;
let safePaths = new Set<string>();
let safeLabels = new Set<string>();
let currentPath: string | null = null;
let lastPath: string | null = null;
let referrer = "";

const clickEvents = new Set([
  "email_click", "phone_click", "whatsapp_click", "dobatalk_click",
  "service_cta_click", "concept_demo_click", "therapist_whatsapp_click",
  "language_switch_click", "free_preview_cta_click", "package_cta_click",
]);
const contactEvents = new Set(["form_start", "form_submit", "consultation_booked"]);
const previewEvents = new Set(["lead_form_start", "lead_form_submit", "lead_form_error"]);

export function isAnalyticsHost() {
  return typeof window !== "undefined" && window.location.origin === ORIGIN;
}

export function configureAnalytics(paths: readonly string[], labels: readonly string[]) {
  inSite = true;
  safePaths = new Set(paths);
  safeLabels = new Set(labels);
}

export function readAnalyticsPreference(): AnalyticsPreference {
  try {
    const value = window.localStorage.getItem(PREFERENCE_KEY);
    if (value === "accepted" || value === "declined") return value;
  } catch {
    // Storage can be blocked. The choice still applies to this document.
    return preference;
  }
  return null;
}

export function isAnalyticsPreferenceChange(event: StorageEvent) {
  return event.key === PREFERENCE_KEY || event.key === null;
}

function storePreference(value: AnalyticsPreference) {
  try {
    if (value === null) window.localStorage.removeItem(PREFERENCE_KEY);
    else window.localStorage.setItem(PREFERENCE_KEY, value);
  } catch {
    // No storage permission is required to make a choice for this document.
  }
}

function clearAnalyticsCookies() {
  for (const part of document.cookie.split(";")) {
    const name = part.trim().split("=")[0];
    if (name !== "_ga" && name !== "_ga_15GFH194BP") continue;
    const expired = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Lax`;
    document.cookie = expired;
    document.cookie = `${expired}; Domain=deviatech.com`;
  }
}

function grantAnalyticsConsent() {
  window["ga-disable-G-15GFH194BP"] = false;
  window.gtag?.("consent", "update", { ...ADS_DENIED, analytics_storage: "granted" });
}

function pageContext(path: string) {
  return {
    page_location: ORIGIN + path,
    page_referrer: referrer,
    // Do not use document.title: a dynamic or 404 title can reflect user input.
    page_title: path,
  };
}

function reportPageView() {
  if (!active || !currentPath || currentPath === lastPath) return;
  referrer = lastPath ? ORIGIN + lastPath : "";
  lastPath = currentPath;
  const context = pageContext(currentPath);
  // Keep GA-generated engagement events on the sanitized virtual page as well.
  window.gtag?.("config", GA_ID, { ...context, update: true, send_page_view: false });
  window.gtag?.("event", "page_view", { ...context, send_to: GA_ID });
  if (currentPath.startsWith("/case-studies/")) {
    window.gtag?.("event", "case_study_view", {
      ...context,
      case_study: currentPath.slice("/case-studies/".length),
      send_to: GA_ID,
    });
  }
}

export function updateAnalyticsPath(path: string | null) {
  const nextPath = path && safePaths.has(path) ? path : null;
  if (!active && nextPath !== currentPath) lastPath = null;
  currentPath = nextPath;
  if (!currentPath) {
    pauseAnalytics();
    return;
  }
  if (active) reportPageView();
  else if (preference === "accepted") void activateIfReady();
}

function initializeAnalytics(path: string) {
  if (!initialized) {
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // Google's loader expects the gtag command's Arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("consent", "default", { ...ADS_DENIED, analytics_storage: "denied" });
    grantAnalyticsConsent();
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      ...pageContext(path),
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.referrerPolicy = "no-referrer";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  } else {
    grantAnalyticsConsent();
  }
  active = true;
  reportPageView();
}

export function readAnalyticsReadiness() {
  if (!isAnalyticsHost()) return Promise.resolve(false);
  // This first-party capability check sends no credentials, referrer, or GA data.
  readinessRequest ??= fetch("/api/analytics-readiness", {
    cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer",
  })
    .then(async (response) => response.ok && (await response.json())?.enabled === true)
    .catch(() => false);
  return readinessRequest;
}

async function activateIfReady() {
  if (!currentPath || !inSite || active || preference !== "accepted") return;
  if (await readAnalyticsReadiness() && currentPath && inSite && preference === "accepted" && !active) {
    initializeAnalytics(currentPath);
  }
}

function pauseAnalytics(retainCurrentView = false) {
  active = false;
  if (!retainCurrentView) lastPath = null;
  referrer = "";
  window["ga-disable-G-15GFH194BP"] = true;
}

export async function setAnalyticsPreference(
  value: AnalyticsPreference,
  { persist = false }: { persist?: boolean } = {},
) {
  if (!isAnalyticsHost()) return;
  preference = value;
  if (persist) storePreference(value);
  if (value !== "accepted") {
    // A preference change on the current page is not a navigation.
    pauseAnalytics(true);
    window.gtag?.("consent", "update", { ...ADS_DENIED, analytics_storage: "denied" });
    clearAnalyticsCookies();
    return;
  }
  await activateIfReady();
}

export function pauseAnalyticsOutsideSite() {
  inSite = false;
  currentPath = null;
  // Keep the saved choice, but prevent engagement events while on other route groups.
  pauseAnalytics();
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!active || preference !== "accepted" || !currentPath) return;
  const payload: AnalyticsParams = {};
  if (clickEvents.has(name)) {
    if (typeof params.label !== "string" || !safeLabels.has(params.label)) return;
    payload.label = params.label;
  } else if (contactEvents.has(name)) {
    // Intentionally ignore form inputs and caller-supplied location.
  } else if (previewEvents.has(name)) {
    if (params.locale !== "en" && params.locale !== "fa" && params.locale !== "ur") return;
    payload.locale = params.locale;
  } else {
    return;
  }
  window.gtag?.("event", name, {
    ...payload,
    location: currentPath,
    ...pageContext(currentPath),
    send_to: GA_ID,
  });
}
