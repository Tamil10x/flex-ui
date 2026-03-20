"use client";

import React from "react";
import { StarsBackground } from "@/components/flexui/stars-background";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { StarsBackground } from "@/components/flexui/stars-background";

export function Demo() {
  return (
    <StarsBackground className="h-[300px] rounded-xl bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <h2 className="text-2xl font-bold text-white">Starfield</h2>
      </div>
    </StarsBackground>
  );
}`;

export function StarsBackgroundPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        A twinkling star field background with randomly placed stars that pulse
        in and out of visibility at varying speeds.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <StarsBackground className="h-[300px] w-full rounded-xl bg-zinc-950">
              <div className="flex h-full items-center justify-center">
                <h2 className="text-2xl font-bold text-white">Starfield</h2>
              </div>
            </StarsBackground>
          </div>
        }
        code={code}
        filename="stars-background-demo.tsx"
      />
    </div>
  );
}
