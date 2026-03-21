"use client";

import React from "react";
import { HolographicCard } from "@/components/flexui/holographic-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { HolographicCard } from "@/components/flexui/holographic-card";

export function Demo() {
  return (
    <HolographicCard className="max-w-sm p-8">
      <h3 className="text-lg font-bold text-white">Holographic Card</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Hover to reveal a rainbow holographic foil effect that shifts
        with your cursor angle. Pure CSS — no WebGL required.
      </p>
    </HolographicCard>
  );
}`;

export function HolographicCardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Hover over the card to see the holographic rainbow foil shift with your
        cursor. Built with CSS conic-gradient and custom properties.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <HolographicCard className="max-w-sm p-8">
              <h3 className="text-lg font-bold text-white">Holographic Card</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Hover to reveal a rainbow holographic foil effect that shifts
                with your cursor angle. Pure CSS — no WebGL required.
              </p>
            </HolographicCard>
          </div>
        }
        code={code}
        filename="holographic-card-demo.tsx"
      />
    </div>
  );
}
