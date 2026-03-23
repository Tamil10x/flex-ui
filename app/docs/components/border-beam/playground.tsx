"use client";

import React from "react";
import { BorderBeam } from "@/components/flexui/border-beam";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { BorderBeam } from "@/components/flexui/border-beam";

export function Demo() {
  return (
    <BorderBeam>
      <div className="px-8 py-6">
        <h3 className="text-lg font-bold text-white">Border Beam</h3>
        <p className="mt-2 text-sm text-zinc-400">
          A continuous animated light beam that travels around the border.
          Pure CSS — no JavaScript animation loop.
        </p>
      </div>
    </BorderBeam>
  );
}`;

export function BorderBeamPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Watch the light beam travel around the border. Uses CSS keyframes for
        smooth, GPU-accelerated rotation with a glow trail.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <BorderBeam>
              <div className="px-8 py-6">
                <h3 className="text-lg font-bold text-white">Border Beam</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  A continuous animated light beam that travels around the border.
                  Pure CSS — no JavaScript animation loop.
                </p>
              </div>
            </BorderBeam>
          </div>
        }
        code={code}
        filename="border-beam-demo.tsx"
      />
    </div>
  );
}
