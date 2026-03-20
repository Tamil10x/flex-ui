"use client";

import React from "react";
import { SpotlightCard } from "@/components/flexui/spotlight-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { SpotlightCard } from "@/components/flexui/spotlight-card";

export function Demo() {
  return (
    <SpotlightCard className="max-w-sm p-8">
      <h3 className="text-lg font-bold text-white">Spotlight Card</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Hover to reveal a cursor-following radial spotlight effect.
        Pure CSS + Framer Motion — no WebGL required.
      </p>
    </SpotlightCard>
  );
}`;

export function SpotlightCardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Hover over the card to see the spotlight track your cursor. No 3D, no
        WebGL — just Framer Motion springs and CSS radial gradients.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <SpotlightCard className="max-w-sm p-8">
              <h3 className="text-lg font-bold text-white">Spotlight Card</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Hover to reveal a cursor-following radial spotlight effect. Pure
                CSS + Framer Motion — no WebGL required.
              </p>
            </SpotlightCard>
          </div>
        }
        code={code}
        filename="spotlight-card-demo.tsx"
      />
    </div>
  );
}
