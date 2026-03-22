"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { EmptyState } from "@/components/flexui/empty-state";
import { Upload } from "lucide-react";

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] w-full items-center justify-center p-8">
          <EmptyState
            icon={<Upload className="h-12 w-12" />}
            title="No files uploaded"
            description="Drag and drop files here, or click the button below to browse your local files."
            action={{ label: "Upload Files", onClick: () => {} }}
            className="w-full max-w-md"
          />
        </div>
      }
      code={`import { EmptyState } from "@/components/flexui/empty-state";
import { Upload } from "lucide-react";

export function Demo() {
  return (
    <EmptyState
      icon={<Upload className="h-12 w-12" />}
      title="No files uploaded"
      description="Drag and drop files here, or click the button below to browse."
      action={{ label: "Upload Files", onClick: () => {} }}
    />
  );
}`}
      filename="empty-state-demo.tsx"
    />
  );
}
