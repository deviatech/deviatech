import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright-core";

const production = "https://deviatech.com";
const preview = "https://preview.example.test";
const tag = "https://www.googletagmanager.com/gtag/js?id=G-15GFH194BP";
const local = process.env.LOCAL_ORIGIN ?? "http://127.0.0.1:3017";
const query = "email=private%40example.com&token=private-secret";
const path = "/blog/clinic-website-checklist-private-practice";
const consentKey = "deviatech.analytics-consent.v1";

async function withBrowser({ width, ready }, fn) {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH ?? "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({ viewport: { width, height: 850 }, serviceWorkers: "block" });
  const requests = { tag: 0, gate: 0, external: [] };
  let draining = false;
  const pendingRoutes = new Set();
  const failedRoutes = [];
  const intercept = async (route) => {
    const url = new URL(route.request().url());
    if (url.href === tag) {
      requests.tag++;
      return route.fulfill({ contentType: "application/javascript", body: "window.localGaTagMockLoaded = true;" });
    }
    if (url.origin !== production && url.origin !== preview) {
      requests.external.push(url.origin);
      return route.abort();
    }
    if (url.pathname === "/api/analytics-readiness") {
      requests.gate++;
      return route.fulfill({ json: { enabled: ready } });
    }
    const response = await route.fetch({ url: local + url.pathname + url.search, maxRedirects: 0 });
    return route.fulfill({ response });
  };
  try {
    await context.route("**/*", async (route) => {
      // Keep intercepting through teardown: don't briefly reopen real network access.
      if (draining) {
        await route.abort().catch(() => {}); // The browser can already be closing.
        return;
      }
      const action = intercept(route);
      pendingRoutes.add(action);
      try {
        await action;
      } catch (error) {
        failedRoutes.push(error);
        await route.abort().catch(() => {});
      } finally {
        pendingRoutes.delete(action);
      }
    });
    const page = await context.newPage();
    await fn({ page, context, requests });
  } finally {
    draining = true;
    // Images and the Next router's prefetches can still be running after the
    // last assertion. Wait before disposing the browser's request context.
    await Promise.allSettled(pendingRoutes);
    await browser.close();
  }
  assert.deepEqual(requests.external, [], "unexpected external request attempted");
  if (failedRoutes.length) throw new AggregateError(failedRoutes, "intercepted browser requests failed");
}

async function commands(page) {
  return page.evaluate(() =>
    (window.dataLayer ?? []).map((entry) => ({
      type: Object.prototype.toString.call(entry),
      values: Array.from(entry),
    })),
  );
}

async function pageviews(page, count) {
  await page.waitForFunction((n) => (window.dataLayer ?? []).filter((x) => x[0] === "event" && x[1] === "page_view").length >= n, count);
  const list = await commands(page);
  assert(list.every((entry) => entry.type === "[object Arguments]"));
  const views = list.filter(({ values }) => values[0] === "event" && values[1] === "page_view");
  assert.equal(views.length, count);
  return views.map(({ values }) => values[2]);
}

test("production runtime gate is false by default and not cacheable", async () => {
  const response = await fetch(local + "/api/analytics-readiness");
  assert.equal(response.status, 200);
  assert.equal((await response.json()).enabled, false);
  assert.match(response.headers.get("cache-control"), /no-store/);
});

test("desktop: opt-in, fresh article, Next navigation, exact-once, sanitized payloads, and revocation", async () => {
  await withBrowser({ width: 1280, ready: true }, async ({ page, requests }) => {
    await page.goto(production + path + "?" + query + "#private-fragment", {
      referer: "https://private-origin.example.test/path?name=private-external",
    });
    const allow = page.getByRole("button", { name: "Accept optional cookies" });
    await allow.waitFor();
    const consent = page.getByRole("region", { name: "Optional cookies" });
    const desktopBox = await consent.boundingBox();
    assert(desktopBox && desktopBox.height <= 132 && desktopBox.y + desktopBox.height > 800);
    assert.equal(await consent.locator('svg[aria-hidden="true"]').count(), 1);
    await page.mouse.wheel(0, 300);
    await page.keyboard.press("Tab");
    assert.deepEqual(await commands(page), []);
    assert.equal(requests.tag, 0);
    assert.equal(requests.gate, 1); // first-party eligibility only; no Google traffic
    await allow.click();
    await page.waitForFunction(() => window.localGaTagMockLoaded);
    const [initial] = await pageviews(page, 1);
    assert.equal(initial.page_location, production + path);
    assert.equal(initial.page_referrer, "");
    let list = (await commands(page)).map(({ values }) => values);
    assert.deepEqual(list[0].slice(0, 2), ["consent", "default"]);
    assert.equal(list[0][2].analytics_storage, "denied");
    assert.equal(list[1][2].analytics_storage, "granted");
    for (const key of ["ad_storage", "ad_user_data", "ad_personalization"]) {
      assert.equal(list[0][2][key], "denied");
      assert.equal(list[1][2][key], "denied");
    }
    const boot = list.find(([name, id, params]) => name === "config" && id === "G-15GFH194BP" && !params.update)[2];
    assert.equal(boot.allow_google_signals, false);
    assert.equal(boot.allow_ad_personalization_signals, false);
    assert.equal(boot.send_page_view, false);

    // Next's actual Link proves the layout and tag survive a SPA route change.
    await page.locator("footer").getByRole("link", { name: "Contact", exact: true }).click();
    await page.waitForURL(production + "/contact");
    const views = await pageviews(page, 2);
    assert.equal(views[1].page_referrer, production + path);
    assert.equal(views[1].page_location, production + "/contact");
    await page.evaluate((query) => history.pushState({}, "", "/contact?" + query + "#private-fragment"), query);
    await page.keyboard.press("Tab");
    await pageviews(page, 2);
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("private-form-name");
    list = (await commands(page)).map(({ values }) => values);
    assert(list.every((entry) => entry[0] !== "event" || entry[1] === "page_view"));
    assert.doesNotMatch(JSON.stringify(list), /private-secret|private-fragment|private-form-name|private-origin|private-external|email=/);

    // Query-only history needs no pageview; a Back to the previous actual Next route does.
    await page.goBack();
    await pageviews(page, 2);
    await page.goBack();
    await page.waitForURL((url) => url.pathname === path);
    assert.equal((await pageviews(page, 3)).at(-1).page_location, production + path);
    assert.equal(requests.tag, 1);
    await page.evaluate(() => history.pushState({}, "", "/blog/private-unlisted-slug"));
    await page.waitForFunction(() => window["ga-disable-G-15GFH194BP"] === true);
    await pageviews(page, 3);
    await page.goBack();
    await page.waitForURL((url) => url.pathname === path);
    await pageviews(page, 4);
    assert.equal(requests.tag, 1);

    await page.evaluate(() => { document.cookie = "_ga=fixture; Path=/; Secure"; });
    await page.getByRole("button", { name: "Cookie settings" }).click();
    await page.getByRole("button", { name: "Reject optional cookies" }).click();
    assert.equal(await page.evaluate(() => localStorage.getItem("deviatech.analytics-consent.v1")), "declined");
    assert.equal(await page.evaluate(() => window["ga-disable-G-15GFH194BP"]), true);
    assert.doesNotMatch(await page.evaluate(() => document.cookie), /(?:^|;\s*)_ga=/);
    await page.locator("footer").getByRole("link", { name: "Blog", exact: true }).click();
    await page.waitForURL(production + "/blog");
    await pageviews(page, 4);
    await page.reload();
    await page.getByRole("button", { name: "Cookie settings" }).waitFor();
    assert.deepEqual(await commands(page), []);
    assert.equal(requests.tag, 1);
  });
});

test("mobile: equal visible controls, decline, reload without banner, and re-grant", async () => {
  await withBrowser({ width: 390, ready: true }, async ({ page, context, requests }) => {
    await page.goto(production + path);
    const allow = page.getByRole("button", { name: "Accept optional cookies" });
    const decline = page.getByRole("button", { name: "Reject optional cookies" });
    await allow.waitFor();
    const buttons = await Promise.all([allow.boundingBox(), decline.boundingBox()]);
    assert.equal(buttons[0].width, buttons[1].width);
    for (const button of buttons) assert(button.height >= 44 && button.x >= 0 && button.x + button.width <= 390);
    const consent = page.getByRole("region", { name: "Optional cookies" });
    const consentBox = await consent.boundingBox();
    const whatsApp = page.locator('[data-ga-label="sticky"]');
    const whatsAppBox = await whatsApp.boundingBox();
    assert(consentBox && whatsAppBox && consentBox.y + consentBox.height <= whatsAppBox.y);
    assert.match(await whatsApp.getAttribute("href"), /^https:\/\/wa\.me\//);
    await whatsApp.click({ trial: true }); // no popup or external navigation
    await decline.click();
    assert.equal(await consent.count(), 0);
    await page.reload();
    const settings = page.getByRole("button", { name: "Cookie settings" });
    await settings.waitFor();
    assert.equal(await allow.count(), 0);
    assert.equal(requests.tag, 0);
    await settings.click();
    await allow.click();
    await pageviews(page, 1);
    // The site navigation and real contact form remain actionable; never submit it.
    await page.locator("footer").getByRole("link", { name: "Contact", exact: true }).click();
    await page.waitForURL(production + "/contact");
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("local fixture");
    assert.equal(await page.getByRole("textbox", { name: "Name", exact: true }).inputValue(), "local fixture");
    const second = await context.newPage();
    await second.goto(production + "/blog");
    await pageviews(second, 1); // saved opt-in initializes without visitor interaction
    await settings.click();
    await decline.click();
    await second.waitForFunction(() => window["ga-disable-G-15GFH194BP"] === true);
    assert.equal(requests.tag, 2);
  });
});

test("preview production exclusion and release gate fail closed", async () => {
  await withBrowser({ width: 390, ready: false }, async ({ page, requests }) => {
    await page.goto(preview + path);
    await page.waitForLoadState("networkidle");
    assert.equal(await page.getByRole("button", { name: "Cookie settings" }).count(), 0);
    assert.deepEqual(await commands(page), []);
    assert.equal(requests.gate, 0);
    const gateResponse = page.waitForResponse((response) => response.url().endsWith("/api/analytics-readiness"));
    await page.goto(production + path);
    const gate = await gateResponse;
    const headers = await gate.request().allHeaders();
    assert.equal(headers.referer, undefined);
    await page.waitForLoadState("networkidle");
    const settings = page.getByRole("button", { name: "Cookie settings" });
    const allow = page.getByRole("button", { name: "Accept optional cookies" });
    assert.equal(await settings.count(), 0);
    assert.equal(await allow.count(), 0);
    assert.equal(requests.gate, 1);
    assert.deepEqual(await commands(page), []);
    assert.equal(requests.tag, 0);

    // A stored opt-in remains revocable even when the release gate is off.
    await page.evaluate((key) => localStorage.setItem(key, "accepted"), consentKey);
    await page.reload();
    await settings.click();
    assert.equal(await page.getByRole("region", { name: "Cookie settings" }).getByRole("link", { name: "Privacy notice" }).getAttribute("href"), "/privacy-policy");
    assert.equal(await allow.count(), 0);
    await page.getByRole("button", { name: "Reject optional cookies" }).click();
    assert.equal(await page.evaluate((key) => localStorage.getItem(key), consentKey), "declined");
    assert.deepEqual(await commands(page), []);
    assert.equal(requests.gate, 2);

    await page.goto(production + "/therapist-demo");
    await page.waitForLoadState("networkidle");
    assert.equal(await settings.count(), 0);
    assert.equal(requests.gate, 2);
    assert.equal(requests.tag, 0);
  });
});

for (const [locale, title, allowText, declineText, noticeLabel] of [
  ["fa", "کوکی‌های اختیاری", "پذیرش کوکی‌های اختیاری", "رد کوکی‌های اختیاری", "حریم خصوصی (انگلیسی)"],
  ["ur", "اختیاری کوکیاں", "اختیاری کوکیاں قبول کریں", "اختیاری کوکیاں مسترد کریں", "رازداری کا نوٹس (انگریزی)"],
]) {
  test(`${locale}: localized RTL choices at 320px`, async () => {
    await withBrowser({ width: 320, ready: true }, async ({ page, requests }) => {
      await page.goto(production + `/${locale}/therapist-website-design`);
      const panel = page.getByRole("region", { name: title });
      await panel.waitFor();
      assert.equal(await panel.evaluate((node) => getComputedStyle(node).direction), "rtl");
      assert.equal(await panel.getByRole("link", { name: noticeLabel }).getAttribute("href"), "/privacy-policy");
      const buttons = await Promise.all([allowText, declineText].map((name) => page.getByRole("button", { name }).boundingBox()));
      assert(buttons[0] && buttons[1]);
      assert.equal(buttons[0].width, buttons[1].width);
      for (const button of buttons) assert(button.height >= 44 && button.x >= 0 && button.x + button.width <= 320);
      await page.getByRole("button", { name: declineText }).click();
      assert.equal(requests.tag, 0);
    });
  });
}

test("published privacy notice is discoverable and GA-free with a stored opt-in", async () => {
  await withBrowser({ width: 390, ready: true }, async ({ page, context, requests }) => {
    await context.addInitScript((key) => localStorage.setItem(key, "accepted"), consentKey);
    const response = await page.goto(production + "/privacy-policy");
    assert.equal(response.status(), 200);
    await page.waitForLoadState("networkidle");
    assert.equal(await page.title(), "DeviaTech Website Privacy Notice");
    assert.equal(await page.getByRole("heading", { level: 1 }).textContent(), "DeviaTech Website Privacy Notice");
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), production + "/privacy-policy");
    assert.equal(await page.locator("time").getAttribute("datetime"), "2026-11-21");
    assert.deepEqual(await page.getByRole("heading", { level: 2 }).allTextContents(), [
      "Who is responsible", "What we collect and why", "Services we use",
      "Cookies and analytics", "How long we keep enquiries", "Your privacy requests",
    ]);
    assert.equal(await page.locator('a[href="mailto:hello@deviatech.com"]').count(), 1);
    assert.equal(await page.locator("#cookies-and-analytics p").textContent(), "Google Analytics is optional. When it is enabled and you select Accept optional cookies, it uses cookies to help us understand how people use this site. You can reject optional cookies or change your choice at any time in Cookie settings. Your choice will not prevent you from using the website or contacting us.");
    assert.equal(await page.getByRole("button", { name: "Cookie settings" }).count(), 0);
    assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
    assert.deepEqual(await commands(page), []);
    assert.equal(requests.tag, 0);
    assert.equal(requests.gate, 0);
  });

  await withBrowser({ width: 1280, ready: false }, async ({ page, requests }) => {
    await page.goto(production + "/");
    const link = page.locator("footer").getByRole("link", { name: "Privacy notice" });
    assert.equal(await link.getAttribute("href"), "/privacy-policy");
    await link.click();
    await page.waitForURL(production + "/privacy-policy");
    await page.getByRole("heading", { name: "DeviaTech Website Privacy Notice", level: 1 }).waitFor();
    assert.equal(requests.tag, 0);
  });

  const sitemap = await fetch(local + "/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), /<loc>https:\/\/deviatech\.com\/privacy-policy<\/loc>/);
});

test("cookie banner privacy link opens the notice without counting consent", async () => {
  await withBrowser({ width: 390, ready: true }, async ({ page, requests }) => {
    await page.goto(production + path);
    const banner = page.getByRole("region", { name: "Optional cookies" });
    const notice = banner.getByRole("link", { name: "Privacy notice" });
    await notice.waitFor();
    assert.equal(await notice.getAttribute("href"), "/privacy-policy");
    assert.equal(await page.evaluate((key) => localStorage.getItem(key), consentKey), null);
    await notice.click();
    await page.waitForURL(production + "/privacy-policy");
    await page.getByRole("heading", { level: 1, name: "DeviaTech Website Privacy Notice" }).waitFor();
    assert.equal(await page.evaluate((key) => localStorage.getItem(key), consentKey), null);
    assert.deepEqual(await commands(page), []);
    assert.equal(requests.tag, 0);
    await page.goBack();
    await banner.getByRole("button", { name: "Accept optional cookies" }).waitFor();
    assert.equal(requests.tag, 0);
  });
});
