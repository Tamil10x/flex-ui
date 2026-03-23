"use client";

import React from "react";
import { MovingBorder } from "@/components/flexui/moving-border";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { MovingBorder } from "@/components/flexui/moving-border";

export function Demo() {
  return (
    <MovingBorder>
      <div className="px-8 py-6">
        <h3 className="text-lg font-bold text-white">Moving Border</h3>
        <p className="mt-2 text-sm text-zinc-400">
          A gradient light that continuously travels along the border.
          Pure CSS keyframes — no JavaScript animation loop.
        </p>
      </div>
    </MovingBorder>
  );
}`;

export function MovingBorderPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Watch the gradient light travel along the border of the element. Uses
        CSS keyframes for smooth, GPU-accelerated rotation.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <MovingBorder>
              <div className="px-8 py-6">
                <h3 className="text-lg font-bold text-white">Moving Border</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  A gradient light that continuously travels along the border.
                  Pure CSS keyframes — no JavaScript animation loop.
                </p>
              </div>
            </MovingBorder>
          </div>
        }
        code={code}
        filename="moving-border-demo.tsx"
      />
    </div>
  );
}
