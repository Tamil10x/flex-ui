"use client";

import React from "react";
import { BlobCursor } from "@/components/flexui/blob-cursor";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { BlobCursor } from "@/components/flexui/blob-cursor";

export function Demo() {
  return (
    <div>
      <BlobCursor />
      <p className="text-zinc-400">Move your mouse to see the blob follow.</p>
    </div>
  );
}`;

export function BlobCursorPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Move your mouse around the preview area. A large blurred blob follows
        with heavy inertia for an organic, liquid feel.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            <BlobCursor />
            <p className="text-sm text-zinc-500">
              Move your mouse here
            </p>
          </div>
        }
        code={code}
        filename="blob-cursor-demo.tsx"
      />
    </div>
  );
}
