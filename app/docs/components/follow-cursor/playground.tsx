"use client";

import React from "react";
import { FollowCursor } from "@/components/flexui/follow-cursor";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { FollowCursor } from "@/components/flexui/follow-cursor";

export function Demo() {
  return (
    <div>
      <FollowCursor />
      <p className="text-zinc-400">Move your mouse around the page.</p>
    </div>
  );
}`;

export function FollowCursorPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Move your mouse around the preview area to see a glowing dot follow your
        cursor with spring physics.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            <FollowCursor />
            <p className="text-sm text-zinc-500">
              Move your mouse here
            </p>
          </div>
        }
        code={code}
        filename="follow-cursor-demo.tsx"
      />
    </div>
  );
}
