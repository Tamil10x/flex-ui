"use client";

import React from "react";
import { SmokeDivider } from "@/components/flexui/smoke-divider";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { SmokeDivider } from "@/components/flexui/smoke-divider";

export default function SmokeDividerDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Section One</h2>
        <p className="text-zinc-400">Content above the divider</p>
      </div>

      <SmokeDivider />

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Section Two</h2>
        <p className="text-zinc-400">Content below the divider</p>
      </div>
    </div>
  );
}`;

export function SmokeDividerPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="w-full space-y-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Section One</h2>
              <p className="text-zinc-400">Content above the divider</p>
            </div>

            <SmokeDivider />

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Section Two</h2>
              <p className="text-zinc-400">Content below the divider</p>
            </div>
          </div>
        }
        code={code}
        filename="smoke-divider-demo.tsx"
      />
    </div>
  );
}
