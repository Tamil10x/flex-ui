import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flexui.dev";

  const routes = [
    "",
    "/studio",
    "/docs",
    "/docs/introduction",
    "/docs/installation",
    "/docs/changelog",
    "/docs/components",
    // Buttons
    "/docs/components/magnetic-button",
    "/docs/components/shimmer-button",
    "/docs/components/glow-button",
    "/docs/components/ripple-button",
    "/docs/components/gradient-border-button",
    "/docs/components/confetti-button",
    // Cards
    "/docs/components/three-hover-card",
    "/docs/components/spotlight-card",
    "/docs/components/expandable-card",
    "/docs/components/reflective-card",
    "/docs/components/morphing-card",
    // Text Animations
    "/docs/components/text-reveal",
    "/docs/components/number-ticker",
    "/docs/components/typewriter-text",
    "/docs/components/gradient-text",
    "/docs/components/flip-words",
    "/docs/components/wavy-text",
    "/docs/components/text-scramble",
    "/docs/components/blur-text",
    "/docs/components/split-text",
    "/docs/components/rotating-text",
    // Background Effects
    "/docs/components/aurora-background",
    "/docs/components/particle-field",
    "/docs/components/grid-pattern",
    "/docs/components/dot-pattern",
    "/docs/components/beams-background",
    "/docs/components/stars-background",
    "/docs/components/mesh-gradient",
    "/docs/components/wavy-background",
    // Scroll Effects
    "/docs/components/parallax-scroll",
    "/docs/components/sticky-scroll-reveal",
    "/docs/components/scroll-progress",
    "/docs/components/fade-on-scroll",
    "/docs/components/scroll-counter",
    // Cursor Effects
    "/docs/components/follow-cursor",
    "/docs/components/blob-cursor",
    "/docs/components/spotlight-cursor",
    // Layout & Navigation
    "/docs/components/floating-panel",
    "/docs/components/animated-tabs",
    "/docs/components/marquee",
    "/docs/components/drawer",
    "/docs/components/toast",
    "/docs/components/dock-menu",
    "/docs/components/floating-navbar",
    "/docs/components/morphing-dialog",
    // Inputs
    "/docs/components/animated-input",
    "/docs/components/otp-input",
    // Page Blocks
    "/docs/components/hero-block",
    "/docs/components/pricing-block",
    "/docs/components/testimonials-block",
    "/docs/components/features-block",
    "/docs/components/cta-block",
    // Data Viz
    "/docs/components/sparkline-chart",
    "/docs/components/kpi-card",
    "/docs/components/progress-ring",
    // Search
    "/docs/components/search-spotlight",
    // WebGL
    "/docs/components/interactive-globe",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("components/") ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/docs/components" ? 0.9 : 0.7,
  }));
}
