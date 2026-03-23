"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { CommandMenu } from "@/components/flexui/command-menu";

const items = [
  { label: "Search files...", shortcut: "Ctrl+P", onSelect: () => {} },
  { label: "Toggle theme", shortcut: "Ctrl+T", onSelect: () => {} },
  { label: "Open settings", shortcut: "Ctrl+,", onSelect: () => {} },
  { label: "Create new file", shortcut: "Ctrl+N", onSelect: () => {} },
  { label: "View documentation", onSelect: () => {} },
  { label: "Sign out", onSelect: () => {} },
];

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8">
          <p className="text-sm text-zinc-400">
            Press <kbd className="rounded border border-white/10 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Ctrl+K</kbd> to open the command menu
          </p>
          <CommandMenu items={items} placeholder="Type a command..." />
        </div>
      }
      code={`import { CommandMenu } from "@/components/flexui/command-menu";

const items = [
  { label: "Search files...", shortcut: "Ctrl+P", onSelect: () => {} },
  { label: "Toggle theme", shortcut: "Ctrl+T", onSelect: () => {} },
  { label: "Open settings", shortcut: "Ctrl+,", onSelect: () => {} },
  { label: "Create new file", shortcut: "Ctrl+N", onSelect: () => {} },
];

export function Demo() {
  return <CommandMenu items={items} placeholder="Type a command..." />;
}`}
      filename="command-menu-demo.tsx"
    />
  );
}
