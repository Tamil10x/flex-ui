"use client";

import React from "react";
import { PulseButton } from "@/components/flexui/pulse-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { PulseButton } from "@/components/flexui/pulse-button";

<PulseButton>Get Started</PulseButton>

<PulseButton color="rgba(139,92,246,0.5)" pulseCount={2}>
  Subscribe
</PulseButton>

<PulseButton color="rgba(52,211,153,0.5)" pulseCount={4}>
  Join Now
</PulseButton>`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-wrap items-center justify-center gap-8">
          <PulseButton>Get Started</PulseButton>
          <PulseButton color="rgba(139,92,246,0.5)" pulseCount={2}>
            Subscribe
          </PulseButton>
          <PulseButton color="rgba(52,211,153,0.5)" pulseCount={4}>
            Join Now
          </PulseButton>
        </div>
      }
      code={demoCode}
      filename="pulse-button-demo.tsx"
    />
  );
}
