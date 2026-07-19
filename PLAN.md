# DeviaTech — Website Rebuild + Business Plan
**Prepared for: Claude Code Desktop implementation**
**Owner: Mohammad Hussain (Syed Muhammad Hussain Naqvi) — Founder, DeviaTech, Lahore**
**Repo: github.com/deviatech/deviatech (rebuild in place)**

---

## 0. How to use this document

This is a single source of truth. It contains:
1. The business plan (positioning, offers, pricing, client acquisition) — **read this first**, because the website copy and structure below are derived directly from it.
2. The design system (colors, type, layout, motion) — a specific visual identity, not a generic template.
3. The full technical implementation plan — stack, file structure, page-by-page component breakdown, real copy, SEO, deployment.
4. An ordered task checklist at the end. Claude Code should work through it top to bottom, committing after each numbered task.

Do not substitute placeholder "Lorem ipsum" content anywhere — use the copy provided in Section 3. Where a decision isn't specified, default to the simplest option that matches the design system in Section 2.

---

## 1. Business Plan

### 1.1 Positioning

DeviaTech is a Lahore-based software studio with two focused offers, not a generic "we do everything" agency:

1. **Launch Track (Shopify / online stores)** — for new and existing local businesses (boutiques, home bakeries, gift shops, Instagram-only sellers) who need to sell online.
2. **Build Track (MVP development)** — for startup founders who have an idea and need a working product to test, pitch, or launch.

Tagline: **"From idea to launched — stores and startup products, built in Lahore."**

This maps directly to proof you already have: Ala Gallery (local commerce instinct), Cvilo/Variareel/Buraq Clone (real product-build skill).

### 1.2 Target segments

| Segment | Who | Primary channel | Track |
|---|---|---|---|
| Local retail/D2C businesses | Boutiques, bakeries, gift shops, dropshippers currently selling only on Instagram/WhatsApp | Facebook/Instagram DMs, Lahore business groups, warm referrals | Launch Track |
| Local founders/students | Early-stage founders, university entrepreneurship circles (PUCIT/VU/COMSATS/UCP) | University/incubator networks, warm intros | Build Track |
| Global/remote clients (later phase) | English-speaking startups needing MVP or e-commerce dev | Upwork, LinkedIn content, referrals | Both, once local case studies exist |

**Current priority (per your direction): local Lahore clients, both tracks, get the first client.**

### 1.3 Offers & pricing anchors

Rough PKR anchors — adjust once you've quoted 3-5 real projects, but a visible starting price removes friction for first-time local clients who won't message an agency with no price signal.

**Launch Track (Shopify/online store)**
- Starter Store — PKR 40,000–70,000 — Shopify setup, theme customization, up to 20 products, payment/COD setup, basic SEO. ~7-10 days.
- Growth Store — PKR 80,000–150,000 — Starter + custom sections, EasySell/COD form integration, Meta Pixel, email capture, product photography guidance. ~2-3 weeks.

**Build Track (MVP)**
- MVP Starter — PKR 150,000–300,000 — single core flow, auth, one primary feature set, basic admin, deployed. ~3-5 weeks.
- MVP Full — PKR 300,000–600,000+ — multi-feature product, admin dashboard, integrations (payments, notifications). ~6-10 weeks.

Always frame as "starting from" — final quote after a discovery call.

### 1.4 First-client plan (next 30-45 days)

Since the goal is literally your first paying client:

1. **Founding-client offer**: 2-3 projects at a reduced fixed price (e.g. Launch Track at PKR 25,000-35,000) in exchange for: a written testimonial, permission to use their name/logo/screens on the site, and a short case study. This is how the "Work" page below gets populated with *real* clients fast instead of just your own products.
2. **Direct outreach list**: 15-20 Instagram-only local sellers per week — DM offering a store audit + free mockup of their homepage as a foot-in-the-door.
3. **Warm network + university circles**: anyone in your PU/PUCIT/COMSATS/UCP admissions process, or personal network, building something — direct MVP conversations.
4. **Facebook/local groups**: Lahore business & startup groups — post the offer directly, don't just link-drop.
5. **WhatsApp as the primary conversion channel** — the whole site funnels here, not a contact form.

### 1.5 Growth roadmap (after first 2-3 clients)

- Add real case studies to the Work page, replacing "products we've built" framing with actual client results.
- Start light LinkedIn content (you already have practice with this) — technical posts about what you're building for clients, building authority for both local and eventual global reach.
- Once 3-5 local case studies exist, begin light Upwork/global outreach using the same site as portfolio proof.
- Track a simple metric: inquiries → discovery calls → signed projects. Revisit pricing once you have 5+ data points.

---

## 2. Design System — "The Blueprint"

**Concept**: DeviaTech turns an idea into a built, live thing. The visual identity is a technical blueprint / architectural drafting sheet — because that's literally the metaphor for what the business does: draft it, then construct it. This is grounded in the subject, not a decorative theme.

Avoided on purpose: cream background + serif + terracotta (generic AI default #1), near-black + neon accent (default #2), zero-radius broadsheet newspaper columns (default #3).

### 2.1 Color tokens

```
--paper:        #F3F4EE   /* soft graph-paper off-white, cool not cream */
--ink:          #16213E   /* deep blueprint navy — primary text & lines */
--ink-soft:     #45516E   /* secondary text, muted navy */
--line-grid:    #D8DCCF   /* faint grid/graph-paper lines, low opacity */
--accent-amber: #E2A63B   /* marigold accent — CTAs, highlights, sparing use */
--accent-rust:  #B4552F   /* secondary accent — small details, hover states only */
--surface:      #FFFFFF   /* card/panel surfaces atop paper background */
```

Usage rule: amber accent appears in at most one place per screen section (a CTA button, a single highlighted word, a sheet number). Never both accents together in the same component.

### 2.2 Typography

- **Display**: `Space Grotesk` (geometric, technical, slightly mechanical — headlines only, used with restraint, tight tracking)
- **Body**: `Inter` (clean, highly legible, standard weights 400/500)
- **Mono/label**: `IBM Plex Mono` (used for eyebrows, sheet numbers, small labels, code-like details — reinforces the "drafting document" feel)

Type scale (rem, mobile-first, scale up ~1.15x at `lg`):
```
--text-xs:   0.75rem   (labels, mono)
--text-sm:   0.875rem
--text-base: 1rem
--text-lg:   1.125rem
--text-xl:   1.5rem
--text-2xl:  2rem
--text-3xl:  2.75rem
--text-4xl:  3.5rem    (hero headline only)
```

### 2.3 Layout concept

Faint graph-paper grid (`--line-grid` at ~15% opacity, 24px grid) as a persistent background texture across the whole page — subtle, never busy. Each major section is framed like a blueprint "sheet": a thin ink-colored corner-bracket (like drafting corner marks, ⌐ style, drawn in CSS/SVG, not an image) with a small mono-font label in the corner: `SHEET 01 — HERO`, `SHEET 02 — SERVICES`, etc. This is justified numbering (real blueprint sheets are numbered), not a generic 01/02/03 process gimmick — so it's used for section identity, not for the process steps (which get plain, unnumbered prose instead).

ASCII wireframe of homepage:
```
┌─ SHEET 01 — HERO ─────────────────────────┐
│  [mono eyebrow: LAHORE, PAKISTAN]         │
│  Big headline (Space Grotesk)             │
│  Subline (Inter)                          │
│  [ Start on WhatsApp ]  [ See our work ]  │
│  ⤷ signature line-drawing illustration    │
└────────────────────────────────────────────┘
┌─ SHEET 02 — TWO TRACKS ───────────────────┐
│  [ Launch Track card ] [ Build Track card]│
└────────────────────────────────────────────┘
┌─ SHEET 03 — HOW IT WORKS ─────────────────┐
│  Discovery → Draft → Build → Launch       │
│  (plain labels, not numbered — real flow) │
└────────────────────────────────────────────┘
┌─ SHEET 04 — WORK ─────────────────────────┐
│  Cvilo · Variareel · Ala Gallery · Buraq  │
└────────────────────────────────────────────┘
┌─ SHEET 05 — STACK ────────────────────────┐
│  Tech logos, quiet, mono labels           │
└────────────────────────────────────────────┘
┌─ SHEET 06 — CONTACT ──────────────────────┐
│  WhatsApp CTA (primary) + form (secondary)│
└────────────────────────────────────────────┘
```

### 2.4 Signature element

The hero contains one **self-drawing SVG line illustration**: a simple wireframe that morphs from a rough sketch (a phone/browser outline with squiggly placeholder lines, like a hand-drawn wireframe) into a clean finished storefront/app screen — animated once on page load via `stroke-dasharray`/`stroke-dashoffset` reveal, ~1.2s, easing `cubic-bezier(0.65, 0, 0.35, 1)`, then settles. This is the one bold moment on the page. Respect `prefers-reduced-motion`: skip straight to the finished state if set.

### 2.5 Motion principles (minimal, deliberate)

- Page load: signature hero illustration draws in once (above).
- Scroll: sections fade + shift up 12px on entering viewport (Intersection Observer or Framer Motion `whileInView`), 0.4s, no stagger gimmicks.
- Hover: buttons and cards shift 1-2px on hover with a subtle shadow/border-color change — no scale-bounce, no shine sweep effects.
- No parallax, no cursor-follow effects, no auto-playing carousels.
- Everything respects `prefers-reduced-motion: reduce`.

---

## 3. Technical Implementation Plan

### 3.1 Stack

- **Next.js 15** (App Router), TypeScript
- **Tailwind CSS** (v4 if available in the current template setup, otherwise v3) — custom theme extended with tokens from Section 2.1/2.2
- **Framer Motion** for the scroll-reveal and hero draw-in (minimal usage only, per 2.5)
- No CMS needed at this stage — content lives in typed local data files (`/src/content/*.ts`) so it's easy to edit without touching components, and easy to migrate to a CMS later if needed
- **Nodemailer** (or a simple API route) for the contact form fallback; WhatsApp deep link (`https://wa.me/923287538988`) as the primary CTA throughout
- Deployment: Docker + GitHub Actions (ghcr.io) + existing Hetzner VPS + Nginx reverse proxy — same pattern as your other subdomains (cvilo, admin.cvilo.com, modavaadmin)

### 3.2 Project structure

```
deviatech/
├── Dockerfile
├── .github/workflows/deploy.yml
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── logo/ (migrate existing logo assets)
│   ├── favicon, site.webmanifest, robots.txt, sitemap.xml (regenerate)
├── src/
│   ├── app/
│   │   ├── layout.tsx          (root layout, fonts, metadata)
│   │   ├── page.tsx            (homepage — assembles sections below)
│   │   ├── work/page.tsx       (case studies / products built)
│   │   ├── globals.css         (Tailwind base + grid texture + tokens)
│   │   └── api/contact/route.ts (form handler)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── BlueprintGrid.tsx    (background graph-paper texture)
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TwoTracks.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Work.tsx
│   │   │   ├── TechStack.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── SheetFrame.tsx       (corner-bracket + "SHEET 0N — LABEL" wrapper)
│   │       ├── Button.tsx           (primary=amber WhatsApp CTA, secondary=outline)
│   │       ├── Card.tsx
│   │       └── SignatureIllustration.tsx (the self-drawing SVG)
│   ├── content/
│   │   ├── tracks.ts     (Launch/Build track copy + pricing anchors)
│   │   ├── work.ts        (Cvilo, Variareel, Ala Gallery, Buraq Clone entries)
│   │   ├── stack.ts       (tech list)
│   │   └── site.ts        (contact info, socials, metadata defaults)
│   └── lib/
│       └── whatsapp.ts    (helper to build wa.me links with prefilled message)
```

### 3.3 Page-by-page content (real copy — use as-is or lightly refine)

**Header**
- Logo (existing DeviaTech logo, migrated)
- Nav: Work · Services · Stack · Contact
- Persistent small "Chat on WhatsApp" button, top-right

**Hero (Sheet 01)**
- Eyebrow (mono): `LAHORE, PAKISTAN`
- Headline: "From idea to launched."
- Subline: "DeviaTech builds online stores for local businesses and MVPs for startups — designed, built, and shipped in Lahore."
- Primary CTA: "Start on WhatsApp" → wa.me link, prefilled: "Hi DeviaTech, I want to talk about a project."
- Secondary CTA: "See our work" → scrolls to Work section
- Signature illustration to the right (or below on mobile)

**Two Tracks (Sheet 02)**
- Section eyebrow: "WHAT WE BUILD"
- Card 1 — **Launch Track**: "Get your business online." Copy: "Shopify stores for boutiques, bakeries, and D2C brands — live in 7-10 days, with payments, COD, and Meta Pixel set up from day one." Starting price: "Starting from PKR 40,000" · CTA: "Ask about your store"
- Card 2 — **Build Track**: "Turn your idea into a product." Copy: "MVPs for founders — a working product you can put in front of users or investors, not just a pitch deck." Starting price: "Starting from PKR 150,000" · CTA: "Talk about your idea"

**How It Works (Sheet 03)** — plain labeled flow, not numbered gimmick
- Discovery — "A short call to understand what you're building and why."
- Draft — "We map the scope, timeline, and a fixed price before any code is written."
- Build — "You see progress every week — no black-box development."
- Launch — "Live, tested, and handed off with support."

**Work (Sheet 04)**
- Eyebrow: "PRODUCTS WE'VE BUILT" (honest framing since client case studies don't exist yet)
- Cvilo — "An AI-powered resume builder — cvilo.com" — tag: `Next.js · AI`
- Variareel — "YouTube-to-Shorts clipping pipeline with async job queues" — tag: `Next.js · BullMQ · ffmpeg`
- Ala Gallery — "A personalized gift shop built for the Lahore market" — tag: `E-commerce`
- Buraq Clone — "A full MERN e-commerce platform with Stripe payments" — tag: `MongoDB · Express · Next.js`
- As real client work lands, replace this section's framing to "Client work" and move personal products to a secondary "Lab" section.

**Tech Stack (Sheet 05)** — quiet, mono-labeled logo row: Next.js, React, Node.js, TypeScript, MongoDB/PostgreSQL, Docker, AWS, Shopify

**Contact (Sheet 06)**
- Headline: "Let's build something."
- Primary: large WhatsApp button (same prefilled message pattern)
- Secondary: simple form (Name, Email/Phone, What are you building?, Submit) → `/api/contact` → email + optional Slack/WhatsApp notification
- Footer: Lahore address line, phone, email, LinkedIn (deviatech-pk), GitHub (deviatech)

### 3.4 SEO & metadata

- Use Next.js Metadata API in `layout.tsx` / `page.tsx` — migrate existing meta content (title, description, OG/Twitter tags, geo tags) from the current `index.html`, don't lose the existing geo/OG setup
- Regenerate `sitemap.xml` via `src/app/sitemap.ts` (Next.js convention) and `robots.txt` via `src/app/robots.ts`
- Keep `site.webmanifest` for PWA basics
- Add structured data (`LocalBusiness` JSON-LD) with Lahore address/geo — helps local search intent directly

### 3.5 Accessibility & quality floor

- Responsive down to 360px width
- Visible keyboard focus states on all interactive elements (buttons, links, form fields) — use a visible outline in `--accent-amber`, not the browser default
- All animations respect `prefers-reduced-motion`
- Color contrast: verify `--ink` on `--paper` and `--surface` meets WCAG AA for body text
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`) throughout

### 3.6 Deployment (matches your existing infra pattern)

1. `Dockerfile` — multi-stage Next.js production build (builder stage + slim runtime stage)
2. GitHub Actions workflow: build → push to ghcr.io (using existing `GHCR_TOKEN`/`CR_PAT` pattern) → deploy to Hetzner VPS
3. Nginx reverse proxy config for `deviatech.com` pointing to the container's exposed port, same pattern as `admin.cvilo.com`
4. Cloudflare SSL/TLS — confirm existing certificate/proxy settings carry over cleanly

### 3.7 Migration steps from the current static repo

1. Keep the existing repo (`deviatech/deviatech`) — do not create a new one; this preserves stars/history.
2. Extract and preserve: logo assets (`/logo`), the existing meta/SEO values (from current `index.html` frontmatter), and any working contact-form logic worth reusing from `/mail`.
3. Scaffold the new Next.js app in the same repo root, remove the old static `css/js/lib/scss/index.html` once the new build is verified working locally.
4. Remove `digital-agency-website-template.jpg` and any leftover template branding — it undercuts credibility since it visibly signals a purchased template.
5. Update `Dockerfile` for the Next.js build (replace the static-file Dockerfile).
6. Verify GitHub Actions deploy pipeline against the new build before cutting over DNS/Nginx.

---

## 4. Ordered Task Checklist (for Claude Code Desktop)

1. Scaffold Next.js 15 + TypeScript + Tailwind app in the existing repo root; verify `npm run dev` works.
2. Configure Tailwind theme with tokens from Section 2.1/2.2 (colors, fonts, type scale) in `tailwind.config.ts`.
3. Build `BlueprintGrid.tsx` (graph-paper background texture) and `SheetFrame.tsx` (corner-bracket + sheet-label wrapper) — these are used by every section.
4. Build `SignatureIllustration.tsx` (self-drawing SVG hero piece) with `prefers-reduced-motion` fallback.
5. Build `Hero.tsx` using copy from Section 3.3; wire up WhatsApp CTA via `lib/whatsapp.ts`.
6. Build `TwoTracks.tsx`, `HowItWorks.tsx`, `Work.tsx`, `TechStack.tsx`, `Contact.tsx` using content from `/src/content/*.ts` files (create these data files first with the copy from Section 3.3).
7. Build `Header.tsx` and `Footer.tsx`.
8. Assemble `app/page.tsx` from all sections; add scroll-reveal motion (Framer Motion `whileInView`) per Section 2.5.
9. Build `/api/contact/route.ts` with Nodemailer (or equivalent) form handler.
10. Add Metadata API config, `sitemap.ts`, `robots.ts`, and `LocalBusiness` JSON-LD structured data.
11. Accessibility pass: keyboard focus states, contrast check, semantic HTML audit.
12. Migrate/replace `Dockerfile` for Next.js production build; verify local Docker build succeeds.
13. Update GitHub Actions workflow for the new build; test deploy to a staging path/subdomain before cutting over `deviatech.com` DNS/Nginx.
14. Remove legacy static files (`css/`, `js/`, `lib/`, `scss/`, old `index.html`, template screenshot) once new site is verified live.
15. Final review pass against Section 2 (design system) and Section 3.5 (quality floor) before considering done.

---

*End of plan. This document is the reference for both business direction and technical build — keep it in the repo (e.g. `/PLAN.md`) so it stays alongside the code it describes.*
