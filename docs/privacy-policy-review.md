# Privacy page: draft for owner review

This is a review draft, not a published policy or a URL ready for Meta. Do not merge or deploy it as a completed policy.

## Changes

- Adds the proposed `/privacy-policy` route in a separate `(legal)` route group. It does not inherit the main site's Google Analytics components.
- Keeps draft text and review questions in a typed content module.
- Returns `notFound()` while the status is draft, the effective date is missing, any review note remains, or a section has no text. No footer link or sitemap entry is added while the policy is incomplete.

## Current facts

The website source provides the business name DeviaTech, Lahore location, and public contact hello@deviatech.com. Its forms collect contact and enquiry details. The API route is configured to send submissions through Resend. It reads a client IP header for rate limiting. The main site includes Google Analytics, loaded after interaction, with page/link and form events.

The owner confirms that a DeviaTech OTP backend has not yet been built. The draft therefore does not claim active OTP delivery, code storage, verification, or deletion. Manual Meta testing and any information it processes still need to be confirmed. No statement that the app collects no data has been made.

These findings are based on source inspection at `42eb55c3f9e2fe6134df620f3cbd99c2aff49dec`, not a runtime infrastructure audit. A configured integration does not prove every live setting or business practice.

## Decisions required

1. Confirm the legal operator/address and the services covered. The owner requested a general DeviaTech customer policy, without saying it was written to satisfy a platform. OTP details should appear only where actual processing makes them relevant.
2. Confirm any manual Meta test data: what was entered/received, who can access it, its purpose, and its retention/deletion process.
3. Verify hosting, Resend/mailbox configuration, analytics/cookie settings and consent, provider locations, recipients, and any other uses or sharing.
4. Supply actual retention periods or criteria for enquiries, email copies, analytics, server logs/backups, and test data. The contact rate limiter's ten-minute counting window is not a guaranteed deletion deadline.
5. Approve the privacy/deletion request channel, responsible person, and real procedure. The existing public email is proposed, not yet approved as a deletion service.
6. Approve completed wording and the effective date. Check applicable legal requirements before publication; this draft makes no claim of legal compliance or Meta acceptance.

## Source references

- `src/content/site.ts`
- `src/app/api/contact/route.ts`
- `src/components/analytics/DeferredAnalytics.tsx`
- `src/components/analytics/AnalyticsEvents.tsx`
- `src/features/therapist-landing/components/PreviewRequestForm.tsx`
- `src/lib/whatsapp.ts`
- `.github/workflows/deploy.yml`

## Meta requirements checked separately

Meta's official [Platform Terms](https://developers.facebook.com/terms/), section 4, were read on 8 November 2026; the page shows an update date of 3 February 2026. This checklist belongs in the review notes, not in the customer-facing policy's explanation of its purpose.

- The policy must have a working public URL that users and Meta's crawlers can reach, without geographic blocking. The URL must be entered in the app dashboard's privacy field.
- It must explain the actual data processed, processing methods, purposes, and how all users who can access the app can request deletion.
- Actual processing must match the policy and applicable rules. The policy cannot override Meta's applicable terms.

The draft does not yet meet those operational requirements: the page is held unavailable, the final data handling and retention/deletion procedures are unresolved, and no dashboard URL has been submitted. A general customer policy can still describe relevant WhatsApp processing once verified; it does not need to announce that it was prepared for Meta. No wording can guarantee acceptance or cure separate app/account restrictions.

## Release and validation

Pushes to `main` trigger the existing build-and-deploy workflow. This draft PR must remain unmerged until the content and release are approved.

After review, replace unresolved sections with supported wording, remove review notes, set the approved date/status, and add a footer link and sitemap entry. Run lint, TypeScript, a production build, and desktop/mobile checks. Verify the legal page does not load the marketing analytics components.

After an authorized deployment, verify the deployed commit, public HTTPS response, approved content, canonical URL, no login/geo-block, and crawler access. Only then put the verified URL in Meta.

Validation so far: static source review only. Full repository lint, TypeScript, production build, browser rendering, and public deployment checks have not been run. This PR does not establish a working public Privacy Policy URL.
