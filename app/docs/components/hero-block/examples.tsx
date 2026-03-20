"use client";

import React from "react";
import { HeroBlock } from "@/components/flexui/hero-block";

function MinimalExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <HeroBlock
        headline="Simple and Minimal"
        subtitle="A hero section with just a headline and subtitle. No badge, no buttons, no grid."
        showGrid={false}
        className="min-h-[50vh]"
      />
    </div>
  );
}

function WithBadgeAndCtaExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <HeroBlock
        badge="New Release"
        headline={
          <>
            Ship faster with{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              modern tools
            </span>
          </>
        }
        subtitle="Beautifully designed components that you can copy and paste into your apps."
        primaryCta={{ label: "Browse Components", href: "#" }}
        secondaryCta={{ label: "Documentation", href: "#" }}
        className="min-h-[50vh]"
      />
    </div>
  );
}

function WithChildrenExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <HeroBlock
        badge="Trusted by 10,000+ developers"
        headline="The React component library you deserve"
        subtitle="Copy-paste components with animations baked in. Dark theme, accessible, production-ready."
        primaryCta={{ label: "Get Started Free", href: "#" }}
        className="min-h-[50vh]"
      >
        <div className="flex items-center justify-center gap-8">
          {["Next.js", "React", "Tailwind", "Framer Motion"].map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </HeroBlock>
    </div>
  );
}

export function HeroBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <MinimalExample />
        <p className="text-xs text-zinc-500">Minimal — headline and subtitle only</p>
      </div>
      <div className="flex flex-col gap-3">
        <WithBadgeAndCtaExample />
        <p className="text-xs text-zinc-500">Badge + gradient headline + dual CTAs</p>
      </div>
      <div className="flex flex-col gap-3">
        <WithChildrenExample />
        <p className="text-xs text-zinc-500">With children content below CTAs</p>
      </div>
    </div>
  );
}
