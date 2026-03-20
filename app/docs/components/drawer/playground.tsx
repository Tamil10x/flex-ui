"use client";

import React, { useState } from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Drawer } from "@/components/flexui/drawer";

const code = `import { useState } from "react";
import { Drawer } from "@/components/flexui/drawer";

export function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Drawer
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} side="bottom">
        <h2>Bottom Drawer</h2>
        <p>This drawer slides up from the bottom with spring physics.</p>
      </Drawer>
    </>
  );
}`;

export function DrawerPlayground() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] w-full items-center justify-center">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              Open Bottom Drawer
            </button>
            <Drawer open={open} onClose={() => setOpen(false)} side="bottom">
              <h2 className="mb-3 text-lg font-bold text-white">
                Bottom Drawer
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400">
                This drawer slides up from the bottom with spring physics.
                Press ESC or click the backdrop to close.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  Confirm
                </button>
              </div>
            </Drawer>
          </div>
        }
        code={code}
        filename="drawer-demo.tsx"
      />
    </div>
  );
}
