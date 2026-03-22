"use client";

import React from "react";
import { ImageCompare } from "@/components/flexui/image-compare";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { ImageCompare } from "@/components/flexui/image-compare";

export default function Demo() {
  return (
    <ImageCompare
      before="/images/landscape-bw.jpg"
      after="/images/landscape-color.jpg"
      className="max-w-lg"
    />
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center">
          <ImageCompare
            before="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80&sat=-100"
            after="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80"
            className="max-w-lg"
          />
        </div>
      }
      code={code}
      filename="image-compare-demo.tsx"
    />
  );
}
