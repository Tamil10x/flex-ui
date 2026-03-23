"use client";

import React from "react";
import { TiltCard } from "@/components/flexui/tilt-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Sparkles } from "lucide-react";

const demoCode = `import { TiltCard } from "@/components/flexui/tilt-card";

export function Demo() {
  return (
    <TiltCard className="max-w-xs">
      <div className="space-y-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">Interactive Card</h3>
        <p className="text-sm text-zinc-400">
          Hover over this card to see the 3D tilt effect.
        </p>
      </div>
    </TiltCard>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center">
          <TiltCard className="max-w-xs">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Interactive Card</h3>
              <p className="text-sm text-zinc-400">
                Hover over this card to see the 3D tilt effect. Move your cursor around to watch it follow your movement.
              </p>
            </div>
          </TiltCard>
        </div>
      }
      code={demoCode}
      filename="tilt-card-demo.tsx"
    />
  );
}
