# Google Search Console setup — 2026-09-17

Status of the Search Console work for `deviatech.com`.

**Current state: not started. Blocked on operator sign-in.**

Nothing in this document should be read as a completed setup. No Search
Console action has been taken, no sitemap has been submitted, and no
indexing has been requested.

No secrets, verification tokens, cookies or credentials are recorded here.

## 1. Blocker

| Field | Value |
| --- | --- |
| Property type intended | Domain property |
| Property name intended | `sc-domain:deviatech.com` |
| Property accessible from this session | No |
| Verified access level | Unknown — could not be read |
| Verification method | Not yet determined |
| Sitemap submission status | Not submitted |
| URLs inspected | None |
| Indexing requests submitted | None |
| Page Indexing summary | Unavailable |
| Core Web Vitals summary | Unavailable (field data not readable) |
| Manual Actions status | Unavailable |
| Security Issues status | Unavailable |

**What happened.** `https://search.google.com/search-console` and a direct
navigation to `?resource_id=sc-domain%3Adeviatech.com` both resolved to
the signed-out Search Console marketing page. The browser session
available to this environment has no authenticated Google account, so the
property selector could not be read.

This is an access blocker, not a site defect. It says nothing about
whether the property exists.

## 2. What is already known about verification

A Google site-verification TXT record **already exists** on the apex:

```
deviatech.com.  TXT  "google-site-verification=BRf65G…"
```

The token is deliberately truncated here. It was read from public DNS,
which anyone can query; it is recorded truncated regardless, because it
has no reason to sit in a repository.

The apex also publishes `"v=spf1 mx ~all"`. That record is unrelated to
Search Console and must not be touched.

**This record does not prove anything about the owner's current Google
account.** It verifies whichever account originally created it, which may
be a different account, an agency's account, or a property nobody is
actively using. Do not assume it grants access, and do not add a second
record on the assumption that it does not.

## 3. Procedure once sign-in is complete

The owner will sign in to Google directly in the browser pane. Credentials,
MFA codes, cookies and recovery information are never to be requested,
read, stored or logged.

After the owner confirms sign-in, work through these in order and stop at
the first one that cannot be satisfied.

1. Open Search Console and read the property selector.
2. Check whether `sc-domain:deviatech.com` already appears.
3. Record the signed-in account's permission level: owner, full user, or
   restricted user.
4. **If the property is accessible:** use it. Do not create a duplicate,
   and do not create a URL-prefix property alongside it. A Domain property
   already covers HTTP, HTTPS and every subdomain including `www` and
   `preview`, which is exactly what this site needs.
5. **If the property is not accessible:** stop and report which of these
   applies, rather than acting:
   - an existing verified owner should add the owner's Google account as a
     user or owner of the existing property; or
   - a new Domain property must be created, which will require adding a
     new Google-provided DNS TXT record.
6. **Before any DNS change:** present the exact record type and host, show
   the token truncated, confirm the change is purely additive, and confirm
   that no existing record will be modified or removed. Wait for the
   owner's explicit approval. Do not delete the existing verification
   record — removing it can revoke someone's ownership, and the
   consequences of that must be understood before it is considered.
7. Confirm verification in Search Console before proceeding.

## 4. Actions authorized once access is confirmed

These, and only these, are pre-authorized by the project brief:

- Submit exactly one sitemap: `https://deviatech.com/sitemap.xml`.
- Confirm Search Console can fetch and read it. If processing is pending,
  report it as **pending** — not as success.
- Run URL Inspection with a live test on:
  - `https://deviatech.com/`
  - `https://deviatech.com/therapist-website-design`
  - `https://deviatech.com/fa/therapist-website-design`
  - `https://deviatech.com/ur/therapist-website-design`
- For each, record: live test availability, indexing status, user-declared
  canonical, Google-selected canonical where available, last crawl date,
  mobile usability and rendered-screenshot observations, and detected
  structured data.
- Request indexing **once** for those four URLs, and only where the live
  test passes and the URL is meant to be indexed.

Anything beyond this list needs a separate decision from the owner.

## 5. Actions explicitly prohibited

- Do not request indexing for any `preview.deviatech.com` URL, any
  `/therapist-demo` URL, any thank-you URL, any API route, or any page
  carrying `noindex`.
- Do not submit the demo to the sitemap or change its `noindex` status.
- Do not repeatedly request indexing. A request is not a guarantee, and
  indexing can take days or weeks. If indexing is blocked or Google picks
  an unexpected canonical, diagnose the actual signal conflict before
  requesting again.
- Do not modify Google Business Profile, or create analytics or
  advertising accounts.
- Do not change any Cloudflare record other than a single approved Google
  verification TXT, and never the apex, `www`, `mail`, MX, SPF, DKIM,
  DMARC, `goadmin`, `godoapi`, `modavaadmin` or `modavaapi` records.

## 6. Prerequisite status

The site-side prerequisites for this work are in place. From the audit of
2026-09-17:

- All four URLs to be inspected return HTTP 200 and are indexable.
- Each carries a correct self-referencing canonical.
- The three landings carry reciprocal hreflang with `x-default`.
- `https://deviatech.com/sitemap.xml` is valid XML, contains all three
  therapist landings, and excludes every demo and thank-you URL.
- `https://deviatech.com/robots.txt` declares the sitemap and blocks
  nothing that requires `noindex` processing.

One change in this branch affects what Search Console will see for the
demo subdomain: `preview.deviatech.com` now serves its own `robots.txt`
with no sitemap directive and returns 404 for `/sitemap.xml`, instead of
serving the apex versions. This should be deployed before the Search
Console work, so the Domain property reports the corrected state from the
start.

## 7. Expectation setting

Submitting a sitemap and requesting indexing are measurement and
management actions. They do not publish content, do not change rankings,
and do not guarantee that any URL will be indexed or ranked. Once these
steps are done the honest status is **implemented; awaiting Google
processing**, and it stays that way until Search Console reports otherwise.

## 8. Next review

- **Immediately:** owner signs in; property access determined.
- **48–72 hours after sitemap submission:** check sitemap processing state
  and crawl errors.
- **Weekly for the first month:** indexing status, queries, pages, CTR,
  Core Web Vitals, and errors.
- **Monthly thereafter:** query and page growth, localized performance,
  cannibalization, content opportunities, and technical regressions.
- **After every meaningful deployment:** re-run
  `SEO_SMOKE_ORIGIN=https://deviatech.com npm run seo:smoke` and
  spot-check canonical, robots, sitemap and localized alternates.
