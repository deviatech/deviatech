import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
const size = { width: 1200, height: 630 };

// A regular route keeps the public image URL stable across Next.js builds.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response(null, { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F3F4EE",
          color: "#16213E",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: "#B4552F", display: "flex", fontSize: 28, letterSpacing: 4 }}>
          DEVIATECH / NOTES
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {post.title}
        </div>
        <div style={{ color: "#45516E", display: "flex", fontSize: 28 }}>
          Software, stores, and products built in Lahore.
        </div>
      </div>
    ),
    { ...size, headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } },
  );
}
