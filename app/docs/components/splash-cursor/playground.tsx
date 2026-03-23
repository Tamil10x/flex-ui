"use client";

import React from "react";
import { SplashCursor } from "@/components/flexui/splash-cursor";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { SplashCursor } from "@/components/flexui/splash-cursor";

export function Demo() {
  return (
    <SplashCursor className="h-[400px] w-full rounded-xl bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <p className="text-zinc-400">Move your mouse to create ink splashes</p>
      </div>
    </SplashCursor>
  );
}`;

export function SplashCursorPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Move your mouse around the preview area. Colorful ink-splash blobs will
        trail behind your cursor with velocity-based motion.
      </p>
      <PreviewCodeTabs
        preview={
          <SplashCursor className="flex min-h-[300px] w-full items-center justify-center rounded-xl border border-white/[0.06] bg-zinc-950">
            <p className="text-sm text-zinc-500">
              Move your mouse here
            </p>
          </SplashCursor>
        }
        code={code}
        filename="splash-cursor-demo.tsx"
      />
    </div>
  );
}
