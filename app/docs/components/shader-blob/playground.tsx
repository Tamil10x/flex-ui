"use client";

import React from "react";
import { ShaderBlob } from "@/components/flexui/shader-blob";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { ShaderBlob } from "@/components/flexui/shader-blob";

export function Demo() {
  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden">
      <ShaderBlob />
    </div>
  );
}`;

export function ShaderBlobPlayground() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="w-full rounded-xl overflow-hidden" style={{ height: 500 }}>
          <ShaderBlob />
        </div>
      }
      code={code}
      filename="shader-blob-demo.tsx"
    />
  );
}
