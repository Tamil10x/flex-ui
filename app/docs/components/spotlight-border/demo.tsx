"use client";

import React from "react";
import { SpotlightBorder } from "@/components/flexui/spotlight-border";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { SpotlightBorder } from "@/components/flexui/spotlight-border";

<SpotlightBorder>
  <h3 className="text-lg font-semibold text-white">Hover me</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Move your mouse around the border to see the spotlight effect.
  </p>
</SpotlightBorder>

<SpotlightBorder color="139,92,246">
  <h3 className="text-lg font-semibold text-white">Custom Color</h3>
  <p className="mt-2 text-sm text-zinc-400">
    The spotlight color can be customized via the color prop.
  </p>
</SpotlightBorder>`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-wrap items-center justify-center gap-6">
          <SpotlightBorder className="w-72">
            <h3 className="text-lg font-semibold text-white">Hover me</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Move your mouse around the border to see the spotlight effect follow your cursor.
            </p>
          </SpotlightBorder>
          <SpotlightBorder color="139,92,246" className="w-72">
            <h3 className="text-lg font-semibold text-white">Custom Color</h3>
            <p className="mt-2 text-sm text-zinc-400">
              The spotlight color can be customized via the color prop using RGB values.
            </p>
          </SpotlightBorder>
        </div>
      }
      code={demoCode}
      filename="spotlight-border-demo.tsx"
    />
  );
}
