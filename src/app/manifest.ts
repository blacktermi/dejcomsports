import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Djecom Sports — Agence de Marketing Sportif",
    short_name: "Djecom Sports",
    description:
      "Agence de marketing sportif à Québec. Création de contenus narratifs et gestion des réseaux sociaux pour clubs sportifs.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#E8590C",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
