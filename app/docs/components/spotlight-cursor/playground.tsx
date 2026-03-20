"use client";

import React from "react";
import { SpotlightCursor } from "@/components/flexui/spotlight-cursor";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { SpotlightCursor } from "@/components/flexui/spotlight-cursor";

export function Demo() {
  return (
    <div className="relative min-h-screen bg-zinc-950">
      <SpotlightCursor />
      <h1 className="text-white">Your content here</h1>
    </div>
  );
}`;

export function SpotlightCursorPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Move your mouse around the preview area. A subtle radial gradient
        spotlight illuminates the content beneath your cursor.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            <SpotlightCursor />
            <div className="relative z-10 text-center">
              <h3 className="text-lg font-bold text-white">
                Spotlight Cursor
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Move your mouse to illuminate the area beneath it.
              </p>
            </div>
          </div>
        }
        code={code}
        filename="spotlight-cursor-demo.tsx"
      />
    </div>
  );
}
