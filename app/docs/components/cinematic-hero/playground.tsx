"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { CinematicHero } from "@/components/flexui/cinematic-hero";

const code = `import { CinematicHero } from "@/components/flexui/cinematic-hero";

export function Demo() {
  return (
    <CinematicHero
      headline="Build Stunning Interfaces"
      subtitle="Drop-in React components with cinematic animations, built for the modern web."
      background="particles"
      badge="Now in Beta"
      primaryCta={{ label: "Get Started", href: "#" }}
      secondaryCta={{ label: "View on GitHub", href: "#" }}
    />
  );
}`;

export function CinematicHeroPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
            <CinematicHero
              headline="Build Stunning Interfaces"
              subtitle="Drop-in React components with cinematic animations, built for the modern web."
              background="particles"
              badge="Now in Beta"
              primaryCta={{ label: "Get Started", href: "#" }}
              secondaryCta={{ label: "View on GitHub", href: "#" }}
              className="min-h-[600px]"
            />
          </div>
        }
        code={code}
        filename="cinematic-hero-demo.tsx"
      />
    </div>
  );
}
