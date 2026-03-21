"use client";

import React from "react";
import { EvolutionHero } from "@/components/flexui/evolution-hero";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { EvolutionHero } from "@/components/flexui/evolution-hero";

export function Demo() {
  return (
    <EvolutionHero
      imageSrc="/evolution-scene.jpg"
      headline="Evolution Unleashed"
      subtitle="From Primal Roots to AI Mastery. The Future of SaaS is Here."
      stages={["Primal Ape", "Early Human", "Modern Programmer", "Digital Mind"]}
    >
      <div className="flex gap-4">
        <button className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-black">
          Get Started
        </button>
        <button className="rounded-xl border border-white/20 px-8 py-3 text-sm font-semibold text-white">
          Learn More
        </button>
      </div>
    </EvolutionHero>
  );
}`;

export function EvolutionHeroPlayground() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="w-full">
          <EvolutionHero
            imageSrc="/evolution-scene.jpg"
            headline="Evolution Unleashed"
            subtitle="From Primal Roots to AI Mastery. The Future of SaaS is Here."
            stages={["Primal Ape", "Early Human", "Modern Programmer", "Digital Mind"]}
          >
            <div className="flex gap-4">
              <button className="rounded-xl bg-white/90 px-8 py-3 text-sm font-bold text-black transition-shadow hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.3)]">
                Get Started
              </button>
              <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                Learn More
              </button>
            </div>
          </EvolutionHero>
        </div>
      }
      code={code}
      filename="evolution-hero-demo.tsx"
    />
  );
}
