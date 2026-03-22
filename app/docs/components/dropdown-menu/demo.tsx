"use client";

import React from "react";
import { DropdownMenu } from "@/components/flexui/dropdown-menu";

const items = [
  { label: "Edit profile", onClick: () => {} },
  { label: "Account settings", onClick: () => {} },
  { label: "Keyboard shortcuts", onClick: () => {} },
  { label: "Sign out", onClick: () => {} },
];

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <DropdownMenu
        trigger={
          <button className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-800">
            Open Menu
          </button>
        }
        items={items}
      />
    </div>
  );
}
