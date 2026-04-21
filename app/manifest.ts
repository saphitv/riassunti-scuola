import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Appunti",
    short_name: "Appunti",
    description: "Riassunti per gli esami universitari",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#ffffff",
    lang: "it",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
