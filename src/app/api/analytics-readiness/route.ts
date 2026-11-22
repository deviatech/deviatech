// Older browser documents use the direct sender and must never opt in.
export function GET() {
  return Response.json({ enabled: false }, { headers: { "Cache-Control": "private, no-store" } });
}
