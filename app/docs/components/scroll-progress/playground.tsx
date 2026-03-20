"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { ScrollProgress } from "@/components/flexui/scroll-progress";

const code = `import { ScrollProgress } from "@/components/flexui/scroll-progress";

export function Demo() {
  return (
    <>
      <ScrollProgress />
      <div className="space-y-96 p-8">
        <h2 className="text-2xl font-bold text-white">
          Scroll down to see the progress bar
        </h2>
        <p className="text-zinc-400">Keep scrolling...</p>
        <p className="text-zinc-400">Almost there...</p>
        <h2 className="text-2xl font-bold text-white">Done!</h2>
      </div>
    </>
  );
}`;

export function ScrollProgressPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="relative min-h-[300px] w-full overflow-y-auto rounded-xl border border-white/[0.06]">
            <div
              className="relative"
              style={{ height: 800 }}
            >
              <ScrollProgress
                className="!fixed !z-50"
                color="linear-gradient(to right, #3b82f6, #06b6d4)"
              />
              <div className="flex flex-col items-center justify-center gap-8 p-8">
                <p className="text-sm text-zinc-500">
                  Scroll the page to see the progress bar at the top of the
                  viewport.
                </p>
              </div>
            </div>
          </div>
        }
        code={code}
        filename="scroll-progress-demo.tsx"
      />
    </div>
  );
}
