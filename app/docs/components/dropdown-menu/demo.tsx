"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { DropdownMenu } from "@/components/flexui/dropdown-menu";

const items = [
  { label: "Edit profile", onClick: () => {} },
  { label: "Account settings", onClick: () => {} },
  { label: "Keyboard shortcuts", onClick: () => {} },
  { label: "Sign out", onClick: () => {} },
];

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] items-center justify-center p-8">
          <DropdownMenu
            trigger={
              <button className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-800">
                Open Menu
              </button>
            }
            items={items}
          />
        </div>
      }
      code={`import { DropdownMenu } from "@/components/flexui/dropdown-menu";

const items = [
  { label: "Edit profile", onClick: () => {} },
  { label: "Account settings", onClick: () => {} },
  { label: "Keyboard shortcuts", onClick: () => {} },
  { label: "Sign out", onClick: () => {} },
];

export function Demo() {
  return (
    <DropdownMenu
      trigger={<button className="btn">Open Menu</button>}
      items={items}
    />
  );
}`}
      filename="dropdown-menu-demo.tsx"
    />
  );
}
