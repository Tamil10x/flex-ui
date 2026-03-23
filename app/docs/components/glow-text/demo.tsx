"use client";

import React from "react";
import { GlowText } from "@/components/flexui/glow-text";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { GlowText } from "@/components/flexui/glow-text";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <GlowText className="text-4xl">Glowing Text</GlowText>
      <GlowText className="text-2xl" color="rgb(168,85,247)">
        Purple Glow
      </GlowText>
      <GlowText className="text-2xl" color="rgb(52,211,153)">
        Emerald Glow
      </GlowText>
    </div>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6">
          <GlowText className="text-4xl">Glowing Text</GlowText>
          <GlowText className="text-2xl" color="rgb(168,85,247)">
            Purple Glow
          </GlowText>
          <GlowText className="text-2xl" color="rgb(52,211,153)">
            Emerald Glow
          </GlowText>
        </div>
      }
      code={code}
      filename="glow-text-demo.tsx"
    />
  );
}
