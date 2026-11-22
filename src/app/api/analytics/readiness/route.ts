// Checked at runtime in the production container, not embedded in the image.
// Leave unset until the GA4 web stream changes in docs/ga4-rollout.md are verified.
export function GET() {
  return Response.json(
    { enabled: process.env.GA4_RELAY_READY === "true" },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
