"use client";

import React from "react";
import { OrbitAnimation } from "@/components/flexui/orbit-animation";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { OrbitAnimation } from "@/components/flexui/orbit-animation";

export default function Demo() {
  return (
    <div className="flex items-center gap-12">
      <div className="flex flex-col items-center gap-4">
        <OrbitAnimation />
        <span className="text-xs text-zinc-500">Default</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <OrbitAnimation dotCount={4} speed={5} color="rgb(168,85,247)" />
        <span className="text-xs text-zinc-500">Purple, 4 dots, fast</span>
      </div>
    </div>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <OrbitAnimation />
            <span className="text-xs text-zinc-500">Default</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <OrbitAnimation dotCount={4} speed={5} color="rgb(168,85,247)" />
            <span className="text-xs text-zinc-500">Purple, 4 dots, fast</span>
          </div>
        </div>
      }
      code={code}
      filename="orbit-animation-demo.tsx"
    />
  );
}
