"use client";

import React from "react";
import { WobbleCard } from "@/components/flexui/wobble-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Zap } from "lucide-react";

const demoCode = `import { WobbleCard } from "@/components/flexui/wobble-card";

export function Demo() {
  return (
    <WobbleCard className="max-w-xs">
      <div className="space-y-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 text-lg font-bold text-white">
          W
        </div>
        <h3 className="text-lg font-semibold text-white">Wobble Card</h3>
        <p className="text-sm text-zinc-400">
          Hover and move your cursor to see the wobbly spring animation.
        </p>
      </div>
    </WobbleCard>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center">
          <WobbleCard className="max-w-xs">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Wobble Card</h3>
              <p className="text-sm text-zinc-400">
                Hover and move your cursor over this card to see the wobbly spring animation. It bounces back when you leave.
              </p>
            </div>
          </WobbleCard>
        </div>
      }
      code={demoCode}
      filename="wobble-card-demo.tsx"
    />
  );
}
