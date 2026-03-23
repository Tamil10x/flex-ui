"use client";

import React from "react";
import { LiquidGlassButton } from "@/components/flexui/liquid-glass-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { LiquidGlassButton } from "@/components/flexui/liquid-glass-button";

export function Demo() {
  return (
    <LiquidGlassButton>
      Get Started
    </LiquidGlassButton>
  );
}`;

export function LiquidGlassButtonPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Hover to see liquid refraction distortion — a white light spot and
        colored caustic glow follow your cursor. The surface subtly warps
        via skew transforms. Click for spring tap feedback.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] w-full items-center justify-center gap-6">
            <LiquidGlassButton>Get Started</LiquidGlassButton>
            <LiquidGlassButton tintColor="59,130,246">
              Learn More
            </LiquidGlassButton>
          </div>
        }
        code={code}
        filename="liquid-glass-button-demo.tsx"
      />
    </div>
  );
}
