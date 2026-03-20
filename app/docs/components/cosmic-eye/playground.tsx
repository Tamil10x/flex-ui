"use client";

import React from "react";
import { CosmicEye } from "@/components/flexui/cosmic-eye";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { CosmicEye } from "@/components/flexui/cosmic-eye";

export function Demo() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden">
      <CosmicEye />
    </div>
  );
}`;

export function CosmicEyePlayground() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="w-full rounded-xl overflow-hidden" style={{ height: 500 }}>
          <CosmicEye />
        </div>
      }
      code={code}
      filename="cosmic-eye-demo.tsx"
    />
  );
}
