"use client";

import React from "react";
import { CursorGlow } from "@/components/flexui/cursor-glow";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { CursorGlow } from "@/components/flexui/cursor-glow";

export function Demo() {
  return (
    <CursorGlow>
      <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
        <h3 className="text-lg font-bold text-white">Cursor Glow</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Hover to see the dual-layer glow trail follow your
          cursor. Move fast to see the ghost trail lag behind.
        </p>
      </div>
    </CursorGlow>
  );
}`;

export function CursorGlowPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Hover over the card to see the dual-layer glow effect — a fast primary
        glow and a slower ghost trail. Move quickly to see the trail separate
        from the primary.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <CursorGlow className="max-w-sm">
              <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
                <h3 className="text-lg font-bold text-white">Cursor Glow</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Hover to see the dual-layer glow trail follow your cursor.
                  Move fast to see the ghost trail lag behind.
                </p>
              </div>
            </CursorGlow>
          </div>
        }
        code={code}
        filename="cursor-glow-demo.tsx"
      />
    </div>
  );
}
