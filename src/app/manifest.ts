import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Md Al Amin Islam — Portfolio",
    short_name: "Al Amin Portfolio",
    description: "Shopify App & Theme Developer Portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#060913",
    theme_color: "#060913",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
