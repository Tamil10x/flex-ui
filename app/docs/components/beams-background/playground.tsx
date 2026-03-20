"use client";

import React from "react";
import { BeamsBackground } from "@/components/flexui/beams-background";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { BeamsBackground } from "@/components/flexui/beams-background";

export function Demo() {
  return (
    <BeamsBackground className="h-[300px] rounded-xl bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <h2 className="text-2xl font-bold text-white">Light Beams</h2>
      </div>
    </BeamsBackground>
  );
}`;

export function BeamsBackgroundPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Animated light beams sweep across the background with staggered delays
        and random angles for a subtle, dynamic ambient effect.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <BeamsBackground className="h-[300px] w-full rounded-xl bg-zinc-950">
              <div className="flex h-full items-center justify-center">
                <h2 className="text-2xl font-bold text-white">Light Beams</h2>
              </div>
            </BeamsBackground>
          </div>
        }
        code={code}
        filename="beams-background-demo.tsx"
      />
    </div>
  );
}
