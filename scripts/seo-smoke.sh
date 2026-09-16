#!/usr/bin/env bash
#
# SEO smoke test — read-only regression checks for the therapist service
# pages, the Luma demo subdomain, and the apex robots/sitemap pair.
#
# It only ever issues GET requests. It never submits a form, requests
# indexing, or mutates anything external.
#
# Both public hosts are exercised against a single origin by sending an
# explicit Host header, which is how Cloudflare presents them to the app:
#
#   deviatech.com          — indexable DeviaTech site + therapist landings
#   preview.deviatech.com  — noindex Luma demo
#
# Usage:
#   npm run seo:smoke                         # against a local prod build
#   SEO_SMOKE_ORIGIN=https://deviatech.com npm run seo:smoke
#
# Against the default local origin, start the server first:
#   npm run build && PORT=3199 npm run start
#
# When SEO_SMOKE_ORIGIN points at production, the Host header is already
# correct for the apex, and the demo checks are sent to the real preview
# host instead of being spoofed.
#
# Exits non-zero if any check fails.

set -euo pipefail

ORIGIN="${SEO_SMOKE_ORIGIN:-http://127.0.0.1:3199}"
TIMEOUT="${SEO_SMOKE_TIMEOUT:-30}"

APEX_HOST="deviatech.com"
DEMO_HOST="preview.deviatech.com"

if ! command -v curl >/dev/null 2>&1; then
  echo "error: curl is required but was not found on PATH" >&2
  exit 2
fi

pass=0
fail=0

# Where a given host's requests actually go. Locally everything goes to the
# one dev origin and the Host header does the routing. Against a real
# deployment each host is its own origin, so spoofing would test nothing.
target_origin() {
  case "$ORIGIN" in
    http://127.0.0.1*|http://localhost*)
      echo "$ORIGIN" ;;
    *)
      if [ "$1" = "$DEMO_HOST" ]; then echo "https://$DEMO_HOST"; else echo "$ORIGIN"; fi ;;
  esac
}

fetch() { # host path [extra curl args...]
  local host="$1" path="$2"; shift 2
  curl -sS --max-time "$TIMEOUT" -H "Host: $host" "$@" "$(target_origin "$host")$path"
}

status_of() { # host path
  fetch "$1" "$2" -o /dev/null -w '%{http_code}'
}

report() { # label expected actual
  if [ "$2" = "$3" ]; then
    printf '  PASS  %s\n' "$1"
    pass=$((pass + 1))
  else
    printf '  FAIL  %s — expected [%s] got [%s]\n' "$1" "$2" "$3"
    fail=$((fail + 1))
  fi
}

# grep -c, but never non-zero-exit under `set -e` when there are no matches.
count() { grep -c "$1" <<<"${2:-}" || true; }
count_i() { grep -ci "$1" <<<"${2:-}" || true; }

echo "SEO smoke test"
echo "  origin:  $ORIGIN"
echo "  timeout: ${TIMEOUT}s"
echo

echo "=== apex robots.txt and sitemap.xml (must stay as they are) ==="
report "apex /robots.txt is 200" "200" "$(status_of "$APEX_HOST" /robots.txt)"
apex_robots="$(fetch "$APEX_HOST" /robots.txt)"
report "apex robots.txt allows crawling" "1" "$(count '^Allow: /' "$apex_robots")"
report "apex robots.txt declares the apex sitemap" "1" \
  "$(count "^Sitemap: https://deviatech.com/sitemap.xml" "$apex_robots")"

report "apex /sitemap.xml is 200" "200" "$(status_of "$APEX_HOST" /sitemap.xml)"
apex_sitemap="$(fetch "$APEX_HOST" /sitemap.xml)"
report "apex sitemap is a urlset document" "1" "$(count '<urlset' "$apex_sitemap")"
report "apex sitemap declares XML" "1" "$(count '<?xml version=' "$apex_sitemap")"
for loc in \
  "https://deviatech.com/therapist-website-design" \
  "https://deviatech.com/fa/therapist-website-design" \
  "https://deviatech.com/ur/therapist-website-design"; do
  report "apex sitemap lists $loc" "1" "$(count "<loc>$loc</loc>" "$apex_sitemap")"
done
report "apex sitemap excludes demo URLs" "0" \
  "$(count_i 'therapist-demo\|preview\.deviatech\.com' "$apex_sitemap")"
report "apex sitemap excludes thank-you URLs" "0" "$(count_i 'thank-you' "$apex_sitemap")"

echo
echo "=== demo host robots.txt and sitemap.xml ==="
report "demo /robots.txt is 200" "200" "$(status_of "$DEMO_HOST" /robots.txt)"
demo_robots="$(fetch "$DEMO_HOST" /robots.txt)"
report "demo robots.txt allows crawling (so noindex stays readable)" "1" \
  "$(count '^Allow: /' "$demo_robots")"
report "demo robots.txt declares no sitemap" "0" "$(count_i 'sitemap' "$demo_robots")"
report "demo /sitemap.xml is 404" "404" "$(status_of "$DEMO_HOST" /sitemap.xml)"

echo
echo "=== therapist landings: indexable, canonical, hreflang, lang/dir ==="
check_landing() { # path lang dir canonical
  local path="$1" lang="$2" dir="$3" canonical="$4" html
  report "landing $path is 200" "200" "$(status_of "$APEX_HOST" "$path")"
  html="$(fetch "$APEX_HOST" "$path")"
  report "landing $path is index,follow" "1" \
    "$(count 'name="robots" content="index, follow' "$html")"
  report "landing $path self-canonical" "1" \
    "$(count "rel=\"canonical\" href=\"$canonical\"" "$html")"
  report "landing $path is <html lang=\"$lang\" dir=\"$dir\">" "1" \
    "$(count "<html lang=\"$lang\" dir=\"$dir\">" "$html")"
  report "landing $path has one <h1>" "1" "$(count '<h1' "$html")"
  # Reciprocal hreflang: every locale plus x-default, on every locale.
  for alt in \
    'hrefLang="en" href="https://deviatech.com/therapist-website-design"' \
    'hrefLang="fa" href="https://deviatech.com/fa/therapist-website-design"' \
    'hrefLang="ur" href="https://deviatech.com/ur/therapist-website-design"' \
    'hrefLang="x-default" href="https://deviatech.com/therapist-website-design"'; do
    report "landing $path alternate ${alt%% *}" "1" "$(count "$alt" "$html")"
  done
}

check_landing /therapist-website-design en ltr \
  "https://deviatech.com/therapist-website-design"
check_landing /fa/therapist-website-design fa rtl \
  "https://deviatech.com/fa/therapist-website-design"
check_landing /ur/therapist-website-design ur rtl \
  "https://deviatech.com/ur/therapist-website-design"

echo
echo "=== therapist thank-you pages stay noindex ==="
for path in \
  /therapist-website-design/thank-you \
  /fa/therapist-website-design/thank-you \
  /ur/therapist-website-design/thank-you; do
  report "thank-you $path is noindex" "1" \
    "$(count 'name="robots" content="noindex, follow"' "$(fetch "$APEX_HOST" "$path")")"
done

echo
echo "=== Luma demo stays noindex and canonicalized to the preview host ==="
check_demo() { # path lang dir canonical
  local path="$1" lang="$2" dir="$3" canonical="$4" html
  report "demo $path is 200" "200" "$(status_of "$DEMO_HOST" "$path")"
  html="$(fetch "$DEMO_HOST" "$path")"
  report "demo $path is noindex, follow" "1" \
    "$(count 'name="robots" content="noindex, follow"' "$html")"
  report "demo $path canonical is $canonical" "1" \
    "$(count "rel=\"canonical\" href=\"$canonical\"" "$html")"
  report "demo $path is <html lang=\"$lang\" dir=\"$dir\">" "1" \
    "$(count "<html lang=\"$lang\" dir=\"$dir\">" "$html")"
  report "demo $path emits no JSON-LD" "0" \
    "$(count 'application/ld+json' "$html")"
}

check_demo / en ltr "https://preview.deviatech.com/"
check_demo /fa fa rtl "https://preview.deviatech.com/fa"
check_demo /ur ur rtl "https://preview.deviatech.com/ur"
check_demo /about en ltr "https://preview.deviatech.com/about"

echo
echo "=== control routes: unrelated site and store behaviour unchanged ==="
for path in / /blog /case-studies /contact /about /shopify-development-lahore; do
  report "control $path is 200" "200" "$(status_of "$APEX_HOST" "$path")"
done
report "control /blog is indexable" "0" \
  "$(count_i 'name="robots" content="noindex' "$(fetch "$APEX_HOST" /blog)")"
report "demo host serves its manifest" "200" "$(status_of "$DEMO_HOST" /manifest.webmanifest)"

echo
echo "-------------------------------------------"
printf 'RESULT: %d passed, %d failed\n' "$pass" "$fail"

if [ "$fail" -ne 0 ]; then
  exit 1
fi
