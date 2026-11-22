import { analyticsSiteData } from "@/lib/analytics-site";

const origin = "https://deviatech.com";
const id = "G-15GFH194BP";
const pages = new Set(analyticsSiteData.paths.map(path => origin + path));
const maxBytes = 8192;
let windowEnd = 0;
let remaining = 0;

// A process-wide ceiling also bounds traffic from clients that forge browser headers.
function takeSlot() {
  if (Date.now() >= windowEnd) {
    windowEnd = Date.now() + 60_000;
    remaining = 120;
  }
  if (!remaining) return false;
  remaining--;
  return true;
}

export const dynamic = "force-dynamic";
export const GET = collect;
export const POST = collect;

async function collect(request: Request) {
  if (process.env.GA4_MANUAL_MEASUREMENT_READY !== "true") return new Response(null, { status: 404 });
  const site = request.headers.get("sec-fetch-site");
  const source = request.headers.get("origin");
  const optedIn = request.headers.get("cookie")?.split(";").some(pair => pair.trim() === "__Host-ga4-optin=1");
  if (!optedIn || (site && site !== "same-origin") || (source && source !== origin))
    return new Response(null, { status: 403 });
  const url = new URL(request.url);
  if (url.search.length > maxBytes) return new Response(null, { status: 413 });
  const reader = request.body?.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  while (reader) {
    const next = await reader.read();
    if (next.done) break;
    bytes += next.value.length;
    if (bytes + url.search.length > maxBytes) {
      await reader.cancel();
      return new Response(null, { status: 413 });
    }
    chunks.push(next.value);
  }
  const body = Buffer.concat(chunks).toString("utf8");
  const input = url.searchParams;
  for (const [k, v] of new URLSearchParams(body)) input.append(k, v);
  const dl = input.get("dl") ?? "";
  const dr = input.get("dr") ?? "";
  const cid = input.get("cid") ?? "";
  if (/[\r\n]/.test(body) || new Set(input.keys()).size !== input.size ||
      input.get("v") !== "2" || input.get("tid") !== id || input.get("en") !== "page_view" ||
      !pages.has(dl) || (dr !== "" && !pages.has(dr)) || !/^\d{1,12}\.\d{1,12}$/.test(cid))
    return new Response(null, { status: 400 });
  if (!takeSlot()) return new Response(null, { status: 429 });
  const payload = new URLSearchParams({ v: "2", tid: id, en: "page_view", cid, dl, dr, dt: dl.slice(origin.length), npa: "1" });
  try {
    const reply = await fetch("https://www.google-analytics.com/g/collect?" + payload, {
      method: "POST", redirect: "error", cache: "no-store", signal: AbortSignal.timeout(3000),
    });
    return new Response(null, { status: reply.ok ? 204 : 502 });
  } catch {
    return new Response(null, { status: 502 });
  }
}
