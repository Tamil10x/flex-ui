"use client";

import React from "react";
import { StatsBlock } from "@/components/flexui/stats-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { StatsBlock } from "@/components/flexui/stats-block";

export function Demo() {
  return (
    <StatsBlock
      heading="By the Numbers"
      stats={[
        { value: "140", label: "Components", suffix: "+" },
        { value: "6", label: "Theme Presets" },
        { value: "99", label: "Lighthouse Score" },
        { value: "10k", label: "Downloads", suffix: "+" },
      ]}
    />
  );
}`;

export function StatsBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Stats cards with staggered fade-up animations.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><StatsBlock heading="By the Numbers" subtitle="FlexUI in numbers." stats={[{ value: "140", label: "Components", suffix: "+" }, { value: "6", label: "Theme Presets" }, { value: "99", label: "Lighthouse Score" }, { value: "10k", label: "Downloads", suffix: "+" }]} /></div>}
        code={code}
        filename="stats-block-demo.tsx"
      />
    </div>
  );
}
