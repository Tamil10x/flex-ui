"use client";

import React from "react";
import { Zap, ArrowRight } from "lucide-react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { MorphingCard } from "@/components/flexui/morphing-card";

const code = `import { MorphingCard } from "@/components/flexui/morphing-card";

export function Demo() {
  return (
    <MorphingCard
      collapsed={
        <div>
          <span className="badge">New Feature</span>
          <h3 className="text-lg font-semibold text-white">
            Morphing Card
          </h3>
          <p className="text-sm text-zinc-500">Click to expand</p>
        </div>
      }
      expanded={
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Morphing Card
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            This card smoothly morphs between collapsed and expanded
            states using layout animation with spring physics.
          </p>
          <p className="text-xs text-zinc-500">Click to collapse</p>
        </div>
      }
    />
  );
}`;

export function MorphingCardPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <MorphingCard
              collapsedClassName="w-64"
              expandedClassName="w-96"
              collapsed={
                <div>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 mb-2.5">
                    <Zap className="h-3 w-3" />
                    New Feature
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    Morphing Card
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Click to expand
                  </p>
                </div>
              }
              expanded={
                <div>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 mb-2.5">
                    <Zap className="h-3 w-3" />
                    New Feature
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Morphing Card
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    This card smoothly morphs between collapsed and expanded
                    states using layout animation. The container resizes with
                    spring physics while content crossfades.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <ArrowRight className="h-3 w-3" />
                    Click to collapse
                  </div>
                </div>
              }
            />
          </div>
        }
        code={code}
        filename="morphing-card-demo.tsx"
      />
    </div>
  );
}
