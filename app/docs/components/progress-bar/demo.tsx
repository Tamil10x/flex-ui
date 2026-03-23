"use client";

import React from "react";
import { ProgressBar } from "@/components/flexui/progress-bar";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { ProgressBar } from "@/components/flexui/progress-bar";

<ProgressBar value={75} showLabel />
<ProgressBar value={45} color="#8b5cf6" animated showLabel />
<ProgressBar value={100} color="#34d399" showLabel />`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="w-full max-w-md space-y-6">
          <div>
            <p className="mb-2 text-xs text-zinc-400">Default (75%)</p>
            <ProgressBar value={75} showLabel />
          </div>
          <div>
            <p className="mb-2 text-xs text-zinc-400">Colored &amp; animated (45%)</p>
            <ProgressBar value={45} color="#8b5cf6" animated showLabel />
          </div>
          <div>
            <p className="mb-2 text-xs text-zinc-400">Complete (100%)</p>
            <ProgressBar value={100} color="#34d399" showLabel />
          </div>
        </div>
      }
      code={demoCode}
      filename="progress-bar-demo.tsx"
    />
  );
}
