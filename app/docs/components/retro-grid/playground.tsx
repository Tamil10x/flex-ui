"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { RetroGrid } from "@/components/flexui/retro-grid";

const code = `import { RetroGrid } from "@/components/flexui/retro-grid";

export function Demo() {
  return (
    <RetroGrid className="h-[400px] rounded-2xl border border-white/[0.08] bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <h2 className="text-3xl font-bold text-white">
          Welcome to the Grid
        </h2>
      </div>
    </RetroGrid>
  );
}`;

export function RetroGridPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <RetroGrid className="flex min-h-[400px] items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950">
            <div className="flex h-full items-center justify-center">
              <h2 className="text-3xl font-bold text-white">
                Welcome to the Grid
              </h2>
            </div>
          </RetroGrid>
        }
        code={code}
        filename="retro-grid-demo.tsx"
      />
    </div>
  );
}
