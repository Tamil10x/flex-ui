"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { GridPattern } from "@/components/flexui/grid-pattern";

const code = `import { GridPattern } from "@/components/flexui/grid-pattern";

export function Demo() {
  return (
    <GridPattern
      size={40}
      fade
      className="h-[300px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-semibold text-white">
          Content on top of the grid
        </p>
      </div>
    </GridPattern>
  );
}`;

export function GridPatternPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <GridPattern
            size={40}
            fade
            className="flex min-h-[300px] w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950"
          >
            <div className="flex h-full items-center justify-center">
              <p className="text-lg font-semibold text-white">
                Content on top of the grid
              </p>
            </div>
          </GridPattern>
        }
        code={code}
        filename="grid-pattern-demo.tsx"
      />
    </div>
  );
}
