#!/usr/bin/env node
/**
 * Manual tool: captures desktop/mobile screenshots of the real therapist-demo
 * pages (/therapist-demo/*) and writes optimized WebP assets consumed by the
 * therapist landing page's Hero and ConceptShowcase previews
 * (src/features/therapist-landing/content/conceptPreviews.ts).
 *
 * One-time setup:
 *   npx playwright install chromium
 *
 * Usage:
 *   npm run capture:therapist-previews
 *
 * This boots a production Next.js server (`next build && next start`) so
 * captures match what actually ships, runs a pre-flight check against all
 * six demo routes, then screenshots each at desktop (1440x960) and mobile
 * (390x844) viewports and crops/encodes them with sharp.
 *
 * This script is never invoked by `npm run build`, CI, or the Dockerfile —
 * it's a manual step, re-run only when the therapist-demo's visual design
 * changes. Set CAPTURE_SKIP_BUILD=1 to reuse an existing .next build during
 * iteration (skips the `next build` step).
 */
import { chromium } from "playwright-core";
import sharp from "sharp";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const NEXT_BIN = path.join(ROOT, "node_modules", ".bin", "next");
const OUTPUT_DIR = path.join(ROOT, "public", "therapist-concept-previews");
const PORT = process.env.CAPTURE_PORT ?? "4173";
const BASE_URL = `http://127.0.0.1:${PORT}`;

// Kept in sync with the tab ids in src/features/therapist-landing/content/types.ts
// and the route paths in src/features/therapist-demo/lib/routes.ts (English/default
// locale only — see the "twelve assets" scope note in the implementation plan).
const TABS = [
  { id: "home", route: "/therapist-demo" },
  { id: "about", route: "/therapist-demo/about" },
  { id: "services", route: "/therapist-demo/services" },
  { id: "blog", route: "/therapist-demo/blog" },
  { id: "contact", route: "/therapist-demo/contact" },
  { id: "booking", route: "/therapist-demo/book" },
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 960 },
  mobile: { width: 390, height: 844 },
};

// Height/width ratio each capture is top-anchor cropped to, matching the
// aspect-[16/10] desktop frame and aspect-[9/16] mobile phone frame in
// LandingHero.tsx / ConceptShowcase.tsx.
const TARGET_ASPECT = {
  desktop: 10 / 16,
  mobile: 16 / 9,
};

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", cwd: ROOT });
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`)),
    );
    child.on("error", reject);
  });
}

function spawnServer() {
  return spawn(NEXT_BIN, ["start", "-p", PORT], { cwd: ROOT, stdio: "inherit" });
}

async function waitForServer(timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status < 500) return;
    } catch {
      // server not accepting connections yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not become ready at ${BASE_URL} within ${timeoutMs}ms`);
}

async function preflightCheck() {
  const failures = [];
  for (const tab of TABS) {
    const url = `${BASE_URL}${tab.route}`;
    try {
      const res = await fetch(url);
      if (!res.ok) failures.push(`${tab.route} -> HTTP ${res.status}`);
    } catch (err) {
      failures.push(`${tab.route} -> ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  if (failures.length > 0) {
    throw new Error(`Pre-flight route check failed:\n${failures.join("\n")}`);
  }
}

async function captureAll() {
  const browser = await chromium.launch();
  const results = [];
  try {
    for (const tab of TABS) {
      for (const [device, viewport] of Object.entries(VIEWPORTS)) {
        const page = await browser.newPage({ viewport });
        try {
          await page.goto(`${BASE_URL}${tab.route}`, { waitUntil: "networkidle" });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(300);

          const pngBuffer = await page.screenshot({ type: "png" });
          const cropHeight = Math.min(
            Math.round(viewport.width * TARGET_ASPECT[device]),
            viewport.height,
          );
          const outPath = path.join(OUTPUT_DIR, `${tab.id}-${device}.webp`);

          const info = await sharp(pngBuffer)
            .extract({ left: 0, top: 0, width: viewport.width, height: cropHeight })
            .webp({ quality: 82 })
            .toFile(outPath);

          results.push({
            tab: tab.id,
            device,
            file: path.relative(ROOT, outPath),
            width: info.width,
            height: info.height,
            bytes: info.size,
          });
        } finally {
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
  return results;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  if (process.env.CAPTURE_SKIP_BUILD !== "1") {
    console.log("Building production bundle...");
    await run(NEXT_BIN, ["build"]);
  } else {
    console.log("CAPTURE_SKIP_BUILD=1 set, reusing existing .next build.");
  }

  console.log(`Starting production server on ${BASE_URL}...`);
  const server = spawnServer();

  try {
    await waitForServer();

    console.log("Checking demo routes...");
    await preflightCheck();

    console.log("Capturing screenshots...");
    const results = await captureAll();

    console.log("\nCaptured assets:");
    console.table(results);
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
