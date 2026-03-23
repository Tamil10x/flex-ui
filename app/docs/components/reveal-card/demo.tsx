"use client";

import React from "react";
import { RevealCard } from "@/components/flexui/reveal-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { RevealCard } from "@/components/flexui/reveal-card";

<RevealCard title="Performance" className="w-64 h-40">
  Built for speed with zero-config optimizations
  and edge-first architecture.
</RevealCard>

<RevealCard title="Security" className="w-64 h-40">
  Enterprise-grade encryption and SOC 2 compliance
  out of the box.
</RevealCard>`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-wrap items-center justify-center gap-6">
          <RevealCard title="Performance" className="w-64 h-40">
            Built for speed with zero-config optimizations and edge-first architecture.
          </RevealCard>
          <RevealCard title="Security" className="w-64 h-40">
            Enterprise-grade encryption and SOC 2 compliance out of the box.
          </RevealCard>
        </div>
      }
      code={demoCode}
      filename="reveal-card-demo.tsx"
    />
  );
}
