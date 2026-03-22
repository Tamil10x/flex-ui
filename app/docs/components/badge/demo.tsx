"use client";

import React from "react";
import { Badge } from "@/components/flexui/badge";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 p-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Badge variant="success" pulse>Online</Badge>
            <Badge variant="warning" pulse>Syncing</Badge>
            <Badge variant="error" pulse>Live</Badge>
            <Badge variant="info" pulse>Streaming</Badge>
          </div>
        </div>
      }
      code={`import { Badge } from "@/components/flexui/badge";

export function Demo() {
  return (
    <>
      {/* All variants */}
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>

      {/* With pulse indicator */}
      <Badge variant="success" pulse>Online</Badge>
      <Badge variant="warning" pulse>Syncing</Badge>
      <Badge variant="error" pulse>Live</Badge>
      <Badge variant="info" pulse>Streaming</Badge>
    </>
  );
}`}
      filename="badge-demo.tsx"
    />
  );
}
