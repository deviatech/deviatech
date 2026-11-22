# DeviaTech GA4: production activation checklist

This change is phase 1 (consent and reliable page views), not a lead-measurement release. The production property and destination remain **547288082**, web stream **15334902095**, **G-15GFH194BP**.

## Before turning collection on

1. Deploying the code with `GA4_RELAY_READY` unset, false, unreachable or malformed does **not** load Google Analytics. The server reads this value at request time; it is not a public build-time toggle. Only set it to the literal `true` in the production runtime after the remaining checks here. Confirm `GET /api/analytics/readiness` reports the expected boolean with no-store caching. No configuration or deployment is performed by this draft PR.
2. In GA4 Admin → Data streams → DeviaTech web → Enhanced measurement, switch **Enhanced measurement off for this web stream** before enabling the runtime gate. This workflow sends only manual sanitized page views. Disabling the master switch prevents the enabled history, outbound click, site search, form interaction, scroll, and other enhanced events from creating duplicate or unsanitized events. The GA4 'Page loads' control is not the same as that history switch: this code sends `send_page_view: false` on initialization. Do not use both automatic route tracking and these manual events. [Google's pageview documentation](https://developers.google.com/analytics/devguides/collection/ga4/views#disable_page_changes_based_on_browser_history_events)
3. Obtain approval for these GA4/production configuration changes as a separate step. Keep the existing internal traffic filter unchanged unless separately approved. Confirm that no second tag or shared container is sending to this destination, and that related advertising destinations are not linked to this tag.
4. When approved, set the runtime gate and verify with Tag Assistant / DebugView on the production hostname: no tag or pings before consent, exactly one initial `page_view` after consent, one per actual route including back/forward, none on query/hash-only changes, none after decline/revocation. Check the tag and collect requests in browser developer tools for absence of raw query, hash and external referrer; confirm Realtime sees the test on the expected property. Do not use real leads in testing. If the length or contents of requests differ from expectation, turn the runtime gate off and investigate. Tabs already active when a gate changes need to be reloaded to observe the new setting (and tab-local withdrawal remains immediate).

## Privacy and behavior boundaries

- Website tracking is limited to the exact canonical production origin `https://deviatech.com` and known public site routes. Deploy/localhost previews and the separate demo route group do not initialize the tag.
- The cookie-free, same-origin readiness check controls whether the opt-in UI appears. No tag or Google measurement requests are made before opt-in. A saved preference can still be revoked while readiness is off. Preferences persist locally, synchronize across tabs, and can be reopened in the footer. Revocation disables GA and clears this destination's conventional cookies. Advertising consent stays denied; Google signals and ad personalization are disabled.
- Page/location and event fields use repository-owned static/known route and label data. Do not send form contents, click URLs, query strings, fragments, or raw external referrers. The previous recognized virtual path is used as a sanitized internal referrer.
- **Acquisition attribution is not verified in phase 1.** This deliberately drops UTM query values and external referrers, so standard campaign/source attribution may be missing. For phase 2, evaluate explicitly approved campaign values and normalized known referral origins, never arbitrary URLs or values, and verify final emitted payloads.
- Phase one suppresses all manual interaction events, including contact and preview form events.

## Local regression

Run `npm run analytics:test` for the deterministic state-and-payload checks. Start the production build locally (the browser smoke test intercepts the readiness API). Run `npm run analytics:smoke` with Chromium installed (optionally set `CHROMIUM_PATH` and `LOCAL_ORIGIN`). The test maps the canonical origin to the local server, aborts all unexpected external routes, and stubs the Google tag. It proves the local request and queue contract without generating any production data. It does not prove delivery to GA4; use step 4 for that after approval.

### Candidate first-party relay

The browser SDK targets the same-origin /api/analytics prefix. The application accepts GET and POST with the same-site opt-in cookie at /api/analytics/g/collect and constructs a new request for the fixed Google web collector. The accepted fields are event name, measurement ID, protocol version, bounded GA client ID and canonical page locations from the site's own catalogue. The relay derives the title from the path and discards other SDK fields. It forwards no browser headers, cookies or IP. Upstream redirects and timeouts fail closed. Debug mode and GA session attribution are not verified by this candidate.

Before considering release, verify that ingress access logs, error logs and tracing omit the relay query string and request body. Enforce limits at ingress as well as the process-local 120 accepted requests/minute ceiling. Browser source headers do not authenticate a person. A single client can exhaust this shared budget. Confirm all eligible documents receive the restrictive policy before the SDK can start, including documents already open during activation. Disable the runtime gate and recreate the service to stop forwarding; check readiness and the relay independently. Restore the prior image and environment for a full release rollback.

### Ingress changes for operator review only

Leave GA4_MANUAL_MEASUREMENT_READY false throughout. The legacy /api/analytics-readiness always returns false. Only /api/analytics/readiness and the collector use GA4_RELAY_READY. Recreate the container with the new gate false to stop ingestion from previously enabled tabs. Check both readiness endpoints and verify that a valid relay request returns 404.

The inspected virtual host uses the default access-log format, which records the request line. Its normal upstream is localhost:3011. Before enabling the relay, stage and validate the following scoped Nginx settings. In the http context reserve a dedicated zone:

```nginx
limit_req_zone $binary_remote_addr zone=deviatech_ga4:1m rate=30r/m;
```

In the DeviaTech TLS server only:

```nginx
location ^~ /api/analytics/ {
    access_log off;
    error_log /dev/null;
    client_max_body_size 8k;
    limit_req zone=deviatech_ga4 burst=15 nodelay;
    limit_req_status 429;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_pass http://localhost:3011;
}
```

Verify the trusted real-IP proxy chain and restrict the web container publication to 127.0.0.1:3011:3000 so the relay cannot be reached around ingress. Preserve the old vhost and container before rollout. No production config is installed by this PR. Check external proxy and log-agent redaction independently.

For the single-container rollout check, use a fresh isolated browser with a synthetic numeric GA client ID. Before the test, the operator enters the container and creates a private nextjs-owned directory /tmp/deviatech-ga4-debug (0700) and a file named UTC-minute-SHA256, substituting the epoch minute and the lowercase SHA-256 of that synthetic client ID. Only a validated view for this client in that minute can atomically consume the file. Retries, concurrent views and caller-supplied debug parameters cannot re-arm it. Remove any unused file. Compare one page_view, the exact synthetic canonical page and the timestamp in the correct DebugView. Stop and roll back if missing or duplicated. DebugView receipt and session reports require live verification.
