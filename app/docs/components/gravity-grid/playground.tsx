"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { GravityGrid } from "@/components/flexui/gravity-grid";

const code = `import { GravityGrid } from "@/components/flexui/gravity-grid";

export function Demo() {
  return (
    <GravityGrid
      cols={12}
      rows={8}
      className="flex min-h-[400px] items-center justify-center rounded-2xl bg-black"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Gravity Grid</h1>
        <p className="mt-2 text-zinc-400">Move your cursor over the dots.</p>
      </div>
    </GravityGrid>
  );
}`;

export function GravityGridPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <GravityGrid
            cols={12}
            rows={8}
            className="flex min-h-[400px] w-full items-center justify-center rounded-2xl bg-black"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Gravity Grid
              </h1>
              <p className="mt-2 text-zinc-400">
                Move your cursor over the dots.
              </p>
            </div>
          </GravityGrid>
        }
        code={code}
        filename="gravity-grid-demo.tsx"
      />
    </div>
  );
}
