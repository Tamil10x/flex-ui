"use client";

import React from "react";
import { Kbd } from "@/components/flexui/kbd";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { Kbd } from "@/components/flexui/kbd";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>C</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Copy</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>V</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Paste</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>Shift</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>P</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Command Palette</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Esc</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Close</span>
      </div>
    </div>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <Kbd>Ctrl</Kbd>
            <span className="text-zinc-600">+</span>
            <Kbd>C</Kbd>
            <span className="ml-4 text-sm text-zinc-500">Copy</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>Ctrl</Kbd>
            <span className="text-zinc-600">+</span>
            <Kbd>V</Kbd>
            <span className="ml-4 text-sm text-zinc-500">Paste</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>Ctrl</Kbd>
            <span className="text-zinc-600">+</span>
            <Kbd>Shift</Kbd>
            <span className="text-zinc-600">+</span>
            <Kbd>P</Kbd>
            <span className="ml-4 text-sm text-zinc-500">Command Palette</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>Esc</Kbd>
            <span className="ml-4 text-sm text-zinc-500">Close</span>
          </div>
        </div>
      }
      code={code}
      filename="kbd-demo.tsx"
    />
  );
}
