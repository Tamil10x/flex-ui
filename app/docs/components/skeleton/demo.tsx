"use client";

import React from "react";
import { Skeleton } from "@/components/flexui/skeleton";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { Skeleton } from "@/components/flexui/skeleton";

{/* Avatar */}
<Skeleton width={48} height={48} rounded />

{/* Text lines */}
<Skeleton width={180} height={14} />
<Skeleton width={240} height={14} />
<Skeleton width={120} height={14} />`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-start gap-4">
          <Skeleton width={48} height={48} rounded />
          <div className="space-y-3">
            <Skeleton width={180} height={14} />
            <Skeleton width={240} height={14} />
            <Skeleton width={120} height={14} />
          </div>
        </div>
      }
      code={demoCode}
      filename="skeleton-demo.tsx"
    />
  );
}
