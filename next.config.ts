import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Consolidated duplicate blog posts (SEO: keyword cannibalization fix).
      {
        source: "/blog/five-things-before-shopify-launch",
        destination: "/blog/shopify-cod-payments-meta-pixel-checklist",
        statusCode: 301,
      },
      {
        source: "/blog/what-an-mvp-actually-needs",
        destination: "/blog/mvp-development-cost-timeline",
        statusCode: 301,
      },
      // /index.html is a legacy static-site artifact; Google Search Console
      // flagged it as a 404. It's effectively the homepage.
      {
        source: "/index.html",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
