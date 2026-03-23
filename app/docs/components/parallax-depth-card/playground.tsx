"use client";

import React from "react";
import { ParallaxDepthCard } from "@/components/flexui/parallax-depth-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { ParallaxDepthCard } from "@/components/flexui/parallax-depth-card";

export function Demo() {
  return (
    <ParallaxDepthCard className="max-w-sm">
      <ParallaxDepthCard.Layer depth={0.3} className="p-6 pb-0">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
          Background Layer
        </span>
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={1} className="p-6 pt-3">
        <h3 className="text-lg font-bold text-white">Parallax Depth</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Each layer moves at different speeds. Move your
          cursor to feel the depth.
        </p>
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={1.8} className="px-6 pb-6">
        <div className="mt-3 inline-flex rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-300">
          Foreground — moves most
        </div>
      </ParallaxDepthCard.Layer>
    </ParallaxDepthCard>
  );
}`;

export function ParallaxDepthCardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Hover over the card and move your cursor — each layer shifts at a
        different speed based on its depth. The card also tilts in 3D perspective.
        Move fast to see the layers separate.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[350px] w-full items-center justify-center">
            <ParallaxDepthCard className="max-w-sm">
              <ParallaxDepthCard.Layer depth={0.3} className="p-6 pb-0">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Background Layer
                </span>
              </ParallaxDepthCard.Layer>
              <ParallaxDepthCard.Layer depth={1} className="p-6 pt-3">
                <h3 className="text-lg font-bold text-white">Parallax Depth</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Each layer moves at different speeds. Move your cursor to feel
                  the depth.
                </p>
              </ParallaxDepthCard.Layer>
              <ParallaxDepthCard.Layer depth={1.8} className="px-6 pb-6">
                <div className="mt-3 inline-flex rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-300">
                  Foreground — moves most
                </div>
              </ParallaxDepthCard.Layer>
            </ParallaxDepthCard>
          </div>
        }
        code={code}
        filename="parallax-depth-card-demo.tsx"
      />
    </div>
  );
}
