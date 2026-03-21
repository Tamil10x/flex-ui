"use client";

import React from "react";
import { FlickeringGrid } from "@/components/flexui/flickering-grid";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { FlickeringGrid } from "@/components/flexui/flickering-grid";

export function Demo() {
  return (
    <FlickeringGrid
      cellSize={8}
      color="rgba(139,92,246,0.3)"
      speed={3}
      density={0.15}
      gap={2}
      className="h-[300px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-semibold text-white">
          Flickering Grid
        </p>
      </div>
    </FlickeringGrid>
  );
}`;

export function FlickeringGridPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        A canvas-rendered grid of cells that randomly flicker on and off with
        smooth opacity transitions.
      </p>
      <PreviewCodeTabs
        preview={
          <FlickeringGrid
            cellSize={8}
            color="rgba(139,92,246,0.3)"
            speed={3}
            density={0.15}
            gap={2}
            className="flex min-h-[300px] w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950"
          >
            <div className="flex h-full items-center justify-center">
              <p className="text-lg font-semibold text-white">
                Flickering Grid
              </p>
            </div>
          </FlickeringGrid>
        }
        code={code}
        filename="flickering-grid-demo.tsx"
      />
    </div>
  );
}
