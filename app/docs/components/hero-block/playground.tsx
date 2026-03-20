"use client";

import React from "react";
import { HeroBlock } from "@/components/flexui/hero-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { HeroBlock } from "@/components/flexui/hero-block";

export function Demo() {
  return (
    <HeroBlock
      badge="Introducing FlexUI v1.0"
      headline={
        <>
          Build beautiful interfaces{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            at lightning speed
          </span>
        </>
      }
      subtitle="A collection of animated, dark-themed React components built with Framer Motion and Tailwind CSS."
      primaryCta={{ label: "Get Started", href: "/docs" }}
      secondaryCta={{ label: "View on GitHub", href: "#" }}
    />
  );
}`;

export function HeroBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        A full hero section with staggered fade-in animations, a gradient badge,
        dual CTA buttons, and an optional dot-grid background pattern.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            <HeroBlock
              badge="Introducing FlexUI v1.0"
              headline={
                <>
                  Build beautiful interfaces{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    at lightning speed
                  </span>
                </>
              }
              subtitle="A collection of animated, dark-themed React components built with Framer Motion and Tailwind CSS."
              primaryCta={{ label: "Get Started", href: "#" }}
              secondaryCta={{ label: "View on GitHub", href: "#" }}
            />
          </div>
        }
        code={code}
        filename="hero-block-demo.tsx"
      />
    </div>
  );
}
