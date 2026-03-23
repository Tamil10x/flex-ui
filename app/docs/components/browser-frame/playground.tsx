"use client";

import React from "react";
import { BrowserFrame } from "@/components/flexui/browser-frame";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { BrowserFrame } from "@/components/flexui/browser-frame";

export default function Demo() {
  return (
    <BrowserFrame url="https://flexui.dev" showNav>
      <div className="flex h-[300px] items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Your Content Here</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Any React content renders inside the frame
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}`;

export function BrowserFramePlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[400px] w-full items-center justify-center p-6">
            <div className="w-full max-w-2xl">
              <BrowserFrame url="https://flexui.dev" showNav>
                <div className="flex h-[300px] items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">
                      Your Content Here
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Any React content renders inside the frame
                    </p>
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </div>
        }
        code={code}
        filename="browser-frame-demo.tsx"
      />
    </div>
  );
}
