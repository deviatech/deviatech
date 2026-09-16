# Therapist SEO implementation report — 2026-09-17

Companion to `therapist-seo-audit-2026-09-17.md`. Records what was changed,
what was verified, and what remains open.

- Branch: `seo/therapist-search-console-completion`
- Base: `origin/main` at `6ec549d29c9a32b870bf836e1b8106f0abace54c`
- Commits: `0a09d0c` (middleware fix), `3daba6c` (smoke test)

## 1. What changed

Three files. No page content, layout, component, route, or piece of
metadata was modified.

### `src/middleware.ts` — demo-host robots and sitemap

**Before.** The demo-host branch listed `/robots.txt` and `/sitemap.xml`
as bypassed paths, so both fell through to the apex handlers.
`preview.deviatech.com/sitemap.xml` was byte-identical to
`deviatech.com/sitemap.xml` — 5,772 bytes advertising 32 apex URLs from a
host that serves none of them — and the demo `robots.txt` pointed at the
apex sitemap.

**After.** Both paths are answered for the demo host inside the same
branch:

- `/robots.txt` returns `User-agent: * / Allow: /` with **no** `Sitemap`
  directive.
- `/sitemap.xml` returns a real HTTP 404, not a rewrite or redirect.

Crawling stays allowed deliberately. Every demo page carries
`noindex, follow`, and a crawler must be able to fetch a page to read that
directive — `Disallow` would hide the `noindex` rather than enforce it.

`src/app/robots.ts` and `src/app/sitemap.ts` are untouched, so apex
behaviour is unchanged. The other bypassed paths (`/api/`, `/images/`,
`/logo/`, `/manifest.webmanifest`) still bypass.

### `scripts/seo-smoke.sh` — regression coverage

New, zero-dependency bash script. The repository has no test runner, and
adding one was judged a wider tooling decision than this change warrants,
so no package was added and no CI workflow was introduced.

Properties: read-only (GET requests only — never a form submission, an
indexing request, or any external mutation); `set -euo pipefail`;
per-request timeouts; configurable origin via `SEO_SMOKE_ORIGIN` defaulting
to a local production build; explicit `Host` headers so both public hosts
can be driven against one local server, exactly as Cloudflare presents
them; readable pass/fail output; non-zero exit on failure; a `curl`
presence check with a clear message.

### `package.json` — one script entry

`"seo:smoke": "bash scripts/seo-smoke.sh"`. Nothing else changed. No
dependency was added, and `build`, `start`, `dev` and `lint` are untouched,
so build and deployment behaviour is unaffected.

## 2. Verification

### Toolchain

| Command | Result |
| --- | --- |
| `npm ci` | Pass — 418 packages. The pre-existing `node_modules` in this worktree was broken (`.bin` empty), so a clean install was required before anything else would run |
| `npm run lint` | Pass — no errors, no warnings |
| `npx tsc --noEmit` | Pass — no type errors |
| `npm run build` | Pass — production build completes; middleware 34.6 kB |
| `git diff --check` | Pass — no whitespace errors |

### `npm run seo:smoke` against the local production build

**73 checks, 73 passed, 0 failed.** Coverage:

| Group | Checks | Result |
| --- | --- | --- |
| Apex `robots.txt` and `sitemap.xml` unchanged | 11 | All pass |
| Demo host `robots.txt` and `sitemap.xml` corrected | 4 | All pass |
| EN/FA/UR landings: status, robots, canonical, `lang`/`dir`, single H1, four hreflang alternates each | 27 | All pass |
| Thank-you pages remain `noindex` | 3 | All pass |
| Demo pages: `noindex`, preview canonical, `lang`/`dir`, no JSON-LD | 20 | All pass |
| Unrelated site and store control routes | 8 | All pass |

Before/after for the fixed defect:

| Check | Before | After |
| --- | --- | --- |
| `preview.deviatech.com/robots.txt` | Apex file, declared apex sitemap | Demo-specific, allows crawling, no sitemap line |
| `preview.deviatech.com/sitemap.xml` | 200, byte-identical to apex sitemap | 404 |
| `deviatech.com/robots.txt` | Declared apex sitemap | Unchanged |
| `deviatech.com/sitemap.xml` | 200, valid, 3 therapist URLs | Unchanged |
| Demo pages | `noindex, follow` | `noindex, follow` |

### The smoke test was checked for false confidence

A test that cannot fail proves nothing, so the script was deliberately
broken — the demo host was rewritten to the apex — and re-run. It reported
**56 passed, 17 failed** and exited `1`. The unmodified script exits `0`.
The assertions are real.

## 3. What was not changed

Verified unchanged in behaviour:

- DeviaTech homepage, navigation, header, footer.
- Store, product and commercial routes — `/shopify-development-lahore`
  and peers still return 200 and remain indexable.
- Blog, case studies, about, contact.
- The existing contact form and `src/app/api/contact/route.ts`.
- Demo routing on the preview subdomain, including the `/therapist-demo`
  307 canonicalization.
- Every demo page's `noindex, follow`.
- Apex `robots.txt` and `sitemap.xml`.
- Cloudflare DNS and all email records (MX, SPF, DKIM, DMARC). No DNS
  change was made or proposed.
- No visual or layout change anywhere.

## 4. SEO trade-offs

**Demo `robots.txt` allows crawling rather than disallowing.** Deliberate.
`noindex` is the mechanism keeping the demo out of the index, and it only
works if crawlers can fetch the pages. `Disallow` would suppress the
directive, which is the failure mode the specification warns about.

**`preview.deviatech.com/sitemap.xml` now 404s rather than serving an
empty sitemap.** A 404 is the honest answer for a host that publishes no
sitemap. An empty `urlset` would assert that the host has zero indexable
URLs, which is a different and less accurate claim.

**GPTBot remains allowed.** Owner decision of 2026-09-17: discoverability
through search and AI-assisted search is a project objective, and the site
holds no confidential content. Recorded as accepted policy, not an open
issue. Revisit if DeviaTech's content or legal position changes.

**Uncacheable landing HTML was left alone.** The root layout is dynamic
because it reads a request header to emit the correct `<html lang>` and
`dir`. Making the HTML cacheable would reintroduce the document-language
defect that was previously fixed. Static assets remain cacheable.

## 5. Rollback

Both commits are additive and independently revertable.

```bash
git revert 3daba6c    # remove the smoke test and the npm script
git revert 0a09d0c    # restore the previous demo-host bypass behaviour
```

Reverting `0a09d0c` returns `preview.deviatech.com` to serving the apex
`robots.txt` and `sitemap.xml`. That reinstates the P2 defect but breaks
nothing else — demo pages stay `noindex` either way. No data migration, no
configuration change, and no external state is involved in either revert.

## 6. Deferred, and why

| Item | Why deferred |
| --- | --- |
| Google Search Console setup | Blocked on owner sign-in. See `search-console-setup-2026-09-17.md` |
| Homepage canonical trailing slash | P3, cosmetic; signals already agree. Change carries more risk than value |
| Sitemap `lastmod` derivation | P3. Values are accurate and, importantly, not reset on every build. Content-process item, not a code defect |
| CI workflow for the smoke test | Explicitly out of scope for this PR by owner decision |
| A test runner (Vitest or similar) | New dependency and a repo-wide tooling decision beyond therapist SEO scope |
| Content publication | Roadmap is research only; nothing is approved for publication |
| Bing Webmaster Tools, IndexNow | Separate decisions, not in this brief's authorized scope |

## 7. Honest status

The code change is **implemented and verified locally**. It is **not yet
deployed**, and the production URLs still exhibit the pre-fix behaviour
until this branch is merged and released.

The Search Console work is **not started and externally blocked**.

Nothing here guarantees rankings, traffic, leads, or an indexing date.
Once the sitemap is submitted and indexing requested, the accurate status
will be **implemented; awaiting Google processing**.

## 8. Post-deploy checklist

After merge and deployment:

```bash
SEO_SMOKE_ORIGIN=https://deviatech.com npm run seo:smoke
```

Confirm specifically:

- `https://preview.deviatech.com/robots.txt` → 200, no sitemap line
- `https://preview.deviatech.com/sitemap.xml` → 404
- `https://deviatech.com/robots.txt` → unchanged
- `https://deviatech.com/sitemap.xml` → unchanged and valid
- EN/FA/UR demo pages → still `noindex, follow`

Then, and only then, proceed to the Search Console procedure.
