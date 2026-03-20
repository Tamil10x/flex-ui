import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flexui.dev";

  const routes = [
    "",
    "/docs",
    "/docs/introduction",
    "/docs/installation",
    "/docs/changelog",
    "/docs/components",
    "/docs/components/magnetic-button",
    "/docs/components/three-hover-card",
    "/docs/components/floating-panel",
    "/docs/components/interactive-globe",
    "/docs/components/expandable-card",
    "/docs/components/reflective-card",
    "/docs/components/shimmer-button",
    "/docs/components/text-reveal",
    "/docs/components/number-ticker",
    "/docs/components/spotlight-card",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("components/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/docs/components" ? 0.9 : 0.7,
  }));
}
