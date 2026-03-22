"use client";

import React from "react";
import { FileTree } from "@/components/flexui/file-tree";

const items = [
  {
    name: "src",
    type: "folder" as const,
    children: [
      {
        name: "components",
        type: "folder" as const,
        children: [
          { name: "Button.tsx", type: "file" as const },
          { name: "Card.tsx", type: "file" as const },
          { name: "Modal.tsx", type: "file" as const },
        ],
      },
      {
        name: "hooks",
        type: "folder" as const,
        children: [
          { name: "useAuth.ts", type: "file" as const },
          { name: "useTheme.ts", type: "file" as const },
        ],
      },
      { name: "App.tsx", type: "file" as const },
      { name: "index.ts", type: "file" as const },
    ],
  },
  { name: "package.json", type: "file" as const },
  { name: "tsconfig.json", type: "file" as const },
];

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <FileTree items={items} className="w-72" />
    </div>
  );
}
