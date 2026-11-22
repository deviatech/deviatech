import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/lib/analytics.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const blog = "/blog/clinic-website-checklist-private-practice";
const contact = "/contact";
const study = "/case-studies/cvilo-ai-resume-builder";
const unknown = "/blog/user-entered-text";
const consentKey = "deviatech.analytics-consent.v1";
const disableKey = "ga-disable-G-15GFH194BP";
const production = "https://deviatech.com";

function fixture({ origin = production, enabled = true, gate, storageBlocked = false } = {}) {
  const requests = [];
  const cookieWrites = [];
  const storage = new Map();
  const window = {
    location: { origin, search: "?email=real-owner%40example.test", hash: "#private-hash" },
    localStorage: {
      getItem(key) { if (storageBlocked) throw new Error("blocked"); return storage.get(key); },
      setItem(key, value) { if (storageBlocked) throw new Error("blocked"); storage.set(key, value); },
      removeItem(key) { if (storageBlocked) throw new Error("blocked"); storage.delete(key); },
    },
  };
  const document = {
    title: "private page title",
    referrer: "https://example.test/referrer?sensitive=1",
    head: { appendChild: (node) => { if (node.httpEquiv !== "Content-Security-Policy") requests.push(node); } },
    createElement: () => ({}),
    get cookie() { return "_ga=value; _ga_15GFH194BP=fixture; keepsafe=1"; },
    set cookie(value) { cookieWrites.push(value); },
  };
  const exports = {};
  vm.runInNewContext(outputText, {
    exports, window, document,
    async fetch(url, options) {
      requests.push({ url, ...options });
      if (gate) await gate;
      return { ok: true, async json() { return { enabled }; } };
    },
  });
  const snapshot = () => Array.from(window.dataLayer ?? [], (command) => {
    assert.equal(Object.prototype.toString.call(command), "[object Arguments]");
    return Array.from(command);
  });
  const events = () => snapshot().filter((command) => command[0] === "event");
  exports.configureAnalytics([blog, study, contact], ["footer"]);
  return { api: exports, window, requests, cookieWrites, storage, snapshot, events };
}

test("nothing is requested without consent, even when there are events and known routes", async () => {
  const f = fixture();
  f.api.updateAnalyticsPath(blog);
  f.api.trackEvent("email_click", { label: "footer" });
  await f.api.setAnalyticsPreference(null);
  await f.api.setAnalyticsPreference("declined", { persist: true });
  assert.deepEqual(f.requests, []);
  assert.deepEqual(f.events(), []);
  assert.equal(f.storage.get(consentKey), "declined");
});

test("a case study only sends its canonical page view after opt-in", async () => {
  const f = fixture();
  f.api.updateAnalyticsPath(study);
  await f.api.setAnalyticsPreference("declined");
  assert.deepEqual(f.events(), []);
  await f.api.setAnalyticsPreference("accepted");
  f.api.updateAnalyticsPath(study);
  await f.api.setAnalyticsPreference("declined");
  f.api.updateAnalyticsPath(contact);
  assert.deepEqual(f.events().map(([, name, params]) => [name, params.page_location, params.page_referrer]),
    [["page_view", production + study, ""]]);
});

test("a readiness probe is first-party, credential-free, and does not opt in", async () => {
  const f = fixture();
  f.api.updateAnalyticsPath(blog);
  assert.equal(await f.api.readAnalyticsReadiness(), true);
  assert.deepEqual(f.requests, [{ url: "/api/analytics-readiness", cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer" }]);
  assert.deepEqual(f.snapshot(), []);
  await f.api.setAnalyticsPreference("accepted");
  assert.equal(f.requests.length, 2, "reuses the first-party readiness result");
  assert.equal(f.events().length, 1);
});

test("opt-in on a known route, sanitize context and allow only known event parameters", async () => {
  const f = fixture();
  f.api.updateAnalyticsPath(blog);
  await f.api.setAnalyticsPreference("accepted", { persist: true });
  const cmds = f.snapshot();
  assert.deepEqual(cmds[0].slice(0, 2), ["consent", "default"]);
  assert.equal(cmds[0][2].analytics_storage, "denied");
  assert.equal(cmds[1][2].analytics_storage, "granted");
  for (const key of ["ad_storage", "ad_user_data", "ad_personalization"]) {
    assert.equal(cmds[0][2][key], "denied");
    assert.equal(cmds[1][2][key], "denied");
  }
  assert.equal(f.requests[1].referrerPolicy, "no-referrer");
  assert.equal(f.requests[1].src, "https://www.googletagmanager.com/gtag/js?id=G-15GFH194BP");
  assert.equal(f.events()[0][2].page_location, production + blog);
  assert.equal(f.events()[0][2].page_referrer, "");
  f.api.updateAnalyticsPath(blog);
  f.api.trackEvent("email_click", { label: "private label" });
  f.api.trackEvent("email_click", { label: "footer", email: "private@email.test" });
  f.api.trackEvent("form_start", { name: "private form data", location: "?private" });
  f.api.trackEvent("unapproved_event", { name: "private" });
  f.api.updateAnalyticsPath(contact);
  assert.deepEqual(f.events().map((event) => event[1]), ["page_view", "page_view"]);
  assert.equal(f.events().at(-1)[2].page_referrer, production + blog);
  assert.doesNotMatch(JSON.stringify(f.snapshot()), /private page title|private form data|private@email.test|real-owner|#|[?]email|sensitive=1/);
});

test("revocation stops events, clears only Analytics cookies, and can be reversed safely", async () => {
  const f = fixture();
  f.api.updateAnalyticsPath(blog);
  await f.api.setAnalyticsPreference("accepted");
  await f.api.setAnalyticsPreference("declined", { persist: true });
  assert.equal(f.window[disableKey], true);
  f.api.updateAnalyticsPath(contact);
  f.api.trackEvent("form_start");
  assert.equal(f.events().length, 1);
  assert.match(f.cookieWrites[0], /^__Host-ga4-optin=1;/);
  assert.match(f.cookieWrites[1], /^__Host-ga4-optin=; Max-Age=0;/);
  assert.equal(f.cookieWrites.length, 6);
  assert(f.cookieWrites.slice(2).every((cookie) => /^_ga(?:_15GFH194BP)?=; Max-Age=0/.test(cookie)));
  await f.api.setAnalyticsPreference("accepted");
  assert.equal(f.window[disableKey], false);
  assert.equal(f.events().length, 2);
  assert.equal(f.requests.length, 2, "one readiness request and one tag");
});

test("re-granting on the same pathname is not a second page view", async () => {
  const f = fixture();
  f.api.updateAnalyticsPath(blog);
  await f.api.setAnalyticsPreference("accepted");
  await f.api.setAnalyticsPreference("declined");
  f.api.updateAnalyticsPath(blog);
  await f.api.setAnalyticsPreference("accepted");
  assert.equal(f.events().length, 1);
  assert.equal(f.requests.length, 2);
  f.api.updateAnalyticsPath(contact);
  assert.equal(f.events().length, 2);
});

test("unknown routes do not boot tag; leaving allowed route pauses, Back re-enables once", async () => {
  const f = fixture();
  f.api.updateAnalyticsPath(unknown);
  await f.api.setAnalyticsPreference("accepted");
  assert.deepEqual(f.requests, []);
  f.api.updateAnalyticsPath(study);
  await f.api.setAnalyticsPreference("accepted");
  assert.deepEqual(f.events().map((event) => event[1]), ["page_view"]);
  f.api.updateAnalyticsPath(unknown);
  f.api.trackEvent("email_click", { label: "footer" });
  assert.equal(f.window[disableKey], true);
  assert.equal(f.events().length, 1);
  f.api.updateAnalyticsPath(study);
  await f.api.setAnalyticsPreference("accepted");
  f.api.updateAnalyticsPath(study);
  assert.deepEqual(f.events().map((event) => event[1]), ["page_view", "page_view"]);
  assert.equal(f.requests.length, 2);
  assert.doesNotMatch(JSON.stringify(f.snapshot()), /user-entered-text/);
});

test("fail closed on noncanonical preview or false readiness", async () => {
  const preview = fixture({ origin: "https://preview.deviatech.com" });
  preview.api.updateAnalyticsPath(blog);
  await preview.api.setAnalyticsPreference("accepted");
  assert.deepEqual(preview.requests, []);
  const unready = fixture({ enabled: false });
  unready.api.updateAnalyticsPath(blog);
  await unready.api.setAnalyticsPreference("accepted");
  assert.equal(unready.requests.length, 1);
  assert.deepEqual(unready.snapshot(), []);
});

test("revocation and layout exit while readiness is pending cannot boot Google", async () => {
  for (const revoke of [true, false]) {
    let release;
    const f = fixture({ gate: new Promise((resolve) => { release = resolve; }) });
    f.api.updateAnalyticsPath(blog);
    const setting = f.api.setAnalyticsPreference("accepted");
    if (revoke) await f.api.setAnalyticsPreference("declined");
    else f.api.pauseAnalyticsOutsideSite();
    release();
    await setting;
    assert.equal(f.requests.length, 1);
    assert.deepEqual(f.snapshot(), []);
  }
});

test("session choice works when localStorage is unavailable", async () => {
  const f = fixture({ storageBlocked: true });
  f.api.updateAnalyticsPath(blog);
  await f.api.setAnalyticsPreference("accepted", { persist: true });
  assert.equal(f.api.readAnalyticsPreference(), "accepted");
  assert.equal(f.events().length, 1);
});
