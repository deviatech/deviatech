import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeviaTech Agency",
    short_name: "DeviaTech",
    description: "Custom software development agency in Lahore, Pakistan",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F4EE",
    theme_color: "#16213E",
    orientation: "portrait-primary",
    icons: [
      { src: "/logo/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["business", "productivity"],
    lang: "en",
    dir: "ltr",
  };
}
