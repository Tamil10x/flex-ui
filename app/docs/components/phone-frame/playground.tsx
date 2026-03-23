"use client";

import React from "react";
import { PhoneFrame } from "@/components/flexui/phone-frame";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { PhoneFrame } from "@/components/flexui/phone-frame";

export default function Demo() {
  return (
    <PhoneFrame showStatusBar>
      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 pt-8">
        <div className="text-center">
          <h2 className="text-lg font-bold text-white">Welcome</h2>
          <p className="mt-2 text-xs text-zinc-400">
            Your mobile content here
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}`;

export function PhoneFramePlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[500px] w-full items-center justify-center p-6">
            <PhoneFrame showStatusBar>
              <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 pt-8">
                <div className="text-center">
                  <h2 className="text-lg font-bold text-white">Welcome</h2>
                  <p className="mt-2 text-xs text-zinc-400">
                    Your mobile content here
                  </p>
                </div>
              </div>
            </PhoneFrame>
          </div>
        }
        code={code}
        filename="phone-frame-demo.tsx"
      />
    </div>
  );
}
