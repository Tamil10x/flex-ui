"use client";

import React from "react";
import { StatCard } from "@/components/flexui/stat-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { StatCard } from "@/components/flexui/stat-card";

<StatCard label="Revenue" value="$48.2k" change={12.5} />
<StatCard label="Users" value="2,841" change={8.1} />
<StatCard label="Bounce Rate" value="24.3%" change={-3.2} />`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-wrap items-center justify-center gap-6">
          <StatCard label="Revenue" value="$48.2k" change={12.5} />
          <StatCard label="Users" value="2,841" change={8.1} />
          <StatCard label="Bounce Rate" value="24.3%" change={-3.2} />
        </div>
      }
      code={demoCode}
      filename="stat-card-demo.tsx"
    />
  );
}
