import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
          {post?.title ?? "DeviaTech Blog"}
        </div>
        <div style={{ color: "#45516E", display: "flex", fontSize: 28 }}>
          Software, stores, and products built in Lahore.
        </div>
      </div>
    ),
    { ...size },
  );
}
