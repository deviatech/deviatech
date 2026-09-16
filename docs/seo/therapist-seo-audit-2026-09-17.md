# Therapist service SEO audit — 2026-09-17

Read-only audit of DeviaTech's therapist website-design service pages, the
Luma Therapy demo, and the shared SEO infrastructure they depend on.

- Repository: `deviatech/deviatech`
- Audited commit: `6ec549d29c9a32b870bf836e1b8106f0abace54c` (`origin/main`)
- Working tree at audit time: clean
- Open pull requests at audit time: none
- Audit method: raw HTML fetched with a Googlebot user agent, response
  headers, DNS lookups, and source reading. No code, DNS, or Search Console
  state was changed during the audit.

## 1. Summary

The therapist service pages are in good technical shape. All three
localized landings are indexable, correctly canonicalized, reciprocally
annotated with hreflang, and served with the right document language and
direction in raw server HTML. The Luma demo is `noindex, follow` on both
hosts and absent from the sitemap. Structured data matches visible content.

One confirmed defect was found, at P2: the demo subdomain served the apex
`robots.txt` and, byte for byte, the apex `sitemap.xml`. Everything else
found is P3 — either an accepted trade-off or a policy decision rather than
a defect.

No fabricated business facts, fake reviews, invented credentials, or
doorway content were found anywhere in the audited scope.

## 2. Live URL state

Verified 2026-09-16/17 against production.

| URL | Status | lang / dir | Meta robots | Canonical | hreflang cluster |
| --- | --- | --- | --- | --- | --- |
| `https://deviatech.com/` | 200 | `en` / `ltr` | none (indexable) | `https://deviatech.com` | not applicable |
| `https://deviatech.com/therapist-website-design` | 200 | `en` / `ltr` | `index, follow, max-image-preview:large` | self | en, fa, ur, x-default |
| `https://deviatech.com/fa/therapist-website-design` | 200 | `fa` / `rtl` | `index, follow, max-image-preview:large` | self | en, fa, ur, x-default |
| `https://deviatech.com/ur/therapist-website-design` | 200 | `ur` / `rtl` | `index, follow, max-image-preview:large` | self | en, fa, ur, x-default |
| `https://deviatech.com/therapist-website-design/thank-you` | 200 | `en` / `ltr` | `noindex, follow` | self | — |
| `https://deviatech.com/fa/therapist-website-design/thank-you` | 200 | `fa` / `rtl` | `noindex, follow` | self | — |
| `https://deviatech.com/ur/therapist-website-design/thank-you` | 200 | `ur` / `rtl` | `noindex, follow` | self | — |
| `https://preview.deviatech.com/` | 200 | `en` / `ltr` | `noindex, follow` | preview self | preview cluster |
| `https://preview.deviatech.com/fa` | 200 | `fa` / `rtl` | `noindex, follow` | preview self | preview cluster |
| `https://preview.deviatech.com/ur` | 200 | `ur` / `rtl` | `noindex, follow` | preview self | preview cluster |
| `https://preview.deviatech.com/about` | 200 | `en` / `ltr` | `noindex, follow` | preview self | preview cluster |
| `https://deviatech.com/therapist-demo` | 200 | `en` / `ltr` | `noindex, follow` | `https://preview.deviatech.com/` | preview cluster |
| `https://deviatech.com/blog` | 200 | `en` / `ltr` | none (indexable) | self | — |
| `https://deviatech.com/case-studies` | 200 | `en` / `ltr` | none (indexable) | self | — |
| `https://deviatech.com/contact` | 200 | `en` / `ltr` | none (indexable) | self | — |
| `https://deviatech.com/shopify-development-lahore` | 200 | `en` / `ltr` | none (indexable) | self | — |

Redirect and error behaviour:

| Case | Result |
| --- | --- |
| `http://deviatech.com/` | 301 to `https://deviatech.com/` |
| `https://www.deviatech.com/` | 301 to `https://deviatech.com/` |
| `https://deviatech.com/therapist-website-design/` (trailing slash) | 308 to the canonical no-slash URL |
| `https://preview.deviatech.com/therapist-demo` | 307 to `https://preview.deviatech.com/` |
| Unknown path on apex | true 404 |
| Unknown path on preview host | true 404 |

No redirect chains or loops were observed. No login wall or interstitial
blocks anonymous or Googlebot access to any audited URL.

## 3. Findings

### P2 — Demo subdomain served the apex robots.txt and sitemap.xml

**Group:** technical SEO / international SEO
**Status:** confirmed, fixed in this branch
**Affected URLs:** `https://preview.deviatech.com/robots.txt`,
`https://preview.deviatech.com/sitemap.xml`

**Evidence.** A byte-level `diff` of `https://preview.deviatech.com/sitemap.xml`
against `https://deviatech.com/sitemap.xml` reported the files identical:
5,772 bytes each, listing 32 `https://deviatech.com/...` URLs. The demo
host's `robots.txt` was likewise the apex file, declaring
`Sitemap: https://deviatech.com/sitemap.xml`.

**Cause.** `src/middleware.ts` treated `/robots.txt` and `/sitemap.xml` as
bypassed paths inside the demo-host branch, so both fell through to the
apex route handlers in `src/app/robots.ts` and `src/app/sitemap.ts`.

**Why it matters.** A sitemap is only valid for URLs on the host that
serves it. Advertising apex URLs from the demo subdomain is an invalid
cross-host sitemap, and it invites confusing or duplicated coverage
reporting for a host whose entire purpose is to stay out of the index.
This is a correctness and reporting-hygiene problem rather than an active
indexing threat, because every demo page already carries `noindex, follow`.

**Fix.** Answer both paths for the demo host inside the same middleware
branch: return a demo-specific `robots.txt` that still allows crawling and
declares no sitemap, and return a real 404 for `/sitemap.xml`.

Crawling stays allowed deliberately. `Disallow` is not a substitute for
`noindex` — a crawler has to be able to fetch a page to read its `noindex`
directive, so blocking here would hide the directive instead of enforcing
it.

**Files changed:** `src/middleware.ts`
**Risk to unrelated pages:** low. `src/app/robots.ts` and
`src/app/sitemap.ts` are untouched, so the apex responses are unchanged;
the change is scoped to a host branch that only the demo subdomain enters.
**Verification:** `npm run seo:smoke` asserts the apex pair is unchanged
and the demo pair is corrected, on both hosts.

### P3 — Homepage canonical omits the trailing slash

**Group:** technical SEO
**Status:** confirmed, no change recommended
**Affected URL:** `https://deviatech.com/`

The homepage is served at `/` but declares `<link rel="canonical"
href="https://deviatech.com"/>`, and the sitemap uses the same slashless
form. Google normalizes an empty path and `/` to the same URL, so this has
no practical effect. The signals also agree with each other, which matters
more than the form they take. Recommended action: none.

### P3 — Sitemap lastmod values are hardcoded literals

**Group:** technical SEO
**Status:** confirmed, acceptable
**Affected file:** `src/app/sitemap.ts`

`lastModified` values are written as literal dates such as
`new Date("2026-09-16")` rather than derived from content changes. The
values are currently accurate, and — importantly — they are *not* reset to
the build time on every deploy, which is the actual anti-pattern that
causes Google to discount the field. Blog entries already derive their
value from real post metadata.

Recommended action: update the literal when the landing content materially
changes. Treat drift here as a content-process item, not a code defect.

### P3 — Landing HTML is served uncacheable

**Group:** performance
**Status:** confirmed, accepted trade-off
**Affected URLs:** all therapist landings

Responses carry `cache-control: private, no-cache, no-store, max-age=0,
must-revalidate`. The root layout is dynamic because it reads a
request header to render the correct `<html lang>` and `dir`, so the HTML
document cannot be statically cached. Static assets are unaffected and
remain cacheable.

This is the trade-off that was accepted when the document-language bug was
fixed, and reversing it would reintroduce a worse defect. Recommended
action: none.

### P3 — GPTBot policy

**Group:** AI discovery
**Status:** decided by the owner on 2026-09-17 — accepted policy, not an open issue

`robots.txt` is a blanket `User-Agent: * / Allow: /`, so Googlebot,
Bingbot, `OAI-SearchBot` and `GPTBot` are all allowed. `OAI-SearchBot`
governs ChatGPT Search discovery; `GPTBot` governs potential model
training, which is a separate decision.

The owner decided to leave the blanket rule in place for the current
phase, on the grounds that discoverability through search and AI-assisted
search is a project objective and the site hosts no confidential or
sensitive proprietary content. No crawler-specific rules are to be added.
This is recorded as an accepted policy and may be revisited if DeviaTech's
content or legal position changes.

## 4. Areas with no material defects

These were audited and found sound. No work was invented for them.

**Crawlability and status codes.** Correct statuses throughout, HTTPS and
`www` canonicalization in place, trailing-slash normalization by 308, true
404s on both hosts, no soft 404s, no redirect chains, no interstitials,
and internal navigation uses real `<a href>` elements.

**Indexability and canonicalization.** Every indexable page has a
self-referencing canonical that agrees with the redirect target, the
sitemap entry and internal links. No page carries conflicting
canonical/robots signals. No localized page is canonicalized to English.
The apex `/therapist-demo` duplicate correctly canonicalizes to the
preview host. Thank-you pages are `noindex, follow`, which is the expected
treatment.

**International SEO.** `lang` and `dir` are correct for all three locales
in raw server HTML, set from a server-computed header rather than client
JavaScript. hreflang is fully reciprocal across `en`, `fa` and `ur` with
`x-default` pointing at English; every target returns 200 and is
indexable. The locale switcher uses crawlable links. There is no
geo/IP-based redirect that could block Googlebot. RTL rendering does not
alter URL semantics or heading order.

**Sitemap and robots.** The apex sitemap is valid XML containing only
canonical, indexable, 200-status URLs. It includes all three therapist
landings and excludes every demo, thank-you, API and error URL. The apex
`robots.txt` declares the sitemap and blocks nothing that needs `noindex`
processing.

**Metadata and SERP presentation.** Titles and descriptions are unique per
page and per locale, and are genuine localizations rather than machine
translation or mixed-language fragments. Each page has exactly one `<h1>`
and a logical H2/H3 hierarchy with no levels skipped for styling. Open
Graph and Twitter metadata are complete with absolute image URLs. Urdu
correctly omits `og:locale` rather than inventing a territory code. No
fake author, date, review or business facts appear. The manifest and
icons are valid.

**Content and search intent.** The landings state who the service is for,
what is included, what the free preview means, the five-business-day
preview timeframe and its prerequisites, ownership, mobile responsiveness,
multilingual support, booking and contact options, the process, and the
next step. The demo is labelled as a concept rather than a client case
study. No pricing is displayed, consistent with the decision to quote
after discussion. No testimonials, client logos, project statistics or
invented history appear.

**Structured data.** Each landing emits `Service`, `BreadcrumbList` and
`FAQPage`, alongside DeviaTech's pre-existing sitewide `LocalBusiness`.
All five FAQ questions and their answers were confirmed visibly present in
the rendered HTML, so the `FAQPage` markup matches visible content. The
`Organization` reference uses a stable `@id` and asserts only name and
URL, leaving business facts to the single sitewide entity. No
`AggregateRating`, `Review`, `Person`, medical-provider or price schema
appears anywhere. Demo pages emit no JSON-LD at all, so nothing suggests
Luma is a real practice.

**Images and accessibility.** The English landing carries a single image,
with alt text and explicit dimensions. No identity or clinical-role claims
are attached to generated or stock imagery. Primary content is
server-rendered and present in raw HTML.

**Performance.** No third-party scripts load on the landing. Fonts are
self-hosted through `next/font` with no external font requests. Only
first-party Next.js chunks and two stylesheets load, with an LCP image
preload in place.

**Internal linking.** The homepage already links to
`/therapist-website-design` with a crawlable link, so the landing is
reachable from an indexable page. The landing links to the demo, to both
sibling locales, and to relevant DeviaTech pages. No global navigation
change is needed.

## 5. A suspected defect that turned out not to be one

Raw HTML shows `hrefLang="en"` in camel case rather than the lowercase
`hreflang` used in most documentation. This was checked before being
reported as a defect: the attribute is produced by Next.js's own metadata
serializer, and HTML attribute names are case-insensitive per the HTML
specification, so parsers including Google's read it as `hreflang`. It is
not a defect and needs no fix.

## 6. Verification commands

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
PORT=3199 npm run start          # in a second shell
npm run seo:smoke                # 73 checks against the local build
```

Against production after deployment:

```bash
SEO_SMOKE_ORIGIN=https://deviatech.com npm run seo:smoke
```

## 7. Scope confirmation

No change was made to the DeviaTech homepage, navigation, footer, store or
product routes, unrelated applications, Cloudflare DNS, email records, or
the demo's `noindex` status. The demo was not added to the sitemap and no
indexing was requested for it.
