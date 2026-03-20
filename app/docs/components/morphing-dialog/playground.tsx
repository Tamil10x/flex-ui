"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { MorphingDialog } from "@/components/flexui/morphing-dialog";

const code = `import { MorphingDialog } from "@/components/flexui/morphing-dialog";

export function Demo() {
  return (
    <MorphingDialog
      trigger={
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">Click to open</p>
          <p className="text-xs text-zinc-500">This card morphs into a dialog</p>
        </div>
      }
    >
      <h2 className="text-xl font-bold text-white mb-3">Morphing Dialog</h2>
      <p className="text-sm text-zinc-400 leading-relaxed">
        This dialog smoothly morphed from the trigger element using
        shared layout animation. Press ESC or click outside to close.
      </p>
    </MorphingDialog>
  );
}`;

export function MorphingDialogPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <MorphingDialog
              trigger={
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-violet-400" />
                    <p className="text-sm font-semibold text-white">
                      Click to open
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">
                    This card morphs into a dialog
                  </p>
                </div>
              }
            >
              <h2 className="text-xl font-bold text-white mb-3">
                Morphing Dialog
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                This dialog smoothly morphed from the trigger element using
                shared layout animation. The trigger and dialog share the same
                layoutId, so Framer Motion animates the shape transition with
                spring physics.
              </p>
              <p className="text-xs text-zinc-500">
                Press ESC or click outside to close.
              </p>
            </MorphingDialog>
          </div>
        }
        code={code}
        filename="morphing-dialog-demo.tsx"
      />
    </div>
  );
}
