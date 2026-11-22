import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { test } from "node:test";
import ts from "typescript";
import crypto from "node:crypto";

const source = fs.readFileSync(new URL("../src/app/api/analytics/g/collect/route.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
test("the relay bounds and reconstructs consented views, never follows redirects, and consumes a private debug grant once", async () => {
  const exports = {};
  const env = {};
  const sent = [];
  const cid = "123.456";
  const digest = crypto.createHash("sha256").update(cid).digest("hex");
  const now = Date.now();
  const grants = new Set();
  let redirect = false;
  vm.runInNewContext(outputText, {
    exports, Request, Response, URL, URLSearchParams, Buffer, Date: class extends Date { static now() { return now; } },
    AbortSignal, process: { env }, require(name) {
      if (name === "node:crypto") return crypto;
      if (name === "node:fs/promises") return { unlink: async path => { if (!grants.delete(path)) throw Error(); } };
      if (name === "@/lib/analytics-site") return { analyticsSiteData: { paths: ["/contact"] } };
      throw Error(name);
    },
    async fetch(url, init) {
      assert.equal(init.redirect, "error");
      const target = new URL(url);
      assert.equal(target.origin + target.pathname, "https://www.google-analytics.com/g/collect");
      sent.push(target.searchParams);
      if (redirect) throw Error("redirect rejected");
      return new Response(null, { status: 204 });
    },
  });
  const fields = {v:"2",tid:"G-15GFH194BP",en:"page_view",cid,dl:"https://deviatech.com/contact",gcs:"G101",gcd:"13q3r3q3q7l1",npa:"1"};
  async function call(extra = {}, cookie = "__Host-ga4-optin=1") {
    const url = new URL("https://deviatech.com/api/analytics/g/collect");
    url.search = new URLSearchParams({...fields,...extra});
    return (await exports.GET(new Request(url,{headers:{cookie}}))).status;
  }
  assert.equal(await call(),404);
  env.GA4_RELAY_READY="true";
  assert.equal(await call({}, ""),403);
  for (const bad of [{gcs:"G111"},{en:"click"},{dr:"https://outside.invalid"},{dl:fields.dl+"?private=1"},{tid:"G-OTHER"}]) assert.equal(await call(bad),400);
  assert.equal(await call({dt:"x".repeat(9000)}),413);
  assert.equal(sent.length,0);
  grants.add(`/tmp/deviatech-ga4-debug/${Math.floor(now / 60000)}-${digest}`);
  for (let i=0;i<2;i++) assert.equal(await call({"ep.debug_mode":"true",extra:"synthetic"}),204);
  assert.equal(sent[0].get("ep.debug_mode"),"true");
  assert.equal(sent[1].has("ep.debug_mode"),false);
  assert.equal(sent[0].has("extra"),false);
  redirect=true;
  assert.equal(await call(),502);
  redirect=false;
  for(let i=3;i<120;i++) assert.equal(await call(),204);
  assert.equal(await call(),429);
  env.GA4_RELAY_READY="false";
  assert.equal(await call(),404);
});

test("a late legacy probe stays off across a relay activation and rollback", async () => {
  const env = { GA4_MANUAL_MEASUREMENT_READY: "true" };
  function endpoint(file) {
    const code = fs.readFileSync(new URL(file, import.meta.url), "utf8");
    const exports = {};
    vm.runInNewContext(ts.transpileModule(code, {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,
      {exports,Response,process:{env}});
    return async () => {
      const reply = exports.GET();
      assert.match(reply.headers.get("cache-control"), /no-store/);
      return (await reply.json()).enabled;
    };
  }
  const legacy = endpoint("../src/app/api/analytics-readiness/route.ts");
  const current = endpoint("../src/app/api/analytics/readiness/route.ts");
  assert.equal(await current(),false);
  env.GA4_RELAY_READY = "true";
  assert.equal(await legacy(),false);
  assert.equal(await current(),true);
  env.GA4_RELAY_READY = "false";
  assert.equal(await current(),false);
  assert.equal(await legacy(),false);
});
